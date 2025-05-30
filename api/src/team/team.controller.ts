import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateTeamAssignmentDto } from './dto/create-team-assignment.dto';
import { UpdateTeamAssignmentDto } from './dto/update-team-assignment.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findMany();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.remove(id);
  }

  @Post(':id/members')
  assignMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTeamAssignmentDto: CreateTeamAssignmentDto,
  ) {
    return this.teamService.assignMember(id, createTeamAssignmentDto);
  }

  @Patch(':id/members/:memberId')
  updateMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() updateTeamAssignmentDto: UpdateTeamAssignmentDto,
  ) {
    return this.teamService.updateAssignment(
      id,
      memberId,
      updateTeamAssignmentDto,
    );
  }

  @Delete(':id/members/:memberId')
  deleteMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.teamService.removeAssignment(id, memberId);
  }
}
