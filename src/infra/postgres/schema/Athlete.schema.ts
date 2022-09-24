import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Request } from "./Request.schema";
import { Team } from "./Team.schema";
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

  @JoinColumn()
  user!: User;

  @ManyToOne(() => Team, (team) => team.athletes)
  @JoinColumn()
  team!: Team;

  @OneToMany(() => Request, (request) => request.athlete)
  @JoinColumn()
  requests!: Request[];

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
