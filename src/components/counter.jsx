import React from "react";

class Counter extends React.Component {
    //   state = {
    //     count: this.props.value,
    //     // tags: ["tag1", "tag2", "tag3", "tag4"],
    //   };
    // constructor() {
    //     super();
    //     this.increment = this.increment.bind(this)
    // }

    //   onIncrement = () => {
    //     this.setState({ count: this.state.count + 1 });
    //   };

    getBladgeClass() {
        let classes = "badge m-3 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;
        return value === 0 ? "Zero" : value;
    }

    render() {
        return (
            <div className="row">
                <div className="col-1">
                    <span className={this.getBladgeClass()}>{this.formatCount()}</span>
                    {/* {this.props.children} */}
                </div>
                <div className="col">
                    <button
                        onClick={() => this.props.onIncrement(this.props.counter)}
                        className="btn btn-secondary btn-sm-2 m-2"
                    >
                        +
                    </button>
                    <button
                        onClick={() => this.props.onDecrement(this.props.counter)}
                        className="btn btn-secondary btn-sm-2 m-2"
                        disabled={this.props.counter.value === 0 ? 'Disable' : ''}
                    >
                        -
                    </button>

                    <button
                        onClick={() => this.props.onDelete(this.props.counter.id)}
                        className="btn btn-danger btn-sm m-2 m-2"
                    >
                        Delete
                    </button>
                </div>

                {/* <ul>
          {this.state.tags.map((tag) => (
            <li key={tag}> {tag} </li>
          ))}
        </ul> */}
            </div>
        );
    }
}

function MyComponent(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    );
}

export { Counter, MyComponent };
