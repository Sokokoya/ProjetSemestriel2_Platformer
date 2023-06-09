/**
 * Ennemi.js --- Solenn Cattin 
 * VERSION BETA
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

        this.typeEnnemi = type;
        this.scene = scene;
        this.enemies = enemies;

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

        this.hasBeenHit = false;

        this.timeFromLastAttack = 0;
        this.cooldown = 2000;

        this.spriteAttaque = 'hitbox';

        //this.createAnimation();

    }

    getTypeEnnemi() {
        return this.typeEnnemi;
    }

    createAnimation(){
		this.scene.anims.create({
			key: 'ennemi_idle',
			frames: this.scene.anims.generateFrameNumbers(this.typeEnnemi, {start:0, end:3}),
			frameRate: 8,
			repeat: -1,
		});
		this.anims.play("ennemi_idle",true);
	}


    updateEnnemi(player) {
        
        this.attaque();

        if (this.typeEnnemi === "ennemi1") {
            this.anims.play("ennemi1", true);

        } else if (this.typeEnnemi === "ennemi2") {
            this.anims.play("ennemi2", true);

        } else if (this.typeEnnemi === "ennemi3") {
            this.anims.play("ennemi3", true);

        } else if (this.typeEnnemi === "ennemi4") {
            this.anims.play("ennemi4", true);
        } 
        
        


    }
    

    attaque() {


        if (new Date().getTime() - this.timeFromLastAttack < this.cooldown){
            return; 
        } 

        this.kick = new AttaqueEnnemie(this.scene, this.x, this.y, this.spriteAttaque);
        this.kick.hit(this.spriteAttaque);

        this.timeFromLastAttack = new Date().getTime();
    }




    gettingHit(player) {
        console.log("hit !");
        this.hasBeenHit = true;
        this.scene.enemies.remove(this);
        this.destroy();
    }


}