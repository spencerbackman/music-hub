import React from 'react';
import Songsearch from './Songsearch';
import Navbar from './Navbar';
import Library from './Library';
import Signup from './Signup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { verify } from './redux/auth';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles/app.css';

class App extends React.Component{
    componentDidMount() {
        this.props.verify();
    }
    render () {
        const {isAuthenticated, loading} = this.props;
        return (
            <div className="app-container">
                <Navbar />
                {loading ?
                    <div>...Loading user data</div>
                :
                <Switch>
                    <Route exact path="/" render={ props => isAuthenticated ?
                        <Redirect to="/search" /> :
                        <Signup {...props} />
                    } />
                    <Route path="/login" render={ props => isAuthenticated ?
                        <Redirect to="/search" />
                        : <Login {...props} />
                    } />
                    <ProtectedRoute path="/search" component={Songsearch} />
                    <ProtectedRoute path="/library" component={Library} />
                </Switch>
                }
            </div>
        )
    }
}

export default withRouter(connect(state => state.auth, {verify})(App));