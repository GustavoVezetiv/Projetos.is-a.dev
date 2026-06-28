const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
content = content.replace(/\r\n/g, '\n');

const newLinks = `                    <a href="javascript:void(0)" onClick={() => confirmRedirect('https://vitrine.vezetiv.dev')}
                        className="group relative w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fas fa-window-restore"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Vitrine</span>
                    </a>

                    <a href="javascript:void(0)" onClick={() => confirmRedirect('https://acervo.vezetiv.dev')}
                        className="group relative w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fas fa-box-archive"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Acervo</span>
                    </a>
                  </div>`;

const githubEndStr = 'whitespace-nowrap">GitHub</span>\n                      </a>\n                  </div>';

if (content.includes(githubEndStr) && !content.includes('vitrine.vezetiv.dev')) {
    content = content.replace(githubEndStr, 'whitespace-nowrap">GitHub</span>\n                      </a>\n\n' + newLinks);
    fs.writeFileSync('src/pages/Dashboard.jsx', content);
    console.log("Success");
} else {
    console.log("Not found or already exists");
}
