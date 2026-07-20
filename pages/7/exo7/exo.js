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
let Nt=[500, 750,1000,1500,2000,3000];
let N=Nt[Math.floor(Math.random()*Nt.length)];
let w=2*Math.PI/60*N;



// =====================
// CALCULS
// =====================

// FEM
let E=k*w;
while(E>U){U=2*U;} 


// courant
let I=(U-E)/R;

// Couple
let T=k*I;
let N0=60/2/Math.PI*(R*T/k/k)+N;

// Couple résistant
let Tr=T*Math.floor(Math.random()*8+1)/10;

// vitesse au point de fonctionnement
let wf=(U-R*Tr/k)/k;
let Nf=60/2/Math.PI*wf;
// vitesse au point de fonctionnement
let wf2=(0.75*U-R*Tr/k)/k;
let Nf2=60/2/Math.PI*wf2;

// =====================
// FONCTION PUISSANCE
// =====================

function fonction1(n){
	return k*U/R-k*k/R*n*2*Math.PI/60;
}

function fonction2(n){
	return k*0.75*U/R-k*k/R*n*2*Math.PI/60;
}

// =====================
// PARAMÈTRES COURBE
// =====================

let xmax = superarrondi(1.1*N0);
let ymax1 = superarrondi(1.2*T); // en Nm
let ymax2 = superarrondi(1.2*T); // en Nm

// =====================
// EXERCICE
// =====================

let theme="7";
let nomExo="exo7";

let exo={

titre:"Machine à courant continu - Courbe C=f(n)",

enonce:`Une machine à courant continu est alimentée sous sa tension nominale

\\(U=${U}~V\\)

La résistance de l'induit vaut \\(R=${R}~\\Omega\\).

La constante de la machine vaut \\(k=${k}~V \\cdot s \\). 

La vitesse nominale du moteur est de  \\(n=${N}~tr/min\\)`,

courbe1:{
    f: (n)=>fonction1(n),
    Nom: "Couple (Nm)",
    axeX: "vitesse de rotation (tr/min)",
    axeY: "Couple (Nm)"
},

questions:[

// =====================
{
texte:"Déterminer la vitesse de rotation nominale en rad/s",
reponse:w,
unite:"rad/s",
feedback:`\\(\\Omega=\\frac{2 \\pi}{60} n=${arrondi(w)} rad/s\\)`
},

// =====================
{
texte:"A l'aide de la courbe, déterminer le couple nominal du moteur",
reponse:T,
unite:"Nm",
feedback:`On lit le couple pour une vitesse égale à la vitesse nominale \\(T_n=${arrondi(T)}~Nm\\).`,
action : function(){
	tracerHorizontale("graph", arrondi(T), 1, "black",false);
	tracerVerticale("graph", N, 1, "black",false);
	tracerHorizontale("graph", arrondi(Tr), 1, "red");
} 
},

// =====================
{
texte:"L'allure du couple résistant est tracé en rouge, déterminer alors la vitesse de rotation.",
reponse:Nf,
unite:"tr/min",
feedback:`On regarde l'intersection entre la courbe du moteur en bleu et la courbe du couple résistant en rouge et on trouve une vitesse de \\(n_F=${arrondi(Nf)}~tr/min\\).`,
action : function(){
	tracerVerticale("graph", arrondi(Nf), 1, "black",false);
	tracerPoint("graph", Nf, Tr,"F",1, "black");
}  
},

// =====================
{
type:"texte",
texte:"Que se passe-t-il si on baisse la tension pour une même charge ?",
reponse:["ralenti"],
unite:"",
feedback:`Si la tension baisse le moteur ralenti`,
action : function(){
	tracerCourbe("graph", fonction2, "U<Un", "green", 2);
}
},

// =====================
{
texte:"L'allure du couple moteur pour une tension plus faible est donnée en vert. Donner la nouvelle vitesse de rotation.",
reponse:Nf2,
unite:"tr/min",
feedback:`On regarde l'intersection entre la courbe du moteur en vert et la courbe du couple résistant en rouge et on trouve une vitesse de \\(n_{F2}=${arrondi(Nf2)}~tr/min\\).`,
action : function(){
	tracerVerticale("graph", arrondi(Nf2), 1, "black");
	tracerPoint("graph", Nf2, Tr,"F2",1, "black",false);
}  
},


]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    initialisationGraph("graph",1);
    tracerEcran("graph");
    tracerCourbe("graph", exo.courbe1.f, exo.courbe1.Nom, "blue", 1);
    genererExercice(exo);
};