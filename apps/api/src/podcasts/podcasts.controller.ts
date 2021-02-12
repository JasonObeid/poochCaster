import { Controller } from "@nestjs/common"
import { Crud, CrudController } from "@nestjsx/crud"
import { Podcast } from "@poochCaster/models"

import { PodcastsService } from "./podcasts.service"

@Crud({ model: { type: Podcast } })
@Controller("podcasts")
export class PodcastsController implements CrudController<Podcast> {
  constructor(public service: PodcastsService) {}
}
