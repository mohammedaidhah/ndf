import re

svg_content = open(r'C:\Users\SmartGenx\.gemini\antigravity\brain\ed0cc6c9-a5bc-41c9-8d43-b8aaa6843733\.system_generated\steps\36\content.md', encoding='utf-8').read()

mapping = {
    'ye-3415': ('YE-HD', 'حضرموت', True),
    'ye-mr': ('YE-MR', 'المهرة', True),
    'ye-sh': ('YE-SH', 'شبوة', True),
    'ye-ad': ('YE-AD', 'عدن', True),
    'ye-3430': ('YE-AB', 'أبين', True),
    'ye-la': ('YE-LA', 'لحج', True),
    'ye-dl': ('YE-DA', 'الضالع', True),
    'ye-ma': ('YE-MA', 'مأرب', True),
    'ye-ta': ('YE-TA', 'تعز', True),
    'ye-hu': ('YE-HU', 'الحديدة', True),
    'ye-3427': ('YE-SA', 'أمانة العاصمة', False),
    'ye-sd': ('YE-SD', 'صعدة', False),
    'ye-mw': ('YE-MW', 'المحويت', False),
    'ye-dh': ('YE-DH', 'ذمار', False),
    'ye-hj': ('YE-HJ', 'حجة', False),
    'ye-am': ('YE-AM', 'عمران', False),
    'ye-ib': ('YE-IB', 'إب', False),
    'ye-ba': ('YE-BA', 'البيضاء', False),
    'ye-ja': ('YE-JA', 'الجوف', False),
    'ye-3426': ('YE-SN', 'صنعاء', False),
    'ye-3428': ('YE-RA', 'ريمة', False)
}

paths = re.findall(r'<path id="([^"]+)" d="([^"]+)">', svg_content)

out_paths = []
for pid, d in paths:
    if pid in mapping:
        new_id, title, is_active = mapping[pid]
        cls = 'gov-path gov-active' if is_active else 'gov-path'
        out_paths.append(f'                        <path id="{new_id}" title="{title}" class="{cls}" d="{d}" />')

# Add Socotra
socotra_d = 'm 680.5,350.5 a 15,10 0 1 0 30,0 15,10 0 1 0 -30,0 z'
out_paths.append(f'                        <path id="YE-SU" title="سقطرى" class="gov-path gov-active" d="{socotra_d}" />')

final_svg = '<svg id="yemen-map-svg" viewBox="-10 -10 750 430" xmlns="http://www.w3.org/2000/svg">\n'
final_svg += '                    <g id="governorates">\n'
final_svg += '\n'.join(out_paths)
final_svg += '\n                    </g>\n                </svg>'

open(r'c:\Users\SmartGenx\.gemini\antigravity\scratch\ndf-prototype\new_map.html', 'w', encoding='utf-8').write(final_svg)
print('Done!')
