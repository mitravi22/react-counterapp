import React, { Component } from "react";
import Compose from "./components/compose";
import { getCurrentUser } from './services/userService'
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Customers from "./components/customer";
import Rentals from "./components/rental";
import NotFound from "./components/notFound";
import NNavBar from "./components/NNavBar";
import LoginForm from "./components/loginForm";
import Registration from "./components/registration";
import MoviesForm from './components/moviesForm';
import LogOut from './components/logout';
import ProtectedRoute from "./components/protectedRoutes";
import "react-toastify/dist/ReactToastify.css"
import "./App.css";

class App extends Component {
    state = {
        counter: [
            { id: 1, value: 5 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
        ],
    };

    increment = (count) => {
        const counter = [...this.state.counter];
        //  console.log(counter,"ccc")
        const index = counter.indexOf(count);
        //  console.log(index,"iii")
        counter[index] = { ...count };
        counter[index].value++;
        this.setState({
            counter,
        });
    };
    decrement = (count) => {
        const counter = [...this.state.counter];
        const index = counter.indexOf(count);
        counter[index] = { ...count };
        counter[index].value--;
        this.setState({
            counter,
        });
    };
    delete = (counterId) => {
        const deleteCounter = this.state.counter.filter(
            (del) => del.id !== counterId
        );
        this.setState({
            counter: deleteCounter,
        });
    };

    handelRest = () => {
        const counter = this.state.counter.map((cn) => {
            cn.value = 0;
            return cn;
        });
        this.setState({
            counter,
        });
    };

    componentDidMount() {
        const user = getCurrentUser()
        this.setState({ user })
    }

    render() {
        const { user } = this.state
        return (
            <div>
                <ToastContainer />
                {/* <Navbar totalCalculation={this.state.counter.filter(c => c.value > 0).length} /> */}
                <NNavBar user={user} />
                <main className="container">
                    {/* <Movies /> */}
                    {/* <Compose
                        counter={this.state.counter}
                        onIncrease={this.increment}
                        onDecrease={this.decrement}
                        onDelet={this.delete}
                        onReset={this.handelRest}
                    /> */}
                    <Switch>
                        <Route path="/movies/new" component={MoviesForm}></Route>
                        <Route path="/register" component={Registration}></Route>
                        <Route path="/login" component={LoginForm}></Route>
                        <Route path='/logout' component={LogOut}></Route>
                        <ProtectedRoute path="/movies/:id" component={MoviesForm}></ProtectedRoute>
                        <Route path="/movies"
                            render={props => <Movies {...props} user={user} />}>
                        </Route>
                        <Route path="/customers" component={Customers}></Route>
                        <Route path="/rentals" component={Rentals}></Route>
                        <Route path="/not-found" component={NotFound}></Route>
                        <Redirect from="/" exact to="/movies"></Redirect>
                        <Redirect to="/not-found" />
                    </Switch>
                    {/* <LoginForm /> */}
                    {/* <Registration /> */}
                </main>
            </div>
        );
    }
}

export default App;
