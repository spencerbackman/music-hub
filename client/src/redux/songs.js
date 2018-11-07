import axios from 'axios';

let instance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': 'https://mymusichub.herokuapp.com'
    }
})

export function searchSongs(name) {
    return dispatch => {
        axios({
            method: 'get',
            url: `https://itunes.apple.com/search?term${name}&limit=10`,
            header: {
                'Access-Control-Allow-Origin': 'https://mymusichub.herokuapp.com'
            }
        }).then(response => {
            dispatch({
                type: 'SEARCH_Songs',
                songList: response.data.results
            })
        })
    }
}

export function getSongs(id) {
    return dispatch => {
        axios({
            method: 'get',
            url: `https://itunes.apple.com/search?term${id}&limit=10`,
            header: {
                'Access-Control-Allow-Origin': 'https://mymusichub.herokuapp.com'
            }
        }).then(response => {
            dispatch({
                type: 'GET_SONGS',
                songs: response.data.results
            })
        })
    }
}

// export function searchSongs(name) {
//     return dispatch => {
//         axios.get('https://itunes.apple.com/search?term=' + name + '&limit=10')
//             .then(response => {
//                 dispatch({
//                     type: 'SEARCH_SONGS',
//                     songList: response.data.results
//                 })
//             }).catch(err => {
//                 console.log(err);
//         })
//     }
// }

// export function getSongs(id) {
//     return dispatch => {
//         axios.get('https://itunes.apple.com/lookup?id=' + id + '&entity=song&limit=1')
//         .then(response => {
//                 dispatch({
//                     type: 'GET_SONGS',
//                     songs: response.data.results
//                 })
//             })
//     }
// }

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