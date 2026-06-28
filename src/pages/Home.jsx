import React from 'react';

export default function Home() {
    return (
        <>
            

    <div id="ugly-overlay">
        <h1>Gustavo Vezetiv - Portfólio </h1>
        <p>Bem-vindo ao sistema. A interface gráfica não foi carregada para economizar recursos.</p>
        <p><strong>Status:</strong> Aguardando input do usuário.</p>
        <hr style={{margin: '20px 0', border: '1px solid #ccc'}} />
        <h2>Dados do Desenvolvedor:</h2>
        <ul>
            <li>Nome: Gustavo</li>
            <li>Classe: Full Stack</li>
            <li>Localização: Campo Verde, MT</li>
            <li>Stack: React, Python, Docker, PostgreSQL</li>
        </ul>
        <p>Para inicializar a interface gráfica avançada, é necessário realizar um teste de habilidade.</p>
        <p>Por favor, utilize o <strong>Artefato D20</strong> localizado no canto inferior direito da sua tela.</p>
        <p>Você precisará de sorte para ver a verdadeira interface.</p>
    </div>

    <div id="destiny-dice-container" onClick="rollDestiny()">
        <div className="dice-tooltip">Rolar para Iniciar</div>
        <div
            className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-full shadow-2xl border-4 border-white/20">
            <i id="d20-icon" className="fas fa-dice-d20 text-4xl text-white"></i>
            <span id="d20-result" className="absolute text-white font-bold text-xl opacity-0 transition-opacity"></span>
        </div>
    </div>

    <div id="crit-overlay" className="hidden critical-overlay">
        <div className="flex flex-col items-center">
            <div className="crit-text">NATURAL LUCK!</div>
            <p className="text-white text-xl mt-4 font-mono">LOADING PERFECT INTERFACE...</p>
        </div>
        <canvas id="confetti-canvas" className="absolute inset-0 pointer-events-none"></canvas>
    </div>

    <main id="app-root" className="hidden w-full h-full relative">

        <div className="animated-bg"></div>

        <section id="page-3"
            className="page-section hidden-page h-full w-full flex flex-col items-center justify-center font-inter bg-transparent relative z-10">

            <div id="v3-hero"
                className="flex-1 flex flex-col justify-center items-center mb-24 animate-fadeIn transition-all duration-500">
                <h1
                    className="font-montserrat font-black text-main text-[clamp(3rem,10vw,8rem)] leading-[0.9] uppercase tracking-tighter mix-blend-overlay">
                    GUSTAVO</h1>
                <p className="font-inter text-xs sm:text-lg md:text-xl tracking-[2px] sm:tracking-[4px] text-white/90 mt-4 uppercase drop-shadow-md whitespace-nowrap">Full Stack Developer</p>
                <div className="mt-2 flex gap-2">
                    <span
                        className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-widest border border-white/20">Lv.
                        21</span>
                    <span
                        className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-widest border border-white/20">Cuiabá-MT</span>
                </div>
            </div>

            <div id="source-v3-dock" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]">
                <div
                    className="dock-container flex items-end gap-3 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">

                    <div onClick="openV3App('certificados')"
                        className="dock-item group relative w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex justify-center items-center text-white text-2xl border border-white/20 cursor-pointer shadow-lg">
                        <i className="fas fa-certificate"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Certificados</span>
                    </div>

                    <div onClick="openV3App('projetos')"
                        className="dock-item group relative w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex justify-center items-center text-white text-2xl border border-white/20 cursor-pointer shadow-lg">
                        <i className="fas fa-code"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Projetos</span>
                    </div>

                    <div onClick="openV3App('curriculo')"
                        className="dock-item group relative w-12 h-12 bg-white/10 rounded-xl flex justify-center items-center text-white/90 text-2xl border border-white/5 cursor-pointer shadow-lg">
                        <i className="far fa-file-pdf"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Currículo</span>
                    </div>

                    <div className="w-[1px] h-8 bg-white/20 mx-1 self-center"></div>

                    <div onClick="openV3App('sobre')"
                        className="dock-item group relative w-12 h-12 bg-white/10 rounded-xl flex justify-center items-center text-white/90 text-2xl border border-white/5 cursor-pointer shadow-lg">
                        <i className="far fa-user"></i>
                        <span
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Sobre
                            Mim</span>
                    </div>

                </div>
            </div>
        </section>

        <div id="source-v1-header" className="hidden"></div>
        <div id="source-v2-header" className="hidden"></div>

        <section id="page-chaos"
            className="page-section hidden-page h-full w-full overflow-y-auto flex flex-col p-8 gap-8 items-center justify-start">
        </section>

        <div id="nav-pill" className="hidden fixed top-8 right-8 left-auto bg-black/30 backdrop-blur-md px-6 py-3 
                rounded-full flex items-center gap-4 text-white shadow-xl z-[10000] 
                border border-white/10 pointer-events-auto">

            <button onClick="resetDice()" className="hover:text-cyan-400 text-xs mr-2 font-bold uppercase tracking-wider 
                    flex gap-2 items-center" title="Reroll">
                <i className="fas fa-dice"></i> Role Novamente
            </button>

            <span id="version-label" className="font-inter font-bold text-sm min-w-[120px] text-center">
                Chaos
            </span>
        </div>


    </main>

    
    

        </>
    );
}
