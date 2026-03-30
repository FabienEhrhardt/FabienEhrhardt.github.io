// =====================
// PARAMÈTRES
// =====================

// Batterie
let U = 48; // V (classique en secours)
let C = (Math.floor(Math.random()*5)+80); // 80 à 120 Ah

// Installation
let P1 = (Math.floor(Math.random()*3)+200); // éclairage (200 à 400 W)
let P2 = (Math.floor(Math.random()*5)+500); // serveurs (500 à 900 W)
let P3 = (Math.floor(Math.random()*3)+100); // ventilation (100 à 300 W)

// Durée souhaitée
let t = (Math.floor(Math.random()*3)+1); // 1 à 3 h

// Rendement onduleur
let eta = (Math.floor(Math.random()*10)+85)/100;

// =====================
// CALCULS
// =====================

// Puissance totale
let Ptot = P1 + P2 + P3;

// Énergie dispo batterie
let Ebat = U * C;

// Énergie utile
let Eutile = Ebat * eta;

// Énergie demandée
let Edem = Ptot * t;

// Courant
let I = Ptot / U;

// Autonomie réelle
let treel = Eutile / Ptot;

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo8";

let exo={

titre:"Dimensionnement d’une batterie de secours",

enonce:`Une installation critique doit être alimentée en cas de coupure secteur.
Elle comprend : <br>
- éclairage : \\(P_1=\\)${P1} W <br>
- serveurs : \\(P_2=\\)${P2} W <br>
- ventilation : \\(P_3=\\)${P3} W <br>

La batterie est de \\(U=\\)${U} V et \\(Q=\\)${C} Ah.
Le rendement de l’onduleur est \\(\\eta=\\)${eta*100} %.
On souhaite une autonomie de \\(\\Delta t=\\)${t} heure(s).`,

questions:[

// =====================
{
texte:"Calculer la puissance totale consommée",
reponse:Ptot,
unite:"W",
feedback:`\\(P=P_1+P_2+P_3=${arrondi(Ptot)}\\;W\\)`
},

// =====================
{
texte:"Calculer le courant fourni par la batterie",
reponse:I,
unite:"A",
feedback:`\\(I=\\frac{P}{U}=${arrondi(I)}\\;A\\)`
},

// =====================
{
texte:"Calculer l’énergie disponible dans la batterie",
reponse:Ebat,
unite:"Wh",
feedback:`\\(E=U \\times Q=${arrondi(Ebat)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer l’énergie réellement utilisable",
reponse:Eutile,
unite:"Wh",
feedback:`\\(E_{utile}=\\eta \\times E=${arrondi(Eutile)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer l’énergie nécessaire pour assurer le secours",
reponse:Edem,
unite:"Wh",
feedback:`\\(E=P \\times \\Delta t=${arrondi(Edem)}\\;Wh\\)`
},

// =====================
{
texte:"La batterie est-elle suffisante ? (1=oui, 0=non)",
reponse:(Eutile>=Edem)?1:0,
unite:"",
feedback:`Si \\(E_{utile}>E\\), la batterie est suffisante, sinon il faut changer les batteries\\)`
},

// =====================
{
texte:"Calculer l’autonomie réelle du système",
reponse:treel,
unite:"h",
feedback:`\\(\\Delta t=\\frac{E_{utile}}{P}=${arrondi(treel)}\\;h\\)`
},

// =====================
{
texte:"Pourquoi utilise-t-on un onduleur ? (1=stabiliser tension AC, 2=augmenter capacité, 3=réduire courant)",
reponse:1,
unite:"",
feedback:`Il permet de fournir une tension alternative stable`
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