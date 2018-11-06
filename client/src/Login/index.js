import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {login} from '../redux/auth';

class LoginFormContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                username: "",
                password: ""
            }
        }
    }
    handleChange = (e) => {
        e.persist();
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value
                }
            };
        });
    };

    clearInputs = () => {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        });
    };

    handleSubmit= (e) => {
        e.preventDefault();
        this.props.login(this.state.inputs);
        this.clearInputs();
    };

    render() {
        return (
            <LoginForm 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                errMsg={this.props.authErrCode.login}
                {...this.state.inputs}/>
        )
    }
};

export default connect(state => state.auth, {login})(LoginFormContainer);