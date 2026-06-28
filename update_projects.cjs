const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

const newProjetosContent = `
                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-layer-group text-2xl text-blue-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-[10px] uppercase text-white/60 font-bold">Produção</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">Hub VZ</h3>
                        <p className="text-sm text-white/60 mb-6">Sistema pessoal para finanças, metas, decisões, compras, notas e planejamento.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-react" title="Next.js"></i><i className="fas fa-database" title="Supabase / PostgreSQL"></i><i className="fas fa-server" title="Vercel"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-robot text-2xl text-cyan-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span><span className="text-[10px] uppercase text-white/60 font-bold">MVP</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">AutoPost / IA Content</h3>
                        <p className="text-sm text-white/60 mb-6">Transforme URLs, textos brutos ou ideias soltas em posts prontos para LinkedIn usando IA (Gemini).</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-python" title="FastAPI / Python"></i><i className="fab fa-react" title="React"></i><i className="fas fa-brain" title="Gemini & Pollinations"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-file-invoice-dollar text-2xl text-emerald-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="text-[10px] uppercase text-white/60 font-bold">Dev</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">OS.Serv</h3>
                        <p className="text-sm text-white/60 mb-6">Sistema para controle de clientes, orçamentos, itens de serviço, transações e geração de PDF.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-react" title="React"></i><i className="fab fa-js" title="TypeScript"></i><i className="fas fa-database" title="Supabase"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-university text-2xl text-purple-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-[10px] uppercase text-white/60 font-bold">Contrib.</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">AeVALIS.SGAD</h3>
                        <p className="text-sm text-white/60 mb-6">Sistema de gestão e avaliação docente acadêmica para o IFMT com autenticação SUAP OAuth2.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-python" title="Django / Python"></i><i className="fas fa-database" title="PostgreSQL"></i></div>
                    </div>
`;

// Extract everything from <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20"> to </div>
// Because regex might fail with multiple divs, we use string matching
const startMarker = '<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">';
const endMarker = '</div>\n            </div>\n       \n        </React.Fragment>';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = startMarker + '\n' + newProjetosContent + '                </div>';
    content = content.slice(0, startIdx) + replacement + content.slice(endIdx + 6); // +6 to skip </div>
}

fs.writeFileSync('src/pages/Dashboard.jsx', content);
