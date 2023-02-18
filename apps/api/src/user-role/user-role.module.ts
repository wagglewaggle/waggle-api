import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from '@lib/entity/user-role/user-role.entity';
import { UserRoleService } from './user-role.service';
import { UserRoleRepository } from './user-role.repository';

const typeOrmModule = TypeOrmModule.forFeature([UserRole]);

@Module({
  imports: [typeOrmModule],
  providers: [UserRoleService, UserRoleRepository],
  exports: [typeOrmModule, UserRoleService],
})
export class UserRoleModule {}
