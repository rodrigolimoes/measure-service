import { Router } from "express";
import { controller } from "@src/measures";
import { validate } from "@src/middleware/validate";
import { MeasureDto } from "@src/measures/dtos/measure.dto";
import { ParamDto } from "@src/measures/dtos/param.dto";
import { SearchDto } from "@src/measures/dtos/search.dto";
import { MeasureConfirmDto } from "@src/measures/dtos/measureConfirm.dto";

const validateBody = validate("body");
const validateQuery = validate("query");
const validateParams = validate("params");

const router = Router();

router.post("/upload", validateBody(MeasureDto), controller.upload);
router.get(
  "/:customer_code/list",
  validateParams(ParamDto),
  validateQuery(SearchDto),
  controller.find
);
router.patch("/confirm", validateBody(MeasureConfirmDto), controller.confirm);

export { router };
