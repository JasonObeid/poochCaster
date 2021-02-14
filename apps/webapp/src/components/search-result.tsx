import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
            gridTemplateColumns: "0.1fr 10fr 1fr",
            gridGap: "2rem",
        },
    })
);

export default function SearchResult(props) {
    async function onPressButton() {
        console.log(props.podcast);
        console.log(props.subscriptions);
        const alreadySubbed = props.subscriptions.includes(props.podcast.id.toString());
        if (!alreadySubbed) {
            const newSubscriptions = [...props.subscriptions];
            newSubscriptions.push(props.podcast.id.toString());
            const newPodcaster = {
                id: props.uuid,
                subscriptions: newSubscriptions,
                playbackStates: props.playbackStates,
                activeEpisode: props.activeEpisode,
            };
            console.log(newPodcaster);
            putPodcaster(newPodcaster);
            props.setSubscriptions(newSubscriptions);
        }
    }
    const classes = useStyles();
    return (
        <Card>
            <CardContent className={classes.layout}>
                <div></div>
                <div>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.podcast.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.podcast.description}
                    </Typography>
                </div>
                <img src={getImage(props.podcast.artwork, props.podcast.image)} height="80px"></img>
            </CardContent>
            <CardActions className={classes.layout}>
                <div></div>
                <Button size="small" color="primary" onClick={onPressButton}>
                    Subscribe
                </Button>
                <div></div>
            </CardActions>
        </Card>
    );
}
