// =====================
// PARAMÈTRES
// =====================

// Batterie élémentaire
let Uelem = 12; // V
let Celem = (Math.floor(Math.random()*3)+8)*10; // 80 à 100 Ah

// Besoin système
let Ubesoin = (Math.floor(Math.random()*3)+2)*12; // 24, 36 ou 48 V
let P = (Math.floor(Math.random()*5)+5)*100; // 500 à 900 W
let t = (Math.floor(Math.random()*5)+3); // 3 à 7 h

// Rendement
let eta = 0.9;

// =====================
// CALCULS
// =====================

// Nombre de batteries en série
let Ns = Ubesoin / Uelem;

// Courant consommé
let I = P / Ubesoin;

// Capacité nécessaire (Ah)
let Cnecessaire = (I * t) / eta;

// Nombre de branches en parallèle
let Np = Math.ceil(Cnecessaire / Celem);

// Capacité totale
let Ctot = Np * Celem;

// Nombre total de batteries
let Ntot = Ns * Np;

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo6";

let exo={

titre:"Association de batteries pour une alimentation autonome",

enonce:`On dispose de batteries de \\(U_{bat}=\\)${Uelem} V et \\(Q_{bat}=\\)${Celem} Ah.
On souhaite alimenter un système sous \\(U=\\)${Ubesoin} V consommant \\(P=\\)${P} W pendant \\(\\Delta t\)${t} heures.
Le rendement global est de ${eta*100} %.`,

questions:[

// =====================
{
texte:"Combien de batteries faut-il en série pour obtenir la tension souhaitée ?",
reponse:Ns,
unite:"",
feedback:`\\(N_s=\\frac{U}{U_{elem}}=${Ns}\\)`
},

// =====================
{
texte:"Calculer le courant consommé par le système",
reponse:I,
unite:"A",
feedback:`\\(I=\\frac{P}{U}=${arrondi(I)}\\;A\\)`
},

// =====================
{
texte:"Calculer la capacité nécessaire",
reponse:Cnecessaire,
unite:"Ah",
feedback:`\\(Q=\\frac{I \\times t}{\\eta}=${arrondi(Cnecessaire)}\\;Ah\\)`
},

// =====================
{
texte:"Combien de branches en parallèle faut-il ?",
reponse:Np,
unite:"",
feedback:`\\(N_p=\\frac{Q}{Q_{bat}}=${Np}\\)`
},

// =====================
{
texte:"Calculer la capacité totale obtenue",
reponse:Ctot,
unite:"Ah",
feedback:`\\(Q_{tot}=N_p \\times Q_{bat}=${arrondi(Ctot)}\\;Ah\\)`
},

// =====================
{
texte:"Calculer le nombre total de batteries",
reponse:Ntot,
unite:"",
feedback:`\\(N_{tot}=N_s \\times N_p=${Ntot}\\)`
},

// =====================
{
texte:"Que permet l’association en parallèle ? (1=augmenter tension, 2=augmenter capacité, 3=réduire puissance)",
reponse:2,
unite:"",
feedback:`Le parallèle augmente la capacité`
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