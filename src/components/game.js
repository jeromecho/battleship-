import React from 'react';
import Gameboard from './gameboard.js';
import ComputerGameboard from './computergameboard.js';
import ShipsPlacer from './shipsplacer.js';
import Gameover from './gameover.js';
import Logic from '../logic/logic.js';

class Game extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            isShipsAllPlaced: false,
            isPlayerReady: false,
            isSettingUp: true,
            shipsPlaced: [],
            player: Logic.Player(this.props.playerName, Logic.Gameboard()),
            computer: Logic.Computer(Logic.Gameboard()),
            attackingPlayer: this.props.playerName,
            winner: null,
        };
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.placeAllShips = this.placeAllShips.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleMount = this.handleMount.bind(this);
        this.makeComputerAttack = this.makeComputerAttack.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);
        this.handleGameover =  this.handleGameover.bind(this);
    }

    render () {
        if (this.props.isDisplayed === true) {
            const companyName = 'Cho Industries';
            const gameTitle = 'BATTLESHIP';
            const statusMessage = this.state.isPlayerReady ?
                `${this.state.attackingPlayer} is attacking.`:
                `${this.props.playerName}, place your ships`;
            const creatorsNote = 'Made with ❤️  by Jerome Cho';

            const placedShipNames = this.state.shipsPlaced.map(ship => ship.name);
            const shipsToPlace = [Logic.Carrier('horizontal'), 
                Logic.Battleship('horizontal'),
                Logic.Cruiser('horizontal'),
                Logic.Submarine('horizontal'),
                Logic.Destroyer('horizontal')].filter(ship => {
                    return !placedShipNames.includes(ship.name);
                });
 
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
                        {this.state.isSettingUp ? 
                        <Gameboard 
                        name={this.props.playerName}
                        allowDragOver={this.allowDragOver}
                        onDrop={this.handleDrop}
                        onDoubleClick={this.handleDoubleClick}
                        board={this.state.player.gameboard.board}
                        ships={this.state.player.gameboard.ships}
                        /> :
                        <Gameboard 
                        name={this.props.playerName}
                        board={this.state.player.gameboard.board}
                        ships={this.state.player.gameboard.ships}
                        />}
                       {this.state.isPlayerReady ?
                            <ComputerGameboard 
                            name={this.state.computer.name}
                            board={this.state.computer.gameboard.board}
                            ships={this.state.computer.gameboard.ships}
                            onMount={this.handleMount}
                            onClick={this.handleClick}
                            /> :
                            <ShipsPlacer 
                            toggleShipsAllPlacedStatus={this.updateShipPlacementStatus}
                            shipsToPlace={shipsToPlace}
                            isShipsAllPlaced={this.state.isShipsAllPlaced}
                            onGamebannerClick={this.startGame}
                            onAutoplaceClick={this.placeAllShips}
                            />} 
                            <Gameover 
                            winner={this.state.winner}
                            onGameover={this.handleGameover}
                            />
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

    allowDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        const data = e.dataTransfer.getData('text');
        let ship;   
        switch (data) {
            case 'carrier':
                ship = Logic.Carrier('horizontal'); 
                break;
            case 'battleship':
                ship = Logic.Battleship('horizontal');
                break;
            case 'cruiser':
                ship = Logic.Cruiser('horizontal');
                break;
            case 'submarine':
                ship = Logic.Submarine('horizontal');
                break;
            case 'destroyer': 
                ship = Logic.Destroyer('horizontal');
        }
        this.setState((state, props) => 
            ({shipsPlaced: state.shipsPlaced.concat([ship])}), 
            this.checkShipPlacementStatus
        );
        const [y, x] = e.target.getAttribute('pos').split(',');
        const playerCopy = Object.assign({}, this.state.player);
        playerCopy.gameboard.placeShip([Number(y),Number(x)], ship);
        this.setState({player: playerCopy});
    }

    handleDoubleClick(e) {
        if (e.target.classList.contains('square-ship')) {
            let [y,x] = e.target.getAttribute('pos').split(',');
            let pos = [Number(y), Number(x)];
            let playerCopy = this.state.player;
            playerCopy.gameboard.orientateShip(pos);
            this.setState({player: playerCopy});
        }
    }

    checkShipPlacementStatus() {
        if (this.state.shipsPlaced.length === 5)   {
            this.updateShipPlacementStatus();
        }
    }

    updateShipPlacementStatus () {
        let newStatus = this.state.isShipsAllPlaced ? false : true;
        this.setState({isShipsAllPlaced: newStatus});
    }

    startGame() {
        this.setState({isSettingUp: false});
        this.setState({isPlayerReady: true});
    }

    handleMount() {
        let computerCopy = this.state.computer; 
        let shipConstructors = [
            Logic.Carrier,
            Logic.Battleship,
            Logic.Cruiser,
            Logic.Submarine,
            Logic.Destroyer
        ];
        for (let i=0; i < this.state.shipsPlaced.length; i++) {
            let orientation = (Math.random * 100 > 50) ? 'vertical' : 'horizontal';
            let attempt = computerCopy.gameboard
                .placeShip(computerCopy.pickPos(), shipConstructors[i](orientation));

            while (attempt === 'Invalid ship placement') {
                orientation = (Math.random * 100 > 50) ? 'vertical' : 'horizontal';
                attempt = computerCopy.gameboard
                    .placeShip(computerCopy.pickPos(), shipConstructors[i](orientation));
            }
        }
        this.setState({computer: computerCopy});
    }

    handleClick(e) {
        if (e.target.getAttribute('name') === this.state.attackingPlayer) {
            return;
        }
        const attacker = Object.assign({}, this.state.player);
        const receiver = Object.assign({}, this.state.computer);
        let [y,x] = e.target.getAttribute('pos').split(',');
        attacker.makeAttack(receiver.gameboard, [Number(y), Number(x)]);
        this.setState({computer: receiver});
        this.setState({attackingPlayer: this.state.computer.name});
        this.checkGameStatus();
        this.makeComputerAttack();
    }

    makeComputerAttack() {
        const attacker = Object.assign({}, this.state.computer);
        const receiver = Object.assign({}, this.state.player);
        attacker.makeAttack(receiver.gameboard, attacker.pickPos());
        this.setState({player: receiver});
        this.setState({attackingPlayer: this.state.player.name})
        this.checkGameStatus();
    }

    checkGameStatus() {
        const playerCopy = this.state.player;
        const computerCopy = this.state.computer;
        playerCopy.gameboard.updateSunkStatus();
        computerCopy.gameboard.updateSunkStatus();

        if (playerCopy.gameboard.isAllSunk) {
            this.setState({winner: computerCopy.name});
        } 
        if (computerCopy.gameboard.isAllSunk) {
            this.setState({winner: playerCopy.name});
        }
    }

    handleGameover() {
        this.setState(
            {player: Logic.Player(this.props.playerName, Logic.Gameboard())}
        );
        this.setState(
            {computer: Logic.Computer(Logic.Gameboard())}
        );
        this.setState({isShipsAllPlaced: false});
        this.setState({isPlayerReady: false});
        this.setState({isSettingUp: true});
        this.setState({shipsPlaced: []});
        this.setState({attackingPlayer: this.props.playerName});
        this.setState({winner: null});
        this.props.onReset();
    }

    placeAllShips() {
        function pickRandomPos() {
            let y = Math.floor(Math.random() * 10);
            let x = Math.floor(Math.random() * 10);
            return [y, x];
        }
        const playerCopy = Object.assign({}, this.state.player);
        const placedShipNames = this.state.shipsPlaced.map(ship => ship.name);
        const shipsToPlace = [Logic.Carrier('horizontal'), 
            Logic.Battleship('horizontal'),
            Logic.Cruiser('horizontal'),
            Logic.Submarine('horizontal'),
            Logic.Destroyer('horizontal')].filter(ship => {
                return !placedShipNames.includes(ship.name);
            });
        for (let i=0; i < shipsToPlace.length; i++) {
            let orientation = (Math.random * 100 > 50) ? 'vertical' : 'horizontal';
            let attempt = playerCopy.gameboard
                .placeShip(pickRandomPos(), shipsToPlace[i]);
            while (attempt === 'Invalid ship placement') {
                orientation = (Math.random * 100 > 50) ? 'vertical' : 'horizontal';
                attempt = playerCopy.gameboard
                    .placeShip(pickRandomPos(), shipsToPlace[i]);
            }
        }
        this.setState({shipsPlaced: [
            Logic.Carrier('horizontal'), 
            Logic.Battleship('horizontal'),
            Logic.Cruiser('horizontal'),
            Logic.Submarine('horizontal'),
            Logic.Destroyer('horizontal')
        ]}, 
            this.checkShipPlacementStatus
        );
        this.setState({player: playerCopy});
    }
}

export default Game;

