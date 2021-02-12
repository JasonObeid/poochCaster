import { Podcast } from "@poochCaster/models";
import { Slice, createSlice } from "@reduxjs/toolkit";

import { sliceReducerFactory } from "../utils/slice-reducer-factory";
import { SliceState, getInitialSliceState } from "../utils/slice-state";
import { podcastThunks } from "./podcasts.thunk";

export interface PodcastState extends SliceState<Podcast> {}

export const podcastSlice: Slice = createSlice({
  name: "podcasts",
  initialState: getInitialSliceState<PodcastState, Podcast>(),
  reducers: {},
  extraReducers: {
    ...sliceReducerFactory<Podcast, PodcastState>(podcastThunks),
  },
});
