/**
 * Hamamatsu.js --- Solenn Cattin 
 * VERSION BETA
 * 
 * Fichier comportant la classe Hamamatsu, quatrième et dernier niveau du jeu
 * 
 * 
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

        this.load.image('tileset', '../ASSETS/tileset.png');
        this.load.tilemapTiledJSON('map_niveau4', '../ASSETS/MAPS/map_niveau4.json');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        window.dataPlayer.hamamatsuDone = true;

        // Mise en place du checkpoint au début du niveau
        window.dataPlayer.checkpoint = "Hamamatsu";
        window.dataPlayer.checkpointX = this.posX;
        window.dataPlayer.checkpointY = this.posY;

        // ----- AFFICHAGE DE LA SCENE -----

        this.add.image(448, 224, "background").setScrollFactor(0);

        // Chargement des calques
        const gameMap = this.add.tilemap('map_niveau4');

        const gameTileset = gameMap.addTilesetImage(
            "tileset",
            "tileset"
        );

        const plan3 = gameMap.createLayer(
            "plan_3",
            gameTileset
        );

        const collisions = gameMap.createLayer(
            "collisions",
            gameTileset
        );

        const plan2 = gameMap.createLayer(
            "plan_2",
            gameTileset
        );

        //#TODO: changer ici en calque objet
      /*  const ennemisLayer = gameMap.createLayer(
            "ennemis",
            gameTileset
        );*/

        const plan1 = gameMap.createLayer(
            "plan_1",
            gameTileset
        );

        




        // ----- PROPRIETES DU JEU -----

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();

        //touches personnalisées


        // Ajout des collisions avec les calques
        collisions.setCollisionByExclusion(-1, true);

        // Ajout des hitbox nécéssaires
        this.hitbox_sortie = this.physics.add.sprite(7016, 1040, 'hitbox');
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
        this.physics.world.setBounds(0, 0, 7680, 1280);
        this.cameras.main.setBounds(0, 0, 7680, 1280);
        
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