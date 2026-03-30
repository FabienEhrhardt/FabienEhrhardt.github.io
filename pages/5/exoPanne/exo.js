// =====================
// PARAMÈTRES
// =====================

// Batterie
let U = 24; // V
let C = (Math.floor(Math.random()*3)+70); // 70 à 90 Ah

// Installation
let P = (Math.floor(Math.random()*4)+300); // 300 à 600 W

// Mesures relevées
let Umes = (Math.random()>0.5)? U : U - 4; // tension OK ou chute
let Imes = P / Umes;
let t_theorique = (U * C) / P;
let t_reel = t_theorique * (Math.random()*0.5 + 0.3); // autonomie dégradée

// Cas de panne (caché)
let panne;
if (Umes < U - 2) panne = "batterie déchargée ou défectueuse";
else if (t_reel < 0.6 * t_theorique) panne = "batterie vieillissante (capacité réduite)";
else panne = "fonctionnement normal";

// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo_diagnostic_batterie";

let exo={

titre:"Diagnostic d’une panne sur un système de secours",

enonce:`Une installation de secours fonctionne sous ${U} V avec une batterie de ${C} Ah.
Elle alimente une charge de ${P} W.

Lors d’un test, on relève :
- Tension batterie : ${arrondi(Umes)} V
- Courant : ${arrondi(Imes)} A
- Autonomie réelle : ${arrondi(t_reel)} h

L’autonomie théorique attendue est de ${arrondi(t_theorique)} h.`,

questions:[

// =====================
{
texte:"Calculer le courant théorique consommé",
reponse:P/U,
unite:"A",
feedback:`\\(I=\\frac{P}{U}=${arrondi(P/U)}\\;A\\)`
},

// =====================
{
texte:"Calculer l’autonomie théorique",
reponse:t_theorique,
unite:"h",
feedback:`\\(t=\\frac{U \\times C}{P}=${arrondi(t_theorique)}\\;h\\)`
},

// =====================
{
texte:"Comparer courant mesuré et théorique : y a-t-il une anomalie ? (1=oui, 0=non)",
reponse:(Math.abs(Imes - P/U) > 1)?1:0,
unite:"",
feedback:`Comparer les deux valeurs`
},

// =====================
{
texte:"Comparer autonomie réelle et théorique : y a-t-il une anomalie ? (1=oui, 0=non)",
reponse:(t_reel < 0.7*t_theorique)?1:0,
unite:"",
feedback:`Une autonomie trop faible indique un problème`
},

// =====================
{
texte:"La tension mesurée est-elle normale ? (1=oui, 0=non)",
reponse:(Umes >= U-1)?1:0,
unite:"",
feedback:`Une chute de tension est anormale`
},

// =====================
{
texte:"Identifier le type de panne : 1=batterie déchargée, 2=batterie vieillissante, 3=fonctionnement normal",
reponse:(panne==="batterie déchargée ou défectueuse")?1:(panne==="batterie vieillissante (capacité réduite)")?2:3,
unite:"",
feedback:`${panne}`
},

// =====================
{
texte:"Quelle action recommander ? (1=recharger/remplacer batterie, 2=augmenter puissance, 3=réduire tension)",
reponse:1,
unite:"",
feedback:`Vérifier ou remplacer la batterie`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};