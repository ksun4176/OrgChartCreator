import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from './team.entity';
import { Member } from 'src/member/entities/member.entity';
import { MemberRole } from 'src/member/entities/memberrole.entity';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => MemberRole, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: MemberRole;
}
