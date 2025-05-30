import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateTeamAssignmentDto } from './dto/create-team-assignment.dto';
import { UpdateTeamAssignmentDto } from './dto/update-team-assignment.dto';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/teammember.entity';
import {
  DeepPartial,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
  ) {}

  /**
   * Which relations to include with find queries
   */
  private findRelations: FindOptionsRelations<Team> = {
    type: true,
    parent: true,
    children: true,
    members: {
      member: true,
      role: true,
    },
  };

  /**
   * Create a team in the organization
   * @param createTeamDto Properties to create team with
   * @returns Created team
   */
  create(createTeamDto: CreateTeamDto) {
    const teamProps: DeepPartial<Team> = {
      name: createTeamDto.name,
      type: { id: createTeamDto.type },
    };
    if (createTeamDto.parent) {
      teamProps.parent = { id: createTeamDto.parent };
    }
    const newTeam = this.teamRepository.create(teamProps);
    return this.teamRepository.save(newTeam);
  }

  /**
   * Find teams that fit the criteria
   * @param criteria Criteria to find teams with
   * @returns A list of teams
   */
  findMany(criteria?: FindOptionsWhere<Team>) {
    return this.teamRepository.find({
      where: criteria,
      relations: this.findRelations,
    });
  }

  /**
   * Find a team
   * @param id ID of team
   * @returns Team
   */
  findOne(id: number) {
    return this.teamRepository.findOne({
      where: { id },
      relations: this.findRelations,
    });
  }

  /**
   * Update the team
   * @param id ID of team
   * @param updateTeamDto Properties to update
   * @returns UpdateResult
   */
  update(id: number, updateTeamDto: UpdateTeamDto) {
    const teamProps: QueryDeepPartialEntity<Team> = {
      name: updateTeamDto.name,
      type: { id: updateTeamDto.type },
    };
    if (updateTeamDto.parent) {
      teamProps.parent = { id: updateTeamDto.parent };
    }
    return this.teamRepository.update({ id }, teamProps);
  }

  /**
   * Delete the team
   * @param id ID of team
   * @returns DeleteResult
   */
  async remove(id: number) {
    const children = await this.findMany({ parent: { id } });
    if (children.length > 0) {
      return new ForbiddenException('Cannot delete teams that have children');
    }
    return this.teamRepository.delete({ id });
  }

  /**
   * Assign a member to a team
   * @param teamId ID of team
   * @param createTeamAssignmentDto Properties to assign a member to a team
   * @returns Created assignment
   */
  assignMember(
    teamId: number,
    createTeamAssignmentDto: CreateTeamAssignmentDto,
  ) {
    const newAssignment = this.teamMemberRepository.create({
      member: { id: createTeamAssignmentDto.member },
      team: { id: teamId },
      role: { id: createTeamAssignmentDto.role },
    });
    return this.teamMemberRepository.save(newAssignment);
  }

  /**
   * Update the team
   * @param teamId ID of team
   * @param memberId ID of member
   * @param updateTeamAssignmentDto Properties to update
   * @returns UpdateResult
   */
  updateAssignment(
    teamId: number,
    memberId: number,
    updateTeamAssignmentDto: UpdateTeamAssignmentDto,
  ) {
    return this.teamMemberRepository.update(
      {
        team: { id: teamId },
        member: { id: memberId },
      },
      {
        role: { id: updateTeamAssignmentDto.role },
      },
    );
  }

  /**
   * Delete the team
   * @param teamId ID of team
   * @param memberId ID of member
   * @returns DeleteResult
   */
  removeAssignment(teamId: number, memberId: number) {
    return this.teamMemberRepository.delete({
      team: { id: teamId },
      member: { id: memberId },
    });
  }
}
