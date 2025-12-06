# Vietnam Map - 34 Provinces

![Vietnam Map 34 Provinces](banner.jpeg)

[![npm version](https://img.shields.io/npm/v/@xdev-asia/vietnam-map-34-provinces.svg)](https://www.npmjs.com/package/@xdev-asia/vietnam-map-34-provinces)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Demo](https://img.shields.io/badge/Demo-Live-green.svg)](https://xdev-asia-labs.github.io/vietnam-map-34-provinces/)

Interactive map component hiển thị bản đồ Việt Nam với **34 tỉnh/thành phố** và **3,321 xã/phường** theo cấu trúc hành chính mới (QĐ 19/2025/QĐ-TTg, hiệu lực 01/07/2025).

**🔗 [Live Demo](https://xdev-asia-labs.github.io/vietnam-map-34-provinces/)** | **📖 [Documentation](https://xdev-asia-labs.github.io/vietnam-map-34-provinces/docs/vanilla.html)**

## 🖼️ Showcase

| Bản đồ tổng quan | Drilldown cấp xã | Tùy chọn màu sắc |
|:---:|:---:|:---:|
| ![Bản đồ tổng quan](show-case-01.png) | ![Drilldown cấp xã](show-case-02.png) | ![Tùy chọn màu sắc](show-case-03.png) |

## ✨ Highlights

- 🗺️ **34 tỉnh/TP mới** (6 TP trực thuộc TW + 28 tỉnh)
- 📍 **3,321 xã/phường** với mã BNV + TMS chính thức
- 🔄 **2 cấp hành chính**: Tỉnh → Xã (bỏ cấp Huyện)
- 🎯 **Framework-agnostic**: Vanilla JS, React, Vue, Angular
- 📦 **TypeScript** full support

## 📦 Installation

```bash
npm install @xdev-asia/vietnam-map-34-provinces highcharts
```

## 🚀 Quick Start

### Vanilla JavaScript

```javascript
import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

const map = createVietnamMap('#container', {
  height: 600,
  onProvinceClick: (province) => console.log('Clicked:', province.name)
});
```

### React

```tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

function App() {
  // Custom data cho từng tỉnh
  const provinceData = [
    {
      name: 'Hà Nội',
      value: 8500000,
      population: 8500000,
      gdp: 150000,
      hospitals: 120
    },
    {
      name: 'Hồ Chí Minh', 
      value: 9000000,
      population: 9000000,
      gdp: 280000,
      hospitals: 200
    },
    {
      name: 'Đà Nẵng',
      value: 1200000,
      population: 1200000,
      gdp: 45000,
      hospitals: 45
    }
    // ... thêm data cho các tỉnh khác
  ];

  return (
    <VietnamMap
      height={600}
      data={provinceData}
      showLabels={true}
      showZoomControls={true}
      enableDrilldown={true}
      hoverColor="#fbbf24"
      colorAxis={{
        minColor: "#1e293b",
        maxColor: "#0ea5e9"
      }}
      tooltipFormatter={(point) => {
        // Custom tooltip theo từng tỉnh với data riêng
        return `
          <div style="padding: 12px; min-width: 200px;">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; border-bottom: 2px solid #0ea5e9; padding-bottom: 4px;">
              ${point.name}
            </div>
            <div style="margin: 4px 0;">
              <span style="color: #64748b;">Dân số:</span> 
              <b>${point.population?.toLocaleString() || 'N/A'}</b>
            </div>
            <div style="margin: 4px 0;">
              <span style="color: #64748b;">GDP:</span> 
              <b>${point.gdp?.toLocaleString() || 'N/A'} tỷ VNĐ</b>
            </div>
            <div style="margin: 4px 0;">
              <span style="color: #64748b;">Bệnh viện:</span> 
              <b>${point.hospitals || 'N/A'}</b>
            </div>
          </div>
        `;
      }}
      onProvinceClick={(province) => {
        console.log('Clicked:', province);
        // province object sẽ chứa tất cả custom fields: population, gdp, hospitals
      }}
    />
  );
}
```

#### React Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number \| string` | `600` | Chiều cao bản đồ (px hoặc CSS value) |
| `data` | `any[]` | - | **Dữ liệu cho từng tỉnh**. Mỗi object cần có `name` (tên tỉnh) và `value` (giá trị để tô màu). Có thể thêm bất kỳ field nào: `{name: 'Hà Nội', value: 100, population: 8500000, hospitals: 120}` |
| `colorAxis` | `Highcharts.ColorAxisOptions` | - | Cấu hình gradient màu (minColor, maxColor, etc.) |
| `onProvinceClick` | `(province: ProvinceData) => void` | - | Callback khi click vào tỉnh, nhận object chứa tất cả data của tỉnh đó |
| `showZoomControls` | `boolean` | `true` | Hiển thị nút zoom (+/-) |
| `showLabels` | `boolean` | `true` | Hiển thị tên tỉnh trên bản đồ |
| `enableDrilldown` | `boolean` | `true` | Cho phép click vào tỉnh để xem cấp xã/phường |
| `tooltipFormatter` | `(point: ProvinceData) => string` | - | **Custom tooltip theo từng tỉnh**. Hàm nhận `point` chứa tất cả data của tỉnh (bao gồm custom fields) và return HTML string |
| `hoverColor` | `string` | `#fbbf24` | Màu sắc khi hover chuột vào tỉnh |
| `borderColor` | `string` | `#ffffff` | Màu viền giữa các tỉnh |
| `className` | `string` | - | CSS class cho container wrapper |
| `options` | `Highcharts.Options` | - | Override toàn bộ Highcharts config (advanced) |

**💡 Tip**: Các custom fields trong `data` sẽ tự động được pass vào `tooltipFormatter` và `onProvinceClick`, cho phép bạn hiển thị thông tin riêng biệt cho từng tỉnh.

## 🎨 Advanced Usage

### Custom Tooltip với Data động

```tsx
function HealthcareMap() {
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    // Fetch data từ API
    fetch('/api/healthcare-stats')
      .then(res => res.json())
      .then(data => setHealthData(data));
  }, []);

  return (
    <VietnamMap
      data={healthData}
      tooltipFormatter={(point) => `
        <div style="padding: 10px; background: white; border-radius: 8px;">
          <h3 style="margin: 0 0 8px 0;">${point.name}</h3>
          <table style="width: 100%; font-size: 13px;">
            <tr>
              <td style="color: #666; padding: 2px 8px 2px 0;">Số ca nhiễm:</td>
              <td style="font-weight: bold; text-align: right;">${point.cases || 0}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 2px 8px 2px 0;">Số ca hồi phục:</td>
              <td style="font-weight: bold; text-align: right; color: #10b981;">${point.recovered || 0}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 2px 8px 2px 0;">Tỷ lệ tiêm chủng:</td>
              <td style="font-weight: bold; text-align: right; color: #3b82f6;">${point.vaccinationRate || 0}%</td>
            </tr>
          </table>
        </div>
      `}
    />
  );
}
```

### Tích hợp với State Management

```tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import { useProvinceStats } from './hooks/useProvinceStats';

function Dashboard() {
  const { stats, loading } = useProvinceStats();
  const [selectedProvince, setSelectedProvince] = useState(null);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <VietnamMap
          data={stats}
          tooltipFormatter={(point) => `
            <div>
              <b>${point.name}</b><br/>
              ${point.metric}: ${point.value}
            </div>
          `}
          onProvinceClick={(province) => setSelectedProvince(province)}
        />
      </div>
      {selectedProvince && (
        <div className="w-80 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">{selectedProvince.name}</h2>
          <div className="mt-4">
            <p>Dân số: {selectedProvince.population?.toLocaleString()}</p>
            <p>Diện tích: {selectedProvince.area} km²</p>
            {/* More details */}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Load Data từ API và Custom

```tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import { useState, useEffect } from 'react';

function APIDataMap() {
  const [provinceData, setProvinceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data từ backend
    async function fetchData() {
      try {
        const response = await fetch('/api/provinces/statistics');
        const data = await response.json();
        
        // Transform data theo format của map
        const formattedData = data.map(item => ({
          name: item.province_name,
          value: item.total_cases,
          // Custom fields
          activeCases: item.active_cases,
          recoveredCases: item.recovered_cases,
          vaccinationRate: item.vaccination_rate,
          lastUpdated: item.updated_at
        }));
        
        setProvinceData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading map data...</div>;

  return (
    <VietnamMap
      data={provinceData}
      tooltipFormatter={(point) => `
        <div style="padding: 12px; min-width: 250px;">
          <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">
            ${point.name}
          </div>
          <table style="width: 100%; font-size: 13px;">
            <tr>
              <td style="color: #666;">Tổng ca:</td>
              <td style="text-align: right;"><b>${point.value?.toLocaleString()}</b></td>
            </tr>
            <tr>
              <td style="color: #666;">Đang điều trị:</td>
              <td style="text-align: right; color: #f59e0b;"><b>${point.activeCases?.toLocaleString()}</b></td>
            </tr>
            <tr>
              <td style="color: #666;">Đã khỏi:</td>
              <td style="text-align: right; color: #10b981;"><b>${point.recoveredCases?.toLocaleString()}</b></td>
            </tr>
            <tr>
              <td style="color: #666;">Tỷ lệ tiêm:</td>
              <td style="text-align: right; color: #3b82f6;"><b>${point.vaccinationRate}%</b></td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 8px; font-size: 11px; color: #999; border-top: 1px solid #eee;">
                Cập nhật: ${new Date(point.lastUpdated).toLocaleString('vi-VN')}
              </td>
            </tr>
          </table>
        </div>
      `}
      onProvinceClick={(province) => {
        // Navigate to detail page or open modal
        window.location.href = `/provinces/${province.name}`;
      }}
    />
  );
}
```

### Export/Download Map Data

```tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import { useRef } from 'react';

function ExportableMap() {
  const mapRef = useRef(null);
  
  const exportToCSV = (data) => {
    const csv = [
      ['Tỉnh/TP', 'Giá trị', 'Dân số', 'GDP', 'Bệnh viện'],
      ...data.map(d => [d.name, d.value, d.population, d.gdp, d.hospitals])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `vietnam-map-data-${Date.now()}.csv`;
    link.click();
  };
  
  const exportToJSON = (data) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `vietnam-map-data-${Date.now()}.json`;
    link.click();
  };
  
  const captureMapImage = () => {
    // Access Highcharts instance through ref
    if (mapRef.current && mapRef.current.chart) {
      mapRef.current.chart.exportChart({
        type: 'image/png',
        filename: 'vietnam-map'
      });
    }
  };

  const myData = [
    { name: 'Hà Nội', value: 8500000, population: 8500000, gdp: 150000, hospitals: 120 },
    // ... more data
  ];

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => exportToCSV(myData)}>
          📥 Download CSV
        </button>
        <button onClick={() => exportToJSON(myData)}>
          📥 Download JSON
        </button>
        <button onClick={captureMapImage}>
          📷 Export Image
        </button>
      </div>
      
      <VietnamMap
        ref={mapRef}
        data={myData}
        height={600}
      />
    </div>
  );
}
```

### Real-time Data với WebSocket

```tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import { useState, useEffect } from 'react';

function RealtimeMap() {
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/realtime');
    
    ws.onmessage = (event) => {
      const updates = JSON.parse(event.data);
      
      setLiveData(prevData => {
        const newData = [...prevData];
        updates.forEach(update => {
          const index = newData.findIndex(d => d.name === update.province);
          if (index >= 0) {
            newData[index] = { ...newData[index], ...update };
          } else {
            newData.push({
              name: update.province,
              value: update.value,
              ...update
            });
          }
        });
        return newData;
      });
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <div className="mb-2 text-sm text-gray-500">
        🔴 Live • Cập nhật real-time
      </div>
      <VietnamMap
        data={liveData}
        tooltipFormatter={(point) => `
          <div>
            <b>${point.name}</b><br/>
            Giá trị: ${point.value}<br/>
            <small style="color: #10b981;">● Live</small>
          </div>
        `}
      />
    </div>
  );
}
```

## 🛠️ Core API

Tra cứu dữ liệu tỉnh/xã với bất kỳ framework nào:

```javascript
import { 
  // Province utilities
  NEW_34_PROVINCES,
  getProvinceByName,
  getNewProvinceName,
  getProvinceByCode,
  
  // Commune utilities  
  getProvinceCommunes,
  getProvinceData,
  searchCommunes,
  getProvinceStats,
  
  // Lookup tables
  OLD_TO_NEW_PROVINCE_MAP,
  TMS_CODE_TO_PROVINCE
} from '@xdev-asia/vietnam-map-34-provinces/core';

// Get all communes in a province
const communes = getProvinceCommunes('Hà Nội');
console.log(communes.length); // 126

// Search communes by name
const results = searchCommunes('Ba Đình');
// [{ province: 'Hà Nội', commune: { code: 10101003, name: 'Phường Ba Đình' } }]

// Get province by TMS code (for tax systems)
const province = getProvinceByTMSCode(101); // Hà Nội

// Convert old province name to new
getNewProvinceName('Hà Giang'); // → "Tuyên Quang"
getNewProvinceName('Bình Dương'); // → "Hồ Chí Minh"

// Statistics
console.log(getProvinceStats());
// {
//   totalProvinces: 34,
//   totalCommunes: 3321,
//   cities: 6,
//   provinces: 28,
//   largestProvince: { name: 'Hồ Chí Minh', commune_count: 168 },
//   smallestProvince: { name: 'Lai Châu', commune_count: 38 }
// }
```

## 📊 Data Format & Structure

### Input Data Format

Data truyền vào prop `data` phải tuân theo format:

```typescript
interface ProvinceData {
  name: string;          // Tên tỉnh (bắt buộc, phải khớp với 34 tỉnh)
  value: number;         // Giá trị để tô màu (bắt buộc)
  [key: string]: any;    // Các field tùy chỉnh
}
```

**Ví dụ:**

```javascript
const data = [
  {
    name: 'Hà Nội',
    value: 8500000,
    // Custom fields - sẽ được pass vào tooltipFormatter và onProvinceClick
    population: 8500000,
    area: 3344.7,
    gdp: 150000,
    growth: 7.5,
    hospitals: 120,
    density: 2540
  },
  {
    name: 'Hồ Chí Minh',
    value: 9000000,
    population: 9000000,
    area: 9650,
    gdp: 280000,
    growth: 8.2,
    hospitals: 200,
    density: 932
  }
  // ... 32 tỉnh còn lại
];
```

### Danh sách 34 Tỉnh/TP (chính xác)

```javascript
const VALID_PROVINCES = [
  'Hà Nội', 'Bắc Ninh', 'Quảng Ninh', 'Hải Phòng', 'Hưng Yên',
  'Ninh Bình', 'Cao Bằng', 'Tuyên Quang', 'Lào Cai', 'Thái Nguyên',
  'Lạng Sơn', 'Phú Thọ', 'Điện Biên', 'Lai Châu', 'Sơn La',
  'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Trị', 'Huế',
  'Đà Nẵng', 'Quảng Ngãi', 'Khánh Hòa', 'Gia Lai', 'Đắk Lắk',
  'Lâm Đồng', 'Tây Ninh', 'Đồng Nai', 'Hồ Chí Minh', 'Vĩnh Long',
  'Đồng Tháp', 'An Giang', 'Cần Thơ', 'Cà Mau'
];
```

### Transform Data từ Database

```typescript
// Backend API response
interface DBProvince {
  province_id: number;
  province_name: string;
  total_population: number;
  total_area: number;
  gdp_value: number;
}

// Transform function
function transformToMapData(dbData: DBProvince[]) {
  return dbData.map(item => ({
    name: item.province_name,
    value: item.total_population,  // Dùng để tô màu
    population: item.total_population,
    area: item.total_area,
    gdp: item.gdp_value,
    density: Math.round(item.total_population / item.total_area)
  }));
}

// Usage
const dbResponse = await fetch('/api/provinces').then(r => r.json());
const mapData = transformToMapData(dbResponse);

<VietnamMap data={mapData} />
```

### Normalize Province Names

Nếu data từ nguồn khác có tên tỉnh không chuẩn:

```javascript
import { getNewProvinceName } from '@xdev-asia/vietnam-map-34-provinces/core';

function normalizeData(rawData) {
  return rawData.map(item => {
    // Convert tên tỉnh cũ sang tỉnh mới
    const normalizedName = getNewProvinceName(item.province) || item.province;
    
    return {
      name: normalizedName,
      value: item.value,
      ...item
    };
  }).filter(item => {
    // Chỉ giữ lại các tỉnh hợp lệ
    return VALID_PROVINCES.includes(item.name);
  });
}

// Example
const rawData = [
  { province: 'Hà Giang', value: 100 },  // → Tuyên Quang
  { province: 'Bình Dương', value: 200 }, // → Hồ Chí Minh
  { province: 'Hà Nội', value: 300 }      // → Hà Nội
];

const normalized = normalizeData(rawData);
```

## 🎯 Best Practices

### 1. Performance Optimization

```typescript
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import { useMemo } from 'react';

function OptimizedMap({ rawData }) {
  // Memoize transformed data
  const mapData = useMemo(() => {
    return rawData.map(item => ({
      name: item.province_name,
      value: item.total,
      ...item
    }));
  }, [rawData]);
  
  // Memoize tooltip formatter
  const tooltipFormatter = useMemo(() => {
    return (point) => `<div><b>${point.name}</b>: ${point.value}</div>`;
  }, []);

  return (
    <VietnamMap
      data={mapData}
      tooltipFormatter={tooltipFormatter}
    />
  );
}
```

### 2. Error Handling

```typescript
function SafeMap({ data }) {
  const [error, setError] = useState(null);
  
  // Validate data
  const validatedData = useMemo(() => {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
      }
      
      return data.map(item => {
        if (!item.name || !item.value) {
          console.warn('Missing name or value:', item);
          return null;
        }
        return item;
      }).filter(Boolean);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [data]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return <VietnamMap data={validatedData} />;
}
```

### 3. Loading States

```typescript
function MapWithLoading() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/provinces')
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
          <p>Đang tải bản đồ...</p>
        </div>
      </div>
    );
  }

  return <VietnamMap data={data} height={600} />;
}
```

### 4. Responsive Design

```typescript
function ResponsiveMap() {
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        setHeight(400);
      } else if (window.innerWidth < 1024) {
        setHeight(500);
      } else {
        setHeight(600);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="w-full">
      <VietnamMap
        height={height}
        showLabels={window.innerWidth >= 768}
      />
    </div>
  );
}
```

### 5. Data Caching

```typescript
import { useQuery } from '@tanstack/react-query';

function CachedMapData() {
  const { data, isLoading } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => fetch('/api/provinces').then(r => r.json()),
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    cacheTime: 10 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;

  return <VietnamMap data={data} />;
}
```

## 📘 TypeScript Support

### Type Definitions

```typescript
import type { VietnamMapProps, ProvinceData } from '@xdev-asia/vietnam-map-34-provinces/react';

// Define custom data type
interface HealthcareData extends ProvinceData {
  name: string;
  value: number;
  hospitals: number;
  doctors: number;
  beds: number;
  vaccinationRate: number;
  lastUpdated: string;
}

// Use in component
function TypedMap() {
  const [data, setData] = useState<HealthcareData[]>([]);
  
  const handleClick = (province: HealthcareData) => {
    console.log(`${province.name} has ${province.hospitals} hospitals`);
  };
  
  return (
    <VietnamMap
      data={data}
      onProvinceClick={handleClick}
      tooltipFormatter={(point: HealthcareData) => `
        <div>
          <b>${point.name}</b><br/>
          Hospitals: ${point.hospitals}<br/>
          Doctors: ${point.doctors}<br/>
          Beds: ${point.beds}
        </div>
      `}
    />
  );
}
```

### Generic Type Helper

```typescript
// Define a generic map component
function TypedVietnamMap<T extends ProvinceData>({
  data,
  tooltipBuilder,
  onSelect
}: {
  data: T[];
  tooltipBuilder: (item: T) => string;
  onSelect: (item: T) => void;
}) {
  return (
    <VietnamMap
      data={data}
      tooltipFormatter={tooltipBuilder}
      onProvinceClick={onSelect}
    />
  );
}

// Usage with specific type
interface EconomicData extends ProvinceData {
  gdp: number;
  gdpGrowth: number;
  fdi: number;
}

<TypedVietnamMap<EconomicData>
  data={economicData}
  tooltipBuilder={(item) => `GDP: ${item.gdp}`}
  onSelect={(item) => console.log(item.gdpGrowth)}
/>
```

## 🔗 Integration Examples

### Next.js App Router

```tsx
// app/map/page.tsx
import dynamic from 'next/dynamic';

const VietnamMap = dynamic(
  () => import('@xdev-asia/vietnam-map-34-provinces/react').then(m => m.VietnamMap),
  { ssr: false }
);

export default async function MapPage() {
  // Fetch data server-side
  const data = await fetch('https://api.example.com/provinces', {
    next: { revalidate: 3600 } // Revalidate mỗi giờ
  }).then(r => r.json());

  return (
    <main>
      <h1>Vietnam Map</h1>
      <VietnamMap data={data} height={600} />
    </main>
  );
}
```

### Next.js với Server Actions

```tsx
// app/actions.ts
'use server';

export async function getProvinceData() {
  const res = await fetch('https://api.example.com/provinces');
  return res.json();
}

// app/map/page.tsx
'use client';
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import { useEffect, useState } from 'react';
import { getProvinceData } from '../actions';

export default function MapPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProvinceData().then(setData);
  }, []);

  return <VietnamMap data={data} />;
}
```

### Redux Integration

```typescript
// store/mapSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProvinceData = createAsyncThunk(
  'map/fetchData',
  async () => {
    const response = await fetch('/api/provinces');
    return response.json();
  }
);

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    data: [],
    loading: false,
    selectedProvince: null
  },
  reducers: {
    selectProvince: (state, action) => {
      state.selectedProvince = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvinceData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  }
});

// Component
import { useSelector, useDispatch } from 'react-redux';
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

function ReduxMap() {
  const dispatch = useDispatch();
  const { data, loading, selectedProvince } = useSelector((state) => state.map);

  useEffect(() => {
    dispatch(fetchProvinceData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <VietnamMap
      data={data}
      onProvinceClick={(province) => dispatch(selectProvince(province))}
    />
  );
}
```

### Zustand State Management

```typescript
// store/useMapStore.ts
import { create } from 'zustand';

interface MapStore {
  data: ProvinceData[];
  selectedProvince: ProvinceData | null;
  loading: boolean;
  fetchData: () => Promise<void>;
  selectProvince: (province: ProvinceData) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  data: [],
  selectedProvince: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true });
    const data = await fetch('/api/provinces').then(r => r.json());
    set({ data, loading: false });
  },
  selectProvince: (province) => set({ selectedProvince: province })
}));

// Component
function ZustandMap() {
  const { data, loading, fetchData, selectProvince } = useMapStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  return <VietnamMap data={data} onProvinceClick={selectProvince} />;
}
```

### TanStack Table + Map

```tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

function TableMapView() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const table = useReactTable({
    data,
    columns: [
      { accessorKey: 'name', header: 'Tỉnh/TP' },
      { accessorKey: 'population', header: 'Dân số' },
      { accessorKey: 'gdp', header: 'GDP' }
    ],
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <VietnamMap
          data={data}
          onProvinceClick={(province) => {
            const row = data.findIndex(d => d.name === province.name);
            setSelectedRow(row);
          }}
        />
      </div>
      <div>
        <table>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={selectedRow === row.index ? 'bg-blue-100' : ''}
              onClick={() => setSelectedRow(row.index)}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{cell.renderValue()}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
```

## 📊 34 Tỉnh/Thành Phố

### 6 Thành phố trực thuộc Trung ương

| # | Tên | Xã/Phường | Hợp nhất từ |
|---|-----|-----------|-------------|
| 1 | Hà Nội | 126 | Hà Nội + Hà Tây |
| 4 | Hải Phòng | 114 | Hải Phòng + Hải Dương |
| 20 | Huế | 40 | Thừa Thiên Huế |
| 21 | Đà Nẵng | 94 | Đà Nẵng + Quảng Nam |
| 29 | Hồ Chí Minh | 168 | HCM + Bình Dương + Bà Rịa-VT |
| 33 | Cần Thơ | 103 | Cần Thơ + Hậu Giang + Sóc Trăng |

### 28 Tỉnh

| # | Tên | Xã | Hợp nhất từ |
|---|-----|-----|-------------|
| 2 | Bắc Ninh | 99 | Bắc Ninh + Bắc Giang |
| 3 | Quảng Ninh | 54 | - |
| 5 | Hưng Yên | 104 | Hưng Yên + Thái Bình |
| 6 | Ninh Bình | 129 | Ninh Bình + Nam Định + Hà Nam |
| 7 | Cao Bằng | 56 | - |
| 8 | Tuyên Quang | 124 | Tuyên Quang + Hà Giang |
| 9 | Lào Cai | 99 | Lào Cai + Yên Bái |
| 10 | Thái Nguyên | 92 | Thái Nguyên + Bắc Kạn |
| 11 | Lạng Sơn | 65 | - |
| 12 | Phú Thọ | 148 | Phú Thọ + Vĩnh Phúc + Hòa Bình |
| 13 | Điện Biên | 45 | - |
| 14 | Lai Châu | 38 | - |
| 15 | Sơn La | 75 | - |
| 16 | Thanh Hóa | 166 | - |
| 17 | Nghệ An | 130 | - |
| 18 | Hà Tĩnh | 69 | - |
| 19 | Quảng Trị | 78 | Quảng Trị + Quảng Bình |
| 22 | Quảng Ngãi | 96 | Quảng Ngãi + Kon Tum |
| 23 | Khánh Hòa | 65 | Khánh Hòa + Ninh Thuận |
| 24 | Gia Lai | 135 | Gia Lai + Bình Định |
| 25 | Đắk Lắk | 102 | Đắk Lắk + Phú Yên |
| 26 | Lâm Đồng | 124 | Lâm Đồng + Đắk Nông + Bình Thuận |
| 27 | Tây Ninh | 96 | Tây Ninh + Long An |
| 28 | Đồng Nai | 95 | Đồng Nai + Bình Phước |
| 30 | Vĩnh Long | 124 | Vĩnh Long + Bến Tre + Trà Vinh |
| 31 | Đồng Tháp | 102 | Đồng Tháp + Tiền Giang |
| 32 | An Giang | 102 | An Giang + Kiên Giang |
| 34 | Cà Mau | 64 | Cà Mau + Bạc Liêu |

## 🔌 Backend API Examples

### Node.js + Express

```javascript
// server.js
import express from 'express';
import { getProvinceCommunes, getProvinceStats } from '@xdev-asia/vietnam-map-34-provinces/core';

const app = express();

// Get all provinces with statistics
app.get('/api/provinces', (req, res) => {
  const stats = getProvinceStats();
  res.json(stats);
});

// Get specific province data
app.get('/api/provinces/:name', (req, res) => {
  const communes = getProvinceCommunes(req.params.name);
  res.json({
    province: req.params.name,
    total_communes: communes.length,
    communes: communes
  });
});

// Get provinces with custom data from database
app.get('/api/provinces/data', async (req, res) => {
  const provinces = await db.query(`
    SELECT 
      p.name,
      p.population,
      p.area,
      p.gdp,
      COUNT(h.id) as hospitals
    FROM provinces p
    LEFT JOIN hospitals h ON h.province_id = p.id
    GROUP BY p.id
  `);
  
  res.json(provinces.map(p => ({
    name: p.name,
    value: p.population,
    population: p.population,
    area: p.area,
    gdp: p.gdp,
    hospitals: p.hospitals
  })));
});

app.listen(3000);
```

### Python + FastAPI

```python
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load province data
with open('provinces.json') as f:
    provinces_data = json.load(f)

@app.get("/api/provinces")
def get_provinces():
    return [
        {
            "name": p["name"],
            "value": p["population"],
            "population": p["population"],
            "area": p["area"],
            "gdp": p["gdp"]
        }
        for p in provinces_data
    ]

@app.get("/api/provinces/{province_name}")
def get_province(province_name: str):
    province = next((p for p in provinces_data if p["name"] == province_name), None)
    if not province:
        return {"error": "Province not found"}, 404
    return province
```

### GraphQL API

```typescript
// schema.ts
import { gql } from 'apollo-server';

const typeDefs = gql`
  type Province {
    name: String!
    value: Int!
    population: Int
    area: Float
    gdp: Float
    hospitals: Int
    universities: Int
  }

  type Query {
    provinces: [Province!]!
    province(name: String!): Province
    searchProvinces(query: String!): [Province!]!
  }
`;

const resolvers = {
  Query: {
    provinces: async () => {
      return await db.province.findMany();
    },
    province: async (_, { name }) => {
      return await db.province.findUnique({ where: { name } });
    },
    searchProvinces: async (_, { query }) => {
      return await db.province.findMany({
        where: {
          name: { contains: query }
        }
      });
    }
  }
};

// Client usage
import { useQuery, gql } from '@apollo/client';

const GET_PROVINCES = gql`
  query GetProvinces {
    provinces {
      name
      value
      population
      gdp
      hospitals
    }
  }
`;

function GraphQLMap() {
  const { data, loading } = useQuery(GET_PROVINCES);
  
  if (loading) return <div>Loading...</div>;
  
  return <VietnamMap data={data.provinces} />;
}
```

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)

```typescript
// VietnamMap.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

describe('VietnamMap', () => {
  const mockData = [
    { name: 'Hà Nội', value: 8500000 },
    { name: 'Hồ Chí Minh', value: 9000000 }
  ];

  it('renders map container', () => {
    render(<VietnamMap data={mockData} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('calls onProvinceClick when province is clicked', () => {
    const handleClick = jest.fn();
    render(
      <VietnamMap 
        data={mockData} 
        onProvinceClick={handleClick} 
      />
    );
    
    // Simulate province click
    const province = screen.getByText('Hà Nội');
    fireEvent.click(province);
    
    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Hà Nội' })
    );
  });

  it('displays custom tooltip', () => {
    const tooltipFormatter = jest.fn((point) => `Custom: ${point.name}`);
    
    render(
      <VietnamMap 
        data={mockData} 
        tooltipFormatter={tooltipFormatter} 
      />
    );
    
    // Hover over province
    const province = screen.getByText('Hà Nội');
    fireEvent.mouseEnter(province);
    
    expect(tooltipFormatter).toHaveBeenCalled();
  });
});
```

### Integration Tests (Playwright)

```typescript
// e2e/map.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Vietnam Map', () => {
  test('loads map and displays provinces', async ({ page }) => {
    await page.goto('/map');
    
    // Wait for map to load
    await page.waitForSelector('.highcharts-container');
    
    // Check if provinces are visible
    const provinces = await page.locator('.highcharts-map-series').count();
    expect(provinces).toBeGreaterThan(0);
  });

  test('interacts with province', async ({ page }) => {
    await page.goto('/map');
    
    // Click on Hà Nội
    await page.click('text=Hà Nội');
    
    // Check if detail panel appears
    await expect(page.locator('.province-details')).toBeVisible();
    await expect(page.locator('.province-name')).toHaveText('Hà Nội');
  });

  test('tooltip shows on hover', async ({ page }) => {
    await page.goto('/map');
    
    // Hover over province
    await page.hover('[data-province="ha-noi"]');
    
    // Check tooltip
    await expect(page.locator('.highcharts-tooltip')).toBeVisible();
  });
});
```

### Visual Regression Tests (Percy)

```typescript
// tests/visual.spec.ts
import percySnapshot from '@percy/playwright';
import { test } from '@playwright/test';

test('map visual regression', async ({ page }) => {
  await page.goto('/map');
  
  // Wait for map to fully render
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Take snapshot
  await percySnapshot(page, 'Vietnam Map - Default');
  
  // Test with different color scheme
  await page.click('[data-testid="color-scheme-blue"]');
  await percySnapshot(page, 'Vietnam Map - Blue Theme');
  
  // Test drilldown
  await page.click('text=Hà Nội');
  await page.waitForLoadState('networkidle');
  await percySnapshot(page, 'Vietnam Map - Hanoi Drilldown');
});
```

## 🐛 Troubleshooting

### Common Issues

**1. Map không hiển thị**

```bash
# Kiểm tra Highcharts đã được import
npm list highcharts

# Cài đặt lại nếu thiếu
npm install highcharts highcharts-react-official
```

**2. SSR Error (Next.js)**

```tsx
// Sử dụng dynamic import với ssr: false
import dynamic from 'next/dynamic';

const VietnamMap = dynamic(
  () => import('@xdev-asia/vietnam-map-34-provinces/react').then(m => m.VietnamMap),
  { ssr: false }
);
```

**3. Tên tỉnh không khớp**

```javascript
import { getNewProvinceName } from '@xdev-asia/vietnam-map-34-provinces/core';

// Normalize tên tỉnh
const normalizedName = getNewProvinceName(provinceName) || provinceName;
```

**4. Drilldown không hoạt động**

```tsx
// Đảm bảo enableDrilldown={true} và có dữ liệu xã
<VietnamMap
  enableDrilldown={true}
  data={data}
/>
```

**5. Performance Issues**

```tsx
// Memoize data và callbacks
const memoizedData = useMemo(() => transformData(rawData), [rawData]);
const handleClick = useCallback((p) => console.log(p), []);

<VietnamMap data={memoizedData} onProvinceClick={handleClick} />
```

## 📖 Documentation

- [Vanilla JS Guide](https://xdev-asia-labs.github.io/vietnam-map-34-provinces/docs/vanilla.html)
- [React Guide](https://xdev-asia-labs.github.io/vietnam-map-34-provinces/docs/reactjs.html)
- [Vue 3 Guide](https://xdev-asia-labs.github.io/vietnam-map-34-provinces/docs/vuejs.html)
- [Angular Guide](https://xdev-asia-labs.github.io/vietnam-map-34-provinces/docs/angular.html)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## 📝 License

MIT

## 📚 Data Sources

- [QĐ 19/2025/QĐ-TTg](https://chinhphu.vn) - Bảng danh mục mã số ĐVHC
- [phucanhle/vn-xaphuong-2025](https://github.com/phucanhle/vn-xaphuong-2025) - JSON data
- [Highcharts Maps](https://www.highcharts.com/docs/maps/getting-started)

---

Made with ❤️ by [xdev-asia-labs](https://github.com/xdev-asia-labs)
