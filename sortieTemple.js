const PLAYER_SPEED = 200;
export class SortieTemple extends Phaser.Scene{

    constructor(){

        super("SortieTemple");
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
        this.load.spritesheet('persoRunSideRight','assets/animations/sideRunningRight.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoRunSideLeft','assets/animations/sideRunningLeft.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoRunBot','assets/animations/bottomRunning.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoRunTop','assets/animations/upRunning.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoIdle','assets/animations/idle.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoHitRight','assets/animations/hitRight.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoHitLeft','assets/animations/hitLeft.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoHitUp','assets/animations/hitUp.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoHitBot','assets/animations/hitBot.png',
        { frameWidth: 32, frameHeight: 64 });

        this.load.image('ennemi',"assets/images/ennemi.png");
        this.load.image('gold',"assets/items/goldGround.png");
        this.load.image('shadow',"assets/images/shadow.png");

        this.load.image('coffreDevantCave',"assets/images/frontChestCave.png");
        this.load.image('coffreCoteCave',"assets/images/sideChestCave.png");

        //Load Tiles + TileSet
        this.load.image("Phaser_tuilesdejeu","assets/images/tileset.png");
        this.load.tilemapTiledJSON("carte","assets/jsonTiled.json");
    }
    
    create(){

        const carteDuNiveau = this.add.tilemap("carte");

        // - TILESET
        const tileset = carteDuNiveau.addTilesetImage("placeHolder","Phaser_tuilesdejeu");

        // - DECORS DERRIERE
        const Cave_SortieTemple_Ground = carteDuNiveau.createLayer("Cave_SortieTemple_Ground",tileset);
        const Cave_SortieTemple_Wall = carteDuNiveau.createLayer("Cave_SortieTemple_Wall",tileset);
        const Cave_SortieTemple_Donjon_Back = carteDuNiveau.createLayer("Cave_SortieTemple_Donjon_Back",tileset);

        if (!this.playerState.unlockSortieTemple){
            this.Cave_SortieTemple_CloseWall = carteDuNiveau.createLayer("Cave_SortieTemple_CloseWall",tileset);
            this.Cave_SortieTemple_ClosePorte = carteDuNiveau.createLayer("Cave_SortieTemple_ClosePorte",tileset);
            this.Cave_SortieTemple_ClosePorte.setCollisionByProperty({ collide: true });
        }
        

        this.coffres = this.physics.add.group({allowGravity: false,immovable : true});

        if(!this.playerState.getCoffreSortieTemple){
            this.coffreSortieTemple= this.physics.add.sprite(3680+32,3648+16,"coffreDevantCave");
            this.coffres.add(this.coffreSortieTemple);
        }

        // - PLAYER 

        this.golds = this.physics.add.group({allowGravity: false,immovable : true});

        this.shadow = this.physics.add.image(0,0,'shadow');
        

        if (this.entrance == "donjon"){
            this.player = this.physics.add.sprite(3316, 3997, 'perso').setScale(1);
            this.player.direction = {x:0,y:1};
        }
        else {
            this.player = this.physics.add.sprite(3148, 3846, 'perso').setScale(1);
            this.player.direction = {x:1,y:0};
        }
        this.playerState.canMove = true;
        this.playerState.isPropulsing = false;
        this.player.setSize(15,3).setOffset(8,61);
        this.player.setCollideWorldBounds(true);
        if(this.playerState.getSword) {
            this.player.zoneAttackUpDown = this.physics.add.existing(this.add.rectangle(this.player.x,this.player.y,75,20));
            this.player.zoneAttackGaucheDroite = this.physics.add.existing(this.add.rectangle(this.player.x,this.player.y,20,75));
            this.player.zoneAttackDiag = this.physics.add.existing(this.add.rectangle(this.player.x,this.player.y,35,35));
            this.player.zoneAttackUpDown.body.enable = false;
            this.player.zoneAttackGaucheDroite.body.enable = false;
            this.player.zoneAttackDiag.body.enable = false;
        }

        // - ADD ... choses.... cool ? 

        this.physics.add.collider(this.player,this.coffres,this.collide, null, this);
        this.physics.add.overlap(this.shadow,this.golds, this.getGold, null, this);
        

        this.physics.add.overlap(this.player.zoneAttackUpDown, this.coffres, this.lootCoffre,null,this);
        this.physics.add.overlap(this.player.zoneAttackGaucheDroite, this.coffres, this.lootCoffre,null,this);
        this.physics.add.overlap(this.player.zoneAttackDiag, this.coffres, this.lootCoffre,null,this);

        // - DECORS DEVANT

        this.Cave_SortieTemple_OpenWall = carteDuNiveau.createLayer("Cave_SortieTemple_OpenWall",tileset);
        this.Cave_SortieTemple_OpenPorte = carteDuNiveau.createLayer("Cave_SortieTemple_OpenPorte",tileset);

        if (!this.playerState.unlockSortieTemple){
            this.collideSortieTemple = this.physics.add.collider(this.player, this.Cave_SortieTemple_ClosePorte,this.collide, null, this);
            this.Cave_SortieTemple_OpenWall.alpha = 0;
            this.Cave_SortieTemple_OpenPorte.alpha = 0;
        }

        const Cave_SortieTemple_Donjon_Front = carteDuNiveau.createLayer("Cave_SortieTemple_Donjon_Front",tileset);
        const Cave_SortieTemple_Wall_Front = carteDuNiveau.createLayer("Cave_SortieTemple_Wall_Front",tileset);

        // - COLLISIONS
        const Cave_SortieTemple_Collide = carteDuNiveau.createLayer("Cave_SortieTemple_Collide",tileset);
        Cave_SortieTemple_Collide.alpha = 0;
        Cave_SortieTemple_Collide.setCollisionByProperty({ collide: true }); 
        this.physics.add.collider(this.player, Cave_SortieTemple_Collide, this.collide, null,this);

        // - CONTRÔLE CLAVIER
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', () => this.click = true);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // - CAMERA
        this.cameras.main.setSize(1920, 1080);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setDeadzone(50,50);
        this.cameras.main.setBounds(0,0,4960,6400);
        this.cameras.main.setZoom(3);

        // - ANIMATIONS
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('persoRunSideLeft', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('persoRunSideRight', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('persoRunTop', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'front',
            frames: this.anims.generateFrameNumbers('persoRunBot', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('persoIdle', {start:0,end:7}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'hitRight',
            frames: this.anims.generateFrameNumbers('persoHitRight', {start:0,end:10}),
            frameRate: 33,
            repeat: 0
        });
        this.anims.create({
            key: 'hitLeft',
            frames: this.anims.generateFrameNumbers('persoHitLeft', {start:0,end:10}),
            frameRate: 33,
            repeat: 0
        });
        this.anims.create({
            key: 'hitUp',
            frames: this.anims.generateFrameNumbers('persoHitUp', {start:0,end:10}),
            frameRate: 33,
            repeat: 0
        });
        this.anims.create({
            key: 'hitBot',
            frames: this.anims.generateFrameNumbers('persoHitBot', {start:0,end:10}),
            frameRate: 33,
            repeat: 0
        });

    }
    
    
    update(){

        // - SUIVI DE SHADOW

        this.shadow.body.position.x = this.player.x - 17;
        this.shadow.body.position.y = this.player.y + 6;

        // - ATTAQUE

        if (this.playerState.getSword){
            if (this.click && 
                !this.playerState.isAttacking && 
                !this.playerState.isPropulsing && 
                !this.playerState.isFalling){
                    this.playerState.isAttacking = true;
                    this.click = false;
                    this.attack();
                    this.time.delayedCall(387, () => {
                        this.playerState.isAttacking = false;
                    })

            };
        }

        // - PROPULSA

        if (this.playerState.getBoots){
            if (Phaser.Input.Keyboard.JustDown(this.keySHIFT) && !this.playerState.isAttacking && !this.playerState.isFalling && !this.playerState.isPropulsing && (Math.abs(this.player.direction.x) != Math.abs(this.player.direction.y))){
                this.playerState.canMove = false;
                this.playerState.isPropulsing = true;
                this.propulsing();
            }

            if (this.playerState.isPropulsing && this.playerState.isColliding){
                this.playerState.isPropulsing = false;
                this.playerState.isColliding = false;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0); 
                this.playerState.canMove = true;
            }
        }

        // TRIGGERS BRACELET
        if (this.playerState.getBracelet && Phaser.Input.Keyboard.JustDown(this.keyA) && !this.playerState.isAttacking && !this.playerState.isPropulsing){

            this.player.setVelocityX(0);
            this.player.setVelocityY(0); 
            this.playerState.canMove = false;
            this.cameras.main.fadeOut(300, 184, 231, 249);
            this.time.delayedCall(300, () => {
                this.cameras.main.fadeIn(1000, 184, 231, 249);
                this.playerState.canMove = true;
            })

            if((this.playerState.unlockSortieTemple == false) && this.player.body.position.x <= 3232  && this.player.body.position.x >= 3136 && this.player.body.position.y <= 3904 && this.player.body.position.y >= 3744 ){
                this.playerState.unlockSortieTemple = true;
                this.Cave_SortieTemple_OpenPorte.alpha = 1;
                this.Cave_SortieTemple_OpenWall.alpha = 1;
                this.Cave_SortieTemple_ClosePorte.alpha = 0;
                this.Cave_SortieTemple_CloseWall.alpha = 0;
                this.collideSortieTemple.active = false;
            }
        }

        // - TRIGGERS

        if (this.canOut && (this.player.body.position.x <= 3125 && this.player.body.position.y >= 3808 && this.player.body.position.y <= 3869)){
            this.canOut = false;
		    this.cameras.main.fadeOut(400, 255, 254, 170);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 

			this.time.delayedCall(500, () => {
					this.scene.start('Outdoor', {entrance: "temple", playerState : this.playerState});
			})

        }

        // - MOVEMENT

        if(this.playerState.canMove == true){
            this.playerMovement();
        }
    
    }

    playerMovement(){

        // - DEPLACEMENT ET ANIMATION

        if (this.keyQ.isDown && (!this.keyD.isDown && !this.keyS.isDown && !this.keyZ.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = {x : -1, y : 0};
            this.player.setVelocityX(-PLAYER_SPEED); 
            this.player.setVelocityY(0);
            this.player.anims.play('left', true); 
        }

        if (this.keyQ.isDown && this.keyZ.isDown && (!this.keyD.isDown && !this.keyS.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : -1, y : 1};
            this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2/2)); 
            this.player.anims.play('left', true); 
        }

        if (this.keyQ.isDown && this.keyS.isDown && (!this.keyD.isDown && !this.keyZ.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : -1, y : -1};
            this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2/2));
            this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2/2));
            this.player.anims.play('left', true); 
        }


        if (this.keyD.isDown && (!this.keyQ.isDown && !this.keyS.isDown && !this.keyZ.isDown)){ //sinon si la touche droite est appuyée
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : 0};
            this.player.setVelocityX(PLAYER_SPEED);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true); 
        }

        if (this.keyD.isDown && this.keyS.isDown && (!this.keyQ.isDown && !this.keyZ.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : -1};
            this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2)/2);
            this.player.anims.play('right', true); 
        }

        if (this.keyD.isDown && this.keyZ.isDown && (!this.keyQ.isDown && !this.keyS.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : 1};
            this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2)/2);
            this.player.anims.play('right', true); 
        }

        if (this.keyS.isDown && (!this.keyD.isDown && !this.keyQ.isDown && !this.keyZ.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 0, y : -1};
            this.player.setVelocityX(0);
            this.player.setVelocityY(PLAYER_SPEED);
            this.player.anims.play('front',true);
        }

        if (this.keyZ.isDown && (!this.keyD.isDown && !this.keyS.isDown && !this.keyQ.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 0, y : 1};
            this.player.setVelocityX(0);
            this.player.setVelocityY(-PLAYER_SPEED);
            this.player.anims.play('back',true);
        }

        if (!this.keyQ.isDown && !this.keyD.isDown && !this.keyS.isDown && !this.keyZ.isDown){ 
            this.playerState.isMoving = false; 
            this.player.setVelocityX(0);
            this.player.setVelocityY(0); 
            this.player.anims.play('idle',true); 
        }
    }

    attack(){

        if (this.player.direction.x == 0 && this.player.direction.y == 1){
            this.player.zoneAttackUpDown.x = this.player.x;
            this.player.zoneAttackUpDown.y = (this.player.y) + this.player.body.velocity.y/12;
            this.player.zoneAttackUpDown.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitUp', true); 
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackUpDown.body.enable = false;
            })
        }
        else if (this.player.direction.x == 0 && this.player.direction.y == -1){
            this.player.zoneAttackUpDown.x = this.player.x;
            this.player.zoneAttackUpDown.y = (this.player.y + 48) + this.player.body.velocity.y/12;
            this.player.zoneAttackUpDown.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitBot', true); 
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackUpDown.body.enable = false;
            })
        }
        else if (this.player.direction.x == 1 && this.player.direction.y == 0){
            this.player.zoneAttackGaucheDroite.x = (this.player.x + 32) + this.player.body.velocity.x/12;
            this.player.zoneAttackGaucheDroite.y = this.player.y;
            this.player.zoneAttackGaucheDroite.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitRight', true); 
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackGaucheDroite.body.enable = false;
            })
        }
        else if (this.player.direction.x == -1 && this.player.direction.y == 0){
            this.player.zoneAttackGaucheDroite.x = (this.player.x - 32) + this.player.body.velocity.x/12;
            this.player.zoneAttackGaucheDroite.y = this.player.y;
            this.player.zoneAttackGaucheDroite.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitLeft', true);
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackGaucheDroite.body.enable = false;
            })
        }
        else if (this.player.direction.x == -1 && this.player.direction.y == 1){
            this.player.zoneAttackDiag.x = (this.player.x - 32) + this.player.body.velocity.x/12;
            this.player.zoneAttackDiag.y = (this.player.y) + this.player.body.velocity.y/12;
            this.player.zoneAttackDiag.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitLeft', true);
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackDiag.body.enable = false;
            })
        }
        else if (this.player.direction.x == -1 && this.player.direction.y == -1){
            this.player.zoneAttackDiag.x = (this.player.x - 32) + this.player.body.velocity.x/12;
            this.player.zoneAttackDiag.y = (this.player.y + 32) + this.player.body.velocity.y/12;
            this.player.zoneAttackDiag.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitLeft', true); 
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackDiag.body.enable = false;
            })
        }
        else if (this.player.direction.x == 1 && this.player.direction.y == 1){
            this.player.zoneAttackDiag.x = (this.player.x + 32) + this.player.body.velocity.x/12;
            this.player.zoneAttackDiag.y = (this.player.y) + this.player.body.velocity.y/12;
            this.player.zoneAttackDiag.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitRight', true); 
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackDiag.body.enable = false;
            })
        }
        else if (this.player.direction.x == 1 && this.player.direction.y == -1){
            this.player.zoneAttackDiag.x = (this.player.x + 32) + this.player.body.velocity.x/12;
            this.player.zoneAttackDiag.y = (this.player.y + 32) + this.player.body.velocity.y/12;
            this.player.zoneAttackDiag.body.enable = true;
            this.playerState.canMove = false;
            this.player.anims.play('hitRight', true); 
            this.player.setVelocityX(this.player.body.velocity.x/7);
            this.player.setVelocityY(this.player.body.velocity.y/7);
            this.time.delayedCall(387, () => {
                this.playerState.canMove = true;
                this.player.zoneAttackDiag.body.enable = false;
            })
        }
    }

    propulsing(){
        if (this.player.direction.x != 0){
            this.player.setVelocityX((PLAYER_SPEED*2) * this.player.direction.x);
        }
        else {
            this.player.setVelocityY((PLAYER_SPEED*2) * -this.player.direction.y);
        }
    }

    lootCoffre(zone, coffre){
        coffre.body.enable = false;
        coffre.alpha = 0;
        if(coffre == this.coffreSortieTemple){
            this.playerState.getCoffreSortieTemple = true;
        }
        this.dropGold(coffre.x,coffre.y,Math.floor((Math.random()*5)+10));
    }

    dropGold(x,y,nb){
        this.time.addEvent({        
            delay : nb,
            callback : () => {
                this.golds.create(Math.floor((Math.random()*20)-5) + x,Math.floor((Math.random()*30)-5) + y,"gold").setScale(0.85);
            },
            repeat : nb
        })
    }

    getGold(player, gold){
       
        this.playerState.gold += 1;
        gold.body.enable = false;
        gold.alpha = 0;
            
    }

    collide(){
        if (this.playerState.isPropulsing)this.playerState.isColliding = true;
        else this.playerState.isColliding = false;
    }

}