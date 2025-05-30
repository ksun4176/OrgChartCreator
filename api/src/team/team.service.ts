import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

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
  };

  /**
   * Create a team in the organization
   * @param createTeamDto Properties to create team with
   * @returns Created team
   */
  create(createTeamDto: CreateTeamDto) {
    const newTeam = this.teamRepository.create({
      name: createTeamDto.name,
      organization: { id: 1 },
      type: { id: createTeamDto.type },
    });
    return this.teamRepository.save(newTeam);
  }

  /**
   * Find teams that fit the criteria
   * @param criteria Criteria to find teams with
   * @returns A list of teams
   */
  findMany(criteria: FindOptionsWhere<Team>) {
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
    return this.teamRepository.update(
      { id },
      {
        name: updateTeamDto.name,
        type: { id: updateTeamDto.type },
      },
    );
  }

  /**
   * Delete the team
   * @param id ID of team
   * @returns DeleteResult
   */
  remove(id: number) {
    return this.teamRepository.delete({ id });
  }
}
