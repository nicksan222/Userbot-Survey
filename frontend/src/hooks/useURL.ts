import { useState, useCallback } from "react";
import { TextAnalysisResult } from "./types";

export const useUploadByUrl = (path: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [results, setResults] = useState<TextAnalysisResult | undefined>();

  const startFetch = useCallback(() => {
    setIsLoading(true);
    setError("");

    if (path === "") {
      setIsLoading(false);
      return;
    }

    console.log("Inizio il caricamento del testo da URL");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: path, type: "url" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Dati ricevuti:", data);
        setResults(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Errore durante il caricamento:", err);
        setError("Errore durante il caricamento del testo");
        setIsLoading(false);
      });
  }, [path]);

  return {
    isLoading,
    error,
    startFetch,
    results,
  };
};
