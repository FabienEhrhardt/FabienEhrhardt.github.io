/// =====================
// PARAMÈTRES
// =====================

let surface = (Math.floor(Math.random()*5)+5)*10; // 50 à 90 m²
let E = (Math.floor(Math.random()*3)+3)*100; // 300 à 500 lux

let phi_total = E * surface;

// lampe
let rendement = Math.floor(Math.random()*50)+80; // 80 à 130 lm/W
let puissance = (Math.floor(Math.random()*5)+10); // 10 à 15 W

let flux_lampe = rendement * puissance;

// nombre de lampes
let nb_lampes = Math.ceil(phi_total / flux_lampe);


// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo3";
let exo={

titre:"Éclairage d’un atelier industriel",

enonce:`Un atelier de surface ${surface} m² doit être éclairé avec un éclairement de ${E} lux.<br>
On utilise des lampes LED de ${puissance} W ayant une efficacité lumineuse de ${rendement} lm/W.`,

questions:[

// =====================
{
texte:"Calculer le flux lumineux total nécessaire",
reponse:phi_total,
unite:"lm",
feedback:`\\(\\Phi = E \\times S = ${E} \\times ${surface} = ${phi_total} lm\\)`
},

// =====================
{
texte:"Calculer le flux lumineux d’une lampe",
reponse:flux_lampe,
unite:"lm",
feedback:`\\(\\Phi = P \\times \\eta = ${puissance} \\times ${rendement}=${flux_lampe}lm\\)`
},

// =====================
{
texte:"Calculer le nombre de lampes nécessaires",
reponse:nb_lampes,
unite:"",
feedback:`\\(N = \\frac{\\Phi_{total}}{\\Phi_{lampe}}\\)`
},

// =====================
{
texte:"Calculer la puissance totale installée",
reponse:nb_lampes * puissance,
unite:"W",
feedback:`\\(P_{tot} = N \\times P\\)`
},

// =====================
{
texte:"Calculer l’efficacité énergétique globale",
reponse:arrondi(phi_total / (nb_lampes * puissance)),
unite:"lm/W",
feedback:`\\(\\eta_g = \\frac{\\Phi_{total}}{P_{tot}}\\)`
},

// =====================

{
type:"texte",
texte:"Pourquoi utilise-t-on des LED plutôt que des lampes à incandescence ?",
reponse:["rendement","consommation"],
feedback:`Les LED ont un meilleur rendement et consomment moins`
},
// =====================

{
type:"texte",
texte:"Quel appareil permet de mesurer l’éclairement sur le terrain ?",
reponse:["luxmetre"],
feedback:`On utilise un luxmètre`
},

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};