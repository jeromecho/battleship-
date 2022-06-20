import React from 'react';
import Gameboard from './gameboard.js';

class ComputerGameboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Gameboard 
            name={this.props.name}
            board={this.props.board}
            ships={this.props.ships}
            onClick={this.props.onClick}
            />
        );
    }

    componentDidMount() {
        this.props.onMount();
    }
}

export default ComputerGameboard;
