import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Podcaster } from "@poochCaster/models";

import { PodcastersController } from "./podcasters.controller";
import { PodcastersService } from "./podcasters.service";

@Module({
    imports: [TypeOrmModule.forFeature([Podcaster])],
    providers: [PodcastersService],
    exports: [PodcastersService],
    controllers: [PodcastersController],
})
export class PodcastersModule {}
