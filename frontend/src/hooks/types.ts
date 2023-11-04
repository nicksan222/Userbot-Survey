export enum UploadType {
  LOCAL_FILE = "local_file",
  URL = "url",
}

export interface TextAnalysisResult {
  lettersCount: number;
  repeatingWords: Record<string, number>;
  spacesCount: number;
  text: string;
  wordsCount: number;
}
