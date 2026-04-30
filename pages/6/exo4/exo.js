// =====================
// PARAMÈTRES
// =====================

let T = (Math.floor(Math.random()*6000)+2000); // 3000 à 6000 K

let lambda_max = 2.9e-3 / T;

// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo4";

let exo={

titre:"Température de couleur d’une source",

enonce:`Une source lumineuse a une température de ${T} K.<br> On rappelle la loi de Wien \\(\\lambda_{max} T=2898 \\mu  m \\bullet K\\)`,

questions:[

{
texte:"Calculer la longueur d’onde du maximum",
reponse:lambda_max,
unite:"m",
feedback:`\\(\\lambda_{max}=\\frac{2898 \\times 10^-6}{T} = ${lambda_max} m\\)`
},

{
texte:"Convertir en nm",
reponse:arrondi(lambda_max*1e9),
unite:"nm",
feedback:`\\(1 nm = 10^-9 m\\)`
},

{
texte:`La source est elle plutôt chaude ou froide? (1=froide, 2=chaude)`,
reponse:(T > 4000)?1:2,
feedback:`On définit 4000 K comme une source neutre. 
<br> Une température de couleur > 4000 K indique une source froide.
<br> Une température de couleur < 4000 K indique une source chaude.`
},

{
texte:"Plus la température est élevée, la lumière est-elle plus bleue ou rouge ?",
reponse:"bleue",
feedback:`Plus chaude = plus bleue`
},

{
type:"texte",
texte:"Quel appareil mesure l’éclairement énergétique (W/m²) ?",
reponse:["pyranometre"],
feedback:`Pyranomètre`
},

{
type:"texte",
texte:"Différence principale avec un luxmètre ?",
reponse:["sensibilite oeil", "oeil humain"],
feedback:`Le luxmètre tient compte de l’œil humain`
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