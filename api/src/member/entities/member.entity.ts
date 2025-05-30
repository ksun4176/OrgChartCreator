import { TeamMember } from 'src/team/entities/teammember.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.member)
  @JoinColumn({ name: 'member_id' })
  teams: TeamMember;
}
