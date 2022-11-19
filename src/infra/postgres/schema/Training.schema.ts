import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { AthleteTraining } from "./AthleteTraining.schema";
import { CheckIn } from "./CheckIn.schema";
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

  @OneToMany(() => AthleteTraining, (athleteTraining) => athleteTraining.training)
  athleteTrainings: AthleteTraining[];

  @ManyToOne(() => Team)
  team: Team;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
