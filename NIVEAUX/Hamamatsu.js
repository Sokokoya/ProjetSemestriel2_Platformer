/**
 * Hamamatsu.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Hamamatsu, quatrième et dernier niveau du jeu
 * 
 * 
 * A FAIRE DANS LA SCENE :
*/

import Player from '../ENTITES/Player.js';

export default class Hamamatsu extends Phaser.Scene {

    constructor() {
        super({key : "Hamamatsu"});
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

        this.load.image('tileset', '../ASSETS/MAPS/tileset_placeholder.png');
        this.load.tilemapTiledJSON('map_niveau4', '../ASSETS/MAPS/niveau4_placeholder.json');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        window.dataPlayer.hamamatsuDone = true;

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_niveau4');

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
        this.hitbox_sortie = this.physics.add.sprite(96, 1040, 'hitbox');
        this.physics.add.collider(this.hitbox_sortie, collisions);



        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'keiko_idle');


        // Ajout des collisions entre le personnage et les murs / objets / sorties
        this.physics.add.collider(this.player, collisions);

        this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
            this.scene.start("Telephone", {
                x: 48,
                y: 448
            });
        }, null, this);


        // ----- AFFICHAGE DES ENNEMIES -----


        // ----- AFFICHAGE DE L'UI -----


        // ----- CAMERA -----
        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 7680, 1280);
        this.cameras.main.setBounds(0, 0, 7680, 1280);
        
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