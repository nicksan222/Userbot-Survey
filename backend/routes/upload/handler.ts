/**
 * Route handler per l'upload.
 */

import { Request, Response } from "express";
import { RequestError } from "../../types/responses";
import ReaderBuilder from "../../services/reader";
import { Reader } from "@/services/reader/Reader";

interface ExpectedUploadRequestBody {
  path?: string;
  type: string;
  text?: string;
}

const uploadRequestBody: ExpectedUploadRequestBody = {
  path: "some/path",
  type: "file/type",
};

const UploadRouteHandler = async (
  req: Request<{}, {}, ExpectedUploadRequestBody>,
  res: Response
) => {
  // If no path is provided, return 404
  if (!req.body) {
    return res.status(404).send(RequestError("Il body è mancante"));
  }

  console.info("Reading req: ", req.body);

  // Il body è valido, creo con la Factory il Reader
  const reader = await ReaderBuilder({
    path: req.body.path,
    type: req.body.type,
    text: req.body.text,
  });

  if (reader instanceof Error) {
    return res
      .status(500)
      .send(
        RequestError(
          "Non è stato possibile creare un Reader con i parametri forniti"
        )
      );
  }

  // Leggo i parametri direttamente nella risposta
  try {
    return res.send({
      text: reader.getText(),
      wordsCount: reader.getWordsCount(),
      lettersCount: reader.getLettersCount(),
      spacesCount: reader.getSpacesCount(),
      repeatingWords: reader.getRepeatingWords(10),
    });
  } catch (e) {
    return res.status(500).send(RequestError());
  }
};

export default UploadRouteHandler;
