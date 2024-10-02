import base64 from "base-64";
import dotenv from "dotenv";
dotenv.config();

const apiUrl =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const consumerKey = process.env.DARAJA_API_CONSUMER_KEY;
const consumerSecret = process.env.DARAJA_API_CONSUMER_SECRET;

async function getAccessToken() {
  const auth = base64.encode(`${consumerKey}:${consumerSecret}`);
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

export default getAccessToken;
