import React from 'react';
import Songsearch from './Songsearch';
import "./styles/css/home.css";

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div id="home-header"><h1>Music Hub</h1></div>
                <Songsearch id="song-search"/>
            </div>
        )
    }
}

export default Home;