import React from 'react';


class TrackPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            play: 'play'
        }
    }
    componentDidMount() {
        this.audio.addEventListener("timeupdate", () => {
            let ratio = this.audio.currentTime / this.audio.duration;
            let position = (this.timeline.offsetWidth * ratio) + this.timeline.offsetLeft;
            this.positionHandle(position);
        });
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
    }

    render() {
        return(
            <div className="track-player">

            </div>
        )
    }
}

export default TrackPlayer;