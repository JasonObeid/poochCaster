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
import { useEffect, useState } from "react";

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

function Podcast(props) {
    const [alreadySubbed, setAlreadySubbed] = useState(props.subscriptions.includes(props.podcast.id.toString()));

    useEffect(() => {
        const alreadySubbed = props.subscriptions.includes(props.podcast.id.toString());
        setAlreadySubbed(alreadySubbed);
    }, [props.subscriptions]);

    async function onPressButton() {
        alreadySubbed ? unsubscribe() : subscribe();
    }
    async function subscribe() {
        console.log(props.subscriptions);
        const newSubscriptions = [...props.subscriptions];
        newSubscriptions.push(props.podcast.id.toString());
        console.log(props.podcast.id.toString());
        console.log(newSubscriptions);
        props.setSubscriptions(newSubscriptions);
    }
    async function unsubscribe() {
        console.log(props.subscriptions);
        const i = props.subscriptions.findIndex(subscription => {
            return subscription === props.podcast.id.toString();
        });
        const newSubscriptions = [...props.subscriptions];
        newSubscriptions.splice(i, 1);
        console.log(newSubscriptions);
        /*const newPodcaster = {
            id: props.uuid,
            subscriptions: newSubscriptions,
            playbackStates: props.playbackStates,
            activeEpisode: props.activeEpisode,
        };
        putPodcaster(newPodcaster);*/
        props.setSubscriptions(newSubscriptions);
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
                    {alreadySubbed ? "Unsubscribe" : "Subscribe"}
                </Button>
                <div></div>
            </CardActions>
        </Card>
    );
}
export default React.memo(Podcast);
