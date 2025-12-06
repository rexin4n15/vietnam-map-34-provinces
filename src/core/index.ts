/**
 * Core module - Framework-agnostic utilities
 * Use này với bất kỳ JS framework nào (vanilla, React, Vue, Angular, etc.)
 */

// Export province mapping data and utilities
export {
    NEW_34_PROVINCES,
    OLD_TO_NEW_PROVINCE_MAP,
    PROVINCE_MAPPING,
    normalizeName,
    getNewProvinceName,
    getProvinceByName,
    getProvinceByCode,
    isMergedProvince
} from './provinceMapping';

export type { Province, OldProvince } from './provinceMapping';

// Export GeoJSON map data
import vnMapData from './assets/vn-all.geo.json';
export { vnMapData };
export const vietnamGeoJson = vnMapData;
