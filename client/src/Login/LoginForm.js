import React from 'react';
import '../styles/login.css';

function LoginForm(props) {
    return (
        <div className="login-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3 className="login-title">Log In</h3>
                <div className="login-form-container">
                    <input 
                        onChange={props.handleChange}
                        value={props.username}
                        name="username"
                        type="text"
                        className="login-input"
                        placeholder="username" />
                    <input 
                        onChange={props.handleChange}
                        value={props.password}
                        name="password"
                        type="password"
                        className="login-input"
                        placeholder="password" />
                    <button type="submit" className="login-button">Submit</button>         
                </div>
                <p>{props.errMsg}</p>
            </form>
        </div>
    )
}

export default LoginForm;