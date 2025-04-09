import { Module } from '@nestjs/common';
import { ProfilesV1Module } from './v1/profiles.module';

@Module({
  imports: [ProfilesV1Module],
  providers: [],
})
export class ProfileMainModule {}
