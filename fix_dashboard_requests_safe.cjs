const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// 1. Remove Dossie
const startIdx = content.indexOf('function DossieTemplate() {');
const endIdx = content.indexOf('function CurriculoTemplate() {');
if (startIdx !== -1 && endIdx !== -1) {
    content = content.slice(0, startIdx) + content.slice(endIdx);
}
content = content.replace("{activeApp === 'dossie' && <DossieTemplate />}", '');
content = content.replace("activeApp === 'dossie' ? 'Dossiês' :", '');

// Remove the a tag for dossie from the dock
const dossieAStart = content.indexOf('<a onClick={() => loadApp(\'dossie\')}');
if (dossieAStart !== -1) {
    const dossieAEnd = content.indexOf('</a>', dossieAStart) + 4;
    content = content.slice(0, dossieAStart) + content.slice(dossieAEnd);
}

// 2. Fix Curriculo scroll (h-full -> min-h-full)
content = content.replace(/className="flex flex-col items-center justify-center h-full p-6"/g, 'className="flex flex-col items-center justify-center min-h-full p-6"');

// 3. Remove all colors from dock buttons
const colors = ['yellow', 'cyan', 'green', 'purple', 'pink', 'blue', 'red', 'emerald'];
colors.forEach(color => {
    content = content.replace(new RegExp(`hover:bg-${color}-500\\/20`, 'g'), 'hover:bg-white/20');
    content = content.replace(new RegExp(`hover:text-${color}-500`, 'g'), 'hover:text-white');
    content = content.replace(new RegExp(`hover:border-${color}-500\\/50`, 'g'), 'hover:border-white/50');
});

// 4. Add drag-to-scroll to Certificados
const helperCode = `
    const attachDrag = (e) => {
        const slider = e.currentTarget;
        if (slider.dataset.dragAttached) return;
        slider.dataset.dragAttached = 'true';
        let isDown = false;
        let startX;
        let scrollLeft;
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; });
        slider.addEventListener('mouseup', () => { isDown = false; });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        slider.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > 0) {
                e.preventDefault();
                slider.scrollLeft += e.deltaY;
            }
        });
    };
`;
content = content.replace(/function CertificadosTemplate\(\{\s*openCertModal\s*\}\) \{/, (match) => {
    return match + '\n' + helperCode;
});

content = content.replace(/className="marquee-container w-full"/g, 'className="marquee-container flex overflow-x-auto w-full cursor-grab active:cursor-grabbing scrollbar-hide" onMouseEnter={attachDrag}');
content = content.replace(/className="marquee-content"/g, 'className="marquee-content flex gap-4 pr-10"');
content = content.replace(/className="marquee-content pb-32"/g, 'className="marquee-content flex gap-4 pr-10 pb-32"');

// 5. Change v3-app-window to fixed
content = content.replace('id="v3-app-window" className={`${activeApp ? "" : "hidden"} absolute inset-0', 'id="v3-app-window" className={`${activeApp ? "" : "hidden"} fixed inset-0');

fs.writeFileSync('src/pages/Dashboard.jsx', content);
