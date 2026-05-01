// =====================
// PARAMÈTRES
// =====================

// Puissance apparente
let St = [160, 250, 400, 630, 800, 1000, 1250, 1600, 2000]; // 500 à 900 kVA
let S = St[Math.floor(Math.random()*St.length)];
// Tensions
let U = [400,5500,6600,10000, 15000, 20000, 30000];
let U1=U[Math.floor(Math.random()*U.length)]; // primaire (20 kV)
let U2 = U[Math.floor(Math.random()*U.length)];   // secondaire (400 V)
while(U2==U1){U2 = U[Math.floor(Math.random()*U.length)];}
let U20 = arrondi(U2*1.025);

// Couplage
let couplages = ["Dyn11","Yy0","Dd0"];
let couplage = couplages[Math.floor(Math.random()*couplages.length)];

// Courants nominaux
let I1 = arrondi(S*1000/(Math.sqrt(3)*U1));
let I2 = arrondi(S*1000/(Math.sqrt(3)*U2));

// Rapport
let m = arrondi(U20/U1);

// =====================
// EXERCICE
// =====================

let theme="33";
let nomExo="exo4";

let exo={

titre:"Transformateur triphasé – Lecture de plaque",

enonce:`On considère un transformateur triphasé de caractéristiques :
<ul>
<li>Puissance apparente : ${S} kVA</li>
<li>Tension primaire : ${U1} V</li>
<li>Tension secondaire : ${U2} V</li>
<li>Tension secondaire à vide : ${U20} V</li>
<li>Couplage : ${couplage}</li>
</ul>`,

// ⚠ obligatoire pour afficher le canvas même si inutile
//courbe1:{},

questions:[

// =====================
{
texte:"Donner la puissance apparente nominale",
reponse:S,
unite:"kVA",
feedback:`Lecture directe de la plaque S=${S}kVA`
},

// =====================
{
texte:"Donner la tension nominale primaire",
reponse:U1,
unite:"V",
feedback:`Côté haute tension \\(U_1=${U1}\\) V`
},


// =====================
{
texte:"Calculer le courant nominal au primaire",
reponse:I1,
unite:"A",
feedback:`\\(I_1 = \\frac{S}{\\sqrt{3}U_1} = ${I1} A\\)`
},

// =====================
{
texte:"Calculer le courant nominal au secondaire",
reponse:I2,
unite:"A",
feedback:`\\(I_2 = \\frac{S}{\\sqrt{3}U_2} = ${I2} A\\)`
},

// =====================
{
texte:"Calculer le rapport de transformation",
reponse:m,
feedback:`\\(m = \\frac{U_{20}}{U_1} = ${m}\\)`
},

// =====================
{
texte:"Le transformateur est-il élévateur ou abaisseur ?",
reponse:(U1>U2?"abaisseur":"élévateur"),
feedback:`Si \\(U_1 > U_2\\) → transformateur abaisseur
<br>Si \\(U_1 = U_2\\) → transformateur d'isolement
<br>Si \\(U_1 < U_2\\) → transformateur élévateur`
},

// =====================
{
type:"texte",
texte:`Que signifie la lettre majuscule dans le couplage (ex : D dans ${couplage}) ?`,
reponse:["couplage primaire","couplage côté primaire"],
feedback:`Majuscule = couplage côté primaire`
},

// =====================
{
type:"texte",
texte:`Que signifie la lettre minuscule dans le couplage (ex : y dans ${couplage}) ?`,
reponse:["couplage secondaire","couplage côté secondaire"],
feedback:`Minuscule = couplage côté secondaire`
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