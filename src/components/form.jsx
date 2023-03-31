import React, { Component } from "react";
import Joi from "joi-browser";
import { Input, Select } from "./reuseableInput";

class Form extends Component {
    state = {
        data: {},
        error: {},
    };

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {
            abortEarly: false,
        });
        // console.log(result);
        if (!result.error) return null;

        const error = {};
        for (let items of result.error.details)
            error[items.path[0]] = items.message;
        return error;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const error = this.validate();
        this.setState({ error: error || {} });
        if (error) return;

        this.doSubmit();
    };

    renderButton(label) {
        return (
            <div>
                <button
                    disabled={this.validate()}
                    type="submit"
                    className="btn btn-primary"
                >
                    {label}
                </button>
            </div>
        );
    }

    renderInput(name, label, type = "text", placeholder) {
        return (
            <Input
                name={name}
                lable={label}
                type={type}
                value={this.state.data[name]}
                onChange={this.handleUsername}
                placeholder={placeholder}
                error={this.state.error[name]}
            />
        );
    }

    renderSelect(name, label, options) {
        return (
            <Select
                name={name}
                value={this.state.data[name]}
                label={label}
                options={options}
                onChange={this.handleUsername}
                error={this.state.error[name]}
            />
        )
    }
}

export default Form;
