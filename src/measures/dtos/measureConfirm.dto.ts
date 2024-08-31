import { IsInt, IsString } from "class-validator";

export class MeasureConfirmDto {
  @IsString()
  measure_uuid: string;

  @IsInt()
  confirmed_value: number;
}
