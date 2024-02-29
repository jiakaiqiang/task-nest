import { PartialType } from '@nestjs/mapped-types';
import { CreateArtcileDto } from './create-artcile.dto';

export class UpdateArtcileDto extends PartialType(CreateArtcileDto) {}
