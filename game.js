var camera;
var player;
var infoPlayer;
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

        super(name, 25, 200, 300, 100,x,y)

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
        infoPlayer = new Player("Dione");
        this.scene.start("Game");
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
    }
    
    create(){

        camera = this.cameras.main.setSize(1920, 1080);
        cursors = this.input.keyboard.createCursorKeys();

        this.add.image(0,0,'backgroundGame').setOrigin(0,0).setScale(2);

        player = this.physics.add.sprite(50, 50, 'perso').setScale(1);

        camera.startFollow(player);
        camera.setDeadzone(100,100);
        camera.setBounds(0,0,1920,1080);

        player.setCollideWorldBounds(true);

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

        console.log(infoPlayer.direction);
    
    }

    loadGame(){
        this.scene.start("Game");
    }


}





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