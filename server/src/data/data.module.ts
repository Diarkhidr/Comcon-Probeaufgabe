import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AdminController } from './admin.controller';
import { TimeTracking } from './model/timetracking.model';
import { User } from './model/user.model';
import { Project } from './model/project.model';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './development.db',
        entities: [User, Project, TimeTracking],
        synchronize: true,
      }),
    ],
    controllers: [AdminController, UserController],
  })
export class DataModule {}
