import React, { useEffect } from "react";
import { useUploadByUrl } from "../hooks/useURL";
import ResultDisplayComponent from "./resultDisplay";

const ReadPathComponent = () => {
  const [path, setPath] = React.useState("");
  const { isLoading, error, startFetch, results } = useUploadByUrl(path);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="mx-0 md:mx-0 col-span-2">
      <div>
        <input
          type="text"
          placeholder="Inserisci il percorso del file in rete"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="px-4 py-2 w-full mb-4 border border-gray-300 rounded-md"
        />

        {typeof results !== "undefined" && (
          <ResultDisplayComponent result={results} />
        )}
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
        onClick={() => !isLoading && startFetch()}
      >
        {isLoading ? "Caricamento..." : "Ottieni le statistiche"}
      </button>
    </div>
  );
};

export default ReadPathComponent;
