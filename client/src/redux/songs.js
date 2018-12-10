import axios from 'axios';

export function searchSongs(name) {
    return dispatch => {
        axios.get(`https://itunes.apple.com/search?term=${name}&enity=music&limit=10`, {
            method: 'get',
            proxy: false,
            maxRedirects: 1,
            host: 'localhost:4000',
            Accept: 'application/json',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Custom-Header, Upgrade-Insecure-Requests"
            }
            })
            .then(response => {
                dispatch({
                    type: 'SEARCH_SONGS',
                    songList: response.data.results
                })
            }).catch(err => {
                console.log(err);
        })
    }
}

export function getSongs(id) {
    return dispatch => {
        axios.get(`https://itunes.apple.com/lookup?id=${id}&entity=song&limit=1`, {
            method: 'get',
            maxRedirects: 10,
            proxy: false,
            host: 'localhost:4000',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Custom-Header, Upgrade-Insecure-Requests"
            },
        })
        .then(response => {
                dispatch({
                    type: 'GET_SONGS',
                    songs: response.data.results
                })
            })
    }
}

const initialSongs = [];

export default function reducer(songs = initialSongs, action) {
    switch (action.type) {
        case 'GET_SONGS':
            return action.songs;
        case 'SEARCH_SONGS':
            return action.songList;
        default: 
            return songs
    }
}