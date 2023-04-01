const PLAYER_SPEED = 200;
export class CavePropulsa extends Phaser.Scene{

    constructor(){

        super("CavePropulsa");
        this.player;
        this.cursors;
        this.canOut = true;
        this.playerState; 

    }

    init(data)
    {
        this.entrance = data.entrance;
        this.playerState = data.playerState;
	    this.cameras.main.fadeIn(500, 35, 22, 21);
        this.canOut = true;

    }

    preload(){
        this.load.spritesheet('perso','assets/images/perso.png',
        { frameWidth: 32, frameHeight: 48 });
        this.load.image('ennemi',"assets/images/ennemi.png");

        //Load Tiles + TileSet
        this.load.image("Phaser_tuilesdejeu","assets/images/tileset.png");
        this.load.tilemapTiledJSON("carte","assets/jsonTiled.json");
    }
    
    create(){

        const carteDuNiveau = this.add.tilemap("carte");

        // - TILESET
        const tileset = carteDuNiveau.addTilesetImage("placeHolder","Phaser_tuilesdejeu");

        // - DECORS DERRIERE
        const Cave_Propulsa_FallFSecond = carteDuNiveau.createLayer("Cave_Propulsa_FallFSecond",tileset);
        const Cave_Propulsa_FallDarkBrown = carteDuNiveau.createLayer("Cave_Propulsa_FallDarkBrown",tileset);
        const Cave_Propulsa_FallBrown = carteDuNiveau.createLayer("Cave_Propulsa_FallBrown",tileset);
        const Cave_Propulsa_FallFirst = carteDuNiveau.createLayer("Cave_Propulsa_FallFirst",tileset);
        const Cave_Propulsa_Ground = carteDuNiveau.createLayer("Cave_Propulsa_Ground",tileset);
        const Cave_Propulsa_Wall = carteDuNiveau.createLayer("Cave_Propulsa_Wall",tileset);
        const Cave_Propulsa_Donjon_Back = carteDuNiveau.createLayer("Cave_Propulsa_Donjon_Back",tileset);

        // - PLAYER 
        if (this.entrance == "enter"){
            this.player = this.physics.add.sprite(2393, 1947, 'perso').setScale(1);
            this.player.direction = {x:-1,y:0};
        }
        else if (this.entrance == "exit"){
            this.player = this.physics.add.sprite(2955, 1644, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        
        this.playerState.isFalling = false;
        this.playerState.canMove = true;
        this.player.setSize(15,3).setOffset(8,45);
        this.player.setCollideWorldBounds(true);

        var rect = this.add.rectangle(this.player.x,this.player.y,35,48);
        this.extraCollide = this.physics.add.existing(rect);
        this.extraCollide.alpha = 0;

        // - DECORS DEVANT
        const Cave_Propulsa_Donjon_Front = carteDuNiveau.createLayer("Cave_Propulsa_Donjon_Front",tileset);
        const Cave_Propulsa_Wall_Front = carteDuNiveau.createLayer("Cave_Propulsa_Wall_Front",tileset);
        const Cave_Propulsa_Exit = carteDuNiveau.createLayer("Cave_Propulsa_Exit",tileset);

        // - COLLISIONS
        const Cave_Propulsa_Collide = carteDuNiveau.createLayer("Cave_Propulsa_Collide",tileset);
        Cave_Propulsa_Collide.alpha = 0;
        Cave_Propulsa_Collide.setCollisionByProperty({ collide: true }); 
        this.physics.add.collider(this.player, Cave_Propulsa_Collide);

        // - DETECTION FALLING
        const Cave_Propulsa_FallOverlap = carteDuNiveau.createLayer("Cave_Propulsa_FallOverlap",tileset);
        Cave_Propulsa_FallOverlap.setCollisionByProperty({ fall: true },true);
        Cave_Propulsa_FallOverlap.alpha = 0.5;
        this.physics.add.collider(this.extraCollide, Cave_Propulsa_FallOverlap,this.playerFalling,null,this);

        // - CONTRÔLE CLAVIER
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // - CAMERA
        this.cameras.main.setSize(1920, 1080);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setDeadzone(20,20);
        this.cameras.main.setBounds(0,0,4960,6400);
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

        // - SUIVI DE EXTRACOLLIDE
        
        this.physics.moveTo(this.extraCollide,this.player.x,this.player.y+25,PLAYER_SPEED);

        // - TRIGGERS

        if (this.canOut && (this.player.body.position.x <= 2417 && this.player.body.position.x >= 2368 && this.player.body.position.y >= 1977 )){
            this.canOut = false;
		    this.cameras.main.fadeOut(400, 255, 254, 170);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 

			this.time.delayedCall(500, () => {
					this.scene.start('Outdoor', {entrance: "propulsaEnter", playerState : this.playerState});
			})

        }
        else if (this.canOut && (this.player.body.position.x <= 2936 && this.player.body.position.y >= 1600 && this.player.body.position.y <= 1661 )){
            this.canOut = false;
		    this.cameras.main.fadeOut(400, 255, 254, 170);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 

			this.time.delayedCall(500, () => {
					this.scene.start('Outdoor', {entrance: "propulsaExit", playerState : this.playerState});
			})

        }

        // - MOVEMENT

        if(this.playerState.canMove == true){
            this.playerMovement();
        }
    
    }

    playerMovement(){

        // - DEPLACEMENT ET ANIMATION

        if (this.cursors.left.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = {x : -1, y : 0};
            this.player.setVelocityX(-PLAYER_SPEED); //si la touche gauche est appuyée //alors vitesse négative en X
            this.player.setVelocityY(0);
            this.player.anims.play('left', true); //et animation => gauche
        }

        if (this.cursors.left.isDown && this.cursors.up.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : -1, y : 1};
            this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2)/2); //si la touche gauche est appuyée //alors vitesse négative en X
            this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2/2)); // (RACINE CARRE 2) / 2
            this.player.anims.play('left', true); //et animation => gauche
        }

        if (this.cursors.left.isDown && this.cursors.down.isDown && (!this.cursors.right.isDown && !this.cursors.up.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : -1, y : -1};
            this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2/2));
            this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2/2));
            this.player.anims.play('left', true); 
        }


        if (this.cursors.right.isDown && (!this.cursors.left.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown)){ //sinon si la touche droite est appuyée
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : 0};
            this.player.setVelocityX(PLAYER_SPEED);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true); 
        }

        if (this.cursors.right.isDown && this.cursors.down.isDown && (!this.cursors.left.isDown && !this.cursors.up.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : -1};
            this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2)/2);
            this.player.anims.play('right', true); 
        }

        if (this.cursors.right.isDown && this.cursors.up.isDown && (!this.cursors.left.isDown && !this.cursors.down.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : 1};
            this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2)/2);
            this.player.anims.play('right', true); 
        }

        if (this.cursors.down.isDown && (!this.cursors.right.isDown && !this.cursors.left.isDown && !this.cursors.up.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 0, y : -1};
            this.player.setVelocityX(0);
            this.player.setVelocityY(PLAYER_SPEED);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 0, y : 1};
            this.player.setVelocityX(0);
            this.player.setVelocityY(-PLAYER_SPEED);
            this.player.anims.play('turn');
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown){ 
            this.playerState.isMoving = false; 
            this.player.setVelocityX(0);
            this.player.setVelocityY(0); 
            this.player.anims.play('turn'); 
        }
    }

    playerFalling(){
        if (this.playerState.isFalling == false){
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/10);
            this.player.setVelocityY(this.player.body.velocity.y/10); 
            this.tweens.add({
                targets:this.player,
                angle:45,
                scaleX:0,
                scaleY:0,
                repeat:0,
                ease: 'Sine.easeIn'
            })
            this.time.delayedCall(1000, () => {
                this.scene.start('CavePropulsa', {entrance: this.entrance, playerState : this.playerState});
        })
        }

        this.playerState.isFalling = true;
    }

}