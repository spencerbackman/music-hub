import React from 'react';
import headphones from './images/headphones.svg';
import search from './images/search.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './redux/auth';
import './styles/nav.css';

function Navbar(props) {
    const { isAuthenticated } = props;
    return (
        <div className="side-nav">
            <div className="nav-wrapper">
                {!isAuthenticated && <div><Link className="nav-link" to="/">
                <span className="nav-login">Signup</span>
                </Link></div>}
                {!isAuthenticated && <div><Link className="nav-link" to="/login">
                    <span className="nav-login">Login</span>
                </Link></div>}
                {isAuthenticated && <div><Link className="nav-link" to="/search">
                <img src={search} alt="search-icon" className="nav-icons"/>
                <span className="nav-name">Search</span>
                </Link></div>}
                {isAuthenticated && <div><Link className="nav-link" to="/library">
                <img src={headphones} alt="headphone-icon" className="nav-icons"/>
                <span className="nav-name">My Music</span>
                </Link></div>}
                {isAuthenticated && <div><Link className="nav-link logout-button" onClick={props.logout} to="/">
                    <span className="nav-logout">Logout</span>    
                </Link></div> }
            </div>
        </div>
    )
}

export default connect(state => state.auth, {logout})(Navbar);