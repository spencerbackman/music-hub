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
        if(this.state.playlist !== '') {
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

    render() {
        return (
            <div>
                {!this.state.isHidden
                ?<div id="add-song-toggle" onClick={this.toggle}>...</div>
                :null}
                <div className="select-menu">
                    {this.state.isHidden
                        ?<form onSubmit={e => this.handleSubmit(e, this.props.track, this.props.artist, this.props.albumn, this.props.id)}>
                            <select name="playlist" id="addSongOptions" value={this.state.playlist} onChange={this.handleChange}>
                                <option value="">My Music</option>
                                {this.state.names.map(name => 
                                    <option value={name}>{name} </option>
                                )}
                            </select>
                            <br/>
                            <input name="newPlaylist" type="text" className="new-playlist-input" placeholder="New Playlist" value={this.state.newPlaylist} onChange={this.handleChange}/>                            
                            <button value="submit" id="add-song-button">Add Song</button>
                        </form>
                    :null}
                </div>
                </div>
        )
    }
}

export default connect(state => state, {addTrack, getTracks})(AddSong);