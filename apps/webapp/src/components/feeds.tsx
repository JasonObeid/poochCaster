import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";

import Feed from "./feed";
import { returnCall } from "./helper-functions";

function Feeds(props) {
    async function fetchData() {
        const searchResults = await returnCall(`api/search/${props.searchText}`);
        props.setSearchResults(searchResults.feeds);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //props.setSearchText(event.target.value);
    };
    return (
        <Grid container spacing={3} direction="column" alignItems="stretch">
            {props.feed.slice(10).map(episode => (
                <Grid item xs key={episode.id}>
                    <Feed
                        episode={episode}
                        uuid={props.uuid}
                        playbackStates={props.playbackStates}
                        updatePodcasterSubscription={props.updatePodcasterSubscription}
                        setIsPlaying={props.setIsPlaying}
                        isPlaying={props.isPlaying}
                        activeEpisode={props.activeEpisode}
                        setActiveEpisode={props.setActiveEpisode}
                    ></Feed>
                </Grid>
            ))}
        </Grid>
    );
}

export default React.memo(Feeds);
