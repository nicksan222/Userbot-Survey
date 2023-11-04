import { TextAnalysisResult } from "../hooks/types";

interface Props {
  result: TextAnalysisResult;
}

const ResultDisplayComponent = ({ result }: Props) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p className="text-lg font-semibold mb-2">Analisi del testo:</p>
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">
          Numero di caratteri:
        </span>
        <span className="ml-2 text-sm font-bold text-gray-900">
          {result.lettersCount}
        </span>
      </div>
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">
          Numero di parole:
        </span>
        <span className="ml-2 text-sm font-bold text-gray-900">
          {result.wordsCount}
        </span>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Parole ripetute almeno 10 volte:
        </p>
        <ul className="list-disc pl-5">
          {Object.entries(result.repeatingWords).map(([word, count], index) => (
            <li key={index} className="text-sm font-bold text-gray-900">
              {word} - <span className="font-normal">{count}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">
          Numero di spazi:
        </span>
        <span className="ml-2 text-sm font-bold text-gray-900">
          {result.spacesCount}
        </span>
      </div>
    </div>
  );
};

export default ResultDisplayComponent;
