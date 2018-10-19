import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import songs from './songs.js';
import tracks from './tracks.js';


const reducer = combineReducers({
    songs,
    tracks
})

export default createStore (
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

