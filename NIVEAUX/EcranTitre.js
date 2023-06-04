/**
 * EcranTitre.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe EcranTitre, affichant l'écran titre du jeu, et passant au premier niveau 
 * une fois que la touche espace est appuyée.
 * 
 * 
 * A FAIRE DANS LA SCENE :
 *  - Demander au joueur s'il veut faire le tuto, si oui, on va a la scene tuto, sinon on va direct au premier niveau
 *  - Bouton options (pour le son, les effets speciaux etc)
*/

export default class EcranTitre extends Phaser.Scene {

    constructor() {
        super({key : "EcranTitre"});
    }



    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        // Chargement de l'image du menu
        this.load.image('image_menu', '../ASSETS/ecran_menu.png');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();

        // Ajout de l'image du menu à l'écran
        this.add.image(448, 224, "image_menu");

    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION UPDATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    update() {

        // Changement vers la premiere scene dès que le joueur appuie sur espace
        if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
            
            this.scene.start("Tuto", {
                x: 48,
                y: 448
            });
        }
    }


}