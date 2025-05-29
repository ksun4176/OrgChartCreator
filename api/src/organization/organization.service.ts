import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) {}

  /**
   * Find the first organization in the system
   * (There should only be one)
   * @returns Organization
   */
  async findFirst() {
    const orgs = await this.orgRepository.find();
    if (orgs.length > 0) {
      return orgs[0];
    } else {
      throw new InternalServerErrorException('No organization set up');
    }
  }

  /**
   * Update the organization
   * @param id Organization to update
   * @param updateOrganizationDto Properties to update
   */
  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    this.orgRepository.update({ id }, { ...updateOrganizationDto });
  }
}
