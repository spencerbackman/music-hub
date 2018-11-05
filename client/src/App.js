import React from 'react';
import Songsearch from './Songsearch';
import Navbar from './Navbar';
import Library from './Library';
import { Switch, Route } from 'react-router-dom';
import './styles/css/app.css';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Switch>
                <Route exact path="/" component={Songsearch}/>
                <Route path="/playlists" component={Library} />
            </Switch>
        </div>
    )
}

export default App;