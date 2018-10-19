import React from 'react';
import {getTracks, deleteTracks} from './redux/tracks';
import {connect} from 'react-redux';
import play from "./images/play-button.svg";
import {getSongs} from './redux/songs';
import circle from './images/circle.svg';
import './styles/css/trackplayer.css';

class Tracks extends React.Component {
    constructor() {
        super();
        this.state = { loaded: false, play: 'play' };
    };

    componentDidMount() {
        this.props.getTracks();
        if(this.state.loaded) {
            this.audio.addEventListener("timeupdate", () => {
                let ratio = this.audio.currentTime / this.audio.duration;
                let position = (this.timeline.offsetWidth * ratio) + this.timeline.offsetLeft;
                this.positionHandle(position);
            });
        };
    };

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
    };

    mouseUp = (e) => {
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseup', this.mouseUp);
    };

    mouseDown = (e) => {
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
    };

    play = () => {
        let status = this.state.play;
        if(status === 'play') {
            status = 'pause';
            this.audio.play();
        } else {
            status = 'play';
            this.audio.pause();
        }
        this.setState({ play: status })
    };

    handleSubmit = (e, id) => {
        this.props.deleteTracks(id)
    };

    handleClick = (e, id) => {
        this.props.getSongs(id);
        this.setState({
            loaded: true
        })
    };

    SongPlayer = () => {
        return (
            this.props.songs.map(track => (
                <div key={track.trackId} className="player">
                    <div className="container">
                        <div id="buttons" onClick={this.play}> <img className="play-button" alt="play-icon" src={play}/></div>
                    </div>
                    <div className="container" id="center">
                        <p className="info">{track.trackName} <small>by</small> {track.artistName} </p>
                        <audio className="player" ref={(audio) => { this.audio = audio } } >
                            <source src={track.previewUrl}/>
                        </audio>
                        <div>
                            <div id="timeline" onClick={this.mouseMove} ref={(timeline) => { this.timeline = timeline }}>
                                <div id="handle" onMouseDown={this.mouseDown} ref={(handle) => { this.handle = handle }} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <img className="artwork" src={track.artworkUrl100} alt="albumn-cover"/>
                    </div>
                </div>
            ))
        )
    }

    myTracks = () => {
        return (
            this.props.tracks.map(track => (
                <div key={track.id} className="track-container">
                    <form onSubmit={e => this.handleSubmit(e, track._id)}>
                        <div className="track-display" onClick={e => this.handleClick(e, track.id)}>
                            <img id="play-track" src={play} alt="play-icon"/>
                            <div id="track-holder">
                                <div id="track-name">{track.trackName}</div>
                                <div id="track-info"> {track.artist}
                                    <img className="circle" src={circle} alt="circle"/>{track.albumn}
                                </div>
                            </div>
                        </div>
                        <button type="submit" name="submit" id="delete-button">Delete Track</button>
                    </form>
                </div>
            ))
        )
    }

    render() {
        console.log(this.props.tracks)
        return(
            <div>
                <div>
                    {this.myTracks()}
                </div>
                <div id="phantom">
                    <div id="sticky">{this.SongPlayer()}</div>
                </div>
            </div>
        )
    }
}

export default connect(props => props, {getTracks, deleteTracks, getSongs})(Tracks);