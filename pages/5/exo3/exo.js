// =====================
// PARAMÈTRES
// =====================

// Batterie
let U = (Math.floor(Math.random()*4)+12); // 12 à 15 V
let C = (Math.floor(Math.random()*5)+8)*10; // 80 à 120 Ah

// Récepteur
let P = (Math.floor(Math.random()*5)+5)*20; // 100 à 180 W

// Profondeur de décharge (DoD)
let DoD = (Math.floor(Math.random()*30)+50)/100; // 0.5 à 0.7

// Rendement
let eta = (Math.floor(Math.random()*18)+80)/100;;

// Énergie totale
let E = U * C;

// Énergie réellement utilisable
let Eutile = E * DoD * eta;

// Courant
let I = P / U;

// Autonomie
let t = Eutile / P;

// Capacité utile
let Cutile = C * DoD;

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo3";

let exo={

titre:"Autonomie réelle d’une batterie avec profondeur de décharge",

enonce:`Une batterie de ${U} V et ${C} Ah alimente un appareil de ${P} W.
Pour préserver sa durée de vie, on limite la profondeur de décharge (DoD) à ${DoD*100}%.
Le rendement global est de ${eta+100} %.`,

questions:[

// =====================
{
texte:"Calculer l’énergie totale stockée dans la batterie",
reponse:E,
unite:"Wh",
feedback:`\\(E=U \\times C=${arrondi(E)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer la capacité réellement utilisable",
reponse:Cutile,
unite:"Ah",
feedback:`\\(C_{utile}=C \\times DoD=${arrondi(Cutile)}\\;Ah\\)`
},

// =====================
{
texte:"Calculer l’énergie réellement disponible",
reponse:Eutile,
unite:"Wh",
feedback:`\\(E_{utile}=E \\times DoD \\times \\eta=${arrondi(Eutile)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer le courant consommé par le récepteur",
reponse:I,
unite:"A",
feedback:`\\(I=\\frac{P}{U}=${arrondi(I)}\\;A\\)`
},

// =====================
{
texte:"Calculer l’autonomie réelle en heures",
reponse:t,
unite:"h",
feedback:`\\(t=\\frac{E_{utile}}{P}=${arrondi(t)}\\;h\\)`
},

// =====================
{
texte:"Quelle autonomie aurait-on sans limitation de décharge ? (en h)",
reponse:(E*eta)/P,
unite:"h",
feedback:`Sans DoD : \\(t=\\frac{E \\times \\eta}{P}=${arrondi((E*eta)/P)}\\;h\\)`
},

// =====================
{
texte:"Pourquoi limite-t-on la profondeur de décharge ? (1=augmenter la durée de vie, 2=augmenter la puissance, 3=réduire la tension)",
reponse:1,
unite:"",
feedback:`Limiter le DoD permet d’augmenter la durée de vie de la batterie`
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