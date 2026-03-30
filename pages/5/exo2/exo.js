// =====================
// PARAMÈTRES
// =====================

// Batterie
let U = (Math.floor(Math.random()*4)+10); // 10 à 13 V
let C = (Math.floor(Math.random()*5)+5)*10; // 50 à 90 Ah

// Récepteur
let P = (Math.floor(Math.random()*5)+5)*10; // 50 à 90 W

// Rendement global
let eta = (Math.floor(Math.random()*18)+80)/100; 

// Énergie batterie (Wh)
let E = U * C;

// Courant consommé
let I = P / U;

// Autonomie (h)
let t = (C * eta) / I;

// Énergie utile
let Eutile = E * eta;

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo2";

let exo={

titre:"Autonomie d’un système alimenté par batterie",

enonce:`Une batterie de tension ${U} V et de capacité ${C} Ah alimente un appareil de puissance ${P} W.
On considère un rendement global de ${eta*100} %.`,

questions:[

// =====================
{
texte:"Calculer l’énergie stockée dans la batterie",
reponse:E,
unite:"Wh",
feedback:`\\(E=U \\times C=${arrondi(E)}\\;Wh\\)`
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
texte:"Calculer l’énergie réellement utilisable",
reponse:Eutile,
unite:"Wh",
feedback:`\\(E_{utile}=\\eta E=${arrondi(Eutile)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer l’autonomie du système en heures",
reponse:t,
unite:"h",
feedback:`\\(t=\\frac{C \\cdot \\eta}{I}=${arrondi(t)}\\;h\\)`
},

// =====================
{
texte:"Convertir cette autonomie en minutes",
reponse:t*60,
unite:"min",
feedback:`\\(t=${arrondi(t*60)}\\;min\\)`
},

// =====================
{
texte:"Si la puissance double, que devient l’autonomie ? (1=elle double, 2=elle est divisée par 2, 3=elle ne change pas)",
reponse:2,
unite:"",
feedback:`Si P double → I double → autonomie divisée par 2`
},

// =====================
{
texte:`Calculer la puissance maximale si le courant max est limité à ${arrondi(I*1.5)} A`,
reponse:U*(I*1.5),
unite:"W",
feedback:`\\(P=U \\times I=${arrondi(U*(I*1.5))}\\;W\\)`
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