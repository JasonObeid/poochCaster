import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import React from "react";
import { useState } from "react";

import { getCurrentPlayback, getImage, putPodcaster, returnPost } from "./helper-functions";

async function getResizedImg(url) {
    const body = { source: url };
    const searchResults = await returnPost(`api/resize`, url);
    return searchResults;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            maxWidth: "50rem",
            minWidth: "35rem",
            display: "grid",
            gridTemplateColumns: "0.1fr 10fr 1fr 1fr",
            gridGap: "2rem",
        },
        rounded: {
            borderRadius: "0.7rem",
        },
    })
);
function cleanText(text: string) {
    const trimmedArray = text.slice(0, 150).split(" ");
    const truncateLastWord = trimmedArray.slice(0, trimmedArray.length - 1);
    return truncateLastWord.join(" ") + "...";
}

function Feed(props) {
    async function onPressButton() {
        console.log(props.episode);
        props.setActiveEpisode(props.episode);
        props.setIsPlaying(!props.isPlaying);
    }
    const classes = useStyles();
    return (
        <Card>
            <CardContent className={classes.layout}>
                <div></div>
                <div>
                    <Link gutterBottom variant="subtitle2" href={`/episode/${props.episode.id}`}>
                        {props.episode.title}
                    </Link>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {cleanText(props.episode.description).slice(0)}
                    </Typography>
                </div>
                <Grid container spacing={1} direction="column" alignItems="stretch" justifyContent="space-between">
                    <Grid item xs>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {new Date(props.episode.datePublished * 1000).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <img
                            src={getImage(props.episode.image, props.episode.feedImage)}
                            height="60px"
                            width="auto"
                            className={classes.rounded}
                        ></img>
                    </Grid>
                </Grid>
                <Grid container spacing={1} direction="column" alignItems="stretch" justifyContent="space-between">
                    <Grid item xs>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`${Math.round(props.episode.duration / 60)} mins`}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Box m="auto">
                            <IconButton onClick={onPressButton}>
                                {props.isPlaying ? (
                                    <PauseCircleFilledIcon fontSize="large" />
                                ) : (
                                    <PlayCircleFilledIcon fontSize="large" />
                                )}
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <LinearProgress
                variant="determinate"
                value={getCurrentPlayback(props.playbackStates, props.episode.id, props.episode.duration)}
            />
        </Card>
    );
}
export default React.memo(Feed);
