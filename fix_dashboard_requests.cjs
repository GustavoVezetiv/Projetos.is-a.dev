const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// 1. Remove Dossie
content = content.replace(/function DossieTemplate\(\) \{[\s\S]*?\}\n/, '');
content = content.replace(/\{activeApp === 'dossie' && <DossieTemplate \/>\}/g, '');
// Remove Dossie button from dock
content = content.replace(/<a onClick=\{.*?'dossie'\)}[\s\S]*?<\/a>/, '');
// Remove dossie from dynamic title
content = content.replace(/activeApp === 'dossie' \? 'Dossiês' :\s*/, '');


// 2. Fix Curriculo scroll (h-full -> min-h-full)
content = content.replace(/className="flex flex-col items-center justify-center h-full p-6"/g, 'className="flex flex-col items-center justify-center min-h-full p-6"');


// 3. Remove all colors from dock buttons
// They look like: hover:bg-yellow-500/20 hover:text-yellow-500 hover:border-yellow-500/50
// and pink-500, cyan-500, green-500, purple-500
const colors = ['yellow', 'cyan', 'green', 'purple', 'pink', 'blue', 'red', 'emerald'];
colors.forEach(color => {
    content = content.replace(new RegExp(`hover:bg-${color}-500\\/20`, 'g'), 'hover:bg-white/20');
    content = content.replace(new RegExp(`hover:text-${color}-500`, 'g'), 'hover:text-white');
    content = content.replace(new RegExp(`hover:border-${color}-500\\/50`, 'g'), 'hover:border-white/50');
});


// 4. Add drag-to-scroll to Certificados
// We can just add a global simple mouse drag handler hook at the top, or inline it.
// Let's add a small helper at the top of CertificadosTemplate
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
        // Also add mouse wheel scroll
        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
        });
    };
`;
// Insert helperCode inside CertificadosTemplate
content = content.replace(/function CertificadosTemplate\(\{[^\}]*\}\) \{/, (match) => {
    return match + '\n' + helperCode;
});

// Add overflow-x-auto and the attachDrag to the marquee containers
// The marquee containers currently have "marquee-container w-full"
// We'll change them to "flex gap-4 overflow-x-auto w-full pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
// Wait, the original was marquee-container, which had custom CSS for animation!
// If they want to scroll with mouse, maybe it shouldn't auto-animate anymore?
// Just add overflow-x-auto to the container.
content = content.replace(/className="marquee-container w-full"/g, 'className="marquee-container flex overflow-x-auto w-full cursor-grab active:cursor-grabbing scrollbar-hide" onMouseEnter={attachDrag}');
content = content.replace(/className="marquee-content"/g, 'className="marquee-content flex gap-4 pr-10"');
content = content.replace(/className="marquee-content pb-32"/g, 'className="marquee-content flex gap-4 pr-10 pb-32"');


// 5. Change v3-app-window to fixed instead of absolute to prevent scrolling bugs with the main body
content = content.replace('id="v3-app-window" className={`${activeApp ? "" : "hidden"} absolute inset-0', 'id="v3-app-window" className={`${activeApp ? "" : "hidden"} fixed inset-0');


fs.writeFileSync('src/pages/Dashboard.jsx', content);
