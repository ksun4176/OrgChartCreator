import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  /**
   * Which relations to include with find queries
   */
  private findRelations: FindOptionsRelations<Member> = {
    teams: {
      team: true,
      role: true,
    },
  };

  /**
   * Create a member
   * @param createMemberDto Properties to create member with
   * @returns Created member
   */
  create(createMemberDto: CreateMemberDto) {
    const newMember = this.memberRepository.create({
      firstName: createMemberDto.firstName,
      lastName: createMemberDto.lastName,
      email: createMemberDto.email,
    });
    return this.memberRepository.save(newMember);
  }

  /**
   * Find members that fit the criteria
   * @param criteria Criteria to find members with
   * @returns A list of members
   */
  findMany(criteria?: FindOptionsWhere<Member>) {
    return this.memberRepository.find({
      where: criteria,
      relations: this.findRelations,
    });
  }

  /**
   * Find a member
   * @param id ID of member
   * @returns Member
   */
  findOne(id: number) {
    return this.memberRepository.findOne({
      where: { id },
      relations: this.findRelations,
    });
  }

  /**
   * Update the member
   * @param id ID of member
   * @param updateMemberDto Properties to update
   * @returns UpdateResult
   */
  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.memberRepository.update(
      { id },
      {
        firstName: updateMemberDto.firstName,
        lastName: updateMemberDto.lastName,
        email: updateMemberDto.email,
      },
    );
  }

  /**
   * Delete the member
   * @param id ID of member
   * @returns DeleteResult
   */
  async remove(id: number) {
    return this.memberRepository.delete({ id });
  }
}
