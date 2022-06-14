// React file 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/login.css';
import 'normalize.css';
import { 
    Ship,
    Gameboard, 
    Player, 
    Computer, 
    Carrier, 
    Battleship,
    Cruiser,
    Submarine,
    Destroyer,
} from './logic/logic.js';
import App from './components/app.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// LOGIC ::: NO UI INTEGRATION

// startGame();

function startGame() {
    let name = window.prompt('What is your name admiral?');
    playGame(name)
}

function playGame(name) {
	    // TODO - change to UI input 
    const player  = Player(name, Gameboard());
    const computer = Computer(Gameboard());

    placeShips(player, computer);
    runGameLoop(player, computer);

    // TODO - switch to button with yes or no
    let response = window.prompt(`Are you ready for your next battle?`)
    if (response === 'Yes') {
        playGame();
    } else {
        // TODO - exit to 'insert name' stage
    }
}

function placeShips(player, computer) {
    // TODO - allow for placement or drag n' drop
    player.gameboard.placeShip([0,0], Carrier('horizontal'));
    player.gameboard.placeShip([1,0], Battleship('horizontal'));
    player.gameboard.placeShip([2,0], Cruiser('horizontal'));
    player.gameboard.placeShip([3,0], Submarine('horizontal'));
    player.gameboard.placeShip([4,0], Destroyer('horizontal'));

    computer.gameboard.placeShip([0,0], Carrier('horizontal'));
    computer.gameboard.placeShip([1,0], Battleship('horizontal'));
    computer.gameboard.placeShip([2,0], Cruiser('horizontal'));
    computer.gameboard.placeShip([3,0], Submarine('horizontal'));
    computer.gameboard.placeShip([4,0], Destroyer('horizontal'));
}

function runGameLoop(player, computer) {
    while (true) {
        // TODO - integrate with UI
        let y = window.prompt(`Input the y coordinate you would like to attack, ${player.name}`);
        let x = window.prompt(`Input the x coordinate you would like to attack, ${player.name}`);
        player.makeAttack(computer.gameboard, [Number(y), Number(x)]);
        computer.makeAttack(player.gameboard, computer.pickPos());

        updateGameStatus(player, computer);
        // TODO - integrate with ui
        displayBoards(player, computer);

        let winner = determineWinner(player, computer);
        if (winner) {
            alert(`Winner is ${winner.name}`);
            break;
        }
    }
}

function displayBoards(player, computer) {
    console.log(`Player board: ${player.gameboard.board}`);
    console.log(`Computer board: ${computer.gameboard.board}`);
};

function updateGameStatus(player, computer) {
    player.gameboard.updateSunkStatus(); 
    computer.gameboard.updateSunkStatus(); 
}

function determineWinner(player, computer) {
    if (player.gameboard.isAllSunk === true) {
        return computer;
    } else if (computer.gameboard.isAllSunk === true) {
        return player;
    } else {
        return null;
    }
}


