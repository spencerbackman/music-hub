import React from 'react';
import {connect} from 'react-redux';
import {getTracks} from './redux/tracks';
import {getSongs} from './redux/songs';
import './styles/libraryPlayer.css';
import TrackPlayer from './TrackPlayer';

class LibraryPlayer extends React.Component {
    constructor() {
        super();
        this.state = {
            play: false,
            index: [],
            data: []
        }
    }
    componentDidMount() {
        this.props.getTracks();
        this.props.getSongs(this.props.id);
    }
    componentDidUpdate() {
        if(this.props.name !== 'allSongs') {
            this.props.tracks.filter(track => track.name === this.props.name).map(track => {
                if(!this.state.index.includes(track.id)) {
                    this.setState({
                        index: [track.id, ...this.state.index]
                    })
                }
            })
        } else {
            this.props.tracks.map(track => {
                if(!this.state.index.includes(track.id)) {
                    this.setState({
                        index: [track.id, ...this.state.index]
                    })
                }
            })
        }
    };
    render() {
        return (
            <div>
                {this.props.songs.map(track => (
                    <TrackPlayer key={track.trackId} id={track.trackId} name={this.props.name}
                    track={track.trackName} artist={track.artistName} albumn={track.collectionName}
                    preview={track.previewUrl} artwork={track.artworkUrl60} index={this.state.index}
                    />
                ))}
            </div>
        )
    }
}

export default connect(state => state, {getTracks, getSongs})(LibraryPlayer);