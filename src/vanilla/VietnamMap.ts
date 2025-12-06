/**
 * Vanilla JavaScript Map Component
 * Use với bất kỳ project nào không dùng React
 * 
 * @example
 * ```javascript
 * import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';
 * 
 * const map = createVietnamMap('#container', {
 *   drilldown: true,
 *   onProvinceClick: (province) => console.log(province),
 *   onDrilldown: (province) => console.log('Drilldown to:', province),
 *   colors: { min: '#E1F5FE', max: '#01579B' }
 * });
 * ```
 */

import Highcharts from 'highcharts/highmaps';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import { vietnamGeoJson, PROVINCE_MAPPING, normalizeName, getProvincesIndex } from '../core';

// Initialize drilldown module
if (typeof Highcharts === 'object' && !(Highcharts as any).Drilldown) {
    if (typeof HighchartsDrilldown === 'function') {
        HighchartsDrilldown(Highcharts);
    } else if (typeof (HighchartsDrilldown as any)?.default === 'function') {
        (HighchartsDrilldown as any).default(Highcharts);
    }
}

// ============================================
// TYPES & INTERFACES
// ============================================

export interface ProvinceData {
    id: string;
    name: string;
    value?: number;
    [key: string]: any;
}

export interface CommuneData {
    id: string;
    name: string;
    type: string;
    district: string;
    province: string;
    value?: number;
    [key: string]: any;
}

export interface ColorConfig {
    /** Minimum value color */
    min?: string;
    /** Maximum value color */
    max?: string;
    /** Color stops: [[position, color], ...] */
    stops?: [number, string][];
}

export interface TooltipConfig {
    /** Enable/disable tooltip */
    enabled?: boolean;
    /** Background color */
    backgroundColor?: string;
    /** Border color */
    borderColor?: string;
    /** Custom formatter function */
    formatter?: (point: ProvinceData | CommuneData) => string;
}

export interface DataLabelConfig {
    /** Enable/disable labels */
    enabled?: boolean;
    /** Font size */
    fontSize?: string;
    /** Font color */
    color?: string;
    /** Custom format string */
    format?: string;
}

export interface MapStyleConfig {
    /** Border color between provinces */
    borderColor?: string;
    /** Border width */
    borderWidth?: number;
    /** Hover color */
    hoverColor?: string;
    /** Hover border color */
    hoverBorderColor?: string;
    /** Selected color */
    selectColor?: string;
}

export interface DrilldownConfig {
    /** Enable drilldown to commune level */
    enabled?: boolean;
    /** Base URL for loading province GeoJSON files */
    dataUrl?: string;
    /** Callback when drilldown starts */
    onDrilldown?: (province: ProvinceData) => void;
    /** Callback when drillup (back to country level) */
    onDrillup?: () => void;
    /** Loading indicator element or callback */
    onLoading?: (loading: boolean) => void;
}

export interface VietnamMapOptions {
    // === DATA ===
    /** Custom data for provinces */
    data?: Array<{ 'hc-key': string; value: number;[key: string]: any }>;

    // === CALLBACKS ===
    /** Callback when clicking on a province */
    onProvinceClick?: (province: ProvinceData) => void;
    /** Callback when hovering over a province */
    onProvinceHover?: (province: ProvinceData | null) => void;
    /** Callback when clicking on a commune (drilldown level) */
    onCommuneClick?: (commune: CommuneData) => void;
    /** Callback when map is ready */
    onReady?: (instance: VietnamMapInstance) => void;

    // === APPEARANCE ===
    /** Chart height (number in px or string like '100%') */
    height?: number | string;
    /** Chart background color (transparent by default) */
    backgroundColor?: string;
    /** Color configuration */
    colors?: ColorConfig;
    /** Map styling */
    style?: MapStyleConfig;
    /** Data labels configuration */
    dataLabels?: DataLabelConfig;
    /** Tooltip configuration */
    tooltip?: TooltipConfig;

    // === NAVIGATION ===
    /** Enable map navigation (zoom, pan) */
    navigation?: boolean;
    /** Enable double-click zoom */
    doubleClickZoom?: boolean;

    // === DRILLDOWN ===
    /** Drilldown configuration */
    drilldown?: boolean | DrilldownConfig;

    // === ADVANCED ===
    /** Custom Highcharts options (will be merged) */
    highchartsOptions?: Highcharts.Options;
}

export interface VietnamMapInstance {
    /** Highcharts chart instance */
    chart: Highcharts.Chart;
    /** Zoom to a specific province by ID */
    zoomToProvince: (provinceId: string) => void;
    /** Reset zoom to show full map */
    resetZoom: () => void;
    /** Update map data */
    updateData: (data: Array<{ 'hc-key': string; value: number;[key: string]: any }>) => void;
    /** Destroy the map */
    destroy: () => void;
    /** Get current province (null if at country level) */
    getCurrentProvince: () => string | null;
    /** Drilldown to a specific province */
    drilldownTo: (provinceName: string) => Promise<void>;
    /** Drillup to country level */
    drillUp: () => void;
    /** Get processed GeoJSON topology */
    getTopology: () => any;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getFilename(name: string): string {
    return normalizeName(name).replace(/\s+/g, '-') + '.json';
}

function mergeProvinces(topology: any) {
    const groupedFeatures: Record<string, any[]> = {};

    topology.features.forEach((f: any) => {
        const originalName = f.properties.name;
        const normalized = normalizeName(originalName);
        let newName = PROVINCE_MAPPING[normalized];

        if (!newName) {
            const foundKey = Object.keys(PROVINCE_MAPPING).find(key => normalized.includes(key));
            newName = foundKey ? PROVINCE_MAPPING[foundKey] : originalName;
        }

        const newId = `vn-new-${normalizeName(newName).replace(/\s+/g, '-')}`;

        if (!groupedFeatures[newId]) {
            groupedFeatures[newId] = [];
        }
        groupedFeatures[newId].push({ feature: f, newName, newId, originalName });
    });

    const mergedFeatures = Object.values(groupedFeatures).map((group: any[]) => {
        const firstItem = group[0];
        const newName = firstItem.newName;
        const newId = firstItem.newId;

        if (group.length === 1) {
            return {
                ...firstItem.feature,
                properties: {
                    ...firstItem.feature.properties,
                    "hc-key": newId,
                    name: newName,
                    "original-names": [firstItem.originalName]
                }
            };
        }

        const mergedCoordinates: any[] = [];
        group.forEach(item => {
            const geom = item.feature.geometry;
            if (geom.type === 'Polygon') {
                mergedCoordinates.push(geom.coordinates);
            } else if (geom.type === 'MultiPolygon') {
                mergedCoordinates.push(...geom.coordinates);
            }
        });

        return {
            type: "Feature",
            properties: {
                "hc-key": newId,
                name: newName,
                "original-names": group.map(g => g.originalName)
            },
            geometry: {
                type: "MultiPolygon",
                coordinates: mergedCoordinates
            }
        };
    });

    return { ...topology, features: mergedFeatures };
}

// ============================================
// MAIN FUNCTION
// ============================================

/**
 * Create a Vietnam Map chart with 34 provinces
 * 
 * @param container - CSS selector or HTMLElement
 * @param options - Configuration options
 * @returns VietnamMapInstance
 */
export function createVietnamMap(
    container: string | HTMLElement,
    options: VietnamMapOptions = {}
): VietnamMapInstance {
    const containerEl = typeof container === 'string'
        ? document.querySelector(container) as HTMLElement
        : container;

    if (!containerEl) {
        throw new Error(`Container not found: ${container}`);
    }

    // Process drilldown config
    const drilldownConfig: DrilldownConfig = typeof options.drilldown === 'object'
        ? options.drilldown
        : { enabled: options.drilldown === true };

    if (drilldownConfig.enabled && !drilldownConfig.dataUrl) {
        drilldownConfig.dataUrl = 'https://raw.githubusercontent.com/xdev-asia-labs/vietnam-map-34-provinces/main/src/core/assets/provinces/';
    }

    // Process topology - merge provinces
    const processedTopology = mergeProvinces(vietnamGeoJson as any);
    const mergedFeatures = processedTopology.features;

    // Get province commune counts for default values
    const provincesIndex = getProvincesIndex();
    const communeCounts: Record<string, number> = {};
    provincesIndex.forEach(p => { communeCounts[p.name] = p.commune_count; });

    // Generate default data if not provided
    const mapData = options.data || mergedFeatures.map((f: any) => ({
        "hc-key": f.properties["hc-key"],
        value: communeCounts[f.properties.name] || Math.floor(Math.random() * 1000) + 100,
        name: f.properties.name,
        originalNames: f.properties["original-names"],
        drilldown: drilldownConfig.enabled ? getFilename(f.properties.name) : undefined
    }));

    // Build color axis
    const colorAxis: Highcharts.ColorAxisOptions = options.colors?.stops
        ? { min: 0, stops: options.colors.stops }
        : {
            min: 0,
            stops: [
                [0, options.colors?.min || '#E1F5FE'],
                [0.4, '#4FC3F7'],
                [1, options.colors?.max || '#01579B']
            ]
        };

    // Build tooltip
    const tooltipConfig = options.tooltip || {};
    const tooltip: Highcharts.TooltipOptions = {
        enabled: tooltipConfig.enabled !== false,
        backgroundColor: tooltipConfig.backgroundColor || 'rgba(255, 255, 255, 0.98)',
        borderColor: tooltipConfig.borderColor || '#e2e8f0',
        borderRadius: 12,
        padding: 16,
        useHTML: true,
        formatter: function () {
            const point = this.point as any;
            if (tooltipConfig.formatter) {
                return tooltipConfig.formatter(point);
            }
            const drilldownHint = drilldownConfig.enabled
                ? '<div style="color:#22c55e;margin-top:8px;font-size:12px">🔍 Click để xem chi tiết</div>'
                : '';
            return `
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">${point.name}</div>
                <div>Value: <b>${point.value?.toLocaleString() || 'N/A'}</b></div>
                ${drilldownHint}
            `;
        }
    };

    // Build data labels
    const dataLabelConfig = options.dataLabels || {};
    const dataLabels: Highcharts.DataLabelsOptions = {
        enabled: dataLabelConfig.enabled !== false,
        format: dataLabelConfig.format || '{point.name}',
        style: {
            fontSize: dataLabelConfig.fontSize || '10px',
            fontWeight: '500',
            textOutline: '2px contrast',
            color: dataLabelConfig.color || '#1e293b'
        }
    };

    // Build map style
    const mapStyle = options.style || {};

    // State variables
    let currentProvince: string | null = null;

    // Create chart options
    const chartOptions: Highcharts.Options = {
        chart: {
            map: processedTopology,
            backgroundColor: options.backgroundColor || 'transparent',
            height: options.height || 600,
            style: { fontFamily: 'inherit' },
            events: drilldownConfig.enabled ? {
                drilldown: function (e: any) {
                    if (!e.seriesOptions && options.onProvinceClick) {
                        // Will be handled by point click
                    }
                },
                drillup: function () {
                    currentProvince = null;
                    if (drilldownConfig.onDrillup) {
                        drilldownConfig.onDrillup();
                    }
                }
            } : undefined
        },
        title: { text: undefined },
        credits: { enabled: false },
        mapNavigation: {
            enabled: options.navigation !== false,
            enableDoubleClickZoom: options.doubleClickZoom !== false,
            buttonOptions: { verticalAlign: 'bottom' }
        },
        colorAxis,
        tooltip,
        series: [{
            type: 'map',
            name: 'Vietnam Provinces',
            data: mapData,
            joinBy: 'hc-key',
            allAreas: false,
            borderColor: mapStyle.borderColor || '#ffffff',
            borderWidth: mapStyle.borderWidth ?? 0.5,
            cursor: drilldownConfig.enabled ? 'pointer' : undefined,
            states: {
                hover: {
                    color: mapStyle.hoverColor || '#fbbf24',
                    borderColor: mapStyle.hoverBorderColor || '#d97706',
                    brightness: 0.1
                },
                select: {
                    color: mapStyle.selectColor || '#fbbf24',
                    borderColor: mapStyle.hoverBorderColor || '#d97706'
                }
            },
            dataLabels: dataLabels as any,
            point: {
                events: {
                    click: function () {
                        const point = this as any;
                        const provinceData: ProvinceData = {
                            id: point['hc-key'],
                            name: point.name,
                            value: point.value,
                            ...point.options
                        };

                        if (options.onProvinceClick) {
                            options.onProvinceClick(provinceData);
                        }

                        // Trigger drilldown if enabled
                        if (drilldownConfig.enabled) {
                            instance.drilldownTo(point.name);
                        }
                    },
                    mouseOver: function () {
                        const point = this as any;
                        if (options.onProvinceHover) {
                            options.onProvinceHover({
                                id: point['hc-key'],
                                name: point.name,
                                value: point.value,
                                ...point.options
                            });
                        }
                    },
                    mouseOut: function () {
                        if (options.onProvinceHover) {
                            options.onProvinceHover(null);
                        }
                    }
                }
            }
        }],
        drilldown: drilldownConfig.enabled ? {
            activeDataLabelStyle: {
                color: '#1e293b',
                textOutline: '1px contrast'
            }
        } : undefined,
        // Merge custom options
        ...options.highchartsOptions
    };

    // Create chart
    const chart = Highcharts.mapChart(containerEl, chartOptions);

    // Create instance
    const instance: VietnamMapInstance = {
        chart,

        zoomToProvince(provinceId: string) {
            const point = chart.get(provinceId) as any;
            if (point) {
                point.zoomTo();
                point.select(true, false);
            }
        },

        resetZoom() {
            chart.mapZoom(1);
            (chart.series[0] as any).points.forEach((p: any) => p.select(false));
        },

        updateData(data) {
            (chart.series[0] as any).setData(data, true);
        },

        destroy() {
            chart.destroy();
        },

        getCurrentProvince() {
            return currentProvince;
        },

        getTopology() {
            return processedTopology;
        },

        async drilldownTo(provinceName: string) {
            if (!drilldownConfig.enabled) {
                console.warn('Drilldown is not enabled');
                return;
            }

            const filename = getFilename(provinceName);
            const url = `${drilldownConfig.dataUrl}${filename}`;

            if (drilldownConfig.onLoading) {
                drilldownConfig.onLoading(true);
            }

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
                const data = await response.json();

                const communeData = data.features.map((f: any) => ({
                    "hc-key": f.properties.GID_3,
                    value: Math.floor(Math.random() * 100) + 10,
                    name: f.properties.NAME_3,
                    type: f.properties.TYPE_3,
                    district: f.properties.NAME_2,
                    province: provinceName
                }));

                currentProvince = provinceName;

                if (drilldownConfig.onDrilldown) {
                    drilldownConfig.onDrilldown({ id: getFilename(provinceName), name: provinceName });
                }

                // Find the point and add drilldown
                const point = (chart.series[0] as any).points.find((p: any) => p.name === provinceName);
                if (point) {
                    chart.addSeriesAsDrilldown(point, {
                        type: 'map',
                        name: provinceName,
                        data: communeData,
                        mapData: data,
                        joinBy: ['GID_3', 'hc-key'],
                        borderColor: mapStyle.borderColor || '#ffffff',
                        borderWidth: 0.3,
                        states: {
                            hover: {
                                color: mapStyle.hoverColor || '#fbbf24',
                                borderColor: mapStyle.hoverBorderColor || '#d97706'
                            }
                        },
                        dataLabels: {
                            enabled: dataLabelConfig.enabled !== false,
                            format: '{point.name}',
                            style: {
                                fontSize: '7px',
                                fontWeight: '400',
                                textOutline: '1px contrast',
                                color: dataLabelConfig.color || '#1e293b'
                            }
                        },
                        point: {
                            events: {
                                click: function () {
                                    const p = this as any;
                                    if (options.onCommuneClick) {
                                        options.onCommuneClick({
                                            id: p['hc-key'],
                                            name: p.name,
                                            type: p.type,
                                            district: p.district,
                                            province: provinceName,
                                            value: p.value
                                        });
                                    }
                                }
                            }
                        }
                    } as any);
                }
            } catch (error) {
                console.error('Failed to load province data:', error);
            } finally {
                if (drilldownConfig.onLoading) {
                    drilldownConfig.onLoading(false);
                }
            }
        },

        drillUp() {
            if ((chart as any).drilldownLevels && (chart as any).drilldownLevels.length > 0) {
                chart.drillUp();
            }
            currentProvince = null;
        }
    };

    // Call onReady callback
    if (options.onReady) {
        options.onReady(instance);
    }

    return instance;
}

// Export for UMD/IIFE builds
export default { createVietnamMap };
