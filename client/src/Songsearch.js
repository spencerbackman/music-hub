import React from 'react';
import Songplayer from './Songplayer';
import './styles/songSearch.css';
import {connect} from 'react-redux';
import {getSongById} from './redux/song';
import {searchSongs, getSongs} from './redux/songs';

class Songsearch extends React.Component {
    constructor() {
        super();
        this.state = {
            term: '',
            data: []
        }
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.props.searchSongs(this.state.term)
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchSongs(this.state.term)
        this.setState({
          term: ''
        })
    }

    render() {
        return (
            <div className="search-page">
                <form className="search-form" onSubmit={ this.handleSubmit }>
                    <input
                    type="text"
                    name="term"
                    value= { this.state.term }
                    placeholder="  Search..."
                    onChange={ this.handleChange }
                    id="search"
                    autoComplete="off"
                    list="autocompleteoff"
                    />
                </form>
                <Songplayer data={this.props.songs}/>
            </div>
        )
    }
}

export default connect(state => state, {getSongById, searchSongs, getSongs})(Songsearch);
