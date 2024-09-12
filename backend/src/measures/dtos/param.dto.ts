import { IsString } from "class-validator";

export class ParamDto {
  @IsString()
  customer_code: string;
}
