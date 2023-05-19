/**
 * Kick.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Kick permettant de créer les coups de pieds du player
*/

var groupKicks;

export default class Kick extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);
        
    }
    

    hit(direction) {

        console.log ("joueur en position"+ this.x + ","+ this.y + ", direction du tir: " +direction) ; 

        var coefDirX;

        if (direction === 'left') { 
            coefDirX = -1;
        } 

        else if (direction === 'right') { 
            coefDirX = 1;
        }

        var spr_kick = this.scene.groupKicks.create(this.x + (25 * coefDirX), this.y -4, 'hitbox');
        
        spr_kick.body.allowGravity = false;
        spr_kick.setCollideWorldBounds(true);

        setTimeout(() => {
            spr_kick.destroy();
        }, 500);

        
        
    }


}