import { PartialType } from '@nestjs/swagger';
import { CreateLoginDto } from './create-user.dto';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
