import axios from 'axios';
const trackAxios = axios.create();

trackAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export function getTracks() {
    return dispatch => {
        trackAxios.get('/tracks').then(response => {
            dispatch({
                type: 'GET_TRACKS',
                tracks: response.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function addTrack(newTrack) {
    return dispatch => {
        trackAxios.post('/tracks', newTrack).then(response => {
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
        case "GET_TRACKS":
            return action.tracks;
        case "DELETE_TRACK":
            return tracks.filter(track => track._id !== action.id);
        default:
            return tracks
    }
}