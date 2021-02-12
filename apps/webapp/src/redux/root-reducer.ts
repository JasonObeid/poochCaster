import { combineReducers } from "@reduxjs/toolkit";

import { podcastSlice } from "./podcasts/podcasts.slice";

const rootReducer = combineReducers({
  podcastReducer: podcastSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
