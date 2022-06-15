import React from 'react';
import Gameboard from './gameboard.js';
import ShipsPlacer from './shipsplacer.js';
import Logic from '../logic/logic.js';

class Game extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            statusMessage: 'DEFAULT STATUS MESSAGE',
            isShipsAllPlaced: false,
            shipsPlaced: [],
            player: Logic.Player(this.props.playerName, Logic.Gameboard()),
            computer: Logic.Computer(Logic.Gameboard()),
        };
        // orientation does not matter here ('horizontal' filler value)
        this.shipsToPlace = [
            Logic.Carrier('horizontal'), 
            Logic.Battleship('horizontal'),
            Logic.Cruiser('horizontal'),
            Logic.Submarine('horizontal'),
            Logic.Destroyer('horizontal')
        ];
        this.updateShipsToPlace = this.updateShipsToPlace.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.updatePlayerBoard = this.updatePlayerBoard.bind(this);
        this.updateComputerBoard = this.updateComputerBoard.bind(this);
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
                        handleDrop={this.handleDrop}
                        board={this.state.player.gameboard.board}
                        handleChange={this.updatePlayerBoard}/>
                       {this.state.isShipsAllPlaced ?
                            <Gameboard 
                            board={this.state.computer.gameboard.board}
                            /> :
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

    // TODO - integrate w onDragStart, onDragOver, onDrop
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

    // TODO - actually, need two handlers - for onShipPlaced 
    // onAttack - not just an 'update...' function
    updatePlayerBoard() {

    }

    updateComputerBoard() {

    }
}

export default Game;

