import BottomNavigation from "@material-ui/core/BottomNavigation";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import RepeatIcon from "@material-ui/icons/Repeat";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { Podcaster } from "@poochCaster/models";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { useAppStyles } from "../app/app.styles";
import { getCurrentPlayback, getImage, putPodcaster } from "./helper-functions";

function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: "Map",
            value: Array.from(value.entries()),
        };
    } else {
        return value;
    }
}

function reviver(key, value) {
    if (typeof value === "object" && value !== null) {
        if (value.dataType === "Map") {
            return new Map(value.value);
        }
    }
    return value;
}

function getEpisodeAuthor(subscriptions, feedId) {
    const subscription = subscriptions.find(subscription => subscription.id === feedId);
    if (subscription) return subscription.author;
    return "";
}

export default function Player({
    uuid,
    playbackStates,
    activeEpisode,
    subscriptions,
    isPlaying,
    feed,
    setPlaybackStates,
    setActiveEpisode,
    subscriptionDetails,
    setIsPlaying,
}) {
    const player = useRef(null);

    const timeRef = useRef(playbackStates);
    timeRef.current = playbackStates;

    const activeRef = useRef(activeEpisode);
    activeRef.current = activeEpisode;

    const classes = useAppStyles();

    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [reloadCounter, setReloadCounter] = useState(0);

    //setIsMuted(response.isMuted);
    //setVolume(parseFloat(response.volume));
    function getCurrentPlayback() {
        if (playbackStates instanceof Map) {
            if (playbackStates.has(activeEpisode.id)) {
                return playbackStates.get(activeEpisode.id);
            }
        }
        return 0;
    }

    useEffect(() => {
        setTimeout(() => {
            if (timeRef.current instanceof Map) {
                if (timeRef.current.has(activeRef.current.id)) {
                    const currentTime = timeRef.current.get(activeRef.current.id);
                    console.log(currentTime);
                    player.current.seekTo(currentTime);
                }
            }
        }, 2000);
    }, []);

    useEffect(() => {
        const currentTime = getCurrentPlayback();
        const playerTime = player.current.getCurrentTime();
        if (!isPlaying) {
            //console.log("autoseeked");
            //console.log(Math.round(currentTime));
            //console.log(Math.round(playerTime));
            if (Math.round(currentTime) !== Math.round(playerTime)) {
                //console.log("autoseeked");
                player.current.seekTo(currentTime, "seconds");
            }
        }

        //update time every 10 seconds
        const isTenSeconds = Math.round(currentTime) % 10 === 0;
        if (isTenSeconds && playerTime > 0) {
            const newPlaybackStates = JSON.stringify(playbackStates, replacer);
            const newPodcaster = {
                id: uuid,
                subscriptions: subscriptions,
                playbackStates: newPlaybackStates,
                activeEpisode: activeEpisode,
                volume: volume,
                isMuted: isMuted,
            };
            console.log(newPodcaster);
            putPodcaster(newPodcaster);
        }
    }, [playbackStates]);

    useEffect(() => {
        console.log(reloadCounter);
        if (reloadCounter < 3) {
            console.log("false");
            setReloadCounter(reloadCounter + 1);
        } else {
            console.log("true");
            console.log(playbackStates);
            const newPlaybackStates = JSON.stringify(playbackStates, replacer);
            console.log(newPlaybackStates);
            const newPodcaster = {
                id: uuid,
                subscriptions: subscriptions,
                playbackStates: newPlaybackStates,
                activeEpisode: activeEpisode,
                volume: volume,
                isMuted: isMuted,
            };
            console.log(newPodcaster);
            putPodcaster(newPodcaster);
        }
        //}, [activeEpisode, subscriptions, uuid, volume, isMuted]);
    }, [activeEpisode, subscriptions, uuid]);

    const handleProgress = (state: any) => {
        // We only want to update time slider if we are not currently seeking
        if (!isSeeking && state.playedSeconds > 0) {
            updatePlaybackStates(state.playedSeconds);
        }
    };

    function updatePlaybackStates(newValue: number) {
        if (playbackStates instanceof Map) {
            const newPlaybackStates = new Map<number, number>(playbackStates);
            newPlaybackStates.set(activeEpisode.id, newValue);
            console.log(newPlaybackStates);
            setPlaybackStates(newPlaybackStates);
        } else {
            const newPlaybackStates = new Map<number, number>([[activeEpisode.id, newValue]]);
            setPlaybackStates(newPlaybackStates);
            console.log(newPlaybackStates);
        }
    }

    const handleVolumeChange = (event: any, newValue: number) => {
        setVolume(newValue);
    };

    const handleMuteChange = (event: any) => {
        setIsMuted(!isMuted);
    };

    const handleSeekChange = (event: any, newValue: number) => {
        console.log(newValue);
        setIsSeeking(true);
        player.current.seekTo(newValue, "seconds");
        setIsSeeking(false);
        updatePlaybackStates(newValue);
    };

    function getEpisodeIndexWithinFeed(episodeID) {
        const episodeIDs = feed.map(episode => episode.id);
        const isEpisodeID = episode => episode === episodeID;
        const index = episodeIDs.findIndex(isEpisodeID);
        console.log(index);
        return index;
    }

    const handlePrevious = episodeID => {
        const index = getEpisodeIndexWithinFeed(episodeID);
        const newIndex = index < feed.length ? index + 1 : feed.length - 1;
        console.log(newIndex);
        if (index !== newIndex) {
            console.log(feed[newIndex]);
            setActiveEpisode(feed[newIndex]);
        }
    };

    const handleNext = episodeID => {
        const index = getEpisodeIndexWithinFeed(episodeID);
        const newIndex = index > 0 ? index - 1 : 0;
        console.log(newIndex);
        if (index !== newIndex) {
            console.log(feed[newIndex]);
            setActiveEpisode(feed[newIndex]);
        }
    };

    return (
        <React.Fragment>
            <footer className={classes.footer}>
                <Box m="auto">
                    <img
                        src={getImage(activeEpisode.image, activeEpisode.feedImage)}
                        height="56px"
                        width="auto"
                        className={classes.rounded}
                    ></img>
                </Box>
                <Box m="auto">
                    <Typography gutterBottom variant="subtitle2" component="h6">
                        {activeEpisode.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p">
                        {getEpisodeAuthor(subscriptionDetails, activeEpisode.feedId)}
                    </Typography>
                </Box>
                <div className={classes.textCenter}>
                    <Grid container spacing={1} direction="column" alignItems="stretch" justifyContent="space-around">
                        <Grid item>
                            <IconButton onClick={handleMuteChange}>
                                {isMuted ? <ShuffleIcon /> : <ShuffleIcon />}
                            </IconButton>
                            <IconButton onClick={() => handlePrevious(activeEpisode.id)}>
                                <SkipPreviousIcon />
                            </IconButton>
                            <IconButton onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ? (
                                    <PauseCircleFilledIcon fontSize="large" />
                                ) : (
                                    <PlayCircleFilledIcon fontSize="large" />
                                )}
                            </IconButton>
                            <IconButton onClick={() => handleNext(activeEpisode.id)}>
                                <SkipNextIcon />
                            </IconButton>
                            <IconButton onClick={handleNext}>{isMuted ? <RepeatIcon /> : <RepeatIcon />}</IconButton>
                        </Grid>
                        <Grid item className={classes.textCenter}>
                            <ReactPlayer
                                ref={player}
                                url={activeEpisode.enclosureUrl}
                                playing={isPlaying}
                                volume={volume}
                                muted={isMuted}
                                onProgress={handleProgress}
                                width={0}
                                height={0}
                            />
                            <Slider
                                className={classes.slider}
                                value={getCurrentPlayback()}
                                getAriaValueText={() =>
                                    `current time is ${playbackStates.get(activeEpisode.id)} seconds`
                                }
                                aria-labelledby="time-slider"
                                onChange={handleSeekChange}
                                min={0}
                                step={1}
                                max={activeEpisode.duration}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={`${classes.dFlex} ${classes.textCenter}`}>
                    <Box m={"auto"}>
                        <IconButton onClick={handleMuteChange}>
                            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                        </IconButton>
                    </Box>
                    <Slider
                        className={classes.slider}
                        value={volume}
                        getAriaValueText={() => `volume is ${volume * 100}%`}
                        aria-labelledby="volume-slider"
                        onChange={handleVolumeChange}
                        min={0}
                        step={0.01}
                        max={1}
                    />
                </div>
            </footer>
        </React.Fragment>
    );
}
