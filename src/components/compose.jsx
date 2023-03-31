import React, { Component } from "react";
import { Counter } from "./counter";

class Compose extends Component {
    render() {
        return (
            <div>
                <button className="btn btn-primary btn sm" onClick={this.props.onReset}>
                    Rest
                </button>
                {this.props.counter.map((counter) => (
                    <Counter
                        key={counter.id}
                        onIncrement={this.props.onIncrease}
                        onDecrement={this.props.onDecrease}
                        onDelete={this.props.onDelet}
                        counter={counter}
                    >
                        <h3> Title</h3>
                    </Counter>
                ))}
            </div>
        );
    }
}

export default Compose;
