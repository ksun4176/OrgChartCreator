import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/teammember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([TeamMember]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
