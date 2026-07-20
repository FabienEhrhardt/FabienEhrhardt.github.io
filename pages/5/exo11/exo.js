// =====================
// PARAMÈTRES
// =====================

// Puissance électrique demandée
let Pt=[1,2,3,5,8,10,15,20];
let P=Pt[Math.floor(Math.random()*Pt.length)];

// rendement de la pile
let etat=[0.45,0.50,0.55,0.60];

let eta=etat[Math.floor(Math.random()*etat.length)];

// PCI de l'hydrogène (kWh/kg)
let PCI=Math.floor(Math.random()*4+15); // Attention ce n'est pas le PCI mais la densité d'énergie (source ADEME) en kWhe/kgH2

// masse disponible
let Mt=[2,3,4,5,6,8,10];
let M=Mt[Math.floor(Math.random()*Mt.length)];

// tension de sortie
let Ut=[12,24,48,110,230];
let U=Ut[Math.floor(Math.random()*Ut.length)];


// =====================
// CALCULS
// =====================

// puissance chimique nécessaire
let Pchim=P/eta;

// consommation horaire
let Conso=Pchim/PCI;

// autonomie
let Auto=M/Conso;

// courant délivré
let I=P*1000/U;

// énergie disponible
let E=M*PCI*eta;


// =====================
// CANVAS
// =====================

function schemaExo(canvasId){

const canvas=document.getElementById(canvasId);
const ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.font="18px Arial";

ctx.fillText("Hydrogène",30,155);

ctx.strokeRect(230,120,140,60);
ctx.fillText("Pile à",275,145);
ctx.fillText("combustible",250,168);

ctx.fillText("Electricité",500,155);

ctx.beginPath();
ctx.moveTo(130,150);
ctx.lineTo(230,150);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(370,150);
ctx.lineTo(470,150);
ctx.stroke();

}

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo11";

let exo={

titre:"Pile à combustible - Étude énergétique",

enonce:`

Une pile à combustible alimente une installation électrique.

La puissance électrique demandée est

\\(P=${P}~kW\\)

Le rendement de la pile vaut

\\(\\eta=${Math.round(eta*100)}\\%\\)

Le réservoir contient

\\(m=${M}~kg\\)

d'hydrogène.

La densité d'énergie pour une pile à hydrogène est de 

\\(W_m=${PCI}~kWh/kg\\).

La tension délivrée est

\\(U=${U}~V\\).

Le schéma énergétique est représenté ci-dessous.

`,

courbe1:{},

questions:[

//====================

{
type:"texte",
texte:"Quelle est la forme d'énergie stockée dans l'hydrogène ?",
reponse:["Chimique"],
unite:"",
feedback:`L'hydrogène stocke de l'énergie chimique.`
},

//====================

{
texte:"Calculer la puissance chimique nécessaire.",
reponse:Pchim,
unite:"kW",
feedback:`\\(P_{chim}=\\frac{P}{\\eta}=${arrondi(Pchim)}~kW\\)`
},

//====================

{
texte:"Calculer le courant délivré par la pile.",
reponse:I,
unite:"A",
feedback:`C'est du continu donc : \\(I=\\frac{P}{U}=${arrondi(I)}~A\\)`
},

//====================

{
texte:"Calculer la consommation d'hydrogène.",
reponse:Conso,
unite:"kg/h",
feedback:`L'énergie chimique consommée en un temps \\(\\Delta t\\) est de \\(E_{chim}=m W_m=P_{chim} \\Delta t\\) <br>
On rappelle le débit massique \\(Q_m=\\frac{m}{\\Delta t}\\) <br>
De ces 2 équations, on trouve \\(Q_m=\\frac{m}{\\Delta t}=\\frac{P_{chim}}{W_m}=${arrondi(Conso)}~kg/h\\)`
},

//====================

{
texte:"Calculer l'énergie électrique disponible dans le réservoir.",
reponse:E,
unite:"kWh",
feedback:`\\(E=E_{chim}\\times\\eta=m\\times W_m\\times\\eta=${arrondi(E)}~kWh\\)`
},

//====================

{
texte:"Calculer l'autonomie de l'installation.",
reponse:Auto,
unite:"h",
feedback:`On part de \\(Q_m=\\frac{m}{\\Delta t}\\) <br>
\\(\\Delta t=\\frac{m}{Q_m}=${arrondi(Auto)}~h\\)`
},

//====================

{
	type:"texte",
texte:"Quel est le principal avantage d'une pile à combustible ?",
reponse:["Elle produit de l'électricité sans combustion"],
unite:"",
feedback:`La pile convertit directement l'énergie chimique en énergie électrique avec un bon rendement et très peu d'émissions locales.`
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