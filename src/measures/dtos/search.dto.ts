import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { TypesEnum } from "@src/measures/enum/types.enum";

export class SearchDto {
  @IsEnum(TypesEnum)
  @IsOptional()
  measure_type?: string;

  @IsDateString()
  @IsOptional()
  measure_date?: string;

  @IsString()
  @IsOptional()
  customer_code?: string;
}
