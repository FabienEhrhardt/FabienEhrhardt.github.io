// =====================
// PARAMÈTRES
// =====================

//Ballon d'eau chaude
let Vtab=[50,75,100,150,200];

let V=Vtab[Math.floor(Math.random()*Vtab.length)]; //L

//Températures
let Ti=Math.floor(Math.random()*10+10);
let Tf=Ti+Math.floor(Math.random()*25+25);

//Caractéristiques eau
let rho=1; //kg/L
let Ceau=4180; //J/kg/K

//Résistance chauffante
let Ptab=[1200,1500,1800,2000,2400];
let Pelec=Ptab[Math.floor(Math.random()*Ptab.length)]; //W

//Rendement
let eta=Math.floor(Math.random()*10+85)/100;

//Prix électricité
let prixkWh=Math.floor(Math.random()*8+12)/100;

// =====================
// CALCULS
// =====================

//Masse d'eau
let m=V*rho;

//Écart température
let DeltaT=Tf-Ti;

//Énergie thermique
let Q=arrondi(m*Ceau*DeltaT); //J

//Conversion Wh
let Qwh=arrondi(Q/3600); //Wh

//Conversion kWh
let Qkwh=arrondi(Qwh/1000,2);

//Énergie électrique réelle
let Eelec=arrondi(Qkwh/eta,2);

//Coût
let Cout=arrondi(Eelec*prixkWh,2);

//Temps chauffe
let t=arrondi(Eelec*1000/Pelec,1); //h

// =====================
// POSITIONS CANVAS
// =====================

let PosP;
let PosTi;
let PosTf;
let PosQ;

// =====================
// CANVAS
// =====================

function tracerBallon(canvasId){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.font="18px Arial";
    ctx.textAlign="center";
    ctx.fillStyle="black";

    ctx.fillText("Ballon d’eau chaude domestique",canvas.width/2,30);
	
	 //Eau
    ctx.fillStyle="#80D0FF";

    ctx.fillRect(305,170,170,115);

    // =====================
    // RESEAU
    // =====================

    ctx.fillStyle="red";

    ctx.fillRect(60,180,100,60);

    ctx.fillStyle="white";

    ctx.fillText("Réseau",110,205);
    ctx.fillText("230 V",110,230);

    // =====================
    // FLECHE
    // =====================

    ctx.strokeStyle="red";
	ctx.fillStyle="red";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(160,210);
    ctx.lineTo(350,210);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(260,210);
    ctx.lineTo(245,200);
    ctx.lineTo(245,220);
    ctx.fill();

    PosP={x:210,y:130};

    // =====================
    // BALLON
    // =====================

    ctx.strokeStyle="blue";
    ctx.lineWidth=3;

    ctx.beginPath();
    ctx.roundRect(300,70,180,220,10);
    ctx.stroke();

   

    //Résistance
    ctx.strokeStyle="orange";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(350,210);
    ctx.lineTo(430,210);
    ctx.stroke();
	
	ctx.lineWidth=25;
    ctx.beginPath();
    ctx.moveTo(370,210);
    ctx.lineTo(410,210);
    ctx.stroke();
	

    ctx.fillStyle="black";

    ctx.fillText("Résistance",390,240);

    //Thermomètre gauche
    ctx.strokeStyle="black";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(540,90);
    ctx.lineTo(540,260);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(540,270,12,0,2*Math.PI);
    ctx.stroke();

    PosTi={x:550,y:180};
    PosTf={x:550,y:120};

    // =====================
    // ENERGIE
    // =====================

    PosQ={x:390,y:330};

}

function ajouterTexte(canvasId,texte,x,y){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.fillStyle="black";
    ctx.font="14px Arial";
    ctx.textAlign="left";

    ctx.fillText(texte,x,y);

}

// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo4";

let exo={

titre:"Ballon d’eau chaude – Bilan énergétique",

enonce:`Un ballon d’eau chaude domestique contient \\(${V}~L\\) d’eau.<br><br>

L’eau est chauffée de \\(${Ti}~°C\\) à \\(${Tf}~°C\\) grâce à une résistance électrique de puissance \\(${Pelec}~W\\).<br><br>

On donne :
<ul>
<li>masse volumique de l’eau : \\(\\rho=1~kg/L\\)</li>
<li>capacité thermique de l’eau : \\(c=${Ceau}~J.kg^{-1}.K^{-1}\\)</li>
<li>rendement du chauffage : \\(\\eta=${eta}\\)</li>
<li>prix de l’électricité : \\(${prixkWh}\\) €/kWh</li>
</ul>

Le schéma énergétique du ballon est donné ci-dessous.`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la masse d’eau contenue dans le ballon.",
reponse:m,
unite:"kg",
feedback:`\\(m=\\rho \\times V\\)<br>
\\(m=${rho}\\times${V}=${m}~kg\\)`
},

// =====================
{
texte:"Calculer l’élévation de température de l’eau.",
reponse:DeltaT,
unite:"°C",
feedback:`\\(\\Delta T=T_f-T_i\\)<br>
\\(\\Delta T=${Tf}-${Ti}=${DeltaT}~°C\\)`,
action:function(){
    ajouterTexte("graph",`${Ti} °C`,PosTi.x,PosTi.y);
    ajouterTexte("graph",`${Tf} °C`,PosTf.x,PosTf.y);
}
},

// =====================
{
texte:"Calculer l’énergie thermique nécessaire pour chauffer l’eau.",
reponse:Q,
unite:"J",
feedback:`\\(Q=m c \\Delta T\\)<br>
\\(Q=${m}\\times${Ceau}\\times${DeltaT}\\)<br>
\\(Q=${arrondi(Q)}~J\\)`,
},

// =====================
{
texte:"Convertir cette énergie en Wh.",
reponse:Qwh,
unite:"Wh",
feedback:`\\(1~Wh=3600~J\\)<br>
\\(E=\\frac{${Q}}{3600}=${Qwh}~Wh\\)`
},

// =====================
{
texte:"Convertir cette énergie en kWh.",
reponse:Qkwh,
unite:"kWh",
feedback:`\\(E=\\frac{${Qwh}}{1000}=${Qkwh}~kWh\\)`
},

// =====================
{
texte:"Calculer l’énergie électrique réellement consommée.",
reponse:Eelec,
unite:"kWh",
feedback:`\\(E_{elec}=\\frac{E_{utile}}{\\eta}\\)<br>
\\(E_{elec}=\\frac{${Qkwh}}{${eta}}=${Eelec}~kWh\\)`
},

// =====================
{
texte:"Calculer le coût du chauffage de l’eau.",
reponse:Cout,
unite:"€",
feedback:`\\(C=E \\times prix\\)<br>
\\(C=${Eelec}\\times${prixkWh}=${Cout}\\) €`
},

// =====================
{
texte:"Calculer le temps de chauffe du ballon.",
reponse:t,
unite:"h",
feedback:`\\(t=\\frac{E}{P}\\)<br>
Attention : \\(P=${Pelec}~W=${Pelec/1000}~kW\\)<br>
\\(t=\\frac{${Eelec}}{${Pelec/1000}}=${t}~h\\)`,
action:function(){
    ajouterTexte("graph",`${Pelec} W`,PosP.x,PosP.y);
}
},

// =====================
{
type:"texte",
texte:"Pourquoi le rendement du chauffage n’est-il pas exactement égal à 1 ?",
reponse:[
"pertes",
"dissipation thermique",
"pertes thermiques"
],
feedback:`Une partie de l’énergie est perdue vers l’environnement sous forme de chaleur.`
},

// =====================
{
type:"texte",
texte:"Pourquoi utilise-t-on souvent le kWh pour l’énergie électrique domestique ?",
reponse:[
"facturation",
"compteur",
"énergie électrique"
],
feedback:`Le kWh est l’unité utilisée par les fournisseurs d’électricité pour la facturation.`
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

    tracerBallon("graph");

};