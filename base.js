import { MainCave as MainCave } from "./mainCave.js";
import { Menu as Menu } from "./menu.js";
import { Outdoor as Outdoor } from "./outdoor.js";
import { Secret1 as Secret1 } from "./secret1.js";
import { Secret2 as Secret2 } from "./secret2.js";
import { Secret3 as Secret3 } from "./secret3.js";
import { CavePropulsa as CavePropulsa } from "./cavePropulsa.js";
import { SortieTemple as SortieTemple } from "./sortieTemple.js";
import { Caveau1 as Caveau1 } from "./caveau1.js";
import { Caveau2 as Caveau2 } from "./caveau2.js";


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
            debug: true
        }
    },
    scene: [ Menu, MainCave, Outdoor, Secret1, Secret2, Secret3, CavePropulsa, SortieTemple, Caveau1, Caveau2],
    pixelArt: true,
    input:
    {
        gamepad: true
    }
};

new Phaser.Game(config);