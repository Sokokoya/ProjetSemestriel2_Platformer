/**
 * data.js --- Solenn Cattin 
 * VERSION ALPHA
 * 
 * Fichier comportant toutes les valeurs utilisées au long du projet. Celles-ci
 * sont récupérables depuis nimporte quel autre fichier et peuvent être modifiées.
 * 
*/


// Ensemble de variables relatives au joueur
var dataPlayer = {

    // Position du joueur en tout temps donné
    x : 0,
    y : 0,

    // Vitesse du joueur
    speed : 250,
    speedUp : 375,

    // Booléens vérifiant si les niveaux ont été faits ou non
    tutoDone : false,
    shizuokaDone : false,
    chantierDone : false,
    batimentDone : false,
    hamamatsuDone : false,

    // Booléens vérifiant l'état du personnage jouable
    isDodging : false,
    sautMural : true,
    toucheBloquee : false,

    // Variables utiles aux checkpoints
    checkpoint : "",
    checkpointX : 0,
    checkpointY : 0
}


// Ensemble de variables relatives aux ascenseurs
var ascenseur = {

    toAscenseur1 : false,
    toAscenseur2 : false,
    toAscenseur3 : false,
    toAscenseur4 : false,
    toAscenseur5 : false,
    toAscenseur6 : false
}