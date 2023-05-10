/**
 * Tuto_01.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Tuto_01
 * 
 * 
 * A FAIRE DANS LA SCENE :
*/

import Player from '../ENTITES/Player.js';

export default class Tuto_01 extends Phaser.Scene {

    constructor() {
        super({key : "Tuto_01"});
    }



    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        // Chargement des sprites de la protagoniste
        //this.load.spritesheet('keiko_idle', 'ASSETS/keiko_idle.png', {frameWidth: 32, frameHeight: 64});

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // ----- AFFICHAGE DE LA SCENE -----


        // ----- PROPRIETES DU JEU -----

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();



        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'keiko_idle');


        // ----- AFFICHAGE DES ENNEMIES -----


        // ----- AFFICHAGE DE L'UI -----


        // ----- CAMERA -----
        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 1280, 1280);
        this.cameras.main.setBounds(0, 0, 1280, 1280);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);


    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION UPDATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    update() {

        this.player.updatePlayer();
    }


}