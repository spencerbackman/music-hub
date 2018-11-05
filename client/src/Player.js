import React from 'react';
import pause from "./images/pause-button.svg";
import play from "./images/play-button.svg";
import './styles/css/songPlayer.css';

class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            isPlaying: true,
            index: []
        }
    }

    componentDidMount() {
        let audio = document.getElementById("audio-player");
        audio.addEventListener("play" && 'timeupdate', () => {
            this.updateTime();
            }, false);
    };

    updateTime = () => {
        if(this.audio) {
            let audio = document.getElementById('audio-player');
            let slider = document.getElementById('slider');
            let current = document.getElementById("current");
            let total = document.getElementById("total");
            let nt = ((audio.currentTime * 100) / audio.duration);
            slider.value = nt;
            let curmins = Math.floor(audio.currentTime / 60);
            let cursecs = Math.floor(audio.currentTime - curmins * 60);
            let durmins = Math.floor(audio.duration / 60);
            let dursecs = Math.floor(audio.duration - durmins * 60);
            if (cursecs < 10) {
                cursecs = "0" + cursecs;
            }
            if (dursecs < 10) {
                dursecs = "0" + dursecs;
            }
            if (curmins < 10) {
                curmins = "0" + curmins;
            }
            if (durmins < 10) {
                durmins = "0" + durmins;
            }
            current.innerHTML = curmins + ":" + cursecs;
            total.innerHTML = durmins + ":" + dursecs;
        }
    };

    playing = () => {
        let audio = document.getElementById("audio-player");
        audio.addEventListener("timeupdate", () => {
            this.updateTime();
        }, false)
    };

    play = () => {
        const audio = this.audio;
        if(audio.paused) {
            audio.play();
            this.setState({ isPlaying: true });
        } else {
            audio.pause();
            this.setState({ isPlaying: false });
        }
    };

    playSong = () => {
        return (
        <div className="song-player">
            <audio className="audio-player" id="audio-player" ref={(audio) => { this.audio = audio }} autoPlay>
                <source src={this.props.previewurl}/>
            </audio>
            <div className="info-artwork-container">
                <div id="song-artwork-container">
                    <img className="song-artwork" src={this.props.artworkurl} alt="albumn-cover"/>
                </div>
                <div className="song-container" id="song-info-container">
                    <p className="song-info1">{this.props.trackname} </p>
                    <p className="song-info2"> {this.props.artistname} </p>
                </div>
            </div>
            <div className="icon-time-container">
                <div id="icons" onClick={this.play}>
                    {this.state.isPlaying
                    ?<img className="song-pause-button" alt="pause-icon" src={pause}/>
                    :<img className="song-play-button" alt="play-icon" src={play}/>}
                </div>
                <div className="slider-time-container">
                    <input id="slider" type="range" min="0" max="100" value="0" step="1" readOnly={true}/>
                    <div className="time-container">
                        <span id="current">00:00</span><span id="total">00:00</span>
                    </div>
                </div>
            </div>
        </div>
        )
    };

    render() {
        console.log(this.props)
        return(
            <div>
                {this.playSong()}
            </div>
        )
    }
}

export default Player;