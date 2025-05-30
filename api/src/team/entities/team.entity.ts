import { Organization } from 'src/organization/entities/organization.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TeamType } from './teamtype.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  @ManyToOne(() => TeamType, (type) => type.id)
  @JoinColumn({ name: 'type_id' })
  type: TeamType;
}
