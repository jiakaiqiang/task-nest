import { Module } from '@nestjs/common';
import { ArtcileService } from './artcile.service';
import { ArtcileController } from './artcile.controller';

@Module({
  controllers: [ArtcileController],
  providers: [ArtcileService],
})
export class ArtcileModule {}
