import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
