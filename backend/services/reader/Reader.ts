/**
 * Questo file include un "Facade" chiamato Reader.
 * Questo modello è responsabile della lettura del testo, e della generazione di tutte le statistiche richieste
 */

import { UploadType } from "@/services/reader/types";
import * as fs from "fs";

export class Reader {
  private path: string | undefined;
  private type: UploadType;
  private text: string | undefined;

  private readTextFromUrl = async (): Promise<Error | string> => {
    if (!this.path) return new Error("Path non valido");

    // Non serve la validazione, in quanto fallirà il fetch in caso non sia valido
    const request = await fetch(this.path);

    const text = await request.text();

    if (!text) {
      return new Error(
        "Non è stato possibile leggere alcun testo da questo link"
      );
    }

    this.text = text;

    return this.text;
  };

  public constructor({
    path,
    type,
    text,
  }: {
    path?: string;
    type: UploadType;
    text?: string;
  }) {
    this.path = path;
    this.type = type;
    this.text = text;
  }

  public readText = async (): Promise<Error | string> => {
    if (this.text) {
      return this.text;
    }

    console.info("Reading text from path: ", this.path)
    console.info("Reading text from type: ", this.type)

    switch (this.type) {
      case UploadType.LOCAL_FILE: {
        return this.text ?? new Error("Testo vuoto");
      }
      case UploadType.URL: {
        const error = this.readTextFromUrl();
        return this.text ?? error;
      }
      default:
        return new Error("Tipologia non supportata");
    }
  };

  public getWordsCount = () => {
    return this.text?.split(" ").length ?? -1;
  };

  public getLettersCount = () => {
    return this.text?.length ?? -1;
  };

  public getRepeatingWords = (threshold: number): Map<string, number> => {
    if (!this.text?.includes(" ")) return new Map();
    const words = this.text?.split(" ");

    const toReturn = new Map<string, number>();

    words.sort();

    let prevWord = words.pop();
    let count = 1;

    while (prevWord) {
      if (prevWord === words[words.length - 1]) {
        count++;
      } else {
        if (count >= threshold) {
          toReturn.set(prevWord, count);
        }
        count = 1;
      }

      prevWord = words.pop();
    }

    return toReturn;
  };

  public getSpacesCount = () => {
    return (this.text?.split(" ") ?? []).length - 1 ?? -1;
  };

  public getText = () => {
    return this.text;
  };
}
