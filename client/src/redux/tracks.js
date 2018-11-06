import axios from 'axios';
const trackAxios = axios.create();

trackAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

function setTracks(track) {
    return {
        type: "SET_TRACKS",
        track
    }
}

export function getTracks() {
    return dispatch => {
        trackAxios.get('/tracks').then(response => {
            dispatch(setTracks(response.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export function addTrack(newTrack) {
    return dispatch => {
        trackAxios.post('/tracks', newTrack)
        .then(response => {
            dispatch(getTracks())
        }).catch(err => {
            console.log(err);
        })
    }
}

export function deleteTracks(id) {
    return dispatch => {
        trackAxios.delete('/tracks/' + id).then(response => {
        dispatch(getTracks())
        }).catch(err => {
            console.log(err);
        })
    }
}

const initialTracks = [];

export default function reducer (tracks = initialTracks, action){
    switch(action.type) {
        case "SET_TRACKS":
            return action.tracks;
        default:
            return tracks
    }
}