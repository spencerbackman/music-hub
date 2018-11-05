import React from 'react';
import {Link} from 'react-router-dom';
import headphones from './images/headphones.svg';
import search from './images/search.svg';
import './styles/nav.css';

class Navbar extends React.Component {
    render() {
        return (
            <div className="side-nav">  
                <div id="nav-header"><h1>Music Hub</h1></div>
                <ul className="nav-container">
                    <li>
                        <Link className="nav-link" to="/">
                            <img src={search} className="nav-icons" alt="search-icon"/>
                            <span className="nav-name">Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/playlists">
                            <img src={headphones} className="nav-icons" alt="playlist-icon"/>
                            <span className="nav-name">My Music</span> 
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar;