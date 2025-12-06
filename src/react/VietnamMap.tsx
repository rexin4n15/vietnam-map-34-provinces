import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import vnMapData from "../core/assets/vn-all.geo.json";
import { PROVINCE_MAPPING, normalizeName } from "../core/provinceMapping";

// Initialize drilldown module safely
// Ensure this runs on the client side
if (typeof window !== 'undefined' && typeof Highcharts === 'object') {
    if (!(Highcharts as any).Drilldown && !(Highcharts as any).seriesTypes?.mapline?.prototype?.drillTo) {
        // Double check various indicators of drilldown presence
        if (typeof HighchartsDrilldown === 'function') {
            HighchartsDrilldown(Highcharts);
        } else if (typeof (HighchartsDrilldown as any)?.default === 'function') {
            (HighchartsDrilldown as any).default(Highcharts);
        }
    }
}

export interface VietnamMapProps {
    /** Map height in pixels */
    height?: number | string;
    /** Data to display on the map */
    data?: any[];
    /** Color axis configuration */
    colorAxis?: Highcharts.ColorAxisOptions;
    /** Callback when a province is clicked */
    onProvinceClick?: (province: any) => void;
    /** Show zoom control buttons */
    showZoomControls?: boolean;
    /** Show province name labels on the map */
    showLabels?: boolean;
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
    options: customOptions
}) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const [mapOptions, setMapOptions] = useState<Highcharts.Options | null>(null);
    const [topology, setTopology] = useState<any>(null);
    // Track if drilldown is in progress to prevent React from re-rendering the chart
    const isDrillingRef = useRef<boolean>(false);

    useEffect(() => {
        try {
            setTopology(vnMapData);
        } catch (error) {
            console.error("Error loading map data:", error);
        }
    }, []);

    useEffect(() => {
        if (topology) {
            // 1. Group features by their NEW merged ID
            const groupedFeatures: Record<string, any[]> = {};

            topology.features.forEach((f: any) => {
                const originalName = f.properties.name;
                const normalized = normalizeName(originalName);

                // Find new province name
                let newName = PROVINCE_MAPPING[normalized];

                // Fallback for unmatched names
                if (!newName) {
                    // Try partial match
                    const foundKey = Object.keys(PROVINCE_MAPPING).find(key => normalized.includes(key));
                    if (foundKey) {
                        newName = PROVINCE_MAPPING[foundKey];
                    } else {
                        // Keep original if not mapped
                        newName = originalName;
                    }
                }

                const newId = `vn-new-${normalizeName(newName).replace(/\s+/g, '-')}`;

                if (!groupedFeatures[newId]) {
                    groupedFeatures[newId] = [];
                }

                // Store the feature along with its new metadata
                groupedFeatures[newId].push({
                    feature: f,
                    newName: newName,
                    newId: newId
                });
            });

            // 2. Create merged features
            const mergedFeatures = Object.values(groupedFeatures).map((group: any[]) => {
                const firstItem = group[0];
                const newName = firstItem.newName;
                const newId = firstItem.newId;

                // If only one feature in group
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

                // If multiple features, merge their geometries
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

            const processedTopology = {
                ...topology,
                features: mergedFeatures
            };

            // Use provided data or generate minimal default data
            const mapData = data || mergedFeatures.map((f: any) => ({
                "hc-key": f.properties["hc-key"],
                id: f.properties["hc-key"], // Ensure ID is set for retrieval
                drilldown: f.properties["hc-key"].replace("vn-new-", ""), // Use slug for filename
                value: Math.floor(Math.random() * 100),
                name: f.properties["name"]
            }));

            const defaultOptions: Highcharts.Options = {
                chart: {
                    map: processedTopology,
                    backgroundColor: 'transparent',
                    height: height,
                    style: { fontFamily: 'inherit' },
                    events: {
                        drilldown: async function (e: any) {
                            if (!e.seriesOptions) {
                                const chart = this as any;
                                const originalPoint = e.point;
                                const provinceSlug = originalPoint.drilldown;

                                // Lock to prevent React from re-rendering the chart during async load
                                isDrillingRef.current = true;

                                chart.showLoading('<div style="font-family: inherit"><i class="fas fa-spinner fa-spin"></i> Đang tải bản đồ ' + originalPoint.name + '...</div>');

                                try {
                                    // Dynamic import of province JSON
                                    // Webpack/Next.js requires the path to be static-analyzable to some extent
                                    const mapData = await import(`../core/assets/provinces/${provinceSlug}.json`);

                                    // Safety check: if chart was destroyed during await
                                    if (!chart || !chart.renderer) return;

                                    const features = mapData.features || mapData.default?.features || [];

                                    // Generate data for the drilldown series
                                    const seriesData = features.map((f: any) => ({
                                        key: f.properties.GID_3 || f.properties.ID || Math.random().toString(), // Use GID_3 as ID
                                        name: f.properties.NAME_3, // Commune name
                                        value: Math.floor(Math.random() * 1000),
                                        properties: f.properties
                                    }));

                                    // Re-fetch the point from the chart to ensure it's valid (in case of re-renders)
                                    // If point has an ID, use get(), otherwise fallback to originalPoint (risky but best effort)
                                    const currentPoint = (originalPoint.id && chart.get(originalPoint.id)) || originalPoint;

                                    // CRITICAL: Validate that the point is still attached to a series
                                    // After React re-renders, the point's series may become null/undefined
                                    if (!currentPoint || !currentPoint.series) {
                                        console.warn("Drilldown point became invalid after async load. Chart may have been re-rendered.");
                                        chart.hideLoading();
                                        return;
                                    }

                                    // Check if drilldown capabilities exist on the chart
                                    if (chart.addSeriesAsDrilldown) {
                                        chart.addSeriesAsDrilldown(currentPoint, {
                                            name: currentPoint.name,
                                            data: seriesData,
                                            mapData: mapData.default || mapData,
                                            joinBy: ['GID_3', 'key'], // Join by GID_3 property in GeoJSON and key in data
                                            borderColor: '#ffffff',
                                            borderWidth: 0.5,
                                            states: {
                                                hover: {
                                                    color: '#fbbf24',
                                                    borderColor: '#d97706',
                                                }
                                            },
                                            tooltip: {
                                                headerFormat: '<div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">{point.key}</div>',
                                                pointFormat: '<div style="color: #64748b;">{point.properties.TYPE_3} {point.name}</div>'
                                            },
                                            dataLabels: {
                                                enabled: false, // Disable labels for communes by default to avoid clutter
                                                format: '{point.name}'
                                            }
                                        });
                                    } else {
                                        console.error("Drilldown module is not loaded or chart does not support it.");
                                        chart.showLoading('Lỗi: Drilldown module chưa được tải.');
                                    }
                                } catch (error) {
                                    console.error("Failed to load drilldown map:", error);
                                    if (chart && chart.showLoading) {
                                        chart.showLoading('Không tìm thấy dữ liệu bản đồ chi tiết.');
                                        setTimeout(() => chart.hideLoading && chart.hideLoading(), 2000);
                                    }
                                } finally {
                                    // Release the drilling lock
                                    isDrillingRef.current = false;
                                    if (chart && chart.hideLoading) {
                                        chart.hideLoading();
                                    }
                                }
                            }
                        }
                    }
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
                    activeDataLabelStyle: {
                        color: 'white',
                        textDecoration: 'none'
                    },
                    breadcrumbs: {
                        relativeTo: 'spacingBox',
                        floating: true,
                        position: {
                            align: 'left',
                            y: 0,
                            x: 0
                        },
                        buttonTheme: {
                            fill: 'white',
                            'stroke-width': 1,
                            stroke: 'silver',
                            r: 4,
                            states: {
                                hover: {
                                    fill: '#f1f5f9'
                                },
                                select: {
                                    stroke: '#039',
                                    fill: '#f1f5f9'
                                }
                            }
                        }
                    }
                } as Highcharts.DrilldownOptions,
                colorAxis: colorAxis || {
                    min: 0,
                    minColor: '#E1F5FE',
                    maxColor: '#01579B',
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderColor: '#e2e8f0',
                    borderRadius: 8,
                    padding: 12,
                    shadow: true,
                    useHTML: true,
                    headerFormat: '<div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">{point.key}</div>',
                    pointFormat: '<div style="color: #64748b;">Value: <b style="color: #0284c7;">{point.value}</b></div>'
                },
                series: [{
                    type: 'map',
                    name: 'Vietnam',
                    data: mapData,
                    joinBy: 'hc-key',
                    allAreas: false,
                    borderColor: '#ffffff',
                    borderWidth: 0.5,
                    states: {
                        hover: {
                            color: '#fbbf24',
                            borderColor: '#d97706',
                        },
                        select: {
                            color: '#fbbf24',
                            borderColor: '#d97706'
                        }
                    },
                    dataLabels: {
                        enabled: showLabels,
                        format: '{point.name}',
                        allowOverlap: true,
                        crop: false,
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
                                if (onProvinceClick) {
                                    onProvinceClick({
                                        name: point.name,
                                        code: point["hc-key"],
                                        value: point.value,
                                        ...point.properties
                                    });
                                }
                            }
                        }
                    }
                }]
            };

            // Only update options if not in the middle of a drilldown
            if (!isDrillingRef.current) {
                setMapOptions({ ...defaultOptions, ...customOptions });
            }
        }
    }, [topology, data, height, colorAxis, showZoomControls, showLabels, onProvinceClick, customOptions]);

    return (
        <div className="w-full relative">
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
