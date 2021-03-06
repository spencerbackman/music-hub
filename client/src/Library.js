import React from 'react';
import {connect} from 'react-redux';
import {getTracks, deleteTracks} from './redux/tracks';
import './styles/library.css';
import play from "./images/play-button.svg";
import circle from "./images/circle.svg";
import LibraryPlayer from './LibraryPlayer';

class Library extends React.Component {
    constructor() {
        super();
        this.state = {
            playlists: [],
            selected: '',
            allSongs: false,
            showPlaylist: false,
            songPlayer: false,
            current: ''
        }
    }
    componentDidMount() {
        this.props.getTracks()
    }
    componentDidUpdate() {
        this.props.tracks.map(track => {
            if(!this.state.playlists.includes(track.name) && track.name !== "allSongs") {
                this.setState({
                    playlists: [track.name, ...this.state.playlists]
                })
            }
        })
    }
    onClick = (e, name) => {
        if(name === 'allSongs') {
            this.setState({
                allSongs: true, 
                selected: 'allSongs',
                showPlaylist: false
            })
        } else {
            this.setState({
                allSongs: false, 
                selected: name,
                showPlaylist: true
            })
        }
    }
    handleSubmit = (e, id) => {
        this.props.deleteTracks(id)
    };
    handleClick = (e, id) => {
        if(this.state.allSongs) {
            this.setState({clicked: true, current: id, showAll: true, songPlayer: true})
        } else {
            this.setState({clicked: true, current: id, showAll: false, songPlayer: true})
        }
    }
    playlist = () => {
        return this.props.tracks.filter(song => song.name === this.state.selected).map(track => (
            <div key={track._id}>
                <form onSubmit={e => this.handleSubmit(e, track._id)}>
                    <div className="playlist-display" onClick={e => this.handleClick(e, track.id)}>
                        <img src={play} className="play-button" alt="play-icon"/>
                        <div className="lib-info-container">
                            <div className="song-title">{track.trackName}</div>
                            <div className="lib-info-holder">
                                <div className="song-artist">{track.artist}</div>
                                <img className="cir" src={circle} alt="circle-icon"/>
                                <div className="song-collection">{track.albumn}</div>
                            </div>
                        </div>
                        <button className="delete-but">Delete Track</button>
                    </div>
                </form>
            </div> 
        ))
    }
    showAll = () => {
        return this.props.tracks.map(track => (
            <div key={track._id}>
                <form onSubmit={e => this.handleSubmit(e, track._id)}>
                    <div className="playlist-display" onClick={e => this.handleClick(e, track.id)}>
                        <img src={play} className="play-button" alt="play-icon"/>
                        <div className="lib-info-container">
                            <div className="song-title">{track.trackName}</div>
                            <div className="lib-info-holder">
                                <div className="song-artist">{track.artist}</div>
                                <img className="cir" src={circle} alt="circle-icon"/>
                                <div className="song-collection">{track.albumn}</div>
                            </div>
                        </div>
                        <button className="delete-but">Delete Track</button>
                    </div> 
                </form>
            </div>
        ))
    }
    render() {
        return (
            <div className="library-page">
                <div className="playlist-nav">
                    <a onClick={e => this.onClick(e, 'allSongs')} className="playlist-header1" href="#allSongs"> all songs </a>
                    {this.state.playlists.map((name) => 
                            <a key={name} onClick={e => this.onClick(e, name)} className="playlist-header" href={`#${name}`}> {name} </a>
                    )}
                </div>
                {this.state.allSongs
                ?<div className="playlist-container">{this.showAll()}</div>
                : null}
                {this.state.showPlaylist
                ? <div className="playlist-container">{this.playlist()}</div>
                : null}
                <div className="phant">
                    <div className="stick">
                        {this.state.songPlayer
                        ? <LibraryPlayer  key={this.state.current} id={this.state.current} name={this.state.selected} />
                        :null}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, {getTracks, deleteTracks})(Library);