import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import { useAppStyles } from "../app/app.styles";
import { returnCall } from "./helper-functions";
import Podcast from "./podcast";

function Search(props) {
    const history = useHistory();
    const classes = useAppStyles();
    const params = useParams();

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        console.log(params);
        if (params.hasOwnProperty("term")) {
            if (params.term !== "") {
                if (params.term !== searchText) {
                    console.log(params.term);
                    const initialText = params.term;
                    fetchData(initialText);
                    setSearchText(initialText);
                }
            }
        }
    }, []);

    async function fetchData(text = searchText) {
        history.push(`/search/${searchText}`);
        const searchResults = await returnCall(`api/search/${text}`);
        props.setSearchResults(searchResults.feeds);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <Grid container spacing={3} alignItems="stretch" justifyContent="center">
                <Grid item xs>
                    <TextField
                        id="standard-search"
                        label="Search"
                        type="search"
                        value={searchText}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs>
                    <Button variant="contained" color="primary" startIcon={<SearchIcon />} onClick={() => fetchData()}>
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} direction="column" alignItems="stretch">
                {props.searchResults.map(searchResult => (
                    <Grid item key={searchResult.id}>
                        <Podcast
                            podcast={searchResult}
                            subscriptions={props.subscriptions}
                            setSubscriptions={props.setSubscriptions}
                            uuid={props.uuid}
                            playbackStates={props.playbackStates}
                            updatePodcasterSubscription={props.updatePodcasterSubscription}
                            activeEpisode={props.activeEpisode}
                        ></Podcast>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default React.memo(Search);
