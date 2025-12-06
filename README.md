# Vietnam Map - 34 Provinces

[![npm version](https://img.shields.io/npm/v/@xdev-asia/vietnam-map-34-provinces.svg)](https://www.npmjs.com/package/@xdev-asia/vietnam-map-34-provinces)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React/Vanilla JS component hiển thị bản đồ Việt Nam với **34 tỉnh/thành phố mới** theo **Nghị quyết 60-NQ/TW** (hiệu lực 01/07/2025).

## 📦 Installation

```bash
npm install @xdev-asia/vietnam-map-34-provinces highcharts
# or
yarn add @xdev-asia/vietnam-map-34-provinces highcharts
# or
pnpm add @xdev-asia/vietnam-map-34-provinces highcharts
```

## 🚀 Usage

### Vanilla JavaScript

```javascript
import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

const map = createVietnamMap('#container', {
  onProvinceClick: (province) => {
    console.log('Clicked:', province.name);
  },
  height: 600
});

// Zoom to a specific province
map.zoomToProvince('vn-new-ha-noi');

// Reset zoom
map.resetZoom();

// Update data
map.updateData([
  { 'hc-key': 'vn-new-ha-noi', value: 5000 },
  { 'hc-key': 'vn-new-ho-chi-minh', value: 8000 }
]);
```

### React

```tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

function App() {
  return (
    <div style={{ height: '600px' }}>
      <VietnamMap />
    </div>
  );
}
```

> **Note:** React version requires additional peer dependencies: `react`, `react-dom`, `highcharts-react-official`, `antd`

### Vue 3

```vue
<template>
  <div ref="mapContainer" style="height: 600px"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

const mapContainer = ref(null);
let mapInstance = null;

onMounted(() => {
  mapInstance = createVietnamMap(mapContainer.value, {
    onProvinceClick: (province) => {
      console.log('Clicked:', province.name);
    }
  });
});

onUnmounted(() => {
  mapInstance?.destroy();
});
</script>
```

### Angular

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { createVietnamMap, VietnamMapInstance } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

@Component({
  selector: 'app-vietnam-map',
  template: '<div #mapContainer style="height: 600px"></div>'
})
export class VietnamMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private mapInstance: VietnamMapInstance | null = null;

  ngAfterViewInit() {
    this.mapInstance = createVietnamMap(this.mapContainer.nativeElement, {
      onProvinceClick: (province) => console.log('Clicked:', province.name)
    });
  }

  ngOnDestroy() {
    this.mapInstance?.destroy();
  }
}
```

### CDN (Browser)

```html
<script src="https://code.highcharts.com/maps/highmaps.js"></script>
<script src="https://unpkg.com/@xdev-asia/vietnam-map-34-provinces/dist/index.umd.js"></script>

<div id="map" style="height: 600px"></div>

<script>
  const map = VietnamMap.createVietnamMap('#map');
</script>
```

## 🛠️ Core Utilities

Dùng được với bất kỳ JavaScript framework nào:

```javascript
import { 
  getNewProvinceName, 
  getProvinceByName,
  NEW_34_PROVINCES,
  vietnamGeoJson 
} from '@xdev-asia/vietnam-map-34-provinces/core';

// Convert old province name to new
const newName = getNewProvinceName('Hà Giang'); // => "Tuyên Quang"

// Get full province info
const province = getProvinceByName('Phú Thọ');
console.log(province);
// {
//   code: 15,
//   name: "Phú Thọ",
//   merged_from: [
//     { name: "Vĩnh Phúc", code: 26 },
//     { name: "Phú Thọ", code: 25 },
//     { name: "Hòa Bình", code: 17 }
//   ],
//   ...
// }

// Access GeoJSON data directly
console.log(vietnamGeoJson.features.length); // 63 (original provinces)
```

## 🗺️ Features

- ✅ **34 tỉnh mới** theo Nghị quyết 60-NQ/TW
- ✅ **Framework-agnostic** - Vanilla JS, React, Vue, Angular
- ✅ **Interactive map** với zoom, click, hover
- ✅ **Merged provinces** - Tự động gộp các tỉnh cũ thành tỉnh mới
- ✅ **TypeScript** full support
- ✅ **CDN support** for browser usage
- ✅ **Tree-shakeable** - Only import what you need

## 📊 Province Mapping

### 23 đơn vị hợp nhất:

| # | Tỉnh mới | Hợp nhất từ |
|---|----------|-------------|
| 1 | Tuyên Quang | Tuyên Quang + Hà Giang |
| 2 | Lào Cai | Lào Cai + Yên Bái |
| 3 | Thái Nguyên | Bắc Kạn + Thái Nguyên |
| 4 | Phú Thọ | Vĩnh Phúc + Phú Thọ + Hòa Bình |
| 5 | Bắc Ninh | Bắc Ninh + Bắc Giang |
| 6 | Hưng Yên | Hưng Yên + Thái Bình |
| 7 | Hải Phòng | Hải Dương + Hải Phòng |
| 8 | Ninh Bình | Hà Nam + Ninh Bình + Nam Định |
| 9 | Quảng Trị | Quảng Bình + Quảng Trị |
| 10 | Đà Nẵng | Quảng Nam + Đà Nẵng |
| 11 | Quảng Ngãi | Kon Tum + Quảng Ngãi |
| 12 | Gia Lai | Gia Lai + Bình Định |
| 13 | Khánh Hòa | Ninh Thuận + Khánh Hòa |
| 14 | Lâm Đồng | Lâm Đồng + Đắk Nông + Bình Thuận |
| 15 | Đắk Lắk | Đắk Lắk + Phú Yên |
| 16 | Hồ Chí Minh | Bà Rịa-Vũng Tàu + Bình Dương + TP.HCM |
| 17 | Đồng Nai | Đồng Nai + Bình Phước |
| 18 | Tây Ninh | Tây Ninh + Long An |
| 19 | Cần Thơ | Cần Thơ + Sóc Trăng + Hậu Giang |
| 20 | Vĩnh Long | Bến Tre + Vĩnh Long + Trà Vinh |
| 21 | Đồng Tháp | Tiền Giang + Đồng Tháp |
| 22 | Cà Mau | Bạc Liêu + Cà Mau |
| 23 | An Giang | An Giang + Kiên Giang |

### 11 đơn vị giữ nguyên:

Hà Nội, Huế, Lai Châu, Điện Biên, Sơn La, Lạng Sơn, Quảng Ninh, Thanh Hóa, Nghệ An, Hà Tĩnh, Cao Bằng

## 📝 License

MIT

## 📖 References

- [Nghị quyết 60-NQ/TW](https://example.com)
- [Quyết định 19/2025/QĐ-TTg](https://example.com)
- [Highcharts Maps](https://www.highcharts.com/docs/maps/getting-started)

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR.

---

Made with ❤️ by [xdev-asia-labs](https://github.com/xdev-asia-labs)
