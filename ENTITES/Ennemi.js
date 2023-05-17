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

    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture);

        // trois types differents
        this.typeEnnemi = type;

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

    }


    updateEnnemi(player) {

        // déplacement

        // si le joueur rentre dans la range de l'ennemi, l'ennemi attaque en fonction de son type

        this.attaque();


        //si le type est "esquive", on peut dodge

    }


    attaque() {

        if (this.typeEnnemi === "esquive") {
            this.highKick();

        } else if (this.typeEnnemi === "distance") {
            this.baseballBat();

        } else if (this.typeEnnemi === "rapide") {
            this.punch();
        }
    }

    dodge() {

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