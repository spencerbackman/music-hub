import React from 'react';
import Player from './Player'
import {connect} from 'react-redux';
import {getSongById} from './redux/song';

class Songplayer extends React.Component{
    componentDidMount() {
        this.props.getSongById(this.props.id)
    }
    render() {
        return (
            <div id="player-page">
                {this.props.song.filter(track => track.trackId === this.props.id).map(track =>
                        <Player key={track.trackId} id={track.trackId} artistname={track.artistName}
                                trackname={track.trackName} previewurl={track.previewUrl} artworkurl={track.artworkUrl60}/>
                    )
                }
            </div>
        )
    }
}

export default connect(state => state, {getSongById})(Songplayer);