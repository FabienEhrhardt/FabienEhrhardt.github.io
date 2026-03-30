// =====================
// PARAMÈTRES
// =====================

// Réseau monophasé
let U = 230; // V

// Données aléatoires
let P = (Math.floor(Math.random()*5)+5)*100; // 500 à 900 W
let cosphi = (Math.floor(Math.random()*4)+6)/10; // 0.6 à 0.9

// Calculs
let S = P / cosphi;
let Q = Math.sqrt(S*S - P*P);
let I = S / U;

// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo5";

let exo={

titre:"Calcul de puissance en monophasé",

enonce:`Un récepteur monophasé est alimenté sous ${U} V. 
Il consomme une puissance active de ${P} W avec un facteur de puissance de ${cosphi} en retard.`,

questions:[

// =====================
{
texte:"Calculer la puissance apparente S",
reponse:S,
unite:"VA",
feedback:`\\(S=\\frac{P}{cos\\varphi}=${arrondi(S)}VA\\)`
},

// =====================
{
texte:"Calculer la puissance réactive Q",
reponse:Q,
unite:"var",
feedback:`\\(Q=\\sqrt{S^2-P^2}=${arrondi(Q)}var\\)`
},

// =====================
{
texte:"Calculer le courant absorbé",
reponse:I,
unite:"A",
feedback:`\\(I=\\frac{S}{U}=${arrondi(I)}A\\)`
},

// =====================
{
texte:"Donner la nature du récepteur (1=inductif, 0=résistif, -1 capacitif)",
reponse:(cosphi<1)?1:0,
unite:"",
feedback:`Si \\(\\varphi\\) est positif (courant en retard)→ récepteur inductif <br>
Si \\(\\varphi\\) est nul (courant en phase)→ récepteur résistif<br>
Si \\(\\varphi\\) est négatif (courant en avance)→ récepteur capacitif`
},


// =====================
{
texte:"Calculer le facteur de puissance à partir de P et S",
reponse:cosphi,
unite:"",
feedback:`\\(cos\\varphi=\\frac{P}{S}=${cosphi}\\)`
},

// =====================
{
texte:"Déterminer le déphasage \\(\\varphi\\) en °",
reponse:180/3.14159*Math.acos(cosphi),
unite:"°",
feedback:`\\(\\varphi=acos (cos \\varphi)=${arrondi(180/3.14159*Math.acos(cosphi))}\\)°`
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