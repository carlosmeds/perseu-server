import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Athlete } from "./Athlete.schema";
import { CheckIn } from "./CheckInSchema";
import { Session } from "./Session.schema";
import { Team } from "./Team.schema";

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Session, (session) => session.training)
  @JoinColumn()
  sessions: Session[];

  @OneToMany(() => CheckIn, (checkIn) => checkIn.training)
  @JoinColumn()
  checkIns: CheckIn[];

  @ManyToMany(() => Athlete)
  @JoinTable({ name: "athletes_trainings" })
  athletes: Athlete[];

  @ManyToOne(() => Team)
  team: Team;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
