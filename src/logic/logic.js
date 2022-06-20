// pos is an array of coordinates in form [y, x]

const Logic = (function () {
    const Carrier = (orientation) => Ship(orientation, 5, 'carrier');
    const Battleship = (orientation) => Ship(orientation, 4, 'battleship');
    const Cruiser = (orientation) => Ship(orientation, 3, 'cruiser');
    const Submarine = (orientation) => Ship(orientation, 3, 'submarine');
    const Destroyer = (orientation) => Ship(orientation, 2, 'destroyer');

    const Ship = (orientation, length, name) => {
        return ({
            name: name,
            length: length,
            hitCount: 0,
            hit: function () {
                this.hitCount ++;
            },
            updateSunkStatus: function () {
                if (this.hitCount === length) {
                    this.isSunken = true;
                }
            },
            orientation: orientation,
            isSunken: false, 
        })
    };

    // Solve problems one at a time, hardcode ships to positions
    const Gameboard = () => {
        function updateBoard(pos, isHit) {
            // context is Gameboard object (this)
            // IS CONTEXT HERE an address or a copy? If a copy, maybe we do need 
            // bind
            // 1. Passing in as context didn't wor 
            // 2. Bind didn't work either 
            // NEXT: See what this is. If good, check logic of test

            let copy = this.board;
            let [y, x] = pos;
            if (isHit) {
                copy[y][x] = 'H';
            } else {
                copy[y][x] = 'X';
            }
            this.board = copy;
        }

        function addShipToList(ship, positions) {
            this.ships = this.ships.concat([{ ship, positions }]);
        }

        function addShipToBoard(positions) {
            let copy = this.board;
            positions.forEach(pos => {
                let [y, x] = pos;
                copy[y][x] = 'S';
            });

            this.positions = copy;
        }

        function isContainingPos(positions, pos) {
            let [targetY, targetX] = pos;
            for (let i = 0; i < positions.length; i ++) {
                let [shipY, shipX] = positions[i];
                if (shipY === targetY && shipX === targetX) {
                    return true;
                }
            }
            return false;
        }

        // only runs after ships have been placed on board
        function registerHit(pos) {
            this.ships = this.ships.map(obj => {
                let copy = Object.assign({}, obj)
                if (isContainingPos(copy['positions'], pos)) {
                    // increment hitcount 
                    copy['ship'].hit();
                    // update the board
                    let boundUpdateBoard = updateBoard.bind(this, pos, true);

                    boundUpdateBoard();
                }
                return copy;
            });
        }

        // only runs after ships have been placed on board
        function registerMiss(pos) {
            let boundUpdateBoard = updateBoard.bind(this, pos, false);

            // TESTING
            boundUpdateBoard();
        }

        function isPositionsOccupied(positions) {
            let isAPositionOccupied = false;
            positions.forEach((pos) => {
                let [y, x] = pos;
                if (this.board[y][x] === 'S') {
                    isAPositionOccupied = true;
                } 
            });
            return isAPositionOccupied;
        }

        function isPositionsInBoard(positions) {
            let isPositionsValid = true; 
            positions.forEach(pos  => {
                let [y, x] = pos;
                if (y >= 10 || x>= 10) {
                    isPositionsValid = false;
                }
            })

            return isPositionsValid;
        }

        function updateShipsStatus() {
            //  TODO 
            //  Run updateSunkStatus of each ship 
            let copy = this.ships.slice();
            copy.forEach(obj => {
                obj['ship'].updateSunkStatus();
            });

            this.ships = copy;
        }

        function removeShip(positions, occupyingShipIndex) {
            const boundRemoveShipFromBoard = removeShipFromBoard.bind(this, positions);
            const boundRemoveShipFromList = removeShipFromList.bind(this, occupyingShipIndex);
            boundRemoveShipFromBoard();
            boundRemoveShipFromList();
        }

        function removeShipFromBoard(positions) {
            let boardCopy = this.board;
            positions.forEach(pos => {
                let [y, x] = pos;
                boardCopy[y][x] = 'O';
            });
            this.board = boardCopy;
        }

        function removeShipFromList(occupyingShipIndex) {
            let shipsCopy = this.ships;
            shipsCopy.splice(occupyingShipIndex, 1);
            this.ships = shipsCopy;
        }

        function rotateShip(occupyingShipPositions, occupyingShip) {
            if (occupyingShip.orientation === 'horizontal') {
                let posToPlace = occupyingShipPositions.reduce((prev, curr) => {
                    let [prevY, prevX] = prev;
                    let [currY, currX] = curr;
                    if (currX < prevX) {
                        return curr;
                    } else {
                        return prev;
                    }
                });
                let attempt = this.placeShip(posToPlace, {
                    ...occupyingShip,
                    orientation: 'vertical',
                });
                if (attempt === 'Invalid ship placement') {
                    this.placeShip(posToPlace,  {
                        ...occupyingShip,
                        orientation: 'horizontal',
                });
                }
            } else {
                let posToPlace = occupyingShipPositions.reduce((prev, curr) => {
                    let [prevY, prevX] = prev;
                    let [currY, currX] = curr;
                    if (currY < prevY) {
                        return curr;
                    } else {
                        return prev;
                    }
                });
                let attempt = this.placeShip(posToPlace, {
                    ...occupyingShip,
                    orientation: 'horizontal',
                });
                if (attempt === 'Invalid ship placement') {
                    this.placeShip(posToPlace,  {
                        ...occupyingShip,
                        orientation: 'vertical',
                });
                }
            }
        }

        return ({
            //  O - open 
            //  S - ship 
            //  H - hit ship
            //  X - missed shot
            board: [
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O'],
                ['O','O','O','O','O','O','O','O','O','O']
            ],
            ships: [],
            placeShip: function(pos, ship) {
                let [y, x] = pos; 
                let positions = [];
                if (ship.orientation === 'horizontal') {
                    for (let i = 0; i < ship.length; i++) {
                        positions = positions.concat([[y, (x + i)]]);
                    }    
                } else {
                    for (let i = 0; i < ship.length; i++) {
                        positions = positions.concat([[(y + i), x]]);
                    }
                }

                let boundIsPositionsOccupied = isPositionsOccupied.bind(this, positions);
                if (isPositionsInBoard(positions) && !(boundIsPositionsOccupied())) {
                    // * does returning a bound copy use more computer resources? 
                    // keeps track in logic       
                    let boundAddShipToList = addShipToList.bind(this, ship, positions);
                    boundAddShipToList();
                    // responsible for mutating board
                    let boundAddShipToBoard = addShipToBoard.bind(this, positions);
                    boundAddShipToBoard();
                } else {
                    // handler that displays message to DOM;
                    return 'Invalid ship placement';
                }
            },
            orientateShip: function(pos) {
                let [y, x] = pos;
                let occupyingShip;
                let occupyingShipIndex;
                let occupyingShipPositions;
                this.ships.forEach((obj, index) => {
                    obj.positions.forEach(pos => {
                        let [objY, objX] = pos;
                        if (objY === y && objX === x) {
                            occupyingShipPositions =  obj.positions;
                            occupyingShip = obj.ship;
                            occupyingShipIndex = index;
                        }
                    });
                });
                const boundRemoveShip = removeShip
                    .bind(this,
                    occupyingShipPositions,
                    occupyingShipIndex);
                boundRemoveShip();

                const boundRotateShip = rotateShip
                    .bind(this, occupyingShipPositions, occupyingShip);
                boundRotateShip();
            },
            receiveAttack: function(pos) {
                let [y, x] = pos;
                if (this.board[y][x] === 'S') {
                    let boundRegisterHit = registerHit.bind(this, pos);
                    boundRegisterHit();
                } else if (this.board[y][x] === 'O') {
                    let boundRegisterMiss = registerMiss.bind(this, pos);
                    boundRegisterMiss();
                    // TODO - attack case for 'X' - return something so computer 
                    // and Player know
                } else if (this.board[y][x]  === 'X' || this.board[y][x] === 'H') {
                    return 'attacked same place twice';
                } else  {
                    // suppose receiveAttack is only called only on 'O' or 'S' and 
                    // not on a 'H' for the more-than-frist time
                    throw new Error('unhandled attack case');
                }
                let boundUpdateShipsStatus = updateShipsStatus.bind(this);
                boundUpdateShipsStatus();
            },
            isAllSunk: false, 
            updateSunkStatus: function () {
                let isAllSunk = true; 
                this.ships.forEach(obj => {
                    obj['ship'].updateSunkStatus();
                    if (obj['ship'].isSunken === false) {
                        isAllSunk = false;
                    }
                });
                this.isAllSunk = isAllSunk;
            },
        });
    };

    const Player = (name, gameboard) => {
        return ({
            name: name,
            gameboard: gameboard,
            makeAttack(board, pos) {
                board.receiveAttack(pos);
            },

        })
    };

    const Computer = (gameboard) => {
        const player = Player('Computer', gameboard);

        return ({
            ...player,
            makeAttack(board, pos) {
                const attackResult = board.receiveAttack(pos);
                if (! (attackResult === 'attacked same place twice')) {
                    return;
                } else {
                    this.makeAttack(board, this.pickPos());
                }
            },
            pickPos: function ()  {
                let y = Math.floor(Math.random() * 10);
                let x = Math.floor(Math.random() * 10);

                return [y, x];
            },
        });
    };

    return {
        Ship, 
        Gameboard, 
        Player, 
        Computer, 
        Carrier, 
        Battleship, 
        Cruiser,
        Submarine,
        Destroyer
    }
})();

export default Logic;

