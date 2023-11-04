import express, { Request, Response } from "express";
import UploadRouteHandler from "./routes/upload/handler";
import cors from "cors"; 

const app = express();

// If there is not PORT env variable, throw an error!
if (!process.env.PORT) {
  throw new Error("Check PORT env variable!");
}

app.use(cors());
app.use(express.json());

// A questo endpoint, sarà possibile inviare un file o un link ad esso (indirizzo web)
app.post("/upload", UploadRouteHandler);

app.listen(process.env.PORT, () => {
  console.log(`Web app listening on port ${process.env.PORT}`);
});
