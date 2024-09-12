import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const UPLOAD_PATH = path.join(__dirname, "..", "..", "tmp", "uploads");

export const appMiddleware = (app: Express): void => {
  app.use(express.json({ limit: "20mb" }));
  app.use(cors());
  app.use(express.urlencoded({ limit: "20mb", extended: true }));
  app.use(morgan("dev"));
  app.use("/img", express.static(UPLOAD_PATH));
};
