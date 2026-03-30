// =====================
// PARAMÈTRES
// =====================

//Composants
let R = (Math.floor(Math.random()*100)+1)*5; //Ohm
let L = (Math.floor(Math.random()*100)+1)*2; //mH
let C = (Math.floor(Math.random()*100)+1)*2; //µF
let f=50; //Hz
let w=2*3.14159*f;
let V= (Math.floor(Math.random()*6)+1)*50;
let i=(Math.floor(Math.random()*3)); 
let Z, phi,comp,comp_unit, val, P, Q;
switch(i){
	case 0: //Résistance
		val=R;
		Z=R;
		phi=0;
		comp="une résistance";
		comp_unit="\\(\\Omega\\)";
		P=V*V/Z;
		Q=0;
		
	break;
	
	case 1: //Bobine
		val=L;
		Z=L*w/1000;
		phi=90;
		comp="une bobine";
		comp_unit="\\(mH\\)";
		P=0;
		Q=V*V/Z;
	break;
	
	case 2: //Condensateur
		val=C;
		Z=1/C/w*1e6;
		phi=-90;
		comp="un condensateur";
		comp_unit="\\(\\mu F\\)";	
		P=0;
		Q=-V*V/Z;
	break;
}
let I=V/Z;
let S=V*I;
let Fp=P/S;


// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo7";

let exo={

titre:"Etude des composants élémentaires R, L et C en régime sinusoïdal",

enonce:`Le composant choisi est ${comp} de valeur ${val} ${comp_unit} alimenté par une tension sinusoïdale monophasé de V=${V}V - 50Hz.`,

questions:[

// =====================
{
texte:"Calculer l'impédance du composant",
reponse:Z,
unite:"\\(\\Omega\\)",
feedback:`\\(Z=${arrondi(Z)}\\Omega\\)<br>
  <table class="feedback-table">
<tr>
  <th>Type de composant</th>
  <th>Impédance \\(Z\\)</th>
</tr>
<tr>
  <td>Résistance</td>
  <td>\\(Z=R\\)</td>
</tr>
<tr>
  <td>Bobine</td>
  <td>\\(Z=L \\omega \\)</td>
</tr>
<tr>
  <td>Condensateur</td>
  <td>\\(C=\\frac{1}{C \\omega}\\)</td>
</tr>
</table>
`},

// =====================
{
texte:"Déterminer le déphasage pour le composant",
reponse:phi,
unite:"°",
feedback:`\\(\\varphi=${arrondi(phi)}\\°\\) <br>
<table class="feedback-table">
<tr>
  <th>Type de composant</th>
  <th>Déphasage \\(\\varphi\\)</th>
</tr>
<tr>
  <td>Résistance</td>
  <td>\\(\\varphi=0\\)°</td>
</tr>
<tr>
  <td>Bobine</td>
  <td>\\(\\varphi=90\\)°</td>
</tr>
<tr>
  <td>Condensateur</td>
  <td>\\(\\varphi=-90\\)°</td>
</tr>
</table>`},

// =====================
{
texte:"Déterminer le courant consommé",
reponse:I,
unite:"A",
feedback:`\\(I=\\frac{V}{Z}=${arrondi(I)}\\;A\\)`},

// =====================
{
texte:"Déterminer la puissance active",
reponse:P,
unite:"W",
feedback:`\\(P=${arrondi(P)}\\;W\\)<br>
<table class="feedback-table">
<tr>
  <th>Type de composant</th>
  <th>Puissance active \\(P\\)</th>
</tr>
<tr>
  <td>Résistance</td>
  <td>\\(P=R I^2=\\frac{V^2}{R}\\)</td>
</tr>
<tr>
  <td>Bobine</td>
  <td>\\(P=0 W\\)</td>
</tr>
<tr>
  <td>Condensateur</td>
  <td>\\(P=0 W\\)</td>
</tr>
</table>`},

// =====================
{
texte:"Déterminer la puissance réactive",
reponse:Q,
unite:"var",
feedback:`\\(Q=${arrondi(Q)}\\;var\\)<br>
<table class="feedback-table">
<tr>
  <th>Type de composant</th>
  <th>Puissance réactive \\(Q\\)</th>
</tr>
<tr>
  <td>Résistance</td>
  <td>\\(Q= 0 var\\)</td>
</tr>
<tr>
  <td>Bobine</td>
  <td>\\(Q=L \\omega I^2=\\frac{V^2}{L\\omega}\\)</td>
</tr>
<tr>
  <td>Condensateur</td>
  <td>\\(Q=-\\frac{1}{C\\omega}I^2=-C \\omega V^2\\)</td>
</tr>
</table>`},

// =====================
{
texte:"Déterminer la puissance apparente",
reponse:S,
unite:"VA",
feedback:`\\(S=VI=${arrondi(S)}\\;VA\\)`},


// =====================
{
texte:"Déterminer le facteur de puissance",
reponse:Fp,
unite:"",
feedback:`\\(Fp=\\frac{P}{S}=${arrondi(Fp)}\\)<br>
<table class="feedback-table">
<tr>
  <th>Type de composant</th>
  <th>Facteur de puissance \\(Fp\\)</th>
</tr>
<tr>
  <td>Résistance</td>
  <td>\\(Fp=1\\)</td>
</tr>
<tr>
  <td>Bobine</td>
  <td>\\(Fp=0\\)</td>
</tr>
<tr>
  <td>Condensateur</td>
  <td>\\(Fp=0\\)</td>
</tr>
</table>`},

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};