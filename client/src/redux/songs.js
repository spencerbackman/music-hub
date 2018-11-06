import axios from 'axios';
const songsAxios = axios.create();

songsAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

let config = {
    headers: {
        "Acess-Control-Allow-Origin": "https://mymusichub.herokuapp.com"
    }
}


export function searchSongs(name) {
    return dispatch => {
        songsAxios.get('https://itunes.apple.com/search?term=' + name + '&limit=10', config)
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
        songsAxios.get('https://itunes.apple.com/lookup?id=' + id, config)
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