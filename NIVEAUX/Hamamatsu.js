/**
 * Hamamatsu.js --- Solenn Cattin 
 * VERSION BETA
 * 
 * Fichier comportant la classe Hamamatsu, quatrième et dernier niveau du jeu
 * 
 * 
*/

import Player from '../ENTITES/Player.js';
import Ennemi from '../ENTITES/Ennemi.js';

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
        plan1.setDepth(5);

        




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
        this.player.setDepth(4);


        // Ajout des collisions entre le personnage et les murs / objets / sorties
        this.physics.add.collider(this.player, collisions);

        this.physics.add.overlap(this.player, this.hitbox_sortie, function() {
            this.scene.start("Telephone", {
                x: 48,
                y: 448
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

        this.anims.create({
            key: 'ennemi3_idle',
            frames: this.anims.generateFrameNumbers("ennemi3", { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'ennemi4_idle',
            frames: this.anims.generateFrameNumbers("ennemi4", { start: 0, end: 3 }),
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

        gameMap.getObjectLayer('ennemi4').objects.forEach((objet) => {
            this.typeEnnemi = 2;
        
            const ennemi = new Ennemi(this, objet.x, objet.y, "ennemi4");
            this.enemies.add(ennemi);
            this.physics.add.collider(this.enemies, collisions);
        
            ennemi.anims.play("ennemi4_idle", true);
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