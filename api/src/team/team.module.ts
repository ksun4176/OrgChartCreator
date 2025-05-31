import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/teammember.entity';
import { TeamType } from './entities/teamtype.entity';
import { TeamTypeController } from './teamtype.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([TeamMember]),
    TypeOrmModule.forFeature([TeamType]),
  ],
  controllers: [TeamController, TeamTypeController],
  providers: [TeamService],
})
export class TeamModule {}
