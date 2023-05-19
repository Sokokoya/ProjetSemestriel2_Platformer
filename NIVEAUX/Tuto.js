/**
 * Tuto.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant la scène Tuto
 * 
 * 
 * A FAIRE DANS LA SCENE :
*/

import Player from '../ENTITES/Player.js';
import Ennemi from '../ENTITES/Ennemi.js';

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

        // Mise en place du checkpoint au début du niveau
        window.dataPlayer.checkpoint = "Tuto";
        window.dataPlayer.checkpointX = this.posX;
        window.dataPlayer.checkpointY = this.posY;


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


        // Ajout des collisions avec les calques
        collisions.setCollisionByExclusion(-1, true);


        // Ajout des hitbox nécéssaires
        this.hitbox_sortie = this.physics.add.sprite(1376, 416, 'hitbox');
        this.physics.add.collider(this.hitbox_sortie, collisions);

        


        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'keiko_idle');
        this.hitbox_player = this.physics.add.sprite(window.dataPlayer.x, window.dataPlayer.y, 'hitbox_player');
        this.hitbox_player.body.setGravity(0);


        // Ajout des collisions entre le personnage et les murs / objets / sorties
        this.physics.add.collider(this.player, collisions);

        this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
            this.scene.start("Telephone", {
                x: 48,
                y: 448
            });
        }, null, this);




        // ----- AFFICHAGE DES ENNEMIES -----

        this.groupKicks = this.physics.add.group();
        this.enemies = this.physics.add.group();

        let posEnnemis = [
            {x: 480, y: 288},
            {x: 672, y: 416},
            {x: 928, y: 384}
        ];

        for (let i=0; i<3; i++) {
            let x = posEnnemis[i].x;
            let y = posEnnemis[i].y;

            let ennemi = new Ennemi(this, x, y, "ennemi1", "esquive", this.enemies);
            this.enemies.add(ennemi);
            ennemi.body.setImmovable(true);
            
        }
        this.physics.add.collider (this.enemies, collisions);


        this.physics.add.collider(this.groupKicks, this.enemies, (kick, ennemi) => {
            ennemi.gettingHit(this.player);
            kick.destroy();
        }, null, this);


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

        this.enemies.getChildren().forEach(ennemi => {

            ennemi.updateEnnemi();

            if (ennemi.hasBeenHit) {
                ennemi.destroy();
            }
        });

        this.groupKicks.getChildren().forEach(kick => {
            this.enemies.getChildren().forEach(ennemi => {
                this.physics.add.overlap(kick, ennemi, () => {
                    ennemi.gettingHit(this.player);
                    ennemi.destroy();
                    kick.destroy();
                }, null, this);
            });
        });

        this.physics.add.overlap(this.groupKicks, this.enemies, (kick, ennemi) => {
            ennemi.gettingHit(this.player);
            kick.destroy();
        }, null, this);

        this.hitbox_player.setPosition(window.dataPlayer.x, window.dataPlayer.y);
    }


}