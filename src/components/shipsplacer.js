import React from 'react';
import ReactDOM from 'react-dom/client';

class ShipsPlacer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {

        }
    }

    render () {
        // TODO - fix bug
        let ships = this.props.shipsToPlace.map(ship => {
            let squares = [];
            for (let i =0; i < ship.length; i++) {
                squares = squares.concat([
                    <div className='square' key={`square-${i}`}></div>
                ]);
            };
            return (
                <div
                id={ship.name} 
                key={ship.name}
                className='ship'
                draggable='true'>
                    {squares}
                </div>
            );
        });

        return (
            <div id='shipsplacer'>
                <button type='button' id='auto-place'>
                    Auto-Place
                </button>
                <div id='shipscontainer'>
                    {ships}
                </div>
            </div>
        );
    }
}

export default ShipsPlacer; 

