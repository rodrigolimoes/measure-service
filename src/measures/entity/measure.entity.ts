import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  image_url: string;

  @Column()
  measure_value: number;

  @Column()
  has_confirmed: boolean;

  @Column()
  type: string;

  @Column()
  customer_code: string;

  @Column({ type: "datetime" })
  measure_date: Date;
}
