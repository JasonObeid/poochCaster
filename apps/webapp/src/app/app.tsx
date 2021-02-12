import blueGrey from "@material-ui/core/colors/blueGrey";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Podcast } from "@poochCaster/models";
import React, { ChangeEvent, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import { PodcastState } from "../redux/podcasts/podcasts.slice";
import { podcastThunks } from "../redux/podcasts/podcasts.thunk";
import { RootState } from "../redux/root-reducer";
import { AppDispatch } from "../redux/store";
import { useAppStyles } from "./app.styles";

export const App = () => {
  const classes = useAppStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blueGrey[700],
      },
      secondary: {
        main: teal[900],
      },
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const podcastState = useSelector<RootState, PodcastState>((state: RootState) => state.podcastReducer);
  const [podcastCreateText, setTodoCreateText] = useState("");
  const [podcastEditTextMap, setTodoEditTextMap] = useState(new Map<number, string>());
  const [podcastEditIdMap, setTodoEditIdMap] = useState(new Map<number, boolean>());
  const [, setErrorAlertOpened] = useState(!!podcastState.status.error);

  useEffect(() => {
    dispatch(podcastThunks.getAll());
  }, [dispatch]);

  useEffect(() => {
    setTodoEditTextMap(
      podcastState.entities.reduce(
        (container, podcast) => ({ ...container, [podcast.id]: podcast.text }),
        new Map<number, string>()
      )
    );
  }, [podcastState.entities]);

  useEffect(() => setErrorAlertOpened(!!podcastState.status.error), [podcastState.status.error]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <main className={classes.content}>
          <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
