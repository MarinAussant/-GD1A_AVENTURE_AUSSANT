var camera;
var player;
var cursors;

var gameOver = false;

class Menu extends Phaser.Scene{

    constructor(){

        super("Menu");
        
    }

    preload(){
        
    }
    
    create(){

        this.add.image(0, 0, 'assets/ui/background').setOrigin(0,0).setScale(1);
        var play = this.add.image(400, 300, 'assets/ui/play').setOrigin(0,0).setScale(1).setInteractive();

        play.once('pointerup',this.loadGame,this);

    }
    
    
    update(){
        

    
    }

    loadGame(){
        this.scene.start("Game");
    }


}

class Game extends Phaser.Scene{

    constructor(){

        super("Game");
        
    }

    preload(){
        this.load.image('background',"assets/images/Grass_Sample.png");

        //Load SpritSheet
        this.load.spritesheet('perso','assets/images/perso.png',
        { frameWidth: 32, frameHeight: 48 });
    }
    
    create(){

        camera = this.cameras.main.setSize(1920, 1080);

        this.add.image(0,0,'background').setOrigin(0,0).setScale(2);

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
        if (cursors.left.isDown){
            player.setVelocityX(-playerSpeed); //si la touche gauche est appuyée //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche

        }
        else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(playerSpeed); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => droite

        }
        else if (cursors.down.isDown){
            player.setVelocityY(playerSpeed);
            player.anims.play('turn');
        }
        else if (cursors.up.isDown){
            player.setVelocityY(-playerSpeed);
            player.anims.play('turn');
        }
        else{ // sinon
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