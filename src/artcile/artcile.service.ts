import { Injectable } from '@nestjs/common';
import { CreateArtcileDto } from './dto/create-artcile.dto';
import { UpdateArtcileDto } from './dto/update-artcile.dto';

@Injectable()
export class ArtcileService {
  create(createArtcileDto: CreateArtcileDto) {
    return 'This action adds a new artcile';
  }

  findAll() {
    return `This action returns all artcile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artcile`;
  }

  update(id: number, updateArtcileDto: UpdateArtcileDto) {
    return `This action updates a #${id} artcile`;
  }

  remove(id: number) {
    return `This action removes a #${id} artcile`;
  }
}
