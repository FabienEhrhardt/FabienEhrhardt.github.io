// =====================
// PARAMÈTRES
// =====================

let a=Math.floor(Math.random()*8+-4)/2;


let b=Math.floor(Math.random()*8-4);


// Questions lecture
let xLecture, yLecture;
do{
    xLecture = Math.floor(Math.random()*7-3);
    yLecture = a*xLecture + b;
}
while(Math.abs(yLecture) > 4);

let xLecture2, yLecture2;
do{
    xLecture2 = Math.floor(Math.random()*7-3);
    yLecture2 = a*xLecture2 + b;
}
while((Math.abs(yLecture2) > 4)||(xLecture==xLecture2));

// Question calcul
let xCalc=Math.floor(Math.random()*5+7);
let yCalc=a*xCalc+b;

let xCalc2=Math.floor(-Math.random()*5-7);
let yCalc2=a*xCalc2+b;


// =====================
// CANVAS
// =====================

function f(t){
	return a*t+b;
}

// =====================
// EXERCICE
// =====================

let theme="0";
let nomExo="exo2";

let exo={

titre:"Fonction affine - Lecture graphique",

enonce:`La courbe ci-dessous représente une fonction affine.<br>
Répondre aux questions à partir du graphique.`,

courbe1:{},

questions:[

// =====================
{
texte:`Lire l'ordonnée pour x=${xLecture}.`,
reponse:yLecture,
feedback:`On lit directement sur le graphique : y=${yLecture}.`,
action:function(){
    tracerVerticale("graph", xLecture, 1, "blue");
}
},

// =====================
{
texte:`Déterminer une abscisse pour laquelle y=${yLecture2}.`,
reponse: xLecture2,
feedback:`On lit directement sur la droite : x=${xLecture2}.`,
action:function(){
    tracerHorizontale("graph", yLecture2, 1, "green");
}
},

// =====================
{
texte:"Déterminer le coefficient directeur de la droite.",
reponse:a,
feedback:`
On utilise deux points de la droite.<br>
a=(Δy)/(Δx)=(${yLecture2}-${yLecture})/(${xLecture2}-${xLecture})=${a}
`
},

// =====================
{
texte:"Déterminer l'ordonnée à l'origine.",
reponse:b,
feedback:`
La droite coupe l'axe des ordonnées pour x=0.<br>
On lit : b=${b}.
`
},

// =====================
{
texte:`Déterminer l'image de x=${xCalc}.`,
reponse:yCalc,
feedback:`
L'équation est : y=${a}x+(${b})<br>
y=${a}×${xCalc}+(${b})=${yCalc}
`
},

// =====================
{
texte:`Déterminer l'abscisse du point dont l'ordonnée vaut y=${yCalc2}.`,
reponse:xCalc2,
feedback:`
y=ax+b<br>
${yCalc2}=${a}x+(${b})<br>
x=${xCalc2}
`
}

]

};

// =====================
// LANCEMENT
// =====================

window.onload=function(){

    genererExercice(exo);
	initialisationGraph("graph");
	tracerEcran("graph");
	tracerCourbe("graph", f,  "red" );

    //tracerFonctionAffine("graph");

};