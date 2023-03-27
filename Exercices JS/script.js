/*/ ################### Exercices Boucles ###################### /*/ 

// Exercice 1 //

// var prenom;
// var prenoms = "";
// var nbprenoms = 0;

// while (prenom != "") {
//     prenom = prompt("Saisir prénom :");

//     if (prenom != "") {
//         prenoms += prenom + "\n";
//         nbprenoms++;
//     }
// }

// console.log(prenoms);
// console.log(nbprenoms); 

/*// Exercice 2 //

 var n = prompt("Entrez un nombre :");


 for ( let i = 0; i < n; i++) {
     console.log(i); 
 }
*/

// Exercice 3 //

// var n = prompt("Saisir un nombre :");
// var somme = 0;

// for (let i = 0; i < n; i++) {
//     somme += parseInt(i);
// }

// console.log(somme);

/*// Exercice 4 //

// var nb1 = prompt("Saisir nombre 1 :");
// var nb2 = prompt("Saisir nombre 2 :");
// var somme = 0;

// for (let i = nb1; i < nb2; i++) {
//     somme += parseInt(i);
// }

// console.log(somme);*/

// Exercice 5 //

// var nb;
// var somme = 0;
// var totalNb = 0;
// var moy = 0;

// while (nb != 0) {
//     nb = prompt("Saisir un nombre :");
    
//     if (nb != 0) {
//         somme += parseInt(nb);
//         totalNb++;
//     }
// }

// var moy = somme / totalNb;

// console.log(somme);
// console.log(moy);

/*// Exercice 6 //

 var nb;
 var somme = 0;
 var totalNb = 0;
 var moy = 0;
 var min = 0;
 var max = 0;

 while (nb != 0) {
     nb = prompt("Saisir un nombre :");
    
     if (nb != 0) {
         somme += parseInt(nb);
         totalNb++;
     }

     if (max < nb) {
        max = parseInt(nb);
     }

     if (min > nb) {
        min = parseInt(nb);
     }
 }

 var moy = somme / totalNb;

console.log(max);
console.log(min);*/

// Exercice 7 //

//  var n = prompt("Saisir un nombre n :");
//  var x = prompt("Saisir un nombre x :");
//  var produit;

//  for (let i = 1; i <= n; i++) {
//     produit = i * x;
//     console.log(produit); 
// }

/*// Exercice 8 //

var myVar = prompt("Saisir un mot :");
var nbVoyelle = 0;
const voyelle = ["a", "e", "i", "o", "u", "y"];

for (let i = 0; i < myVar.length; i++) {

    
    if (voyelle.indexOf(myVar.substr(i,1)) !== -1)
     {
        nbVoyelle++;
    }
}

console.log(nbVoyelle);*/

// Exercice 9 //

// var age = "";
// var jeune = 0;
// var vieux = 0; 
// var moyen = 0;

// while (age < 100) {
//     age = prompt("Entrez votre age :");

//     if (age < 20) {
//         jeune++;
//     }

//     if (age > 40) {
//         vieux++;
//     }

//     if (age >= 20 && age <= 40) {
//         moyen++;
//     }
// }

// console.log(jeune);
// console.log(moyen);
// console.log(vieux);

/* Exercice 10 

var nb = prompt("Saisir un nombre entier :");

for (let i = 2; i <= parseInt(nb)-1; i++) {

    if (nb <= 1) {
        alert("Le nombre n'est pas premier");
    }

    if (nb % i == 0) {
        alert("Le nombre n'est pas premier");
    }

    else {
        alert("Le nombre est premier");
    }

}*/

// Exercice 11 //

// var magic = parseInt(Math.random()*100); 
// var nb = prompt("Saisir un nombre ");

// while (parseInt(nb) !== magic) {

// if (parseInt(nb) < magic) {
//     alert("Plus grand !");
//     nb = prompt("Saisir un nombre");
// }

// if (parseInt(nb) > magic) {
//     alert("Plus petit");
//     nb = prompt("Saisir un nombre");
// }

// }

// alert("Vous avez gagnez !");
// console.log(magic);
// confirm("Voulez-vous rejouer ?");

/* #################### Exercices Fonctions ##################### */

// Exercice 1 //

// function produit(x, y) {
//     return x + " x " + y + " = " + x * y;
// }

// console.log(produit(3, 5));

/* Exercice 2 

function tableMulti(n) {

var resultat = "";

for (let i = 1; i <= 10; i++) {
    var produit = i * n;
    resultat += i + "x" + n + "=" + produit + "\n";
}

return resultat;

}

console.log(tableMulti(7)); */

// Exercice 3 //

// function compteur(phrase, lettre) {
//     var phrase;
//     var lettre;
//     var count = 0;


//    for (let i = 0; i < phrase.length; i++) {
//     if (phrase[i] == lettre) {
//         count++;
//     }
// }

//    return count;
   
// }
// console.log(compteur("test", "t"));





/* ######################### Exercices Tableaux ########################## */ 

// Exercice 1 //

// var saisi = "";
// var tableauLength = parseInt(prompt("Saisir longueur tableau :"));
// var table = [];

// for (let i = 0; i < tableauLength; i++) {
//     saisi = prompt("Saisir valeur :");
//     table.push(saisi);
// }

// console.log(table);

/* Exercice 2 */

function GetInteger(int) {
    int = parseInt(prompt("Saisir valeur :"));
}

function InitTab(tabLength) {
    var tab = [];
    tabLength = prompt("Saisir longueur tableau :");    
}

function SaisieTab(saisie) {
     saisie = "";

     for (let i = 0; i < tab.length; i++) {
             saisie = prompt("Saisir valeur :");
             tab.push(saisi);
     }

}

function AfficheTab() {
    return console.log(tab);
}

function RechercheTab(rang) {
    rang = prompt("Saisir rang :");


}