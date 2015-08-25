// Class that all sprites derive from
var GameObject = function (sprite, x, y) {
    'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our game objects, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

// Draw the sprite on the screen, required method for game
GameObject.prototype.render = function () {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
var Enemy = function () {
    'use strict';
    GameObject.call(this, 'images/enemy-bug.png', 0, 0);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = 0;
    this.active = false;
};
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    'use strict';
    GameObject.call(this, 'images/char-cat-girl.png', 0, 0);
};
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

// Handle the player's input
Player.prototype.handleInput = function (keyCode) {
    'use strict';
    var stepX = 101,
        stepY = 83;

    switch (keyCode) {
        case 'left':
            this.x -= stepX;
            if (this.x < 0) {
                this.x += stepX;
            }
            break;
        case 'right':
            this.x += stepX;
            if (this.x > 4 * stepX) {
                this.x -= stepX;
            }
            break;
        case 'up':
            this.y -= stepY;
            if (this.y < -stepY) {
                this.y += stepY;
            }
            break;
        case 'down':
            this.y += stepY;
            if (this.y > 5 * stepY) {
                this.y -= stepY;
            }
            break;
        default:
        // no op
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var createEnemies = function (numEnemies) {
    'use strict';
    var enemies = [];
    for (var i = 0; i < numEnemies; i += 1) {
        enemies.push(new Enemy());
    }
    return enemies;
};

var allEnemies = createEnemies(10);
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
