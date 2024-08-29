import { IsBase64, IsDateString, IsEnum, IsString } from "class-validator";
import { TypesEnum } from "@src/measures/enum/types.enum";

export class MeasureDto {
  @IsBase64()
  image: string;

  @IsDateString()
  measure_datetime: string;

  @IsEnum(TypesEnum, { message: 'O tipo deve ser "WATER" ou "GAS"' })
  measure_type: TypesEnum;

  @IsString()
  customer_code: string;
}
