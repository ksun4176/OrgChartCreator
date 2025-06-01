import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member-roles')
export class MemberRoleController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAllRoles();
  }
}
