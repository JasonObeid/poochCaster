import { MinLength } from "class-validator"
import { Column, Entity } from "typeorm"

import { RootEntity } from "./root.entity"

@Entity()
export class Podcast extends RootEntity {
  @Column()
  @MinLength(5, { always: true })
  text: string
}
