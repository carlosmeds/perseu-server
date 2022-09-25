import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
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
  @JoinColumn()
  athlete!: Athlete;

  @ManyToOne(() => Team, (team) => team.requests)
  @JoinColumn()
  team!: Team;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
