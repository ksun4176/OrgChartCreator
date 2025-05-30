import { Injectable } from '@nestjs/common';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
    private readonly teamService: TeamService,
  ) {}

  /**
   * Find the first organization in the system
   * (There should only be one)
   * @returns Organization
   */
  findFirst() {
    return this.orgRepository.findOneByOrFail({ id: 1 });
  }

  /**
   * Find all teams in the organization
   * @returns Teams
   */
  findTeams() {
    return this.teamService.findMany({ organization: { id: 1 } });
  }

  /**
   * Update the organization
   * @param updateOrganizationDto Properties to update
   */
  update(updateOrganizationDto: UpdateOrganizationDto) {
    this.orgRepository.update(
      { id: 1 },
      {
        name: updateOrganizationDto.name,
      },
    );
  }
}
