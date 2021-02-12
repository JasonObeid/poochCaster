import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Podcast } from "@poochCaster/models";

import { ApiController } from "./api.controller";
import { PodcastsController } from "./podcasts.controller";
import { PodcastsService } from "./podcasts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  providers: [PodcastsService],
  exports: [PodcastsService],
  controllers: [PodcastsController, ApiController],
})
export class PodcastsModule {}
