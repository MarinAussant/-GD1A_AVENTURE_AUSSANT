import {Menu,Game} from './loadScenes.js';
import { camera, player, cursors, gameOver } from './variable.js'

var config = {
    type: Phaser.AUTO,
    width: 1920, height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { x: 0 , y:0 },
        debug: true
    }},
    scene: [Menu,Game]
};

new Phaser.Game(config);