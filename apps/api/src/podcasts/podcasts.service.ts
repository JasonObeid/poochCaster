import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Podcast } from "@poochCaster/models"
import { Repository } from "typeorm"

@Injectable()
export class PodcastsService extends TypeOrmCrudService<Podcast> {
  constructor(@InjectRepository(Podcast) repository: Repository<Podcast>) {
    super(repository)
  }
}
