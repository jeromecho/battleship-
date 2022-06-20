import Logic from '../logic/logic.js'

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
    const player = Logic.Player('Jerome', Logic.Gameboard());
    const enemyBoard = Logic.Gameboard();
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
    const computer = Logic.Computer(Logic.Gameboard());
    const enemyBoard = Logic.Gameboard();
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
    const computer = Logic.Computer(Logic.Gameboard());
    const enemyBoard = Logic.Gameboard();
    computer.makeAttack(enemyBoard, [0,0]);
    computer.makeAttack(enemyBoard, [0,0]);
    expect(tallyAttacksOnBoard(enemyBoard)).toBe(2);
});
