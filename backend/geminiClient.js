import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { json } from "express";

dotenv.config();

const configuration = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelId = "gemini-2.0-flash";
const model = configuration.getGenerativeModel({ model: modelId });

export const generateResponse = async (resume) => {
  try {
    const prompt = process.env.prompt + resume;
    console.log(prompt);

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 700,
      },
    });

    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();

    const cleanText = responseText.replace(/```json|```/g, "").trim();

    return { response: JSON.parse(cleanText) };
  } catch (error) {
    console.error("Error while interacting with the model ", error);
    return { message: "Internat Server Error" };
  }
};
