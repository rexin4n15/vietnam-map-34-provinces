// Province data from QĐ 19/2025
export interface Province {
    code: string;
    tms: string;
    name: string;
    type: "city" | "province";
    communes: number;
    merged: string[];
}

export const PROVINCES: Province[] = [
    { code: "01", tms: "101", name: "Hà Nội", type: "city", communes: 126, merged: ["Hà Nội", "Hà Tây"] },
    { code: "02", tms: "102", name: "Bắc Ninh", type: "province", communes: 99, merged: ["Bắc Ninh", "Bắc Giang"] },
    { code: "03", tms: "103", name: "Quảng Ninh", type: "province", communes: 54, merged: [] },
    { code: "04", tms: "104", name: "Hải Phòng", type: "city", communes: 114, merged: ["Hải Phòng", "Hải Dương"] },
    { code: "05", tms: "105", name: "Hưng Yên", type: "province", communes: 104, merged: ["Hưng Yên", "Thái Bình"] },
    { code: "06", tms: "106", name: "Ninh Bình", type: "province", communes: 129, merged: ["Ninh Bình", "Nam Định", "Hà Nam"] },
    { code: "07", tms: "107", name: "Cao Bằng", type: "province", communes: 56, merged: [] },
    { code: "08", tms: "108", name: "Tuyên Quang", type: "province", communes: 124, merged: ["Tuyên Quang", "Hà Giang"] },
    { code: "09", tms: "109", name: "Lào Cai", type: "province", communes: 99, merged: ["Lào Cai", "Yên Bái"] },
    { code: "10", tms: "110", name: "Thái Nguyên", type: "province", communes: 92, merged: ["Thái Nguyên", "Bắc Kạn"] },
    { code: "11", tms: "111", name: "Lạng Sơn", type: "province", communes: 65, merged: [] },
    { code: "12", tms: "112", name: "Phú Thọ", type: "province", communes: 148, merged: ["Phú Thọ", "Vĩnh Phúc", "Hòa Bình"] },
    { code: "13", tms: "113", name: "Điện Biên", type: "province", communes: 45, merged: [] },
    { code: "14", tms: "114", name: "Lai Châu", type: "province", communes: 38, merged: [] },
    { code: "15", tms: "115", name: "Sơn La", type: "province", communes: 75, merged: [] },
    { code: "16", tms: "116", name: "Thanh Hóa", type: "province", communes: 166, merged: [] },
    { code: "17", tms: "117", name: "Nghệ An", type: "province", communes: 130, merged: [] },
    { code: "18", tms: "118", name: "Hà Tĩnh", type: "province", communes: 69, merged: [] },
    { code: "19", tms: "119", name: "Quảng Trị", type: "province", communes: 78, merged: ["Quảng Trị", "Quảng Bình"] },
    { code: "20", tms: "120", name: "Huế", type: "city", communes: 40, merged: ["Thừa Thiên Huế"] },
    { code: "21", tms: "121", name: "Đà Nẵng", type: "city", communes: 94, merged: ["Đà Nẵng", "Quảng Nam"] },
    { code: "22", tms: "122", name: "Quảng Ngãi", type: "province", communes: 96, merged: ["Quảng Ngãi", "Kon Tum"] },
    { code: "23", tms: "123", name: "Khánh Hòa", type: "province", communes: 65, merged: ["Khánh Hòa", "Ninh Thuận"] },
    { code: "24", tms: "124", name: "Gia Lai", type: "province", communes: 135, merged: ["Gia Lai", "Bình Định"] },
    { code: "25", tms: "125", name: "Đắk Lắk", type: "province", communes: 102, merged: ["Đắk Lắk", "Phú Yên"] },
    { code: "26", tms: "126", name: "Lâm Đồng", type: "province", communes: 124, merged: ["Lâm Đồng", "Đắk Nông", "Bình Thuận"] },
    { code: "27", tms: "127", name: "Tây Ninh", type: "province", communes: 96, merged: ["Tây Ninh", "Long An"] },
    { code: "28", tms: "128", name: "Đồng Nai", type: "province", communes: 95, merged: ["Đồng Nai", "Bình Phước"] },
    { code: "29", tms: "129", name: "Hồ Chí Minh", type: "city", communes: 168, merged: ["Hồ Chí Minh", "Bình Dương", "Bà Rịa - Vũng Tàu"] },
    { code: "30", tms: "130", name: "Vĩnh Long", type: "province", communes: 124, merged: ["Vĩnh Long", "Bến Tre", "Trà Vinh"] },
    { code: "31", tms: "131", name: "Đồng Tháp", type: "province", communes: 102, merged: ["Đồng Tháp", "Tiền Giang"] },
    { code: "32", tms: "132", name: "An Giang", type: "province", communes: 102, merged: ["An Giang", "Kiên Giang"] },
    { code: "33", tms: "133", name: "Cần Thơ", type: "city", communes: 103, merged: ["Cần Thơ", "Hậu Giang", "Sóc Trăng"] },
    { code: "34", tms: "134", name: "Cà Mau", type: "province", communes: 64, merged: ["Cà Mau", "Bạc Liêu"] },
];

export function getStats() {
    const total = PROVINCES.length;
    const cities = PROVINCES.filter((p) => p.type === "city").length;
    const merged = PROVINCES.filter((p) => p.merged.length > 1).length;
    const totalCommunes = PROVINCES.reduce((sum, p) => sum + p.communes, 0);

    return { total, cities, merged, totalCommunes };
}
