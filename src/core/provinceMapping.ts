/**
 * 34 PROVINCES MAPPING CONFIGURATION
 * Theo Nghị quyết 60-NQ/TW của Ban Chấp hành Trung ương Đảng khóa XIII
 * Hiệu lực từ 01/07/2025 theo Quyết định 19/2025/QĐ-TTg
 * 
 * Mapping này bao gồm:
 * - 23 đơn vị hợp nhất (merged provinces)
 * - 11 đơn vị giữ nguyên (unchanged provinces)
 * 
 * Cấu trúc mới: Tỉnh → Xã (bỏ cấp huyện)
 */

// === TYPES & INTERFACES ===

export interface Province {
    /** Mã tỉnh mới (unique ID) */
    code: number;
    /** Tên tỉnh mới */
    name: string;
    /** Tên chuẩn hóa không dấu */
    codename: string;
    /** Loại: "tỉnh" hoặc "thành phố" */
    division_type: "tỉnh" | "thành phố";
    /** Mã vùng điện thoại */
    phone_code: number;
    /** Danh sách các tỉnh cũ được hợp nhất */
    merged_from: OldProvince[];
    /** Trung tâm hành chính (có thể khác tên tỉnh) */
    administrative_center?: string;
}

export interface OldProvince {
    /** Tên tỉnh cũ (63 tỉnh) */
    name: string;
    /** Mã tỉnh cũ */
    code: number;
    /** Tên chuẩn hóa không dấu */
    codename: string;
}

// === 34 TỈNH MỚI (DATA STRUCTURE) ===

export const NEW_34_PROVINCES: Province[] = [
    // === 11 ĐƠN VỊ GIỮ NGUYÊN ===
    {
        code: 1,
        name: "Hà Nội",
        codename: "ha_noi",
        division_type: "thành phố",
        phone_code: 24,
        merged_from: [
            { name: "Hà Nội", code: 1, codename: "ha_noi" },
            { name: "Hà Tây", code: 29, codename: "ha_tay" }
        ]
    },
    {
        code: 2,
        name: "Huế",
        codename: "hue",
        division_type: "thành phố",
        phone_code: 234,
        merged_from: [
            { name: "Thừa Thiên Huế", code: 46, codename: "thua_thien_hue" }
        ]
    },
    {
        code: 3,
        name: "Lai Châu",
        codename: "lai_chau",
        division_type: "tỉnh",
        phone_code: 213,
        merged_from: [
            { name: "Lai Châu", code: 12, codename: "lai_chau" }
        ]
    },
    {
        code: 4,
        name: "Điện Biên",
        codename: "dien_bien",
        division_type: "tỉnh",
        phone_code: 215,
        merged_from: [
            { name: "Điện Biên", code: 11, codename: "dien_bien" }
        ]
    },
    {
        code: 5,
        name: "Sơn La",
        codename: "son_la",
        division_type: "tỉnh",
        phone_code: 212,
        merged_from: [
            { name: "Sơn La", code: 14, codename: "son_la" }
        ]
    },
    {
        code: 6,
        name: "Lạng Sơn",
        codename: "lang_son",
        division_type: "tỉnh",
        phone_code: 205,
        merged_from: [
            { name: "Lạng Sơn", code: 20, codename: "lang_son" }
        ]
    },
    {
        code: 7,
        name: "Quảng Ninh",
        codename: "quang_ninh",
        division_type: "tỉnh",
        phone_code: 203,
        merged_from: [
            { name: "Quảng Ninh", code: 22, codename: "quang_ninh" }
        ]
    },
    {
        code: 8,
        name: "Thanh Hóa",
        codename: "thanh_hoa",
        division_type: "tỉnh",
        phone_code: 237,
        merged_from: [
            { name: "Thanh Hóa", code: 38, codename: "thanh_hoa" }
        ]
    },
    {
        code: 9,
        name: "Nghệ An",
        codename: "nghe_an",
        division_type: "tỉnh",
        phone_code: 238,
        merged_from: [
            { name: "Nghệ An", code: 40, codename: "nghe_an" }
        ]
    },
    {
        code: 10,
        name: "Hà Tĩnh",
        codename: "ha_tinh",
        division_type: "tỉnh",
        phone_code: 239,
        merged_from: [
            { name: "Hà Tĩnh", code: 42, codename: "ha_tinh" }
        ]
    },
    {
        code: 11,
        name: "Cao Bằng",
        codename: "cao_bang",
        division_type: "tỉnh",
        phone_code: 206,
        merged_from: [
            { name: "Cao Bằng", code: 4, codename: "cao_bang" }
        ]
    },

    // === 23 ĐƠN VỊ HỢP NHẤT ===
    {
        code: 12,
        name: "Tuyên Quang",
        codename: "tuyen_quang",
        division_type: "tỉnh",
        phone_code: 207,
        merged_from: [
            { name: "Tuyên Quang", code: 8, codename: "tuyen_quang" },
            { name: "Hà Giang", code: 2, codename: "ha_giang" }
        ],
        administrative_center: "Tuyên Quang"
    },
    {
        code: 13,
        name: "Lào Cai",
        codename: "lao_cai",
        division_type: "tỉnh",
        phone_code: 214,
        merged_from: [
            { name: "Lào Cai", code: 10, codename: "lao_cai" },
            { name: "Yên Bái", code: 15, codename: "yen_bai" }
        ],
        administrative_center: "Yên Bái"
    },
    {
        code: 14,
        name: "Thái Nguyên",
        codename: "thai_nguyen",
        division_type: "tỉnh",
        phone_code: 208,
        merged_from: [
            { name: "Bắc Kạn", code: 6, codename: "bac_kan" },
            { name: "Thái Nguyên", code: 19, codename: "thai_nguyen" }
        ],
        administrative_center: "Thái Nguyên"
    },
    {
        code: 15,
        name: "Phú Thọ",
        codename: "phu_tho",
        division_type: "tỉnh",
        phone_code: 210,
        merged_from: [
            { name: "Vĩnh Phúc", code: 26, codename: "vinh_phuc" },
            { name: "Phú Thọ", code: 25, codename: "phu_tho" },
            { name: "Hòa Bình", code: 17, codename: "hoa_binh" }
        ],
        administrative_center: "Phú Thọ"
    },
    {
        code: 16,
        name: "Bắc Ninh",
        codename: "bac_ninh",
        division_type: "tỉnh",
        phone_code: 222,
        merged_from: [
            { name: "Bắc Ninh", code: 27, codename: "bac_ninh" },
            { name: "Bắc Giang", code: 24, codename: "bac_giang" }
        ],
        administrative_center: "Bắc Giang"
    },
    {
        code: 17,
        name: "Hưng Yên",
        codename: "hung_yen",
        division_type: "tỉnh",
        phone_code: 221,
        merged_from: [
            { name: "Hưng Yên", code: 33, codename: "hung_yen" },
            { name: "Thái Bình", code: 34, codename: "thai_binh" }
        ],
        administrative_center: "Hưng Yên"
    },
    {
        code: 18,
        name: "Hải Phòng",
        codename: "hai_phong",
        division_type: "thành phố",
        phone_code: 225,
        merged_from: [
            { name: "Hải Dương", code: 30, codename: "hai_duong" },
            { name: "Hải Phòng", code: 31, codename: "hai_phong" }
        ],
        administrative_center: "Hải Phòng"
    },
    {
        code: 19,
        name: "Ninh Bình",
        codename: "ninh_binh",
        division_type: "tỉnh",
        phone_code: 229,
        merged_from: [
            { name: "Hà Nam", code: 35, codename: "ha_nam" },
            { name: "Ninh Bình", code: 37, codename: "ninh_binh" },
            { name: "Nam Định", code: 36, codename: "nam_dinh" }
        ],
        administrative_center: "Ninh Bình"
    },
    {
        code: 20,
        name: "Quảng Trị",
        codename: "quang_tri",
        division_type: "tỉnh",
        phone_code: 233,
        merged_from: [
            { name: "Quảng Bình", code: 44, codename: "quang_binh" },
            { name: "Quảng Trị", code: 45, codename: "quang_tri" }
        ],
        administrative_center: "Quảng Bình"
    },
    {
        code: 21,
        name: "Đà Nẵng",
        codename: "da_nang",
        division_type: "thành phố",
        phone_code: 236,
        merged_from: [
            { name: "Quảng Nam", code: 49, codename: "quang_nam" },
            { name: "Đà Nẵng", code: 48, codename: "da_nang" }
        ],
        administrative_center: "Đà Nẵng"
    },
    {
        code: 22,
        name: "Quảng Ngãi",
        codename: "quang_ngai",
        division_type: "tỉnh",
        phone_code: 255,
        merged_from: [
            { name: "Kon Tum", code: 62, codename: "kon_tum" },
            { name: "Quảng Ngãi", code: 51, codename: "quang_ngai" }
        ],
        administrative_center: "Quảng Ngãi"
    },
    {
        code: 23,
        name: "Gia Lai",
        codename: "gia_lai",
        division_type: "tỉnh",
        phone_code: 269,
        merged_from: [
            { name: "Gia Lai", code: 64, codename: "gia_lai" },
            { name: "Bình Định", code: 52, codename: "binh_dinh" }
        ],
        administrative_center: "Bình Định"
    },
    {
        code: 24,
        name: "Khánh Hòa",
        codename: "khanh_hoa",
        division_type: "tỉnh",
        phone_code: 258,
        merged_from: [
            { name: "Ninh Thuận", code: 58, codename: "ninh_thuan" },
            { name: "Khánh Hòa", code: 56, codename: "khanh_hoa" }
        ],
        administrative_center: "Khánh Hòa"
    },
    {
        code: 25,
        name: "Lâm Đồng",
        codename: "lam_dong",
        division_type: "tỉnh",
        phone_code: 263,
        merged_from: [
            { name: "Lâm Đồng", code: 68, codename: "lam_dong" },
            { name: "Đắk Nông", code: 67, codename: "dak_nong" },
            { name: "Bình Thuận", code: 60, codename: "binh_thuan" }
        ],
        administrative_center: "Lâm Đồng"
    },
    {
        code: 26,
        name: "Đắk Lắk",
        codename: "dak_lak",
        division_type: "tỉnh",
        phone_code: 262,
        merged_from: [
            { name: "Đắk Lắk", code: 66, codename: "dak_lak" },
            { name: "Phú Yên", code: 54, codename: "phu_yen" }
        ],
        administrative_center: "Đắk Lắk"
    },
    {
        code: 27,
        name: "Hồ Chí Minh",
        codename: "ho_chi_minh",
        division_type: "thành phố",
        phone_code: 28,
        merged_from: [
            { name: "Bà Rịa - Vũng Tàu", code: 77, codename: "ba_ria_vung_tau" },
            { name: "Bình Dương", code: 74, codename: "binh_duong" },
            { name: "Hồ Chí Minh", code: 79, codename: "ho_chi_minh" }
        ],
        administrative_center: "Hồ Chí Minh"
    },
    {
        code: 28,
        name: "Đồng Nai",
        codename: "dong_nai",
        division_type: "tỉnh",
        phone_code: 251,
        merged_from: [
            { name: "Đồng Nai", code: 75, codename: "dong_nai" },
            { name: "Bình Phước", code: 70, codename: "binh_phuoc" }
        ],
        administrative_center: "Đồng Nai"
    },
    {
        code: 29,
        name: "Tây Ninh",
        codename: "tay_ninh",
        division_type: "tỉnh",
        phone_code: 272,
        merged_from: [
            { name: "Tây Ninh", code: 72, codename: "tay_ninh" },
            { name: "Long An", code: 80, codename: "long_an" }
        ],
        administrative_center: "Long An"
    },
    {
        code: 30,
        name: "Cần Thơ",
        codename: "can_tho",
        division_type: "thành phố",
        phone_code: 292,
        merged_from: [
            { name: "Cần Thơ", code: 92, codename: "can_tho" },
            { name: "Sóc Trăng", code: 94, codename: "soc_trang" },
            { name: "Hậu Giang", code: 93, codename: "hau_giang" }
        ],
        administrative_center: "Cần Thơ"
    },
    {
        code: 31,
        name: "Vĩnh Long",
        codename: "vinh_long",
        division_type: "tỉnh",
        phone_code: 270,
        merged_from: [
            { name: "Bến Tre", code: 83, codename: "ben_tre" },
            { name: "Vĩnh Long", code: 86, codename: "vinh_long" },
            { name: "Trà Vinh", code: 84, codename: "tra_vinh" }
        ],
        administrative_center: "Vĩnh Long"
    },
    {
        code: 32,
        name: "Đồng Tháp",
        codename: "dong_thap",
        division_type: "tỉnh",
        phone_code: 277,
        merged_from: [
            { name: "Tiền Giang", code: 82, codename: "tien_giang" },
            { name: "Đồng Tháp", code: 87, codename: "dong_thap" }
        ],
        administrative_center: "Tiền Giang"
    },
    {
        code: 33,
        name: "Cà Mau",
        codename: "ca_mau",
        division_type: "tỉnh",
        phone_code: 290,
        merged_from: [
            { name: "Bạc Liêu", code: 95, codename: "bac_lieu" },
            { name: "Cà Mau", code: 96, codename: "ca_mau" }
        ],
        administrative_center: "Cà Mau"
    },
    {
        code: 34,
        name: "An Giang",
        codename: "an_giang",
        division_type: "tỉnh",
        phone_code: 296,
        merged_from: [
            { name: "An Giang", code: 89, codename: "an_giang" },
            { name: "Kiên Giang", code: 91, codename: "kien_giang" }
        ],
        administrative_center: "Kiên Giang"
    }
];

// === QUICK LOOKUP MAP (OLD -> NEW) ===

/**
 * Map tên tỉnh cũ (chuẩn hóa) → tên tỉnh mới
 * Dùng cho việc tra cứu nhanh khi có dữ liệu từ API 63 tỉnh
 */
export const OLD_TO_NEW_PROVINCE_MAP: Record<string, string> = {
    // 11 đơn vị giữ nguyên
    "ha noi": "Hà Nội",
    "ha tay": "Hà Nội",
    "thua thien hue": "Huế",
    "thua thien - hue": "Huế",
    "hue": "Huế",
    "lai chau": "Lai Châu",
    "dien bien": "Điện Biên",
    "son la": "Sơn La",
    "lang son": "Lạng Sơn",
    "quang ninh": "Quảng Ninh",
    "thanh hoa": "Thanh Hóa",
    "nghe an": "Nghệ An",
    "ha tinh": "Hà Tĩnh",
    "cao bang": "Cao Bằng",

    // 23 đơn vị hợp nhất
    "tuyen quang": "Tuyên Quang",
    "ha giang": "Tuyên Quang",
    
    "lao cai": "Lào Cai",
    "yen bai": "Lào Cai",
    
    "bac kan": "Thái Nguyên",
    "bac can": "Thái Nguyên",
    "thai nguyen": "Thái Nguyên",
    
    "vinh phuc": "Phú Thọ",
    "phu tho": "Phú Thọ",
    "hoa binh": "Phú Thọ",
    
    "bac ninh": "Bắc Ninh",
    "bac giang": "Bắc Ninh",
    
    "hung yen": "Hưng Yên",
    "thai binh": "Hưng Yên",
    
    "hai duong": "Hải Phòng",
    "hai phong": "Hải Phòng",
    
    "ha nam": "Ninh Bình",
    "ninh binh": "Ninh Bình",
    "nam dinh": "Ninh Bình",
    
    "quang binh": "Quảng Trị",
    "quang tri": "Quảng Trị",
    
    "quang nam": "Đà Nẵng",
    "da nang": "Đà Nẵng",
    
    "kon tum": "Quảng Ngãi",
    "quang ngai": "Quảng Ngãi",
    
    "gia lai": "Gia Lai",
    "binh dinh": "Gia Lai",
    
    "ninh thuan": "Khánh Hòa",
    "khanh hoa": "Khánh Hòa",
    
    "lam dong": "Lâm Đồng",
    "dak nong": "Lâm Đồng",
    "binh thuan": "Lâm Đồng",
    
    "dak lak": "Đắk Lắk",
    "phu yen": "Đắk Lắk",
    
    "ba ria - vung tau": "Hồ Chí Minh",
    "ba ria vung tau": "Hồ Chí Minh",
    "binh duong": "Hồ Chí Minh",
    "ho chi minh city": "Hồ Chí Minh",
    "ho chi minh": "Hồ Chí Minh",
    
    "dong nai": "Đồng Nai",
    "binh phuoc": "Đồng Nai",
    
    "tay ninh": "Tây Ninh",
    "long an": "Tây Ninh",
    
    "can tho": "Cần Thơ",
    "soc trang": "Cần Thơ",
    "hau giang": "Cần Thơ",
    
    "ben tre": "Vĩnh Long",
    "vinh long": "Vĩnh Long",
    "tra vinh": "Vĩnh Long",
    
    "tien giang": "Đồng Tháp",
    "dong thap": "Đồng Tháp",
    
    "bac lieu": "Cà Mau",
    "ca mau": "Cà Mau",
    
    "an giang": "An Giang",
    "kien giang": "An Giang"
};

// === HELPER FUNCTIONS ===

/**
 * Chuẩn hóa tên tỉnh về dạng lowercase, không dấu
 */
export const normalizeName = (str: string): string => {
    if (!str) return "";
    return str.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d").replace(/Đ/g, "D")
        .trim();
};

/**
 * Lấy tên tỉnh mới từ tên tỉnh cũ
 */
export const getNewProvinceName = (oldProvinceName: string): string => {
    const normalized = normalizeName(oldProvinceName);
    return OLD_TO_NEW_PROVINCE_MAP[normalized] || oldProvinceName;
};

/**
 * Lấy thông tin đầy đủ tỉnh mới
 */
export const getProvinceByName = (name: string): Province | undefined => {
    const normalized = normalizeName(name);
    const newName = OLD_TO_NEW_PROVINCE_MAP[normalized];
    return NEW_34_PROVINCES.find(p => p.name === newName);
};

/**
 * Lấy tỉnh mới theo mã
 */
export const getProvinceByCode = (code: number): Province | undefined => {
    return NEW_34_PROVINCES.find(p => p.code === code);
};

/**
 * Kiểm tra xem tỉnh có được hợp nhất không
 */
export const isMergedProvince = (provinceName: string): boolean => {
    const province = getProvinceByName(provinceName);
    return province ? province.merged_from.length > 1 : false;
};

// === DEPRECATED (backward compatibility) ===
/** @deprecated Dùng OLD_TO_NEW_PROVINCE_MAP thay thế */
export const PROVINCE_MAPPING = OLD_TO_NEW_PROVINCE_MAP;
