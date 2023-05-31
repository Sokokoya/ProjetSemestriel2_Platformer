/**
 * Shizuoka.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Shizuoka, premier niveau du jeu
 * 
 * 
 * A FAIRE DANS LA SCENE :
*/

import Player from '../ENTITES/Player.js';

export default class Shizuoka extends Phaser.Scene {

    constructor() {
        super({key : "Shizuoka"});
    }

    init(data) {
        this.posX = data.x;
        this.posY = data.y;
    }



    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        

        this.load.image('tileset', '../ASSETS/MAPS/tileset_placeholder.png');
        this.load.tilemapTiledJSON('map_niveau1', '../ASSETS/MAPS/niveau1_placeholder.json');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        window.dataPlayer.shizuokaDone = true;

        // Mise en place du checkpoint au début du niveau
        window.dataPlayer.checkpoint = "Shizuoka";
        window.dataPlayer.checkpointX = this.posX;
        window.dataPlayer.checkpointY = this.posY;

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_niveau1');

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
        this.hitbox_sortie = this.physics.add.sprite(4416, 1040, 'hitbox');
        this.physics.add.collider(this.hitbox_sortie, collisions);



        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'spr_keiko');


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
        this.physics.world.setBounds(0, 0, 4480, 1280);
        this.cameras.main.setBounds(0, 0, 4480, 1280);
        
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