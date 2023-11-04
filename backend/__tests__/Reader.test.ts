/**
 * Test estesi per la classe Reader.
 */
import * as fs from "fs";
import { Reader } from "@/services/reader/Reader";
import { UploadType } from "@/services/reader/types";
import ReaderBuilder from "@/services/reader";

global.fetch = jest.fn();

describe("Reader", () => {
  const testLocalPath = "test.txt";
  const testText =
    "Questo è un testo di prova con alcune parole ripetute prova prova prova.";
  const testUrl = "http://example.com/test.txt";

  beforeEach(() => {
    jest.clearAllMocks();
  });


  // Test per la lettura da URL
  it("dovrebbe leggere il testo da un URL", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      text: () => Promise.resolve(testText),
    });
    const reader = new Reader({ path: testUrl, type: UploadType.URL });
    const result = await reader.readText();
    expect(fetch).toHaveBeenCalledWith(testUrl);
    expect(result).toEqual(testText);
  });

  it("dovrebbe restituire un errore quando non può leggere il testo da un URL", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      text: () => Promise.resolve(""),
    });
    const reader = new Reader({ path: testUrl, type: UploadType.URL });

    // E' di tipo errore? Controllo il tipo
    const result = await reader.readText();

    expect(result).toBeInstanceOf(Error);
  });

  // Test per il conteggio delle parole
  it("dovrebbe contare le parole correttamente", async () => {
    const reader = await ReaderBuilder({
      text: testText,
      type: UploadType.LOCAL_FILE,
    });

    expect(reader).toBeInstanceOf(Reader);

    expect((reader as Reader).getWordsCount()).toBe(13);
  });

  // Test per il conteggio delle lettere
  it("dovrebbe contare le lettere correttamente", async () => {
    const reader = await ReaderBuilder({
      text: testText,
      type: UploadType.LOCAL_FILE,
    });

    expect(reader).toBeInstanceOf(Reader);

    expect((reader as Reader).getLettersCount()).toBe(testText.length);
  });

  // Test per la rilevazione di parole ripetute
  it("dovrebbe rilevare le parole ripetute", async () => {
    const reader = await ReaderBuilder({
      text: testText,
      type: UploadType.LOCAL_FILE,
    });

    expect(reader).toBeInstanceOf(Reader);

    const expected = new Map<string, number>();

    expected.set("prova", 3);

    expect((reader as Reader).getRepeatingWords(2)).toEqual(expected);
  });

  it("dovrebbe rilevare gli spazi", async () => {
    const reader = await ReaderBuilder({
      text: testText,
      type: UploadType.LOCAL_FILE,
    });

    expect(reader).toBeInstanceOf(Reader);

    expect((reader as Reader).getSpacesCount()).toBe(12);
  })
});
