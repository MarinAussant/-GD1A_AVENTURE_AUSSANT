const PLAYER_SPEED = 200;
export class Outdoor extends Phaser.Scene{

    constructor(){
        super("Outdoor");
        this.cursors;
        this.canOut = true;
        this.player;
    }

    init(data)
    {
        this.entrance = data.entrance;
        this.playerState = data.playerState;
		this.cameras.main.fadeIn(500, 255, 254, 170);
        this.canOut = true;
    }

    preload(){

        //Load SpritSheet
        this.load.spritesheet('perso','assets/images/perso.png',
        { frameWidth: 32, frameHeight: 48 });
        this.load.image('ennemi',"assets/images/ennemi.png");

        this.load.image('rect',"assets/images/rect.png")

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
            this.player = this.physics.add.sprite(1650, 3250, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "secret2"){
            this.player = this.physics.add.sprite(1922, 3791, 'perso').setScale(1);
            this.player.direction = {x:0,y:-1};
        }
        else if (this.entrance == "secret3"){
            this.player = this.physics.add.sprite(1944, 4512, 'perso').setScale(1);
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

        this.playerState.isFalling = false;
        this.playerState.canMove = true;
        this.player.setSize(15,3).setOffset(8,45);
        this.player.setCollideWorldBounds(true);

        var rect = this.add.rectangle(this.player.x,this.player.y,35,48);
        this.extraCollide = this.physics.add.existing(rect);
        this.extraCollide.alpha = 0;


        const Ext_Wall_Front_Other = carteDuNiveau.createLayer("Ext_Wall_Front_Other",tileset);
        const Ext_Wall_Front = carteDuNiveau.createLayer("Ext_Wall_Front",tileset);

        // SI UNLOCK SECONDE MAIN CAVE
        if (this.playerState.unlockMainCave){
            const Ext_OpenPorte_MainCave = carteDuNiveau.createLayer("Ext_OpenPorte_MainCave",tileset);
        }
        else {
            const Ext_ClosePorte_MainCave = carteDuNiveau.createLayer("Ext_ClosePorte_MainCave",tileset);
            Ext_ClosePorte_MainCave.setCollisionByProperty({ collide: true });
            this.physics.add.collider(this.player, Ext_ClosePorte_MainCave);
        }

        // SI UNLOCK SORTIE TEMPLE
        if (this.playerState.unlockSortieTemple){
            const Ext_OpenPorte_SortieTemple = carteDuNiveau.createLayer("Ext_OpenPorte_SortieTemple",tileset);
        }
        else {
            const Ext_ClosePorte_SortieTemple = carteDuNiveau.createLayer("Ext_ClosePorte_SortieTemple",tileset);
            Ext_ClosePorte_SortieTemple.setCollisionByProperty({ collide: true });
            this.physics.add.collider(this.player, Ext_ClosePorte_SortieTemple);
        }

        // SI UNLOCK PROPULSA PORTE
        if (this.playerState.unlockPropulsa){
            const Ext_OpenPorte_Propulsa = carteDuNiveau.createLayer("Ext_OpenPorte_Propulsa",tileset);
        }
        else {
            const Ext_ClosePorte_Propulsa = carteDuNiveau.createLayer("Ext_ClosePorte_Propulsa",tileset);
            Ext_ClosePorte_Propulsa.setCollisionByProperty({ collide: true });
            this.physics.add.collider(this.player, Ext_ClosePorte_Propulsa);
        }

        // SI UNLOCK SECRET 1
        if (this.playerState.unlockSecret1){
            const Ext_OpenPorte_Secret1 = carteDuNiveau.createLayer("Ext_OpenPorte_Secret1",tileset);
        }
        else {
            const Ext_ClosePorte_Secret1 = carteDuNiveau.createLayer("Ext_ClosePorte_Secret1",tileset);
            Ext_ClosePorte_Secret1.setCollisionByProperty({ collide: true });
            this.physics.add.collider(this.player, Ext_ClosePorte_Secret1);
        }

        // SI UNLOCK SECRET 2
        if (this.playerState.unlockSecret2){
            const Ext_OpenPorte_Secret2 = carteDuNiveau.createLayer("Ext_OpenPorte_Secret2",tileset);
        }
        else {
            const Ext_ClosePorte_Secret2 = carteDuNiveau.createLayer("Ext_ClosePorte_Secret2",tileset);
            Ext_ClosePorte_Secret2.setCollisionByProperty({ collide: true });
            this.physics.add.collider(this.player, Ext_ClosePorte_Secret2);
        }

        // SI UNLOCK SECRET 3
        if (this.playerState.unlockSecret3){
            const Ext_OpenPorte_Secret3 = carteDuNiveau.createLayer("Ext_OpenPorte_Secret3",tileset);
        }
        else {
            const Ext_ClosePorte_Secret3 = carteDuNiveau.createLayer("Ext_ClosePorte_Secret3",tileset);
            Ext_ClosePorte_Secret3.setCollisionByProperty({ collide: true });
            this.physics.add.collider(this.player, Ext_ClosePorte_Secret3);
        }

        // SI UNLOCK CAVEAU 2
        if (this.playerState.unlockCaveau2){
            const Ext_OpenPorte_Caveau2 = carteDuNiveau.createLayer("Ext_OpenPorte_Caveau2",tileset);
        }
        else {
            const Ext_ClosePorte_Caveau2 = carteDuNiveau.createLayer("Ext_ClosePorte_Caveau2",tileset);
            Ext_ClosePorte_Caveau2.setCollisionByProperty({ collide: true });
            this.physics.add.collider(this.player, Ext_ClosePorte_Caveau2);
        }

        const Ext_Exit = carteDuNiveau.createLayer("Ext_Exit",tileset);

        // COLLISIONS EXTERIEUR
        const Ext_Collide = carteDuNiveau.createLayer("Ext_Collide",tileset);
        Ext_Collide.setCollisionByProperty({ collide: true });
        Ext_Collide.alpha = 0;
        this.physics.add.collider(this.player, Ext_Collide);
        

        // OVERLAP FALLING EXTERIEUR
        const Ext_FallOverLap = carteDuNiveau.createLayer("Ext_FallOverLap",tileset);
        Ext_FallOverLap.setCollisionByProperty({ fall: true },true);
        Ext_FallOverLap.alpha = 0;
        this.physics.add.collider(this.extraCollide, Ext_FallOverLap,this.playerFalling,null,this);
        
        

        // CONTRÔLE CLAVIER
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // CAMERA
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
        console.log(this.player.body.position);

        // - SUIVI DE EXTRACOLLIDE
        
        this.physics.moveTo(this.extraCollide,this.player.x,this.player.y+25,PLAYER_SPEED);


        // TRIGGERS

        //MAIN CAVE
        if (this.canOut && (this.player.body.position.x >= 2331 && this.player.body.position.y <= 2749 && this.player.body.position.y >= 2656)){
            
            this.canOut = false;
		    this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 

			this.time.delayedCall(500, () => {
					this.scene.start('MainCave', {entrance: "main", playerState : this.playerState});
			})
        }
        //SECOND MAIN CAVE
        else if (this.canOut && (this.player.body.position.x >= 2784 && this.player.body.position.x <= 2865 && this.player.body.position.y <= 3420 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('MainCave', {entrance: "other", playerState : this.playerState});
			})
        }
        //SECRET 1
        else if (this.canOut && (this.player.body.position.x <= 1623 && this.player.body.position.x >= 1580 && this.player.body.position.y <= 3293 && this.player.body.position.y >= 3232 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('Secret1', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //SECRET 2
        else if (this.canOut && (this.player.body.position.x <= 1960  && this.player.body.position.x >= 1948 && this.player.body.position.y <= 3805 && this.player.body.position.y >= 3744 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('Secret2', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //SECRET 3
        else if (this.canOut && (this.player.body.position.x <= 1969  && this.player.body.position.x >= 1920 && this.player.body.position.y <= 4490 && this.player.body.position.y >= 4470 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('Secret3', {entrance: "outdoor", playerState : this.playerState});
			})
        }

        // - MOVEMENT 
        if(this.playerState.canMove == true){
            this.playerMovement();
        }
        

        
        if (this.keySpace.isDown){

            this.cameras.main.fadeOut(2000,255,254,170);
          
        }
        
    }

    playerMovement(){

        // - DEPLACEMENT ET ANIMATION

        if (this.cursors.left.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = {x : -1, y : 0};
            this.player.setVelocityX(-PLAYER_SPEED); 
            this.player.setVelocityY(0);
            this.player.anims.play('left', true); 
        }

        if (this.cursors.left.isDown && this.cursors.up.isDown && (!this.cursors.right.isDown && !this.cursors.down.isDown)){
            this.playerState.isMoving = true;
            this.player.direction = { x : -1, y : 1};
            this.player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2)/2); 
            this.player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2/2)); 
            this.player.anims.play('left', true); 
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
                this.scene.start('Outdoor', {entrance: this.entrance, playerState : this.playerState});
        })
        }

        this.playerState.isFalling = true;
    }

}