import React from 'react';
import {connect} from 'react-redux';
import {getTracks} from './redux/tracks';
import {getSongs} from './redux/songs';
import play from "./images/play-button.svg";
import pause from './images/pause-button.svg';
import prev from './images/left-arrow.svg';
import next from './images/right-arrow.svg';
import './styles/libraryPlayer.css';

class LibraryPlayer extends React.Component {
    constructor() {
        super();
        this.state = {
            play: false,
            index: [],
            playlist: ''
        }
    }

    componentDidMount() {
        this.props.getTracks()
        this.props.getSongs(this.props.id)
    }

    componentWillReceiveProps() {
        this.setState({
            play: true
        })
    }

    componentDidUpdate() {
        if(this.state.play) {
            let audio = document.getElementById("libAudio")
            audio.addEventListener("play" && "timeupdate", () => {
                this.timeUpdate()
            }, false)
        }
        this.getIds();
    };

    getIds = () => {
        if(this.props.name !== 'allSongs') {
        this.props.tracks.filter(track => track.name === this.props.name).map(track => {
            if(!this.state.index.includes(track.id)) {
                this.setState({
                    index: [...this.state.index, track.id]
                })
            }
        })
    } else {
            this.props.tracks.map(track => {
                if(!this.state.index.includes(track.id)) {
                    this.setState({
                        index: [...this.state.index, track.id]
                    })
                }
            })
        }
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
        const audio = this.audio;
        if(audio.paused) {
            audio.play();
            this.setState({ play: true });
        } else {
            audio.pause();
            this.setState({ play: false })
        }
    };

    next = (e, id) => {
        let index = this.state.index;
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

    prev = (e, id) => {
        let index = this.state.index;
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

    render() {
        return (
            <div>
                {this.props.songs.map(track => (
                    <div key={track.trackName} className="library-player">
                    <div className="lib-player">
                        <audio id="libAudio" ref={(audio) => {this.audio = audio}} autoPlay>
                            <source src={track.previewUrl}/>
                        </audio>
                        <div className="art-container">
                            <img className="lib-artwork" src={track.artworkUrl60} alt="albumn-artwork"/>
                        </div>
                        <div className="lib-info-container">
                            <p className="lib-track">{track.trackName}</p>
                            <p className="lib-artist">{track.artistName}</p>
                        </div>
                        <div className="lib-button-container">
                            <div onClick={e => this.prev(e, track.trackId)}>
                                <img src={prev} className="prev-icon" alt="prev-arrow"/>
                            </div>
                            <div onClick={this.play} className="lib-play-pause">
                                {this.state.play
                                ? <img src={pause} alt="pause-icon" className="lib-pause"/>
                                : <img src={play} alt="play-icon" className="lib-play"/> }
                            </div>
                            <div onClick={e => this.next(e, track.trackId)}>
                                <img src={next} className="next-icon" alt="next-arrow"/>
                            </div>
                        </div>
                        <div className="lib-slider-time">
                            <input type="range" id="libSlider" min="0" max="100" defaultValue="0" step="1" readOnly={true}/>
                            <span id="libCurrent">00:00</span><span id="libTotal">00:00</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        )
    }
}

export default connect(state => state, {getTracks, getSongs})(LibraryPlayer);