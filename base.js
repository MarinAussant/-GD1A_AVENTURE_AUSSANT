import { MainCave as MainCave } from "./mainCave.js";
import { Menu as Menu } from "./menu.js";
import { Outdoor as Outdoor } from "./outdoor.js";


var config =
{
    type: Phaser.AUTO,
	scale: {
        
        width: 4960, 
        height: 6400
    },
    physics:
    {
        default: 'arcade',
        arcade:
        {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ Menu, MainCave, Outdoor],
    pixelArt: true,
    input:
    {
        gamepad: true
    }
};

new Phaser.Game(config);