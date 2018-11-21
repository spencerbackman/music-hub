import React from 'react';
import Songplayer from './Songplayer';
import './styles/songSearch.css';
import {connect} from 'react-redux';
import axios from 'axios';

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
        this.getSong()
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.getSong();
        this.setState({
          term: ''
        })
    }
    getSong = () => {
        axios.get('https://itunes.apple.com/lookup?term=' + this.state.term + '&limit=10', {
            method: 'get',
            proxy: false,
            maxRedirects: 1,
            Accept: 'application/json',
            Origin: 'https://mymusichub.herokuapp.com',
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
        console.log(this.state.data)
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
                <Songplayer  data={this.state.data}/>
            </div>
        )
    }
}

export default connect(state => state)(Songsearch);
