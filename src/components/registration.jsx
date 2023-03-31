import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/userService"

class Registration extends Form {
    state = {
        data: { firstName: "", lastName: "", email: "", password: "", },
        error: {},
    };
    schema = {
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(5).label("Password"),

    };
    handleUsername = ({ currentTarget: input }) => {
        const error = { ...this.state.error };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) error[input.name] = errorMessage;
        else delete error[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, error });
    };
    doSubmit = async () => {
        try {
          const response =  await userService.register(this.state.data)
          console.log(response)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.error };
                errors.email = error.response.data.message
                this.setState({error:errors})
            }
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Registration Form</h2>
                    <br></br>
                    {this.renderInput("firstName", "First Name", "text", "Enter first name")}
                    {this.renderInput("lastName", "Last Name", "text", "Enter last name")}
                    {this.renderInput("email", "Email", "email", "Enter Email")}
                    {this.renderInput("password", "Password", "password", "Enter Password")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default Registration;
