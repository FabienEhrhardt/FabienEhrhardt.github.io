// =====================
// PARAMÈTRES
// =====================

// Données de la centrale
let Pcomb=Math.floor(Math.random()*6+10)*10; // MW
let etaChaudiere=[0.88,0.90,0.92][Math.floor(Math.random()*3)];
let etaTurbine=[0.38,0.40,0.42][Math.floor(Math.random()*3)];
let etaAlternateur=[0.94,0.96,0.98][Math.floor(Math.random()*3)];

let Ptherm=Pcomb*etaChaudiere;
let Pmec=Ptherm*etaTurbine;
let Pelec=Pmec*etaAlternateur;

let pertesChaudiere=Pcomb-Ptherm;
let pertesTurbine=Ptherm-Pmec;
let pertesAlternateur=Pmec-Pelec;

let pertesTotales=Pcomb-Pelec;
let etaGlobal=Pelec/Pcomb;

// Facteur de charge
let Pnom=Pcomb;
let heuresAn=Math.floor(Math.random()*1000+6500);
let heuresFonctionnement=Math.floor(Math.random()*1500+6500);
let facteurCharge=heuresFonctionnement/heuresAn;


// =====================
// CALCULS
// =====================

let Pth=arrondi(Ptherm,2);
let Pm=arrondi(Pmec,2);
let Pe=arrondi(Pelec,2);

let PC=arrondi(pertesChaudiere,2);
let PT=arrondi(pertesTurbine,2);
let PA=arrondi(pertesAlternateur,2);

let PTot=arrondi(pertesTotales,2);
let etaG=arrondi(etaGlobal*100,1);
let FC=arrondi(facteurCharge*100,1);

let Eannuelle=arrondi(Pelec*heuresFonctionnement,0);


// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo9";

let exo={

titre:"Bilan d'énergie d'une centrale thermique",

enonce:`Une centrale thermique transforme l'énergie chimique du combustible en énergie électrique.

La chaîne d'énergie peut être représentée ainsi :

\\[
\\boxed{\\text{Énergie chimique} \\rightarrow
\\text{Énergie thermique} \\rightarrow
\\text{Énergie mécanique} \\rightarrow
\\text{Énergie électrique}}
\\]

La centrale consomme un combustible fournissant une puissance de \\(${Pcomb}\\) MW.

Le rendement de la chaudière est de \\(${etaChaudiere*100}\\) %.

La turbine transforme l'énergie thermique en énergie mécanique avec un rendement de \\(${etaTurbine*100}\\) %.

L'alternateur transforme l'énergie mécanique en énergie électrique avec un rendement de \\(${etaAlternateur*100}\\) %.

La puissance nominale de la centrale est de \\(${Pcomb}\\) MW.

Sur une année de \\(${heuresAn}\\) h, la centrale fonctionne effectivement pendant \\(${heuresFonctionnement}\\) h.

On néglige les autres consommations électriques de la centrale.`,

questions:[

//====================
{
texte:"Identifier la forme d'énergie fournie par le combustible à l'entrée de la centrale.",
reponse:["énergie chimique"],
type:"texte",
feedback:`Le combustible stocke de l'\\(\\boxed{\\text{énergie chimique}}\\).<br>
Cette énergie sera progressivement convertie en énergie thermique, mécanique puis électrique.`
},

//====================
{
texte:"Calculer la puissance thermique utile en sortie de la chaudière.",
reponse:Pth,
unite:"MW",
feedback:`On utilise le rendement de la chaudière :<br>
\\[
\\eta=\\frac{P_{utile}}{P_{absorbée}}
\\]

Donc :<br>
\\[
P_{thermique}=\\eta_{chaudière}\\times P_{combustible}
\\]

\\[
P_{thermique}=${etaChaudiere}\\times${Pcomb}
\\]

\\[
\\boxed{P_{thermique}=${Pth}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer la puissance mécanique disponible à la sortie de la turbine.",
reponse:Pm,
unite:"MW",
feedback:`La turbine reçoit la puissance thermique calculée précédemment.<br>
\\[
P_{mécanique}=\\eta_{turbine}\\times P_{thermique}
\\]

\\[
P_{mécanique}=${etaTurbine}\\times${Pth}
\\]

\\[
\\boxed{P_{mécanique}=${Pm}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer la puissance électrique utile produite par l'alternateur.",
reponse:Pe,
unite:"MW",
feedback:`L'alternateur transforme la puissance mécanique en puissance électrique :<br>
\\[
P_{élec}=\\eta_{alternateur}\\times P_{mécanique}
\\]

\\[
P_{élec}=${etaAlternateur}\\times${Pm}
\\]

\\[
\\boxed{P_{élec}=${Pe}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer les pertes de puissance dans la chaudière.",
reponse:PC,
unite:"MW",
feedback:`Les pertes correspondent à la différence entre la puissance absorbée et la puissance utile :<br>
\\[
P_{pertes}=P_{absorbée}-P_{utile}
\\]

Pour la chaudière :<br>
\\[
P_{pertes}=P_{combustible}-P_{thermique}
\\]

\\[
\\boxed{P_{pertes}=${PC}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer la puissance totale perdue dans l'ensemble de la chaîne d'énergie.",
reponse:PTot,
unite:"MW",
feedback:`On compare la puissance fournie par le combustible avec la puissance électrique finalement produite :<br>
\\[
P_{pertes\\ totales}=P_{entrée}-P_{sortie}
\\]

\\[
P_{pertes\\ totales}=${Pcomb}-${Pe}
\\]

\\[
\\boxed{P_{pertes\\ totales}=${PTot}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer le rendement global de la centrale.",
reponse:etaG,
unite:"%",
feedback:`Le rendement global compare la puissance électrique utile à la puissance fournie par le combustible :<br>
\\[
\\eta_{global}=\\frac{P_{électrique}}{P_{combustible}}
\\]

\\[
\\eta_{global}=\\frac{${Pe}}{${Pcomb}}
\\]

Puis multiplier par 100 pour obtenir un pourcentage :<br>
\\[
\\boxed{\\eta_{global}=${etaG}\\ \\%}
\\]`
},

//====================
{
texte:"Calculer le facteur de charge annuel de la centrale.",
reponse:FC,
unite:"%",
feedback:`Le facteur de charge compare la durée réelle de fonctionnement à la durée totale disponible :<br>
\\[
FC=\\frac{t_{fonctionnement}}{t_{disponible}}
\\]

\\[
FC=\\frac{${heuresFonctionnement}}{${heuresAn}}
\\]

\\[
\\boxed{FC=${FC}\\ \\%}
\\]

Un facteur de charge inférieur à 100 % signifie que la centrale ne fonctionne pas à sa puissance nominale pendant toute l'année.`
},

//====================
{
texte:"Calculer l'énergie électrique produite pendant l'année de fonctionnement.",
reponse:Eannuelle,
unite:"MWh",
feedback:`L'énergie produite se calcule à partir de la puissance et de la durée de fonctionnement :<br>
\\[
E=P\\times t
\\]

Avec \\(P=${Pe}\\) MW et \\(t=${heuresFonctionnement}\\) h :<br>
\\[
E=${Pe}\\times${heuresFonctionnement}
\\]

\\[
\\boxed{E=${Eannuelle}\\ \\text{MWh}}
\\]`
},

//====================
{
texte:"Indiquer l'ordre des principales conversions d'énergie dans cette centrale, depuis le combustible jusqu'à l'électricité produite.",
reponse:["chimique", "thermique", "mécanique", "électrique"],
type:"texte",
feedback:`La chaîne d'énergie est :<br>
\\[
\\boxed{
\\text{énergie chimique}
\\rightarrow
\\text{énergie thermique}
\\rightarrow
\\text{énergie mécanique}
\\rightarrow
\\text{énergie électrique}
}
\\]

Le combustible fournit l'énergie chimique, la chaudière produit de la chaleur, la turbine transforme cette énergie en mouvement mécanique et l'alternateur produit finalement l'électricité.`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

genererExercice(exo);

};