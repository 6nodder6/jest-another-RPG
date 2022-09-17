const Enemy = require('../lib/Enemy.js');
const Player = require('../lib/Player.js');

const Potion = require('../lib/Potion.js')
jest.mock('../lib/Potion.js');



test('creates a player object', () => {
    const player = new Player('Ian');

    expect(player.name).toBe('Ian');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test('gets players stats as an object', () => {
    const player = new Player('Ian');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');

});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');


    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];
    expect(player.getInventory()).toEqual(false);
});

test('gets players health value', () => {
    const player = new Player('Ian');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('checks if player is alive or not', () => {
    const player = new Player('Ian');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});


test('subtracts health from the palyer', () => {
    const player = new Player('Ian');

    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(999999);

    expect(player.health).toBe(0);
});

test('gets players attack value', () => {
    const player = new Player('Ian');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('adds a potion to the inventory', () => {
    const player = new Player('Ian');

    const oldCount = player.inventory.length;


    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const player = new Player('Ian');

    player.inventory = [new Potion(), new Potion(), new Potion()];

    const oldCount = player.inventory.length;

    player.usePotion(1);
    expect(player.inventory.length).toBeLessThan(oldCount);
});


test('gets a description of the enemy', () =>{
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});