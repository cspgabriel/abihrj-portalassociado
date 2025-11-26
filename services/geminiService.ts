import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client only if the key exists to avoid immediate crash, 
// though we will handle the missing key in the logic.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateBenefitDetails = async (benefitTitle: string): Promise<string> => {
  if (!ai) return "Erro: Chave de API não configurada.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um assistente virtual do HoteisRio (Associação de Hotéis do Rio de Janeiro).
      
      Escreva uma explicação detalhada e profissional (máximo 3 parágrafos) sobre como o benefício "${benefitTitle}" ajuda um hoteleiro no Rio de Janeiro.
      
      Inclua:
      1. O valor agregado.
      2. Um exemplo prático de uso.
      3. Um tom acolhedor e corporativo.`,
    });

    return response.text || "Não foi possível carregar os detalhes no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao consultar a inteligência artificial. Tente novamente mais tarde.";
  }
};

export const sendChatMessage = async (history: string[], message: string): Promise<string> => {
  if (!ai) return "Erro: Chave de API não configurada.";

  try {
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
    return "Erro de conexão com o assistente.";
  }
};