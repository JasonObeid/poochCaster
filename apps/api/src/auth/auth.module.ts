import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { PodcastersModule } from "../podcasters/podcasters.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [PodcastersModule, PassportModule],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
