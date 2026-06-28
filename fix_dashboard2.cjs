const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// Fix 1: pointer-events-auto on v3-app-content
content = content.replace('id="v3-app-content"\n                    className="w-full h-full sm:max-h-[75vh] md:h-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl bg-[#0f1014] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col"', 
'id="v3-app-content"\n                    className="w-full h-full sm:max-h-[75vh] md:h-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl bg-[#0f1014] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col pointer-events-auto"');

// Fix 2: dynamic title
const originalTitle = '<span id="v3-app-title" className="text-xs font-bold text-white/50 uppercase tracking-widest">Perfect Interface</span>';
const newTitle = `<span id="v3-app-title" className="text-xs font-bold text-white/50 uppercase tracking-widest">
                            {activeApp === 'certificados' ? 'Certificações' : 
                             activeApp === 'projetos' ? 'Projetos' :
                             activeApp === 'curriculo' ? 'Currículo' :
                             activeApp === 'sobre' ? 'Sobre Mim' :
                             activeApp === 'dossie' ? 'Dossiês' :
                             'Perfect Interface'}
                        </span>`;
content = content.replace(originalTitle, newTitle);

fs.writeFileSync('src/pages/Dashboard.jsx', content);
