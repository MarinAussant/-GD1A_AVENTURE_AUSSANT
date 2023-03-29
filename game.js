var camera;
var player;
var ennemi;
var infoPlayer;
var infoEnnemi;
var cursors;

var gameOver = false;

class Player {

    constructor(name){
        this.name = name;

        this.vitesse = 250;
        this.force = 25;

        this.direction = {x:1,y:0};

        this.life = 100;
        this.coin = 0;

        this.getCape = false;
        this.getBracelet = false;
        this.getBoots = false;
        this.getSword = false;
        
        this.isMoving = false;
        this.isAttacking = false;
        this.isBraceleting = false;
        this.isPropulsing = false;

        this.inventaire = [];
    }

}

class Item {

    constructor(name,soin){
        this.name = name;
        this.soin = soin;
        this.regen = 35;
        this.isDropped = false;
    }

}

class Ennemi {

    constructor(name, force, vitesse, distanceAggro, life, x, y){
        this.id = Ennemi.incrementId();
        this.name = name;
        this.life = life;
        this.force = force;
        this.vitesse = vitesse;
        this.distanceAggro = distanceAggro;

        this.direction = {x : 0, y: 0};
        this.position = {x : x, y : y};
    }

    static incrementId(){
        if (!this.lastestId) { this.lastestId = 1; }
        else { this.lastestId++; }
        return this.lastestId;
    }

}

class Mercenaire extends Ennemi {

    constructor(name,x,y){

        super(name, 25, 150, 150, 100,x,y)
        this.isAggroing = true;
        this.isMoving = false;
        this.isBreaking = false;

        this.cooldown = 0;

        this.radius = 450;

    }

}



class Menu extends Phaser.Scene{

    constructor(){

        super("Menu");
        
    }

    preload(){
        this.load.image('background',"assets/ui/background.png");
        this.load.image('play',"assets/ui/play.png");
    }
    
    create(){

        this.add.image(0, 0, 'background').setOrigin(0,0).setScale(0.8);
        var play = this.add.image(400, 100, 'play').setOrigin(0,0).setScale(0.15).setInteractive();

        play.once('pointerup',this.loadGame,this);

    }
    
    
    update(){
        

    
    }

    loadGame(){
        this.scene.start("MainLevel");
    }


}

class Game extends Phaser.Scene{

    constructor(){

        super("Game");
        
    }

    preload(){
        this.load.image('backgroundGame',"assets/images/Grass_Sample.png");

        //Load SpritSheet
        this.load.spritesheet('perso','assets/images/perso.png',
        { frameWidth: 32, frameHeight: 48 });

        this.load.image('ennemi',"assets/images/ennemi.png");
    }
    
    create(){

        infoPlayer = new Player("Dione");
        infoEnnemi = new Mercenaire("Jason",500,100);

        camera = this.cameras.main.setSize(1920, 1080);
        cursors = this.input.keyboard.createCursorKeys();

        this.add.image(0,0,'backgroundGame').setOrigin(0,0).setScale(2);

        player = this.physics.add.sprite(50, 50, 'perso').setScale(1);
        ennemi = this.physics.add.sprite(500, 100, 'ennemi').setScale(0.125);

        camera.startFollow(player);
        camera.setDeadzone(100,100);
        camera.setBounds(0,0,1920,1080);

        player.setCollideWorldBounds(true);
        ennemi.setCollideWorldBounds(true);
        this.physics.add.collider(player,ennemi);

        // - ANIMATIONS
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:1,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
            frameRate: 10,
            repeat: -1
        });

    }
    
    
    update(){
        


        if (gameOver){return;}

        // - DEPLACEMENT ET ANIMATION
        if (cursors.left.isDown && (!cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : 0};
            player.setVelocityX(-infoPlayer.vitesse); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(0);
            player.anims.play('left', true); //et animation => gauche
        }

        if (cursors.left.isDown && cursors.up.isDown && (!cursors.right.isDown && !cursors.down.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : 1};
            player.setVelocityX(-infoPlayer.vitesse * (Math.SQRT2)/2); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(-infoPlayer.vitesse * (Math.SQRT2/2)); // (RACINE CARRE 2) / 2
            player.anims.play('left', true); //et animation => gauche
        }

        if (cursors.left.isDown && cursors.down.isDown && (!cursors.right.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : -1};
            player.setVelocityX(-infoPlayer.vitesse * -(Math.SQRT2/2)); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(infoPlayer.vitesse * -(Math.SQRT2/2));
            player.anims.play('left', true); //et animation => gauche
        }


        if (cursors.right.isDown && (!cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown)){ //sinon si la touche droite est appuyée
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 1, y : 0};
            player.setVelocityX(infoPlayer.vitesse); //alors vitesse positive en X
            player.setVelocityY(0);
            player.anims.play('right', true); //et animation => droite
        }

        if (cursors.right.isDown && cursors.down.isDown && (!cursors.left.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 1, y : -1};
            player.setVelocityX(infoPlayer.vitesse/1.5); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(infoPlayer.vitesse/1.5);
            player.anims.play('right', true); //et animation => gauche
        }

        if (cursors.right.isDown && cursors.up.isDown && (!cursors.left.isDown && !cursors.down.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 1, y : 1};
            player.setVelocityX(infoPlayer.vitesse * (Math.SQRT2)/2); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(-infoPlayer.vitesse * (Math.SQRT2)/2);
            player.anims.play('right', true); //et animation => gauche
        }


        if (cursors.left.isDown && cursors.down.isDown && (!cursors.right.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : -1};
            player.setVelocityX(-infoPlayer.vitesse * (Math.SQRT2/2)); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(infoPlayer.vitesse * (Math.SQRT2/2));
            player.anims.play('left', true); //et animation => gauche
        }


        if (cursors.down.isDown && (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 0, y : -1};
            player.setVelocityX(0);
            player.setVelocityY(infoPlayer.vitesse);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && (!cursors.right.isDown && !cursors.down.isDown && !cursors.left.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 0, y : 1};
            player.setVelocityX(0);
            player.setVelocityY(-infoPlayer.vitesse);
            player.anims.play('turn');
        }

        if (!cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown){ 
            infoPlayer.isMoving = false; // sinon
            player.setVelocityX(0);
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
        }

        this.moveEnnemi(player);
    
    }

    loadGame(){
        this.scene.start("Game");
    }

    moveEnnemi(player){

        if (infoEnnemi.isBreaking){

            ennemi.setVelocityX(0);
            ennemi.setVelocityY(0);

        }

        if (infoEnnemi.isMoving){

            if (Math.abs(ennemi.direction.x) - Math.abs(ennemi.direction.y) == 0){
                ennemi.setVelocityX(infoEnnemi.direction.x * (infoEnnemi.vitesse * (Math.SQRT2/2)));
                ennemi.setVelocityY(infoEnnemi.direction.y * (infoEnnemi.vitesse * (Math.SQRT2/2)));
            }
            else {
                ennemi.setVelocityX(infoEnnemi.direction.x * infoEnnemi.vitesse);
                ennemi.setVelocityY(infoEnnemi.direction.y * infoEnnemi.vitesse);
            }

        }

        if(infoEnnemi.isReturning){

        }

        if (infoEnnemi.isAggroing){

            let directions = [
                {x: 1, y: 0},
                {x: 1, y: 1},
                {x: 0, y: 1},
                {x: -1, y: 1},
                {x: -1, y: 0},
                {x: -1, y: -1},
                {x: 0, y: -1},
                {x: 1, y: -1},
            ];

            var angle = Phaser.Math.Angle.Between(player.x, player.y, ennemi.x, ennemi.y);
            //var direction = {x : player.position.x}player.position - ennemi.position; 
            //console.log(angle);
            let index = Math.round(angle / (Math.PI / 4)) + 4;
            index > 7 ? index -= 8 : index;
            console.log(index);
            var direction = directions[index];

            if (Math.abs(direction.x) - Math.abs(direction.y) == 0){
                ennemi.setVelocityX(direction.x * (infoEnnemi.vitesse * (Math.SQRT2/2)));
                ennemi.setVelocityY(direction.y * (infoEnnemi.vitesse * (Math.SQRT2/2)));
            }
            else {
                ennemi.setVelocityX(direction.x * infoEnnemi.vitesse);
                ennemi.setVelocityY(direction.y * infoEnnemi.vitesse);
            }
        }

        if(Phaser.Math.Distance.Between(player.x, player.y, ennemi.x, ennemi.y) < infoEnnemi.distanceAggro){
            infoEnnemi.isAggroing = true;
        }
        else{
            infoEnnemi.isAggroing = false;
            infoEnnemi.isBreaking = true;
        }


    }


}

class MainLevel extends Phaser.Scene{

    constructor(){
        super("MainLevel");
    }

    preload(){

        //Load SpritSheet
        this.load.spritesheet('perso','assets/images/perso.png',
        { frameWidth: 32, frameHeight: 48 });
        this.load.image('ennemi',"assets/images/ennemi.png");

        //Load Tiles + TileSet
        this.load.image("Phaser_tuilesdejeu","assets/images/tileset.png");
        this.load.tilemapTiledJSON("carte","assets/jsonTiled.json");

    }
    
    create(){

        var carteDuNiveau = this.add.tilemap("carte");

        // Chargement du jeu de tuile
        var tileset = carteDuNiveau.addTilesetImage("placeHolder","Phaser_tuilesdejeu");


        // Chargement de TOUT les calques... LONG !

        // LES CAVES
        var Cave_Caveau1_Ground = carteDuNiveau.createLayer("Cave_Caveau1_Ground",tileset);
        var Cave_Caveau1_Wall = carteDuNiveau.createLayer("Cave_Caveau1_Wall",tileset);
        var Cave_Caveau1_Fall = carteDuNiveau.createLayer("Cave_Caveau1_Fall",tileset);

        var Cave_Caveau2_Ground = carteDuNiveau.createLayer("Cave_Caveau2_Ground",tileset);
        var Cave_Caveau2_Wall = carteDuNiveau.createLayer("Cave_Caveau2_Wall",tileset);
        var Cave_Caveau2_Fall = carteDuNiveau.createLayer("Cave_Caveau2_Fall",tileset);

        var Cave_SortieTemple_Ground = carteDuNiveau.createLayer("Cave_SortieTemple_Ground",tileset);
        var Cave_SortieTemple_Wall = carteDuNiveau.createLayer("Cave_SortieTemple_Wall",tileset);
        var Cave_SortieTemple_Fall = carteDuNiveau.createLayer("Cave_SortieTemple_Fall",tileset);

        var Cave_Propulsa_FallFSecond = carteDuNiveau.createLayer("Cave_Propulsa_FallFSecond",tileset);
        var Cave_Propulsa_FallBrown = carteDuNiveau.createLayer("Cave_Propulsa_FallBrown",tileset);
        var Cave_Propulsa_FallDarkBrown = carteDuNiveau.createLayer("Cave_Propulsa_FallDarkBrown",tileset);
        var Cave_Propulsa_FallFirst = carteDuNiveau.createLayer("Cave_Propulsa_FallFirst",tileset);
        var Cave_Propulsa_Ground = carteDuNiveau.createLayer("Cave_Propulsa_Ground",tileset);
        var Cave_Propulsa_Wall = carteDuNiveau.createLayer("Cave_Propulsa_Wall",tileset);
        var Cave_Propulsa_Fall = carteDuNiveau.createLayer("Cave_Propulsa_Fall",tileset);
        var Cave_Propulsa_Donjon = carteDuNiveau.createLayer("Cave_Propulsa_Donjon",tileset);

        var Cave_Secret3_Ground = carteDuNiveau.createLayer("Cave_Secret3_Ground",tileset);
        var Cave_Secret3_Wall = carteDuNiveau.createLayer("Cave_Secret3_Wall",tileset);
        var Cave_Secret3_Fall = carteDuNiveau.createLayer("Cave_Secret3_Fall",tileset);

        var Cave_Secret2_Ground = carteDuNiveau.createLayer("Cave_Secret2_Ground",tileset);
        var Cave_Secret2_Wall = carteDuNiveau.createLayer("Cave_Secret2_Wall",tileset);
        var Cave_Secret2_Fall = carteDuNiveau.createLayer("Cave_Secret2_Fall",tileset);

        var Cave_Secret1_Ground = carteDuNiveau.createLayer("Cave_Secret1_Ground",tileset);
        var Cave_Secret1_Wall = carteDuNiveau.createLayer("Cave_Secret1_Wall",tileset);
        var Cave_Secret1_Fall = carteDuNiveau.createLayer("Cave_Secret1_Fall",tileset);

        var Cave_Princ_Ground = carteDuNiveau.createLayer("Cave_Princ_Ground",tileset);
        var Cave_Princ_Wall = carteDuNiveau.createLayer("Cave_Princ_Wall",tileset);
        var Cave_Princ_Fall = carteDuNiveau.createLayer("Cave_Princ_Fall",tileset);
        var Cave_Princ_Donjon = carteDuNiveau.createLayer("Cave_Princ_Donjon",tileset);

        // COLLISIONS CAVE
        var Cave_Collide = carteDuNiveau.createLayer("Cave_Collide",tileset);

        
        // EXTERIEUR

        var Ext_BlackFall = carteDuNiveau.createLayer("Ext_BlackFall",tileset);
        var Ext_Fall_Second = carteDuNiveau.createLayer("Ext_Fall_Second",tileset);
        var Ext_BlackBrownFall = carteDuNiveau.createLayer("Ext_BlackBrownFall",tileset);
        var Ext_BrownFall = carteDuNiveau.createLayer("Ext_BrownFall",tileset);
        var Ext_Fall_First = carteDuNiveau.createLayer("Ext_Fall_First",tileset);
        var Ext_Ground = carteDuNiveau.createLayer("Ext_Ground",tileset);
        var Ext_Wall_Back_Other = carteDuNiveau.createLayer("Ext_Wall_Back_Other",tileset);
        var Ext_Wall_Back = carteDuNiveau.createLayer("Ext_Wall_Back",tileset);
        var Donjon2 = carteDuNiveau.createLayer("Donjon 2",tileset);

        // Chargement du joueur...
        player = this.physics.add.sprite(500, 3000, 'perso').setScale(1);
        infoPlayer = new Player("Dione");

        var Donjon = carteDuNiveau.createLayer("Donjon",tileset);
        var Ext_Wall_Front_Other = carteDuNiveau.createLayer("Ext_Wall_Front_Other",tileset);
        var Ext_Wall_Front = carteDuNiveau.createLayer("Ext_Wall_Front",tileset);

        // COLLISIONS EXTERIEUR
        var Ext_Collide = carteDuNiveau.createLayer("Ext_Collide",tileset);
        Ext_Collide.setCollisionByProperty({ collide: true });
        Ext_Collide.alpha = 0;

        camera = this.cameras.main.setSize(1920, 1080);
        cursors = this.input.keyboard.createCursorKeys();
        
        player.setSize(15,3).setOffset(8,45);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, Ext_Collide);

        camera.startFollow(player);
        camera.setDeadzone(20,20);
        camera.setBounds(0,0,4960,6400);
        this.cameras.main.setZoom(2);




        // - ANIMATIONS
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:1,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
            frameRate: 10,
            repeat: -1
        });

    }
    
    
    update(){
        


        if (gameOver){return;}

        // - DEPLACEMENT ET ANIMATION
        if (cursors.left.isDown && (!cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : 0};
            player.setVelocityX(-infoPlayer.vitesse); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(0);
            player.anims.play('left', true); //et animation => gauche
        }

        if (cursors.left.isDown && cursors.up.isDown && (!cursors.right.isDown && !cursors.down.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : 1};
            player.setVelocityX(-infoPlayer.vitesse * (Math.SQRT2)/2); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(-infoPlayer.vitesse * (Math.SQRT2/2)); // (RACINE CARRE 2) / 2
            player.anims.play('left', true); //et animation => gauche
        }

        if (cursors.left.isDown && cursors.down.isDown && (!cursors.right.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : -1};
            player.setVelocityX(-infoPlayer.vitesse * -(Math.SQRT2/2)); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(infoPlayer.vitesse * -(Math.SQRT2/2));
            player.anims.play('left', true); //et animation => gauche
        }


        if (cursors.right.isDown && (!cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown)){ //sinon si la touche droite est appuyée
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 1, y : 0};
            player.setVelocityX(infoPlayer.vitesse); //alors vitesse positive en X
            player.setVelocityY(0);
            player.anims.play('right', true); //et animation => droite
        }

        if (cursors.right.isDown && cursors.down.isDown && (!cursors.left.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 1, y : -1};
            player.setVelocityX(infoPlayer.vitesse/1.5); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(infoPlayer.vitesse/1.5);
            player.anims.play('right', true); //et animation => gauche
        }

        if (cursors.right.isDown && cursors.up.isDown && (!cursors.left.isDown && !cursors.down.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 1, y : 1};
            player.setVelocityX(infoPlayer.vitesse * (Math.SQRT2)/2); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(-infoPlayer.vitesse * (Math.SQRT2)/2);
            player.anims.play('right', true); //et animation => gauche
        }


        if (cursors.left.isDown && cursors.down.isDown && (!cursors.right.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : -1, y : -1};
            player.setVelocityX(-infoPlayer.vitesse * (Math.SQRT2/2)); //si la touche gauche est appuyée //alors vitesse négative en X
            player.setVelocityY(infoPlayer.vitesse * (Math.SQRT2/2));
            player.anims.play('left', true); //et animation => gauche
        }


        if (cursors.down.isDown && (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 0, y : -1};
            player.setVelocityX(0);
            player.setVelocityY(infoPlayer.vitesse);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && (!cursors.right.isDown && !cursors.down.isDown && !cursors.left.isDown)){
            infoPlayer.isMoving = true;
            infoPlayer.direction = { x : 0, y : 1};
            player.setVelocityX(0);
            player.setVelocityY(-infoPlayer.vitesse);
            player.anims.play('turn');
        }

        if (!cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown){ 
            infoPlayer.isMoving = false; // sinon
            player.setVelocityX(0);
            player.setVelocityY(0); //vitesse nulle
            player.anims.play('turn'); //animation fait face caméra
        }
    
    }

    loadGame(){
        this.scene.start("Game");
    }

}


var config = {
    type: Phaser.AUTO,
    width: 4960, height: 6400,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { x: 0 , y:0 },
        debug: true
    }},
    scene: [Menu,Game,MainLevel]
};

new Phaser.Game(config);