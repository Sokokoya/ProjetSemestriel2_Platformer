/**
 * Kick.js --- Solenn Cattin 
 * VERSION BETA
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
    

    hit(sprite) {

        var spr_kick = this.scene.groupKicks.create(this.x, this.y, sprite);
        
        spr_kick.body.allowGravity = false;
        spr_kick.setCollideWorldBounds(true);

        setTimeout(() => {
            spr_kick.destroy();
        }, 500);

        
        
    }


}