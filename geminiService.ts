
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enrichMovieData = async (rawText: string, linkMap: Record<string, string>): Promise<Movie[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Você é um especialista em curadoria de cinema para o canal "YoriDPA".
    Recebi uma lista de mensagens do Telegram que contém filmes.
    Cada linha relevante começa com um ID_REF entre colchetes.
    
    SUA TAREFA:
    1. Identifique quais mensagens referenciam filmes ou séries.
    2. Limpe os títulos: Remova coisas como [DUBLADO], [4K], [720p], @yorifilmes, etc.
    3. Crie uma sinopse envolvente em Português do Brasil.
    4. Atribua um gênero, ano de lançamento, nota IMDB aproximada (0-10) e duração.
    5. Mantenha o ID_REF para vincular ao link correto.
    6. Tente encontrar o trailer oficial no YouTube (apenas o ID do vídeo).
    
    TEXTO DO GRUPO:
    ${rawText.substring(0, 30000)}`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          movies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                refId: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                genre: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                year: { type: Type.INTEGER },
                duration: { type: Type.STRING },
                trailerUrl: { type: Type.STRING }
              },
              required: ["refId", "title", "description", "genre", "year", "rating"]
            }
          }
        }
      }
    }
  });

  const text = response.text;
  if (!text) return [];

  try {
    const data = JSON.parse(text.trim());
    return (data.movies || []).map((m: any) => {
      const originalLink = linkMap[m.refId] || "";
      
      return {
        ...m,
        id: m.refId,
        telegramLink: originalLink,
        thumbnail: `https://images.weserv.nl/?url=https://source.unsplash.com/featured/?movie,poster,${encodeURIComponent(m.title)}&w=400&h=600`,
        backdrop: `https://images.weserv.nl/?url=https://source.unsplash.com/featured/?cinema,scenery,${encodeURIComponent(m.title)}&w=1280&h=720`,
        trailerUrl: m.trailerUrl?.includes('youtube.com') ? m.trailerUrl : `https://www.youtube.com/embed/${m.trailerUrl || ''}?listType=search&list=${encodeURIComponent(m.title + ' trailer oficial português')}`
      };
    });
  } catch (e) {
    console.error("Erro ao processar resposta do Gemini", e);
    return [];
  }
};
