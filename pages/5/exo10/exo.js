// =====================
// PARAMÈTRES
// =====================

// Carburant (gazole simplifié)
let PCI = (Math.floor(Math.random()*3)+42)*10; // 420 à 440 MJ/kg

// Masse consommée
let m = (Math.floor(Math.random()*50)+10)/10; // 1 à 6 kg

// Rendement moteur
let eta = (Math.floor(Math.random()*20)+30)/100; // 0.3 à 0.5
let eta2 = (Math.floor(Math.random()*20)+30)/100; // 0.3 à 0.5

// Masse molaire simplifiée
let M_C = 12; // g/mol
let M_H = 1;  // g/mol
let M_O = 16; // g/mol

// Formule gazole simplifiée : C12H26
let n_C = 12;
let n_H = 26;

// Masse de CO2 produite par kg de gazole brûlé
let mCO2=(n_C*M_C + n_H*M_H/2)*(M_C+2*M_O)/(n_C*M_C+n_H*M_H);
let masse_CO2 = m * (n_C*M_C + n_H*M_H/2)*(M_C+2*M_O)/(n_C*M_C+n_H*M_H); // simplification

// Énergie thermique produite
let Eth = PCI * m * 1e6; // J
let Eelec = Eth * eta;
let Eelec2 = Eth * eta2;

// Batterie équivalente
let Ebatterie = (Math.floor(Math.random()*5)+400)*1000; // 400 à 800 Wh
let Ebatterie_J = Ebatterie * 3600;

// Masse d’air théorique pour combustion complète (rapport stœchiométrique simplifié)
let m_air = m * 15; // kg d’air pour 1 kg de gazole (approximation)

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo10";

let exo={

titre:"Étude pratique de la combustion d’un carburant",

enonce:`Un moteur utilise du gazole comme combustible.
Le pouvoir calorifique inférieur (PCI) est de \\(PCI=\\)${PCI} MJ/kg.
On brûle une masse de \\(m=\\)${m} kg de gazole.
Le rendement de conversion en énergie électrique est de \\(\\eta=\\)${eta*100} %.
Le moteur est alimenté en air nécessaire à la combustion.`,

questions:[

// =====================
{
texte:"Calculer l’énergie thermique libérée par la combustion",
reponse:Eth,
unite:"J",
feedback:`\\(E_{th}=m \\times PCI=${arrondi(Eth)}\\;J\\)`},

// =====================
{
texte:"Calculer l’énergie électrique produite par le moteur",
reponse:Eelec,
unite:"J",
feedback:`\\(E_{elec}=\\eta \\times E_{th}=${arrondi(Eelec)}\\;J\\)`},

// =====================
{
texte:"Exprimer cette énergie en Wh",
reponse:Eelec/3600,
unite:"Wh",
feedback:`\\(E=${arrondi(Eelec/3600)}\\;Wh\\)<br>Rappel : 1 Wh = 3600 J.`},

// =====================
{
texte:`Comparer avec une batterie de ${Ebatterie} Wh : laquelle stocke le plus d’énergie ? (1=combustion, 2=batterie)`,
reponse:(Eelec/3600 > Ebatterie)?1:2,
unite:"",
feedback:`Comparer les deux énergies : \\(E_{elec}\\) pour la combustion et \\(E_{bat}\\) pour la batterie.`},

// =====================
{
texte:`Calculer le rendement si on mesure ${arrondi(Eelec2/3600)} Wh produits`,
reponse:eta2*100,
unite:"%",
feedback:`\\(\\eta=\\frac{E_{elec}}{E_{th}}=${eta2*100}\\%\\)`},

// =====================
{
texte:`Données : 1kg de gazole produit ${arrondi(mCO2)} kg de CO₂. Calculer la masse de CO₂ produite lors de la combustion`,
reponse:arrondi(masse_CO2,2),
unite:"kg",
feedback:`Masse de CO₂ calculée à l'aide d'un produit en croix : ${arrondi(masse_CO2,2)} kg`},

// =====================
{
texte:`Données : 1kg de gazole nécessite 15 kg d'air. Calculer la masse d’air théorique nécessaire pour brûler ${m} kg de gazole`,
reponse:arrondi(m_air,1),
unite:"kg",
feedback:`Masse d'air approximative pour combustion complète : ${arrondi(m_air,1)} kg`},

// =====================
{
type:"texte",
texte:"Citer deux dangers liés à la combustion dans un moteur",
reponse:["incendie","explosion","CO","intoxication"],
feedback:"Exemples : incendie, explosion, intoxication au CO."},

{
type:"texte",
texte:"Citer les éléments du triangle du feu",
reponse:["combustible","comburant","energie d'activation"],
feedback:`Combustible : matière consommée lors de la combustion.<br>
Comburant : substance permettant la combustion (ex : dioxygène).<br>
Énergie d'activation : étincelle ou chaleur initiale.`}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};