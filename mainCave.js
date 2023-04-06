const PLAYER_SPEED = 200;
export class MainCave extends Phaser.Scene{

    constructor(){

        super("MainCave");
        this.player;
        this.cursors;
        this.canOut = true;
        this.playerState; 
        this.firstLoad = true;

    }

    init(data)
    {
        this.entrance = data.entrance;
        this.playerState = data.playerState;
		if (this.entrance == "main" || this.entrance == "other"){
			this.cameras.main.fadeIn(500, 35, 22, 21);
        }
		else {
			this.cameras.main.fadeIn(2000, 35, 22, 21);
        }
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
        const Cave_Princ_Ground = carteDuNiveau.createLayer("Cave_Princ_Ground",tileset);
        const Cave_Princ_Wall = carteDuNiveau.createLayer("Cave_Princ_Wall",tileset);
        const Cave_Princ_Donjon = carteDuNiveau.createLayer("Cave_Princ_Donjon",tileset);

        // - PLAYER 

        if (this.entrance == "main"){
            this.player = this.physics.add.sprite(2440, 2736, 'perso').setScale(1);
            this.player.direction = {x:1,y:0};
        }
        else if (this.entrance == "other"){
            this.player = this.physics.add.sprite(2694, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else {
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:0};
            this.playerState = {
                gold : 0,

                isMoving : false,
                isFalling : false,
                isAttacking : false,
                isPropulsing : false,
                isCaping : false,
                isColliding : false,

                canMove : true,

                unlockSortieTemple : false, 
                unlockMainCave : false,
                unlockPropulsa : false,
                unlockSecret1 : false,
                unlockSecret2 : false,
                unlockSecret3 : false,
                unlockCaveau2 : false,

                getSword : true,
                getCape : true,
                getBracelet : true,
                getBoots : true,

            }
        }
        
        this.playerState.canMove = true;
        this.player.setSize(15,3).setOffset(8,45);
        this.player.setCollideWorldBounds(true);

        // - DECORS DEVANT
        const Cave_Princ_Wall_Front = carteDuNiveau.createLayer("Cave_Princ_Wall_Front",tileset);
        const Cave_Princ_Exit = carteDuNiveau.createLayer("Cave_Princ_Exit",tileset);

        // - COLLISIONS
        const Cave_Princ_Collide = carteDuNiveau.createLayer("Cave_Princ_Collide",tileset);
        Cave_Princ_Collide.alpha = 0;
        Cave_Princ_Collide.setCollisionByProperty({ collide: true }); 
        this.physics.add.collider(this.player, Cave_Princ_Collide);

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
        //console.log(this.player.body.position);

        // - TRIGGERS

        if (this.canOut && (this.player.body.position.x <= 2428 && this.player.body.position.y <= 2782)){
            this.canOut = false;
		    this.cameras.main.fadeOut(400, 255, 254, 170);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 

			this.time.delayedCall(500, () => {
					this.scene.start('Outdoor', {entrance: "mainCave", playerState : this.playerState});
			})

        }
        else if (this.canOut && (this.player.body.position.x <= 2735 && this.player.body.position.x >= 2648 && this.player.body.position.y >= 3413)){
            this.canOut = false;
            this.cameras.main.fadeOut(400, 255, 254, 170);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 

			this.time.delayedCall(500, () => {
					this.scene.start('Outdoor', {entrance: "mainCave2", playerState : this.playerState});
			})
        }

        // - MOVEMENT

        if(this.playerState.canMove == true){
            this.playerMovement();
        }
        /*this.moveEnnemi(player);*/
    
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

    loadGame(){
        this.scene.start("Game");
    }
    /*
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
    */


}