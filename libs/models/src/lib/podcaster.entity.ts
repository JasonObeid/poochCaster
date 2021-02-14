import { MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { RootEntity } from "./root.entity";

@Entity()
export class Podcaster extends RootEntity {
    @Column("simple-array", { nullable: true })
    subscriptions: Array<string>;

    @Column("simple-array", { nullable: true })
    playbackStates: Map<string, number>;

    @Column({ nullable: true })
    activeEpisode: string;

    //@Column({ nullable: true })
    //volume: number;
}
