import React from 'react';
import {Link} from 'react-router-dom';
import './styles/css/nav.css';

class Navbar extends React.Component {
    render() {
        return (
            <div className="nav-container">  
                <div><Link className="nav-link" to="/">Home</Link></div>
                <div><Link className="nav-link" to="/tracks">My music</Link></div>
            </div>
        )
    }
}

export default Navbar;