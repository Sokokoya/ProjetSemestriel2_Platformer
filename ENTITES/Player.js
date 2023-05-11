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

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

        this.isDodging = false;
        this.sautMural = true;
        this.toucheBloquee = false;
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
        if (this.clavier.space.isDown) {
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

        // Saut simple
        if (this.body.blocked.down) {
            this.setVelocityY(-window.dataPlayer.speedUp);
        }


        //#TODO: faire fonctionner le walljump
        // Saut mural
        if (this.body.blocked.right) {
            console.log("bien blouqer");
            if (this.sautMural) {
                console.log("saute");

                this.sautMural = false;
                this.toucheBloquee = false;

                setTimeout(function() {
                    this.toucheBloquee = false;
                }, 200);

                setTimeout(function() {
                    this.sautMural = true;
                }, 500);

                this.setVelocityY(-window.dataPlayer.speedUp);
                this.setVelocityX(-window.dataPlayer.speed);
            }
        }

        if (this.body.blocked.left) {
            console.log("bien blouqer");
            if (this.sautMural) {
                console.log("saute");

                this.sautMural = false;
                this.toucheBloquee = false;

                setTimeout(function() {
                    this.toucheBloquee = false;
                }, 200);

                setTimeout(function() {
                    this.sautMural = true;
                }, 500);
                
                this.setVelocityY(-window.dataPlayer.speedUp);
                this.setVelocityX(window.dataPlayer.speed);
            }
        }
        
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
        if (!isDodging) {
            // fin + mort
        }

        

    }


}