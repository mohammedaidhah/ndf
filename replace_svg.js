const fs = require('fs');

const index_path = String.raw`c:\Users\SmartGenx\.gemini\antigravity\scratch\ndf-prototype\index.html`;
let index_content = fs.readFileSync(index_path, 'utf8');

const new_svg = fs.readFileSync(String.raw`c:\Users\SmartGenx\.gemini\antigravity\scratch\ndf-prototype\new_map.html`, 'utf8');

const lines = index_content.split('\n');
let start_idx = -1;
let end_idx = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<svg id="yemen-map-svg"')) {
        start_idx = i;
    }
    // We want to find the LAST </svg> before <div class="map-tooltip" id="mapTooltip">
    if (lines[i].includes('<div class="map-tooltip" id="mapTooltip">')) {
        // go back to find the closest </svg>
        for (let j = i - 1; j >= start_idx; j--) {
            if (lines[j].includes('</svg>')) {
                end_idx = j;
                break;
            }
        }
        break;
    }
}

if (start_idx !== -1 && end_idx !== -1) {
    const before = lines.slice(0, start_idx).join('\n');
    const after = lines.slice(end_idx + 1).join('\n');
    const new_content = before + '\n' + new_svg + '\n' + after;
    fs.writeFileSync(index_path, new_content, 'utf8');
    console.log('Successfully replaced SVG in index.html');
} else {
    console.log('Failed to find bounds:', start_idx, end_idx);
}
