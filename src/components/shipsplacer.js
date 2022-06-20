import React from 'react';
import PlaygameBanner from './playgamebanner.js';

class ShipsPlacer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {

        }
    }
    render () {
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
                draggable='true'
                onDragStart={this.drag}
                >
                    {squares}
               </div>
            )
        });

        return (
            <div id='shipsplacer'>
                <button
                type='button' 
                id='auto-place'
                onClick={this.props.onAutoplaceClick}>
                    Auto-Place
                </button>
                <p id='orientation-info'>Double click ships to rotate</p>
                <div id='shipscontainer'>
                    {ships}
                    <PlaygameBanner 
                    isDisplayed={this.props.isShipsAllPlaced}
                    onClick={this.props.onGamebannerClick}
                    />
                </div>
            </div>
        );

    }
    drag(e) {
        e.dataTransfer.setData('text', e.target.id);
    }
}

export default ShipsPlacer; 

