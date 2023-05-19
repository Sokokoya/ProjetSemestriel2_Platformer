/**
 * Player.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Player permettant de créer la protagoniste, 
 * ainsi que toutes les méthodes permettant de jouer correctement :
 * - Déplacement
 * - Mécaniques propres au personnage
 * - Animations
 * - Mort et respawn
 * 
 * A FAIRE DANS LA CLASSE :
 * - mecaniques de saut, d'esquive, et de coups
*/
import Kick from "./Kick.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

        this.direction = "droite";

        this.timeFromLastAttack = 0;
        this.cooldown = 600;
        
    }
    



    updatePlayer() {

        const keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        const keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        const keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Contôles du joueur horizontalement, le joueur ne peut pas se déplacer s'il est en pleine esquive
        if (!window.dataPlayer.isDodging) {
            if (this.clavier.left.isDown) {
                this.setVelocityX(-window.dataPlayer.speed);
    
                this.direction = "gauche";
    
            } else if (this.clavier.right.isDown) {
                this.setVelocityX(window.dataPlayer.speed);
    
                this.direction = "droite";
    
            } else {
                this.setVelocityX(0);
            }
        }
        


        // si saut
        if (this.clavier.up.isDown) {
            this.jump();
        }

        // si dodge (E)
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
            console.log("dodge");
            this.dodge();
        }

        // si kick (A)
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            console.log("kick");
            this.highKick('hitbox');
        }

        // si baseball bat (Z)
        if (Phaser.Input.Keyboard.JustDown(keyZ)) {
            console.log("bat");
            this.baseballBat();
        }

        // si lancer objet (R)
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            console.log("lance objet");
            this.throw();
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


    dodge() {
        if (!window.dataPlayer.isDodging) {
            window.dataPlayer.isDodging = true;
            console.log("dodge");

            setTimeout(function() {
                window.dataPlayer.isDodging = false
            }, 500);
        }
    }


    highKick(sprite) {

        if (new Date().getTime() - this.timeFromLastAttack < this.cooldown){
            return; 
        } 

        this.kick = new Kick(this.scene, this.x, this.y, sprite);
        this.kick.hit(this.direction);

        this.timeFromLastAttack = new Date().getTime();
    }


    baseballBat() {
        console.log("bat");

        const enemy = this.getClosestEnemy();

        if (enemy) {
            enemy.gettingHit(this);
        }
    }


    throw() {
        console.log("throw");
    }


    gettingHit() {
        if (!isDodging) {

            this.scene.scene.start(window.dataPlayer.checkpoint, {
                x: window.dataPlayer.checkpointX,
                y: window.dataPlayer.checkPointY
            });
        }
    }

    hit(ennemi, attaque) {
        attaque.destroy();

        ennemi.destroy();
    }


}