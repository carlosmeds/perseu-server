import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Athlete } from "./Athlete.schema";
import { Coach } from "./Coach.schema";
import { Request } from "./Request.schema";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @OneToOne(() => Coach, (coach) => coach.team)
  @JoinColumn()
  coach!: Coach;

  @OneToMany(() => Athlete, (athlete) => athlete.team)
  athletes: Athlete[];

  @OneToMany(() => Request, (request) => request.team)
  @JoinColumn()
  requests: Request[];

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;

  @Column({ name: "deleted_at", nullable: true })
  deletedAt?: Date;
}
