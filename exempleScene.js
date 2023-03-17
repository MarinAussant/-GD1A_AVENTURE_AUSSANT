var score = 0;
var scoreText = "Score : ";

class intro extends Phaser.Scene{

    constructor(){

        super("intro");

    }

    preload(){
        this.load.image('space', 'assets/space.jpg');
        this.load.image('planet', 'assets/planet.png');
    }
    
    create(){

        this.add.image(0, 0, 'space').setOrigin(0,0).setScale(0.4);
        var planet = this.add.image(400, 300, 'planet').setScale(0.25).setInteractive();

        planet.once('pointerup',this.loadPremierNiveau,this);

    }
    
    
    update(){
        

    
    }

    loadPremierNiveau(){
        this.scene.start("premierNiveau");
    }

}


class premierNiveau extends Phaser.Scene{

    constructor(){

        super("premierNiveau");

    }

    preload(){

        this.load.image('surface', 'assets/surface.jpg');
        this.load.image('vaisseau', 'assets/vaisseau.png');

    }
    
    create(){

        this.add.image(0, 0, 'surface').setOrigin(0,0).setScale(0.85);
        var vaisseau = this.add.image(350, 300, 'vaisseau').setOrigin(0,0).setScale(0.5).setInteractive();

        vaisseau.once('pointerup',this.loadVaisseau,this);

    }
    
    
    update(){
    
    
    }

    loadVaisseau(){
        this.scene.start("vaisseau");
    }

}

class vaisseau extends Phaser.Scene{

    constructor(){

        super("vaisseau");

    }

    preload(){

        this.load.image('indoorVaisseau', 'assets/indoorVaisseau.jpg');
        this.load.image('button', 'assets/button.png');
    }

    
    create(){

        this.add.image(0, 0, 'indoorVaisseau').setOrigin(0,0).setScale(0.6);
        var button = this.add.image(1170, 350, 'button').setOrigin(0,0).setScale(0.2).setInteractive();

        button.on('pointerup',this.addScore,this);

        scoreText=this.add.text(16,16,'Score : ' + score,{fontSize:'32px',fill:'#000'});
    
    }
    
    
    update(){
        

    
    }

    addScore(){
        score += 5;
        scoreText.setText('Score : ' + score);
    }

}


var config = {
    type: Phaser.AUTO,
    width: 1535, height: 950,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 1000 },
        debug: true
    }},
    scene: [intro, premierNiveau, vaisseau]
};


new Phaser.Game(config);