
// =====================
// PARAMÈTRES
// =====================

// Génération

let U=Math.floor(Math.random()*9+1)*2.5;
let R1=[100,220,330,460,690,1000,2200,3300][Math.floor(Math.random()*8)];
let R2=[100,220,330,460,690,1000,2200,3300][Math.floor(Math.random()*8)];
let R3=[100,220,330,460,690,1000,2200,3300][Math.floor(Math.random()*8)];
// Courant
let Req=R1*R2/(R1+R2);
let Reqt=Req+R3;

let I=U/Reqt;
let U3=R3*I;
let U1=U-U3;
let I1=U1/R1;
let I2=U1/R2;
let I3=I;
let Pg=U*I;
let P1=U1*I1;

// =====================
// SCHEMA
// =====================
function schema(){
	let p={x:60,y:200};
	let p2;
	SourceV("graph","U",p.x,p.y,90,"black",v=false,i=false);
	p=Resistance("graph","R3",p.x,p.y,0,"black",v=true,i=true);
	p2=p;
	p=Resistance("graph","R1",p.x,p.y,90,"black",v=true,i=true);
	p=Fil("graph",p.x,p.y,180,"black",i=false);
	p=Fil("graph",p2.x,p2.y,0,"black",i=false);
	p=Resistance("graph","R2",p.x,p.y,90,"black",v=true,i=true);
	p=Fil("graph",p.x,p.y,180,"black",i=false);
	
}




// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo24";

let exo={

titre:"Régime continu : association de résistances 3",

enonce:`On étudie le montage ci-dessous. Les données sont :
<ul>
<li>tension U=${U} V;</li>
<li>Résistance 1 R1=${R1} \\(\\Omega\\);</li>
<li>Courant  IR2=${arrondi(I2*1000)} \\(mA\\);</li> 
<li>Tension  UR3=${arrondi(U3)} \\(V\\);</li> `,

courbe1:{},
questions:[

// ==================================================
// QUESTION 1
// ==================================================

{
texte:`Calculer la tension sur la résistance R1`,
reponse:U1,
unite:"\\(V\\)",
feedback:`
A l'aide d'une loi des mailles, on a \\(U=U_{R1}+U_{R3}\\)<br>
Donc \\(U_{R1}=U-U_{R3}=${arrondi(U1)} V\\)
`
},

// ==================================================
// QUESTION 2
// ==================================================

{
texte:`Calculer la tension sur la résistance R2`,
reponse:U1,
unite:"\\(V\\)",
feedback:`
A l'aide d'une loi des mailles, on a \\(U_{R1}-U_{R2}=0\\)<br>
Donc \\(U_{R2}=U_{R1}=${arrondi(U1)} V\\)
`
},


// ==================================================
// QUESTION 4
// ==================================================

{
texte:`Calculer le courant dans la résistance R1`,
reponse:arrondi(I1*1000),
unite:"mA",
feedback:`
Encore la loi d'Ohm! \\(I_{R1}=\\frac{U_{R1}}{R_1}=${arrondi(I1*1000)} mA\\)
`
},

// ==================================================
// QUESTION 5
// ==================================================

{
texte:`Calculer la résistance R2`,
reponse:R2,
unite:"\\(\\Omega\\)",
feedback:`
Encore la loi d'Ohm! \\(R_2=\\frac{U_{R2}}{I_{R2}}=${R2} \\Omega\\)
`
},

// ==================================================
// QUESTION 5
// ==================================================

{
texte:`Calculer le courant dans la résistance R3`,
reponse:I3*1000,
unite:"\\(mA\\)",
feedback:`
On utilise la loi des noeuds \\(I_{R3}=I_{R1}+I_{R2}=${arrondi(I3*1000)} mA\\)
`
},




// ==================================================
// QUESTION 
// ==================================================

{
texte:`Calculer la résistance équivalente du montage`,
reponse:Reqt,
unite:"\\(\\Omega\\)",
feedback:`
On utilise : <br>
soit la loi d'Ohm \\(R_{eq}=\\frac{U}{I_{R3}}=${arrondi(Reqt)} \\Omega\\)
Soit la composition des résistances : <br>
R1 est en parallèle avec R2 donc \\(R_{eq1}=\\frac{R_1R_2}{R_1+R_2}=${arrondi(Req)} \\Omega \\) <br>
R3 est en série avec \\(R_{eq1}\\) donc \\(R_{eq}=R_3+R_{eq1}=${arrondi(Reqt)} \\Omega\\).
`
},


// ==================================================
// QUESTION 7
// ==================================================

{
texte:`Déterminer la puissance fournie par le générateur.`,
reponse:arrondi(Pg),
unite:"W",
feedback:`
La puissance en continu : \\(P=UI=${arrondi(Pg)} W\\).
`
},


// ==================================================
// QUESTION 8
// ==================================================

{
texte:`Déterminer la puissance dissipée par la résistance R1.`,
reponse:arrondi(P1),
unite:"mW",
feedback:`
Dans la résistance R1: \\(P=R_1I^2=\\frac{U^2_1}{R_1}=${arrondi(P1)} W=${arrondi(P1*1000)} mW\\) 
`
},



]

};


// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

genererExercice(exo);
schema();

};