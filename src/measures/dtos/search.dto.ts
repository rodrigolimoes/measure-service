import { IsDateString, IsEnum, IsString } from "class-validator";
import { TypesEnum } from "@src/measures/enum/types.enum";

export class SearchDto {
  @IsEnum(TypesEnum)
  type?: string;

  @IsDateString()
  measure_date?: string;

  @IsString()
  customer_code?: string;
}
