import { Dependencies, Injectable } from "@nestjs/common";

import { PodcastersService } from "../podcasters/podcasters.service";

@Injectable()
@Dependencies(PodcastersService)
export class AuthService {
    podcastersService: any;
    constructor(podcastersService) {
        this.podcastersService = podcastersService;
    }

    async validateUser(username, pass) {
        const user = await this.podcastersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
