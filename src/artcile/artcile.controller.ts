import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtcileService } from './artcile.service';
import { CreateArtcileDto } from './dto/create-artcile.dto';
import { UpdateArtcileDto } from './dto/update-artcile.dto';

@Controller('artcile')
export class ArtcileController {
  constructor(private readonly artcileService: ArtcileService) {}

  @Post()
  create(@Body() createArtcileDto: CreateArtcileDto) {
    return this.artcileService.create(createArtcileDto);
  }

  @Get()
  findAll() {
    return this.artcileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artcileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtcileDto: UpdateArtcileDto) {
    return this.artcileService.update(+id, updateArtcileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artcileService.remove(+id);
  }
}
