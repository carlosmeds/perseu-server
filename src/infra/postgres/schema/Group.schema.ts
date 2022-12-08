import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Athlete } from "./Athlete.schema";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Athlete)
  @JoinTable()
  athlete: Athlete[];

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt?: Date;

  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP(3)" })
  updatedAt?: Date;
}
