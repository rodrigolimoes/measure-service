import express, { Express } from "express";
import { appMiddleware } from "@src/middleware/app";
import { errorHandler } from "@src/middleware/errorHandler";

const app: Express = express();
const port = 80;

appMiddleware(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
