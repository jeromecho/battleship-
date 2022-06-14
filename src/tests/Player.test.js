// THIS WILL BREAK
import { Player, Computer, Gameboard, Ship } from '../logic/logic.js'

it('creates player', () => {
    const player = Player('Jerome', Gameboard());
    expect(JSON.stringify(player)).toEqual(JSON.stringify({
        name: 'Jerome',
        gameboard: Gameboard(),
        makeAttack(board, pos) {
            board.receiveAttack(pos);
        },
    }));
});

it('creates computer', () => {
    const computer = Computer(Gameboard());
    expect(JSON.stringify(computer)).toEqual(JSON.stringify({
        name: 'computer', 
        gameboard: Gameboard(),
        makeAttack(board, pos) {
            const attackResult = board.receiveAttack(pos);
            if (! (attackResult === 'attacked same place twice')) {
                return;
            } else {
                makeAttack(board, this.pickPos());
            }
        },
        pickPos: function ()  {
            let y = Math.floor(Math.random() * 10);
            let x = Math.floor(Math.random() * 10);

            return [y, x];
        },
    }));
});

// Q: any other way? Nearest "edge" seems like receiveAttack() being called 
// on enemyBoard, but how can I do this when I am not mocking the 
// receiv3eAttack callback? 
it('player makes attack', () => {
    function tallyAttacksOnBoard(board) {
        let count = 0;
        board.board.forEach(arr => {
            arr.forEach(val => {
                if (val !== 'O') {
                    count ++;
                }
            });
        });
        return count;
    }
    const player = Player('Jerome', Gameboard());
    const enemyBoard = Gameboard();
    player.makeAttack(enemyBoard, [0,0]); 
    expect(tallyAttacksOnBoard(enemyBoard)).toBe(1);
});

it('computer makes attack', () => {
    function tallyAttacksOnBoard(board) {
        let count = 0;
        board.board.forEach(arr => {
            arr.forEach(val => {
                if (val !== 'O') {
                    count ++;
                }
            });
        });
        return count;
    }
    const computer = Computer(Gameboard());
    const enemyBoard = Gameboard();
    computer.makeAttack(enemyBoard, computer.pickPos());
    expect(tallyAttacksOnBoard(enemyBoard)).toBe(1);
});

it('computer does not attack same place twice', () => {
    function tallyAttacksOnBoard(board) {
        let count = 0;
        board.board.forEach(arr => {
            arr.forEach(val => {
                if (val !== 'O') {
                    count ++;
                }
            });
        });
        return count;
    }
    const computer = Computer(Gameboard());
    const enemyBoard = Gameboard();
    computer.makeAttack(enemyBoard, [0,0]);
    computer.makeAttack(enemyBoard, [0,0]);
    expect(tallyAttacksOnBoard(enemyBoard)).toBe(2);
});
