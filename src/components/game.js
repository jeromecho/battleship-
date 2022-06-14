import React from 'react';
import Gameboard from './gameboard.js';
import ShipsPlacer from './shipsplacer.js';

class Game extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            statusMessage: 'DEFAULT STATUS MESSAGE',
            isShipsAllPlaced: false,
            shipsPlaced: [],
        };
        this.shipsToPlace = [
            'carrier',
            'battleship', 
            'cruiser',
            'submarine',
            'destroyer'];
        this.updateShipsToPlace = this.updateShipsToPlace.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    render () {
        const companyName = 'Cho Industries';
        const gameTitle = 'BATTLESHIP';
        // TODO - to integrate w state
        const statusMessage = this.state.statusMessage;
        const creatorsNote = 'Made with ❤️  by Jerome Cho';

        if (this.props.isDisplayed === true) {
            return (
                <div id='game'>
                    <header>
                        <div id='title-information'>
                            <p className='tagline'>{companyName}</p>
                            <h2 className='title'>{gameTitle}</h2>
                            <p id='status-message'>{statusMessage}</p>
                        </div>
                    </header>
                    <main>
                        <Gameboard 
                        name={this.props.playerName}
                        handleDrop={this.handleDrop}/>
                        {this.state.isShipsAllPlaced ?
                            <Gameboard /> :
                            <ShipsPlacer 
                            toggleShipsAllPlacedStatus={this.updateShipPlacementStatus}
                            shipsToPlace={this.shipsToPlace}
                            />} 
                    </main>
                    <footer>
                        <p id='creators-note'>{creatorsNote}</p>
                    </footer>
                </div>
            );
        } else {
            return null;
        }
    }

    handleDrop(ship) {
        this.setState({shipsPlaced: this.state.shipsPlaced.concat([ship])});
        this.updateShipsToPlace();
    }

    // toggle for now - in case we don't want to do fuil re-rendering of board 
    // when we start a new game
    updateShipPlacementStatus () {
        this.setState({isShipsAllPlaced: true});
    }

    updateShipsToPlace() {
        this.shipsToPlace = this.shipsToPlace.filter(ship => !this.shipsPlaced(ship))
    }
}

export default Game;

