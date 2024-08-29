import { Router } from "express";
import { controller } from "@src/measures";

const router = Router();

router.post("/upload", controller.upload);

export { router };
