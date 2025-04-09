import { Module } from '@nestjs/common';
import { RolesV1Module } from './v1/roles.module';

@Module({
  imports: [RolesV1Module],
  providers: [],
})
export class RolesMainModule {}
