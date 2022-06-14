import { Ship } from '../logic/logic.js';

// Question: Why didn't .toEqual() work as I expected here?
it ('creates carrier', () => {
    expect(JSON.stringify(Ship('horizontal', 5, 'carrier'))).toEqual(JSON.stringify({
        name: 'carrier',
        length: 5,
        hitCount: 0,
        hit: function (pos) {
            this.hitCount ++;
        },
        updateSunkStatus: function () {
            if (hitCount === length) {
                this.isSunken = true;
            }
        },
        orientation: 'horizontal',
        isSunken: false,
    }));
});

it ('creates battleship', () => {
    expect(JSON.stringify(Ship('vertical', 4, 'battleship'))).toEqual(JSON.stringify({
        name: 'battleship',
        length: 4,
        hitCount: 0,
        hit: function (pos) {
            this.hitCount ++;
        },
        updateSunkStatus: function () {
            if (hitCount === length) {
                this.isSunken = true;
            }
        },
        orientation: 'vertical',
        isSunken: false,
    }));
});

it ('creates cruiser', () => {
    expect(JSON.stringify(Ship('horizontal', 3, 'cruiser'))).toEqual(JSON.stringify({
        name: 'cruiser',
        length: 3,
        hitCount: 0,
        hit: function (pos) {
            this.hitCount ++; 
        },
        updateSunkStatus: function () {
            if (hitCount === length) {
                this.isSunken = true;
            }
        },
        orientation: 'horizontal',
        isSunken: false,
    }));
});

it ('creates  submarine', () => {
    expect(JSON.stringify(Ship('horizontal', 3, 'submarine'))).toEqual(JSON.stringify({
        name: 'submarine',
        length: 3,
        hitCount: 0,
        hit: function (pos) {
            this.hitCount ++;
        },
        updateSunkStatus: function () {
            if (hitCount === length) {
                this.isSunken = true;
            }
        },
        orientation: 'horizontal',
        isSunken: false,
    }));
});

it ('creates destroyer', () => {
    expect(JSON.stringify(Ship('horizontal', 2, 'destroyer'))).toEqual(JSON.stringify({
        name: 'destroyer',
        length: 2,
        hitCount: 0,
        hit: function (pos) {
            this.hitCount++; 
        },
        updateSunkStatus: function () {
            if (hitCount === length) {
                this.isSunken = true;
            }
        },
        orientation: 'horizontal',
        isSunken: false,
    }));
});

// To test or not to test?

it ('hits once', () => {
    const ship = Ship('horizontal', 4, 'battleship');
    ship.hit();
    expect(ship.hitCount).toBe(1);
});

it ('hits multiple times', () => {
    const ship = Ship('horizontal', 4, 'battleship');
    ship.hit();
    ship.hit();
    expect(ship.hitCount).toBe(2);
});

it ('displays unsunk status for no hits', () => {
    const ship = Ship('horizontal', 4, 'battleship');
    ship.updateSunkStatus();
    expect(ship.isSunken).toBe(false);
});

it ('displays unsunk status for some hits', () => {
    const ship = Ship('horizontal', 4, 'battleship');
    ship.hit();
    ship.updateSunkStatus();
    expect(ship.isSunken).toBe(false);
});

it ('displays sunk status', () => {
    const ship = Ship([0,0], 4, 'battleship');
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.updateSunkStatus();
    expect(ship.isSunken).toBe(true); 
});





