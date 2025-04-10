import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(
  OmitType(CreateProfileDto, ['user_id', 'created_at', 'updated_at'] as const),
) {}
