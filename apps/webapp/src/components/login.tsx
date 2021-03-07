import React from "react";
import GoogleLogin from "react-google-login";
import { Redirect, useHistory } from "react-router-dom";

export default function Login(props) {
    const history = useHistory();

    const handleLogin = async googleData => {
        const res = await fetch("http://localhost:3333/api/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res);
        const data = await res.json();
        props.setUserIsLoggedIn(data.userIsLoggedIn);
        localStorage.setItem("userIsLoggedIn", data.userIsLoggedIn);
        history.push("/search");
    };

    const handleFailure = response => {
        console.log(response);
    };

    return (
        <div>
            {props.userIsLoggedIn ? <Redirect to="/search" /> : null}
            <GoogleLogin
                clientId="384920596947-68g7ga9dfqt43bouolbrtghn45p9g2dt.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={false}
            />
        </div>
    );
}
