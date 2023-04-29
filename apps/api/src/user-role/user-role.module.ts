import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from './user-role.service';
import { UserRoleRepository } from './user-role.repository';
import { UserRole } from 'waggle-entity/dist/user-role/user-role.entity';

const typeOrmModule = TypeOrmModule.forFeature([UserRole]);

@Module({
  imports: [typeOrmModule],
  providers: [UserRoleService, UserRoleRepository],
  exports: [typeOrmModule, UserRoleService],
})
export class UserRoleModule {}
