// =====================
// PARAMÈTRES
// =====================

// Carburant (gaz naturel simplifié)
let PCI = (Math.floor(Math.random()*3)+10)*10; // 100 à 120 MJ/kg

// Masse consommée
let m = (Math.floor(Math.random()*50)+2)/10; // 0.2 à 0.6 kg

// Rendement
let eta = (Math.floor(Math.random()*20)+30)/100; // 0.3 à 0.4
let eta2 = (Math.floor(Math.random()*20)+30)/100; // 0.3 à 0.4

// Énergie électrique produite (mesurée)
let Eth = PCI * m * 1e6; // J
let Eelec = Eth * eta;
let Eelec2 = Eth * eta2;

// Batterie équivalente
let Ebatterie = (Math.floor(Math.random()*5)+400)*1000; // 400 à 800 Wh
let Ebatterie_J = Ebatterie * 3600;

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo9";

let exo={

titre:"Production d’énergie électrique par combustion",

enonce:`Une centrale thermique utilise du gaz naturel comme combustible.
Le pouvoir calorifique inférieur (PCI) est de \\(PCI=\\)${PCI} MJ/kg.
On brûle une masse de \\(m=\\)${m} kg de gaz.

Le rendement de conversion en énergie électrique est de \\(\\eta=\\)${eta*100} %.`,

questions:[


// =====================
{
texte:"Calculer l’énergie thermique libérée par la combustion",
reponse:Eth,
unite:"J",
feedback:`\\(E=m \\times PCI=${arrondi(Eth)}\\;J\\)`
},

// =====================
{
texte:"Calculer l’énergie électrique produite",
reponse:Eelec,
unite:"J",
feedback:`\\(E_{elec}=\\eta \\times E=${arrondi(Eelec)}\\;J\\)`
},

// =====================
{
texte:"Exprimer cette énergie en Wh",
reponse:Eelec/3600,
unite:"Wh",
feedback:`\\(E=${arrondi(Eelec/3600)}\\;Wh\\)<br>
Rappel 1Wh=3600 J.`
},

// =====================
{
texte:`Comparer avec une batterie de ${Ebatterie} Wh : laquelle stocke le plus d’énergie ? (1=combustion, 2=batterie)`,
reponse:(Eelec/3600 > Ebatterie)?1:2,
unite:"",
feedback:`Comparer les deux énergies \\(E\\) pour la combustion et \\(E_{bat}\\)`
},

// =====================
{
texte:`Calculer le rendement si on mesure ${arrondi(Eelec2/3600)} Wh produits`,
reponse:eta2*100,
unite:"%",
feedback:`\\(\\eta=\\frac{E_{elec}}{E_{th}}=${eta2*100}%\\)`
},

// =====================
{
texte:"Pourquoi dit-on que la combustion est exothermique ? (1=elle absorbe de l’énergie, 2=elle libère de l’énergie, 3=elle conserve l’énergie)",
reponse:2,
unite:"",
feedback:`Une réaction exothermique libère de la chaleur`
},
{
type:"texte",
texte:"Citer un danger lié à la combustion",
reponse:["incendie","explosion","co","intoxication"],
feedback:"Exemples : incendie, explosion, intoxication au CO"
}

,
{
type:"texte",
texte:"Citer les éléments du triangle du feu",
reponse:["combustible","comburant","énergie d'activation"],
feedback:`Combustible : élément se consummant lors d'une combustion. <br>
Comburant : substance chimique qui a pour propriété de permettre la combustion d'un combustible (ex: dioxygène)<br>
Energie d'activation :  l'étincelle ou la chaleur initiale.`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};