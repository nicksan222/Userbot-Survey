import { useState, useCallback, useEffect } from "react";
import { TextAnalysisResult, UploadType } from "./types";

export const useReadLocalFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState("");

  const [results, setResults] = useState<TextAnalysisResult | undefined>();

  const readFile = useCallback(() => {
    if (!file) {
      const errorMsg = "Nessun file selezionato";
      console.log(errorMsg);
      setError(errorMsg);
      return;
    }

    setIsLoading(true);
    setError("");

    console.log("Inizio la lettura del file");

    const reader = new FileReader();

    // Handle successful reading of the file
    reader.onload = (e) => {
      const content = e.target?.result;
      if (content) {
        setText(content.toString());
        console.log("Lettura del file completata");
      } else {
        const errorMsg = "Il contenuto del file è vuoto";
        console.error(errorMsg);
        setError(errorMsg);
      }
      setIsLoading(false);
    };

    // Handle file reading errors
    reader.onerror = (e) => {
      const errorMsg = `Errore nella lettura del file: ${reader.error?.message}`;
      console.error(errorMsg, e);
      setError(errorMsg);
      setIsLoading(false);
    };

    // Attempt to read the file as text
    try {
      reader.readAsText(file);
    } catch (e) {
      const errorMsg = "Errore nell'elaborazione del file";
      console.error(errorMsg, e);
      setError(errorMsg);
      setIsLoading(false);
    }
  }, [file]);

  // Effect hook to automatically read the file when 'file' state changes
  useEffect(() => {
    if (file) {
      readFile();
    }
  }, [file, readFile]);

  const fetchStatsForText = useCallback(async () => {
    if (text !== "") {
      fetch(import.meta.env.VITE_API_BASE_URL + "/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, type: UploadType.LOCAL_FILE }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setResults(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error);
        });
    }
  }, [text]);

  useEffect(() => {
    fetchStatsForText();
  }, [text, fetchStatsForText]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setFile(newFile);
    } else {
      const errorMsg = "Errore nella selezione del file";
      console.error(errorMsg);
      setError(errorMsg);
    }
  };

  return {
    isLoading,
    text,
    error,
    handleFileChange,
    results,
  };
};
