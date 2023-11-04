export const RequestError = (errorMessage?: string) => ({
  message: errorMessage,
});

interface SuccessfulResponseBody {
  wordCount: number;
  letterCount: number;
  spacesCount: number;
  repeatingWords: {
    word: string;
    count: number;
  };
}

export const SuccessfulResponse = (body: SuccessfulResponseBody) => ({
  status: 200,
  body,
});
