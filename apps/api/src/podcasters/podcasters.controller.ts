import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Podcaster } from "@poochCaster/models";

import { PodcastersService } from "./podcasters.service";

@Crud({
    model: { type: Podcaster },
    params: {
        id: {
            field: "id",
            type: "uuid",
            primary: true,
        },
    },
})
@Controller("podcasters")
export class PodcastersController implements CrudController<Podcaster> {
    constructor(public service: PodcastersService) {}
}
