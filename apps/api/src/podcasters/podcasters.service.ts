import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Podcaster } from "@poochCaster/models"
import { Repository } from "typeorm"

@Injectable()
export class PodcastersService extends TypeOrmCrudService<Podcaster> {
  constructor(@InjectRepository(Podcaster) repository: Repository<Podcaster>) {
    super(repository)
  }
}
