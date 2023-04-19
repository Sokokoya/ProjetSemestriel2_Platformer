/**
 * game.js --- Solenn Cattin --- JV1B
 * 
 * Fichier comportant la configuration du jeu, et lançant la première scène : l'écran d'accueil
*/


// Import de toutes les scènes utilisées dans le jeu
import EcranTitre from "/NIVEAUX/EcranTitre.js";


// Configuration initiale
var config = {
    type: Phaser.AUTO,
    width: 896, height: 448,
    physics: {
        default: 'arcade',
        arcade: {
            //#TODO: changer la gravité ici pour rendre au mieux possible
            gravity: { y: 300 },
            debug: true
        }
    },

    // Ajout des differentes scenes dans le jeu
    scene: [EcranTitre],

    // Activation de la possibilité de jouer à la manette
    input: {gamepad: true}

}; 


// Début du jeu, lancé sur la scène EcranTitre
var game = new Phaser.Game(config);
game.scene.start("EcranTitre"); 