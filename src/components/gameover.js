import React from 'react';

class Gameover extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.winner !== null) {
            return (
                <div id='overlay'>
                    <div id='winner-banner'>
                        <h3 id='winner-title'>{`${this.props.winner} wins!`}</h3>
                        <button
                        id='play-again'
                        onClick={this.props.onGameover}>
                        Play Again
                        </button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Gameover;
