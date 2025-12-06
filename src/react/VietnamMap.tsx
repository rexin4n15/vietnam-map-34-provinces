import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import vnMapData from "../core/assets/vn-all.geo.json";
import { PROVINCE_MAPPING, normalizeName } from "../core/provinceMapping";

// Initialize drilldown module safely
if (typeof window !== 'undefined' && typeof Highcharts === 'object') {
    if (!(Highcharts as any).Drilldown && !(Highcharts as any).seriesTypes?.mapline?.prototype?.drillTo) {
        if (typeof HighchartsDrilldown === 'function') {
            HighchartsDrilldown(Highcharts as any);
        } else if (typeof (HighchartsDrilldown as any)?.default === 'function') {
            (HighchartsDrilldown as any).default(Highcharts as any);
        }
    }
}

export interface ProvinceData {
    name: string;
    code: string;
    value?: number;
    [key: string]: any;
}

export interface VietnamMapProps {
    /** Map height in pixels or CSS value */
    height?: number | string;
    /** Data to display on the map */
    data?: any[];
    /** Color axis configuration */
    colorAxis?: Highcharts.ColorAxisOptions;
    /** Callback when a province is clicked */
    onProvinceClick?: (province: ProvinceData) => void;
    /** Show zoom control buttons */
    showZoomControls?: boolean;
    /** Show province name labels on the map */
    showLabels?: boolean;
    /** Enable drilldown to commune level when clicking a province */
    enableDrilldown?: boolean;
    /** Custom tooltip formatter function - receives point data, returns HTML string */
    tooltipFormatter?: (point: ProvinceData) => string;
    /** Hover state color */
    hoverColor?: string;
    /** Province border color */
    borderColor?: string;
    /** CSS class for container */
    className?: string;
    /** Custom options to override Highcharts config */
    options?: Highcharts.Options;
}

const VietnamMap: React.FC<VietnamMapProps> = ({
    height = 600,
    data,
    colorAxis,
    onProvinceClick,
    showZoomControls = true,
    showLabels = true,
    enableDrilldown = true,
    tooltipFormatter,
    hoverColor = '#fbbf24',
    borderColor = '#ffffff',
    className,
    options: customOptions
}) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const [mapOptions, setMapOptions] = useState<Highcharts.Options | null>(null);
    const isDrillingRef = useRef<boolean>(false);
    // Store callbacks in refs to avoid re-renders
    const onProvinceClickRef = useRef(onProvinceClick);
    const tooltipFormatterRef = useRef(tooltipFormatter);

    // Update refs when props change
    useEffect(() => {
        onProvinceClickRef.current = onProvinceClick;
        tooltipFormatterRef.current = tooltipFormatter;
    }, [onProvinceClick, tooltipFormatter]);

    // Memoize processed topology to avoid recalculating on each render
    const { processedTopology, mergedFeatures } = useMemo(() => {
        if (!vnMapData) return { processedTopology: null, mergedFeatures: [] };

        const groupedFeatures: Record<string, any[]> = {};

        vnMapData.features.forEach((f: any) => {
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

            groupedFeatures[newId].push({
                feature: f,
                newName: newName,
                newId: newId
            });
        });

        const merged = Object.values(groupedFeatures).map((group: any[]) => {
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
                    ...firstItem.feature.properties,
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

        return {
            processedTopology: { ...vnMapData, features: merged },
            mergedFeatures: merged
        };
    }, []); // Only compute once since vnMapData is static

    // Memoize map data
    const mapData = useMemo(() => {
        if (!mergedFeatures.length) return [];
        return data || mergedFeatures.map((f: any) => ({
            "hc-key": f.properties["hc-key"],
            id: f.properties["hc-key"],
            drilldown: enableDrilldown ? f.properties["hc-key"].replace("vn-new-", "") : undefined,
            value: Math.floor(Math.random() * 100),
            name: f.properties["name"]
        }));
    }, [data, mergedFeatures, enableDrilldown]);

    // Stable drilldown handler
    const handleDrilldown = useCallback(async function (this: any, e: any) {
        if (!e.seriesOptions) {
            const chart = this;
            const originalPoint = e.point;
            const provinceSlug = originalPoint.drilldown;

            isDrillingRef.current = true;
            chart.showLoading(`<div style="font-family: inherit">Đang tải bản đồ ${originalPoint.name}...</div>`);

            try {
                const importedMapData = await import(`../core/assets/provinces/${provinceSlug}.json`);

                if (!chart || !chart.renderer) return;

                const features = importedMapData.features || importedMapData.default?.features || [];
                const seriesData = features.map((f: any) => ({
                    key: f.properties.GID_3 || f.properties.ID || Math.random().toString(),
                    name: f.properties.NAME_3,
                    value: Math.floor(Math.random() * 1000),
                    properties: f.properties
                }));

                const currentPoint = (originalPoint.id && chart.get(originalPoint.id)) || originalPoint;

                if (!currentPoint || !currentPoint.series) {
                    console.warn("Drilldown point became invalid after async load.");
                    chart.hideLoading();
                    return;
                }

                if (chart.addSeriesAsDrilldown) {
                    chart.addSeriesAsDrilldown(currentPoint, {
                        name: currentPoint.name,
                        data: seriesData,
                        mapData: importedMapData.default || importedMapData,
                        joinBy: ['GID_3', 'key'],
                        borderColor: borderColor,
                        borderWidth: 0.5,
                        states: {
                            hover: { color: hoverColor, borderColor: '#d97706' }
                        },
                        tooltip: {
                            headerFormat: '<div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">{point.key}</div>',
                            pointFormat: '<div style="color: #64748b;">{point.properties.TYPE_3} {point.name}</div>'
                        },
                        dataLabels: { enabled: false, format: '{point.name}' }
                    });
                }
            } catch (error) {
                console.error("Failed to load drilldown map:", error);
                chart?.showLoading?.('Không tìm thấy dữ liệu bản đồ chi tiết.');
                setTimeout(() => chart?.hideLoading?.(), 2000);
            } finally {
                isDrillingRef.current = false;
                chart?.hideLoading?.();
            }
        }
    }, [hoverColor, borderColor]);

    // Build chart options
    useEffect(() => {
        if (!processedTopology || !mapData.length) return;

        const options: Highcharts.Options = {
            chart: {
                map: processedTopology,
                backgroundColor: 'transparent',
                height: height,
                style: { fontFamily: 'inherit' },
                events: enableDrilldown ? { drilldown: handleDrilldown } : {}
            },
            title: { text: undefined },
            credits: { enabled: false },
            accessibility: { enabled: false },
            mapNavigation: {
                enabled: showZoomControls,
                enableDoubleClickZoom: true,
                buttonOptions: { verticalAlign: 'bottom' }
            },
            drilldown: {
                activeDataLabelStyle: { color: 'white', textDecoration: 'none' },
                breadcrumbs: {
                    relativeTo: 'spacingBox',
                    floating: true,
                    position: { align: 'left', y: 0, x: 0 },
                    buttonTheme: {
                        fill: 'white',
                        'stroke-width': 1,
                        stroke: 'silver',
                        r: 4,
                        states: {
                            hover: { fill: '#f1f5f9' },
                            select: { stroke: '#039', fill: '#f1f5f9' }
                        }
                    }
                }
            } as Highcharts.DrilldownOptions,
            colorAxis: colorAxis || { min: 0, minColor: '#E1F5FE', maxColor: '#01579B' },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#e2e8f0',
                borderRadius: 8,
                padding: 12,
                shadow: true,
                useHTML: true,
                formatter: tooltipFormatter ? function (this: any) {
                    const point = this.point;
                    return tooltipFormatterRef.current?.({
                        name: point.name,
                        code: point["hc-key"],
                        value: point.value,
                        ...point.properties
                    }) || '';
                } : undefined,
                headerFormat: tooltipFormatter ? undefined : '<div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">{point.key}</div>',
                pointFormat: tooltipFormatter ? undefined : '<div style="color: #64748b;">Value: <b style="color: #0284c7;">{point.value}</b></div>'
            },
            series: [{
                type: 'map',
                name: 'Vietnam',
                data: mapData,
                joinBy: 'hc-key',
                allAreas: false,
                borderColor: borderColor,
                borderWidth: 0.5,
                states: {
                    hover: { color: hoverColor, borderColor: '#d97706' },
                    select: { color: hoverColor, borderColor: '#d97706' }
                },
                dataLabels: {
                    enabled: showLabels,
                    format: '{point.name}',
                    allowOverlap: true,
                    crop: false,
                    style: { fontSize: '10px', fontWeight: '500', textOutline: '2px contrast', color: '#1e293b' }
                },
                point: {
                    events: {
                        click: function () {
                            const point = this as any;
                            onProvinceClickRef.current?.({
                                name: point.name,
                                code: point["hc-key"],
                                value: point.value,
                                ...point.properties
                            });
                        }
                    }
                }
            }]
        };

        if (!isDrillingRef.current) {
            setMapOptions({ ...options, ...customOptions });
        }
    }, [processedTopology, mapData, height, colorAxis, showZoomControls, showLabels, enableDrilldown, hoverColor, borderColor, handleDrilldown, customOptions]);

    return (
        <div className={`w-full relative ${className || ''}`}>
            {mapOptions ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"mapChart"}
                    options={mapOptions}
                    ref={chartRef}
                />
            ) : (
                <div className="flex items-center justify-center text-gray-400" style={{ height }}>
                    Loading map...
                </div>
            )}
        </div>
    );
};

export default VietnamMap;
