import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
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
  ) {}

  /**
   * Which relations to include with find queries
   */
  private findRelations: FindOptionsRelations<Team> = {
    type: true,
    children: true,
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
}
