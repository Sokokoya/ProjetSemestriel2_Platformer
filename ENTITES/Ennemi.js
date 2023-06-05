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
import AttaqueEnnemie from "./AttaqueEnnemie.js";

export default class Ennemi extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, type, enemies) {
        super(scene, x, y, texture);

        // trois types differents
        this.typeEnnemi = type;
        this.scene = scene;
        this.enemies = enemies;

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

        this.hasBeenHit = false;

        this.timeFromLastAttack = 0;
        this.cooldown = 1300;

        this.spriteAttaque = 'hitbox';

    }


    updateEnnemi(player) {

        // déplacement

        // si le joueur rentre dans la range de l'ennemi, l'ennemi attaque en fonction de son type

        this.attaque();


        //si le type est "esquive", on peut dodge

    }
    

    attaque() {

        if (this.typeEnnemi === "distance") {
            this.spriteAttaque = 'hitbox_player';
        } 

        console.log("attaque ennemi");

        if (new Date().getTime() - this.timeFromLastAttack < this.cooldown){
            return; 
        } 

        this.kick = new AttaqueEnnemie(this.scene, this.x, this.y, this.spriteAttaque);
        this.kick.hit(this.spriteAttaque);

        this.timeFromLastAttack = new Date().getTime();
    }

    dodge() {

    }




    gettingHit(player) {
        console.log("hit !");
        this.hasBeenHit = true;
        this.scene.enemies.remove(this);
        this.destroy();
    }


}