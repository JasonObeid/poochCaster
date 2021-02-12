import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"

import { configuration } from "../config/configuration"
import { HealthModule } from "../health/health.module"
import { PodcastsModule } from "../podcasts/podcasts.module"
import { getRootModuleImports } from "../utils"

@Module({
  imports: [
    ...getRootModuleImports(configuration),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/assets`,
      exclude: ["/api*"],
    }),
    HealthModule,
    PodcastsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
