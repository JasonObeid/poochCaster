import BottomNavigation from "@material-ui/core/BottomNavigation";
import Box from "@material-ui/core/Box";
import blueGrey from "@material-ui/core/colors/blueGrey";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
import React, { ChangeEvent, useEffect, useState } from "react";
import ReactPlayer from "react-player";

import Feeds from "../components/feeds";
import {
    getImage,
    getPodcaster,
    postPodcaster,
    putPodcaster,
    returnCall,
    returnPost,
} from "../components/helper-functions";
import Search from "../components/search";
import Sidebar from "../components/sidebar";
import Subscriptions from "../components/subscriptions";
import { useAppStyles } from "./app.styles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}
function getEpisodeAuthor(subscriptions, feedId) {
    const subscription = subscriptions.find(subscription => subscription.id === feedId);
    if (subscription) return subscription.author;
    return "";
}
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

    //tabs
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [uuid, setUuid] = React.useState("b630f094-aa91-4df7-a59c-58c37a3c90b0");
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState([]);
    const [feed, setFeed] = useState([]);

    //search
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //playback
    const [playbackStates, setPlaybackStates] = useState(new Map<string, number>());
    const [activeEpisode, setActiveEpisode] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackTime, setPlaybackTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0);

    async function get() {
        const response = await getPodcaster(uuid);
        console.log(response);
        setSubscriptions(response.subscriptions);
        setPlaybackStates(response.playbackStates);
        //setPlaybackStates(playbackStates => new Map([...playbackStates, ["1667527335", 0]]));
    }
    async function getSubscriptionsDetails() {
        const response = await returnPost("api/getSubscriptionsDetails", { subscriptions: subscriptions });
        setSubscriptionDetails(response);
        console.log(response);
    }
    async function getFeedEpisodes() {
        const response = await returnPost("api/getFeedEpisodes", { subscriptions: subscriptions });
        setFeed(response);
        console.log(response);
    }
    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        //get();
    }, [activeEpisode]);
    useEffect(() => {
        //get();
    }, [isPlaying]);

    useEffect(() => {
        if (activeEpisode.id !== undefined && playbackStates.size > 0) {
            const time = playbackStates.get(activeEpisode.id.toString());
            setPlaybackTime(time);
        }
    }, [activeEpisode, playbackStates]);

    useEffect(() => {
        getSubscriptionsDetails();
        getFeedEpisodes();
        //if (loadCount > 0) {
        //    get();
        //}
        //putPodcaster({ id: "576ebba6-b5d5-48d9-b00a-11b4df7c29f3", subscriptions: [], playbackStates: [] });
        //postPodcaster({ id: "576ebba6-b5d5-48d9-b00a-11b4df7c29f3", subscriptions: [], playbackStates: [] });
    }, [subscriptions]);

    const handleVolumeChange = (event: any, newValue: number | number[]) => {
        setVolume(newValue);
    };

    const handleMuteChange = (event: any) => {
        setIsMuted(!isMuted);
    };

    const handlePlaybackSeek = (event: any, newValue: number | number[]) => {
        setPlaybackTime(newValue);
        //setPlaybackStates(playbackStates.set(activeEpisode.id, newValue));
    };
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Sidebar selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                <main className={classes.content}>
                    <TabPanel value={selectedIndex} index={0}>
                        <Search
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                            searchText={searchText}
                            setSearchText={setSearchText}
                            subscriptions={subscriptions}
                            setSubscriptions={setSubscriptions}
                            uuid={uuid}
                            playbackStates={playbackStates}
                        />
                    </TabPanel>
                    <TabPanel value={selectedIndex} index={1}>
                        <Feeds
                            feed={feed}
                            setFeed={setFeed}
                            uuid={uuid}
                            playbackStates={playbackStates}
                            setIsPlaying={setIsPlaying}
                            isPlaying={isPlaying}
                            activeEpisode={activeEpisode}
                            setActiveEpisode={setActiveEpisode}
                        />
                    </TabPanel>
                    <TabPanel value={selectedIndex} index={2}>
                        <Subscriptions
                            subscriptions={subscriptions}
                            setSubscriptions={setSubscriptions}
                            subscriptionDetails={subscriptionDetails}
                            setSubscriptionDetails={setSubscriptionDetails}
                            uuid={uuid}
                            playbackStates={playbackStates}
                            activeEpisode={activeEpisode}
                        />
                    </TabPanel>
                    <ReactPlayer url={activeEpisode.enclosureUrl} playing={isPlaying} volume={volume} muted={isMuted} />
                </main>
            </div>
            <div className={classes.footer}>
                <img src={getImage(activeEpisode.image, activeEpisode.feedImage)} height="80px"></img>
                <div>
                    <Typography gutterBottom variant="subtitle1" component="h2">
                        {activeEpisode.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p">
                        {getEpisodeAuthor(subscriptionDetails, activeEpisode.feedId)}
                    </Typography>
                </div>
                <div>
                    <Grid container spacing={1} direction="column" alignItems="stretch" justifyContent="space-around">
                        <Grid item>
                            <IconButton onClick={handleMuteChange}>
                                {isMuted ? <ShuffleIcon /> : <ShuffleIcon />}
                            </IconButton>
                            <IconButton onClick={handleMuteChange}>
                                <SkipPreviousIcon />
                            </IconButton>
                            <IconButton onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
                            </IconButton>
                            <IconButton onClick={handleMuteChange}>
                                <SkipNextIcon />
                            </IconButton>
                            <IconButton onClick={handleMuteChange}>
                                {isMuted ? <RepeatIcon /> : <RepeatIcon />}
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Slider
                                className={classes.slider}
                                //value={playbackStates.get(activeEpisode.id)}
                                value={playbackTime}
                                getAriaValueText={
                                    () => ""
                                    //`current time is ${playbackStates.get(activeEpisode.id)} seconds`
                                }
                                aria-labelledby="volume-slider"
                                onChange={handlePlaybackSeek}
                                min={0}
                                step={1}
                                max={activeEpisode.duration}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.dFlex}>
                    <IconButton onClick={handleMuteChange}>{isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}</IconButton>
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
            </div>
        </ThemeProvider>
    );
};

export default App;
