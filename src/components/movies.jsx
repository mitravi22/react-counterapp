import React, { Component } from "react";
import { getMovies } from "./fakeMovie";
import ListGroup from "./ListGroup";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "./fakeGenres";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";

import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        Query: "",
        selectedGenre: null,
        sortColumn: { path: "title", order: "asc" },
    };

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter((m) => m.id !== movie.id);
        this.setState({ movies });
    };

    hadleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({
            movies,
        });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genr) => {
        this.setState({ selectedGenre: genr, Query: "", currentPage: 1 });
    };

    handleSearch = (query) =>{
        this.setState({Query: query, selectedGenre: null, currentPage: 1})
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPageData = () =>{
        const {pageSize,currentPage, sortColumn, selectedGenre, Query, movies: allMovies} = this.state;
        let filteredAll = allMovies;
        if(Query)
        filteredAll = allMovies.filter(m => 
        m.title.toLowercase().startsWith(Query.toLocaleLowerCase())
        );
        else if (selectedGenre && selectedGenre._id)
        filteredAll = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filteredAll, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)
        return {totalCount: filteredAll.length, data: movies}
    }

    render() {
        const { length: count } = this.state.movies;
        const {
            currentPage,
            pageSize,
            selectedGenre,
            movies: allMovies,
            sortColumn,
        } = this.state;
        if (count === 0) return <p> Their is no movies in database </p>;

        const filterGenre =
            selectedGenre && selectedGenre._id
                ? allMovies.filter((m) => m.genre === selectedGenre.name)
                : allMovies;

        const sorted = _.orderBy(
            filterGenre,
            [sortColumn.path],
            [sortColumn.order]
        );

        const movies = paginate(sorted, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3">
                    <h3>Genre</h3>
                    <ListGroup
                        items={this.state.genres}
                        selecteItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p> Showing {filterGenre.length} movies in a database</p>
                    <SearchBox value={this.state.Query} onChange={this.handleSearch} />
                    <MoviesTable
                        movies={movies}
                        onDelete={this.handleDelete}
                        onLike={this.hadleLike}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        itemsCount={filterGenre.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
