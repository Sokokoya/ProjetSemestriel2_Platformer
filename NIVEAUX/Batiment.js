/**
 * Batiment.js --- Solenn Cattin 
 * VERSION BETA
 * 
 * Fichier comportant la classe Batiment, troisième niveau du jeu
 * 
*/

import Player from '../ENTITES/Player.js';
import Ennemi from '../ENTITES/Ennemi.js';

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

        this.add.image(448, 224, "background").setScrollFactor(0);

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

        // Création des animations
        this.anims.create({
            key: 'keiko_idle',
            frames: this.anims.generateFrameNumbers('spr_keiko', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'keiko_walk',
            frames: this.anims.generateFrameNumbers('spr_keiko', { start: 4, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'keiko_jump',
            frames: this.anims.generateFrameNumbers('spr_keiko', { start: 8, end: 11 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'keiko_death',
            frames: this.anims.generateFrameNumbers('spr_keiko', { start: 12, end: 13 }),
            frameRate: 7
        });


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

        this.anims.create({
            key: 'ennemi3_idle',
            frames: this.anims.generateFrameNumbers("ennemi3", { start: 0, end: 3 }),
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

        gameMap.getObjectLayer('ennemi3').objects.forEach((objet) => {
            this.typeEnnemi = 2;
        
            const ennemi = new Ennemi(this, objet.x, objet.y, "ennemi3");
            this.enemies.add(ennemi);
            this.physics.add.collider(this.enemies, collisions);
        
            ennemi.anims.play("ennemi3_idle", true);
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