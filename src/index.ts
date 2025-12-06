/**
 * @xdev-asia-labs/vietnam-map-34-provinces
 * Vietnam Map with 34 new provinces (Nghị quyết 60-NQ/TW)
 * Framework-agnostic - works with vanilla JS, React, Vue, Angular, etc.
 * 
 * @example
 * // Vanilla JS
 * import { createVietnamMap } from '@xdev-asia-labs/vietnam-map-34-provinces/vanilla';
 * const map = createVietnamMap('#container');
 * 
 * // React
 * import { VietnamMap } from '@xdev-asia-labs/vietnam-map-34-provinces/react';
 * <VietnamMap />
 * 
 * // Core utilities only
 * import { getNewProvinceName, NEW_34_PROVINCES } from '@xdev-asia-labs/vietnam-map-34-provinces/core';
 */

// Core exports (framework-agnostic)
export {
    NEW_34_PROVINCES,
    OLD_TO_NEW_PROVINCE_MAP,
    PROVINCE_MAPPING,
    normalizeName,
    getNewProvinceName,
    getProvinceByName,
    getProvinceByCode,
    isMergedProvince,
    vnMapData,
    vietnamGeoJson
} from './core';

export type { Province, Commune } from './core';

// Vanilla JS exports
export { createVietnamMap } from './vanilla';
export type { VietnamMapOptions, VietnamMapInstance } from './vanilla';

// React exports (optional - requires react peer dependency)
export { VietnamMap } from './react';
export type { VietnamMapProps } from './react';
