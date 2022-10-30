import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Athlete } from "./Athlete.schema";
import { Training } from "./Training.schema";

@Entity()
export class CheckIn {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  effort!: number;

  @ManyToOne(() => Training, (training) => training.checkIns)
  @JoinColumn()
  training!: Training;

  @ManyToOne(() => Athlete, (athlete) => athlete.checkIns)
  @JoinColumn()
  athlete!: Athlete;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
