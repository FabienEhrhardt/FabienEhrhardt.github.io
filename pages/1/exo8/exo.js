// =====================
// PARAMÈTRES
// =====================

// Puissance du vent (kW)
let Pvt=[150,200,250,300,400,500,600,800,1000];
let etaRt=[0.35,0.38,0.40,0.42,0.45];
let etaMt=[0.93,0.94,0.95,0.96,0.97];
let etaGt=[0.95,0.96,0.97,0.98];

// Puissance nominale (kW)
let PNt=[100,150,200,250,300,400,500];

// Energie produite
let Ejt=[600,900,1200,1600,2200,2800,3600];       // kWh/jour
let Emt=[18000,24000,32000,45000,60000,75000];    // kWh/mois
let Eat=[220000,300000,420000,560000,720000];     // kWh/an

let n=Math.floor(Math.random()*PNt.length);

let Pvent=Pvt[n];
let etaR=etaRt[Math.floor(Math.random()*etaRt.length)];
let etaM=etaMt[Math.floor(Math.random()*etaMt.length)];
let etaG=etaGt[Math.floor(Math.random()*etaGt.length)];

let PN=PNt[n];

let Ej=Ejt[n];
let Em=Emt[n];
let Ea=Eat[n];

// =====================
// CALCULS
// =====================

let Protor=Pvent*etaR;
let Pmeca=Protor*etaM;
let Pelec=Pmeca*etaG;

let etaglobal=etaR*etaM*etaG;

let FCjour=Ej/(PN*24);
let FCmois=Em/(PN*24*30);
let FCan=Ea/(PN*24*365);

// =====================
// CANVAS
// =====================

function schemaExo(canvasId){

const canvas=document.getElementById(canvasId);
const ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

let x=0;
let y=140;

ctx.fillText("Vent",x+30,y+35);

ctx.beginPath();
ctx.moveTo(x+60,y+30);
ctx.lineTo(x+100,y+30);
ctx.stroke();

ctx.strokeRect(x+100,y,80,60);
ctx.fillText("Rotor",x+30+100,y+35);

ctx.beginPath();
ctx.moveTo(x+180,y+30);
ctx.lineTo(x+220,y+30);
ctx.stroke();

ctx.strokeRect(x+220,y,80,60);
ctx.fillText("Multip.",x+30+220,y+35);

ctx.beginPath();
ctx.moveTo(x+300,y+30);
ctx.lineTo(x+340,y+30);
ctx.stroke();

ctx.strokeRect(x+340,y,80,60);
ctx.fillText("Altern.",x+30+340,y+35);

ctx.beginPath();
ctx.moveTo(x+420,y+30);
ctx.lineTo(x+460,y+30);
ctx.stroke();

ctx.fillText("Electricité",x+480,y+35);

}

// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo8";

let exo={

titre:"Éolienne – Rendements et facteur de charge",

enonce:`

Une éolienne reçoit une puissance du vent de

\\(P_{vent}=${Pvent}~kW\\).

Le rendement du rotor vaut

\\(\\eta_R=${Math.round(etaR*100)}\\%\\)

Le rendement du multiplicateur vaut

\\(\\eta_M=${Math.round(etaM*100)}\\%\\)

Le rendement de l'alternateur vaut

\\(\\eta_G=${Math.round(etaG*100)}\\%\\)

La puissance nominale de l'éolienne est

\\(P_N=${PN}~kW\\)

L'énergie réellement produite est :

- ${Ej} kWh en une journée
- ${Em} kWh en un mois (30 jours)
- ${Ea} kWh en une année

Le schéma énergétique est donné ci-dessous.

`,

courbe1:{},

questions:[

//==================
{
texte:"Calculer la puissance mécanique récupérée par le rotor",
reponse:Protor,
unite:"kW",
feedback:`\\(P_{rotor}=P_{vent}\\times\\eta_R=${arrondi(Protor)}~kW\\)`
},

//==================
{
texte:"Calculer la puissance en sortie du multiplicateur",
reponse:Pmeca,
unite:"kW",
feedback:`\\(P=P_{rotor}\\times\\eta_M=${arrondi(Pmeca)}~kW\\)`
},

//==================
{
texte:"Calculer la puissance électrique produite",
reponse:Pelec,
unite:"kW",
feedback:`\\(P=P_{meca}\\times\\eta_G=${arrondi(Pelec)}~kW\\)`
},

//==================
{
texte:"Calculer le rendement global de l'éolienne",
reponse:etaglobal*100,
unite:"%",
feedback:`\\(\\eta=\\eta_R\\times\\eta_M\\times\\eta_G=${arrondi(etaglobal*100)}\\%\\)`
},

//==================
{
texte:"Calculer le facteur de charge sur une journée",
reponse:FCjour*100,
unite:"%",
feedback:`\\(F_C=\\frac{E}{P_N\\Delta t}=\\frac{E}{P_N\\times24}=${arrondi(FCjour*100)}\\%\\)`
},

//==================
{
texte:"Calculer le facteur de charge sur un mois",
reponse:FCmois*100,
unite:"%",
feedback:`\\(F_C=\\frac{E}{P_N\\Delta t}=\\frac{E}{P_N\\times24\\times30}=${arrondi(FCmois*100)}\\%\\)`
},

//==================
{
texte:"Calculer le facteur de charge sur une année",
reponse:FCan*100,
unite:"%",
feedback:`\\(F_C=\\frac{E}{P_N\\Delta t}=\\frac{E}{P_N\\times24\\times365}=${arrondi(FCan*100)}\\%\\)`
}

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