import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from "typeorm";
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

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
