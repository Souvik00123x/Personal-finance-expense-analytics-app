import axios from "axios";

export async function convertCurrency(base = "INR", target = "USD") {
  const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
  return response.data?.rates?.[target] || null;
}
