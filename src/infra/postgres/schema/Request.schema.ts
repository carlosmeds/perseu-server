import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Athlete } from "./Athlete.schema";
import { Team } from "./Team.schema";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  status!: string;

  @ManyToOne(() => Athlete, (athlete) => athlete.requests)
  athlete!: Athlete;

  @ManyToOne(() => Team, (team) => team.requests)
  team!: Team;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
