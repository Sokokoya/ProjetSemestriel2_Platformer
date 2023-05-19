/**
 * Bat.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Bat permettant de créer les coups de batte du player
*/

var groupBats;

export default class Bat extends Phaser.Physics.Arcade.Sprite {

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

        if (direction === 'gauche') { 
            coefDirX = -1;
        } 

        else if (direction === 'droite') { 
            coefDirX = 1;
        }

        var spr_bat = this.scene.groupBats.create(this.x + (25 * coefDirX), this.y -4, 'hitbox');
        
        spr_bat.body.allowGravity = false;
        spr_bat.setCollideWorldBounds(true);

        setTimeout(() => {
            spr_bat.destroy();
        }, 500);

        
        
    }


}