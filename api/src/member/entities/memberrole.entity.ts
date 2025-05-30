import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemberRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
