import { GoogleGenerativeAI } from "@google/generative-ai";
import { OAuth2Client } from "google-auth-library";

// 🔐 Google OAuth
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
};

// 🤖 Gemini setup (UPDATED)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGenerativeModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-1.0-pro", // ✅ NOW WORKS with latest SDK
  });
};

export { googleClient };