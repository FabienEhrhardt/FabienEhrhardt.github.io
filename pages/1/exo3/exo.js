// =====================
// PARAMÈTRES
// =====================

//Puissance dissipée
let Ptab=[250,350,450,600,800];
let P=Ptab[Math.floor(Math.random()*Ptab.length)];

//Plaque aluminium
let eAlu=Math.floor(Math.random()*4+3)/1000; //m
let SAlu=Math.floor(Math.random()*40+40)/10000; //m²
let lambdaAlu=200;

//Pâte thermique
let ePate=Math.floor(Math.random()*5+1)/100000; //10 à 50 µm
let SPate=SAlu;

let lambdaPate=Math.floor(Math.random()*30+20)/10; //2 à 5 W/m/K



//Convection dissipateur
let h=Math.floor(Math.random()*40+30); //W/m²/K
let Sconv=Math.floor(Math.random()*40+80)/100; //m²

//Température ambiante
let Tamb=Math.floor(Math.random()*10+20);

// =====================
// CALCULS
// =====================

//Résistances conduction
let Ralu=arrondi(eAlu/(lambdaAlu*SAlu),4);

let Rpate=arrondi(ePate/(lambdaPate*SPate),4);

//Résistance convection
let Rconv=arrondi(1/(h*Sconv),4);

//Résistance totale série
let Rth=arrondi(Ralu+Rpate+Rconv,4);

//Échauffement
let DeltaT=arrondi(P*Rth,1);

//Température composant
let Tcomp=arrondi(Tamb+DeltaT,1);

//Deux dissipateurs en parallèle
let Rconv2=arrondi(Rconv/2,4);

let Rth2=arrondi(Ralu+Rpate+Rconv2,4);

let DeltaT2=arrondi(P*Rth2,1);

let Tcomp2=arrondi(Tamb+DeltaT2,1);

// =====================
// POSITIONS CANVAS
// =====================

let PosRalu;
let PosRpate;
let PosRconv;
let PosRconv2;
let p;

// =====================
// CANVAS
// =====================

function tracerSchemaThermique(canvasId,cas=false){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.font="18px Arial";
    ctx.textAlign="center";
    ctx.fillStyle="black";

    ctx.fillText("Chaîne thermique d’un module IGBT",canvas.width/2,30);

    //IGBT
    ctx.fillStyle="red";
    ctx.fillRect(30,140,80,60);

    ctx.fillStyle="white";
    ctx.fillText("IGBT",70,177);

    //Flux thermique
    ctx.strokeStyle="red";
	ctx.fillStyle="red";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(110,170);
    ctx.lineTo(190,170);
    ctx.stroke();

    //Flèche
    ctx.beginPath();
    ctx.moveTo(160,170);
    ctx.lineTo(145,160);
    ctx.lineTo(145,180);
    ctx.fill();
	
	p={x:190,y:170};

    //Résistance aluminium
	PosRalu={x:p.x+40,y:p.y-20};
	p=Resistance("graph","Ralu",p.x,p.y,0,"black",v=false,i=false);
    

    //Résistance pate
	PosRpate={x:p.x+40,y:p.y-20};
	p=Resistance("graph","Rpate",p.x,p.y,0,"black",v=false,i=false);	
	
	p=DemiFil("graph",p.x,p.y,0,"black",i=false);
	let p1=p;
	p=DemiFil("graph",p.x,p.y,90,"black",i=false);
	PosRconv={x:p.x+40,y:p.y-20};
	p=Resistance("graph","Rconv",p.x,p.y,0,"black",v=false,i=false);
	
	if(cas){
	p=DemiFil("graph",p1.x,p1.y,-90,"black",i=false);
	PosRconv2={x:p.x+40,y:p.y-20};
	p=Resistance("graph","Rconv",p.x,p.y,0,"black",v=false,i=false);
	}

    ctx.fillStyle="blue";
	ctx.textAlign='left';
    ctx.fillText("Air ambiant",p.x+40,175);

}


function ajouterTexte(canvasId,texte,x,y){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.fillStyle="black";
    ctx.font="14px Arial";
    ctx.textAlign="center";

    ctx.fillText(texte,x,y);

}

function ajouterRect(canvasId,texte){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.fillStyle="black";
    ctx.font="14px Arial";
    ctx.textAlign="center";
	ctx.setLineDash([10,10]);
	
	ctx.beginPath();
    ctx.moveTo(370,90);
    ctx.lineTo(500,90);
	ctx.lineTo(500,240);
	ctx.lineTo(370,240);
	ctx.lineTo(370,90);
    ctx.stroke();
	

    ctx.fillText(texte,(500+370)/2,260);

}



// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo3";

let exo={

titre:"Refroidissement thermique d’un module IGBT",

enonce:`Un variateur de vitesse industriel utilise un module IGBT dissipant une puissance thermique de \\(${P}~W\\).<br><br>

La chaleur traverse :
<ul>
<li>une plaque aluminium ;</li>
<li>une pâte thermique ;</li>
<li>un dissipateur refroidi par convection naturelle.</li>
</ul>

Caractéristiques :
<ul>
<li>épaisseur aluminium : \\(${eAlu*1000}~mm\\)</li>
<li>surface aluminium : \\(${arrondi(SAlu*10000)}~cm²\\)</li>
<li>conductivité aluminium : \\(${lambdaAlu}~W.m^{-1}.K^{-1}\\)</li>
</ul>

<ul>
<li>épaisseur pâte thermique : \\(${ePate*1000}~mm\\)</li>
<li>conductivité pâte thermique : \\(${lambdaPate}~W.m^{-1}.K^{-1}\\)</li>
</ul>

<ul>
<li>coefficient convection : \\(${h}~W.m^{-2}.K^{-1}\\)</li>
<li>surface dissipateur : \\(${Sconv}~m²\\)</li>
</ul>

La température ambiante vaut \\(${Tamb}~°C\\).`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la résistance thermique de conduction de la plaque aluminium.",
reponse:Ralu,
unite:"K/W",
feedback:`\\(R_{th}=\\frac{e}{\\lambda S}\\)<br>
\\(R_{alu}=\\frac{${eAlu}}{${lambdaAlu}\\times${SAlu}}=${Ralu}~K/W\\)`,
action:function(){
    ajouterTexte("graph",`${Ralu} K/W`,PosRalu.x,PosRalu.y);
}
},

// =====================
{
texte:"Calculer la résistance thermique de la pâte thermique.",
reponse:Rpate,
unite:"K/W",
feedback:`\\(R_{th}=\\frac{e}{\\lambda S}\\)<br>
\\(R_{pate}=\\frac{${ePate}}{${lambdaPate}\\times${SPate}}=${Rpate}~K/W\\)`,
action:function(){
    ajouterTexte("graph",`${Rpate} K/W`,PosRpate.x,PosRpate.y);
}
},

// =====================
{
texte:"Calculer la résistance thermique de convection du dissipateur.",
reponse:Rconv,
unite:"K/W",
feedback:`\\(R_{conv}=\\frac{1}{hS}\\)<br>
\\(R_{conv}=\\frac{1}{${h}\\times${Sconv}}=${Rconv}~K/W\\)`,
action:function(){
    ajouterTexte("graph",`${Rconv} K/W`,PosRconv.x,PosRconv.y);
}
},

// =====================
{
texte:"Déterminer la résistance thermique totale avec un seul dissipateur.",
reponse:Rth,
unite:"K/W",
feedback:`Les résistances thermiques en série s’additionnent.<br>
\\(R_{th}=R_{alu}+R_{pate}+R_{conv}\\)<br>
\\(R_{th}=${Ralu}+${Rpate}+${Rconv}=${Rth}~K/W\\)`
},

// =====================
{
texte:"Calculer l’échauffement du module avec un seul dissipateur.",
reponse:DeltaT,
unite:"°C",
feedback:`\\(\\Delta T=P\\times R_{th}\\)<br>
\\(\\Delta T=${P}\\times${Rth}=${DeltaT}~°C\\)`
},

// =====================
{
texte:"Déterminer la température du module.",
reponse:Tcomp,
unite:"°C",
feedback:`\\(T=T_{amb}+\\Delta T\\)<br>
\\(T=${Tamb}+${DeltaT}=${Tcomp}~°C\\)`
},

// =====================
{
texte:"Deux dissipateurs identiques sont maintenant montés en parallèle. Déterminer la nouvelle résistance thermique de convection.",
reponse:Rconv2,
unite:"K/W",
feedback:`Deux résistances identiques en parallèle donnent :<br>
\\(R_{eq}=\\frac{R}{2}\\)<br>
\\(R_{conv2}=\\frac{${Rconv}}{2}=${Rconv2}~K/W\\)`,
action:function(){
	tracerSchemaThermique("graph",true);
    ajouterTexte("graph",`${Rconv} K/W`,PosRconv2.x,PosRconv2.y);
}
},

// =====================
{
texte:"Calculer la nouvelle résistance thermique totale.",
reponse:Rth2,
unite:"K/W",
feedback:`\\(R_{th}=R_{alu}+R_{pate}+R_{conv2}\\)<br>
\\(R_{th}=${Ralu}+${Rpate}+${Rconv2}=${Rth2}~K/W\\)`
},

// =====================
{
texte:"Calculer la nouvelle température du module.",
reponse:Tcomp2,
unite:"°C",
feedback:`\\(\\Delta T=P\\times R_{th}\\)<br>
\\(\\Delta T=${P}\\times${Rth2}=${DeltaT2}~°C\\)<br><br>

\\(T=${Tamb}+${DeltaT2}=${Tcomp2}~°C\\)`
},

// =====================
{
type:"texte",
texte:"Quel est l’intérêt de mettre deux dissipateurs en parallèle ?",
reponse:[
"réduire la résistance thermique",
"mieux refroidir",
"réduire la température"
],
feedback:`Deux dissipateurs en parallèle diminuent la résistance thermique globale et améliorent le refroidissement.`
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

    tracerSchemaThermique("graph",true);
	ajouterRect("graph",'Rconv2');

};