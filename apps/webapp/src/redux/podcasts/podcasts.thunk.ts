import { Podcast } from "@poochCaster/models";

import { thunkFactory } from "../utils/thunk-factory";

export const podcastThunks = {
  ...thunkFactory<Podcast>("/podcasts"),
};
