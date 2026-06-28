import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [isRolling, setIsRolling] = useState(false);
    const [rollResult, setRollResult] = useState(null);
    const [showCritOverlay, setShowCritOverlay] = useState(false);
    const [showChaosMode, setShowChaosMode] = useState(false);
    const [hideUglyOverlay, setHideUglyOverlay] = useState(false);
    const [chaosVariant, setChaosVariant] = useState(null);

    const CHAOS_VARIANTS = [
        {
            className: 'chaos-terminal',
            icon: 'fa-terminal',
            title: 'KERNEL PANIC',
            subtitle: 'A interface tentou subir em modo produção e perdeu o save.',
            accent: 'text-emerald-300',
            border: 'border-emerald-400/50',
            button: 'border-emerald-300 text-emerald-300 hover:bg-emerald-300'
        },
        {
            className: 'chaos-breach',
            icon: 'fa-shield-virus',
            title: 'BREACH DETECTED',
            subtitle: 'Pacotes estranhos foram encontrados no corredor entre o dado e o dashboard.',
            accent: 'text-red-300',
            border: 'border-red-400/50',
            button: 'border-red-300 text-red-300 hover:bg-red-300'
        },
        {
            className: 'chaos-static',
            icon: 'fa-satellite-dish',
            title: 'SIGNAL LOST',
            subtitle: 'A transmissão chegou com ruído demais. O sistema está recompondo a frequência.',
            accent: 'text-cyan-300',
            border: 'border-cyan-300/50',
            button: 'border-cyan-300 text-cyan-300 hover:bg-cyan-300'
        },
        {
            className: 'chaos-arcane',
            icon: 'fa-dice-d20',
            title: 'ARCANE MISFIRE',
            subtitle: 'O D20 abriu uma versão instável demais da interface. Culpa dos modificadores.',
            accent: 'text-fuchsia-300',
            border: 'border-fuchsia-300/50',
            button: 'border-fuchsia-300 text-fuchsia-300 hover:bg-fuchsia-300'
        }
    ];

    const rollDestiny = () => {
        if (isRolling) return;
        setIsRolling(true);
        setRollResult(null);
        setShowChaosMode(false);
        setHideUglyOverlay(false);

        // Animação de números rolando enquanto o dado gira
        let animInterval = setInterval(() => {
            setRollResult(Math.floor(Math.random() * 20) + 1);
        }, 50);

        setTimeout(() => {
            clearInterval(animInterval);
            const finalRoll = Math.floor(Math.random() * 20) + 1;
            setRollResult(finalRoll);
            setIsRolling(false); // Para a animação do dado girando

            setTimeout(() => {
                if (finalRoll >= 15) {
                    triggerCriticalSuccess(finalRoll);
                } else {
                    triggerChaosMode(finalRoll);
                }
            }, 1000);
        }, 1000);
    };

    const triggerCriticalSuccess = (roll) => {
        setHideUglyOverlay(true);
        setShowCritOverlay(true);
        setShowChaosMode(false);

        sessionStorage.setItem('acessoPermitido', 'true');
        sessionStorage.setItem('lastRoll', roll.toString());

        setTimeout(() => {
            navigate('/dashboard');
        }, 2500);
    };

    const triggerChaosMode = (roll) => {
        setHideUglyOverlay(true);
        sessionStorage.setItem('lastRoll', roll.toString());
        
        const variant = CHAOS_VARIANTS[roll % CHAOS_VARIANTS.length];
        setChaosVariant(variant);
        setShowChaosMode(true);
    };

    const resetDice = () => {
        if (isRolling) return;
        rollDestiny();
    };

    return (
        <div className="w-full h-screen overflow-hidden relative">
            {!hideUglyOverlay && (
                <div id="ugly-overlay">
                    <h1>Gustavo Vezetiv - Portfólio</h1>
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
            )}

            {!showChaosMode && !showCritOverlay && (
                <div id="destiny-dice-container" onClick={rollDestiny}>
                    <div className="dice-tooltip">Rolar para Iniciar</div>
                    <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-full shadow-2xl border-4 border-white/20">
                        <i id="d20-icon" className={`fas fa-dice-d20 text-4xl text-white ${isRolling ? 'rolling' : ''}`} style={{ opacity: isRolling || rollResult ? 0.2 : 1, transform: isRolling ? '' : 'rotate(0deg) scale(1)' }}></i>
                        {rollResult && (
                            <span id="d20-result" className="absolute text-white font-bold text-2xl opacity-100 transition-opacity drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                {rollResult}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {showCritOverlay && (
                <div id="crit-overlay" className="critical-overlay" style={{ opacity: 1, display: 'flex' }}>
                    <div className="flex flex-col items-center">
                        <div className="crit-text">NATURAL LUCK!</div>
                        <p className="text-white text-xl mt-4 font-mono">LOADING PERFECT INTERFACE...</p>
                    </div>
                </div>
            )}

            {showChaosMode && chaosVariant && (
                <>
                    <div className="animated-bg"></div>
                    <section id="page-chaos" className={`page-section h-full w-full overflow-y-auto flex flex-col p-8 gap-8 items-center justify-start ${chaosVariant.className}`}>
                        <div className="chaos-scanlines"></div>
                        <div className={`chaos-window w-full max-w-3xl mx-auto bg-black/60 border ${chaosVariant.border} p-6 sm:p-8 rounded-lg text-center mt-20 relative overflow-hidden`}>
                            <div className="chaos-noise"></div>
                            <div className="relative z-10">
                                <div className={`mx-auto mb-5 w-16 h-16 rounded-2xl border ${chaosVariant.border} flex items-center justify-center ${chaosVariant.accent} text-3xl bg-white/5`}>
                                    <i className={`fas ${chaosVariant.icon}`}></i>
                                </div>
                                <p className={`font-mono text-xs uppercase tracking-[4px] ${chaosVariant.accent} mb-2`}>Roll {rollResult} / Access unstable</p>
                                <h3 className={`chaos-title ${chaosVariant.accent} font-black text-3xl sm:text-5xl mb-4`}>{chaosVariant.title}</h3>
                                <p className="text-white/75 font-mono mb-6 max-w-xl mx-auto">{chaosVariant.subtitle}</p>
                                <div className="chaos-code text-left font-mono text-[11px] sm:text-xs text-white/50 bg-black/40 border border-white/10 rounded-lg p-4 mb-6">
                                    <p>&gt; boot --interface perfect-form</p>
                                    <p>&gt; entropy_check: failed</p>
                                    <p>&gt; fallback_channel: {chaosVariant.className}</p>
                                    <p>&gt; reroll_required: true</p>
                                </div>
                                <button onClick={resetDice} disabled={isRolling} className={`px-6 py-2 border-2 ${chaosVariant.button} hover:text-black font-bold rounded transition-all duration-200 cursor-pointer ${isRolling ? '' : 'animate-pulse hover:animate-none'}`}>
                                    {isRolling ? 'Rolando...' : 'Tente rolar novamente!'}
                                </button>
                            </div>
                        </div>
                    </section>
                    <div id="nav-pill" className="fixed top-8 right-8 left-auto bg-black/30 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 text-white shadow-xl z-[10000] border border-white/10 pointer-events-auto">
                        <button onClick={resetDice} disabled={isRolling} className="hover:text-cyan-400 text-xs mr-2 font-bold uppercase tracking-wider flex gap-2 items-center" title="Reroll">
                            <i className="fas fa-dice"></i> {isRolling ? 'Rolando...' : 'Role Novamente'}
                        </button>
                        <span id="version-label" className="font-inter font-bold text-sm min-w-[120px] text-center">
                            Chaos (Roll: {rollResult})
                        </span>
                    </div>

                    <div id="destiny-dice-container" onClick={resetDice} style={{ opacity: 1, display: 'block' }}>
                        <div className="dice-tooltip">Rolar para Iniciar</div>
                        <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-full shadow-2xl border-4 border-white/20">
                            <i id="d20-icon" className={`fas fa-dice-d20 text-4xl text-white ${isRolling ? 'rolling' : ''}`} style={{ opacity: isRolling || rollResult ? 0.2 : 1, transform: isRolling ? '' : 'rotate(0deg) scale(1)' }}></i>
                            {rollResult && (
                                <span id="d20-result" className="absolute text-white font-bold text-2xl opacity-100 transition-opacity drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                    {rollResult}
                                </span>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
