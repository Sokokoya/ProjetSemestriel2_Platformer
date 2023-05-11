/**
 * Ennemi.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Ennemi,
 * 
 * 
 * A FAIRE DANS LA CLASSE :
 * - mecaniques de coups, deplacement tween etc
*/

export default class Ennemi extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

    }


    updateEnnemi() {

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