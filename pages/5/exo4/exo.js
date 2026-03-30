// =====================
// PARAMÈTRES
// =====================

// Batterie
let Ebat = (Math.floor(Math.random()*4)+40)*1000; // 40 à 70 kWh → en Wh

// Consommation véhicule
let conso = (Math.floor(Math.random()*5)+12)*10; // 120 à 160 Wh/km

// Puissance moteur
let P = (Math.floor(Math.random()*5)+50)*1000; // 50 à 90 kW → en W

// Rendement chaîne de traction
let eta = (Math.floor(Math.random()*10)+85)/100;

// Vitesse moyenne
let v = (Math.floor(Math.random()*5)+50); // 50 à 90 km/h

// Énergie utile
let Eutile = Ebat * eta;

// Autonomie (km)
let autonomie = Eutile / conso;

// Temps de fonctionnement à pleine puissance
let t = Eutile / P; // en heures

// Temps de recharge (borne)
let Pcharge = (Math.floor(Math.random()*5)+3)*10000; // 30 à 70 kW
let tcharge = Ebat / Pcharge;

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo4";

let exo={

titre:"Autonomie et performances d’un véhicule électrique",

enonce:`Un véhicule électrique possède une batterie de ${Ebat/1000} kWh.
Sa consommation moyenne est de ${conso} Wh/km.
La puissance maximale du moteur est de ${P/1000} kW.
On considère un rendement global de ${eta}.
La recharge s’effectue sur une borne de ${Pcharge/1000} kW.`,

questions:[

// =====================
{
texte:"Calculer l’énergie réellement utilisable",
reponse:Eutile,
unite:"Wh",
feedback:`\\(E_{utile}=\\eta \\times E=${arrondi(Eutile)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer l’autonomie du véhicule en km",
reponse:autonomie,
unite:"km",
feedback:`\\(Autonomie=\\frac{E_{utile}}{conso}=${arrondi(autonomie)}\\;km\\)`
},

// =====================
{
texte:"Calculer le temps de fonctionnement à pleine puissance (en h)",
reponse:t,
unite:"h",
feedback:`\\(t=\\frac{E_{utile}}{P}=${arrondi(t)}\\;h\\)`
},

// =====================
{
texte:"Convertir ce temps en minutes",
reponse:t*60,
unite:"min",
feedback:`\\(t=${arrondi(t*60)}\\;min\\)`
},

// =====================
{
texte:"Calculer le temps de recharge complète (en h)",
reponse:tcharge,
unite:"h",
feedback:`\\(t=\\frac{E_{bat}}{P_{charge}}=${arrondi(tcharge)}\\;h\\)`
},

// =====================
{
texte:`Si la consommation passe à ${conso+20} Wh/km, que devient l’autonomie ? (en km)`,
reponse:Eutile/(conso+20),
unite:"km",
feedback:`\\(Autonomie=\\frac{E_{utile}}{conso}=${arrondi(Eutile/(conso+20))}\\;km\\)`
},

// =====================
{
texte:"Pourquoi l’autonomie diminue-t-elle à grande vitesse ? (1=augmentation des pertes, 2=augmentation de la capacité batterie, 3=meilleur rendement)",
reponse:1,
unite:"",
feedback:`Les pertes (aérodynamiques notamment) augmentent avec la vitesse`
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