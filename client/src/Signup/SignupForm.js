import React from 'react';
import '../styles/signup.css';

function SignupForm(props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3 className="signup-title"> Sign Up</h3>
                <div className="signup-form-container">
                    <input 
                        onChange={props.handleChange}
                        value={props.username}
                        name="username"
                        type="text"
                        className="signup-input"
                        placeholder="Username" />
                    <input 
                        onChange={props.handleChange}
                        value={props.password}
                        name="password"
                        type="password"
                        className="signup-input"
                        placeholder="password" />
                    <button type="submit" className="signup-button">Create Account</button>
                </div>
                <p>{props.errMsg}</p>
            </form>
        </div>
    )
};

export default SignupForm;