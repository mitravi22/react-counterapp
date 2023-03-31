import React, { Component } from "react";
import Like from "./like";
import * as auth from '../services/userService'

class MoviesTable extends Component {
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    };
    render() {
        const { movies, onDelete, onLike } = this.props;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => this.raiseSort("title")}>Title</th>
                        <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
                        <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
                        <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
                        <th>Like</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td> {movie.title} </td>
                            <td> {movie.genre} </td>
                            <td> {movie.numberInStock} </td>
                            <td> {movie.dailyRentalRate} </td>
                            <td>
                                <Like liked={movie.liked} onClick={() => onLike(movie)} />
                            </td>
                            <td>
                                {auth.getCurrentUser() ? <button
                                    onClick={() => onDelete(movie)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button> : <button 
                                    hidden
                                    onClick={() => onDelete(movie)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>

                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default MoviesTable;
