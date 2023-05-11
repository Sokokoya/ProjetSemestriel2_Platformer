/**
 * Boss.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Boss,
 * 
 * 
 * A FAIRE DANS LA CLASSE :
*/

export default class Boss extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

    }



    updateBoss() {


    }


    

    highKick() {

    }

    baseballBat() {

    }

    punch() {

    }

    gettingHit() {
        
    }


}