import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imageUrl: string;

  @Column()
  measureValue: number;

  @Column()
  hasConfirmed: boolean;

  @Column()
  type: string;

  @Column()
  customerCode: string;

  @Column({ type: "datetime" })
  measureDate: Date;
}
