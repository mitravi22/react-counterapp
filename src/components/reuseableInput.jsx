import React from "react";

const Input = ({ name, lable, value, onChange, placeholder, error, type }) => {
    return (
        <div className="form-group mb-5">
            <label htmlFor={name}>{lable}</label>
            <input
                value={value}
                onChange={onChange}
                className="form-control"
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

const Select = ({ name, label, value, options, onChange, placeholder, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                onChange={onChange}
                className="form-control"
            >
                <option value="" />
                {options.map((option) => (
                    <option key={option._id} value={option._id} >
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export { Input, Select };
