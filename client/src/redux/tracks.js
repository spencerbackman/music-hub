import axios from 'axios';

let config = {
    headers: {
        "Acess-Control-Allow-Origin": "https://mymusichub.herokuapp.com"
    }
}

export function getTracks() {
    return dispatch => {
        axios.get('/tracks', config).then(response => {
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
        axios.post('/tracks', newTrack, config).then(response => {
            dispatch(getTracks())
        }).catch(err => {
            console.log(err);
        })
    }
}

export function deleteTracks(id) {
    return dispatch => {
        axios.delete('/tracks/' + id, config).then(response => {
        dispatch({ type: "DELETE_TRACK", id })
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