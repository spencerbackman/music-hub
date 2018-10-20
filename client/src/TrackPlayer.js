import React from 'react';
import play from "./images/play-button.svg";
import {getTracks} from './redux/tracks';
import {connect} from 'react-redux';



class TrackPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            play: 'play',
            index: []
        }
    }

    componentDidMount() {
        this.props.getTracks();

    }

    getIndex = () => {
        this.props.tracks.map(track => {
            if(!this.state.index.includes(track.id)) {
                this.setState({
                    index: [...this.state.index, track.id]
                })
            }
        })
    };





    render() {
        this.getIndex();
        return(
            <div className="track-player">
                <div className="player">
                    <div className="container">
                        <div id="buttons" onClick={this.play}> <img className="play-button" alt="play-icon" src={play}/></div>
                    </div>
                    <div className="container" id="center">
                        <p className="info">{this.props.track} <small>by</small> {this.props.artist} </p>
                        <audio className="player" ref={(audio) => { this.audio = audio } } >
                            <source src={this.props.preview}/>
                        </audio>
                        <div>
                            <div id="timeline" onClick={this.mouseMove} ref={(timeline) => { this.timeline = timeline }}>
                                <div id="handle" onMouseDown={this.mouseDown} ref={(handle) => { this.handle = handle }} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <img className="artwork" src={this.props.artwork} alt="albumn-cover"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, {getTracks})(TrackPlayer);