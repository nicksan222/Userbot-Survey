import { useEffect } from "react";
import { useReadLocalFile } from "../hooks/useLocalFile";
import ResultDisplayComponent from "./resultDisplay";

const ReadFileComponent = () => {
  const { error, handleFileChange, isLoading, results } = useReadLocalFile();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div>
      <div className="mx-0 md:mx-0 col-span-2">
        <div>
          <input
            type="file"
            placeholder="Seleziona un file locale"
            disabled={isLoading}
            onChange={(e) => handleFileChange(e)}
            className="px-4 py-2 w-full mb-4 border border-gray-300 rounded-md"
          />
        </div>

        {typeof results !== "undefined" && (
          <ResultDisplayComponent result={results} />
        )}
      </div>
    </div>
  );
};

export default ReadFileComponent;
