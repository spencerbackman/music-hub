import React from 'react';
import {connect} from 'react-redux';
import {getTracks} from './redux/tracks';
import './styles/libraryPlayer.css';
import TrackPlayer from './TrackPlayer';
import axios from 'axios';

class LibraryPlayer extends React.Component {
    constructor() {
        super();
        this.state = {
            play: false,
            index: [],
            data: []
        }
    }
    componentDidMount() {
        this.props.getTracks();
        axios.get('https://itunes.apple.com/lookup?id=' + this.props.id + '&limit=1', {
            method: 'get',
            proxy: false,
            maxRedirects: 1,
            Accept: 'application/json',
            headers: {
                'Access-Control-Allow-Origin': 'https://mymusichub.herokuapp.com',
                "Access-Control-Allow-Headers": "X-Custom-Header, Upgrade-Insecure-Requests"
            }
        }).then(response => {
            this.setState({
                data: response.data.results
            })
        })
    }
    componentDidUpdate() {
        if(this.props.name !== 'allSongs') {
            this.props.tracks.filter(track => track.name === this.props.name).map(track => {
                if(!this.state.index.includes(track.id)) {
                    this.setState({
                        index: [track.id, ...this.state.index]
                    })
                }
            })
        } else {
            this.props.tracks.map(track => {
                if(!this.state.index.includes(track.id)) {
                    this.setState({
                        index: [track.id, ...this.state.index]
                    })
                }
            })
        }
    };
    getSong = (e, id) => {
        axios.get('https://itunes.apple.com/lookup?id=' + id + '&limit=1', {
            method: 'get',
            proxy: false,
            maxRedirects: 1,
            Accept: 'application/json',
            headers: {
                'Access-Control-Allow-Origin': 'https://mymusichub.herokuapp.com',
                "Access-Control-Allow-Headers": "X-Custom-Header, Upgrade-Insecure-Requests"
            }
        }).then(response => {
            this.setState({
                data: response.data.results
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.data.map(track => (
                    <TrackPlayer key={track.trackId} id={track.trackId} name={this.props.name}
                    track={track.trackName} artist={track.artistName} albumn={track.collectionName}
                    preview={track.previewUrl} artwork={track.artworkUrl60} index={this.state.index}
                    getSong={this.getSong} />
                ))}
            </div>
        )
    }
}

export default connect(state => state, {getTracks})(LibraryPlayer);