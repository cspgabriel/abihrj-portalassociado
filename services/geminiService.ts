import { GoogleGenAI } from "@google/genai";

// Lazy initialization to prevent top-level crashes if environment is not ready immediately
let aiInstance: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiInstance;
};

export const generateBenefitDetails = async (benefitTitle: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um assistente virtual do HoteisRio (Associação de Hotéis do Rio de Janeiro).
      
      Para o benefício "${benefitTitle}", forneça uma resposta curta e direta seguindo estritamente este formato:
      
      1. Um resumo de no máximo 2 frases explicando o benefício.
      2. Uma lista com bullet points (•) citando exatamente 3 vantagens principais para o hoteleiro.
      
      Seja conciso.`,
    });

    return response.text || "Não foi possível carregar os detalhes no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao consultar a inteligência artificial. Tente novamente mais tarde.";
  }
};

export const sendChatMessage = async (history: string[], message: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Histórico da conversa:
      ${history.join('\n')}
      
      Usuário: ${message}
      
      Instrução do Sistema: Você é o assistente virtual do Portal do Associado HoteisRio. Ajude os hoteleiros com dúvidas sobre benefícios, legislação local (básica) e turismo no Rio. Seja breve, polido e prestativo.`,
    });

    return response.text || "Desculpe, não entendi.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Erro de conexão com o assistente. Verifique sua internet.";
  }
};