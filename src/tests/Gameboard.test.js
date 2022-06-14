import { Gameboard, Ship } from '../logic/logic.js';

// * due to behaviour of JSON.stringify(), below does not test for line-by-line 
//   equality in functiosn 
it ('returns Gameboard', () => {
    const gameboard = Gameboard();
    expect(JSON.stringify(gameboard)).toEqual(JSON.stringify({
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
                    positions = positions.concat([y, x + i]);
                }
            } else {
                for (let i = 0; i< ship.length; i++) {
                    positions = positions.concat([y + i, x]);
                }
            }
            addShipToList({ship, positions});
            addShipToBoard(positions);
        },
        receiveAttack: function(pos) {
            let [y, x] = pos;
            if (board[y][x] === 'S') {
                registerHit(pos);
            } else if (board[y][x] === 'O') {
                registerMiss(pos);
            } else  {
                throw new Error('unhandled attack case');
            }
        },
        isAllSunk: false, 
        updateSunkStatus: function () {
            isAllSunk = this.ships.reduce((prev, curr) => {
                if (curr.ship.isSunken === false) {
                    return false;
                }
            }, true);
        },
    }));
});

it('places horizontally', () =>  {
    const gameboard = Gameboard();
    gameboard.placeShip(
        [0,0],
        Ship('horizontal', 5, 'carrier')
    );

    expect(JSON.stringify(gameboard.ships)).toEqual(JSON.stringify([{
        ship: Ship('horizontal', 5, 'carrier'),
        positions: [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]
        ]
    }]));
    const board = gameboard.board;
    const positions = gameboard.ships[0].positions;

    positions.forEach((pos) => {
        let [y, x] = pos;
        expect(board[y][x]).toBe('S');
    });
});

it('places vertically', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(
        [0,0],
        Ship('vertical', 5, 'carrier')
    );

    expect(JSON.stringify(gameboard.ships)).toEqual(JSON.stringify([{
        ship: Ship('vertical', 5, 'carrier'),
        positions: [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
        ]
    }]));
    const board = gameboard.board;
    const positions = gameboard.ships[0].positions;

    positions.forEach((pos) => {
        let [y, x] = pos;
        expect(board[y][x]).toBe('S');
    });
});


it('places multiple ships', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(
        [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.placeShip(
        [5,5],
        Ship('horizontal', 4,'battleship')
    );

    expect(JSON.stringify(gameboard.ships)).toEqual(JSON.stringify([
        {
            ship: Ship('vertical', 5, 'carrier'),
            positions: [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
            ]
        },
        {
            ship: Ship('horizontal', 4, 'battleship'),
            positions: [
                [5, 5], [5, 6], [5, 7], [5, 8]
            ]
        }
    ]));
    const board = gameboard.board;
    gameboard.ships.forEach((ship)  => {
        let positions = gameboard.ships[0].positions;

        positions.forEach((pos) => {
            let [y, x] = pos;
            expect(board[y][x]).toBe('S');
        });
    });
});

it('prevents placing ship in positions already occupied by a ship', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(
        [0,0],
        Ship('vertical', 5, 'carrier')
    );
    expect(JSON.stringify(gameboard.ships)).toEqual(JSON.stringify([
        {
            ship: Ship('vertical', 5, 'carrier'),
            positions: [
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
            ]
        }
    ]));
    expect(gameboard.placeShip(
        [0,0],
        Ship('horizontal', 4, 'battleship')
    )).toBe('Positions already occupied by another ship');
});

it('receives attack - hit', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(
        [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.receiveAttack([0,0]);
    expect(gameboard.board[0][0]).toBe('H');
});

it('receives attack - miss', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(
        [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.receiveAttack([6,6])
    expect(gameboard.board[6][6]).toBe('X');
});

it('isAllSunk false for one ship not sunk', ()  =>  {
    const gameboard = Gameboard();
    gameboard.placeShip( [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.updateSunkStatus();
    expect(gameboard.isAllSunk).toBe(false);
});

it('isAllSunk true for one ship sunk', ()  =>  {
    const gameboard = Gameboard();
    gameboard.placeShip( [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.receiveAttack([0,0]);
    gameboard.receiveAttack([1,0]);
    gameboard.receiveAttack([2,0]);
    gameboard.receiveAttack([3,0]);
    gameboard.receiveAttack([4,0]);

    gameboard.updateSunkStatus();
    expect(gameboard.isAllSunk).toBe(true);
});


it('isAllSunk false when multiple not sunk', () => {
    const gameboard = Gameboard();
    gameboard.placeShip( [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.placeShip( [0,3],
        Ship('horizontal', 4, 'battleship')
    );
    gameboard.placeShip( [5,5],
        Ship('horizontal', 2, 'destroyer')
    );
    gameboard.updateSunkStatus();
    expect(gameboard.isAllSunk).toBe(false);
});

it('isAllSunk false when some not sunk', () => {
    const gameboard = Gameboard();
    gameboard.placeShip( [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.placeShip( [0,3],
        Ship('horizontal', 4, 'battleship')
    );
    gameboard.placeShip( [5,5],
        Ship('horizontal', 2, 'destroyer')
    );
    gameboard.receiveAttack([0,0]);
    gameboard.receiveAttack([1,0]);
    gameboard.receiveAttack([2,0]);
    gameboard.receiveAttack([3,0]);
    gameboard.receiveAttack([4,0]);

    gameboard.updateSunkStatus();
    expect(gameboard.isAllSunk).toBe(false);
});

it('isAllSunk true when all ships sunk', () => {
    const gameboard = Gameboard();
    gameboard.placeShip( [0,0],
        Ship('vertical', 5, 'carrier')
    );
    gameboard.placeShip( [0,3],
        Ship('horizontal', 4, 'battleship')
    );
    gameboard.placeShip( [5,5],
        Ship('horizontal', 2, 'destroyer')
    );
    gameboard.receiveAttack([0,0]);
    gameboard.receiveAttack([1,0]);
    gameboard.receiveAttack([2,0]);
    gameboard.receiveAttack([3,0]);
    gameboard.receiveAttack([4,0]);

    gameboard.receiveAttack([0,3]);
    gameboard.receiveAttack([0,4]);
    gameboard.receiveAttack([0,5]);
    gameboard.receiveAttack([0,6]);

    gameboard.receiveAttack([5,5]);
    gameboard.receiveAttack([5,6]);

    gameboard.updateSunkStatus();
    expect(gameboard.isAllSunk).toBe(true);
});
