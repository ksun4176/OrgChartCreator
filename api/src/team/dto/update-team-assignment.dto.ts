import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamAssignmentDto } from './create-team-assignment.dto';

export class UpdateTeamAssignmentDto extends PartialType(CreateTeamAssignmentDto) {}
