import React from 'react';
import {connect} from 'react-redux';
import {addTrack, getTracks} from "./redux/tracks";
import './styles/addSong.css';

class AddSong extends React.Component {
    constructor() {
        super();
        this.state = {
            names: [],
            isHidden: false,
            playlist: '',
            newPlaylist: ''
        }
    }
    componentDidMount() {
        this.props.getTracks();
    }

    componentDidUpdate() {
        this.props.tracks.map(track => {
            if(!this.state.names.includes(track.name) && track.name !== 'allSongs') {
            this.setState({
                names: [...this.state.names, track.name]
            })
        }
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    handleSubmit = (e, track, artist, albumn, id) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var playlist;
        if(this.state.playlist.length > 0) {
            playlist = this.state.playlist
        } else {
            playlist = this.state.newPlaylist
        }
        const newTrack = {
            name: playlist,
            trackName: track,
            artist: artist,
            albumn: albumn,
            id: id
        };
        this.props.addTrack(newTrack)
    };
    toggle = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    selectPlaylist = () => {
        <form onSubmit={e => this.handleSubmit(e, this.props.track, this.props.artist, this.props.albumn, this.props.id)}>
            <select name="playlist" value="" className="playlistOptions" onChange={this.handleChange}>All Songs</select>
            {this.state.names.map(playlist => (
                <select name="playlist" value={playlist} key={playlist} onChange={this.handleChange}>{playlist}</select>
            ))}   
            <input type="text" name="newPlaylist" className="new-playlist-input" placeholder="New Playlist" value={this.state.newPlaylist} onChange={this.handleChange} />     
        </form>
    }

    render() {
        return (
            <div>
                {!this.state.isHidden
                ?<div id="add-song-toggle" onClick={this.toggle}>...</div>
                :null}
                <div className="select-menu">
                    {this.state.isHidden
                    ? {selectPlaylist()}
                    :null}
                </div>
                </div>
        )
    }
}

export default connect(state => state, {addTrack, getTracks})(AddSong);