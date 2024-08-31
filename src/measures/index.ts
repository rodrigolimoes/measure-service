import { model } from "@src/googleAi";
import { MeasuresService } from "@src/measures/measures.service";
import { MeasuresController } from "@src/measures/measures.controller";
import { dataSource } from "@src/database";
import { Measure } from "@src/measures/entity/measure.entity";
import { ImageUtils } from "@src/common/utils/image.utils";

const repo = dataSource.getRepository(Measure);
const imageUtils = new ImageUtils();
const service = new MeasuresService(repo, model, imageUtils);
export const controller = new MeasuresController(service);
