import axios from 'axios';

// export function getSongById(id) {
//     return dispatch => {
//         axios({
//             method: 'get',
//             url: `https://itunes.apple.com/search?term${id}&limit=10`,
//             header: {
//                 'Access-Control-Allow-Origin': 'https://mymusichub.herokuapp.com'
//             }
//         }).then(response => {
//             dispatch({
//                 type: 'GET_SONG_BY_ID',
//                 song: response.data.results
//             })
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }

export function getSongById(id) {
    return dispatch => {
        axios.get('https://itunes.apple.com/lookup?id=' + id + '&limit=1', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
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