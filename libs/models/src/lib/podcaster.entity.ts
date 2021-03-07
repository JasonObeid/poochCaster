import { MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { RootEntity } from "./root.entity";

@Entity()
export class Podcaster extends RootEntity {
    @Column("simple-array", { nullable: true })
    subscriptions: Array<string>;

    @Column({ nullable: true })
    playbackStates: string;

    @Column("simple-json", { nullable: true })
    activeEpisode: any;

    @Column({ nullable: true, type: "decimal" })
    volume: number;

    @Column({ nullable: true })
    isMuted: boolean;
}
