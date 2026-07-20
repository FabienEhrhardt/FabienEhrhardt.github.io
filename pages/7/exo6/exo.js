// =====================
// PARAMÈTRES
// =====================

// Constante de FEM (V.s.rad-1)
let kt=[0.8,0.9,1.0,1.1,1.2];

// Résistance induit (Ω)
let Rt=[0.3,0.4,0.5,0.6,0.8];

// Tension d'alimentation
let Ut=[110,180,220,300];

let n=Math.floor(Math.random()*Ut.length);

let U=Ut[n];
let R=Rt[Math.floor(Math.random()*Rt.length)];
let k=kt[Math.floor(Math.random()*kt.length)];

// vitesse
let Omega=[80,100,120,150,180,200];
let w=Omega[Math.floor(Math.random()*Omega.length)];

// Couple résistant
let Trt=[20,30,40,50,60,80];
let Tr=Trt[Math.floor(Math.random()*Trt.length)];

// =====================
// CALCULS
// =====================

// FEM
let E=k*w;

// courant
let I=(U-E)/R;

// Couple
let T=k*I;

// vitesse au point de fonctionnement
let wf=(U-R*Tr/k)/k;

// =====================
// CANVAS
// =====================

function schemaExo(canvasId){

const canvas=document.getElementById(canvasId);
const ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

let x=20;
let y=30;

let p;

p=SourceV(canvasId,"U",x,y,90,"black",false,true);

p=Fil(canvasId,p.x,p.y-80,0,"black",false);

p=Resistance(canvasId,"R",p.x,p.y,0,"blue",false,false);

p=SourceV(canvasId,"E",p.x,p.y,90,"blue",false,false);
p=Fil(canvasId,p.x,p.y,180,"blue",false);
p=Fil(canvasId,p.x,p.y,180,"black",false);

}

function tracerPointFonctionnement(canvasId){

const canvas=document.getElementById(canvasId);
const ctx=canvas.getContext("2d");

ctx.fillStyle="red";
ctx.beginPath();
ctx.arc(470,120,5,0,2*Math.PI);
ctx.fill();

ctx.fillText("Point de fonctionnement",485,120);

}

// =====================
// EXERCICE
// =====================

let theme="7";
let nomExo="exo6";

let exo={

titre:"Machine à courant continu - Modèle de Thévenin",

enonce:`

Une machine à courant continu est alimentée sous sa tension nominale

\\(U=${U}~V\\)

La résistance de l'induit vaut

\\(R=${R}~\\Omega\\)

La constante de la machine vaut

\\(k=${k}~V \\cdot s \\) 

La vitesse nominale du moteur est de 
\\(\\Omega=${w}~rad.s^{-1}\\)

Le couple résistant est

\\(T_r=${Tr}~N.m\\)

Le schéma équivalent est donné ci-dessous.

`,

courbe1:{},

questions:[

//====================
{
texte:"Calculer la force électromotrice E au régime nominal",
reponse:E,
unite:"V",
feedback:`\\(E=k\\Omega=${arrondi(E)}~V\\)`
},

//====================
{
texte:"Calculer le courant nominal dans l'induit",
reponse:I,
unite:"A",
feedback:`\\(I=\\frac{U-E}{R}=${arrondi(I)}~A\\)`
},

//====================
{
texte:"Calculer le couple moteur nominal développé",
reponse:T,
unite:"N.m",
feedback:`\\(T=kI=${arrondi(T)}~N.m\\)`
},

//====================
{
texte:"Le moteur est-il capable d'entraîner la charge ? (Oui ou Non)",
reponse:(T>=Tr)?"Oui":"Non",
unite:"",
feedback:`Le moteur peut développer ${arrondi(T)} N.m et donc peut entrainer une charge de ${Tr} N.m.`
},

//====================
{
texte:"Déterminer la vitesse de fonctionnement lorsque le couple moteur est égal au couple résistant",
reponse:wf,
unite:"rad/s",
feedback:`On résout :
\\(T_r=k\\frac{U-k\\Omega}{R}\\)

d'où

\\(\\Omega=\\frac{U-R\\frac{T_r}{k}}{k}

=${arrondi(wf)}~rad/s\\)`
},

//====================
{
texte:"Calculer la FEM au point de fonctionnement",
reponse:k*wf,
unite:"V",
feedback:`\\(E=k\\Omega=${arrondi(k*wf)}~V\\)`
},

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

genererExercice(exo);

schemaExo("graph");

};