const PLAYER_SPEED = 200;
export class Secret2 extends Phaser.Scene{

    constructor(){

        super("Secret2");
        this.player;
        this.cursors;
        this.canOut = true;
        this.playerState; 
        this.controller = false;
    }

    init(data)
    {
        this.entrance = data.entrance;
        this.playerState = data.playerState;
	    this.cameras.main.fadeIn(500, 35, 22, 21);
        this.canOut = true;

    }

    preload(){
        // UI
        this.load.spritesheet('uiLife','assets/ui/uiLife.png',
        { frameWidth: 1920, frameHeight: 1080 });
        this.load.image('uiInvGold',"assets/ui/uiInvGold.png");
        this.load.image('sword',"assets/items/cimeterre.png");
        this.load.image('cape',"assets/items/cape.png");
        this.load.image('braceletInv',"assets/items/bracelet.png");
        this.load.image('boot',"assets/items/boot.png");

        // Srritesheet Perso Principal 

        // Déplacement
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
        // Attaque
        this.load.spritesheet('persoHitRight','assets/animations/hitRight.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoHitLeft','assets/animations/hitLeft.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoHitUp','assets/animations/hitUp.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('persoHitBot','assets/animations/hitBot.png',
        { frameWidth: 32, frameHeight: 64 });
        // Propulsion
        this.load.spritesheet('propulsaRight','assets/animations/propulsaRight.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('propulsaLeft','assets/animations/propulsaLeft.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('propulsaBot','assets/animations/propulsaBot.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('propulsaTop','assets/animations/propulsaTop.png',
        { frameWidth: 32, frameHeight: 64 });
        // Bracelet
        this.load.spritesheet('bracelet','assets/animations/bracelet.png',
        { frameWidth: 32, frameHeight: 64 });

        this.load.image('ennemi',"assets/images/ennemi.png");
        this.load.image('gold',"assets/items/goldGround.png");
        this.load.image('life',"assets/items/lifeGround.png");
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
        const Cave_Secret2_Ground = carteDuNiveau.createLayer("Cave_Secret2_Ground",tileset);
        const Cave_Secret2_Wall = carteDuNiveau.createLayer("Cave_Secret2_Wall",tileset);
        const Cave_Secret2_Donjon_Back = carteDuNiveau.createLayer("Cave_Secret2_Donjon_Back",tileset);

        this.coffres = this.physics.add.group({allowGravity: false,immovable : true});

        if(!this.playerState.getCoffreSecret2){
            this.coffreSecret2 = this.physics.add.sprite(2336+32,3584+16,"coffreDevantCave");
            this.coffres.add(this.coffreSecret2);
        }

        // - PLAYER 

        this.golds = this.physics.add.group({allowGravity: false,immovable : true});
        this.lifes = this.physics.add.group({allowGravity: false,immovable : true});

        this.shadow = this.physics.add.image(0,0,'shadow');

        this.windForce = {x:0,y:0};
        
        this.player = this.physics.add.sprite(2092, 3721, 'perso').setScale(1);
        this.player.direction = {x:1,y:0};
        this.playerState.canMove = true;
        this.playerState.isPropulsing = false;
        this.player.setSize(15,3).setOffset(8,61);
        this.player.setCollideWorldBounds(true);

        this.player.zoneAttackUpDown = this.physics.add.existing(this.add.rectangle(this.player.x,this.player.y,75,40));
        this.player.zoneAttackGaucheDroite = this.physics.add.existing(this.add.rectangle(this.player.x,this.player.y,40,75));
        this.player.zoneAttackDiag = this.physics.add.existing(this.add.rectangle(this.player.x,this.player.y,50,50));
        this.player.zoneAttackUpDown.body.enable = false;
        this.player.zoneAttackGaucheDroite.body.enable = false;
        this.player.zoneAttackDiag.body.enable = false;

        // - ADD ... choses.... cool ? 

        this.physics.add.collider(this.player,this.coffres,this.collide, null, this);
        this.physics.add.overlap(this.shadow,this.golds, this.getGold, null, this);
        this.physics.add.overlap(this.shadow,this.lifes, this.getLife, null, this);
        

        this.physics.add.overlap(this.player.zoneAttackUpDown, this.coffres, this.lootCoffre,null,this);
        this.physics.add.overlap(this.player.zoneAttackGaucheDroite, this.coffres, this.lootCoffre,null,this);
        this.physics.add.overlap(this.player.zoneAttackDiag, this.coffres, this.lootCoffre,null,this);

        // - DECORS DEVANT
        const Cave_Secret2_Donjon_Front = carteDuNiveau.createLayer("Cave_Secret2_Donjon_Front",tileset);
        const Cave_Secret2_Wall_Front = carteDuNiveau.createLayer("Cave_Secret2_Wall_Front",tileset);
        const Cave_Secret2_Exit = carteDuNiveau.createLayer("Cave_Secret2_Exit",tileset);

        // - COLLISIONS
        const Cave_Secret2_Collide = carteDuNiveau.createLayer("Cave_Secret2_Collide",tileset);
        Cave_Secret2_Collide.alpha = 0;
        Cave_Secret2_Collide.setCollisionByProperty({ collide: true }); 
        this.physics.add.collider(this.player, Cave_Secret2_Collide, this.collide, null,this);

        // - CONTRÔLE CLAVIER
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', () => this.click = true);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
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
        this.cameras.main.setZoom(2.5);

        // - UI

        this.uiLife = this.add.sprite(1920/3.35,1080/3.35, 'uiLife').setOrigin(0,0).setScrollFactor(0).setScale(0.51);
        this.add.image(1920/3.35,1080/3.35,'uiInvGold').setOrigin(0,0).setScrollFactor(0).setScale(0.51);
        this.textGold = this.add.text(735,356,this.playerState.gold+'x',{ fontSize:'10px',fill:'#f5ffff'}).setScrollFactor(0);

        if(this.playerState.getSword) {this.add.image(600,462,"sword").setOrigin(0,0).setScrollFactor(0).setScale(0.75);}
        if(this.playerState.getCape) {this.add.image(600,538,"cape").setOrigin(0,0).setScrollFactor(0).setScale(0.75);}
        if(this.playerState.getBracelet) {this.add.image(600,612,"braceletInv").setOrigin(0,0).setScrollFactor(0).setScale(0.75);}
        if(this.playerState.getBoots) {this.add.image(599,690,"boot").setOrigin(0,0).setScrollFactor(0).setScale(0.75);}

        // - ANIMATIONS

        // Ui

        this.anims.create({
            key: 'life5',
            frames: this.anims.generateFrameNumbers('uiLife', { frames: [0] }),
            repeat: 0
        });
        this.anims.create({
            key: 'life4',
            frames: this.anims.generateFrameNumbers('uiLife', { frames: [1] }),
            repeat: 0
        });
        this.anims.create({
            key: 'life3',
            frames: this.anims.generateFrameNumbers('uiLife', { frames: [2] }),
            repeat: 0
        });
        this.anims.create({
            key: 'life2',
            frames: this.anims.generateFrameNumbers('uiLife', { frames: [3] }),
            repeat: 0
        });
        this.anims.create({
            key: 'life1',
            frames: this.anims.generateFrameNumbers('uiLife', { frames: [4] }),
            repeat: 0
        });

        // Animations Perso
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
        this.anims.create({
            key: 'propulsaLeft',
            frames: this.anims.generateFrameNumbers('propulsaLeft', {start:0,end:5}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'propulsaRight',
            frames: this.anims.generateFrameNumbers('propulsaRight', {start:0,end:5}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'propulsaBot',
            frames: this.anims.generateFrameNumbers('propulsaBot', {start:0,end:5}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'propulsaTop',
            frames: this.anims.generateFrameNumbers('propulsaTop', {start:0,end:5}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'bracelet',
            frames: this.anims.generateFrameNumbers('bracelet', {start:0,end:8}),
            frameRate: 9,
            repeat: 0
        });

    }
    
    
    update(){

        if(this.playerState.hp == 5){
            this.uiLife.anims.play("life5",true);
        }
        if(this.playerState.hp == 4){
            this.uiLife.anims.play("life4",true);
        }
        if(this.playerState.hp == 3){
            this.uiLife.anims.play("life3",true);
        }
        if(this.playerState.hp == 2){
            this.uiLife.anims.play("life2",true);
        }
        if(this.playerState.hp == 1){
            this.uiLife.anims.play("life1",true);
        }

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

        // - CAPE
        if (this.playerState.getCape){
            if((Phaser.Input.Keyboard.JustDown(this.keyC) || this.controller.Y) && !this.playerState.isPropulsing && !this.playerState.isAttacking){
                if (this.playerState.isCaping){
                    this.player.setTint(0xffffff);
                    this.playerState.isCaping = false;
                }
                else{
                    this.player.setTint(0xff4967);
                    this.playerState.isCaping = true;
                }
            }
        }

        
        // - PROPULSA

        if (this.playerState.getBoots){
            if ((Phaser.Input.Keyboard.JustDown(this.keySHIFT) || this.controller.A) && !this.playerState.isAttacking && !this.playerState.isFalling && !this.playerState.isPropulsing && (Math.abs(this.player.direction.x) != Math.abs(this.player.direction.y))){
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
            this.player.anims.play("bracelet",true);
            this.cameras.main.fadeOut(300, 184, 231, 249);
            this.time.delayedCall(300, () => {
                this.cameras.main.fadeIn(1000, 184, 231, 249);
                this.playerState.canMove = true;
            })
        }

        // - TRIGGERS

        if (this.canOut && (this.player.body.position.x <= 2070 && this.player.body.position.y >= 3680 && this.player.body.position.y <= 3741)){
            this.canOut = false;
		    this.cameras.main.fadeOut(400, 255, 254, 170);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 

			this.time.delayedCall(500, () => {
					this.scene.start('Outdoor', {entrance: "secret2", playerState : this.playerState});
			})

        }

        // - MOVEMENT

        if(this.playerState.canMove == true){
            this.playerMovement();
        }
    
    }

    playerMovement(){

        // - DEPLACEMENT ET ANIMATION

        if ((this.keyQ.isDown || this.controller.left) && (!this.keyD.isDown && !this.keyS.isDown && !this.keyZ.isDown && !this.controller.right && !this.controller.down && !this.controller.up)){
            this.playerState.isMoving = true;
            this.player.direction = {x : -1, y : 0};
            if (this.playerState.isCaping){
                this.player.setVelocityX(-PLAYER_SPEED/2);
                this.player.setVelocityY(0);
            }
            else{
                this.player.setVelocityX(-PLAYER_SPEED); 
                this.player.setVelocityY(0  + this.windForce.y);
            }
            this.player.anims.play('left', true); 
        }

        if (((this.keyQ.isDown && this.keyZ.isDown)||(this.controller.left && this.controller.up))&& (!this.keyD.isDown && !this.keyS.isDown && !this.controller.down && !this.controller.right)){
            this.playerState.isMoving = true;
            this.player.direction = { x : -1, y : 1};
            if (this.playerState.isCaping){
                this.player.setVelocityX(-PLAYER_SPEED/2 * (Math.SQRT2)/2); 
                this.player.setVelocityY(-PLAYER_SPEED/2 * (Math.SQRT2/2)); 
            }
            else{
                this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2)/2); 
                this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2/2)  + this.windForce.y); 
            }
            this.player.anims.play('left', true); 
        }

        if (((this.keyQ.isDown && this.keyS.isDown)||(this.controller.left && this.controller.down)) && (!this.keyD.isDown && !this.keyZ.isDown && !this.controller.right && !this.controller.up)){
            this.playerState.isMoving = true;
            this.player.direction = { x : -1, y : -1};
            if (this.playerState.isCaping){
                this.player.setVelocityX(-PLAYER_SPEED/2 * (Math.SQRT2/2));
                this.player.setVelocityY(PLAYER_SPEED/2 * (Math.SQRT2/2));
            }
            else{
                this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2/2));
                this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2/2) + this.windForce.y);
            }
            this.player.anims.play('left', true); 
        }


        if ((this.keyD.isDown || this.controller.right) && (!this.keyQ.isDown && !this.keyS.isDown && !this.keyZ.isDown && !this.controller.left && !this.controller.down && !this.controller.up)){ //sinon si la touche droite est appuyée
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : 0};
            if (this.playerState.isCaping){
                this.player.setVelocityX(PLAYER_SPEED/2);
                this.player.setVelocityY(0);
            }
            else{
                this.player.setVelocityX(PLAYER_SPEED);
                this.player.setVelocityY(0 + this.windForce.y);
            }
            this.player.anims.play('right', true); 
        }

        if (((this.keyD.isDown && this.keyS.isDown)||(this.controller.right && this.controller.down))&& (!this.keyQ.isDown && !this.keyZ.isDown && !this.controller.left && !this.controller.up)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : -1};
            if (this.playerState.isCaping){
                this.player.setVelocityX(PLAYER_SPEED/2 * (Math.SQRT2)/2); 
                this.player.setVelocityY(PLAYER_SPEED/2 * (Math.SQRT2)/2);
            }
            else{
                this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
                this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2)/2 + this.windForce.y);
            }
            this.player.anims.play('right', true); 
        }

        if (((this.keyD.isDown && this.keyZ.isDown)||(this.controller.right && this.controller.up)) && (!this.keyQ.isDown && !this.keyS.isDown && !this.controller.down && !this.controller.left)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 1, y : 1};
            if (this.playerState.isCaping){
                this.player.setVelocityX(PLAYER_SPEED/2 * (Math.SQRT2)/2); 
                this.player.setVelocityY(-PLAYER_SPEED/2 * (Math.SQRT2)/2);
            }
            else{
                this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
                this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2)/2 + this.windForce.y);
            }
            this.player.anims.play('right', true); 
        }

        if ((this.keyS.isDown || this.controller.down) && (!this.keyD.isDown && !this.keyQ.isDown && !this.keyZ.isDown && !this.controller.right && !this.controller.left && !this.controller.up)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 0, y : -1};
            if (this.playerState.isCaping){
                this.player.setVelocityX(0);
                this.player.setVelocityY(PLAYER_SPEED/2);
            }
            else{
                this.player.setVelocityX(0);
                this.player.setVelocityY(PLAYER_SPEED + this.windForce.y);
            }
            this.player.anims.play('front',true);
        }

        if ((this.keyZ.isDown || this.controller.up) && (!this.keyD.isDown && !this.keyS.isDown && !this.keyQ.isDown && !this.controller.right && !this.controller.down && !this.controller.left)){
            this.playerState.isMoving = true;
            this.player.direction = { x : 0, y : 1};
            if (this.playerState.isCaping){
                this.player.setVelocityX(0);
                this.player.setVelocityY(-PLAYER_SPEED/2);
            }
            else{
                this.player.setVelocityX(0);
                this.player.setVelocityY(-PLAYER_SPEED + this.windForce.y);
            }
            this.player.anims.play('back',true);
        }

        if ((!this.keyQ.isDown && !this.keyD.isDown && !this.keyS.isDown && !this.keyZ.isDown) || (!this.controller.left && !this.controller.right && !this.controller.up && this.controller.down)){ 
            this.playerState.isMoving = false; 
            if (this.playerState.isCaping){
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
            }
            else{
                this.player.setVelocityX(0);
                this.player.setVelocityY(0 + this.windForce.y); 
            }
            this.player.anims.play('idle',true); 
        }
    }

    attack(){

        if (this.player.direction.x == 0 && this.player.direction.y == 1){
            this.player.zoneAttackUpDown.x = this.player.x;
            this.player.zoneAttackUpDown.y = (this.player.y-16) + this.player.body.velocity.y/12;
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
            this.player.zoneAttackUpDown.y = (this.player.y + 64) + this.player.body.velocity.y/12;
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
            this.player.setVelocityY(0);
            this.player.setVelocityX((PLAYER_SPEED*2) * this.player.direction.x);
            if (this.player.direction.x == -1) this.player.anims.play("propulsaLeft",true);
            else this.player.anims.play("propulsaRight",true)
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY((PLAYER_SPEED*2) * -this.player.direction.y);
            if (this.player.direction.y == -1) this.player.anims.play("propulsaBot",true);
            else this.player.anims.play("propulsaTop",true)
        }
    }

    lootCoffre(zone, coffre){
        coffre.body.enable = false;
        coffre.alpha = 0;
        if(coffre == this.coffreSecret2){
            this.playerState.getCoffreSecret2 = true;
        }
        this.dropGold(coffre.x,coffre.y,Math.floor((Math.random()*5)+10));
    }

    dropGold(x,y,nb){
        var spawnLife = Math.floor(Math.random()*3)
        console.log(spawnLife);
        this.time.addEvent({        
            delay : 40,
            callback : () => {
                this.golds.create(Math.floor((Math.random()*20)-5) + x,Math.floor((Math.random()*30)-5) + y,"gold").setScale(0.85).setAlpha(0.9);
            },
            repeat : nb
        })
        if (spawnLife == 0){
            this.time.delayedCall(400, () => {
                this.lifes.create(Math.floor((Math.random()*20)-5) + x,Math.floor((Math.random()*30)-5) + y,"life").setScale(0.85).setAlpha(0.9);
            })
        }
    }

    getGold(player, gold){
       
        this.playerState.gold += 1;
        this.textGold.text = this.playerState.gold + "x";
        gold.body.enable = false;
        gold.alpha = 0;
            
    }

    getLife(player, life){   
        if(this.playerState.hp < 5){
            this.playerState.hp += 1;
        }
        life.body.enable = false;
        life.alpha = 0;
            
    }


    collide(){
        if (this.playerState.isPropulsing)this.playerState.isColliding = true;
        else this.playerState.isColliding = false;
    }

    takeDamage(){
        if(!this.playerState.takingDamage){
            this.playerState.takingDamage = true;
            this.cameras.main.shake(200, 0.0002);
            this.playerState.hp -= 1;
            this.player.setTint(0xff4967);

            if(this.playerState.isPropulsing){
                this.playerState.isColliding = true;
            }

            this.time.delayedCall(1000, () => {
                this.playerState.takingDamage = false;
                this.player.setTint(0xffffff);
            })
        }
        
    }

}