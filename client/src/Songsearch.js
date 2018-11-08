import React from 'react';
import Songplayer from './Songplayer';
import AddSong from './AddSong';
import './styles/songSearch.css';
import {connect} from 'react-redux';
import {getTracks} from './redux/tracks';
import {searchSongs, getSongs} from "./redux/songs";
import {getSongById} from "./redux/song";
import play from "./images/play-button.svg";
import circle from "./images/circle.svg";

class Songsearch extends React.Component {
    constructor() {
        super();
        this.state = {
            term: '',
            clicked: false,
            songId: ''
        }
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchSongs(this.state.term);
        this.setState({ term: '' })
    }

    handleClick = (e, id) => {
        e.preventDefault();
        this.setState({
            clicked: true,
            songId: id
        })
    };

    songs = () => {
        return (
            this.props.songs.map(track => 
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
            <div className="search-page">
                <form className="search-form" onSubmit={ this.handleSubmit }>
                    <input
                    type="text"
                    name="term"
                    value= { this.state.term }
                    placeholder="  Search..."
                    onChange={ this.handleChange }
                    id="search"
                    autoComplete="off"
                    list="autocompleteoff"
                    />
                </form>
                <div className="song-search-container">
                    {this.songs()}
                </div>
                <div className="phantom">
                    <div className="sticky">
                        {this.state.clicked
                        ? <Songplayer key={this.state.songId} id={this.state.songId} />
                        :null}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, {searchSongs, getSongById, getTracks, getSongs})(Songsearch);