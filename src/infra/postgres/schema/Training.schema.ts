import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Athlete } from "./Athlete.schema";
import { Session } from "./Session.schema";

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Session, (session) => session.training)
  @JoinColumn()
  sessions: Session[];

  @ManyToMany(() => Athlete)
  @JoinTable({ name: "athletes_trainings" })
  athletes: Athlete[];

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
