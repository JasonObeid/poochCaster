import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";

import { returnCall } from "./helper-functions";
import Subscription from "./subscription";

export default function Subscriptions(props) {
    async function fetchData() {
        const searchResults = await returnCall(`api/search/${props.searchText}`);
        props.setSearchResults(searchResults.feeds);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //props.setSearchText(event.target.value);
    };
    return (
        <Grid container spacing={3} direction="column" alignItems="stretch">
            {props.subscriptionDetails.map(subscription => (
                <Grid item key={subscription.id}>
                    <Subscription
                        podcast={subscription}
                        uuid={props.uuid}
                        playbackStates={props.playbackStates}
                        updatePodcasterSubscription={props.updatePodcasterSubscription}
                        subscriptions={props.subscriptions}
                        setSubscriptions={props.setSubscriptions}
                    ></Subscription>
                </Grid>
            ))}
        </Grid>
    );
}
