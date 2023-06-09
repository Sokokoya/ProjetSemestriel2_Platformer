/**
 * Shizuoka.js --- Solenn Cattin 
 * VERSION BETA
 * 
 * Fichier comportant la classe Shizuoka, premier niveau du jeu
 * 
*/

import Ennemi from '../ENTITES/Ennemi.js';
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

        

        this.load.image('tileset', '../ASSETS/tileset.png');
        this.load.tilemapTiledJSON('map_niveau1', '../ASSETS/MAPS/map_niveau1.json');

        
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

        this.add.image(448, 224, "background").setScrollFactor(0);

        // Chargement des calques
        const gameMap = this.add.tilemap('map_niveau1');

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

        const plan1 = gameMap.createLayer(
            "plan_1",
            gameTileset
        );
        plan1.setDepth(5);



        // ----- PROPRIETES DU JEU -----

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();


        // Ajout des collisions avec les calques
        collisions.setCollisionByExclusion(-1, true);


        // Ajout des hitbox nécéssaires
        this.hitbox_sortie = this.physics.add.sprite(4416, 1040, 'hitbox');
        this.physics.add.collider(this.hitbox_sortie, collisions);



        // ----- AFFICHAGE ET PROPRIETES DE LA PROTAGONISTE -----

        this.player = new Player(this, this.posX, this.posY, 'spr_keiko');
        this.player.setDepth(4);


        // Ajout des collisions entre le personnage et les murs / objets / sorties
        this.physics.add.collider(this.player, collisions);

        this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
            this.scene.start("Batiment", {
                x: 48,
                y: 1216
            });
        }, null, this);



        // ----- AFFICHAGE DES ENNEMIES -----

        // Création des animations
        this.anims.create({
            key: 'ennemi1_idle',
            frames: this.anims.generateFrameNumbers("ennemi1", { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'ennemi2_idle',
            frames: this.anims.generateFrameNumbers("ennemi2", { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        

        // Création de chaque ennemi en fonction de son skin
        this.groupKicks = this.physics.add.group();
        this.groupAttacks = this.physics.add.group();

        this.enemies = this.physics.add.group();
        this.typeEnnemi;
        
        gameMap.getObjectLayer('ennemi1').objects.forEach((objet) => {
            this.typeEnnemi = 1;
        
            const ennemi = new Ennemi(this, objet.x, objet.y, "ennemi1");
            this.enemies.add(ennemi);
            this.physics.add.collider(this.enemies, collisions);
        
            ennemi.anims.play("ennemi1_idle", true);
        });
        
        gameMap.getObjectLayer('ennemi2').objects.forEach((objet) => {
            this.typeEnnemi = 2;
        
            const ennemi = new Ennemi(this, objet.x, objet.y, "ennemi2");
            this.enemies.add(ennemi);
            this.physics.add.collider(this.enemies, collisions);
        
            ennemi.anims.play("ennemi2_idle", true);
        });


        // Ajout d'un collider entre les attaques et les ennemis
        this.physics.add.collider(this.groupKicks, this.enemies, (kick, ennemi) => {
            ennemi.gettingHit(this.player);
            kick.destroy();
        }, null, this);



        // ----- AFFICHAGE DE L'UI -----

        this.chrono = this.add.text(150, 75 , "Temps : 0", {font: "16px Arial", fill: "#ffffff"});
        this.chrono.setScrollFactor(0).setDepth(6);
        this.timer = 0;



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

        // Update constante des mouvements et des action du joueur
        this.player.updatePlayer();


        // Ennemi detruit s'il est touché
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


        // Si le joueur se fait toucher
        this.groupAttacks.getChildren().forEach(attack => {

                this.physics.add.overlap(attack, this.player, () => {
                    this.player.gettingHit();
                    attack.destroy();
                }, null, this);
        });


        // Update du chronometre en temps réel
        const delta = this.game.loop.delta;
		this.timer += delta;

		let ms = Math.floor(this.timer % 1000);
		let s = Math.floor(this.timer / 1000) % 60;
		let m = Math.floor(this.timer / (60 * 1000)) % 60;
		let h = Math.floor(this.timer / (60 * 60 * 1000)) % 99;

        let texte = `Time : ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
        this.chrono.setText(texte).setFontFamily('Arial').setFontSize(25);
    }


}