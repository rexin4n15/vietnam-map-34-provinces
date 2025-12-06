import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/core/index.ts',
    'src/vanilla/index.ts',
    'src/react/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: false, // Tắt dts vì có lỗi với Highcharts types
  splitting: false,
  sourcemap: false,
  clean: true,
  external: [
    'react', 
    'react-dom', 
    'highcharts', 
    'highcharts/highmaps', 
    'highcharts/modules/drilldown',
    /\.json$/ // External tất cả JSON files
  ],
  treeshake: true,
  loader: {
    '.json': 'copy' // Copy JSON files thay vì bundle
  },
  publicDir: 'src/core/assets', // Copy assets folder
});
