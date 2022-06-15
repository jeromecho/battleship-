// React file 
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './styles/login.css';
import './styles/game.css';
import './styles/app.css';
import Logic from './logic/logic.js';
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
    const player  = Logic.Player(name, Logic.Gameboard());
    const computer = Logic.Computer(Logic.Gameboard());

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
    player.gameboard.placeShip([0,0], Logic.Carrier('horizontal'));
    player.gameboard.placeShip([1,0], Logic.Battleship('horizontal'));
    player.gameboard.placeShip([2,0], Logic.Cruiser('horizontal'));
    player.gameboard.placeShip([3,0], Logic.Submarine('horizontal'));
    player.gameboard.placeShip([4,0], Logic.Destroyer('horizontal'));

    computer.gameboard.placeShip([0,0], Logic.Carrier('horizontal'));
    computer.gameboard.placeShip([1,0], Logic.Battleship('horizontal'));
    computer.gameboard.placeShip([2,0], Logic.Cruiser('horizontal'));
    computer.gameboard.placeShip([3,0], Logic.Submarine('horizontal'));
    computer.gameboard.placeShip([4,0], Logic.Destroyer('horizontal'));
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


