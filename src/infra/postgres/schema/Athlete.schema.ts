import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { UserStatus } from "../../../domain/enum/UserStatus";
import { CheckIn } from "./CheckIn.schema";
import { AthleteTraining } from "./AthleteTraining.schema";
import { Request } from "./Request.schema";
import { Team } from "./Team.schema";
import { User } from "./User.schema";
import { Group } from "./Group.schema";

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

  @Column({ default: UserStatus.ATHLETE_WITHOUT_TEAM })
  status!: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Team, (team) => team.athletes)
  @JoinColumn()
  team: Team;

  @OneToMany(() => Request, (request) => request.athlete)
  @JoinColumn()
  requests: Request[];

  @OneToMany(() => CheckIn, (checkIn) => checkIn.athlete)
  @JoinColumn()
  checkIns: CheckIn[];

  @ManyToMany(() => Group)
  @JoinTable()
  group: Group[];

  @OneToMany(
    () => AthleteTraining,
    (athleteTraining) => athleteTraining.athlete
  )
  athleteTraining: AthleteTraining[];

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
