const fs = require('fs');

const svg_content = fs.readFileSync(String.raw`C:\Users\SmartGenx\.gemini\antigravity\brain\ed0cc6c9-a5bc-41c9-8d43-b8aaa6843733\.system_generated\steps\36\content.md`, 'utf8');

const mapping = {
    'ye-3415': ['YE-HD', 'حضرموت', true],
    'ye-mr': ['YE-MR', 'المهرة', true],
    'ye-sh': ['YE-SH', 'شبوة', true],
    'ye-ad': ['YE-AD', 'عدن', true],
    'ye-3430': ['YE-AB', 'أبين', true],
    'ye-la': ['YE-LA', 'لحج', true],
    'ye-dl': ['YE-DA', 'الضالع', true],
    'ye-ma': ['YE-MA', 'مأرب', true],
    'ye-ta': ['YE-TA', 'تعز', true],
    'ye-hu': ['YE-HU', 'الحديدة', true],
    'ye-3427': ['YE-SA', 'أمانة العاصمة', false],
    'ye-sd': ['YE-SD', 'صعدة', false],
    'ye-mw': ['YE-MW', 'المحويت', false],
    'ye-dh': ['YE-DH', 'ذمار', false],
    'ye-hj': ['YE-HJ', 'حجة', false],
    'ye-am': ['YE-AM', 'عمران', false],
    'ye-ib': ['YE-IB', 'إب', false],
    'ye-ba': ['YE-BA', 'البيضاء', false],
    'ye-ja': ['YE-JA', 'الجوف', false],
    'ye-3426': ['YE-SN', 'صنعاء', false],
    'ye-3428': ['YE-RA', 'ريمة', false]
};

const regex = /<path id="([^"]+)" d="([^"]+)">/g;
let match;
let out_paths = [];

while ((match = regex.exec(svg_content)) !== null) {
    const pid = match[1];
    const d = match[2];
    if (mapping[pid]) {
        const [new_id, title, is_active] = mapping[pid];
        const cls = is_active ? 'gov-path gov-active' : 'gov-path';
        out_paths.push(`                        <path id="${new_id}" title="${title}" class="${cls}" d="${d}" />`);
    }
}

// Add Socotra
const socotra_d = 'm 680.5,350.5 a 15,10 0 1 0 30,0 15,10 0 1 0 -30,0 z';
out_paths.push(`                        <path id="YE-SU" title="سقطرى" class="gov-path gov-active" d="${socotra_d}" />`);

let final_svg = '<svg id="yemen-map-svg" viewBox="-10 -10 750 430" xmlns="http://www.w3.org/2000/svg">\n';
final_svg += '                    <g id="governorates">\n';
final_svg += out_paths.join('\n');
final_svg += '\n                    </g>\n                </svg>';

fs.writeFileSync(String.raw`c:\Users\SmartGenx\.gemini\antigravity\scratch\ndf-prototype\new_map.html`, final_svg, 'utf8');
console.log('Done!');
