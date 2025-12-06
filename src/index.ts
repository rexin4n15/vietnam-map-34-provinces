/**
 * @xdev-asia-labs/vietnam-map-34-provinces
 * Vietnam Map with 34 new provinces (Nghị quyết 60-NQ/TW)
 * React Component
 * 
 * @example
 * // React
 * import { VietnamMap } from '@xdev-asia-labs/vietnam-map-34-provinces/react';
 * <VietnamMap />
 * 
 * // Core utilities only
 * import { getNewProvinceName, NEW_34_PROVINCES } from '@xdev-asia-labs/vietnam-map-34-provinces/core';
 */

// Core exports
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

// React exports
export { VietnamMap } from './react';
export type { VietnamMapProps } from './react';
