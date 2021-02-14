import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import React from "react";
import { useState } from "react";

import { getImage, putPodcaster, returnPost } from "./helper-functions";

async function getResizedImg(url) {
    const body = { source: url };
    const searchResults = await returnPost(`api/resize`, url);
    return searchResults;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            display: "grid",
            gridTemplateColumns: "0.1fr 10fr 1fr 1fr",
            gridGap: "2rem",
        },
    })
);

export default function Feed(props) {
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
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.episode.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.episode.description}
                    </Typography>
                </div>
                <img src={getImage(props.episode.image, props.episode.feedImage)} height="80px"></img>
                <IconButton onClick={onPressButton}>
                    {props.isPlaying ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
                </IconButton>
            </CardContent>
        </Card>
    );
}
