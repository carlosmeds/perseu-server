import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  document!: string;

  @Column({name: "birth_date"})
  birthDate!: Date;

  @Column()
  password!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;
}
