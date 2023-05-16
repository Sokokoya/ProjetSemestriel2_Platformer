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

export default class Tuto extends Phaser.Scene {

    constructor() {
        super({key : "Tuto"});
    }

    init(data) {
        this.posX = data.x;
        this.posY = data.y;
    }



    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        // Chargement des sprites ennemis
        this.load.spritesheet('ennemi1', '../ASSETS/ennemi1.png', {frameWidth: 32, frameHeight: 64});

        // Chargement de la map
        this.load.image('tileset', '../ASSETS/MAPS/tileset_placeholder.png');
        this.load.tilemapTiledJSON('map_tuto', '../ASSETS/MAPS/tuto_placeholder.json');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        window.dataPlayer.tutoDone = true;

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_tuto');

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
        this.hitbox_sortie = this.physics.add.sprite(1376, 416, 'hitbox');
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
        this.physics.world.setBounds(0, 0, 1600, 640);
        this.cameras.main.setBounds(0, 0, 1600, 640);
        
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