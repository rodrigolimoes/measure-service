import { IsBase64, IsDateString, IsEnum, IsString } from "class-validator";
import { TypesEnum } from "@src/measures/enum/types.enum";

export class MeasureDto {
  @IsString()
  image: string;

  @IsDateString()
  measure_datetime: string;

  @IsEnum(TypesEnum, { message: "Tipo de medição não permitida" })
  measure_type: TypesEnum;

  @IsString()
  customer_code: string;
}
