// =====================
// PARAMÈTRES
// =====================

// Constante de FEM (V.s.rad-1)
let kt=[0.8,0.9,1.0,1.1,1.2];

// Résistance induit (Ω)
let Rt=[0.3,0.4,0.5,0.6,0.8];



let R=Rt[Math.floor(Math.random()*Rt.length)];
let k=kt[Math.floor(Math.random()*kt.length)];
let Imax=Math.floor(Math.random()*9+1)*5;
let I1=Math.floor(Math.random()*8+1)/10*Imax;


// vitesse
let Nt=[500, 750,1000,1500,2000,3000];
let N=Nt[Math.floor(Math.random()*Nt.length)];
let w=arrondi(2*Math.PI/60*N);


// =====================
// CALCULS
// =====================

// FEM
let E=arrondi(k*w);
let V1=arrondi(E-R*I1);
let Rch1=arrondi(V1/I1);
let Rch2=Math.floor(Math.random()*9+1)*10;
let I2=arrondi(E/(R+Rch2));

// Couple
let T=arrondi(k*I2);

// =====================
// FONCTION PUISSANCE
// =====================

function fonction1(i){
	return E-R*i;
}


// =====================
// PARAMÈTRES COURBE
// =====================

let xmax = superarrondi(Imax);
let ymax1 = superarrondi(1.2*E); // en Nm
let ymax2 = superarrondi(1.2*E); // en Nm



// =====================
// CANVAS
// =====================

function schemaExo(canvasId){

const canvas=document.getElementById(canvasId);
const ctx=canvas.getContext("2d");


let x=400;
let y=280;

let p;

p=SourceV(canvasId,"E",x,y,90,"blue",false,true);
p=Resistance(canvasId,"R",p.x,p.y-80,0,"blue",false,false);

p=Fil(canvasId,p.x,p.y,0,"black",false);
p=Resistance(canvasId,"Rch",p.x,p.y,90,"black",true,false);
p=Fil(canvasId,p.x,p.y,180,"black",false);

p=Fil(canvasId,p.x,p.y,180,"blue",false);

}


// =====================
// EXERCICE
// =====================

let theme="7";
let nomExo="exo8";

let exo={

titre:"Générateur à courant continu - Modèle de Thévenin",

enonce:`

Une machine à courant continu tourne à la vitesse n=${N} tr/min fixe. Elle alimente une charge résistive variable \\(R_{ch}\\). La courbe U=f(I) du générateur est donnée ci dessous.
<br> On suppose que l'excitation est constante.`,

courbe1:{
    f: (n)=>fonction1(n),
    Nom: " U=f(I) (V)",
    axeX: "Courant i (A)",
    axeY: "Tension v (V)"
},

questions:[

//====================
{
texte:"Déterminer la valeur de force électromotrice du générateur.",
reponse:E,
unite:"V",
feedback:`C'est la tension pour lorsque le générateur est à vide, c'est à dire I=0. On trouve \\(E=${E}~V\\)`
},

//====================
{
texte:"Déterminer la constante du moteur k définie par \\(E=k \\Omega\\).",
reponse:k,
unite:"Vs",
feedback:`\\(\\Omega = \\frac{2 \\pi}{60} n=${w}\\) <br>
\\(k=\\frac{E}{\\Omega}=${k}~Vs\\)`
},

//====================
{
texte:"Déterminer la résistance de l'induit R.",
reponse:R,
unite:"\\(\\Omega\\)",
feedback:`On prends 2 points de la courbe. C'est lié à la pente de la droite \\(R=\\frac{\\Delta V}{\\Delta I}=${R}~\\Omega\\)`
},

//====================
{
texte:`Déterminer la résistance de charge pour obtenir un courant de I=${I1} A.`,
reponse:Rch1,
unite:"\\(\\Omega\\)",
feedback:`On trouve la tension V à l'aide de la courbe pour un courant de ${I1} A. On trouve V=${V1} V. La résistance est alors donnée par \\(R_{ch}=\\frac{V}{I}=${Rch1} \\Omega\\).`,
action : function(){
	tracerVerticale("graph", I1, 1, "black",false);
	tracerHorizontale("graph", V1, 1, "black",false);
	tracerPoint("graph", I1, V1,"F",1, "black");
} 
},

//====================
{
texte:`Déterminer le courant généré pour une résistance de charge de \\(R_{ch2}=${Rch2} \\Omega\\).`,
reponse:I2,
unite:"A",
feedback:`La tension E s'applique à l'ensemble des résistances \\(R\\) et \\(R_{ch2}\\) donc \\(I=\\frac{E}{R+R_{ch2}}=${I2}~A\\).`,
action : function(){
	tracerPoint("graph", I2, arrondi(E-R*I2),"F2",1, "black");
} 
},


//====================
{
texte:"Déterminer le couple moteur développé lorsque l'on place la résistance \\(R_{ch2}\\)",
reponse:T,
unite:"N.m",
feedback:`\\(T=kI=${arrondi(T)}~N.m\\)`
},

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){
initialisationGraph("graph",1);
tracerEcran("graph");
tracerCourbe("graph", fonction1, "U=f(I)", "blue", 1);
    
genererExercice(exo);

schemaExo("graph");

};