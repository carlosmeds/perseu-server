import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Request } from "./Request.schema";
import { Team } from "./Team.schema";
import { Training } from "./Training.schema";
import { User } from "./User.schema";

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  document!: string;

  @Column({ name: "birthdate" })
  birthdate!: Date;

  @Column()
  height: number;

  @Column()
  weight: number;

  @JoinColumn()
  user!: User;

  @ManyToOne(() => Team, (team) => team.athletes)
  @JoinColumn()
  team: Team;

  @OneToMany(() => Request, (request) => request.athlete)
  @JoinColumn()
  requests: Request[];

  @ManyToMany(() => Training)
  @JoinTable({ name: "athletes_trainings" })
  trainings: Training[];

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
