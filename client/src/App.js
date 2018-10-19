import React from 'react';
import Home from './Home';
import Tracks from './Tracks';
import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import './styles/css/app.css';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/tracks" component={Tracks} />
            </Switch>
        </div>
    )
}

export default App;