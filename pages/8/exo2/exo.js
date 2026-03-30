// =====================
// PARAMÈTRES
// =====================

// Capteur de pression (exemple)
let Pmin = 0;     // bar
let Pmax = (Math.floor(Math.random()*5)+5)*10; // 50 à 90 bar

let Imin = 4;
let Imax = 20;

// Pente
let a = (Imax - Imin)/(Pmax - Pmin);

// Point de fonctionnement
let Ptest = Math.floor(Math.random()*Pmax);
let Itest = Imin + a*(Ptest - Pmin);

// Point de fonctionnement 2
let Ptest2 = Math.floor(Math.random()*Pmax);
let Itest2 = arrondi(Imin + a*(Ptest2 - Pmin));



// =====================
// FONCTION COURBE
// =====================

function fonctionCapteur(P){
   return Imin + a*(P - Pmin);
}



let xmax=superarrondi(Pmax); // pixels par seconde
let ymax1=22; // pixels par unité 1
let ymax2=100; //pixels par unité 2

// =====================
// EXERCICE
// =====================

let theme="8";
let nomExo="exo2";

let exo={

titre:"Capteur 4-20 mA - Étalonnage",

enonce:`Un capteur de pression délivre un signal 4-20 mA pour une plage de ${Pmin} à ${Pmax} bar.`,

// 👉 COURBE
courbe1:{
    f: fonctionCapteur,
    axeX: "Pression en bar",
	axeY: "Courant en mA",
	nom: "I(P) en mA",
    ymax: 22
},

questions:[

// =====================
{
texte:"Donner le courant pour une pression nulle",
reponse:Imin,
unite:"mA",
feedback:`Un capteur 4-20 mA délivre toujours \\(I_{min}=4 mA\\)`
},

// =====================
{
texte:"Donner le courant pour la pression maximale",
reponse:Imax,
unite:"mA",
feedback:`\\(I_{max}=20 mA\\)`
},

// =====================
{
texte:"Calculer la pente de la caractéristique",
reponse:a,
unite:"mA/bar",
feedback:`\\(a=\\frac{20-4}{${Pmax}-${Pmin}}=${arrondi(a)} mA/bar\\)`
},

// =====================
{
texte:`Calculer le courant pour une pression de ${Ptest} bar`,
reponse:Itest,
unite:"mA",
feedback:`\\(I=4 + aP = 4 + ${arrondi(a)} \\times ${Ptest} = ${arrondi(Itest)} mA\\)`,

// 👉 affichage du point
action:function(){
	tracerPoint("graph", Ptest, Itest,"A",1, "red");
	tracerVerticale("graph", Ptest, 1, "red");
}
},

// =====================
{
texte:`Déterminer la pression pour un courant de ${arrondi(Itest2)} mA`,
reponse:Ptest2,
unite:"bar",
feedback:`\\(P=\\frac{I-4}{a}=${Ptest2} bar\\)`,

action:function(){
	tracerPoint("graph", Ptest2, Itest2,"B",1, "green");
	tracerHorizontale("graph", Itest2, 1, "green");
}
},

// =====================
{
texte:`Le capteur est branché sur une résistance de 500 \\(\\Omega\\) pour convertir le signal en 0-10 V. Que vaut alors la tension sur la résistance pour une pression de ${Ptest} bar.`,
reponse:(500*Itest),
unite:"V",
feedback:`\\(V=R \\times I_{mes}=${arrondi((500*Itest/1000))} V\\) <br>
<table class="feedback-table">
<tr>
  <th>Type de capteur</th>
  <th>0-10 V</th>
  <th>4-20 mA</th>
</tr>
<tr>
  <td>Avantages</td>
  <td>Simplicité, moins cher</td>
  <td>Pas de pertes de signal, détection de fil coupé (0 mA = fil coupé!) </td>
</tr>
<tr>
  <td>Inconvénients</td>
  <td>Chute de tension, sensible aux parasites</td>
  <td>plus cher, exploitation un peu plus complexe</td>
</tr>
</table>
`,
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
genererExercice(exo);
initialisationGraph("graph",2);
tracerEcran("graph");
tracerCourbe("graph", exo.courbe1.f, exo.courbe1.nom, "black",1);

};