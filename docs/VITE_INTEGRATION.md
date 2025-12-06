# Tích hợp với Vite + React 19

## Cài đặt Dependencies

```bash
npm install @xdev-asia/vietnam-map-34-provinces highcharts highcharts-react-official
```

## Vite Config

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'highcharts',
      'highcharts/highmaps',
      'highcharts/modules/drilldown',
      'highcharts-react-official'
    ]
  },
  resolve: {
    alias: {
      // Nếu gặp lỗi với JSON imports
      '@xdev-asia/vietnam-map-34-provinces': '@xdev-asia/vietnam-map-34-provinces/dist/index.mjs'
    }
  }
})
```

## Sử dụng trong Component

```tsx
// App.tsx
import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';
import 'highcharts/css/highcharts.css'; // Optional: Highcharts styles

function App() {
  return (
    <div style={{ height: '600px' }}>
      <VietnamMap
        data={[
          { name: 'Hà Nội', value: 8500 },
          { name: 'Hồ Chí Minh', value: 9000 }
        ]}
      />
    </div>
  );
}

export default App;
```

## Xử lý lỗi phổ biến

### 1. Lỗi: "Cannot find module 'highcharts/highmaps'"

**Giải pháp:**
```bash
npm install highcharts@latest
```

### 2. Lỗi: "window is not defined" (SSR)

**Giải pháp:** Lazy load component
```tsx
import { lazy, Suspense } from 'react';

const VietnamMap = lazy(() => 
  import('@xdev-asia/vietnam-map-34-provinces/react').then(m => ({ 
    default: m.VietnamMap 
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <VietnamMap />
    </Suspense>
  );
}
```

### 3. Lỗi JSON import

**Giải pháp:** Thêm vào vite.config.ts
```ts
export default defineConfig({
  json: {
    stringify: false
  }
})
```

### 4. Lỗi với React 19 types

**Giải pháp:** Update types
```bash
npm install -D @types/react@latest @types/react-dom@latest
```

## Package.json mẫu

```json
{
  "dependencies": {
    "@xdev-asia/vietnam-map-34-provinces": "^2.1.0",
    "highcharts": "^12.4.0",
    "highcharts-react-official": "^3.2.3",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.9.0",
    "vite": "^6.0.0"
  }
}
```

## TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```
