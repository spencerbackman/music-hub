import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
    render() {
        const {isAuthenticated, path} = this.props;
        const Component = this.props.component;
        return (
            isAuthenticated ?
                <Route path={path} component={Component} /> :
                <Redirect to="/" />
        )
    }
};

export default connect(state => state.auth)(ProtectedRoute);