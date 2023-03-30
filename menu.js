export class Menu extends Phaser.Scene{

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
        this.cameras.main.fadeOut(2000, 35, 22, 21);
                this.time.delayedCall(2000, () => {
					this.scene.start('MainCave');
                })
    }


}