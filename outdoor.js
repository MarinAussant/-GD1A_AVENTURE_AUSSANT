const PLAYER_SPEED = 200;
const MOMIES_SPEED = 25;
export class Outdoor extends Phaser.Scene{

    constructor(){
        super("Outdoor");
        this.cursors;
        this.canOut = true;
        this.player;
        this.click;
        this.controller = false;
        this.textFin;
        
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
        /*
        this.load.spritesheet('perso','assets/images/perso.png',
        { frameWidth: 32, frameHeight: 48 });
        */

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
        // Vent
        this.load.spritesheet('vent','assets/animations/vent.png',
        { frameWidth: 32, frameHeight: 32 });

        this.load.image('ennemi',"assets/images/ennemi.png");
        this.load.image('gold',"assets/items/goldGround.png");
        this.load.image('life',"assets/items/lifeGround.png");
        this.load.image('shadow',"assets/images/shadow.png");

        // Spritesheet Momies
        this.load.spritesheet('momieRight','assets/animations/rightMomie.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('momieLeft','assets/animations/leftMomie.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('momieBot','assets/animations/frontMomie.png',
        { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('momieTop','assets/animations/backMomie.png',
        { frameWidth: 32, frameHeight: 64 });

        this.load.image('coffreDevant',"assets/images/frontChest.png");
        this.load.image('coffreCote',"assets/images/sideChest.png");

        //Load Tiles + TileSet
        this.load.image("Phaser_tuilesdejeu","assets/images/tileset.png");
        this.load.tilemapTiledJSON("carte","assets/jsonTiled.json");

    }
    
    create(){

        this.finalDoor = false;

        const carteDuNiveau = this.add.tilemap("carte");

        // Chargement du jeu de tuile
        const tileset = carteDuNiveau.addTilesetImage("placeHolder","Phaser_tuilesdejeu");


        // Chargement de TOUT les calques... LONG !

        // EXTERIEUR
        
        const Ext_BlackFall = carteDuNiveau.createLayer("Ext_BlackFall",tileset);
        const Ext_Fall_Second = carteDuNiveau.createLayer("Ext_Fall_Second",tileset);
        const Ext_BlackBrownFall = carteDuNiveau.createLayer("Ext_BlackBrownFall",tileset);
        const Ext_BrownFall = carteDuNiveau.createLayer("Ext_BrownFall",tileset);
        const Ext_Fall_First = carteDuNiveau.createLayer("Ext_Fall_First",tileset);
        const Ext_Ground = carteDuNiveau.createLayer("Ext_Ground",tileset);
        const Ext_Wall_Back_Other = carteDuNiveau.createLayer("Ext_Wall_Back_Other",tileset);
        const Ext_Wall_Back = carteDuNiveau.createLayer("Ext_Wall_Back",tileset);
        const Lueur_Cave = carteDuNiveau.createLayer("Lueur_Cave",tileset);
        const Donjon_Back = carteDuNiveau.createLayer("Donjon_Back",tileset);

        // SI UNLOCK SECONDE MAIN CAVE
        if (!this.playerState.unlockMainCave){
            this.Ext_WallClosePorte_MainCave = carteDuNiveau.createLayer("Ext_WallClosePorte_MainCave",tileset);
            this.Ext_ClosePorte_MainCave = carteDuNiveau.createLayer("Ext_ClosePorte_MainCave",tileset);
            this.Ext_ClosePorte_MainCave.setCollisionByProperty({ collide: true });
        }
        // SI UNLOCK SORTIE TEMPLE
        if (!this.playerState.unlockSortieTemple){
            this.Ext_WallClosePorte_SortieTemple = carteDuNiveau.createLayer("Ext_WallClosePorte_SortieTemple",tileset);
            this.Ext_ClosePorte_SortieTemple = carteDuNiveau.createLayer("Ext_ClosePorte_SortieTemple",tileset);
            this.Ext_ClosePorte_SortieTemple.setCollisionByProperty({ collide: true });
        }
        // SI UNLOCK PROPULSA PORTE
        if (!this.playerState.unlockPropulsa){
            this.Ext_WallClosePorte_Propulsa = carteDuNiveau.createLayer("Ext_WallClosePorte_Propulsa",tileset);
            this.Ext_ClosePorte_Propulsa = carteDuNiveau.createLayer("Ext_ClosePorte_Propulsa",tileset);
            this.Ext_ClosePorte_Propulsa.setCollisionByProperty({ collide: true });
        }
        // SI UNLOCK SECRET 1
        if (!this.playerState.unlockSecret1){
            this.Ext_WallClosePorte_Secret1 = carteDuNiveau.createLayer("Ext_WallClosePorte_Secret1",tileset);
            this.Ext_ClosePorte_Secret1 = carteDuNiveau.createLayer("Ext_ClosePorte_Secret1",tileset);
            this.Ext_ClosePorte_Secret1.setCollisionByProperty({ collide: true });
        }
        // SI UNLOCK SECRET 2
        if (!this.playerState.unlockSecret2){
            this.Ext_WallClosePorte_Secret2 = carteDuNiveau.createLayer("Ext_WallClosePorte_Secret2",tileset);
            this.Ext_ClosePorte_Secret2 = carteDuNiveau.createLayer("Ext_ClosePorte_Secret2",tileset);
            this.Ext_ClosePorte_Secret2.setCollisionByProperty({ collide: true });

        }
        // SI UNLOCK SECRET 3
        if (!this.playerState.unlockSecret3){
            this.Ext_WallClosePorte_Secret3 = carteDuNiveau.createLayer("Ext_WallClosePorte_Secret3",tileset);
            this.Ext_ClosePorte_Secret3 = carteDuNiveau.createLayer("Ext_ClosePorte_Secret3",tileset);
            this.Ext_ClosePorte_Secret3.setCollisionByProperty({ collide: true });
        }
        // SI UNLOCK CAVEAU 2
        if (!this.playerState.unlockCaveau2){
            this.Ext_WallClosePorte_Caveau2 = carteDuNiveau.createLayer("Ext_WallClosePorte_Caveau2",tileset);
            this.Ext_ClosePorte_Caveau2 = carteDuNiveau.createLayer("Ext_ClosePorte_Caveau2",tileset);
            this.Ext_ClosePorte_Caveau2.setCollisionByProperty({ collide: true });
        }
        if(this.playerState.gold >= 500){
            this.finalDoor = true;  
            this.Ext_FinalOpenPorte = carteDuNiveau.createLayer("Ext_FinalOpenPorte",tileset);
        }
        else{
            this.finalDoor = false;  
            this.Ext_FinalOpenPorte = carteDuNiveau.createLayer("Ext_FinalOpenPorte",tileset);
            this.Ext_FinalClosePorte = carteDuNiveau.createLayer("Ext_FinalClosePorte",tileset);
            this.Ext_FinalClosePorte.setCollisionByProperty({ collide: true });
        }
        
        this.coffres = this.physics.add.group({allowGravity: false,immovable : true});

        if (!this.playerState.getCoffrePilleur1){
            this.coffrePilleur1 = this.physics.add.sprite(2144+32,2912+16,"coffreDevant");
            this.coffres.add(this.coffrePilleur1);
        }
        if (!this.playerState.getCoffrePilleur2){
            this.coffrePilleur2 = this.physics.add.sprite(1120+16,4576+32,"coffreCote");
            this.coffres.add(this.coffrePilleur2);
        }
        if (!this.playerState.getCoffrePilleur3){
            this.coffrePilleur3 = this.physics.add.sprite(2592+16,3712+32,"coffreCote");
            this.coffres.add(this.coffrePilleur3);
        }
        if (!this.playerState.getCoffreVide0){
            this.coffreVide0 = this.physics.add.sprite(2880+16,2304+32,"coffreCote");
            this.coffres.add(this.coffreVide0);
        }
        if (!this.playerState.getCoffreVide1){
            this.coffreVide1 = this.physics.add.sprite(1568+16,1696+32,"coffreCote");
            this.coffres.add(this.coffreVide1);
        }
        if (!this.playerState.getCoffreVide2){
            this.coffreVide2 = this.physics.add.sprite(1024+16,2496+32,"coffreCote");
            this.coffres.add(this.coffreVide2);
        }
        if (!this.playerState.getCoffreVide3){
            this.coffreVide3 = this.physics.add.sprite(1792+16,2112+32,"coffreCote");
            this.coffres.add(this.coffreVide3);
        }
        if (!this.playerState.getCoffreTemple){
            this.coffreTemple = this.physics.add.sprite(3072+16,4928+32,"coffreCote");
            this.coffres.add(this.coffreTemple);
        }
        if (!this.playerState.getCoffreFinal1){
            this.coffreFinal1 = this.physics.add.sprite(1120+32,224+16,"coffreDevant");
            this.coffres.add(this.coffreFinal1);
        }
        if (!this.playerState.getCoffreFinal2){
            this.coffreFinal2 = this.physics.add.sprite(1568+32,224+16,"coffreDevant");
            this.coffres.add(this.coffreFinal2);
        }
        if (!this.playerState.getCoffreFinal3){
            this.coffreFinal3 = this.physics.add.sprite(1344+32,416+16,"coffreDevant");
            this.coffres.add(this.coffreFinal3);
        }

        this.golds = this.physics.add.group({allowGravity: false,immovable : true});
        this.lifes = this.physics.add.group({allowGravity: false,immovable : true});

        this.shadow = this.physics.add.image(0,0,'shadow');

        // Chargement du joueur...
        if (this.entrance == "mainCave"){
            this.player = this.physics.add.sprite(2313, 2724, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "mainCave2"){
            this.player = this.physics.add.sprite(2825, 3478, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "caveau1"){
            this.player = this.physics.add.sprite(717, 4750, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "caveau2"){
            this.player = this.physics.add.sprite(665, 2088, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "secret1"){
            this.player = this.physics.add.sprite(1650, 3250, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "secret2"){
            this.player = this.physics.add.sprite(1922, 3791, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "secret3"){
            this.player = this.physics.add.sprite(1944, 4512, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "propulsaEnter"){
            this.player = this.physics.add.sprite(2361, 2055, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "propulsaExit"){
            this.player = this.physics.add.sprite(2850, 1660, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "temple"){
            this.player = this.physics.add.sprite(3007, 3883, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "donjonCape"){
            this.player = this.physics.add.sprite(288, 3456, 'persoIdle').setScale(1);
        }
        else if (this.entrance == "donjonBracelet"){
            this.player = this.physics.add.sprite(3360, 4416, 'persoIdle').setScale(1);
        }

        this.windForce = {x:0,y:0};

        this.player.direction = {x:0,y:-1};

        this.playerState.isFalling = false;
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

        this.momies = this.physics.add.group();
        const Ext_Momies = carteDuNiveau.getObjectLayer('Ext_Momies');
        Ext_Momies.objects.forEach(eachMomie => {
            this.momies.create(eachMomie.x+16,  eachMomie.y-16, "momieBot").body.setAllowGravity(false);
        });
        this.momies.children.each(function (momie) {
            momie.hp = 3;
            momie.isAlive = true;
            momie.getHit = false;
            momie.canMove = true;
            momie.setSize(20,40).setOffset(6,18);
            momie.direction = {x : 0, y : -1};
        })

        // - ADD ... choses.... cool ? 

        this.physics.add.collider(this.player,this.coffres,this.collide, null, this);
        this.physics.add.overlap(this.shadow,this.golds, this.getGold, null, this);
        this.physics.add.overlap(this.shadow,this.lifes, this.getLife, null, this);
        

        this.physics.add.overlap(this.player.zoneAttackUpDown, this.coffres, this.lootCoffre,null,this);
        this.physics.add.overlap(this.player.zoneAttackGaucheDroite, this.coffres, this.lootCoffre,null,this);
        this.physics.add.overlap(this.player.zoneAttackDiag, this.coffres, this.lootCoffre,null,this);

        // Colliders Momies
        this.physics.add.collider(this.momies,this.momies);
        this.physics.add.overlap(this.shadow,this.momies,this.takeDamage,null,this);
        this.physics.add.overlap(this.player.zoneAttackUpDown, this.momies, this.hitEnnemi,null,this);
        this.physics.add.overlap(this.player.zoneAttackGaucheDroite, this.momies, this.hitEnnemi,null,this);
        this.physics.add.overlap(this.player.zoneAttackDiag, this.momies, this.hitEnnemi,null,this);
        
        var rect = this.add.rectangle(this.player.x,this.player.y,35,54);
        this.extraCollide = this.physics.add.existing(rect);
        this.extraCollide.alpha = 0;

        this.Ext_WallOpenPorte_MainCave = carteDuNiveau.createLayer("Ext_WallOpenPorte_MainCave",tileset);
        this.Ext_OpenPorte_MainCave = carteDuNiveau.createLayer("Ext_OpenPorte_MainCave",tileset);

        this.Ext_WallOpenPorte_SortieTemple = carteDuNiveau.createLayer("Ext_WallOpenPorte_SortieTemple",tileset);
        this.Ext_OpenPorte_SortieTemple = carteDuNiveau.createLayer("Ext_OpenPorte_SortieTemple",tileset);

        this.Ext_WallOpenPorte_Propulsa = carteDuNiveau.createLayer("Ext_WallOpenPorte_Propulsa",tileset);
        this.Ext_OpenPorte_Propulsa = carteDuNiveau.createLayer("Ext_OpenPorte_Propulsa",tileset);

        this.Ext_WallOpenPorte_Secret1 = carteDuNiveau.createLayer("Ext_WallOpenPorte_Secret1",tileset);
        this.Ext_OpenPorte_Secret1 = carteDuNiveau.createLayer("Ext_OpenPorte_Secret1",tileset);

        this.Ext_WallOpenPorte_Secret2 = carteDuNiveau.createLayer("Ext_WallOpenPorte_Secret2",tileset);
        this.Ext_OpenPorte_Secret2 = carteDuNiveau.createLayer("Ext_OpenPorte_Secret2",tileset);

        this.Ext_WallOpenPorte_Secret3 = carteDuNiveau.createLayer("Ext_WallOpenPorte_Secret3",tileset);
        this.Ext_OpenPorte_Secret3 = carteDuNiveau.createLayer("Ext_OpenPorte_Secret3",tileset);

        this.Ext_WallOpenPorte_Caveau2 = carteDuNiveau.createLayer("Ext_WallOpenPorte_Caveau2",tileset);
        this.Ext_OpenPorte_Caveau2 = carteDuNiveau.createLayer("Ext_OpenPorte_Caveau2",tileset);

        // SI UNLOCK SECONDE MAIN CAVE
        if (!this.playerState.unlockMainCave){
            this.collideMainCave = this.physics.add.collider(this.player, this.Ext_ClosePorte_MainCave,this.collide, null, this);
            this.physics.add.collider(this.momies, this.Ext_ClosePorte_MainCave);
            this.Ext_WallOpenPorte_MainCave.alpha = 0;
            this.Ext_OpenPorte_MainCave.alpha = 0;
        }
        // SI UNLOCK SORTIE TEMPLE
        if (!this.playerState.unlockSortieTemple){
            this.collideSortieTemple = this.physics.add.collider(this.player, this.Ext_ClosePorte_SortieTemple,this.collide, null, this);
            this.physics.add.collider(this.momies, this.Ext_ClosePorte_SortieTemple);
            this.Ext_WallOpenPorte_SortieTemple.alpha = 0;
            this.Ext_OpenPorte_SortieTemple.alpha = 0;
        }
        // SI UNLOCK PROPULSA PORTE
        if (!this.playerState.unlockPropulsa){
            this.collidePropulsa = this.physics.add.collider(this.player, this.Ext_ClosePorte_Propulsa,this.collide, null, this);
            this.physics.add.collider(this.momies, this.Ext_ClosePorte_Propulsa);
            this.Ext_WallOpenPorte_Propulsa.alpha = 0;
            this.Ext_OpenPorte_Propulsa.alpha = 0;
        }
        // SI UNLOCK SECRET 1
        if (!this.playerState.unlockSecret1){
            this.collideSecret1 = this.physics.add.collider(this.player, this.Ext_ClosePorte_Secret1,this.collide, null, this);
            this.physics.add.collider(this.momies, this.Ext_ClosePorte_Secret1);
            this.Ext_WallOpenPorte_Secret1.alpha = 0;
            this.Ext_OpenPorte_Secret1.alpha = 0;
        }
        // SI UNLOCK SECRET 2
        if (!this.playerState.unlockSecret2){
            this.collideSecret2 = this.physics.add.collider(this.player, this.Ext_ClosePorte_Secret2,this.collide, null, this);
            this.physics.add.collider(this.momies, this.Ext_ClosePorte_Secret2);
            this.Ext_WallOpenPorte_Secret2.alpha = 0;
            this.Ext_OpenPorte_Secret2.alpha = 0;
        }
        // SI UNLOCK SECRET 3
        if (!this.playerState.unlockSecret3){
            this.collideSecret3 = this.physics.add.collider(this.player, this.Ext_ClosePorte_Secret3,this.collide, null, this);
            this.physics.add.collider(this.momies, this.Ext_ClosePorte_Secret3);
            this.Ext_WallOpenPorte_Secret3.alpha = 0;
            this.Ext_OpenPorte_Secret3.alpha = 0;
        }
        // SI UNLOCK CAVEAU 2
        if (!this.playerState.unlockCaveau2){
            this.collideCaveau2 = this.physics.add.collider(this.player, this.Ext_ClosePorte_Caveau2,this.collide, null, this);
            this.physics.add.collider(this.momies, this.Ext_ClosePorte_Caveau2);
            this.Ext_WallOpenPorte_Caveau2.alpha = 0;
            this.Ext_OpenPorte_Caveau2.alpha = 0;
        }
        this.vents = [];
        const Ext_Vent = carteDuNiveau.getObjectLayer('Ext_Vent');
        Ext_Vent.objects.forEach(vent => {
            this.vents.push(this.add.sprite(vent.x+16,  vent.y-16, "vent"));
        });

        const Donjon_Front = carteDuNiveau.createLayer("Donjon_Front",tileset);
        const Ext_Wall_Front_Other = carteDuNiveau.createLayer("Ext_Wall_Front_Other",tileset);
        const Ext_Wall_Front = carteDuNiveau.createLayer("Ext_Wall_Front",tileset);

        const Ext_Exit = carteDuNiveau.createLayer("Ext_Exit",tileset);

        // COLLISIONS EXTERIEUR
        this.Ext_Collide = carteDuNiveau.createLayer("Ext_Collide",tileset);
        this.Ext_Collide.setCollisionByProperty({ collide: true });
        this.Ext_Collide.alpha = 0;
        this.physics.add.collider(this.player, this.Ext_Collide, this.collide, null, this);
        this.physics.add.collider(this.momies, this.Ext_Collide);

        if(!this.finalDoor){
            this.finalCollider = this.physics.add.collider(this.player,this.Ext_FinalClosePorte,this.collide, null, this);
        }
        
        

        // OVERLAP FALLING EXTERIEUR
        const Ext_FallOverLap = carteDuNiveau.createLayer("Ext_FallOverLap",tileset);
        Ext_FallOverLap.setCollisionByProperty({ fall: true },true);
        Ext_FallOverLap.alpha = 0;
        this.fallingCollider =this.physics.add.collider(this.extraCollide, Ext_FallOverLap,this.playerFalling,null,this);
        
        
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
        // Vent
        this.anims.create({
            key: 'vent',
            frames: this.anims.generateFrameNumbers('vent', {start:0,end:5}),
            frameRate: 6,
            repeat: -1
        });

        this.vents.forEach(vent => {
            vent.anims.play('vent',true);
        });
        // Animations Momies
        this.anims.create({
            key: 'leftMomie',
            frames: this.anims.generateFrameNumbers('momieLeft', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'rightMomie',
            frames: this.anims.generateFrameNumbers('momieRight', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'botMomie',
            frames: this.anims.generateFrameNumbers('momieBot', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'topMomie',
            frames: this.anims.generateFrameNumbers('momieTop', {start:0,end:11}),
            frameRate: 12,
            repeat: -1
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

        // - SUIVI DE EXTRACOLLIDE
        
        this.physics.moveTo(this.extraCollide,this.player.x,this.player.y+25,this.player.body.speed + 30);

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
                this.fallingCollider.active = false;
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
                this.fallingCollider.active = true;
            }
        }

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
        else if (this.canOut && (this.player.body.position.x >= 2784 && this.player.body.position.x <= 2865 && this.player.body.position.y <= 3420 && this.player.body.position.y >= 3400 )){
            
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
        else if (this.canOut && (this.player.body.position.x <= 1969  && this.player.body.position.x >= 1920 && this.player.body.position.y <= 4470 && this.player.body.position.y >= 4450 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('Secret3', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //PROPULSA CAVE ENTER
        else if (this.canOut && (this.player.body.position.x <= 2385  && this.player.body.position.x >= 2336 && this.player.body.position.y <= 2005 && this.player.body.position.y >= 1990 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('CavePropulsa', {entrance: "enter", playerState : this.playerState});
			})
        }
        //PROPULSA CAVE EXIT
        else if (this.canOut && (this.player.body.position.x <= 2895  && this.player.body.position.x >= 2875 && this.player.body.position.y <= 1691 && this.player.body.position.y >= 1630 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('CavePropulsa', {entrance: "exit", playerState : this.playerState});
			})
        }
        //SORTIE TEMPLE
        else if (this.canOut && (this.player.body.position.x <= 3055  && this.player.body.position.x >= 3035 && this.player.body.position.y <= 3901 && this.player.body.position.y >= 3844 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('SortieTemple', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //CAVEAU 1
        else if (this.canOut && (this.player.body.position.x <= 700  && this.player.body.position.x >= 680 && this.player.body.position.y <= 4767 && this.player.body.position.y >= 4704 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('Caveau1', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //CAVEAU 2
        else if (this.canOut && (this.player.body.position.x <= 630  && this.player.body.position.x >= 610 && this.player.body.position.y <= 2109 && this.player.body.position.y >= 2052 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('Caveau2', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //DONJON CAPE
        else if (this.canOut && (this.player.body.position.x <= 352  && this.player.body.position.x >= 256 && this.player.body.position.y <= 3392 && this.player.body.position.y >= 3360 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('DonjonCape', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //DONJON BRACELET
        else if (this.canOut && (this.player.body.position.x <= 3424  && this.player.body.position.x >= 3328 && this.player.body.position.y <= 4352 && this.player.body.position.y >= 4320 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(400, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
			this.time.delayedCall(500, () => {
					this.scene.start('DonjonBracelet', {entrance: "outdoor", playerState : this.playerState});
			})
        }
        //FIN
        else if (this.canOut && (this.player.body.position.x <= 1408  && this.player.body.position.x >= 1312 && this.player.body.position.y <= 128 && this.player.body.position.y >= 96 )){
            
            this.canOut = false;
            this.cameras.main.fadeOut(8000, 35, 22, 21);
            this.playerState.canMove = false;
            this.player.setVelocityX(this.player.body.velocity.x/5);
            this.player.setVelocityY(this.player.body.velocity.y/5); 
            
            this.tutoText = this.add.text(750,450,"You conquer your lands !",{ fontSize:'40px',fill:'#fffeaa', fontStyle:"bold"}).setScrollFactor(0);
			this.time.delayedCall(8000, () => {
					this.scene.pause();
			})
        }

        // TRIGGERS FIN JEU
        if (!this.finalDoor && (this.player.body.position.x <= 1504  && this.player.body.position.x >= 1216 && this.player.body.position.y <= 352 && this.player.body.position.y >= 128 )){
            console.log("yoyo");
            if(this.textFin){
                this.textFin.setText("Come back with 500 coins...");
            }
            else{
                this.textFin = this.add.text(750,450,"Come back with 500 coins...",{ fontSize:'40px',fill:'#ff4967', fontStyle:"bold"}).setScrollFactor(0);
            }

        }
        else {
            if(this.textFin){
                this.textFin.setText("");
            }
            else{
                this.textFin = this.add.text(750,450,"",{ fontSize:'40px',fill:'#ff4967', fontStyle:"bold"}).setScrollFactor(0);
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

            if((this.playerState.unlockSecret3 == false) && this.player.body.position.x <= 2016  && this.player.body.position.x >= 1856 && this.player.body.position.y <= 4576 && this.player.body.position.y >= 4448 ){
                this.playerState.unlockSecret3 = true;
                this.cameras.main.shake(1500, 0.0002);
                this.tweens.add({
                    targets: [this.Ext_ClosePorte_Secret3,this.Ext_WallClosePorte_Secret3],
                    alpha: 0,
                    duration: 3500,
                    ease: 'Power2'
                });
                this.tweens.add({
                    targets: [this.Ext_OpenPorte_Secret3,this.Ext_WallOpenPorte_Secret3],
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2'
                });
                this.collideSecret3.active = false;
            }
            else if((this.playerState.unlockSecret2 == false) && this.player.body.position.x <= 1952  && this.player.body.position.x >= 1824 && this.player.body.position.y <= 3840 && this.player.body.position.y >= 3680 ){
                this.playerState.unlockSecret2 = true;
                this.cameras.main.shake(1500, 0.0002);
                this.tweens.add({
                    targets: [this.Ext_OpenPorte_Secret2,this.Ext_WallOpenPorte_Secret2],
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2'
                });
				this.tweens.add({
                    targets: [this.Ext_ClosePorte_Secret2,this.Ext_WallClosePorte_Secret2],
                    alpha: 0,
                    duration: 3500,
                    ease: 'Power2'
                });
                this.collideSecret2.active = false;
            }
            else if((this.playerState.unlockSecret1 == false) && this.player.body.position.x <= 1728  && this.player.body.position.x >= 1600 && this.player.body.position.y <= 3328 && this.player.body.position.y >= 3168 ){
                this.playerState.unlockSecret1 = true;
                this.cameras.main.shake(1500, 0.0002);
                this.tweens.add({
                    targets: [this.Ext_OpenPorte_Secret1,this.Ext_WallOpenPorte_Secret1],
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2'
                });
              
				this.tweens.add({
                    targets: [this.Ext_ClosePorte_Secret1,this.Ext_WallClosePorte_Secret1],
                    alpha: 0,
                    duration: 3500,
                    ease: 'Power2'
                });
                this.collideSecret1.active = false;
            }
            else if((this.playerState.unlockMainCave == false) && this.player.body.position.x <= 2880  && this.player.body.position.x >= 2720 && this.player.body.position.y <= 3552 && this.player.body.position.y >= 3424 ){
                this.playerState.unlockMainCave = true;
                this.cameras.main.shake(1500, 0.0002);
                this.tweens.add({
                    targets: [this.Ext_OpenPorte_MainCave,this.Ext_WallOpenPorte_MainCave],
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2'
                });

				this.tweens.add({
                    targets: [this.Ext_ClosePorte_MainCave,this.Ext_WallClosePorte_MainCave],
                    alpha: 0,
                    duration: 3500,
                    ease: 'Power2'
                });

                this.collideMainCave.active = false;
            }
            else if((this.playerState.unlockPropulsa == false) && this.player.body.position.x <= 2432  && this.player.body.position.x >= 2272 && this.player.body.position.y <= 2112 && this.player.body.position.y >= 1920 ){
                this.playerState.unlockPropulsa = true;
                this.cameras.main.shake(1500, 0.0002);
                this.tweens.add({
                    targets: [this.Ext_OpenPorte_Propulsa,this.Ext_WallOpenPorte_Propulsa],
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2'
                });

				this.tweens.add({
                    targets: [this.Ext_ClosePorte_Propulsa,this.Ext_WallClosePorte_Propulsa],
                    alpha: 0,
                    duration: 3500,
                    ease: 'Power2'
                });

                this.collidePropulsa.active = false;
            }
            else if((this.playerState.unlockCaveau2 == false) && this.player.body.position.x <= 690  && this.player.body.position.x >= 608 && this.player.body.position.y <= 2112 && this.player.body.position.y >= 1984 ){
                this.playerState.unlockCaveau2 = true;
                this.cameras.main.shake(1500, 0.0002);
                this.tweens.add({
                    targets: [this.Ext_OpenPorte_Caveau2,this.Ext_WallOpenPorte_Caveau2],
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2'
                });

				this.tweens.add({
                    targets: [this.Ext_ClosePorte_Caveau2,this.Ext_WallClosePorte_Caveau2],
                    alpha: 0,
                    duration: 3500,
                    ease: 'Power2'
                });

                this.collideCaveau2.active = false;
            }
        }

        // TRIGGERS VENT
        if ((this.player.body.position.x <= 3072  && this.player.body.position.x >= 1216 && this.player.body.position.y <= 5152 && this.player.body.position.y >= 4160)
            || this.player.body.position.x <= 1952  && this.player.body.position.x >= 736 && this.player.body.position.y <= 4160 && this.player.body.position.y >= 3328){
                
                this.windForce = {x:0,y:-PLAYER_SPEED};
                
        }
        else{
            this.windForce = {x:0,y:0};
        }
        
        // - MOVEMENT 
        if(this.playerState.canMove == true){
            this.playerMovement();
        }

        this.moveMomies();

        if(this.playerState.gold >=500 && !this.finalDoor){
            this.finalCollider.active = false;
            this.finalDoor = true;
            this.Ext_FinalClosePorte.alpha = 0;
        }

        if(this.player.y > 5152){
            this.playerFalling();
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

    lootCoffre(zone, coffre){
        coffre.body.enable = false;
        coffre.alpha = 0;
        if(coffre == this.coffrePilleur1){
            this.playerState.getCoffrePilleur1 = true;
        }
        else if(coffre == this.coffrePilleur2){
            this.playerState.getCoffrePilleur2 = true;
        }
        else if(coffre == this.coffrePilleur3){
            this.playerState.getCoffrePilleur3 = true;
        }
        else if(coffre == this.coffreVide0){
            this.playerState.getCoffreVide0 = true;
        }
        else if(coffre == this.coffreVide1){
            this.playerState.getCoffreVide1 = true;
        }
        else if(coffre == this.coffreVide2){
            this.playerState.getCoffreVide2 = true;
        }
        else if(coffre == this.coffreVide3){
            this.playerState.getCoffreVide3 = true;
        }
        else if(coffre == this.coffreTemple){
            this.playerState.getCoffreTemple = true;
        }
        else if(coffre == this.coffreFinal1){
            this.playerState.getCoffreFinal1 = true;
        }
        else if(coffre == this.coffreFinal2){
            this.playerState.getCoffreFinal2 = true;
        }
        else if(coffre == this.coffreFinal3){
            this.playerState.getCoffreFinal3 = true;
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

    moveMomies(){
        this.momies.children.each(function (momie) {

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

            if(Phaser.Math.Distance.Between(this.player.x, this.player.y, momie.x, momie.y) < 200){
                var angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, momie.x, momie.y);
                let index = Math.round(angle / (Math.PI / 4)) + 4;
                index > 7 ? index -= 8 : index;
                momie.direction = directions[index];

                if(momie.canMove){

                    if (momie.direction.x == 0 && momie.direction.y == 1){
                        momie.setVelocityX( momie.direction.x * MOMIES_SPEED );
                        momie.setVelocityY( momie.direction.y * MOMIES_SPEED );
                        momie.anims.play('botMomie', true)
                    }
                    if (momie.direction.x == 0 && momie.direction.y == -1){
                        momie.setVelocityX( momie.direction.x * MOMIES_SPEED );
                        momie.setVelocityY( momie.direction.y * MOMIES_SPEED );
                        momie.anims.play('topMomie', true)
                    }
                    if (momie.direction.x == 1 && momie.direction.y == 0){
                        momie.setVelocityX( momie.direction.x * MOMIES_SPEED );
                        momie.setVelocityY( momie.direction.y * MOMIES_SPEED );
                        momie.anims.play('rightMomie', true)
                    }
                    else if (momie.direction.x == -1 && momie.direction.y == 0){
                        momie.setVelocityX( momie.direction.x * MOMIES_SPEED );
                        momie.setVelocityY( momie.direction.y * MOMIES_SPEED );
                        momie.anims.play('leftMomie', true)
                    }
                    if (momie.direction.x == -1 && momie.direction.y == 1){
                        momie.setVelocityX( momie.direction.x * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.setVelocityY( momie.direction.y * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.anims.play('leftMomie', true)
                    }
                    if (momie.direction.x == -1 && momie.direction.y == -1){
                        momie.setVelocityX( momie.direction.x * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.setVelocityY( momie.direction.y * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.anims.play('leftMomie', true)
                    }
                    if (momie.direction.x == 1 && momie.direction.y == -1){
                        momie.setVelocityX( momie.direction.x * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.setVelocityY( momie.direction.y * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.anims.play('rightMomie', true)
                    }
                    if (momie.direction.x == 1 && momie.direction.y == 1){
                        momie.setVelocityX( momie.direction.x * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.setVelocityY( momie.direction.y * (MOMIES_SPEED * (Math.SQRT2/2)));
                        momie.anims.play('rightMomie', true)
                    }
                }
            }
            else{
                momie.setVelocityX(0);
                momie.setVelocityY(0);
            }
            
            
        }, this)
    }

    hitEnnemi(player,ennemi){
        if(!ennemi.getHit){
            ennemi.getHit = true;
            ennemi.hp -= 1
            ennemi.canMove = false;
            this.cameras.main.shake(200, 0.0001);
            ennemi.setTint(0xff4967);
            ennemi.setVelocityX(-ennemi.direction.x * ennemi.body.speed*2);
            ennemi.setVelocityY(-ennemi.direction.y * ennemi.body.speed*2);
            this.time.delayedCall(400, () => {

                if(ennemi.hp <= 0){
                    this.tweens.add({
                        targets: ennemi,
                        alpha: 0,
                        duration: 300,
                        ease: 'Power2'
                    });
                    this.time.delayedCall(200, () => {
                        this.dropGold(ennemi.x,ennemi.y,Math.floor((Math.random()*3)+1))
                        ennemi.destroy();
                    })
                }
                else {
                    ennemi.setTint(0xffffff);
                    ennemi.canMove = true;
                    ennemi.getHit = false;
                }    
            })

        }
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