import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, MousePointerClick, AlertTriangle, Send, Lock, FileText, CheckSquare, X, Mail, MapPin, Phone } from 'lucide-react';

// --- UTIL: Geração da Lista Caótica (Para o Nome) ---
const generateChaoticList = () => {
  // O alfabeto latino + números + símbolos + acentuação pt-BR + Cirílico + Grego + Hiragana + Símbolos Matemáticos + Emojis do caos
  const rawString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/`~\"'\\áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇαβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん∑∫≈≠±∞µπΩ✓✗🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐒🐔🐧🐦🐤🐣👽👻💀💩🤡👾🤖🎃";
  
  // Usamos Array.from() no lugar de .split('') para garantir que emojis e caracteres unicode complexos não quebrem
  const chars = Array.from(rawString);
  
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars;
};

const chaoticArray = generateChaoticList();
const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789_-.";
const domains = ["@gmail.com", "@hotmail.com", "@yahoo.com.br", "@bol.com.br", "@zipmail.com", "@uol.com.br", "@aevalis.ifmt.edu.br"];

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  
  const [savedData, setSavedData] = useState({
    name: '',
    birthDate: null,
    phone: null,
    password: '',
    email: '',
    cep: '',
    isRobot: false,
    termsAccepted: false,
  });

  // ==========================================
  // MODAIS (TODOS AGORA TÊM TEXTO PRETO FORÇADO)
  // ==========================================

  // 1. NOME: Lista Caótica
  const NameModal = ({ close }) => {
    const [tempName, setTempName] = useState(savedData.name || '');
    
    return (
      <div className="p-6 text-black">
        <h2 className="text-2xl font-black text-purple-700 mb-2 flex items-center gap-2"><MousePointerClick/> Ache as Letras</h2>
        <p className="text-sm text-gray-700 mb-4 font-medium">Clique nas letras espalhadas. A ordem é um mistério.</p>
        
        <div className="text-3xl font-mono bg-gray-100 p-4 rounded text-center mb-6 h-16 flex items-center justify-center border-2 border-purple-300 shadow-inner">
          {tempName}
          <span className="animate-pulse">|</span>
        </div>

        <div className="h-64 overflow-y-auto bg-gray-100 p-2 border border-gray-300 rounded grid grid-cols-8 gap-2 mb-6">
          {chaoticArray.map((char, idx) => (
            <button
              key={idx}
              onClick={() => setTempName(prev => prev + char)}
              className="bg-white border border-gray-400 hover:bg-purple-200 p-2 rounded text-xl font-mono shadow-sm active:scale-95 text-black font-bold"
            >
              {char}
            </button>
          ))}
          <button onClick={() => setTempName(prev => prev + ' ')} className="col-span-8 bg-gray-300 border border-gray-400 p-2 font-bold text-xs text-black">
            [ESPAÇO]
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setTempName('')} className="bg-red-200 text-red-800 border border-red-300 p-3 rounded font-bold">Limpar</button>
          <button onClick={() => { setSavedData(prev => ({...prev, name: tempName})); close(); }} className="flex-1 bg-purple-700 text-white p-3 rounded font-bold hover:bg-purple-800">
            Salvar Nome
          </button>
        </div>
      </div>
    );
  };

  // 2. DATA: Roda do Tempo (Trouxemos de volta!)
  const BirthDateModal = ({ close }) => {
    const [birthDate, setBirthDate] = useState(savedData.birthDate || new Date(1900, 0, 1));
    const wheelRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [lastAngle, setLastAngle] = useState(0);
    const [rotation, setRotation] = useState(0);

    const startSpin = (e) => {
      setIsSpinning(true);
      const rect = wheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clientX = e.clientX || e.touches?.[0].clientX;
      const clientY = e.clientY || e.touches?.[0].clientY;
      setLastAngle(Math.atan2(clientY - centerY, clientX - centerX));
    };

    const doSpin = (e) => {
      if (!isSpinning) return;
      const rect = wheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clientX = e.clientX || e.touches?.[0].clientX;
      const clientY = e.clientY || e.touches?.[0].clientY;
      const angle = Math.atan2(clientY - centerY, clientX - centerX);
      let delta = angle - lastAngle;

      if (delta > Math.PI) delta -= 2 * Math.PI;
      if (delta < -Math.PI) delta += 2 * Math.PI;

      if (Math.abs(delta) > 0.02) {
        const daysToAdd = Math.round(delta * 60); 
        setBirthDate((prev) => {
          const newDate = new Date(prev);
          newDate.setDate(newDate.getDate() + daysToAdd);
          if (newDate.getFullYear() < 1900) return new Date(1900, 0, 1);
          if (newDate > new Date()) return new Date();
          return newDate;
        });
        setRotation((prev) => prev + (delta * 180) / Math.PI);
        setLastAngle(angle);
      }
    };

    const stopSpin = () => setIsSpinning(false);

    return (
      <div className="p-6 text-black select-none" onMouseMove={doSpin} onMouseUp={stopSpin} onMouseLeave={stopSpin} onTouchMove={doSpin} onTouchEnd={stopSpin}>
        <h2 className="text-2xl font-black text-orange-700 mb-2 flex items-center gap-2"><RotateCw/> Roda do Tempo</h2>
        <p className="text-sm text-gray-700 mb-4 font-medium">Gire para avançar. 1 volta = ~1 ano. Começa em 1900.</p>
        
        <div className="bg-orange-100 p-6 rounded-xl border-2 border-orange-300 flex flex-col items-center">
          <div className="text-3xl font-black text-orange-800 mb-6 font-mono bg-white px-4 py-2 rounded border border-orange-200">
            {birthDate.toLocaleDateString('pt-BR')}
          </div>
          
          <div 
            ref={wheelRef} onMouseDown={startSpin} onTouchStart={startSpin}
            className="w-48 h-48 rounded-full border-8 border-orange-500 bg-white shadow-xl cursor-grab active:cursor-grabbing relative flex items-center justify-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="absolute w-2 h-16 bg-orange-600 top-0 rounded-b-full"></div>
            <div className="w-12 h-12 bg-orange-200 rounded-full border-4 border-orange-400 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-700 rounded-full"></div>
            </div>
          </div>
        </div>

        <button onClick={() => { setSavedData(prev => ({...prev, birthDate})); close(); }} className="mt-4 w-full bg-orange-600 text-white p-3 rounded font-bold hover:bg-orange-700">
          Salvar Data
        </button>
      </div>
    );
  };

  // 3. TELEFONE: Barra de Equilíbrio (Trouxemos de volta!)
  const PhoneModal = ({ close }) => {
    const [phoneVal, setPhoneVal] = useState(savedData.phone || 11900000000);
    const [isHolding, setIsHolding] = useState(false);

    useEffect(() => {
      let interval;
      if (!isHolding) {
        interval = setInterval(() => {
          setPhoneVal(prev => Math.max(10000000000, Math.min(99999999999, prev - (Math.floor(Math.random() * 800000) - 200000))));
        }, 150);
      }
      return () => clearInterval(interval);
    }, [isHolding]);

    return (
      <div className="p-6 text-black">
        <h2 className="text-2xl font-black text-teal-700 mb-2 flex items-center gap-2"><Phone/> Equilibre o Número</h2>
        <p className="text-sm text-gray-700 mb-4 font-medium">Não solte o slider ou seu número vai despencar!</p>
        
        <div className="bg-teal-50 p-6 rounded-xl border-2 border-teal-300">
          <div className="text-3xl font-black text-center text-teal-800 mb-6 font-mono bg-white py-2 rounded">
            {phoneVal.toString().replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
          </div>
          <input 
            type="range" min="10000000000" max="99999999999" value={phoneVal}
            onMouseDown={() => setIsHolding(true)} onTouchStart={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)} onTouchEnd={() => setIsHolding(false)}
            onChange={(e) => setPhoneVal(parseInt(e.target.value))}
            className="w-full accent-teal-600 h-4 bg-teal-200 rounded-lg cursor-pointer"
          />
        </div>

        <button onClick={() => { setSavedData(prev => ({...prev, phone: phoneVal})); close(); }} className="mt-4 w-full bg-teal-600 text-white p-3 rounded font-bold hover:bg-teal-700">
          Tentar Salvar
        </button>
      </div>
    );
  };

  // 4. EMAIL: Montagem Manual
  const EmailModal = ({ close }) => {
    const [prefix, setPrefix] = useState(savedData.email ? savedData.email.split('@')[0] : '');
    const [letterIndex, setLetterIndex] = useState(0);
    const [domainIndex, setDomainIndex] = useState(0);

    return (
      <div className="p-6 text-black">
        <h2 className="text-2xl font-black text-indigo-700 mb-2 flex items-center gap-2"><Mail/> Forje seu Email</h2>
        <p className="text-sm text-gray-700 mb-4 font-medium">Teclados são para os fracos. Construa com os sliders.</p>

        <div className="text-2xl font-mono bg-gray-100 p-4 rounded text-center mb-6 border-2 border-indigo-300 flex justify-center items-center overflow-x-auto text-black">
          {prefix || '_'}<span className="text-indigo-600 font-bold">{domains[domainIndex]}</span>
        </div>

        <div className="space-y-4 bg-indigo-50 p-4 rounded border border-indigo-200 mb-4">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase">1. Letra Atual: <span className="text-xl text-black">{alphabet[letterIndex]}</span></label>
            <input 
              type="range" min="0" max={alphabet.length - 1} value={letterIndex}
              onChange={(e) => setLetterIndex(parseInt(e.target.value))}
              className="w-full accent-indigo-600 mt-2"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setPrefix(prev => prev + alphabet[letterIndex])} className="flex-1 bg-indigo-200 text-indigo-900 py-2 rounded font-bold border border-indigo-300">Adicionar Letra</button>
              <button onClick={() => setPrefix('')} className="bg-red-200 text-red-900 px-4 py-2 rounded font-bold border border-red-300">Apagar Tudo</button>
            </div>
          </div>
          <hr className="border-indigo-200"/>
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase">2. Selecione o Domínio</label>
            <input 
              type="range" min="0" max={domains.length - 1} value={domainIndex}
              onChange={(e) => setDomainIndex(parseInt(e.target.value))}
              className="w-full accent-indigo-600 mt-2"
            />
          </div>
        </div>

        <button onClick={() => { setSavedData(prev => ({...prev, email: prefix + domains[domainIndex]})); close(); }} className="w-full bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-700">
          Salvar Email
        </button>
      </div>
    );
  };

  // 5. CEP: Mesa de Som (8 Sliders)
  const CepModal = ({ close }) => {
    // Inicializa com 8 zeros ou o CEP salvo
    const initialCep = savedData.cep ? savedData.cep.split('').map(Number) : [0,0,0,0,0,0,0,0];
    const [digits, setDigits] = useState(initialCep);

    const updateDigit = (index, value) => {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
    };

    return (
      <div className="p-6 text-black">
        <h2 className="text-2xl font-black text-pink-700 mb-2 flex items-center gap-2"><MapPin/> Sintonize seu CEP</h2>
        <p className="text-sm text-gray-700 mb-4 font-medium">Ajuste os graves e agudos para encontrar seu endereço.</p>

        <div className="text-4xl font-black tracking-widest text-center text-pink-800 mb-6 font-mono bg-pink-100 p-4 rounded border-2 border-pink-300">
          {digits.slice(0,5).join('')}-{digits.slice(5).join('')}
        </div>

        <div className="flex justify-between bg-gray-100 p-4 rounded border border-gray-300 mb-6 h-48">
          {digits.map((digit, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="mb-2 font-bold text-gray-500">{idx === 5 ? '-' : ''}</span>
              <input 
                type="range" min="0" max="9" value={digit}
                onChange={(e) => updateDigit(idx, parseInt(e.target.value))}
                className="w-4 h-32 accent-pink-600 appearance-none bg-gray-300 rounded outline-none"
                style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
              />
              <span className="mt-2 font-bold text-black">{digit}</span>
            </div>
          ))}
        </div>

        <button onClick={() => { setSavedData(prev => ({...prev, cep: digits.join('')})); close(); }} className="w-full bg-pink-600 text-white p-3 rounded font-bold hover:bg-pink-700">
          Salvar Localização
        </button>
      </div>
    );
  };

  // 6. SENHA
  const PasswordModal = ({ close }) => {
    const [tempPass, setTempPass] = useState(savedData.password || '');
    const rules = [
      { id: 1, text: "No mínimo 6 caracteres.", test: p => p.length >= 6 },
      { id: 2, text: "A letra 'q' minúscula deve aparecer EXATAMENTE 2 vezes.", test: p => (p.match(/q/g) || []).length === 2 },
      { id: 3, text: "Deve conter um emoji de animal (ex: 🐶, 🐱, 🐸).", test: p => /[\u{1F400}-\u{1F43F}]/u.test(p) },
      { id: 4, text: "A soma de todos os números na senha deve ser exatamente 13.", test: p => {
        const nums = p.match(/\d/g);
        if(!nums) return false;
        return nums.reduce((acc, curr) => acc + parseInt(curr), 0) === 13;
      }},
      { id: 5, text: "Deve honrar o RPG: conter a palavra 'Tank'.", test: p => p.includes('Tank') }
    ];

    const currentRuleIndex = rules.findIndex(r => !r.test(tempPass));
    const isSuccess = currentRuleIndex === -1;
    const currentRule = isSuccess ? null : rules[currentRuleIndex];

    return (
      <div className="p-6 text-black">
        <h2 className="text-2xl font-black text-blue-700 mb-2 flex items-center gap-2"><Lock/> Crie sua Senha</h2>
        <input 
          type="text" value={tempPass} onChange={(e) => setTempPass(e.target.value)}
          placeholder="Digite sua senha..."
          className="w-full border-2 border-blue-400 p-4 rounded text-xl font-mono mb-4 focus:outline-none focus:ring-4 focus:ring-blue-200 text-black bg-white"
        />
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 min-h-[80px]">
          {isSuccess ? (
            <span className="text-green-700 font-bold flex items-center gap-2">✅ Senha perfeita! Ninguém vai adivinhar.</span>
          ) : (
            <div>
              <span className="text-xs font-bold text-gray-600 uppercase">Critério {currentRule.id} de {rules.length}:</span>
              <p className="text-red-700 font-black mt-1">❌ {currentRule.text}</p>
            </div>
          )}
        </div>

        <button disabled={!isSuccess} onClick={() => { setSavedData(prev => ({...prev, password: tempPass})); close(); }} className={`w-full p-4 rounded font-bold text-white transition-all ${isSuccess ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'}`}>
          {isSuccess ? 'Salvar Senha' : 'Cumpra o critério'}
        </button>
      </div>
    );
  };

  // 7. CAPTCHA
  const CaptchaModal = ({ close }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [status, setStatus] = useState("Desenhe uma casa e escreva 'Eu amo PHP'."); // Mudança cruel

    const startDraw = (e) => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX || e.touches?.[0].clientX - canvasRef.current.getBoundingClientRect().left, 
                 e.nativeEvent.offsetY || e.touches?.[0].clientY - canvasRef.current.getBoundingClientRect().top);
      setIsDrawing(true);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineTo(e.nativeEvent.offsetX || e.touches?.[0].clientX - canvasRef.current.getBoundingClientRect().left, 
                 e.nativeEvent.offsetY || e.touches?.[0].clientY - canvasRef.current.getBoundingClientRect().top);
      ctx.stroke();
    };

    const stopDraw = () => setIsDrawing(false);

    const verify = () => {
      setStatus("Enviando desenho para o CEO avaliar...");
      setTimeout(() => { setSavedData(prev => ({...prev, isRobot: true})); close(); }, 1500);
    };

    return (
      <div className="p-6 text-black">
        <h2 className="text-2xl font-black text-green-700 mb-2 flex items-center gap-2"><CheckSquare/> Verificação Humana</h2>
        <p className="text-sm font-bold text-gray-700 mb-4 bg-green-100 p-2 rounded">{status}</p>
        
        <canvas 
          ref={canvasRef} width={300} height={200}
          className="border-2 border-solid border-gray-800 bg-yellow-50 mb-4 cursor-crosshair rounded touch-none mx-auto block shadow-inner"
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
        />

        <div className="flex gap-2">
          <button onClick={() => { const ctx = canvasRef.current.getContext('2d'); ctx.clearRect(0,0,300,200); }} className="bg-gray-300 text-black border border-gray-400 p-3 rounded font-bold hover:bg-gray-400">
            Apagar Lousa
          </button>
          <button onClick={verify} className="flex-1 bg-green-700 text-white p-3 rounded font-bold hover:bg-green-800">
            Verificar Obra de Arte
          </button>
        </div>
      </div>
    );
  };

  // 8. TERMOS: Texto Fictício Engraçado
  const TermsModal = ({ close }) => {
    const [timeLeft, setTimeLeft] = useState(15); 

    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);

    return (
      <div className="p-6 text-black">
        <h2 className="text-2xl font-black text-red-700 mb-2 flex items-center gap-2"><FileText/> Contrato de Servidão</h2>
        
        <div className="bg-yellow-50 p-4 h-56 overflow-y-scroll text-sm text-justify mb-4 border-2 border-yellow-400 rounded relative select-none font-serif text-gray-900 leading-relaxed shadow-inner">
          <h3 className="font-bold text-center mb-2">TERMOS UNIVERSAIS DA COORPORAÇÃO UIPER S.A.</h3>
          <p className="mb-2"><strong>Cláusula 1:</strong> Ao clicar em "Aceito", O USUÁRIO cede de forma irrevogável e gratuita sua alma primogênita, bem como os direitos de uso da sua primeira xícara de café de segunda-feira para a nossa equipe de DevOps.</p>
          <p className="mb-2"><strong>Cláusula 2:</strong> Fica expressamente proibido rolar dados D20 viciados. O USUÁRIO concorda que Thargon, o Goliath Tank, tem desvantagem permanente em testes de Furtividade, a menos que ele se pinte de roxo ("porque orcs roxos são invisíveis"). Em caso de violação, o Goliath sofrerá 1d4 de dano psíquico real.</p>
          <p className="mb-2"><strong>Cláusula 3:</strong> O USUÁRIO reconhece judicialmente que o CSS nunca centraliza divs na primeira tentativa e que culpar a linguagem Python pelos erros de infraestrutura é crime inafiançável.</p>
          <p className="mb-2"><strong>Cláusula 4:</strong> Em caso de litígio ou queda do banco PostgreSQL, a disputa será resolvida numa partida de Uno. Regras de "empilhar +4" estão ativadas. Se o USUÁRIO reclamar no Twitter (atual X), daremos um `DROP TABLE users;` imediato.</p>
          <p><strong>Cláusula 5:</strong> O sistema ÆVALIS é supremo. Amém.</p>
        </div>

        {timeLeft > 0 ? (
          <div className="bg-red-100 text-red-800 border-2 border-red-300 p-4 rounded text-center font-bold animate-pulse">
            Analisando sua leitura (finge que sim)... Aguarde: {timeLeft}s
          </div>
        ) : (
          <button 
            onClick={() => { setSavedData(prev => ({...prev, termsAccepted: true})); close(); }}
            className="w-full bg-red-700 hover:bg-red-800 text-white p-4 rounded font-bold shadow-lg transition-transform hover:-translate-y-1"
          >
            EU LI, ASSINO E VENDO MINHA ALMA
          </button>
        )}
      </div>
    );
  };

  // ==========================================
  // MOTOR DO MODAL (Com injeção de cor fixa)
  // ==========================================
  const ModalWrapper = ({ children, modalName }) => {
    const handleBackdropClick = () => {
      if (modalName === 'terms') alert("Punição! O relógio dos Termos foi zerado.");
      setActiveModal(null);
    };

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onMouseDown={handleBackdropClick}>
        {/* Aqui garantimos text-black para evitar vazamento do dark mode! */}
        <div className="bg-white text-black rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md overflow-hidden relative border-4 border-gray-200" onMouseDown={(e) => e.stopPropagation()}>
          <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 p-1 bg-gray-100 rounded-full">
            <X size={24} />
          </button>
          {children}
        </div>
      </div>
    );
  };

  // ==========================================
  // DASHBOARD PRINCIPAL (DARK MODE RAIZ)
  // ==========================================
  const Card = ({ title, icon: Icon, stateKey, displayVal, color, onClick }) => {
    const isDone = !!savedData[stateKey];
    return (
      <div onClick={onClick} className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:-translate-y-1 ${isDone ? `border-${color}-500 bg-${color}-900/20` : 'border-gray-600 bg-gray-700 hover:border-gray-400'}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold flex items-center gap-2 text-gray-100"><Icon size={18} className={`text-${color}-400`}/> {title}</span>
          {isDone && <span className={`text-${color}-400 text-xs font-bold bg-${color}-900/50 px-2 py-1 rounded border border-${color}-500`}>PRONTO</span>}
        </div>
        <p className={`text-sm font-mono truncate ${isDone ? 'text-gray-200' : 'text-gray-500 italic'}`}>
          {isDone ? displayVal : 'Pendente...'}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 p-4 flex flex-col items-center justify-center selection:bg-purple-500 selection:text-white">
      
      <div className="max-w-4xl w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 mb-2 drop-shadow-lg">
            UIPer
          </h1>
          <p className="text-gray-400 font-mono text-sm">v3.0 - The Complete Chaos Edition</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card title="Nome" icon={MousePointerClick} stateKey="name" displayVal={savedData.name} color="purple" onClick={() => setActiveModal('name')} />
          <Card title="Nascimento" icon={RotateCw} stateKey="birthDate" displayVal={savedData.birthDate?.toLocaleDateString('pt-BR')} color="orange" onClick={() => setActiveModal('birthDate')} />
          <Card title="Telefone" icon={Phone} stateKey="phone" displayVal={savedData.phone} color="teal" onClick={() => setActiveModal('phone')} />
          <Card title="Email" icon={Mail} stateKey="email" displayVal={savedData.email} color="indigo" onClick={() => setActiveModal('email')} />
          <Card title="CEP" icon={MapPin} stateKey="cep" displayVal={savedData.cep} color="pink" onClick={() => setActiveModal('cep')} />
          <Card title="Senha" icon={Lock} stateKey="password" displayVal="********" color="blue" onClick={() => setActiveModal('password')} />
          <Card title="Humanidade" icon={CheckSquare} stateKey="isRobot" displayVal="Aprovado" color="green" onClick={() => setActiveModal('captcha')} />
          <Card title="Contrato" icon={FileText} stateKey="termsAccepted" displayVal="Alma Vendida" color="red" onClick={() => setActiveModal('terms')} />
        </div>

        <div className="mt-8 flex justify-center border-t border-gray-700 pt-8">
          <button 
            onClick={() => alert("Acha mesmo que eu faria um backend para isso? Parabéns, você sobreviveu.")}
            className={`px-12 py-4 rounded-xl font-black tracking-widest flex items-center gap-3 transition-all ${
              Object.values(savedData).every(v => v !== '' && v !== null && v !== false)
              ? 'bg-gradient-to-r from-green-500 to-emerald-700 text-white shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 hover:from-green-400 hover:to-emerald-600' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
            }`}
          >
            CADASTRAR-ME <Send size={20} />
          </button>
        </div>
      </div>

      {activeModal === 'name' && <ModalWrapper modalName="name"><NameModal close={() => setActiveModal(null)} /></ModalWrapper>}
      {activeModal === 'birthDate' && <ModalWrapper modalName="birthDate"><BirthDateModal close={() => setActiveModal(null)} /></ModalWrapper>}
      {activeModal === 'phone' && <ModalWrapper modalName="phone"><PhoneModal close={() => setActiveModal(null)} /></ModalWrapper>}
      {activeModal === 'email' && <ModalWrapper modalName="email"><EmailModal close={() => setActiveModal(null)} /></ModalWrapper>}
      {activeModal === 'cep' && <ModalWrapper modalName="cep"><CepModal close={() => setActiveModal(null)} /></ModalWrapper>}
      {activeModal === 'password' && <ModalWrapper modalName="password"><PasswordModal close={() => setActiveModal(null)} /></ModalWrapper>}
      {activeModal === 'captcha' && <ModalWrapper modalName="captcha"><CaptchaModal close={() => setActiveModal(null)} /></ModalWrapper>}
      {activeModal === 'terms' && <ModalWrapper modalName="terms"><TermsModal close={() => setActiveModal(null)} /></ModalWrapper>}
    </div>
  );
}