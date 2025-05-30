import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TeamType } from './teamtype.entity';
import { TeamMember } from './teammember.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => TeamType, (type) => type.id)
  @JoinColumn({ name: 'type_id' })
  type: TeamType;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'parent_team_id' })
  parent: Team;

  @OneToMany(() => Team, (team) => team.parent)
  @JoinColumn({ name: 'parent_team_id' })
  children: Team[];

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  @JoinColumn({ name: 'team_id' })
  members: TeamMember;
}
