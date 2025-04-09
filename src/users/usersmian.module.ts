import { Module } from '@nestjs/common';
import { UsersV1Module } from './v1/users.module';

@Module({
  imports: [UsersV1Module],
  providers: [],
})
export class UsersMainModule {}
