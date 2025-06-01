import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberRoleController } from './memberrole.controller';
import { MemberRole } from './entities/memberrole.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([MemberRole]),
  ],
  controllers: [MemberController, MemberRoleController],
  providers: [MemberService],
})
export class MemberModule {}
