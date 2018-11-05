import axios from 'axios';

let config = {
    headers: {
        "Acess-Control-Allow-Origin": "https://mymusichub.herokuapp.com"
    }
}


export function getSongById(id) {
    return dispatch => {
        axios.get('https://itunes.apple.com/lookup?id=' + id, config)
            .then(response => {
                dispatch({
                    type: 'GET_SONG_BY_ID',
                    song: response.data.results
                });
            }).catch(err => {
            console.log(err)
        })
    }
}

const initialState = [];

export default function reducer(song = initialState, action) {
    switch (action.type) {
        case 'GET_SONG_BY_ID':
            return action.song;
        default:
            return song
    }
}