import { useState } from "react";
import { convertCurrency } from "../services/api";

function useCurrency() {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRate = async (base = "INR", target = "USD") => {
    setLoading(true);
    setError("");

    try {
      const value = await convertCurrency(base, target);
      setRate(value);
      return value;
    } catch (err) {
      setError("Unable to fetch exchange rate right now.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { rate, loading, error, getRate };
}

export default useCurrency;
