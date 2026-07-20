// =====================
// PARAMÈTRES
// =====================

// Puissance (kW)
let Pt=[5,8,10,12,15,18,20,25,30];
let n=Math.floor(Math.random()*Pt.length);
let P=Pt[n];

// tensions
let Umono=230;
let Utri=400;

// facteur de puissance
let cosphiTab=[0.75,0.8,0.85,0.9];
let cosphi=cosphiTab[Math.floor(Math.random()*cosphiTab.length)];

// résistance de ligne (Ω)
let Rt=[0.2,0.25,0.3,0.35,0.4];
let R=Rt[Math.floor(Math.random()*Rt.length)];


// =====================
// CALCULS
// =====================

// Courant monophasé
let Imono = (P*1000)/(Umono*cosphi);

// Courant triphasé
let Itri = (P*1000)/(Math.sqrt(3)*Utri*cosphi);

// Rapport des courants
let Rapport = Imono / Itri;

// Pertes Joule monophasé
let PJmono = 2*R * Imono * Imono;

// Pertes Joule triphasé
let PJtri = 3*R * Itri * Itri;


// =====================
// OUTILS
// =====================

function arrondi(x){
    return Math.round(x*100)/100;
}


// =====================
// CANVAS
// =====================

function schemaExo(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.font="16px Arial";
    ctx.textAlign="center";

    // =====================
    // MONOPHASE
    // =====================
    ctx.strokeRect(50,80,220,120);
    ctx.fillText("Réseau monophasé",160,60);

    ctx.beginPath();
    ctx.moveTo(50,140);
    ctx.lineTo(20,140);
    ctx.stroke();
    ctx.fillText("230 V",30,130);

    ctx.beginPath();
    ctx.moveTo(270,140);
    ctx.lineTo(320,140);
    ctx.stroke();
    ctx.fillText("Charge",300,130);

    // courant mono
    ctx.beginPath();
    ctx.moveTo(140,140);
    ctx.lineTo(200,140);
    ctx.stroke();
    ctx.fillText("I mono",170,160);


    // =====================
    // TRIPHASE
    // =====================
    ctx.strokeRect(50,260,220,120);
    ctx.fillText("Réseau triphasé",160,240);

    // L1 L2 L3
    ctx.beginPath();
    ctx.moveTo(50,300);
    ctx.lineTo(20,300);
    ctx.stroke();
    ctx.fillText("L1",30,290);

    ctx.beginPath();
    ctx.moveTo(50,330);
    ctx.lineTo(20,330);
    ctx.stroke();
    ctx.fillText("L2",30,320);

    ctx.beginPath();
    ctx.moveTo(50,360);
    ctx.lineTo(20,360);
    ctx.stroke();
    ctx.fillText("L3",30,350);

    // charge tri
    ctx.beginPath();
    ctx.moveTo(270,320);
    ctx.lineTo(320,320);
    ctx.stroke();
    ctx.fillText("Charge",300,310);

    // courant tri
    ctx.beginPath();
    ctx.moveTo(140,320);
    ctx.lineTo(200,320);
    ctx.stroke();
    ctx.fillText("I tri",170,340);

    // mise en évidence visuelle (triphasé plus "léger")
    ctx.fillStyle="rgba(0,255,0,0.1)";
    ctx.fillRect(50,260,220,120);
    ctx.fillRect(50,80,220,120);

}

// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo12";

let exo={

titre:"Intérêt du réseau triphasé",

enonce:`

Une installation électrique doit alimenter une charge consommant une puissance active de

\\(P=${P}~kW\\)

avec un facteur de puissance

\\(cos\\varphi=${cosphi}\\).

Deux solutions sont envisagées :

<ul>
<li>une alimentation <b>monophasée 230 V</b>,</li>
<li>une alimentation <b>triphasée 400 V</b>.</li>
</ul>

La résistance équivalente d'un conducteur est de

\\(R=${R}~\\Omega\\).

Le schéma des deux solutions est représenté ci-dessous.

L'objectif est de comparer les deux solutions afin de comprendre l'intérêt du réseau triphasé.

`,

courbe1:{},

questions:[

//====================
{
texte:"Calculer le courant dans le réseau monophasé.",
reponse:Imono,
unite:"A",
feedback:`
En monophasé :

\\[
P=UIcos\\varphi
\\]

On obtient donc :

\\[
I=\\frac{P}{Ucos\\varphi}
=\\frac{${P}\\times1000}{${Umono}\\times${cosphi}}
=${arrondi(Imono)}~A
\\]`
},

//====================
{
texte:"Calculer le courant dans le réseau triphasé.",
reponse:Itri,
unite:"A",
feedback:`
En triphasé :

\\[
P=\\sqrt3UIcos\\varphi
\\]

Ainsi :

\\[
I=\\frac{P}{\\sqrt3Ucos\\varphi}
=${arrondi(Itri)}~A
\\]`
},

//====================
{
texte:"Calculer le rapport entre le courant monophasé et le courant triphasé.",
reponse:Rapport,
unite:"",
feedback:`
Le rapport vaut :

\\[
\\frac{I_{mono}}{I_{tri}}
=
\\frac{${arrondi(Imono)}}{${arrondi(Itri)}}
=
${arrondi(Rapport)}
\\]

Le courant est donc 3 fois plus faible en triphasé.
`
},

//====================
{
texte:"Calculer les pertes Joule dans la ligne monophasée.",
reponse:PJmono,
unite:"W",
feedback:`
Attention il faut compter 1 conducteur pour la phase et 1 pour le neutre. Les pertes Joule sont données par :

\\[
P_J=2RI^2
\\]

Ainsi :

\\[
P_J=2 \\times${R}\\times${arrondi(Imono)}^2
=${arrondi(PJmono)}~W
\\]`
},

//====================
{
texte:"Calculer les pertes Joule dans la ligne triphasée.",
reponse:PJtri,
unite:"W",
feedback:`
Attention il faut compter 3 conducteurs, 1 pour chaque phase! Les pertes Joule sont :

\\[
P_J=3RI^2
\\]

On obtient :

\\[
P_J=3 \\times${R}\\times${arrondi(Itri)}^2
=${arrondi(PJtri)}~W
\\]

Les pertes sont beaucoup plus faibles en triphasé.
`
},

//====================
{
type:"texte",
texte:"Pourquoi peut-on utiliser des câbles de plus faible section en triphasé ?",
reponse:[
"Le courant est plus faible",
"Car le courant est plus faible",
"Parce que le courant est plus faible"
],
unite:"",
feedback:`
À puissance égale, le courant est plus faible en triphasé.

Les conducteurs chauffent donc moins et une section plus faible peut être utilisée.
`
},

//====================
{
type:"texte",
texte:"Citer deux avantages du réseau triphasé par rapport au réseau monophasé.",
reponse:[
"Courant plus faible;Moins de pertes Joule",
"Moins de pertes Joule;Courant plus faible",
"Courant plus faible;Section des câbles plus faible",
"Section des câbles plus faible;Courant plus faible",
"Moins de pertes Joule;Section des câbles plus faible",
"Section des câbles plus faible;Moins de pertes Joule",
"Champ tournant;Courant plus faible",
"Courant plus faible;Champ tournant"
],
unite:"",
feedback:`
Le réseau triphasé présente de nombreux avantages :

<ul>
<li>courant plus faible à puissance égale ;</li>
<li>pertes Joule réduites ;</li>
<li>section des conducteurs plus faible ;</li>
<li>transport de fortes puissances ;</li>
<li>création d'un champ tournant permettant l'alimentation directe des moteurs asynchrones.</li>
</ul>
`
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