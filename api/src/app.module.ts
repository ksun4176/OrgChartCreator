import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization/entities/organization.entity';
import { OrganizationModule } from './organization/organization.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      database: 'postgres',
      entities: [Organization],
      autoLoadEntities: true,
    }),
    OrganizationModule,
    TeamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
