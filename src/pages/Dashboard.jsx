import React from 'react';

export default function Dashboard() {
    return (
        <>
            

    
    <div className="animated-bg"></div>

    <main className="w-full h-full relative z-10">

        <section className="page-section h-full w-full flex flex-col items-center justify-center font-inter bg-transparent relative">

            <div id="v3-hero"
                className="flex-1 flex flex-col justify-center items-center mb-24 animate-fadeIn transition-all duration-500 relative w-full">
                
                <button onClick="goBackToIndex()" className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 group">
                    <i className="fas fa-arrow-left text-sm"></i>
                    <span className="absolute -bottom-8 right-0 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Voltar</span>
                </button>

                <h1
                    className="font-montserrat font-black text-main text-[clamp(3rem,10vw,8rem)] leading-[0.9] uppercase tracking-tighter">
                    GUSTAVO</h1>
                <p className="font-inter text-xs sm:text-lg md:text-xl tracking-[2px] sm:tracking-[4px] text-white/90 mt-4 uppercase drop-shadow-md whitespace-nowrap">Full Stack Developer</p>
                <div className="mt-2 flex gap-2">
                    <span
                        className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-widest border border-white/20">Lv.
                        21</span>
                    <span
                        className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-widest border border-white/20">Cuiabá-MT</span>
                </div>

                
                <div className="flex gap-3 mt-6">
                    <a href="javascript:void(0)" onClick="confirmRedirect('https://linkedin.com/in/gustavovezetiv')"
                        className="group relative w-10 h-10 bg-white/10 hover:bg-blue-600/30 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fab fa-linkedin-in"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">LinkedIn</span>
                    </a>

                    <a href="javascript:void(0)" onClick="confirmRedirect('https://instagram.com/gustavovezetiv')"
                        className="group relative w-10 h-10 bg-white/10 hover:bg-pink-600/30 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fab fa-instagram"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Instagram</span>
                    </a>

                    <a href="javascript:void(0)" onClick="confirmRedirect('https://github.com/gustavovezetiv')"
                        className="group relative w-10 h-10 bg-white/10 hover:bg-gray-700/30 rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
                        <i className="fab fa-github"></i>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">GitHub</span>
                    </a>
                </div>
            </div>

            <div id="v3-app-window" className="hidden absolute inset-0 z-40 flex items-center justify-center p-2 sm:p-4 md:p-10 backdrop-blur-md bg-black/40 app-window pointer-events-none" onClick="handleBackdropClick(event)">
                <div id="v3-app-content"
                    className="w-full h-full sm:max-h-[75vh] md:h-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl bg-[#0f1014] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col" onClick="event.stopPropagation()">
                    <div
                        className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between shrink-0">
                        <div className="flex gap-2">
                            <div onClick="goBack()"
                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors"></div>
                            <div onClick="closeApp()"
                                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors"></div>
                            <div onClick="closeApp()"
                                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors"></div>
                        </div>
                        <span id="v3-app-title" className="text-xs font-bold text-white/50 uppercase tracking-widest">Perfect Interface</span>
                        <div className="w-10"></div>
                    </div>
                    <div id="v3-app-body" className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
                        
                    </div>
                    <p className="modal-close-hint shrink-0 border-t border-white/5 px-4 py-2 text-center text-[10px] uppercase tracking-[2px] text-white/35">
                        Clique fora da janela para sair
                    </p>
                </div>
            </div>

            <div id="source-dock" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw] mb-2">
                <div
                    className="dock-container flex items-end gap-3 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">

                    <div onClick="loadApp('certificados')"
                        className="dock-item group relative w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex justify-center items-center text-white text-2xl border border-white/20 cursor-pointer shadow-lg">
                        <i className="fas fa-certificate"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Certificados</span>
                    </div>

                    <div onClick="loadApp('projetos')"
                        className="dock-item group relative w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex justify-center items-center text-white text-2xl border border-white/20 cursor-pointer shadow-lg">
                        <i className="fas fa-code"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Projetos</span>
                    </div>

                    <div onClick="loadApp('curriculo')"
                        className="dock-item group relative w-12 h-12 bg-white/10 rounded-xl flex justify-center items-center text-white/90 text-2xl border border-white/5 cursor-pointer shadow-lg">
                        <i className="far fa-file-pdf"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Currículo</span>
                    </div>

                    <div onClick="loadApp('dossie')"
                        className="dock-item group relative w-12 h-12 bg-white/10 rounded-xl flex justify-center items-center text-white/90 text-2xl border border-white/5 cursor-pointer shadow-lg">
                        <i className="fas fa-scroll"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Dossiê</span>
                    </div>

                    <div className="w-[1px] h-8 bg-white/20 mx-1 self-center"></div>

                    <div onClick="loadApp('sobre')"
                        className="dock-item group relative w-12 h-12 bg-white/10 rounded-xl flex justify-center items-center text-white/90 text-2xl border border-white/5 cursor-pointer shadow-lg">
                        <i className="far fa-user"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Sobre
                            Mim</span>
                    </div>

                </div>
            </div>
        </section>

        
        <div id="cert-modal" className="hidden fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 pointer-events-none" onClick="closeCertModal(event)">
            <div className="bg-[#0f1014] rounded-2xl border border-white/10 max-w-md w-full p-6 relative pointer-events-auto" onClick="event.stopPropagation()">
                <button onClick="closeCertModal()" className="absolute top-3 right-3 text-white/60 hover:text-white text-2xl">
                    <i className="fas fa-times"></i>
                </button>
                <div id="cert-modal-content" className="space-y-4">
                    
                </div>
                <p className="modal-close-hint mt-5 border-t border-white/5 pt-3 text-center text-[10px] uppercase tracking-[2px] text-white/35">
                    Clique fora para sair
                </p>
            </div>
        </div>


<div id="template-certificados" className="hidden pb-32">
    <div className="text-center mb-10 mt-10">
        <h2 className="font-montserrat text-3xl font-extrabold text-white">Certificações & Habilidades</h2>
        <p className="text-white/50 text-sm mt-2">Tecnologia, Dados, Segurança e Gestão</p>
    </div>

    <div className="mb-8">
        <h3 className="text-white font-montserrat font-bold text-sm mb-4 pl-4 border-l-4 border-blue-500 ml-2 uppercase">Dev & Arquitetura</h3>
        <div className="marquee-container w-full" id="marquee-cert-1">
            <div className="marquee-content">
                
                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Clean Code & SOLID')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center"><i className="fa-solid fa-broom text-4xl text-white"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Clean Code & SOLID</h3><p className="text-gray-400 text-[10px] mt-1">Boas Práticas</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Estruturas de Dados')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-indigo-700 to-purple-800 flex items-center justify-center"><i className="fa-solid fa-sitemap text-4xl text-white"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Estruturas de Dados</h3><p className="text-gray-400 text-[10px] mt-1">Fundamentos</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('React / React Native')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center"><i className="fa-brands fa-react text-4xl text-cyan-300"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">React / React Native</h3><p className="text-gray-400 text-[10px] mt-1">Web & Mobile</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Docker Avançado')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-sky-600 to-blue-800 flex items-center justify-center"><i className="fa-brands fa-docker text-4xl text-sky-300"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Docker Avançado</h3><p className="text-gray-400 text-[10px] mt-1">Contêineres</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Arquitetura de Software')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-indigo-600 to-violet-800 flex items-center justify-center"><i className="fa-solid fa-diagram-project text-4xl text-indigo-300"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Arquitetura de Software</h3><p className="text-gray-400 text-[10px] mt-1">MVC, REST</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Testes com Pytest')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-cyan-700 to-teal-900 flex items-center justify-center"><i className="fa-solid fa-vial text-4xl text-white"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Testes com Pytest</h3><p className="text-gray-400 text-[10px] mt-1">Unitário & TDD</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Python P/ Dados')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center"><i className="fa-brands fa-python text-4xl text-white"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Python P/ Dados</h3><p className="text-gray-400 text-[10px] mt-1">Data Science Academy</p></div>
                </div>
                
                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Web com Django')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-green-600 to-emerald-900 flex items-center justify-center"><i className="fas fa-server text-4xl text-white"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Web com Django</h3><p className="text-gray-400 text-[10px] mt-1">Udemy / Prático</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('APIs RESTful')">
                    <div className="h-[60%] w-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"><i className="fas fa-cloud text-4xl text-white"></i></div>
                    <div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">APIs RESTful</h3><p className="text-gray-400 text-[10px] mt-1">Django Framework</p></div>
                </div>
                
                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('SQL & PostgreSQL')"><div className="h-[60%] w-full bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center"><i className="fa-solid fa-database text-4xl text-purple-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">SQL & PostgreSQL</h3><p className="text-gray-400 text-[10px] mt-1">Consultas Avançadas</p></div>
                </div>
                
                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Machine Learning')"><div className="h-[60%] w-full bg-gradient-to-br from-fuchsia-700 to-pink-800 flex items-center justify-center"><i className="fa-solid fa-brain text-4xl text-fuchsia-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Machine Learning</h3><p className="text-gray-400 text-[10px] mt-1">Modelos & Métricas</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Prompt Engineering')"><div className="h-[60%] w-full bg-gradient-to-br from-pink-600 to-rose-800 flex items-center justify-center"><i className="fa-solid fa-wand-magic-sparkles text-4xl text-pink-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Prompt Engineering</h3><p className="text-gray-400 text-[10px] mt-1">IA Generativa</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Power BI Avançado')"><div className="h-[60%] w-full bg-gradient-to-br from-yellow-600 to-amber-800 flex items-center justify-center"><i className="fa-solid fa-chart-column text-4xl text-yellow-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Power BI Avançado</h3><p className="text-gray-400 text-[10px] mt-1">DAX & ETL</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('BigQuery (Google)')"><div className="h-[60%] w-full bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center"><i className="fa-brands fa-google text-4xl text-red-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">BigQuery (Google)</h3><p className="text-gray-400 text-[10px] mt-1">Cloud Analytics</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Data Warehouse')"><div className="h-[60%] w-full bg-gradient-to-br from-orange-600 to-amber-800 flex items-center justify-center"><i className="fa-solid fa-cubes text-4xl text-orange-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Data Warehouse</h3><p className="text-gray-400 text-[10px] mt-1">Modelagem ETL</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Power BI P/ Análise')"><div className="h-[60%] w-full bg-gradient-to-br from-lime-600 to-green-800 flex items-center justify-center"><i className="fas fa-chart-line text-4xl text-lime-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Power BI P/ Análise</h3><p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Modelagem de Dados')"><div className="h-[60%] w-full bg-gradient-to-br from-teal-600 to-emerald-800 flex items-center justify-center"><i className="fas fa-diagram-project text-4xl text-teal-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Modelagem de Dados</h3><p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Imersão em IA')"><div className="h-[60%] w-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center"><i className="fas fa-brain text-4xl text-violet-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Imersão em IA</h3><p className="text-gray-400 text-[10px] mt-1">Alura / Ebac</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('IA & Cultura Digital')"><div className="h-[60%] w-full bg-gradient-to-br from-cyan-600 to-teal-800 flex items-center justify-center"><i className="fas fa-microchip text-4xl text-cyan-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">IA & Cultura Digital</h3><p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p></div>
                </div>

            </div>
        </div>
    </div>

    <div className="mb-8">
        <h3 className="text-white font-montserrat font-bold text-sm mb-4 pl-4 border-l-4 border-red-500 ml-2 uppercase">Segurança & Infra</h3>
        <div className="marquee-container w-full" id="marquee-cert-2">
            <div className="marquee-content">
                
                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Cibersegurança')"><div className="h-[60%] w-full bg-gradient-to-br from-red-700 to-rose-900 flex items-center justify-center"><i className="fa-solid fa-shield-halved text-4xl text-red-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Cibersegurança</h3><p className="text-gray-400 text-[10px] mt-1">Ataques & Prevenção</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Fundamentos de Redes')"><div className="h-[60%] w-full bg-gradient-to-br from-amber-600 to-yellow-800 flex items-center justify-center"><i className="fa-solid fa-network-wired text-4xl text-amber-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Fundamentos de Redes</h3><p className="text-gray-400 text-[10px] mt-1">TCP/IP, VLANs</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Firewalls & VPN')"><div className="h-[60%] w-full bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center"><i className="fa-solid fa-shield text-4xl text-emerald-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Firewalls & VPN</h3><p className="text-gray-400 text-[10px] mt-1">PfSense, Mikrotik</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('LGPD')"><div className="h-[60%] w-full bg-gradient-to-br from-yellow-600 to-amber-800 flex items-center justify-center"><i className="fa-solid fa-scale-balanced text-4xl text-yellow-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">LGPD</h3><p className="text-gray-400 text-[10px] mt-1">Conformidade</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Hardening Linux')"><div className="h-[60%] w-full bg-gradient-to-br from-gray-600 to-slate-800 flex items-center justify-center"><i className="fa-brands fa-linux text-4xl text-gray-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Hardening Linux</h3><p className="text-gray-400 text-[10px] mt-1">Segurança OS</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Cloud Fundamentals')"><div className="h-[60%] w-full bg-gradient-to-br from-blue-600 to-sky-800 flex items-center justify-center"><i className="fa-solid fa-cloud-arrow-up text-4xl text-blue-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Cloud Fundamentals</h3><p className="text-gray-400 text-[10px] mt-1">Azure / AWS</p></div>
                </div>
                
                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Segurança TI')"><div className="h-[60%] w-full bg-gradient-to-br from-orange-600 to-amber-800 flex items-center justify-center"><i className="fas fa-lock text-4xl text-orange-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Segurança TI</h3>
                        <p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p>
                    </div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Segurança Dados')"><div className="h-[60%] w-full bg-gradient-to-br from-pink-600 to-rose-800 flex items-center justify-center"><i className="fas fa-user-shield text-4xl text-pink-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Segurança Dados</h3><p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Automação IA')"><div className="h-[60%] w-full bg-gradient-to-br from-teal-600 to-emerald-800 flex items-center justify-center"><i className="fas fa-robot text-4xl text-teal-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Automação IA</h3><p className="text-gray-400 text-[10px] mt-1">Docker + N8N</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Dynamics 365')"><div className="h-[60%] w-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center"><i className="fa-brands fa-microsoft text-4xl text-blue-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Dynamics 365</h3><p className="text-gray-400 text-[10px] mt-1">Microsoft / DSA</p></div>
                </div>
                
            </div>
        </div>
    </div>

    <div className="mb-12">
        <h3 className="text-white font-montserrat font-bold text-sm mb-4 pl-4 border-l-4 border-green-500 ml-2 uppercase">Produtividade & Office</h3>
        <div className="marquee-container w-full" id="marquee-cert-4">
            <div className="marquee-content pb-32">

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Excel Avançado')"><div className="h-[60%] w-full bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center"><i className="fa-solid fa-file-excel text-4xl text-green-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Excel Avançado</h3><p className="text-gray-400 text-[10px] mt-1">Fórmulas & Dashboards</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('PowerPoint Pro')"><div className="h-[60%] w-full bg-gradient-to-br from-cyan-700 to-teal-900 flex items-center justify-center"><i className="fa-solid fa-person-chalkboard  text-4xl text-white"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">PowerPoint Pro</h3><p className="text-gray-400 text-[10px] mt-1">Storytelling & Design</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Gestão de Projetos')"><div className="h-[60%] w-full bg-gradient-to-br from-purple-600 to-violet-800 flex items-center justify-center"><i className="fa-solid fa-diagram-project text-4xl text-purple-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Gestão de Projetos</h3><p className="text-gray-400 text-[10px] mt-1">PMBOK / Cronogramas</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Liderança')"><div className="h-[60%] w-full bg-gradient-to-br from-amber-600 to-yellow-800 flex items-center justify-center"><i className="fa-solid fa-user-tie text-4xl text-amber-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Liderança</h3><p className="text-gray-400 text-[10px] mt-1">Gestão de Equipes</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Gestão de Tempo')"><div className="h-[60%] w-full bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center"><i className="fa-solid fa-stopwatch text-4xl text-emerald-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Gestão de Tempo</h3><p className="text-gray-400 text-[10px] mt-1">Produtividade / GTD</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Comunicação Profissional')"><div className="h-[60%] w-full bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center"><i className="fa-solid fa-comments text-4xl text-cyan-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Comunicação Profissional</h3><p className="text-gray-400 text-[10px] mt-1">Clareza & Objetividade</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Excel Intermediário')"><div className="h-[60%] w-full bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center"><i className="fas fa-file-excel text-4xl text-green-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Excel Intermediário</h3><p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p></div>
                </div>
                
                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Word Intermediário')"><div className="h-[60%] w-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center"><i className="fas fa-file-word text-4xl text-blue-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Word Intermediário</h3><p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Cultura Digital')"><div className="h-[60%] w-full bg-gradient-to-br from-yellow-600 to-amber-800 flex items-center justify-center"><i className="fas fa-lightbulb text-4xl text-yellow-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Cultura Digital</h3><p className="text-gray-400 text-[10px] mt-1">Fundação Bradesco</p></div>
                </div>

                <div className="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer" onClick="openCertModal('Conceitos Aviação')"><div className="h-[60%] w-full bg-gradient-to-br from-indigo-600 to-violet-800 flex items-center justify-center"><i className="fas fa-plane text-4xl text-indigo-300"></i></div><div className="h-[40%] p-3 flex flex-col justify-center"><h3 className="text-white text-xs font-bold">Conceitos Aviação</h3><p className="text-gray-400 text-[10px] mt-1">SEST</p></div>
                </div>
                
            </div>
        </div>
    </div>
</div>


        <div id="template-projetos" className="hidden">
            <div className="pt-10 px-4">
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                    <div>
                        <h2 className="font-montserrat text-4xl font-black text-white mb-1 tracking-tighter">PROJETOS</h2>
                        <p className="text-white/50 text-xs font-inter tracking-widest uppercase">Code • Deploy • Innovation</p>
                    </div>
                    <div className="flex gap-2"><span className="px-3 py-1 rounded-full bg-white/5 text-[10px] text-white/60 border border-white/10">Full Stack</span></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    
                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-city text-2xl text-blue-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="text-[10px] uppercase text-white/60 font-bold">Dev</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">Real Estate Manager</h3>
                        <p className="text-sm text-white/60 mb-6">Sistema completo de gestão de imóveis, contratos e agendamentos.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-python" title="Python"></i><i className="fas fa-database" title="PostgreSQL"></i><i className="fab fa-docker" title="Docker"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-mobile-alt text-2xl text-cyan-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="text-[10px] uppercase text-white/60 font-bold">APK</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">Links App Mobile</h3>
                        <p className="text-sm text-white/60 mb-6">App para gestão de links e QR Codes com categorização inteligente.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-react" title="React Native"></i><i className="fab fa-js" title="TypeScript"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-robot text-2xl text-pink-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="text-[10px] uppercase text-white/60 font-bold">Online</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">Automated AI Poster</h3>
                        <p className="text-sm text-white/60 mb-6">Bot que analisa trends e cria posts no LinkedIn usando N8N e IA.</p>
                        <div className="flex gap-3 text-white/40"><i className="fas fa-project-diagram" title="N8N"></i><i className="fab fa-docker" title="Docker"></i><i className="fab fa-python" title="Python"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-book text-2xl text-purple-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-gray-500"></span><span className="text-[10px] uppercase text-white/60 font-bold">Archived</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">Library Manager</h3>
                        <p className="text-sm text-white/60 mb-6">Sistema clássico de gestão de acervo e empréstimos.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-php" title="PHP"></i><i className="fas fa-database" title="MySQL"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-car text-2xl text-green-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span><span className="text-[10px] uppercase text-white/60 font-bold">Refactor</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">Driving School System</h3>
                        <p className="text-sm text-white/60 mb-6">Sistema com controle de permissões (RBAC) para Instrutores, Alunos e Gerentes.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-python" title="Django"></i><i className="fas fa-users-gear" title="Gestão de Usuários"></i><i className="fas fa-database" title="SQL"></i></div>
                    </div>

                    <div className="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-lg"><i className="fas fa-brain text-2xl text-purple-500"></i></div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-gray-500"></span><span className="text-[10px] uppercase text-white/60 font-bold">Study</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-montserrat font-bold text-white mb-2">ML Data Classifier</h3>
                        <p className="text-sm text-white/60 mb-6">Modelo supervisionado com Scikit-learn para classificação e análise preditiva de notas falsas.</p>
                        <div className="flex gap-3 text-white/40"><i className="fab fa-python" title="Python"></i><i className="fas fa-chart-line" title="Scikit-Learn"></i><i className="fas fa-microchip" title="IA"></i></div>
                    </div>

                </div>
            </div>
            
        </div>
        
        <div id="template-sobre" className="hidden">
            <div className="flex flex-col items-center justify-center p-10 text-center max-w-3xl mx-auto mt-10">
                <div
                    className="w-32 h-32 bg-gray-700 rounded-full mb-6 border-4 border-white/10 flex items-center justify-center text-4xl">
                    <i className="fas fa-user-astronaut"></i>
                </div>
                <h2 className="text-3xl font-bold mb-4 font-montserrat"> Gustavo Vezetiv</h2>
                
                
                    <p className="text-white/70 leading-relaxed font-inter space-y-3 mb-2">
                        Sou estudante de TADS no IFMT (6º período), com um pé e um dedo em cada parte da tecnologia. 
                        Aventureiro, animado, desbravador da natureza e sempre procurando entender como as coisas funcionam.
                    </p>

                    
                    <div id="bio-expanded-content" className="hidden text-white/70 leading-relaxed font-inter space-y-3 mb-2">
                        
                        <p>Ao longo das minhas experiências, aprendi a ter paciência, lidar com pessoas diferentes e perceber o quanto os detalhes fazem diferença. Trabalho bastante com Suporte, Documentação, Python, Docker, automações, Power BI e outras ferramentas que deixam tudo mais organizado e claro no dia a dia.</p>
                        
                        <p>Gosto de ajudar, colaborar e ouvir músicas no meio disso tudo. Valorizo ambientes onde existe respeito, espaço para crescer e incentivo à criatividade.</p>
                        
                        <p>A vida é uma eterna evolução, uma troca onde cada um contribui com o que sabe e faz de melhor naquele momento. Procuro hoje ser a minha melhor versão, e espero que possa contribuir para você ser a sua!</p>

                    </div>


                
                <button id="bio-toggle-btn" onClick="toggleBioExpand()" className="px-4 py-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-all border border-cyan-400/50 rounded-lg mb-4 hover:border-cyan-300 flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20">
                    <span id="bio-toggle-text">Ler mais</span>
                    <i id="bio-toggle-icon" className="fas fa-chevron-down text-xs transition-transform duration-300"></i>
                </button>

                <div className="grid grid-cols-2 gap-4 mt-8 w-full pb-32">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h3 className="font-bold text-cyan-400">Skills</h3>
                        <p className="text-sm text-white/60">React, Python, Django, SQL, Docker, Git, HTML, CSS, JS e Figma
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h3 className="font-bold text-purple-400">Hobbies</h3>
                        <p className="text-sm text-white/60">D&D, Smart Home, Games, Musica, Animações, QA, Trilhas e
                            Exploração</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="template-dossie" className="hidden">
            <div className="pt-10 px-4 pb-24">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 border-b border-white/10 pb-4">
                    <div>
                        <h2 className="font-montserrat text-4xl font-black text-white mb-1 tracking-tighter">DOSSIÊ</h2>
                        <p className="text-white/50 text-xs font-inter tracking-widest uppercase">Recomendações • Bastidores • Confiança</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-[10px] text-cyan-200 border border-cyan-400/20 uppercase tracking-widest">
                        <i className="fas fa-dice-d20"></i>
                        <span>Arquivo Vezetiv</span>
                    </div>
                </div>

                <div id="dossie-recommendations" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                </div>
            </div>
        </div>

        <div id="template-curriculo" className="hidden">
            <div className="flex flex-col items-center justify-center h-full p-6">
                <i className="far fa-file-pdf text-6xl text-red-500 mb-4"></i>
                <h2 className="text-2xl font-bold mb-2">Visualizador de PDF</h2>
                <p className="text-white/50 mb-6">Clique aqui para visualizar em PDF o currículo.</p>
                <p className="text-white/50 mb-6 text-center">
                    <a href="mailto:gustavovezetiv8@gmail.com?subject=Oportunidade%20de%20Trabalho&body=Ol%C3%A1%20Gustavo%2C%0A%0AGostaria%20de%20conversar%20sobre%20uma%20oportunidade..." 
                       className="text-cyan-400 hover:text-cyan-300 transition-colors underline">
                        gustavovezetiv8@gmail.com
                    </a>
                </p>

                <a href="arc/Curriculo_Gustavo_Vezetiv_Python_Dados_Integracoes.pdf" download="Curriculo_Gustavo_Vezetiv_Python_Dados_Integracoes.pdf" target="_blank"
                    className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform cursor-pointer mb-8">
                    Baixar PDF
                </a>

                
                <div className="w-full max-w-2xl border border-white/20 rounded-lg overflow-hidden bg-white/5">
                    <div className="bg-white/10 px-4 py-2 border-b border-white/20">
                        <p className="text-sm text-white/60">Prévia do Currículo</p>
                    </div>
                    <iframe src="arc/Curriculo_Gustavo_Vezetiv_Python_Dados_Integracoes.pdf" className="w-full h-96 bg-white"></iframe>
                </div>
            </div>
        </div>

    </main>

    

        </>
    );
}
