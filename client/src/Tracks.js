import React from 'react';
import {getTracks, deleteTracks} from './redux/tracks';
import {connect} from 'react-redux';
import play from "./images/play-button.svg";
import {getSongs} from './redux/songs';
import circle from './images/circle.svg';
import './styles/css/tracks.css';

class Tracks extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            play: 'play',
            index: [],
            isPlaying: false,
            currentIndex: 0,
            currentId: ''
        };
    };

    componentDidMount() {
        this.props.getTracks();
        if(this.state.loaded) {
            this.audio.addEventListener("timeupdate", () => {
                let ratio = this.audio.currentTime / this.audio.duration;
                let position = (this.timeline.offsetWidth * ratio) + this.timeline.offsetLeft;
                this.positionHandle(position);
            });
        }
    };
    componentDidUpdate() {
        this.props.tracks.map(track => {
            if(!this.state.index.includes(track.id)) {
                this.setState({
                    index: [...this.state.index, track.id]
                })
            }
        });
    }

    handleSubmit = (e, id) => {
        this.props.deleteTracks(id)
    };


    handleClick = (e, id) => {
        this.props.getSongs(id);
        this.setState({
            loaded: true
        });
        let length = this.state.index.length;
        let index = this.state.index;
        console.log(index);
        for(var i = 0; i < length; i++) {
            if(index[i] === id) {
                this.setState({
                    currentIndex: i,
                    currentId: id
                })
            }
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

    play = () => {
        if(this.state.play === 'play') {
            if(this.state.isPlaying) {
                this.audio.pause();
                this.setState({isPlaying: false})
            }
            this.setState({play: 'pause', isPlaying: true});
            this.audio.play();
        }
        else {
            this.setState({play: 'play', isPlaying: false});
            this.audio.pause();
        }
    };

    next = () => {
        let length = this.state.index.length;
        let currentId = this.state.currentId;
        let index = this.state.index;
        for (var i = 0; i < length; i++) {
            if (currentId === index[i]) {
                return (
                    this.setState({
                        currentId: index[i - 1],
                        currentIndex: i - 1
                    }))
            }
        };
    };

    SongPlayer = () => {
        return (
            this.props.songs.map(track => (
                <div key={track.trackId} className="player">
                    <div className="container">
                        <div id="buttons" onClick={this.play}> <img className="play-button" alt="play-icon" src={play}/></div>
                        <button id="next-button" onClick={this.next()}>Next</button>
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
    };

    myTracks = () => {
        return (
            this.props.tracks.map(track => (
                <div key={track.id} className="track-container">
                    <form onSubmit={e => this.handleSubmit(e, track._id)}>
                        <div className="track-display" onClick={e => this.handleClick(e, track.id)}>
                            <img id="play-icon" src={play} alt="play-icon"/>
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
    };

    render(){
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