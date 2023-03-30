const PLAYER_SPEED = 200;
export class Outdoor extends Phaser.Scene{

    constructor(){
        super("Outdoor");
        this.player;
        this.cursors;
        this.camera;
    }

    init(data)
    {
        this.entrance = data.entrance;
		this.cameras.main.fadeIn(800, 255, 254, 170);
       
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

        const carteDuNiveau = this.add.tilemap("carte");

        // Chargement du jeu de tuile
        const tileset = carteDuNiveau.addTilesetImage("placeHolder","Phaser_tuilesdejeu");


        // Chargement de TOUT les calques... LONG !

        // LES CAVES
        /*
        const Cave_Caveau1_Ground = carteDuNiveau.createLayer("Cave_Caveau1_Ground",tileset);
        const Cave_Caveau1_Wall = carteDuNiveau.createLayer("Cave_Caveau1_Wall",tileset);
        const Cave_Caveau1_Fall = carteDuNiveau.createLayer("Cave_Caveau1_Fall",tileset);

        const Cave_Caveau2_Ground = carteDuNiveau.createLayer("Cave_Caveau2_Ground",tileset);
        const Cave_Caveau2_Wall = carteDuNiveau.createLayer("Cave_Caveau2_Wall",tileset);
        const Cave_Caveau2_Fall = carteDuNiveau.createLayer("Cave_Caveau2_Fall",tileset);

        const Cave_SortieTemple_Ground = carteDuNiveau.createLayer("Cave_SortieTemple_Ground",tileset);
        const Cave_SortieTemple_Wall = carteDuNiveau.createLayer("Cave_SortieTemple_Wall",tileset);
        const Cave_SortieTemple_Fall = carteDuNiveau.createLayer("Cave_SortieTemple_Fall",tileset);

        const Cave_Propulsa_FallFSecond = carteDuNiveau.createLayer("Cave_Propulsa_FallFSecond",tileset);
        const Cave_Propulsa_FallBrown = carteDuNiveau.createLayer("Cave_Propulsa_FallBrown",tileset);
        const Cave_Propulsa_FallDarkBrown = carteDuNiveau.createLayer("Cave_Propulsa_FallDarkBrown",tileset);
        const Cave_Propulsa_FallFirst = carteDuNiveau.createLayer("Cave_Propulsa_FallFirst",tileset);
        const Cave_Propulsa_Ground = carteDuNiveau.createLayer("Cave_Propulsa_Ground",tileset);
        const Cave_Propulsa_Wall = carteDuNiveau.createLayer("Cave_Propulsa_Wall",tileset);
        const Cave_Propulsa_Fall = carteDuNiveau.createLayer("Cave_Propulsa_Fall",tileset);
        const Cave_Propulsa_Donjon = carteDuNiveau.createLayer("Cave_Propulsa_Donjon",tileset);

        const Cave_Secret3_Ground = carteDuNiveau.createLayer("Cave_Secret3_Ground",tileset);
        const Cave_Secret3_Wall = carteDuNiveau.createLayer("Cave_Secret3_Wall",tileset);
        const Cave_Secret3_Fall = carteDuNiveau.createLayer("Cave_Secret3_Fall",tileset);

        const Cave_Secret2_Ground = carteDuNiveau.createLayer("Cave_Secret2_Ground",tileset);
        const Cave_Secret2_Wall = carteDuNiveau.createLayer("Cave_Secret2_Wall",tileset);
        const Cave_Secret2_Fall = carteDuNiveau.createLayer("Cave_Secret2_Fall",tileset);

        const Cave_Secret1_Ground = carteDuNiveau.createLayer("Cave_Secret1_Ground",tileset);
        const Cave_Secret1_Wall = carteDuNiveau.createLayer("Cave_Secret1_Wall",tileset);
        const Cave_Secret1_Fall = carteDuNiveau.createLayer("Cave_Secret1_Fall",tileset);
        */
        // EXTERIEUR
        
        const Ext_BlackFall = carteDuNiveau.createLayer("Ext_BlackFall",tileset);
        const Ext_Fall_Second = carteDuNiveau.createLayer("Ext_Fall_Second",tileset);
        const Ext_BlackBrownFall = carteDuNiveau.createLayer("Ext_BlackBrownFall",tileset);
        const Ext_BrownFall = carteDuNiveau.createLayer("Ext_BrownFall",tileset);
        const Ext_Fall_First = carteDuNiveau.createLayer("Ext_Fall_First",tileset);
        const Ext_Ground = carteDuNiveau.createLayer("Ext_Ground",tileset);
        const Ext_Wall_Back_Other = carteDuNiveau.createLayer("Ext_Wall_Back_Other",tileset);
        const Ext_Wall_Back = carteDuNiveau.createLayer("Ext_Wall_Back",tileset);
        const Donjon2 = carteDuNiveau.createLayer("Donjon 2",tileset);
        const Donjon = carteDuNiveau.createLayer("Donjon",tileset);

        // Chargement du joueur...

        if (this.entrance == "mainCave"){
            this.player = this.physics.add.sprite(2313, 2724, 'perso').setScale(1);
            this.player.direction = {x:-1,y:0};
        }
        else if (this.entrance == "mainCave2"){
            this.player = this.physics.add.sprite(2825, 3478, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "caveau1"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "caveau2"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "secret1"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "secret2"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "secret3"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "propulsaEnter"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "propulsaExit"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "temple"){
            this.player = this.physics.add.sprite(2200, 3350, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }

        this.player.isMoving = false;
        this.player.inCave = true;
        this.player.setSize(15,3).setOffset(8,45);
        this.player.setCollideWorldBounds(true);

        const Ext_Wall_Front_Other = carteDuNiveau.createLayer("Ext_Wall_Front_Other",tileset);
        const Ext_Wall_Front = carteDuNiveau.createLayer("Ext_Wall_Front",tileset);
        const Ext_Exit = carteDuNiveau.createLayer("Ext_Exit",tileset);

        // COLLISIONS EXTERIEUR
        const Ext_Collide = carteDuNiveau.createLayer("Ext_Collide",tileset);
        Ext_Collide.setCollisionByProperty({ collide: true });
        Ext_Collide.alpha = 0;
        this.physics.add.collider(this.player, Ext_Collide);

        // CONTRÔLE CLAVIER
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // CAMERA
        this.camera = this.cameras.main.setSize(1920, 1080);
        this.camera.startFollow(this.player);
        this.camera.setDeadzone(20,20);
        this.camera.setBounds(0,0,4960,6400);
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

        console.log(this.player.body.position);

        // TRIGGERS

        if (this.player.body.position.x >= 2331 && this.player.body.position.y <= 2749 && this.player.body.position.y >= 2656){
        
		    this.cameras.main.fadeOut(600, 35, 22, 21);

			this.time.delayedCall(700, () => {
					this.scene.start('MainCave', {entrance: "main"});
			})
        }
        else if (this.player.body.position.x >= 2784 && this.player.body.position.x <= 2865 && this.player.body.position.y <= 3462 ){
            
            this.cameras.main.fadeOut(600, 35, 22, 21);
            
			this.time.delayedCall(700, () => {
					this.scene.start('MainCave', {entrance: "other"});
			})
        }

        // - MOVEMENT 
        this.playerMovement();

        /*
        if (this.keySpace.isDown){
            this.cameras.main.fadeOut(500,0,0,0);
            this.time.delayedCall(1000, () => {
                this.cameras.main.fadeIn(4000,255,254,170);
            });
        }
        */
    }

    playerMovement(){

        // - DEPLACEMENT ET ANIMATION

        if (this.cursors.left.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown)){
            this.player.isMoving = true;
            this.player.direction = {x : -1, y : 0};
            this.player.setVelocityX(-PLAYER_SPEED); 
            this.player.setVelocityY(0);
            this.player.anims.play('left', true); 
        }

        if (this.cursors.left.isDown && this.cursors.up.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown)){
            this.player.isMoving = true;
            this.player.direction = { x : -1, y : 1};
            this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2/2)); 
            this.player.anims.play('left', true); 
        }

        if (this.cursors.left.isDown && this.cursors.down.isDown && (!this.cursors.right.isDown && !this.cursors.up.isDown)){
            this.player.isMoving = true;
            this.player.direction = { x : -1, y : -1};
            this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2/2));
            this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2/2));
            this.player.anims.play('left', true); 
        }


        if (this.cursors.right.isDown && (!this.cursors.left.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown)){ //sinon si la touche droite est appuyée
            this.player.isMoving = true;
            this.player.direction = { x : 1, y : 0};
            this.player.setVelocityX(PLAYER_SPEED);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true); 
        }

        if (this.cursors.right.isDown && this.cursors.down.isDown && (!this.cursors.left.isDown && !this.cursors.up.isDown)){
            this.player.isMoving = true;
            this.player.direction = { x : 1, y : -1};
            this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(PLAYER_SPEED * (Math.SQRT2)/2);
            this.player.anims.play('right', true); 
        }

        if (this.cursors.right.isDown && this.cursors.up.isDown && (!this.cursors.left.isDown && !this.cursors.down.isDown)){
            this.player.isMoving = true;
            this.player.direction = { x : 1, y : 1};
            this.player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2)/2);
            this.player.anims.play('right', true); 
        }

        if (this.cursors.down.isDown && (!this.cursors.right.isDown && !this.cursors.left.isDown && !this.cursors.up.isDown)){
            this.player.isMoving = true;
            this.player.direction = { x : 0, y : -1};
            this.player.setVelocityX(0);
            this.player.setVelocityY(PLAYER_SPEED);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown)){
            this.player.isMoving = true;
            this.player.direction = { x : 0, y : 1};
            this.player.setVelocityX(0);
            this.player.setVelocityY(-PLAYER_SPEED);
            this.player.anims.play('turn');
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown){ 
            this.player.isMoving = false; 
            this.player.setVelocityX(0);
            this.player.setVelocityY(0); 
            this.player.anims.play('turn'); 
        }
    }

    loadGame(){
        this.scene.start("Game");
    }

}