import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/userService"
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
    // username = React.createRef()
    state = {
        data: { email: "", password: "" },
        error: {},
        success: {}
    };

    schema = {
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password"),
    };
    // componentDidMount () {
    //     this.username.current.focus()
    // }
    //   validate = () => {
    //     const result = Joi.validate(this.state.data, this.schema, {
    //       abortEarly: false,
    //     });
    //     console.log(result);
    //     if (!result.error) return null;

    //     const error = {};
    //     for (let items of result.error.details)
    //       error[items.path[0]] = items.message;
    //     return error;
    //     // const error = {};
    //     // const { username, password } = this.state.data;

    //     // if (username.trim() === "") error.username = "Username is required";

    //     // if (password.trim() === "") error.password = "Password is required ";
    //     // return Object.keys(error).length === 0 ? null : error;
    //   };

    //   validateProperty = ({ name, value }) => {
    //     const obj = { [name]: value };
    //     const schema = { [name]: this.schema[name] };
    //     const { error } = Joi.validate(obj, schema);
    //     return error ? error.details[0].message : null;

    //     // if (name === "username") {
    //     //   if (value.trim() === "") return "Username is required";
    //     // }
    //     // if (name === "password") {
    //     //   if (value.trim() === "") return "Password is required";
    //     // }
    //   };

    handleUsername = ({ currentTarget: input }) => {
        const error = { ...this.state.error };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) error[input.name] = errorMessage;
        else delete error[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, error });
    };
    //   handleSubmit = (e) => {
    //     e.preventDefault();

    //     const error = this.validate();
    //     // console.log(error)
    //     this.setState({ error: error || {} });
    //     if (error) return;

    //     this.doSubmit()
    //   };

    doSubmit = async () => {
        try {
            await userService.login(this.state.data)
            // this.props.history.push('/')
            const {state} = this.props.location;
            window.location = state ? state.from.pathname : '/' 
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.error }
                errors.password = error.response.data.message
                this.setState({ error: errors })
            }
        }

    }
    render() {
        if(userService.getCurrentUser()) return <Redirect to='/' />
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Login Form</h2>
                    <br></br>
                    {this.renderInput('email', 'Email', 'email', "Enter Email")}
                    {this.renderInput('password', 'Password', 'password', "Enter Password")}
                    {this.renderButton('LogIn')}
                </form>
            </div>
        );
    }
}

export default LoginForm;
