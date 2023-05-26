/**
 * AttaqueEnnemie.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe AttaqueEnnemie permettant de créer les coups de pieds du player
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

        console.log ("joueur en position"+ this.x + ","+ this.y + ", direction du tir: " ) ; 

        var spr_attack = this.scene.groupAttacks.create(this.x, this.y, sprite);
        
        spr_attack.body.allowGravity = false;
        spr_attack.setCollideWorldBounds(true);

        setTimeout(() => {
            spr_attack.destroy();
        }, 500);

        
        
    }


}