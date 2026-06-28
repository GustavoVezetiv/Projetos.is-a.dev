const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// 1. Remove Dossie completely from dock
let dossieStart = content.indexOf('<div onClick={() => loadApp(\'dossie\')}');
if (dossieStart !== -1) {
    let dossieEnd = content.indexOf('</div>', dossieStart) + 6;
    content = content.slice(0, dossieStart) + content.slice(dossieEnd);
}

// 2. Remove gradient background from dock items (Certificados, Projetos)
content = content.replace(/bg-gradient-to-br from-blue-500 to-indigo-600/g, 'bg-white/10 hover:bg-white/20 transition-all');
content = content.replace(/bg-gradient-to-br from-orange-500 to-red-600/g, 'bg-white/10 hover:bg-white/20 transition-all');
// Make sure Curriculo and Sobre also have hover if they don't
content = content.replace(/bg-white\/10 rounded-xl/g, 'bg-white/10 hover:bg-white/20 rounded-xl transition-all');

// 3. Add auto-scroll to Certificados carousel and fix drag events to include mouseleave pause
content = content.replace('let isDown = false;', 'let isDown = false;\n        let autoScrollInterval;\n        slider.dataset.isHovered = "false";');
content = content.replace("slider.addEventListener('mousedown', (e) => {", `
        // Auto scroll setup
        const startAutoScroll = () => {
            if (autoScrollInterval) return;
            autoScrollInterval = setInterval(() => {
                if (slider.dataset.isHovered !== 'true' && !isDown) {
                    slider.scrollLeft += 1;
                }
            }, 30);
        };
        startAutoScroll();
        
        slider.addEventListener('mouseenter', () => { slider.dataset.isHovered = 'true'; });
        slider.addEventListener('mouseleave', () => { slider.dataset.isHovered = 'false'; isDown = false; });
        slider.addEventListener('mousedown', (e) => {`);

// 4. Add descriptions to Certificates
const certsDataCode = `
const certsData = {
    'Clean Code & SOLID': 'Boas práticas de programação e arquitetura de software, focando em manutenibilidade e escalabilidade.',
    'Lógica de Programação e Algoritmos': 'Fundamentos de programação, estruturas de dados e resolução de problemas.',
    'Versionamento com Git e GitHub': 'Controle de versão de código, trabalho em equipe e metodologias ágeis.',
    'React JS do zero ao avançado': 'Desenvolvimento de interfaces modernas, componentização, hooks e gerenciamento de estado.',
    'Trilha Python': 'Desenvolvimento backend, scripts, automação e análise de dados com Python.',
    'Testes Automatizados com Cypress': 'Garantia de qualidade de software através de testes end-to-end (E2E) e automação.'
};
`;
if (!content.includes('const certsData')) {
    // Insert certsData after imports
    content = content.replace('import { useNavigate } from "react-router-dom";', 'import { useNavigate } from "react-router-dom";\n' + certsDataCode);
}

// Replace the hardcoded desc in the modal
content = content.replace(
    /<p id="cert-modal-desc" className="text-white\/60 mb-8 leading-relaxed font-inter">[\s\S]*?<\/p>/, 
    `<p id="cert-modal-desc" className="text-white/60 mb-8 leading-relaxed font-inter">
                    {activeCert ? (certsData[activeCert] || 'Certificado conquistado com sucesso e dedicação.') : ''}
                </p>`
);

fs.writeFileSync('src/pages/Dashboard.jsx', content);
