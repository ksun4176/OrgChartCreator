import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, QueryFailedError, Repository } from 'typeorm';
import { MemberRole } from './entities/memberrole.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(MemberRole)
    private memberRoleRepository: Repository<MemberRole>,
  ) {}

  /**
   * Create a member
   * @param createMemberDto Properties to create member with
   * @returns Created member
   */
  async create(createMemberDto: CreateMemberDto) {
    const newMember = this.memberRepository.create({
      firstName: createMemberDto.firstName,
      lastName: createMemberDto.lastName,
      email: createMemberDto.email.toLowerCase(),
    });
    try {
      return await this.memberRepository.save(newMember);
    } catch (error) {
      const queryError = error as QueryFailedError;
      if (queryError.message.match(/duplicate key value.*email/)) {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }

  /**
   * Find members that fit the criteria
   * @param criteria Criteria to find members with
   * @returns A list of members
   */
  findMany(criteria?: FindOptionsWhere<Member>) {
    return this.memberRepository.find({
      where: criteria,
      loadRelationIds: {
        relations: ['teams'],
      },
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
      relations: {
        teams: {
          member: true,
          team: true,
          role: true,
        },
      },
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

  /**
   * Find member roles
   * @returns A list of member roles
   */
  findAllRoles() {
    return this.memberRoleRepository.find();
  }
}
