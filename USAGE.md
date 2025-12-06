# Hướng Dẫn Sử Dụng Vietnam Map Component

## 📁 Cấu trúc thư mục

```
vietnam-map-component/
├── src/
│   ├── assets/
│   │   └── vn-all.geo.json          # Dữ liệu bản đồ GeoJSON
│   ├── constants/
│   │   └── provinceMapping.ts       # Mapping 34 tỉnh mới
│   ├── VietnamMap.tsx               # Component chính
│   └── index.ts                     # Entry point
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## 🚀 Cách sử dụng

### 1. Publish lên NPM (hoặc private registry)

```bash
cd vietnam-map-component
npm install
npm run build
npm publish
```

### 2. Sử dụng trong project khác

```bash
npm install @boyte/vietnam-map-34-provinces
```

```tsx
import { VietnamMap } from '@boyte/vietnam-map-34-provinces';

function Dashboard() {
  return (
    <div style={{ height: '700px' }}>
      <VietnamMap />
    </div>
  );
}
```

### 3. Push lên Git

```bash
cd vietnam-map-component
git init
git add .
git commit -m "Initial commit: Vietnam Map 34 Provinces Component"
git remote add origin https://github.com/your-org/vietnam-map-34-provinces.git
git push -u origin main
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

## 📦 File đã tạo

✅ **Component:**

- `VietnamMap.tsx` - Component React hiển thị bản đồ
- `index.ts` - Export chính

✅ **Data:**

- `vn-all.geo.json` - Dữ liệu GeoJSON bản đồ VN
- `provinceMapping.ts` - Mapping 34 tỉnh mới + utilities

✅ **Config:**

- `package.json` - NPM package config
- `tsconfig.json` - TypeScript config
- `README.md` - Documentation
- `LICENSE` - MIT License
- `.gitignore` - Git ignore rules

## 💡 Tips

1. **Customize data:** Truyền prop `data` với structure tùy chỉnh
2. **Styling:** Component sử dụng Tailwind classes, có thể override
3. **Events:** Có thể extend component để thêm custom events

## 📝 TODO

- [ ] Add tests
- [ ] Add Storybook examples
- [ ] Support custom tooltips
- [ ] Add drilldown to district level (when data available)
- [ ] Add export options (PNG, SVG, PDF)
