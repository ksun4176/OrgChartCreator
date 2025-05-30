import { Controller, Get, Body, Patch } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  findFirst() {
    return this.organizationService.findFirst();
  }

  @Get('teams')
  findTeams() {
    return this.organizationService.findTeams();
  }

  @Patch()
  update(@Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(updateOrganizationDto);
  }
}
