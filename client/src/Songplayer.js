import React from 'react';
import './styles/css/songPlayer.css';
import {addTrack} from './redux/tracks';
import {connect} from 'react-redux';
import play from './images/play-button.svg';

class Songplayer extends React.Component{
    constructor() {
        super()
        this.state = {
            play: false
        }
    }
    componentDidMount() {
        this.props.addTrack();
        this.audio.addEventListener("timeupdate", () => {
            let ratio = this.audio.currentTime / this.audio.duration;
            let position = (this.timeline.offsetWidth * ratio) + this.timeline.offsetLeft;
            this.positionHandle(position);
          });
    }
    handleSubmit = (e, track, artist, albumn, id) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const newTrack = {
            trackName: track,
            artist: artist,
            albumn: albumn,
            id: id
        }
        this.props.addTrack(newTrack)
    }

    positionHandle = (position) => {
        let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
        let handleLeft = position - this.timeline.offsetLeft;
        if (handleLeft >= 0 && handleLeft <= timelineWidth) {
            this.handle.style.marginLeft = handleLeft + "px";
        }
        if (handleLeft < 0) {
            this.handle.style.marginLeft = "0px";
        }
        if (handleLeft > timelineWidth) {
            this.handle.style.marginLeft = timelineWidth + "px";
        }
    };

    mouseMove = (e) => {
        this.positionHandle(e.pageX);
        this.audio.currentTime = ((e.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) * this.audio.duration;
    }

    mouseUp = (e) => {
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseup', this.mouseUp);
    };

    mouseDown = (e) => {
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
    };

    play = () => {
        if(this.state.play) {
            this.setState({ play: false });
            this.audio.pause();
        } else {
            this.setState({ play: true });
            this.audio.play();
        }
    }

    render() {
        return (
            <div id="player-page">
                <form className="add-form" onSubmit={e => this.handleSubmit(e, this.props.track, this.props.artist, this.props.albumn, this.props.id)}>
                    <div className="song-player">
                        <div className="song-container">
                            <div id="button" onClick={this.play}>
                                 <img className="play-song" alt="play" src={play}/>
                            </div>
                            <button type="submit" id="add-button" value="submit">Add Song</button>
                        </div>
                        <div className="song-container" id="middle">
                            <p className="info">{this.props.track} <small>by</small> {this.props.artist} </p>
                            <audio className="audio-player" ref={(audio) => { this.audio = audio } } >
                                <source src={this.props.preview}/>
                            </audio>
                            <div>
                                <div id="song-timeline" onClick={this.mouseMove} ref={(timeline) => { this.timeline = timeline }}>
                                    <div id="song-handle" onMouseDown={this.mouseDown} ref={(handle) => { this.handle = handle }} />
                                </div>
                            </div>
                        </div>
                        <div className="song-container">
                            <img className="song-artwork" src={this.props.artwork} alt="albumn-cover"/>
                        </div>
                    </div> 
                </form>
            </div>
        )
    }
}

export default connect(null, {addTrack})(Songplayer);
