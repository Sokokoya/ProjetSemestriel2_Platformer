/**
 * Player.js --- Solenn Cattin 
 * VERSION BETA
 * 
 * Fichier comportant la classe Player permettant de créer la protagoniste, 
 * ainsi que toutes les méthodes permettant de jouer correctement :
 * - Déplacement
 * - Mécaniques propres au personnage
 * 
*/
import Kick from "./Kick.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

        this.direction = "droite";

        this.timeFromLastAttack = 0;
        this.cooldown = 600;
        
    }

    



    updatePlayer() {



        // Contôles du joueur horizontalement
        if (this.clavier.left.isDown) {
            this.setVelocityX(-window.dataPlayer.speed);

            this.direction = "gauche";

            this.flipX = true;
            this.anims.play('keiko_walk', true);

        } else if (this.clavier.right.isDown) {
            this.setVelocityX(window.dataPlayer.speed);

            this.direction = "droite";

            this.flipX = false;
            this.anims.play('keiko_walk', true);

        } else {
            this.setVelocityX(0);
            this.anims.play('keiko_idle', true);
        }
    
        


        // si saut
        if (this.clavier.up.isDown) {
            this.jump();
            this.anims.play('keiko_jump', true);
        }

        // si kick (A)
        if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
            this.highKick('hitbox_player');
        }


        window.dataPlayer.x = this.x;
        window.dataPlayer.y = this.y;

    }


    jump() {

        // Saut simple
        if (this.body.blocked.down) {
            this.setVelocityY(-window.dataPlayer.speedUp);
        }

        // Saut mural
        if (this.body.blocked.right) {
            if (window.dataPlayer.sautMural) {

                window.dataPlayer.sautMural = false;
                window.dataPlayer.toucheBloquee = false;

                setTimeout(function() {
                    window.dataPlayer.toucheBloquee = false;
                }, 200);

                setTimeout(function() {
                    window.dataPlayer.sautMural = true;
                }, 500);

                this.setVelocityY(-window.dataPlayer.speedUp);
                this.setVelocityX(-window.dataPlayer.speed);
            }
        }

        if (this.body.blocked.left) {
            if (window.dataPlayer.sautMural) {

                window.dataPlayer.sautMural = false;
                window.dataPlayer.toucheBloquee = false;

                setTimeout(function() {
                    window.dataPlayer.toucheBloquee = false;
                }, 200);

                setTimeout(function() {
                    window.dataPlayer.sautMural = true;
                }, 500);
                
                this.setVelocityY(-window.dataPlayer.speedUp);
                this.setVelocityX(window.dataPlayer.speed);
            }
        }
        
    }



    highKick(sprite) {
        console.log("kick");

        if (new Date().getTime() - this.timeFromLastAttack < this.cooldown){
            return; 
        } 

        this.kick = new Kick(this.scene, this.x, this.y, sprite);
        this.kick.hit(sprite);

        this.timeFromLastAttack = new Date().getTime();
    }


    gettingHit() {
        
        this.anims.play('keiko_death', true);

        this.scene.scene.start(window.dataPlayer.checkpoint, {
            x: window.dataPlayer.checkpointX,
            y: window.dataPlayer.checkpointY
        });
        
    }

    hit(ennemi, attaque) {
        attaque.destroy();

        ennemi.destroy();
    }


}