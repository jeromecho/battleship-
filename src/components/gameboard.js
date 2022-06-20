import React from 'react';

class Gameboard extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {

        };
    }

    render () {
        const name = this.props.name;
        const numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const lettersList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const numbers = numbersList.map((number, index) => {
            return <p key={index}>{number}</p>;
        });
        const letters = lettersList.map((letter, index) =>   {
            return <p key={index}>{letter}</p>;
        });
        const squares = this.props.board.map((arr, bIndex) => {
            const row = arr.map((val, rIndex) =>  {
                switch(val) {
                    case 'O':
                        // Breaks w out () or good?
                        return (
                            <div 
                            className='square square-open' 
                            key={rIndex}
                            onDragOver={this.props.allowDragOver}
                            onDrop={this.props.onDrop}
                            onDoubleClick={this.props.onDoubleClick}
                            onClick={this.props.onClick}
                            pos={[bIndex, rIndex]}
                            name={this.props.name}
                        >
                            </div>
                        );
                    case 'S':
                        let type;
                        this.props.ships.forEach(obj => {
                            obj.positions.forEach(pos => {
                                let [posY, posX] = pos;
                                if (posY === bIndex && posX === rIndex) {
                                   type = obj.ship.name; 
                                }
                            })
                        });

                        if (this.props.name !== 'Computer') {
                            return (
                                <div 
                                className={`square square-ship ${type}`}
                                key={rIndex}
                                onDragOver={this.props.allowDragOver}
                                onDrop={this.props.onDrop}
                                onDoubleClick={this.props.onDoubleClick}
                                onClick={this.props.onClick}
                                pos={[bIndex, rIndex]}
                                name={this.props.name}
                                >
                                </div>
                            );
                        } else {
                            return (
                                <div 
                                className={`square square-ship c${type}`}
                                key={rIndex}
                                onDragOver={this.props.allowDragOver}
                                onDrop={this.props.onDrop}
                                onDoubleClick={this.props.onDoubleClick}
                                onClick={this.props.onClick}
                                pos={[bIndex, rIndex]}
                                name={this.props.name}
                                >
                                </div>
                            );
                        }

                    case 'H':
                        return (
                            <div
                            className='square square-hit' 
                            key={rIndex}
                            onDragOver={this.props.allowDragOver}
                            onDrop={this.props.onDrop}
                            onDoubleClick={this.props.onDoubleClick}
                            onClick={this.props.onClick}
                            pos={[bIndex, rIndex]}
                            name={this.props.name}
                        >
                            </div>
                        );
                    case 'X':
                        return (
                            <div
                            className='square square-miss'
                            key={rIndex}
                            onDragOver={this.props.allowDragOver}
                            onDrop={this.props.onDrop}
                            onDoubleClick={this.props.onDoubleClick}
                            onClick={this.props.onClick}
                            pos={[bIndex, rIndex]}
                            name={this.props.name}
                        >
                            </div>
                        );
                    default: 
                        throw new Error('unhandled value on board');
                }
            });

            return <div className='row' key={bIndex}>{row}</div>

        });

        return (
            <div className='gameboard'>
                <h3>{`${name}'s Fleet`}</h3>
                <div id='board'>
                    <div id='topright-corner-space' key='topright-corner-space'></div>
                    <div id='numbers' key='numbers'>{numbers}</div>
                    <div id='letters' key='letters'>{letters}</div>
                    <div id='grid-container' key='grid-container'>
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

