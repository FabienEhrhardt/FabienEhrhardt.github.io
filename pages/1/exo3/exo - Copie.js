// =====================
// PARAMÈTRES
// =====================

//Armoire électrique
let PertesTab=[250,400,550,700,900,1200];
let VolumeTab=[0.8,1.0,1.2,1.5,2.0];

let n=Math.floor(Math.random()*PertesTab.length);

let Ppertes=PertesTab[n];
let Volume=VolumeTab[Math.floor(Math.random()*VolumeTab.length)];

let Tamb=Math.floor(Math.random()*10+20);

//Résistances thermiques
let Rcond=Math.floor(Math.random()*20+10)/100;
let Rconv=Math.floor(Math.random()*30+20)/100;

//Ventilation
let Rvent=Math.floor(Math.random()*10+5)/100;

// =====================
// CALCULS
// =====================

//Résistance totale sans ventilation
let Rth=arrondi(Rcond+Rconv,2);

//Échauffement
let DeltaT=arrondi(Ppertes*Rth,1);

//Température interne
let Tint=arrondi(Tamb+DeltaT,1);

//Avec ventilation
let RthVent=arrondi(Rcond+Rvent,2);

let DeltaTVent=arrondi(Ppertes*RthVent,1);

let TintVent=arrondi(Tamb+DeltaTVent,1);

//Flux thermique
let Phi=Ppertes;

// =====================
// VARIABLES CANVAS
// =====================

let PosPertes;
let PosRcond;
let PosRconv;
let PosRvent;
let PosTint;

// =====================
// CANVAS
// =====================

function tracerSchemaThermique(canvasId){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.font="16px Arial";
    ctx.textAlign="center";
    ctx.fillStyle="black";

    ctx.fillText("Modèle thermique de l’armoire électrique",canvas.width/2,30);

    //Armoire
    ctx.strokeStyle="black";
    ctx.lineWidth=2;

    ctx.strokeRect(180,80,260,180);

    ctx.fillText("Armoire électrique",310,110);

    //Source thermique
    ctx.fillStyle="red";

    ctx.beginPath();
    ctx.arc(250,170,25,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle="white";
    ctx.fillText("P",250,176);

    PosPertes={x:250,y:215};

    //Résistance conduction
    tracerResistance(ctx,330,140);

    ctx.fillStyle="black";
    ctx.fillText("Rcond",330,125);

    PosRcond={x:330,y:210};

    //Résistance convection
    tracerResistance(ctx,420,140);

    ctx.fillText("Rconv",420,125);

    PosRconv={x:420,y:210};

    //Air extérieur
    ctx.fillStyle="blue";
    ctx.fillText("Air ambiant",560,170);

    //Flèche thermique
    ctx.strokeStyle="red";

    ctx.beginPath();
    ctx.moveTo(275,170);
    ctx.lineTo(530,170);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(530,170);
    ctx.lineTo(520,165);
    ctx.lineTo(520,175);
    ctx.fill();

    //Ventilation
    ctx.strokeStyle="green";

    ctx.beginPath();
    ctx.arc(180,280,25,0,2*Math.PI);
    ctx.stroke();

    ctx.fillStyle="green";
    ctx.fillText("Vent.",180,285);

    PosRvent={x:180,y:330};

}

function tracerResistance(ctx,x,y){

    ctx.beginPath();

    ctx.moveTo(x-30,y);

    ctx.lineTo(x-20,y-10);
    ctx.lineTo(x-10,y+10);
    ctx.lineTo(x,y-10);
    ctx.lineTo(x+10,y+10);
    ctx.lineTo(x+20,y-10);

    ctx.lineTo(x+30,y);

    ctx.stroke();

}

function ajouterTexte(canvasId,texte,x,y){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.fillStyle="black";
    ctx.font="14px Arial";
    ctx.textAlign="center";

    ctx.fillText(texte,x,y);

}

// =====================
// EXERCICE
// =====================

let theme="37";
let nomExo="exoThermiqueArmoire";

let exo={

titre:"Armoire électrique – Étude thermique",

enonce:`Une armoire électrique industrielle dissipe une puissance thermique de \\(${Ppertes}~W\\) due aux pertes des équipements électroniques.<br><br>

L’armoire est installée dans un local à une température ambiante de \\(${Tamb}~°C\\).<br>

Le transfert thermique entre les composants et l’air extérieur est modélisé par :
<ul>
<li>une résistance thermique de conduction : \\(R_{cond}=${Rcond}~K/W\\)</li>
<li>une résistance thermique de convection : \\(R_{conv}=${Rconv}~K/W\\)</li>
</ul>

Une ventilation forcée peut être ajoutée, donnant une nouvelle résistance thermique de convection équivalente :
\\(R_{vent}=${Rvent}~K/W\\).<br><br>

Le schéma thermique équivalent est donné ci-dessous.`,

courbe1:{},

questions:[

// =====================
{
texte:"Déterminer la résistance thermique totale sans ventilation.",
reponse:Rth,
unite:"K/W",
feedback:`Les résistances thermiques en série s’additionnent.<br>
\\(R_{th}=R_{cond}+R_{conv}\\)<br>
\\(R_{th}=${Rcond}+${Rconv}=${Rth}~K/W\\)`,
action:function(){
    ajouterTexte("graph",`${Rcond} K/W`,PosRcond.x,PosRcond.y);
    ajouterTexte("graph",`${Rconv} K/W`,PosRconv.x,PosRconv.y);
}
},

// =====================
{
texte:"Calculer l’échauffement thermique de l’armoire sans ventilation.",
reponse:DeltaT,
unite:"°C",
feedback:`\\(\\Delta T=P \\times R_{th}\\)<br>
\\(\\Delta T=${Ppertes} \\times ${Rth}=${DeltaT}~°C\\)`
},

// =====================
{
texte:"Déterminer la température interne de l’armoire sans ventilation.",
reponse:Tint,
unite:"°C",
feedback:`\\(T_{int}=T_{amb}+\\Delta T\\)<br>
\\(T_{int}=${Tamb}+${DeltaT}=${Tint}~°C\\)`,
action:function(){
    ajouterTexte("graph",`${Tint} °C`,500,120);
}
},

// =====================
{
texte:"Déterminer la nouvelle résistance thermique avec ventilation.",
reponse:RthVent,
unite:"K/W",
feedback:`\\(R_{th}=R_{cond}+R_{vent}\\)<br>
\\(R_{th}=${Rcond}+${Rvent}=${RthVent}~K/W\\)`,
action:function(){
    ajouterTexte("graph",`${Rvent} K/W`,PosRvent.x,PosRvent.y);
}
},

// =====================
{
texte:"Calculer l’échauffement thermique avec ventilation.",
reponse:DeltaTVent,
unite:"°C",
feedback:`\\(\\Delta T=P \\times R_{th}\\)<br>
\\(\\Delta T=${Ppertes} \\times ${RthVent}=${DeltaTVent}~°C\\)`
},

// =====================
{
texte:"Déterminer la nouvelle température interne de l’armoire.",
reponse:TintVent,
unite:"°C",
feedback:`\\(T_{int}=T_{amb}+\\Delta T\\)<br>
\\(T_{int}=${Tamb}+${DeltaTVent}=${TintVent}~°C\\)`
},

// =====================
{
texte:"Calculer le gain thermique apporté par la ventilation.",
reponse:arrondi(Tint-TintVent,1),
unite:"°C",
feedback:`\\(Gain=T_{sans~ventilation}-T_{avec~ventilation}\\)<br>
\\(Gain=${Tint}-${TintVent}=${arrondi(Tint-TintVent,1)}~°C\\)`
},

// =====================
{
type:"texte",
texte:"Quel est l’effet de la ventilation sur la résistance thermique de convection ?",
reponse:[
"elle diminue",
"réduit la résistance thermique",
"diminue la résistance thermique"
],
feedback:`La ventilation améliore les échanges thermiques et réduit la résistance thermique de convection.`
},

// =====================
{
type:"texte",
texte:"Pourquoi faut-il limiter la température dans une armoire électrique ?",
reponse:[
"fiabilité",
"protection des composants",
"durée de vie",
"surchauffe"
],
feedback:`Une température trop élevée réduit la durée de vie des composants et peut provoquer des dysfonctionnements.`
},

]

// =====================

};

// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

    genererExercice(exo);

    tracerSchemaThermique("graph");

};