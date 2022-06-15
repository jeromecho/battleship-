import React from 'react';

class Gameboard extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {

        };
    }

    render () {
        const name = this.props.name;
        const squares = this.props.board.map((arr, bIndex) => {
            const row = arr.map((val, rIndex) =>  {
                switch(val) {
                    case 'O':
                        // Breaks w out () or good?
                        return (
                            <div className='square square-open' key={rIndex}></div>
                        );
                    case 'S':
                        return (
                            <div className='square square-ship' key={rIndex}></div>
                        );
                    case 'H':
                        return (
                            <div className='square square-hit' key={rIndex}></div>
                        );
                    case 'X':
                        return (
                            <div className='square square-missed' key={rIndex}></div>
                        );
                    default: 
                        throw new Error('unhandled value on board');
                }
            });

            return <div className='row' key={bIndex}>{row}</div>

        });
        // TODO - likely connected to logic.js
        // TODO - add onDrop handler to every single one of the squares

        return (
            <div className='gameboard'>
                <h3>{`${name}'s Fleet`}</h3>
                <div id='board'>
                    <div id='topright-corner-space'></div>
                    <div id='numbers'></div>
                    <div id='letters'></div>
                    <div id='grid-container'>
                        <div id='grid'>
                            {squares}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gameboard;

