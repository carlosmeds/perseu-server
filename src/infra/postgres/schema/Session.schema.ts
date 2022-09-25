import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Exercise } from "./Exercise.schema";
import { Training } from "./Training.schema";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Exercise, (exercise) => exercise.session)
  @JoinColumn()
  exercises: Exercise[];

  @ManyToOne(() => Training, (training) => training.sessions)
  @JoinColumn()
  training!: Training;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
