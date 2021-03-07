import blueGrey from "@material-ui/core/colors/blueGrey";
import teal from "@material-ui/core/colors/teal";
import IconButton from "@material-ui/core/IconButton";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Redirect, Route, BrowserRouter as Router, Switch, useHistory, useParams } from "react-router-dom";

import Feeds from "../components/feeds";
import {
    getImage,
    getPodcaster,
    postPodcaster,
    putPodcaster,
    returnCall,
    returnPost,
} from "../components/helper-functions";
import Login from "../components/login";
import Player from "../components/player";
import Search from "../components/search";
import Sidebar from "../components/sidebar";
import Subscriptions from "../components/subscriptions";
import { useAppStyles } from "./app.styles";

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

export const App = () => {
    const history = useHistory();
    const params = useParams();
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

    const [uuid, setUuid] = React.useState("b630f094-aa91-4df7-a59c-58c37a3c90b0");
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState([]);
    const [feed, setFeed] = useState([]);

    const storage = localStorage.getItem("userIsLoggedIn");
    const initialLogin = storage !== null ? storage : false;
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(initialLogin);

    //search
    const [searchResults, setSearchResults] = useState([]);

    //playback
    const [playbackStates, setPlaybackStates] = useState(new Map<number, number>());
    const [activeEpisode, setActiveEpisode] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    const isInitialMount = useRef(false);

    async function getStoredState() {
        const response = await getPodcaster(uuid);
        console.log(response);
        const newPlaybackStates = JSON.parse(response.playbackStates, reviver);
        console.log(newPlaybackStates);
        setSubscriptions(response.subscriptions);
        setPlaybackStates(newPlaybackStates);
        setActiveEpisode(response.activeEpisode);
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
        //get();
        getStoredState();
    }, []);

    //}, [volume]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            //if (subscriptions.length > 0)
            getSubscriptionsDetails();
            getFeedEpisodes();
        }
        //if (loadCount > 0) {
        //    get();
        //}
        //putPodcaster({ id: "576ebba6-b5d5-48d9-b00a-11b4df7c29f3", subscriptions: [], playbackStates: [] });
        //postPodcaster({ id: "576ebba6-b5d5-48d9-b00a-11b4df7c29f3", subscriptions: [], playbackStates: [] });
    }, [subscriptions]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    {!userIsLoggedIn ? (
                        <React.Fragment>
                            <Switch>
                                <Route exact path="/login">
                                    <Login userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} />
                                </Route>
                            </Switch>
                            <Redirect to="/login" />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Sidebar />
                            <main className={classes.content}>
                                <div className={classes.dInlineFlex}>
                                    <IconButton onClick={() => history.goBack()}>
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                    <IconButton onClick={() => history.goForward()}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                </div>
                                <Switch>
                                    <Route path="/search">
                                        <Search
                                            searchResults={searchResults}
                                            setSearchResults={setSearchResults}
                                            subscriptions={subscriptions}
                                            setSubscriptions={setSubscriptions}
                                        />
                                    </Route>
                                    <Route path="/search/:term">
                                        <Search
                                            searchResults={searchResults}
                                            setSearchResults={setSearchResults}
                                            subscriptions={subscriptions}
                                            setSubscriptions={setSubscriptions}
                                        />
                                    </Route>
                                    <Route exact path="/feeds">
                                        <Feeds
                                            feed={feed}
                                            setFeed={setFeed}
                                            playbackStates={playbackStates}
                                            setIsPlaying={setIsPlaying}
                                            isPlaying={isPlaying}
                                            activeEpisode={activeEpisode}
                                            setActiveEpisode={setActiveEpisode}
                                        />
                                    </Route>
                                    <Route exact path="/subscriptions">
                                        <Subscriptions
                                            subscriptions={subscriptions}
                                            setSubscriptions={setSubscriptions}
                                            subscriptionDetails={subscriptionDetails}
                                            setSubscriptionDetails={setSubscriptionDetails}
                                        />
                                    </Route>
                                    <Route exact path="/settings">
                                        <div></div>
                                    </Route>
                                </Switch>
                            </main>
                            <Player
                                uuid={uuid}
                                playbackStates={playbackStates}
                                activeEpisode={activeEpisode}
                                subscriptions={subscriptions}
                                isPlaying={isPlaying}
                                feed={feed}
                                setPlaybackStates={setPlaybackStates}
                                setActiveEpisode={setActiveEpisode}
                                subscriptionDetails={subscriptionDetails}
                                setIsPlaying={setIsPlaying}
                            ></Player>
                        </React.Fragment>
                    )}
                </div>
            </ThemeProvider>
        </Router>
    );
};

export default React.memo(App);
