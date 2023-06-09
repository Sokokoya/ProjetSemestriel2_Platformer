/**
 * AttaqueEnnemie.js --- Solenn Cattin 
 * VERSION BETA
 * 
 * Fichier comportant la classe AttaqueEnnemie permettant de créer les attaques ennemies
*/

var groupAttacks;

export default class AttaqueEnnemie extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);
        
    }
    

    hit(sprite) {


        var spr_attack = this.scene.groupAttacks.create(this.x, this.y, sprite);
        
        spr_attack.body.allowGravity = false;
        spr_attack.setCollideWorldBounds(true);

        setTimeout(() => {
            spr_attack.destroy();
        }, 500);

        
        
    }


}