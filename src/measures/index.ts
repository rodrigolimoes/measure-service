import { model } from "@src/googleAi";
import { MeasuresService } from "@src/measures/measures.service";
import { MeasuresController } from "@src/measures/measures.controller";

export const controller = new MeasuresController(new MeasuresService(model));
