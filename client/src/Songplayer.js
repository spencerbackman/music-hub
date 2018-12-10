import React from 'react';
import Player from './Player'
import {connect} from 'react-redux';
import play from "./images/play-button.svg";
import circle from "./images/circle.svg";
import AddSong from './AddSong';
import {getSongById} from './redux/song';

class Songplayer extends React.Component{
    constructor() {
        super();
        this.state = {
          clicked: false
       }
    };
    handleClick = (e, id) => {
        e.preventDefault();
        this.props.getSongById(id);
        this.setState({clicked: true})
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
        return (
            <div id="player-page">
                <div className="song-search-container">
                    {this.songs()}
                </div>
                <div className="phantom">
                    <div className="sticky">
                        {this.state.clicked
                        ? this.props.song.map(track => (
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

export default connect(state => state, {getSongById})(Songplayer);
