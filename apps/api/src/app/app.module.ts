import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import { configuration } from "../config/configuration";
import { HealthModule } from "../health/health.module";
import { ApiController } from "../podcasters/api.controller";
import { PodcastersModule } from "../podcasters/podcasters.module";
import { getRootModuleImports } from "../utils";

@Module({
    imports: [
        ...getRootModuleImports(configuration),
        ServeStaticModule.forRoot({
            rootPath: `${__dirname}/assets`,
            exclude: ["/api*"],
        }),
        HealthModule,
        PodcastersModule,
    ],
    controllers: [ApiController],
    providers: [],
})
export class AppModule {}
