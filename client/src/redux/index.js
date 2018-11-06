import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import songs from './songs.js';
import tracks from './tracks.js';
import song from './song.js';
import auth from './auth.js';

const reducer = combineReducers({
    auth,
    song,
    songs,
    tracks
})

export default createStore (
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

