import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { UserStatus } from "../../../domain/enum/UserStatus";
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

  @Column({default: UserStatus.COACH_WITHOUT_TEAM })
  status!: string;

  @Column()
  cref: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @OneToOne(() => Team, (team) => team.coach)
  team?: Team;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
