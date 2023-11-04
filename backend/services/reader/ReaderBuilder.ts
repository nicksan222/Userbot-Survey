/**
 * Questo file include un "Facade" chiamato Reader.
 * Questo modello è responsabile della lettura del testo, e della generazione di tutte le statistiche richieste
 */

import { Reader } from "@/services/reader/Reader";
import { UploadType } from "@/services/reader/types";

export const ReaderBuilder = async ({
  path,
  type,
  text,
}: {
  type: string;
  path?: string;
  text?: string;
}): Promise<Error | Reader> => {
  console.info("Reading text from path: ", path);
  console.info("Reading text from type: ", type);
  console.info("Reading text from text: ", text);

  const reader = new Reader({
    path,
    text,
    type: type as UploadType,
  });

  const readResult = await reader.readText();
  console.log(readResult);

  if (typeof readResult !== "string") return readResult;

  // Sembra tutto ok, ritorno il reader!
  return reader;
};
