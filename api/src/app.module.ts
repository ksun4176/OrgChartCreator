import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';
import { MemberRole } from './member/entities/memberrole.entity';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      database: 'postgres',
      entities: [MemberRole],
      autoLoadEntities: true,
    }),
    TeamModule,
    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
