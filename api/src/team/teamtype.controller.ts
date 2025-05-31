import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team-types')
export class TeamTypeController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll() {
    return this.teamService.findAllTypes();
  }
}
