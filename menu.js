export class Menu extends Phaser.Scene{

    constructor(){

        super("Menu");
        
    }

    preload(){
        this.load.image('background',"assets/ui/menu.png");
    }
    
    create(){

        this.add.image(0, 0, 'background').setOrigin(0,0).setScale(1);

        this.input.on('pointerdown', this.loadGame,this);
    
    }
    
    
    update(){
    
    }

    loadGame(){

        if(this.input.x >= 750 && this.input.y >= 650 && this.input.x <= 1200 && this.input.y <= 1030 ){
            this.cameras.main.fadeOut(1000, 35, 22, 21);
            this.time.delayedCall(1000, () => {
				this.scene.start('MainCave');
            })
        }
    }


}