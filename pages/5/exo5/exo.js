// =====================
// PARAMÈTRES
// =====================

// Durées
let t1 = (Math.floor(Math.random()*3)*10+10); // accélération (s)
let t2 = (Math.floor(Math.random()*5)*10+10); // vitesse constante (s)
let t3 = (Math.floor(Math.random()*2)*10+10); // freinage (s)
let ttot = t1 + t2 + t3;

// Puissances
let Pacc = (Math.floor(Math.random()*3)+20)*1000; // 20 à 40 kW
let Pconst = (Math.floor(Math.random()*3)+10)*1000; // 10 à 20 kW
let Precup = (Math.floor(Math.random()*3)+5)*1000; // 5 à 15 kW (récupération)

// Rendement récupération
let eta = (Math.floor(Math.random()*20)+60)/100;

// =====================
// FONCTION PUISSANCE
// =====================

function fonction1(t){
	if(t < t1) return Pacc;
	else if(t < t1 + t2) return Pconst;
	else if(t < ttot) return -Precup;
	else return 0;
}

// =====================
// ÉNERGIES
// =====================

// Énergie consommée (Wh)
let Eacc = Pacc * t1 / 3600;
let Econst = Pconst * t2 / 3600;

// Énergie récupérée (Wh)
let Erecup = Precup * t3 / 3600 * eta;

// Énergie totale
let Etot = Eacc + Econst - Erecup;

// =====================
// PARAMÈTRES COURBE
// =====================

let xmax = ttot;
let ymax1 = superarrondi(Pacc/1000); // en kW
let ymax2 = 100;

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo5";

let exo={

titre:"Cycle de conduite et récupération d’énergie",

enonce:`On étudie un véhicule électrique sur un cycle de conduite.
La courbe représente la puissance échangée avec la batterie.<br>
- Accélération : ${t1} s à \\(P_1 \\) <br>
- Vitesse constante : ${t2} s à \\(P_2= \\)${Pconst/1000} kW <br>
- Freinage : ${t3} s avec récupération de \\(P_3= \\)${Precup/1000} kW <br>
Le rendement de récupération est de ${eta*100} %.`,

courbe1:{
    f: (t)=>fonction1(t)/1000,
    Nom: "Puissance (kW)",
    axeX: "Temps (s)",
    axeY: "Puissance (kW)"
},

questions:[

// =====================
{
texte:"Lire sur la courbe la puissance en phase d’accélération",
reponse:Pacc/1000,
unite:"kW",
feedback:`Lecture directe : ${arrondi(Pacc/1000)} kW`
},

// =====================
{
texte:"Calculer l’énergie consommée pendant l’accélération",
reponse:Eacc,
unite:"Wh",
feedback:`\\(E=P \\times \\Delta t=${arrondi(Eacc)}\\;Wh\\)<br>
Attention à bien prendre le temps en heures (on divise par 3600!)`
},

// =====================
{
texte:"Calculer l’énergie consommée à vitesse constante",
reponse:Econst,
unite:"Wh",
feedback:`\\(E=P \\times \\Delta t=${arrondi(Econst)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer l’énergie récupérée au freinage",
reponse:Erecup,
unite:"Wh",
feedback:`\\(E_{rec}=P \\times \\Delta t \\times \\eta=${arrondi(Erecup)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer l’énergie totale consommée sur le cycle",
reponse:Etot,
unite:"Wh",
feedback:`\\(E_{tot}=E_{acc}+E_{const}-E_{rec}=${arrondi(Etot)}\\;Wh\\)`
},

// =====================
{
texte:"Indiquer le temps du début de la phase de récupération",
reponse:t1+t2,
unite:"s",
feedback:`La zone négative correspond à la récupération, donc on se place au début de la recharge`,
action:function(){
    tracerVerticale("graph", t1+t2, 1, "red");
	tracerPoint("graph", t1+t2, 0,'trecup',1, "red");
}
},

// =====================
{
texte:"Quel est l’intérêt de la récupération d’énergie ? (1=réduire consommation, 2=augmenter puissance, 3=réduire tension)",
reponse:1,
unite:"",
feedback:`Elle permet de récupérer une partie de l’énergie au freinage`
}

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