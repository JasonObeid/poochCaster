import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";

import { returnCall } from "./helper-functions";
import SearchResult from "./search-result";

export default function Search(props) {
    async function fetchData() {
        const searchResults = await returnCall(`api/search/${props.searchText}`);
        props.setSearchResults(searchResults.feeds);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchText(event.target.value);
    };

    return (
        <div>
            <TextField
                id="standard-search"
                label="Search field"
                type="search"
                value={props.searchText}
                onChange={handleChange}
            />
            <Button variant="contained" color="primary" startIcon={<SearchIcon />} onClick={fetchData}>
                Search
            </Button>

            <Grid container spacing={3} direction="column" alignItems="stretch">
                {props.searchResults.map(searchResult => (
                    <Grid item key={searchResult.id}>
                        <SearchResult
                            podcast={searchResult}
                            subscriptions={props.subscriptions}
                            setSubscriptions={props.setSubscriptions}
                            uuid={props.uuid}
                            playbackStates={props.playbackStates}
                            updatePodcasterSubscription={props.updatePodcasterSubscription}
                            activeEpisode={props.activeEpisode}
                        ></SearchResult>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
