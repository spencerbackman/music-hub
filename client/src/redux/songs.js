import axios from 'axios';

const url = 'https://itunes.apple.com/lookup?id=';

export function getSongs(id) {
    return dispatch => {
        axios.get(url + id)
        .then(response => {
            dispatch({
                type: 'GET_SONGS',
                songs: response.data.results
            });
        }).catch(err => {
            console.log(err)
        })
    }
}

const initialSongs = [];

export default function reducer(songs = initialSongs, action) {
    switch (action.type) {
        case 'GET_SONGS':
            return action.songs
        default: 
            return songs
    }
}