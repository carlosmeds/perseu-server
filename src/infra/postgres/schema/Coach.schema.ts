import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Team } from "./Team.schema";
import { User } from "./User.schema";

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  document!: string;

  @Column({ name: "birthdate" })
  birthdate!: Date;

  @Column()
  cref!: string;

  @JoinColumn()
  user!: User;

  @OneToOne(() => Team, (team) => team.coach)
  team!: Team;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
