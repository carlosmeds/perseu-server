import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Athlete } from "./Athlete.schema";
import { Team } from "./Team.schema";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Athlete)
  @JoinTable({ name: "group_athlete" })
  athletes: Athlete[];

  @ManyToOne(() => Team)
  team: Team;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
