const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// 1. Fix dock toggle
content = content.replace(
    'const loadApp = (app) => setActiveApp(app);',
    'const loadApp = (app) => setActiveApp(prev => prev === app ? null : app);'
);

// 2. Add social links
const githubLink = `                    <a href="javascript:void(0)" onClick={() => confirmRedirect('https://github.com/gustavovezetiv')}
                        className="group relative w-10 h-10 bg-white/10 hover:bg-gray-700/30 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fab fa-github"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">GitHub</span>
                    </a>`;

const newLinks = `                    <a href="javascript:void(0)" onClick={() => confirmRedirect('https://github.com/gustavovezetiv')}
                        className="group relative w-10 h-10 bg-white/10 hover:bg-gray-700/30 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fab fa-github"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">GitHub</span>
                    </a>

                    <div className="w-[1px] h-6 bg-white/20 mx-1 self-center"></div>

                    <a href="javascript:void(0)" onClick={() => confirmRedirect('https://vitrine.vezetiv.dev')}
                        className="group relative w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fas fa-window-restore"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Vitrine</span>
                    </a>

                    <a href="javascript:void(0)" onClick={() => confirmRedirect('https://acervo.vezetiv.dev')}
                        className="group relative w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fas fa-box-archive"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Acervo</span>
                    </a>`;

// Only replace if new links aren't already there
if (!content.includes('vitrine.vezetiv.dev')) {
    content = content.replace(githubLink, newLinks);
}

fs.writeFileSync('src/pages/Dashboard.jsx', content);
