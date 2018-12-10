import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import tracks from './tracks.js';
import auth from './auth.js';
import song from './song.js';
import songs from './songs.js';

const reducer = combineReducers({
    song,
    songs,
    auth,
    tracks
})

export default createStore (
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

