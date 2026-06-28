const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// Find CertificadosTemplate
const templateStart = content.indexOf('function CertificadosTemplate({ openCertModal }) {');
if (templateStart !== -1) {
    const returnStart = content.indexOf('return (', templateStart);
    
    // The existing attachDrag function
    const attachDragCode = content.substring(templateStart + 'function CertificadosTemplate({ openCertModal }) {'.length, returnStart).trim();
    
    const newCode = `
    React.useEffect(() => {
        const intervals = [];
        const attachDrag = (slider) => {
            if (slider.dataset.dragAttached) return;
            slider.dataset.dragAttached = 'true';
            let isDown = false;
            slider.dataset.isHovered = "false";
            let startX;
            let scrollLeft;
            
            const startAutoScroll = () => {
                const autoScrollInterval = setInterval(() => {
                    if (slider.dataset.isHovered !== 'true' && !isDown) {
                        slider.scrollLeft += 1;
                    }
                }, 30);
                intervals.push(autoScrollInterval);
            };
            startAutoScroll();
            
            slider.addEventListener('mouseenter', () => { slider.dataset.isHovered = 'true'; });
            slider.addEventListener('mouseleave', () => { slider.dataset.isHovered = 'false'; isDown = false; });
            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
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

        const sliders = document.querySelectorAll('.marquee-container');
        sliders.forEach(attachDrag);

        return () => {
            intervals.forEach(clearInterval);
            sliders.forEach(s => {
                delete s.dataset.dragAttached;
                // listeners are garbage collected when elements are removed anyway
            });
        };
    }, []);
`;
    
    // Replace the attachDrag block with the useEffect
    content = content.replace(attachDragCode, newCode.trim());
    
    // Remove onMouseEnter={attachDrag} from all marquee containers
    content = content.replace(/onMouseEnter=\{attachDrag\}/g, '');
    
    fs.writeFileSync('src/pages/Dashboard.jsx', content);
    console.log("Success");
} else {
    console.log("Template not found");
}
