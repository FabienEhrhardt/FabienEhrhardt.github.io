
// =====================
// PARAMÈTRES
// =====================

// Génération

let U=Math.floor(Math.random()*9+1)*2.5;
let R1=[100,220,330,460,690,1000,2200,3300][Math.floor(Math.random()*8)];
let R2=[100,220,330,460,690,1000,2200,3300][Math.floor(Math.random()*8)];
// Courant
let Req=R1*R2/(R1+R2);
let I=U/Req;
let I1=U/R1;
let I2=U/R2;
let Pg=U*I;
let P1=U*I1;

// =====================
// SCHEMA
// =====================
function schema(){
	let p={x:60,y:200};
	let p2;
	SourceV("graph","U",p.x,p.y,90,"black",v=false,i=false);
	p=Fil("graph",p.x,p.y,0,"black",i=true);
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
let nomExo="exo23";

let exo={

titre:"Régime continu : association de résistances 2",

enonce:`On étudie le montage ci-dessous. Les données sont :
<ul>
<li>tension U=${U} V;</li>
<li>Résistance 1 R1=${R1} \\(\\Omega\\);</li>
<li>Résistance 2 R2=${R2} \\(\\Omega\\);</li> `,

courbe1:{},
questions:[


// ==================================================
// QUESTION 1
// ==================================================

{
type:"texte",
texte:`Comment sont cablées les résistances ?`,
reponse:["parallèle"],
unite:"",
feedback:`
Les résistances sont cablées en parallèle.
`
},


// ==================================================
// QUESTION 2
// ==================================================

{
texte:`Calculer la résistance équivalente du montage`,
reponse:Req,
unite:"\\(\\Omega\\)",
feedback:`
Les résistances sont cablées en parallèle donc \\(R_{eq}=\\frac{R_1R_2}{R_1+R_2}=${Req} \\Omega \\).
On peut également \\(\\frac{1}{R_{eq}}=\\frac{1}{R_{1}}+\\frac{1}{R_{2}}\\)
`
},


// ==================================================
// QUESTION 3
// ==================================================

{
texte:`En déduire le courant fourni par le générateur.`,
reponse:arrondi(I*1000),
unite:"mA",
feedback:`
On utilise la loi d'Ohm \\(U=RI\\).<br>
Donc : \\(I=\\frac{U}{R_{eq}}=${arrondi(I*1000)} mA\\)
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
Encore la loi d'Ohm! \\(I_{R1}=\\frac{U}{R_1}=${arrondi(I1*1000)} mA\\)
`
},


// ==================================================
// QUESTION 5
// ==================================================

{
texte:`Calculer le courant dans la résistance R2`,
reponse:arrondi(I2*1000),
unite:"mA",
feedback:`
Encore la loi d'Ohm! \\(I_{R2}=\\frac{U}{R_2}=${arrondi(I2*1000)} mA\\)
`
},


// ==================================================
// QUESTION 6
// ==================================================

{
type:"texte",
texte:`Dans quelle résistance est le courant le plus grand? (On veut une réponse générale)`,
reponse:["petite","faible"],
unite:"",
feedback:`
Le courant circule principalement dans la résistance la plus faible.
`
},

// ==================================================
// QUESTION 3
// ==================================================

{
texte:`Retrouvez I à l'aide d'une loi des noeuds`,
reponse:arrondi(I*1000),
unite:"mA",
feedback:`
On utilise la des noeuds : <br>
\\(I=I_1+I_2=${arrondi(I*1000)} mA\\)
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
La puissance en continu : \\(P=UI=${Pg} W\\).
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