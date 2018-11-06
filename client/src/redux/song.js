import axios from 'axios';
const songAxios = axios.create();

songAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

let config = {
    headers: {
        "Acess-Control-Allow-Origin": "https://mymusichub.herokuapp.com"
    }
}


export function getSongById(id) {
    return dispatch => {
        songAxios.get('https://itunes.apple.com/lookup?id=' + id, config)
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