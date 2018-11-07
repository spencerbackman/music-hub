import React from 'react';
import {connect} from 'react-redux';
import {getTracks} from './redux/tracks';
import {getSongs} from './redux/songs';
import play from "./images/play-button.svg";
import pause from './images/pause-button.svg';
import prev from './images/left-arrow.svg';
import next from './images/right-arrow.svg';
import './styles/libraryPlayer.css';

class TrackPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            play: false
        }
    }
    componentWillReceiveProps() {
        this.setState({
            play: true
        })
    }

    componentDidUpdate() {
        let audio = document.getElementById("libAudio")
        audio.addEventListener("play" && "timeupdate", () => {
            this.timeUpdate()
        })
    }

    timeUpdate = () => {
        if(this.audio) {
            let audio = document.getElementById('libAudio')
            let seekslider = document.getElementById('libSlider');
            let currentTime = document.getElementById("libCurrent");
            let totalTime = document.getElementById("libTotal");
            let nt = ((audio.currentTime * 100) / audio.duration);
            seekslider.value = nt;
            let curmins = Math.floor(audio.currentTime / 60);
            let cursecs = Math.floor(audio.currentTime - curmins * 60);
            let durmins = Math.floor(audio.duration / 60);
            let dursecs = Math.floor(audio.duration - durmins * 60);
            if(cursecs < 10) { cursecs = "0" + cursecs; }
            if(dursecs < 10) { dursecs = "0" + dursecs; }
            if(curmins < 10) { curmins = "0" + curmins; }
            if(durmins < 10) { durmins = "0" + durmins; }
            currentTime.innerHTML = curmins + ":" + cursecs;
            totalTime.innerHTML = durmins + ":" + dursecs;
        }
    };
    play = () => {
        if(this.audio.paused) {
            this.audio.play();
            this.setState({ play: true });
        } else {
            this.audio.pause();
            this.setState({ play: false })
        }
    };
    prev = (e, id) => {
        let index = this.props.index;
        for(let i = 0; i < index.length; i++) {
            let num = (i - 1);
            if(num < 0){ num = index.length -1 }
            const newId = index[num];
            if(id === index[i]) {
                this.audio.pause();
                this.setState({ play: false });
                this.props.getSongs(newId);
            }
        }
    }
    next = (e, id) => {
        let index = this.props.index;
        for(let i = 0; i < index.length; i++) {
            let num = (i + 1);
            if(num > (index.length - 1)) { num = 0 }
            const newId = index[num];
            if(id === index[i]) {
                this.audio.pause();
                this.setState({ play: false });
                this.props.getSongs(newId)
            }
        }
    }
    handlePlay= () => {
        this.setState({
            play: true
        })
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="library-player">
                    <div className="lib-player">
                        <audio id="libAudio" ref={audio => {this.audio = audio}} onPlay={this.handlePlay} autoPlay>
                            <source src={this.props.preview}/>
                        </audio>
                        <div className="art-container">
                            <img className="lib-artwork" src={this.props.artwork} alt="albumn-artwork"/>
                        </div>
                        <div className="lib-info-container">
                            <p className="lib-track">{this.props.track}</p>
                            <p className="lib-artist">{this.props.artist}</p>
                        </div>
                        <div className="lib-button-container">
                            <div onClick={e => this.prev(e, this.props.id)}>
                                <img src={prev} className="prev-icon" alt="prev-arrow"/>
                            </div>
                            <div onClick={this.play} className="lib-play-pause">
                                {this.state.play
                                ? <img src={pause} alt="pause-icon" className="lib-pause"/>
                                : <img src={play} alt="play-icon" className="lib-play"/> }
                            </div>
                            <div onClick={e => this.next(e, this.props.id)}>
                                <img src={next} className="next-icon" alt="next-arrow"/>
                            </div>
                        </div>
                        <div className="lib-slider-time">
                            <input type="range" id="libSlider" min="0" max="100" defaultValue="0" step="1" readOnly={true}/>
                            <span id="libCurrent">00:00</span><span id="libTotal">00:00</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, {getTracks, getSongs})(TrackPlayer);