#!/usr/bin/env python3
"""
Script to process GADM Vietnam level 3 data and split by new 34 provinces
"""
import json
import os

# Province mapping: old names -> new 34 provinces
PROVINCE_MAPPING = {
    # 11 unchanged
    "HàNội": "Hà Nội",
    "ThừaThiênHuế": "Huế", 
    "LaiChâu": "Lai Châu",
    "ĐiệnBiên": "Điện Biên",
    "SơnLa": "Sơn La",
    "LạngSơ": "Lạng Sơn",
    "LạngSơn": "Lạng Sơn",
    "QuảngNinh": "Quảng Ninh",
    "ThanhHóa": "Thanh Hóa",
    "NghệAn": "Nghệ An",
    "HàTĩnh": "Hà Tĩnh",
    "CaoBằng": "Cao Bằng",
    
    # 23 merged
    "TuyênQuang": "Tuyên Quang",
    "HàGiang": "Tuyên Quang",
    
    "LàoCai": "Lào Cai",
    "YênBái": "Lào Cai",
    
    "BắcKạn": "Thái Nguyên",
    "TháiNguyên": "Thái Nguyên",
    
    "VĩnhPhúc": "Phú Thọ",
    "PhúThọ": "Phú Thọ",
    "HoàBình": "Phú Thọ",
    
    "BắcNinh": "Bắc Ninh",
    "BắcGiang": "Bắc Ninh",
    
    "HưngYên": "Hưng Yên",
    "TháiBình": "Hưng Yên",
    
    "HảiDương": "Hải Phòng",
    "HảiPhòng": "Hải Phòng",
    
    "HàNam": "Ninh Bình",
    "NinhBình": "Ninh Bình",
    "NamĐịnh": "Ninh Bình",
    
    "QuảngBình": "Quảng Trị",
    "QuảngTrị": "Quảng Trị",
    
    "QuảngNam": "Đà Nẵng",
    "ĐàNẵng": "Đà Nẵng",
    
    "KonTum": "Quảng Ngãi",
    "QuảngNgãi": "Quảng Ngãi",
    
    "GiaLai": "Gia Lai",
    "BìnhĐịnh": "Gia Lai",
    
    "NinhThuận": "Khánh Hòa",
    "KhánhHòa": "Khánh Hòa",
    
    "LâmĐồng": "Lâm Đồng",
    "ĐắkNông": "Lâm Đồng",
    "BìnhThuận": "Lâm Đồng",
    
    "ĐắkLắk": "Đắk Lắk",
    "PhúYên": "Đắk Lắk",
    
    "BàRịa-VũngTàu": "Hồ Chí Minh",
    "BìnhDương": "Hồ Chí Minh",
    "HồChíMinh": "Hồ Chí Minh",
    
    "ĐồngNai": "Đồng Nai",
    "BìnhPhước": "Đồng Nai",
    
    "TâyNinh": "Tây Ninh",
    "LongAn": "Tây Ninh",
    
    "CầnThơ": "Cần Thơ",
    "SócTrăng": "Cần Thơ",
    "HậuGiang": "Cần Thơ",
    
    "BếnTre": "Vĩnh Long",
    "VĩnhLong": "Vĩnh Long",
    "TràVinh": "Vĩnh Long",
    
    "TiềnGiang": "Đồng Tháp",
    "ĐồngTháp": "Đồng Tháp",
    
    "BạcLiêu": "Cà Mau",
    "CàMau": "Cà Mau",
    
    "AnGiang": "An Giang",
    "KiênGiang": "An Giang",
}

def normalize_name(name):
    """Convert province name to URL-safe format"""
    import unicodedata
    # Normalize and remove diacritics
    nfkd = unicodedata.normalize('NFD', name)
    ascii_str = ''.join(c for c in nfkd if not unicodedata.combining(c))
    # Replace đ
    ascii_str = ascii_str.replace('đ', 'd').replace('Đ', 'D')
    # Replace spaces with hyphens and lowercase
    return ascii_str.lower().replace(' ', '-')

def main():
    # Load full data
    with open('gadm41_VNM_3.json', 'r') as f:
        data = json.load(f)
    
    # Group features by new province
    provinces_data = {}
    
    for feature in data['features']:
        old_province = feature['properties']['NAME_1']
        new_province = PROVINCE_MAPPING.get(old_province, old_province)
        
        if new_province not in provinces_data:
            provinces_data[new_province] = {
                'type': 'FeatureCollection',
                'name': new_province,
                'features': []
            }
        
        # Add new province info to properties
        feature['properties']['NEW_PROVINCE'] = new_province
        feature['properties']['OLD_PROVINCE'] = old_province
        provinces_data[new_province]['features'].append(feature)
    
    # Save each province to separate file
    output_dir = 'src/core/assets/provinces'
    os.makedirs(output_dir, exist_ok=True)
    
    # Also create index file
    index = []
    
    for province, geojson in provinces_data.items():
        filename = normalize_name(province) + '.json'
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(geojson, f, ensure_ascii=False, separators=(',', ':'))
        
        index.append({
            'name': province,
            'filename': filename,
            'commune_count': len(geojson['features'])
        })
        
        print(f"Created {filename}: {len(geojson['features'])} communes")
    
    # Save index
    with open(os.path.join(output_dir, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    
    print(f"\nCreated {len(provinces_data)} province files")
    print(f"Index saved to {output_dir}/index.json")

if __name__ == '__main__':
    main()
