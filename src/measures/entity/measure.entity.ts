import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Measure {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text' })
	image_url: string;

	@Column({ type: 'int' })
	measure_value: number;

	@Column({ type: 'boolean' })
	has_confirmed: boolean;

	@Column({ type: 'text' })
	type: string;

	@Column({ type: 'text' })
	customer_code: string;

	@Column({ type: 'datetime' })
	measure_date: Date;
}
