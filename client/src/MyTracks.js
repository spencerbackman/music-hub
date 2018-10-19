import React from 'react';
import {connect} from 'react-redux';
import play from './images/play-button.svg';
import circle from './images/circle.svg';
import {deleteTracks} from './redux/tracks';
import {getSongs} from './redux/songs';
import {StickyContainer, Sticky} from 'react-sticky';

class MyTracks extends React.Component {
    constructor() {
        super();
        this.state = { loaded: false, data: [], play: 'play' };
    };

    componentDidMount() {
        if(this.state.loaded) {
            this.audio.addEventListener("timeupdate", () => {
                let ratio = this.audio.currentTime / this.audio.duration;
                let position = (this.timeline.offsetWidth * ratio) + this.timeline.offsetLeft;
                this.positionHandle(position);
            });
        }
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
        )))
    }

    render() {
        return (
            <StickyContainer id="sticky">
                <div className="track-container">
                    <form onSubmit={e => this.handleSubmit(e, this.props.id)}>
                        <div className="track-display" onClick={e => this.handleClick(e, this.props.trackId)}>
                            <img id="play-track" src={play} alt="play-icon"/>
                            <div id="track-holder">
                                <div id="track-name">{this.props.track}</div>
                                <div id="track-info"> {this.props.artist}
                                    <img className="circle" src={circle} alt="circle"/>{this.props.albumn}
                                </div>
                            </div>
                        </div>
                        <button type="submit" name="submit" id="delete-button">Delete Track</button>
                    </form>
                </div>
                <Sticky className='my-tracks'>
                    {({
                          style
                      }) => (
                        <header style={style}>
                            {this.SongPlayer()}
                        </header>
                    )}
                </Sticky>
            </StickyContainer>
        )
    }
}

export default connect(state => state, {deleteTracks, getSongs})(MyTracks);