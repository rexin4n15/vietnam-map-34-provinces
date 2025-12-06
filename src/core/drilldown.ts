/**
 * Province Drilldown Utilities
 * Load commune/ward level data for each province
 */

import provincesIndex from './assets/provinces/index.json';

export interface ProvinceIndex {
    name: string;
    filename: string;
    commune_count: number;
}

export interface CommuneFeature {
    type: 'Feature';
    properties: {
        GID_3: string;
        NAME_1: string;
        NAME_2: string;
        NAME_3: string;
        TYPE_3: string;
        NEW_PROVINCE: string;
        OLD_PROVINCE: string;
    };
    geometry: any;
}

export interface ProvinceGeoJSON {
    type: 'FeatureCollection';
    name: string;
    features: CommuneFeature[];
}

/**
 * Get list of all 34 new provinces with commune counts
 */
export function getProvincesIndex(): ProvinceIndex[] {
    return provincesIndex as ProvinceIndex[];
}

/**
 * Get province info by name
 */
export function getProvinceInfo(provinceName: string): ProvinceIndex | undefined {
    return (provincesIndex as ProvinceIndex[]).find(
        p => p.name.toLowerCase() === provinceName.toLowerCase()
    );
}

/**
 * Dynamically load commune data for a province
 * @param provinceName - Name of the province (e.g., "Hà Nội")
 * @returns Promise<ProvinceGeoJSON>
 */
export async function loadProvinceCommunes(provinceName: string): Promise<ProvinceGeoJSON | null> {
    const info = getProvinceInfo(provinceName);
    if (!info) {
        console.warn(`Province not found: ${provinceName}`);
        return null;
    }

    try {
        // Dynamic import for code splitting
        const data = await import(`./assets/provinces/${info.filename}`);
        return data.default as ProvinceGeoJSON;
    } catch (error) {
        console.error(`Failed to load province data: ${provinceName}`, error);
        return null;
    }
}

/**
 * Get total statistics
 */
export function getProvinceStats() {
    const provinces = provincesIndex as ProvinceIndex[];
    const totalCommunes = provinces.reduce((sum, p) => sum + p.commune_count, 0);

    return {
        totalProvinces: provinces.length,
        totalCommunes,
        largestProvince: provinces.reduce((max, p) => p.commune_count > max.commune_count ? p : max),
        smallestProvince: provinces.reduce((min, p) => p.commune_count < min.commune_count ? p : min)
    };
}
