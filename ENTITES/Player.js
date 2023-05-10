/**
 * Player.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Player,
 * 
 * 
 * A FAIRE DANS LA CLASSE :
 * - mecaniques de saut, d'esquive, et de coups
*/

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = this.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

        this.isDodging = false;
        /*
        this.jump();
        this.dodge();
        this.highKick();
        this.baseballBat();*/
    }



    updatePlayer() {

        // Contôles du joueur horizontalement, le joueur ne peut pas se déplacer s'il est en pleine esquive
        if (!this.isDodging) {
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
        


        // si saut (espace, gamepad A)
        if (this.clavier.SPACE.isDown && this.body.blocked.down) {
            this.jump();
        }

        // si dodge (E, gamepad B)
        while (Phaser.Input.Keyboard.JustDown(Phaser.Input.Keyboard.KeyCodes.E)) {
            this.dodge();
        }

        // si kick (A, gamepad X)
        if (Phaser.Input.Keyboard.JustDown(Phaser.Input.Keyboard.KeyCodes.A)) {
            this.highKick();
        }

        // si baseball bat (Z, gamepad Y)
        if (Phaser.Input.Keyboard.JustDown(Phaser.Input.Keyboard.KeyCodes.Z)) {
            this.baseballBat();
        }

    }


    jump() {
        this.setVelocityY(-window.dataPlayer.speedUp);

        //#TODO: mettre walljump simple
    }


    dodge() {
        if (!this.isDodging) {
            this.isDodging = true;

            this.time.delayedCall(200, function() {
                this.isDodging = false
            })


        }

    }

    highKick() {

    }

    baseballBat() {

    }

    gettingHit() {

        // fin + mort

    }


}