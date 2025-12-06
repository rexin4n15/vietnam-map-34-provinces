/**
 * Vanilla JavaScript Map Component
 * Use với bất kỳ project nào không dùng React
 * 
 * @example
 * ```javascript
 * import { createVietnamMap } from '@xdev-asia-labs/vietnam-map-34-provinces/vanilla';
 * 
 * const map = createVietnamMap('#container', {
 *   onProvinceClick: (province) => console.log(province)
 * });
 * ```
 */

import Highcharts from 'highcharts/highmaps';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import { vietnamGeoJson, PROVINCE_MAPPING, normalizeName } from '../core';

// Initialize drilldown module
if (typeof Highcharts === 'object' && !(Highcharts as any).Drilldown) {
    if (typeof HighchartsDrilldown === 'function') {
        HighchartsDrilldown(Highcharts);
    } else if (typeof (HighchartsDrilldown as any)?.default === 'function') {
        (HighchartsDrilldown as any).default(Highcharts);
    }
}

export interface VietnamMapOptions {
    /** Callback khi click vào tỉnh */
    onProvinceClick?: (province: { id: string; name: string; data: any }) => void;
    /** Callback khi hover tỉnh */
    onProvinceHover?: (province: { id: string; name: string; data: any } | null) => void;
    /** Custom data cho từng tỉnh */
    data?: Array<{ 'hc-key': string; value: number;[key: string]: any }>;
    /** Custom tooltip format */
    tooltipFormat?: string;
    /** Color axis configuration */
    colorAxis?: Highcharts.ColorAxisOptions;
    /** Chart height */
    height?: number | string;
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
}

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

    // Process topology - merge provinces
    const topology = vietnamGeoJson as any;
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
        groupedFeatures[newId].push({ feature: f, newName, newId });
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
                    "original-name": firstItem.feature.properties.name
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
                "original-name": group.map(g => g.feature.properties.name).join(", ")
            },
            geometry: {
                type: "MultiPolygon",
                coordinates: mergedCoordinates
            }
        };
    });

    const processedTopology = { ...topology, features: mergedFeatures };

    // Generate default data if not provided
    const mapData = options.data || mergedFeatures.map((f: any) => ({
        "hc-key": f.properties["hc-key"],
        value: Math.floor(Math.random() * 10000) + 1000,
        name: f.properties.name
    }));

    // Create chart options
    const chartOptions: Highcharts.Options = {
        chart: {
            map: processedTopology,
            backgroundColor: 'transparent',
            height: options.height || 600,
            style: { fontFamily: 'inherit' }
        },
        title: { text: undefined },
        mapNavigation: {
            enabled: true,
            enableDoubleClickZoom: true,
            buttonOptions: { verticalAlign: 'bottom' }
        },
        colorAxis: options.colorAxis || {
            min: 0,
            stops: [
                [0, '#E1F5FE'],
                [0.4, '#4FC3F7'],
                [1, '#01579B']
            ]
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            borderColor: '#e2e8f0',
            borderRadius: 12,
            padding: 16,
            useHTML: true,
            formatter: function () {
                const point = this.point as any;
                return `
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">${point.name}</div>
                    <div>Value: <b>${point.value?.toLocaleString() || 'N/A'}</b></div>
                `;
            }
        },
        series: [{
            type: 'map',
            name: 'Vietnam Provinces',
            data: mapData,
            joinBy: 'hc-key',
            allAreas: false,
            borderColor: '#ffffff',
            borderWidth: 0.5,
            states: {
                hover: {
                    color: '#fbbf24',
                    borderColor: '#d97706',
                    brightness: 0.1
                },
                select: {
                    color: '#fbbf24',
                    borderColor: '#d97706'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    fontSize: '10px',
                    fontWeight: '500',
                    textOutline: '2px contrast',
                    color: '#1e293b'
                }
            },
            point: {
                events: {
                    click: function () {
                        const point = this as any;
                        if (options.onProvinceClick) {
                            options.onProvinceClick({
                                id: point['hc-key'],
                                name: point.name,
                                data: point.options
                            });
                        }
                    },
                    mouseOver: function () {
                        const point = this as any;
                        if (options.onProvinceHover) {
                            options.onProvinceHover({
                                id: point['hc-key'],
                                name: point.name,
                                data: point.options
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
        }]
    };

    // Create chart
    const chart = Highcharts.mapChart(containerEl, chartOptions);

    // Return instance with helper methods
    return {
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
        }
    };
}

// Export for UMD/IIFE builds
export default { createVietnamMap };
