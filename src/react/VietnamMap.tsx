import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import { message, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import vnMapData from "../core/assets/vn-all.geo.json";
import { PROVINCE_MAPPING, normalizeName } from "../core/provinceMapping";

// Initialize drilldown module safely
if (typeof Highcharts === 'object') {
    if (!(Highcharts as any).Drilldown) {
        if (typeof HighchartsDrilldown === 'function') {
            HighchartsDrilldown(Highcharts);
        } else if (typeof (HighchartsDrilldown as any)?.default === 'function') {
            (HighchartsDrilldown as any).default(Highcharts);
        }
    }
}

export interface VietnamMapProps {
    data?: any[];
}

const VietnamMap: React.FC<VietnamMapProps> = () => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const [mapOptions, setMapOptions] = useState<Highcharts.Options | null>(null);
    const [topology, setTopology] = useState<any>(null);
    const [, setMergedProvincesData] = useState<any[]>([]);
    const [, setSelectedProvince] = useState<string | null>(null);

    useEffect(() => {
        try {
            setTopology(vnMapData);
        } catch (error) {
            console.error("Error loading map data:", error);
            message.error("Không thể tải dữ liệu bản đồ");
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

                // If only one feature in group, just return it with updated properties
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

                // If multiple features, merge their geometries into a MultiPolygon
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

            // Generate data for the 34 NEW provinces
            const newMapData = mergedFeatures.map((f: any) => {
                const id = f.properties["hc-key"];
                const name = f.properties["name"];

                // Mock data
                const subjects = Math.floor(Math.random() * 10000) + 1000;
                return {
                    "hc-key": id,
                    value: subjects,
                    name: name,
                    facilities: Math.floor(Math.random() * 50) + 5,
                    socialWorkers: Math.floor(Math.random() * 500) + 50,
                    subjects: subjects,
                };
            }).sort((a, b) => a.name.localeCompare(b.name));

            setMergedProvincesData(newMapData);

            const options: Highcharts.Options = {
                chart: {
                    map: processedTopology,
                    backgroundColor: 'transparent',
                    height: 650,
                    style: { fontFamily: 'inherit' },
                },
                title: { text: undefined },
                mapNavigation: {
                    enabled: true,
                    enableDoubleClickZoom: true,
                    buttonOptions: { verticalAlign: 'bottom' }
                },
                colorAxis: {
                    min: 0,
                    stops: [
                        [0, '#E1F5FE'],
                        [0.4, '#4FC3F7'],
                        [1, '#01579B']
                    ],
                    minColor: '#E1F5FE',
                    maxColor: '#01579B',
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderColor: '#e2e8f0',
                    borderRadius: 12,
                    padding: 16,
                    useHTML: true,
                    headerFormat: '<div style="font-size: 16px; font-weight: bold; color: #0f172a; margin-bottom: 12px; border-bottom: 2px solid #0ea5e9; padding-bottom: 8px;">{point.key}</div>',
                    pointFormat: `
                        <div style="display: flex; flex-direction: column; gap: 8px; min-width: 220px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 8px; rounded: 6px;">
                                <span style="color: #64748b; font-weight: 500;">👨‍👩‍👧‍👦 Đối tượng TGXH:</span>
                                <b style="color: #0284c7; font-size: 16px;">{point.subjects}</b>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 8px;">
                                <span style="color: #64748b;">🏛 Cơ sở TGXH:</span>
                                <b style="color: #334155;">{point.facilities}</b>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 8px;">
                                <span style="color: #64748b;">👥 Người làm CTXH:</span>
                                <b style="color: #334155;">{point.socialWorkers}</b>
                            </div>
                        </div>
                    `
                },
                series: [{
                    type: 'map',
                    name: 'Số liệu CTXH',
                    data: newMapData,
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
                                handleProvinceClick(point["hc-key"]);
                            }
                        }
                    }
                }]
            };

            setMapOptions(options);
        }
    }, [topology]);

    const handleProvinceClick = (provinceId: string) => {
        setSelectedProvince(provinceId);
        if (chartRef.current && chartRef.current.chart) {
            const chart = chartRef.current.chart;
            const point = chart.get(provinceId) as any;
            if (point) {
                point.zoomTo();
                point.select(true, false);
            }
        }
    };

    const handleResetZoom = () => {
        if (chartRef.current && chartRef.current.chart) {
            chartRef.current.chart.mapZoom(1);
            setSelectedProvince(null);
            (chartRef.current.chart.series[0] as any).points.forEach((p: any) => p.select(false));
        }
    };

    return (
        <div className="h-full w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative h-full">
                <div className="absolute top-4 right-4 z-10">
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={handleResetZoom}
                        size="small"
                    >
                        Đặt lại
                    </Button>
                </div>
                {mapOptions ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={"mapChart"}
                        options={mapOptions}
                        ref={chartRef}
                    />
                ) : (
                    <div className="h-[600px] flex items-center justify-center text-gray-400">
                        Đang tải bản đồ...
                    </div>
                )}
            </div>
        </div>
    );
};

export default VietnamMap;
