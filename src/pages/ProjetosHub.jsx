import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjetosHub() {
    const projetos = [
        { name: 'Jokenpo', path: '/projetos/jokenpo', icon: 'fa-hand-rock', color: 'from-purple-500 to-indigo-600' },
        { name: 'UiPerfeita', path: '/projetos/uiperfeita', icon: 'fa-wand-magic-sparkles', color: 'from-pink-500 to-rose-600' },
        { name: 'Calculadora', path: '/projetos/calculadora', icon: 'fa-calculator', color: 'from-cyan-500 to-blue-600' },
        { name: 'Doom Fire', path: '/projetos/doom', icon: 'fa-fire', color: 'from-orange-500 to-red-600' },
        { name: 'UiMain', path: '/projetos/uimain', icon: 'fa-palette', color: 'from-green-500 to-emerald-600' },
    ];

    return (
        <div className="min-h-screen bg-[#0b1020] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </Link>
                    <h1 className="text-4xl font-bold font-montserrat">Meus Projetos</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projetos.map((p, i) => (
                        <Link key={i} to={p.path} className="group">
                            <div className={`h-48 rounded-2xl bg-gradient-to-br ${p.color} p-6 relative overflow-hidden transition-transform transform group-hover:-translate-y-2 shadow-lg hover:shadow-2xl`}>
                                <i className={`fas ${p.icon} absolute -bottom-4 -right-4 text-9xl text-white opacity-20 group-hover:scale-110 transition-transform`}></i>
                                <h2 className="text-2xl font-bold relative z-10">{p.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
