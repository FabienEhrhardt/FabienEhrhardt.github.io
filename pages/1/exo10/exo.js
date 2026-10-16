// =====================
// PARAMÈTRES
// =====================

// Combustible
let Pgaz=Math.floor(Math.random()*6+10)*10; // MW

// Rendement électrique du moteur
let etaElec=[0.38,0.40,0.42,0.44][Math.floor(Math.random()*4)];

// Rendement thermique utile
let etaTherm=[0.42,0.44,0.46,0.48][Math.floor(Math.random()*4)];

// Puissances utiles
let Pelec=Pgaz*etaElec;
let Ptherm=Pgaz*etaTherm;

// Rendement global de cogénération
let etaGlobal=etaElec+etaTherm;

// Pertes
let Ppertes=Pgaz-Pelec-Ptherm;

// Centrale nominale
let Pnom=Pgaz;

// Fonctionnement annuel
let heuresAn=8760;
let heuresFonctionnement=Math.floor(Math.random()*1000+7000);

// Facteur de charge
let facteurCharge=heuresFonctionnement/heuresAn;

// Énergies annuelles
let Eelec=Pelec*heuresFonctionnement;
let Etherm=Ptherm*heuresFonctionnement;


// =====================
// CALCULS
// =====================

let Pe=arrondi(Pelec,2);
let Pt=arrondi(Ptherm,2);
let Pp=arrondi(Ppertes,2);

let etaG=arrondi(etaGlobal*100,1);
let FC=arrondi(facteurCharge*100,1);

let Ee=arrondi(Eelec,0);
let Et=arrondi(Etherm,0);


// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo10";

let exo={

titre:"Bilan d'énergie d'une centrale de cogénération",

enonce:`Une centrale de cogénération alimentée au gaz naturel fournit simultanément de l'électricité et de la chaleur utile à un réseau de chauffage.

La cogénération consiste à produire simultanément plusieurs formes d'énergie utiles à partir d'une même source d'énergie. Une partie de la chaleur qui serait normalement perdue lors de la production d'électricité est ainsi récupérée.

La centrale reçoit une puissance chimique fournie par le gaz naturel de \\(${Pgaz}\\) MW.

Le moteur thermique transforme une partie de cette énergie en puissance électrique avec un rendement électrique de \\(${etaElec*100}\\) %.

La chaleur récupérée sur le moteur et les gaz d'échappement fournit une puissance thermique utile avec un rendement thermique de \\(${etaTherm*100}\\) %.

Le reste de l'énergie correspond aux pertes de la centrale.

La centrale fonctionne pendant \\(${heuresFonctionnement}\\) h au cours d'une année de 8760 h.

On considère que les puissances restent constantes pendant les périodes de fonctionnement.`,

questions:[

//====================
{
texte:"Identifier la forme d'énergie apportée à la centrale par le gaz naturel.",
reponse:["énergie chimique"],
type:"texte",
feedback:`Le gaz naturel contient de l'\\(\\boxed{\\text{énergie chimique}}\\).

Cette énergie constitue l'énergie absorbée par la centrale avant ses différentes conversions.`
},

//====================
{
texte:"Calculer la puissance électrique utile produite par la centrale.",
reponse:Pe,
unite:"MW",
feedback:`Le rendement électrique est défini par :<br>
\\[
\\eta_{élec}=\\frac{P_{élec}}{P_{gaz}}
\\]

On isole la puissance électrique :<br>
\\[
P_{élec}=\\eta_{élec}\\times P_{gaz}
\\]

\\[
P_{élec}=${etaElec}\\times${Pgaz}
\\]

\\[
\\boxed{P_{élec}=${Pe}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer la puissance thermique utile récupérée par la centrale.",
reponse:Pt,
unite:"MW",
feedback:`Le rendement thermique est défini par :<br>
\\[
\\eta_{thermique}=\\frac{P_{thermique}}{P_{gaz}}
\\]

Donc :<br>
\\[
P_{thermique}=\\eta_{thermique}\\times P_{gaz}
\\]

\\[
P_{thermique}=${etaTherm}\\times${Pgaz}
\\]

\\[
\\boxed{P_{thermique}=${Pt}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer la puissance totale utile produite par la centrale de cogénération.",
reponse:arrondi(Pelec+Ptherm,2),
unite:"MW",
feedback:`La centrale fournit deux formes d'énergie utiles : l'électricité et la chaleur.

On additionne les deux puissances utiles :<br>
\\[
P_{utile}=P_{élec}+P_{thermique}
\\]

\\[
P_{utile}=${Pe}+${Pt}
\\]

\\[
\\boxed{P_{utile}=${arrondi(Pelec+Ptherm,2)}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer la puissance perdue dans la centrale.",
reponse:Pp,
unite:"MW",
feedback:`Le bilan de puissance s'écrit :<br>
\\[
P_{gaz}=P_{élec}+P_{thermique}+P_{pertes}
\\]

On isole les pertes :<br>
\\[
P_{pertes}=P_{gaz}-P_{élec}-P_{thermique}
\\]

\\[
P_{pertes}=${Pgaz}-${Pe}-${Pt}
\\]

\\[
\\boxed{P_{pertes}=${Pp}\\ \\text{MW}}
\\]`
},

//====================
{
texte:"Calculer le rendement global de la centrale de cogénération en prenant en compte à la fois l'électricité et la chaleur utile.",
reponse:etaG,
unite:"%",
feedback:`Pour une centrale de cogénération, les deux sorties utiles sont prises en compte :<br>
\\[
\\eta_{global}=\\frac{P_{élec}+P_{thermique}}{P_{gaz}}
\\]

\\[
\\eta_{global}=\\frac{${Pe}+${Pt}}{${Pgaz}}
\\]

\\[
\\boxed{\\eta_{global}=${etaG}\\ \\%}
\\]

Le rendement global est donc supérieur au seul rendement électrique car une partie importante de l'énergie thermique est valorisée.`
},

//====================
{
texte:"Comparer le rendement global de cogénération au rendement électrique seul. Combien de points de rendement sont gagnés grâce à la récupération de chaleur ?",
reponse:arrondi(etaTherm*100,1),
unite:"points de %",
feedback:`Le rendement électrique seul vaut :<br>
\\[
\\eta_{élec}=${etaElec*100}\\ \\%
\\]

Le rendement global vaut :<br>
\\[
\\eta_{global}=${etaG}\\ \\%
\\]

Le gain est donc :<br>
\\[
\\eta_{global}-\\eta_{élec}
\\]

\\[
${etaG}-${etaElec*100}
\\]

\\[
\\boxed{${arrondi(etaTherm*100,1)}\\ \\text{points de \\%}}
\\]

Ce gain correspond directement à la part de l'énergie du combustible transformée en chaleur utile.`
},

//====================
{
texte:"Calculer le facteur de charge annuel de la centrale.",
reponse:FC,
unite:"%",
feedback:`Le facteur de charge compare la durée réelle de fonctionnement à la durée totale disponible :<br>
\\[
FC=\\frac{t_{fonctionnement}}{t_{annuel}}
\\]

\\[
FC=\\frac{${heuresFonctionnement}}{8760}
\\]

\\[
\\boxed{FC=${FC}\\ \\%}
\\]`
},

//====================
{
texte:"Calculer l'énergie électrique produite par la centrale pendant une année.",
reponse:Ee,
unite:"MWh",
feedback:`L'énergie électrique produite est donnée par :<br>
\\[
E_{élec}=P_{élec}\\times t
\\]

Avec \\(P_{élec}=${Pe}\\) MW et \\(t=${heuresFonctionnement}\\) h :<br>
\\[
E_{élec}=${Pe}\\times${heuresFonctionnement}
\\]

\\[
\\boxed{E_{élec}=${Ee}\\ \\text{MWh}}
\\]`
},

//====================
{
texte:"Calculer l'énergie thermique utile fournie au réseau de chauffage pendant une année.",
reponse:Et,
unite:"MWh",
feedback:`L'énergie thermique utile se calcule avec :<br>
\\[
E_{thermique}=P_{thermique}\\times t
\\]

\\[
E_{thermique}=${Pt}\\times${heuresFonctionnement}
\\]

\\[
\\boxed{E_{thermique}=${Et}\\ \\text{MWh}}
\\]`
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