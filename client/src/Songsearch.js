import React from 'react';
import Songplayer from './Songplayer';
import './styles/css/songSearch.css';
import {connect} from 'react-redux';

class Songsearch extends React.Component {
    constructor() {
        super()
        this.state = {
            term: '',
            data: []
        }
    }
    handleChange = e => {
        this.setState({ term: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            term: '',
            data: []
        })
        this.getMusic()
    }
    getMusic = () => {
        fetch('https://itunes.apple.com/search?term=' + this.state.term + '&limit=10')
        .then(res => res.json())
        .then((response) => {
            this.setState({
                data: response.results
            })
        })
    }

    render() {
        return (
            <div>
                <div id="search-container">
                <form className="search-form" onSubmit={ this.handleSubmit }>
                    <input
                    type="text"
                    name="term"
                    placeholder="Search for music"
                    onChange={ this.handleChange }
                    id="search"
                    />
                    <button id="search-button">Search</button>
                </form>
                </div>
                <div>
                {this.state.data.map(track => (
                    <Songplayer key={track.trackId} id={track.trackId} artist={track.artistName} artwork={track.artworkUrl100} 
                        preview={track.previewUrl} track={track.trackName} albumn={track.collectionName} />
                    ))}
                </div>
            </div>
        )
    }
}

export default connect(this.state)(Songsearch);


//artistName

