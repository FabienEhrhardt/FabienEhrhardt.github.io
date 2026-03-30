// =====================
// PARAMÈTRES
// =====================

// Débit max (m3/h)
let Qmax = (Math.floor(Math.random()*5)+5)*10; // 50 à 90

// HMT max (m)
let Hmax = (Math.floor(Math.random()*3)+4)*10; // 40 à 60

// Loi de pompe (approx parabole)
function HMT(Q){
    return Hmax * (1 - Math.pow(Q/Qmax,2));
}
let xmax=superarrondi(1.1*Qmax);
let ymax1=superarrondi(1.1*Hmax);
let ymax2=100;



// Point de test
let Qtest = Math.floor(Math.random()*8+1)/10*Qmax;
let Htest = HMT(Qtest);
// Point de test
let Qtest2 = Math.floor(Math.random()*19+1)/20*Qmax;
let Htest2 = HMT(Qtest2);

// =====================
// EXERCICE
// =====================

let theme="42";
let nomExo="exo2";

let exo={

titre:"Pompe centrifuge - Courbe HMT = f(Q)",

enonce:`Une pompe centrifuge a une hauteur manométrique maximale de ${Hmax} m pour un débit nul.
On considère sa caractéristique donnée par la courbe ci-dessous.`,

courbe1:{
    f: HMT,
    Nom: "HMT(Q)",
    axeX: "Débit Q (m³/h)",
    axeY: "HMT (m)"
},

questions:[

// =====================
{
texte:"Donner la HMT pour un débit nul",
reponse:Hmax,
unite:"m",
feedback:`À débit nul, la pompe fournit sa hauteur maximale : ${Hmax} m`,

action:function(){
    tracerPoint("graph", 0, Hmax, "Q=0", 1, "red");
}
},

// =====================
{
texte:`Donner le débit pour une HMT nulle`,
reponse:Qmax,
unite:"m³/h",
feedback:`Lorsque HMT=0, on a le débit maximal : ${Qmax} m³/h`,

action:function(){
    tracerPoint("graph", Qmax, 0, "Qmax", 1, "blue");
}
},

// =====================
{
texte:`Calculer la HMT pour un débit de ${Qtest} m³/h`,
reponse:Htest,
unite:"m",
feedback:`Par lecture graphique, on trouve : \\(H \\approx ${arrondi(Htest)} m\\)`,

action:function(){
    tracerPoint("graph", Qtest, Htest, "Pt1", 1, "green");
}
},

// =====================
{
texte:`Pour quel débit la HMT vaut ${arrondi(Htest2)} m ?`,
reponse:Qtest,
unite:"m³/h",
feedback:`Lecture graphique ou inversion → \\(Q \\approx ${Qtest2} m^3/h\\)`,

action:function(){
    tracerHorizontale("graph", Htest2, 1, "orange");
}
},

// =====================
{
texte:"La pompe peut-elle fournir 70 m de HMT ?",
reponse: (70 > Hmax) ? 0 : 1,
unite:"(1=oui, 0=non)",
feedback:`La HMT max est ${Hmax} m → ${Hmax<70 ? "impossible" : "possible"}` 
},

// =====================
{
texte:`Calculer la HMT pour un débit de ${arrondi(0.8*Qmax)} m³/h`,
reponse:HMT(0.8*Qmax),
unite:"m",
feedback:`H diminue fortement quand Q augmente (loi quadratique)`
},

// =====================
{
texte:"Décrire l’évolution de la HMT quand le débit augmente (1=croît, 0=décroît)",
reponse:0,
unite:"",
feedback:`Dans une pompe centrifuge, la HMT diminue quand le débit augmente`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    initialisationGraph("graph",2);
    tracerEcran("graph");
    tracerCourbe("graph", exo.courbe1.f, exo.courbe1.Nom, "blue", 1);
    genererExercice(exo);
};