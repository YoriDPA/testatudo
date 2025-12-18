
import React, { useState } from 'react';

interface DeployModalProps {
  onClose: () => void;
}

const DeployModal: React.FC<DeployModalProps> = ({ onClose }) => {
  const [method, setMethod] = useState<'terminal' | 'cloud'>('cloud');

  const cloudSteps = [
    {
      title: "1. Criar o 'Pendrive Online' (GitHub)",
      link: "github.com/new",
      desc: "Acesse o site, crie sua conta e clique em 'New Repository'. Dê o nome de 'yoriflix' e marque como 'Public'."
    },
    {
      title: "2. Arrastar os Arquivos",
      desc: "No seu novo repositório, clique em 'uploading an existing file'. Selecione TODOS os arquivos da sua pasta (incluindo a pasta components) e arraste para o navegador. Clique em 'Commit changes' no final da página."
    },
    {
      title: "3. Ligar o Motor (Vercel)",
      link: "vercel.com/new",
      desc: "Crie conta na Vercel usando o botão 'Continue with GitHub'. Você verá o seu projeto 'yoriflix' na lista. Clique em 'Import'."
    },
    {
      title: "4. Configurar a Chave (Importante)",
      desc: "Antes de clicar em 'Deploy' na Vercel, abra a seção 'Environment Variables'. No campo 'Key' coloque API_KEY e no campo 'Value' cole a sua chave do Google Gemini. Agora sim, clique em DEPLOY."
    }
  ];

  const terminalSteps = [
    { title: "1. Instale o Firebase", command: "npm install -g firebase-tools" },
    { title: "2. Login", command: "firebase login" },
    { title: "3. Deploy", command: "firebase deploy" }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/98 p-4 backdrop-blur-3xl" onClick={onClose}>
      <div 
        className="bg-[#0a0a0a] w-full max-w-3xl rounded-[3rem] shadow-[0_0_100px_rgba(220,38,38,0.2)] border border-white/10 overflow-hidden flex flex-col max-h-[95vh] animate-in slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-10 pb-6 border-b border-white/5 bg-gradient-to-r from-red-950/20 to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-600 text-[10px] font-black px-2 py-0.5 rounded-full text-white uppercase animate-pulse">Recomendado</div>
                <h3 className="text-4xl font-black tracking-tighter text-white italic">Lançar via GitHub</h3>
              </div>
              <p className="text-zinc-500 text-sm font-medium">Use este método se você não pode instalar programas no PC.</p>
            </div>
            <button onClick={onClose} className="bg-zinc-900 hover:bg-red-600 w-12 h-12 rounded-full flex items-center justify-center transition-all text-white border border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Selector */}
          <div className="flex gap-2 mt-8 bg-black p-1.5 rounded-2xl border border-white/5">
            <button 
              onClick={() => setMethod('cloud')}
              className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${method === 'cloud' ? 'bg-white text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              Navegador (Sem Instalação)
            </button>
            <button 
              onClick={() => setMethod('terminal')}
              className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${method === 'terminal' ? 'bg-white text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              Terminal (Programador)
            </button>
          </div>
        </div>

        <div className="p-10 pt-8 overflow-y-auto no-scrollbar space-y-10 pb-20">
          {method === 'cloud' ? (
            <div className="space-y-10">
              <div className="bg-blue-600/10 border border-blue-600/20 p-6 rounded-3xl flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase mb-1">Passo a Passo Visual</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">Você vai usar o GitHub como um 'HD Virtual' e a Vercel para transformar esses arquivos em um site.</p>
                </div>
              </div>

              <div className="grid gap-10">
                {cloudSteps.map((step, idx) => (
                  <div key={idx} className="relative pl-16 group">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-zinc-900 group-hover:bg-red-600 rounded-2xl flex items-center justify-center font-black text-white border border-white/5 transition-all text-xl shadow-lg group-hover:shadow-red-600/20 group-hover:-translate-y-1">
                      {idx + 1}
                    </div>
                    <h5 className="text-white font-black text-xl mb-2 tracking-tight">{step.title}</h5>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                    {step.link && (
                      <button 
                        onClick={() => window.open(`https://${step.link}`)}
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                      >
                        Abrir {step.link}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-[2.5rem] mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </div>
                  <span className="text-red-500 font-black uppercase text-xs tracking-[0.2em]">Checklist de Arquivos</span>
                </div>
                <p className="text-zinc-400 text-xs mb-4">Certifique-se de arrastar estes arquivos para o GitHub:</p>
                <div className="flex flex-wrap gap-2">
                  {['index.html', 'index.tsx', 'App.tsx', 'types.ts', 'geminiService.ts', 'manifest.json', 'components/'].map(f => (
                    <span key={f} className="bg-black/50 px-3 py-1 rounded-md text-[10px] font-mono text-zinc-300 border border-white/5">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 py-10">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] mx-auto flex items-center justify-center border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                </div>
                <h4 className="text-2xl font-black text-white">Modo Terminal</h4>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto">Use este método apenas se você tem o Node.js e permissão de administrador no computador.</p>
              </div>

              <div className="space-y-4">
                {terminalSteps.map((step, idx) => (
                  <div key={idx} className="bg-black border border-white/5 p-6 rounded-3xl group">
                    <h5 className="text-zinc-500 font-black text-[10px] uppercase tracking-widest mb-3">{step.title}</h5>
                    <div className="flex items-center justify-between">
                      <code className="text-red-500 font-mono text-sm">{step.command}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(step.command)}
                        className="p-3 bg-zinc-900 hover:bg-white hover:text-black rounded-xl transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeployModal;
