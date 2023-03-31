import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getMovies } from "./fakeMovie";
import { getGenres } from "./fakeGenres";

class MoviesForm extends Form {
    state = {
        data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
        error: {},
        genres: [],
    };
    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).min(100).label("Number in Stocks"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .min(10)
            .label("Daily Rental Rate"),
    };
    componentDidMount() {
        const genres = getGenres();
        console.log(genres)
        this.setState({ genres });

        const moviesId = this.props.match.params.id;
        if (moviesId === "new") return;

        const movie = getMovies();
        if (!movie) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(movie) });
    }
    mapToViewModel(movie) {
        return {
            _id: movie.id,
            title: movie.title,
            genreId: movie.genre,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    }
    handleUsername = ({ currentTarget: input }) => {
        const error = { ...this.state.error };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) error[input.name] = errorMessage;
        else delete error[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, error });
    };
    doSubmit = () => {

        this.props.history.push('/movies')
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Movie Form</h2>
                    <br></br>
                    {this.renderInput("title", "Title", "text", "Enter title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput(
                        "numberInStock",
                        "Number in Stock",
                        "number",
                        "Enter Stock"
                    )}
                    {this.renderInput("dailyRentalRate", "Rate", "number", "Enter Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MoviesForm;
