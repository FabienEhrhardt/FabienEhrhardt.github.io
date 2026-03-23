// =====================
// PARAMÈTRES
// =====================

// Données fluide
let rho = 1000; // kg/m3
let g = 9.81;

// Conduite
let D = (Math.floor(Math.random()*18)+2)/100; // m
let Dmin=0.02;
let L = (Math.floor(Math.random()*5)+5)*10; // 50 à 90 m

// Débit
let Q = (Math.floor(Math.random()*5)+5)/1000; // 0.005 à 0.009 m3/s
let Qmax=0.01;

// Section
let S = Math.PI*D*D/4;

// Vitesse
let v = Q/S;
let vmax=Qmax/Dmin/Dmin/3.14159;

// Coefficient pertes linéiques (simule abaque)
function lambda(v){
    return 0.02 + 0.01*(v/2); // simplification pédagogique
}

let lambda_val = lambda(v);

// Pertes linéiques
let hf = lambda_val * (L/D) * (v*v/(2*g));

// Pertes singulières
let K = 2; // pertes accessoires
let hs = K * (v*v/(2*g));

// Pertes totales
let htot = hf + hs;

// Différence de hauteur
let z1 = 0;
let z2 = (Math.floor(Math.random()*5)+5); // 5 à 10 m

// Pression sortie
let P2 = 2e5; // 2 bar

// Pression entrée via Bernoulli
let P1 = P2 + rho*g*(z2 - z1 + htot);

let xmax=superarrondi(1.1*vmax);
let ymax1=superarrondi(1.1*fmax(lambda, xmax));
let ymax2=100;







// =====================
// EXERCICE
// =====================

let theme="42";
let nomExo="exo3";

let exo={

titre:"Écoulement dans une conduite - pertes de charge et Bernoulli",

enonce:`De l’eau circule dans une conduite de diamètre ${D} m et de longueur ${L} m avec un débit de ${Q} m³/s.
On considère une différence de hauteur entre l’entrée et la sortie de ${z2} m.
La pression en sortie est de 2 bar.`,

// Abaque simulé
courbe1:{
    f: lambda,
    Nom: "Coefficient λ en fonction de v",
    axeX: "Vitesse v (m/s)",
    axeY: "λ"
},

questions:[

// =====================
{
texte:"Calculer la section de la conduite",
reponse:S,
unite:"m²",
feedback:`\\(S=\\frac{\\pi D^2}{4}=${arrondi(S)}\\)`
},

// =====================
{
texte:"Calculer la vitesse de l’eau",
reponse:v,
unite:"m/s",
feedback:`\\(v=\\frac{Q}{S}=${arrondi(v)}\\)`
},

// =====================
{
texte:"À partir de l’abaque, déterminer le coefficient λ",
reponse:lambda_val,
unite:"",
feedback:`Lecture graphique → λ ≈ ${arrondi(lambda_val)}`,

action:function(){
    tracerPoint("graph", v, lambda_val, "λ", 1, "red");
}
},

// =====================
{
texte:"Calculer les pertes de charge linéaires",
reponse:hf,
unite:"m",
feedback:`\\(h_f=\\lambda \\frac{L}{D} \\frac{v^2}{2g}=${arrondi(hf)}\\)`
},

// =====================
{
texte:"Calculer les pertes de charge singulières",
reponse:hs,
unite:"m",
feedback:`\\(h_s=K \\frac{v^2}{2g}=${arrondi(hs)}\\)`
},

// =====================
{
texte:"Calculer les pertes de charge totales",
reponse:htot,
unite:"m",
feedback:`\\(h_{tot}=h_f+h_s=${arrondi(htot)}\\)`
},

// =====================
{
texte:"Convertir la pression de sortie en Pascal",
reponse:P2,
unite:"Pa",
feedback:`2 bar = ${P2} Pa`
},

// =====================
{
texte:"Appliquer Bernoulli pour déterminer la pression d’entrée",
reponse:P1,
unite:"Pa",
feedback:`\\(P_1=P_2+\\rho g (\\Delta z + h_{tot})=${arrondi(P1)}\\)`
},

// =====================
{
texte:"La pression augmente-t-elle entre l’entrée et la sortie ? (1=oui, 0=non)",
reponse:1,
unite:"",
feedback:`Il faut compenser les pertes → pression plus élevée à l’entrée`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    initialisationGraph("graph",2);
    tracerEcran("graph");
    tracerCourbe("graph", exo.courbe1.f, exo.courbe1.Nom, "blue", 1);
    genererExercice(exo);
};