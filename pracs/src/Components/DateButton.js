// DateButton.js Component
import { Component } from "react";

export default class DateButton extends Component {
    constructor(props) {
        super(props);
        this.state = { color: 'red' };
    }
    render() {
        return (
            <>
                <div className='container mx-4'>
                    <h1>Hello this is the date using class component: </h1>
                    <br/>
                    <h2 style={{ color: this.state.color }}>{this.props.date}</h2>
                    <button onClick={() => {
                        if (this.state.color === 'red') {
                            this.setState({ color: "blue" });
                        } else {
                            this.setState({ color: 'red' });
                        }
                    }}>Change Color</button>
                </div>
            </>
        );
    }
}
