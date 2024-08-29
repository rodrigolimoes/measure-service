import { Router } from "express";
import { controller } from "@src/measures";

const router = Router();

router.post("/upload", controller.upload);
router.get("/:customer_code/list", controller.find);
router.patch("/confirm", controller.confirm);

export { router };
