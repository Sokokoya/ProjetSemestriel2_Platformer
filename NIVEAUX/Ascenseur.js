/**
 * Ascenseur.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Ascenseur, utile pour le niveau 3
 * 
 * 
 * A FAIRE DANS LA SCENE :
*/

import Player from '../ENTITES/Player.js';

export default class Ascenseur extends Phaser.Scene {

    constructor() {
        super({key : "Ascenseur"});
    }

    init(data) {
        this.posX = data.x;
        this.posY = data.y;
    }



    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        // Chargement des sprites de la protagoniste
        this.load.spritesheet('keiko_idle', '../ASSETS/keiko_idle.png', {frameWidth: 32, frameHeight: 64});

        // Chargement des autres sprites
        this.load.spritesheet('hitbox', '../ASSETS/hitbox.png', {frameWidth: 64, frameHeight: 96});

        this.load.image('tileset', '../ASSETS/MAPS/tileset_placeholder.png');
        this.load.tilemapTiledJSON('map_ascenseur', '../ASSETS/MAPS/ascenseur_placeholder.json');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_ascenseur');

        const gameTileset = gameMap.addTilesetImage(
            "tileset",
            "tileset"
        );

        const fond = gameMap.createLayer(
            "fond",
            gameTileset
        );

        const collisions = gameMap.createLayer(
            "collisions",
            gameTileset
        );




        // ----- PROPRIETES DU JEU -----

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();

        //touches personnalisées


        // Ajout des collisions avec les calques
        collisions.setCollisionByExclusion(-1, true);

        // Ajout des hitbox nécéssaires
        this.hitbox_sortie = this.physics.add.sprite(64, 80, 'hitbox');
        this.physics.add.collider(this.hitbox_sortie, collisions);




        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'keiko_idle');
        this.player.visible = false;


        // Ajout des collisions entre le personnage et les murs / objets / sorties
        this.physics.add.collider(this.player, collisions);


        if (window.ascenseur.toAscenseur1) {

            //#TODO: rajouter demander si le joueur veut faire le tuto ou pas
            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Batiment", {
                    x: 992,
                    y: 1200
                });
            }, null, this);


        } else if (window.ascenseur.toAscenseur2) {
            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Batiment", {
                    x: 512,
                    y: 464
                });
            }, null, this);


        } else if (window.ascenseur.toAscenseur3) {
            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Batiment", {
                    x: 1024,
                    y: 848
                });
            }, null, this);


        } else if (window.ascenseur.toAscenseur4) {
            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Batiment", {
                    x: 1856,
                    y: 720
                });
            }, null, this);


        } else if (window.ascenseur.toAscenseur5) {
            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Batiment", {
                    x: 2528,
                    y: 1200
                });
            }, null, this);


        } else if (window.ascenseur.toAscenseur6) {
            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Batiment", {
                    x: 3520,
                    y: 1200
                });
            }, null, this);
        }
        





        // ----- CAMERA -----
        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 480, 480);
        this.cameras.main.setBounds(0, 0, 480, 480);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom = 1.4;


    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION UPDATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    update() {

        this.player.updatePlayer();
    }


}