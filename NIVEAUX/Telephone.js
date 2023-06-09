/**
 * Telephone.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la classe Telephone, apparaissant entre chaque niveau
 * 
 * 
 * A FAIRE DANS LA SCENE :
*/

import Player from '../ENTITES/Player.js';

export default class Telephone extends Phaser.Scene {

    constructor() {
        super({key : "Telephone"});
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
        this.load.spritesheet('spr_keiko', '../ASSETS/spr_keiko.png', {frameWidth: 32, frameHeight: 64});

        // Chargement des autres sprites
        this.load.spritesheet('hitbox', '../ASSETS/hitbox.png', {frameWidth: 64, frameHeight: 96});
        this.load.spritesheet('hitbox_player', '../ASSETS/hitbox_player.png', {frameWidth: 96, frameHeight: 96});

        this.load.image('tileset_p', '../ASSETS/MAPS/tileset_placeholder.png');
        this.load.tilemapTiledJSON('map_telephone', '../ASSETS/MAPS/telephone_placeholder.json');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_telephone');

        const gameTileset = gameMap.addTilesetImage(
            "tileset",
            "tileset_p"
        );

        const fond = gameMap.createLayer(
            "fond",
            gameTileset
        );

        const objets = gameMap.createLayer(
            "objets",
            gameTileset
        );

        const collisions = gameMap.createLayer(
            "collisions",
            gameTileset
        );




        // ----- PROPRIETES DU JEU -----

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();


        // Ajout des collisions avec les calques
        collisions.setCollisionByExclusion(-1, true);
        

        // Ajout des hitbox nécéssaires
        this.hitbox_sortie = this.physics.add.sprite(800, 416, 'hitbox');
        this.physics.add.collider(this.hitbox_sortie, collisions);

        this.hitbox_telephone = this.physics.add.sprite(480,400, 'hitbox')
        this.physics.add.collider(this.hitbox_telephone, collisions);



        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'spr_keiko');


        // Ajout des collisions entre le personnage et les murs / objets / sorties
        this.physics.add.collider(this.player, collisions);

        

        if (!window.dataPlayer.tutoDone) {

            this.physics.add.overlap(this.player, this.hitbox_telephone, function() {
                console.log("go tuto");
            }, null, this);

            //#TODO: rajouter demander si le joueur veut faire le tuto ou pas
            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Tuto", {
                    x: 48,
                    y: 448
                });
            }, null, this);


        } else if (!window.dataPlayer.shizuokaDone) {

            this.physics.add.overlap(this.player, this.hitbox_telephone, function() {
                console.log("go shizuoka");
            }, null, this);

            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Shizuoka", {
                    x: 48,
                    y: 800
                });
            }, null, this);


        } else if (!window.dataPlayer.chantierDone) {

            this.physics.add.overlap(this.player, this.hitbox_telephone, function() {
                console.log("go chantier");
            }, null, this);

            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Chantier", {
                    x: 48,
                    y: 1088
                });
            }, null, this);


        } else if (!window.dataPlayer.batimentDone) {

            this.physics.add.overlap(this.player, this.hitbox_telephone, function() {
                console.log("go batiment abandonne");
            }, null, this);

            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Batiment", {
                    x: 48,
                    y: 1216
                });
            }, null, this);


        } else if (!window.dataPlayer.hamamatsuDone) {

            this.physics.add.overlap(this.player, this.hitbox_telephone, function() {
                console.log("go hamamatsu");
            }, null, this);

            this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
                this.scene.start("Hamamatsu", {
                    x: 48,
                    y: 1088
                });
            }, null, this);


        } else {

            this.physics.add.overlap(this.player, this.hitbox_telephone, function() {
                console.log("fin du jeu");
            }, null, this);
        }
        



        // ----- AFFICHAGE DE L'UI -----


        // ----- CAMERA -----
        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 960, 640);
        this.cameras.main.setBounds(0, 0, 960, 640);
        
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