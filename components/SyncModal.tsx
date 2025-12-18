
import React, { useState, useRef, useEffect } from 'react';
import { Movie } from '../types';
import { enrichMovieData } from '../geminiService';

interface SyncModalProps {
  onClose: () => void;
  onSync: (movies: Movie[]) => void;
}

const SyncModal: React.FC<SyncModalProps> = ({ onClose, onSync }) => {
  const [inputText, setInputText] = useState('');
  const [groupHandle, setGroupHandle] = useState('yorifilmes');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'paste' | 'guide'>('paste');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingMessages = [
    "Abrindo arquivo do Telegram...",
    "Limpando o lixo do JSON...",
    "Gemini IA catalogando os filmes...",
    "Buscando artes de cinema...",
    "Finalizando sua Netflix pessoal..."
  ];

  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleProcess = async (textToProcess: string, linkMap: Record<string, string> = {}) => {
    const text = textToProcess || inputText;
    if (!text.trim()) {
      setError("Por favor, cole os textos ou arraste o arquivo result.json.");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    try {
      // Enviando para o Gemini processar
      const result = await enrichMovieData(text, linkMap);
      if (result && result.length > 0) {
        onSync(result);
        onClose();
      } else {
        setError("A IA não conseguiu identificar filmes válidos no texto fornecido.");
      }
    } catch (err) {
      setError("Houve uma falha na comunicação com a IA. Tente novamente.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const processFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      try {
        const json = JSON.parse(content);
        let finalHandle = groupHandle.replace('@', '').trim();
        
        // Tenta achar o ID do chat ou nome do chat no JSON
        let chatId = String(json.id || '');
        const cleanChatId = chatId.replace('-100', '').replace('-', '');

        const linkMap: Record<string, string> = {};
        
        // Processa as últimas 500 mensagens para não travar
        const rawMessages = (json.messages || []).filter((m: any) => m.type === 'message');
        
        const processedTexts = rawMessages
          .slice(-500)
          .map((m: any, index: number) => {
            // Pega o texto da mensagem (pode ser string ou array de objetos)
            let text = "";
            if (Array.isArray(m.text)) {
              text = m.text.map((t: any) => typeof t === 'string' ? t : t.text).join('');
            } else {
              text = m.text || "";
            }

            // Se tiver arquivo anexado, adiciona ao texto para a IA saber que é um filme
            const fileName = m.file ? ` [Arquivo: ${m.file}]` : "";
            const refId = `ID_${m.id}`;
            
            // Cria o link correto
            if (finalHandle) {
              linkMap[refId] = `https://t.me/${finalHandle}/${m.id}`;
            } else {
              linkMap[refId] = `https://t.me/c/${cleanChatId}/${m.id}`;
            }

            return `[${refId}] ${text}${fileName}`;
          })
          .filter((t: string) => t.length > 10) // Ignora mensagens vazias ou curtas demais
          .join('\n');

        if (processedTexts) {
          handleProcess(processedTexts, linkMap);
        } else {
          setError("O arquivo JSON foi lido, mas não encontramos mensagens de texto ou arquivos.");
        }
      } catch (err) {
        // Se não for JSON, tenta processar como texto puro
        handleProcess(content.substring(0, 30000));
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md" onClick={onClose}>
      <div 
        className="bg-zinc-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-10 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-4xl font-black tracking-tighter text-white">YoriFlix Sync</h3>
              <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Tecnologia Gemini + Telegram</p>
            </div>
            <button onClick={onClose} className="bg-zinc-800 hover:bg-red-600 p-2 rounded-full transition-all text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div className="p-10 pt-4 overflow-y-auto">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-red-600 rounded-3xl animate-bounce flex items-center justify-center shadow-2xl shadow-red-600/40 mb-10">
                 <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h4 className="text-2xl font-black text-white text-center mb-2">{loadingMessages[loadingStep]}</h4>
              <p className="text-zinc-500 font-medium">Isso pode levar alguns segundos...</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-zinc-800/50 p-6 rounded-3xl border border-white/5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3 block">Username do Canal</label>
                <div className="flex items-center gap-3 bg-black/50 p-3 rounded-2xl border border-white/5">
                  <span className="text-zinc-600 font-black ml-2">@</span>
                  <input 
                    type="text" 
                    value={groupHandle}
                    onChange={(e) => setGroupHandle(e.target.value)}
                    placeholder="yorifilmes"
                    className="bg-transparent border-none outline-none text-white font-black w-full text-lg"
                  />
                </div>
              </div>

              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if(f) processFile(f); }}
                onClick={() => fileInputRef.current?.click()}
                className={`group h-56 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging ? 'border-red-600 bg-red-600/10 scale-95' : 'border-zinc-800 hover:border-zinc-500 hover:bg-white/5'}`}
              >
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:bg-red-600 group-hover:text-white transition-all mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <p className="font-black text-xl text-white">Solte o result.json aqui</p>
                <p className="text-zinc-500 text-sm mt-1">Sua biblioteca @{groupHandle} será criada.</p>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".json" />
              </div>

              {error && (
                <div className="bg-red-600/10 border border-red-600/50 p-5 rounded-2xl text-red-500 font-bold text-sm flex items-center gap-4 animate-in slide-in-from-top-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                   {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncModal;
