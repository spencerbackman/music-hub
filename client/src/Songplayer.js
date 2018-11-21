import React from 'react';
import Player from './Player'
import {connect} from 'react-redux';
import play from "./images/play-button.svg";
import circle from "./images/circle.svg";
import axios from 'axios';
import AddSong from './AddSong';

class Songplayer extends React.Component{
    constructor() {
        super();
        this.state = {
          clicked: false,
          data: []
       }
    };
    handleClick = (e, id) => {
        e.preventDefault();
        axios.get('https://itunes.apple.com/lookup?id=' + id + '&limit=1', {
            method: 'get',
            maxRedirects: 1,
            proxy: false,
            Accept: 'application/json',
            Origin: 'https://mymusichub.herokuapp.com',
            headers: {
                'Access-Control-Allow-Origin': 'https://mymusichub.herokuapp.com',
                "Access-Control-Allow-Headers": "X-Custom-Header, Upgrade-Insecure-Requests"
            }
        }).then(response => {
            this.setState({
                data: response.data.results,
                clicked: true
            })
        })
    };
    songs = () => {
        return (
            this.props.data.map(track =>
                <div key={track.trackId} >
                    <div className="song-container">
                    <div id="song-display" onClick={e => this.handleClick(e, track.trackId)}>
                        <img className="song-play-icon" src={play} alt="play-icon"/>
                        <div className="song-info-holder">
                            <div id="song-name">{track.trackName}</div>
                            <div className="song-info-holder2">
                                <div id="song-info">{track.artistName}</div>
                                <img id="ball-icon" src={circle} alt="circle-icon"/>
                                <div id="song-albumn">{track.collectionName}</div>
                            </div>
                        </div>
                    </div>
                    <div id="add-song-container">
                        <AddSong key={track.trackId} id={track.trackId} track={track.trackName}
                            artist={track.artistName} albumn={track.collectionName} />
                    </div>
                    </div>
                </div>
            )
        )
    };
    render() {
        console.log(this.state.data)
        return (
            <div id="player-page">
                <div className="song-search-container">
                    {this.songs()}
                </div>
                <div className="phantom">
                    <div className="sticky">
                        {this.state.clicked
                        ? this.state.data.map(track => (
                            <Player key={track.trackId} id={track.trackId} track={track.trackName}
                            artist={track.artistName} artwork={track.artworkUrl60} preview={track.previewUrl}
                            albumn={track.collectionName}/>
                        ))
                        :null}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Songplayer);
