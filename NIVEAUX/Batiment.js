/**
 * Batiment.js --- Solenn Cattin 
 * VERSION BETA
 * 
 * Fichier comportant la classe Batiment, troisième niveau du jeu
 * 
*/

import Player from '../ENTITES/Player.js';

export default class Batiment extends Phaser.Scene {

    constructor() {
        super({key : "Batiment"});
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
        this.load.tilemapTiledJSON('map_niveau3', '../ASSETS/MAPS/map_niveau3.json');

        
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        window.dataPlayer.batimentDone = true;

        // Mise en place du checkpoint au début du niveau
        window.dataPlayer.checkpoint = "Batiment";
        window.dataPlayer.checkpointX = this.posX;
        window.dataPlayer.checkpointY = this.posY;
        

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_niveau3');

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

        const autre = gameMap.createLayer(
            "autre",
            gameTileset
        );

        //#TODO: changer ici en calque objet
      /*  const ennemisLayer = gameMap.createLayer(
            "ennemis",
            gameTileset
        );*/

        




        // ----- PROPRIETES DU JEU -----

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();


        // Ajout des collisions avec les calques
        collisions.setCollisionByExclusion(-1, true);

        // Ajout des hitbox nécéssaires ainsi que leurs collisions
        this.hitbox_sortie = this.physics.add.sprite(4416, 1200, 'hitbox');
        this.physics.add.collider(this.hitbox_sortie, collisions);

        this.hitbox_ascenseur1 = this.physics.add.sprite(992, 1200, 'hitbox');
        this.physics.add.collider(this.hitbox_ascenseur1, collisions);
        this.hitbox_ascenseur2 = this.physics.add.sprite(512, 464, 'hitbox');
        this.physics.add.collider(this.hitbox_ascenseur2, collisions);
        this.hitbox_ascenseur3 = this.physics.add.sprite(1024, 848, 'hitbox');
        this.physics.add.collider(this.hitbox_ascenseur3, collisions);
        this.hitbox_ascenseur4 = this.physics.add.sprite(1856, 720, 'hitbox');
        this.physics.add.collider(this.hitbox_ascenseur4, collisions);
        this.hitbox_ascenseur5 = this.physics.add.sprite(2528, 1200, 'hitbox');
        this.physics.add.collider(this.hitbox_ascenseur5, collisions);
        this.hitbox_ascenseur6 = this.physics.add.sprite(3520, 1200, 'hitbox');
        this.physics.add.collider(this.hitbox_ascenseur6, collisions);



        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'spr_keiko');


        // Ajout des collisions entre le personnage et les murs / objets / sorties
        this.physics.add.collider(this.player, collisions);

        this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
            this.scene.start("Hamamatsu", {
                x: 48,
                y: 1088
            });
        }, null, this);

        this.physics.add.overlap(this.player, this.hitbox_ascenseur1, function() {
            
            if (this.clavier.up.isDown) {
                console.log("toAscenseur2" + window.ascenseur.toAscenseur2);

                window.ascenseur.toAscenseur1 = false;
                window.ascenseur.toAscenseur2 = true;
                window.ascenseur.toAscenseur3 = false;
                window.ascenseur.toAscenseur4 = false;
                window.ascenseur.toAscenseur5 = false;
                window.ascenseur.toAscenseur6 = false;
                console.log("toAscenseur2" + window.ascenseur.toAscenseur2);

                this.scene.start("Ascenseur", {
                    x: 80,
                    y: 32
                });
            }
        }, null, this);

        this.physics.add.overlap(this.player, this.hitbox_ascenseur2, function() {
            if (this.clavier.up.isDown) {
                console.log("overlap ascenseur");

                window.ascenseur.toAscenseur1 = true;
                window.ascenseur.toAscenseur2 = false;
                window.ascenseur.toAscenseur3 = false;
                window.ascenseur.toAscenseur4 = false;
                window.ascenseur.toAscenseur5 = false;
                window.ascenseur.toAscenseur6 = false;

                this.scene.start("Ascenseur", {
                    x: 80,
                    y: 32
                });
            }
        }, null, this);

        this.physics.add.overlap(this.player, this.hitbox_ascenseur3, function() {
            if (this.clavier.up.isDown) {
                console.log("overlap ascenseur");

                window.ascenseur.toAscenseur1 = false;
                window.ascenseur.toAscenseur2 = false;
                window.ascenseur.toAscenseur3 = false;
                window.ascenseur.toAscenseur4 = true;
                window.ascenseur.toAscenseur5 = false;
                window.ascenseur.toAscenseur6 = false;

                this.scene.start("Ascenseur", {
                    x: 80,
                    y: 32
                });
            }
        }, null, this);

        this.physics.add.overlap(this.player, this.hitbox_ascenseur4, function() {
            if (this.clavier.up.isDown) {
                console.log("overlap ascenseur");

                window.ascenseur.toAscenseur1 = false;
                window.ascenseur.toAscenseur2 = false;
                window.ascenseur.toAscenseur3 = true;
                window.ascenseur.toAscenseur4 = false;
                window.ascenseur.toAscenseur5 = false;
                window.ascenseur.toAscenseur6 = false;

                this.scene.start("Ascenseur", {
                    x: 80,
                    y: 32
                });
            }
        }, null, this);

        this.physics.add.overlap(this.player, this.hitbox_ascenseur5, function() {
            if (this.clavier.up.isDown) {
                console.log("overlap ascenseur");

                window.ascenseur.toAscenseur1 = false;
                window.ascenseur.toAscenseur2 = false;
                window.ascenseur.toAscenseur3 = false;
                window.ascenseur.toAscenseur4 = false;
                window.ascenseur.toAscenseur5 = false;
                window.ascenseur.toAscenseur6 = true;

                this.scene.start("Ascenseur", {
                    x: 80,
                    y: 32
                });
            }
        }, null, this);

        this.physics.add.overlap(this.player, this.hitbox_ascenseur6, function() {
            if (this.clavier.up.isDown) {
                console.log("overlap ascenseur");

                window.ascenseur.toAscenseur1 = false;
                window.ascenseur.toAscenseur2 = false;
                window.ascenseur.toAscenseur3 = false;
                window.ascenseur.toAscenseur4 = false;
                window.ascenseur.toAscenseur5 = true;
                window.ascenseur.toAscenseur6 = false;

                this.scene.start("Ascenseur", {
                    x: 80,
                    y: 32
                });
            }
        }, null, this);


        // ----- AFFICHAGE DES ENNEMIES -----


        // ----- AFFICHAGE DE L'UI -----


        // ----- CAMERA -----
        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 4480, 1440);
        this.cameras.main.setBounds(0, 0, 4480, 1440);
        
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