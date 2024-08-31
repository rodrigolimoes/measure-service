import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TypesEnum } from '@src/measures/enum/types.enum';
import { Transform } from 'class-transformer';

export class SearchDto {
	@Transform(({ value }) => value.toUpperCase())
	@IsEnum(TypesEnum, { message: 'Tipo de medição não permitida' })
	@IsOptional()
	measure_type?: string;

	@IsDateString()
	@IsOptional()
	measure_date?: string;

	@IsString()
	@IsOptional()
	customer_code?: string;
}
