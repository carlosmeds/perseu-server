import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Athlete } from "./Athlete.schema";
import { Training } from "./Training.schema";

@Entity()
export class AthleteTraining {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "last_check_in", nullable: true })
  lastCheckIn: Date;

  @Column({ default: true})
  active: Boolean;

  @ManyToOne(() => Athlete)
  athlete: Athlete;

  @ManyToOne(() => Training)
  training: Training;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt: Date;
}
