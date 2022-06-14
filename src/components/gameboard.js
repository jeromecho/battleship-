import React from 'react';

class Gameboard extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {

        };
    }

    render () {
        const name = this.props.name;
        const squares = {} ; 
        // TODO - but likely connected to logic.js
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

