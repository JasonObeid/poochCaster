import { Podcaster } from "@poochCaster/models";

function getImage(artworkURI: string, imageURI: string) {
    if (imageURI !== "" && imageURI !== null) {
        return imageURI;
    }
    return artworkURI;
}

async function returnCall(endpoint: string) {
    const url = `http://127.0.0.1:3333/api/${endpoint}`;
    try {
        const response = await fetch(url, { mode: "cors" });
        console.log(response);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}
async function returnPost(endpoint: string, body: any) {
    const url = `http://127.0.0.1:3333/api/${endpoint}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        console.log(response);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

async function returnPut(endpoint: string, body: any) {
    const url = `http://127.0.0.1:3333/api/${endpoint}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

async function getPodcaster(uuid: string) {
    const response = await returnCall(`podcasters/${uuid}`);
    return response;
}
async function postPodcaster(podcaster: Podcaster) {
    const response = await returnPost(`podcasters`, podcaster);
    return response;
}
async function putPodcaster(podcaster: Podcaster) {
    const response = await returnPut(`podcasters/${podcaster.id}`, podcaster);
    return response;
}
export { returnCall, returnPost, getPodcaster, postPodcaster, putPodcaster, getImage };
