
// =====================
// PARAMÈTRES
// =====================

// Génération

let U=Math.floor(Math.random()*9+1)*2.5;
let R1=[100,220,330,460,690,1000,2200,3300][Math.floor(Math.random()*8)];
let R2=[100,220,330,460,690,1000,2200,3300][Math.floor(Math.random()*8)];
// Courant
let Req=R1+R2;
let I=U/Req;
let U1=R1*I;
let U2=R2*I;
let Pg=U*I;
let P1=U1*I;

// =====================
// SCHEMA
// =====================
function schema(){
	let p={x:60,y:200};
	SourceV("graph","U",p.x,p.y,90,"black",v=false,i=false);
	p=Fil("graph",p.x,p.y,-90,"black",i=true);
	p=Fil("graph",p.x,p.y,0,"black",i=false);
	p=Resistance("graph","R1",p.x,p.y,90,"black",v=true,i=false);
	p=Resistance("graph","R2",p.x,p.y,90,"black",v=true,i=false);
	p=Fil("graph",p.x,p.y,180,"black",i=false);
	
}




// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo22";

let exo={

titre:"Régime continu : association de résistances 1",

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
reponse:["série"],
unite:"",
feedback:`
Les résistances sont cablées en série.
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
Les résistances sont cablées en série donc \\(R_{eq}=R_1+R_2=${Req} \\Omega \\).
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
texte:`Calculer la tension sur la résistance R1`,
reponse:arrondi(U1),
unite:"V",
feedback:`
Encore la loi d'Ohm! \\(U_{R1}=R_1 I=${arrondi(U1)} V\\)
`
},


// ==================================================
// QUESTION 5
// ==================================================

{
texte:`Calculer la tension sur la résistance R2`,
reponse:arrondi(U2),
unite:"V",
feedback:`
Encore la loi d'Ohm! \\(U_{R2}=R_2 I=${arrondi(U2)} V\\)
`
},


// ==================================================
// QUESTION 6
// ==================================================

{
type:"texte",
texte:`Sur quelle résistance est la tension la plus grande? (On veut une réponse générale)`,
reponse:["grande","élevée"],
unite:"",
feedback:`
La chute de tension est la plus importante sur la résistance la plus grande.
`
},

// ==================================================
// QUESTION 3
// ==================================================

{
texte:`Retrouver U à l'aide d'une loi des mailles.`,
reponse:U,
unite:"V",
feedback:`
On utilise la loi des mailles : \\(U=U_1+U_2=${U} V\\)
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