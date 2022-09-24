import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Athlete } from "./Athlete.schema";
import { Coach } from "./Coach.schema";

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
  athletes!: Athlete[];

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
