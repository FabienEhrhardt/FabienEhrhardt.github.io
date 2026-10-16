// =====================
// PARAMÈTRES
// =====================

// =====================
// PANNEAUX
// =====================

let Ppanneau=[400,450,500,550][Math.floor(Math.random()*4)]; // Wc
let Ump=[30,32,34,36][Math.floor(Math.random()*4)]; // V
let Imp=Ppanneau/Ump; // A

let Uoc=[37,39,41,43][Math.floor(Math.random()*4)]; // V
let Isc=Imp*1.08; // A

// =====================
// PUISSANCE DE L'INSTALLATION
// =====================

let Pinst=Math.floor(Math.random()*5+8)*1000; // Wc

// Nombre de panneaux nécessaire
let nbPanneaux=Math.ceil(Pinst/Ppanneau);

// Puissance réellement installée
let Ptot=nbPanneaux*Ppanneau;


// =====================
// ONDULEUR
// =====================

let Pond=[25000,30000,33000,40000][Math.floor(Math.random()*4)]; // W

let UdcMax=[800,900,1000][Math.floor(Math.random()*3)]; // V

let UmpptMin=[200,250,300][Math.floor(Math.random()*3)]; // V
let UmpptMax=UmpptMin+300;

let IdcMax=[30,35,40,45][Math.floor(Math.random()*4)]; // A

// Nombre d'onduleurs
let nbOnduleurs=Math.ceil(Ptot/Pond);


// =====================
// DIMENSIONNEMENT PAR ONDULEUR
// =====================




// Nombre de panneaux affectés à chaque onduleur
let panneauxParOnd=Math.ceil(nbPanneaux/nbOnduleurs);

// Nombre de panneaux en série
let NsMin=Math.ceil(UmpptMin/Ump);
let NsMax=Math.floor(Math.min(UmpptMax/Ump,UdcMax/Uoc));



// Nombre de branches parallèles nécessaires avec la tension la plus grande
let Np=Math.ceil(panneauxParOnd/NsMax);

// On choisit une configuration pour avoir la tension la plus grande possible
let Ns=Math.ceil(panneauxParOnd/Np);


// Nombre réel de panneaux par onduleur
let NpanneauxOnd=Ns*Np;

// Puissance réelle par onduleur
let PondReelle=NpanneauxOnd*Ppanneau;

// Tension au point de puissance maximale
let Udc=Ns*Ump;

// Tension à vide
let UocTot=Ns*Uoc;

// Courant au MPP
let Idc=Np*Imp;

// Courant de court-circuit
let IscTot=Np*Isc;


// Nombre total réellement installé
let nbTotalReel=NpanneauxOnd*nbOnduleurs;
let PtotReelle=nbTotalReel*Ppanneau;




// =====================
// CALCULS ARRONDIS
// =====================

let Ipm=arrondi(Imp,2);
let Iscc=arrondi(Isc,2);

let PtotkW=arrondi(Ptot/1000,2);
let PtotReellekW=arrondi(PtotReelle/1000,2);

let PondkW=arrondi(Pond/1000,2);
let PondReellekW=arrondi(PondReelle/1000,2);

let Udcc=arrondi(Udc,0);
let Uoccc=arrondi(UocTot,0);

let Idcc=arrondi(Idc,2);
let Iscct=arrondi(IscTot,2);


// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo11";

let exo={

titre:"Dimensionnement d'une installation photovoltaïque – choix des panneaux et de l'onduleur",

enonce:`Une entreprise souhaite installer une centrale photovoltaïque d'une puissance d'environ \\(${Pinst/1000}\\) kWc.

Le panneau photovoltaïque retenu possède les caractéristiques suivantes :
<ul>

<li> puissance crête : \\(${Ppanneau}\\) Wc ; tension au point de puissance maximale \\(U_{mpp}\\) : \\(${Ump}\\) V ;</li>
<li> courant au point de puissance maximale \\(I_{mpp}\\) : \\(${arrondi(Imp,2)}\\) A ;</li>
<li> tension à vide \\(U_{oc}\\) : \\(${Uoc}\\) V ;</li>
<li> courant de court-circuit \\(I_{sc}\\) : \\(${arrondi(Isc,2)}\\) A.</li>
</ul>
L'onduleur disponible possède les caractéristiques suivantes :

<ul>
<li> puissance nominale : \\(${Pond/1000}\\) kW ;</li>
<li> tension DC maximale admissible : \\(${UdcMax}\\) V ;</li>
<li> plage de fonctionnement MPPT : de \\(${UmpptMin}\\) V à \\(${UmpptMax}\\) V ;</li>
<li> courant DC maximal admissible : \\(${IdcMax}\\) A.</li>
</ul>
Les panneaux peuvent être associés :
<ul>
<li> en série : les tensions s'additionnent et le courant reste identique ;</li>
<li> en parallèle : les courants s'additionnent et la tension reste identique.</li>
</ul>
L'objectif est de déterminer une configuration permettant de raccorder les panneaux aux onduleurs tout en respectant leurs limites électriques.`,

questions:[

//====================
{
texte:"Déterminer la puissance totale recherchée en kWc.",
reponse:Pinst/1000,
unite:"kWc",
feedback:`La puissance recherchée est donnée dans l'énoncé :<br>
\\[
\\boxed{P_{installation}=${Pinst/1000}\\ \\text{kWc}}
\\]

Il faut maintenant choisir un nombre entier de panneaux permettant d'atteindre ou de dépasser cette puissance.`
},

//====================
{
texte:"Calculer le nombre minimal de panneaux nécessaires pour atteindre la puissance recherchée.",
reponse:nbPanneaux,
unite:"panneaux",
feedback:`Le nombre de panneaux est obtenu avec :<br>
\\[
N=\\frac{P_{installation}}{P_{panneau}}
\\]

Attention : la puissance du panneau est donnée en Wc. Convertis la puissance recherchée en Wc avant le calcul.

\\[
N=\\frac{${Pinst}}{${Ppanneau}}
\\]

Comme on ne peut pas installer une fraction de panneau, il faut arrondir à l'entier supérieur.

\\[
\\boxed{N=${nbPanneaux}\\ \\text{panneaux}}
\\]`
},

//====================
{
texte:"Calculer la puissance crête réellement installée avec ce nombre de panneaux.",
reponse:PtotkW,
unite:"kWc",
feedback:`La puissance réellement installée est :<br>
\\[
P_{PV}=N\\times P_{panneau}
\\]

\\[
P_{PV}=${nbPanneaux}\\times${Ppanneau}
\\]

Soit :<br>
\\[
\\boxed{P_{PV}=${PtotkW}\\ \\text{kWc}}
\\]`
},

//====================
{
texte:"Déterminer le nombre d'onduleurs nécessaires pour raccorder l'ensemble des panneaux.",
reponse:nbOnduleurs,
unite:"onduleurs",
feedback:`La puissance totale des panneaux doit être répartie entre les onduleurs.

On utilise :<br>
\\[
N_{ond}=
\\frac{P_{PV}}{P_{ond}}
\\]

\\[
N_{ond}=\\frac{${Ptot}}{${Pond}}
\\]

Le résultat doit être arrondi à l'entier supérieur.

\\[
\\boxed{N_{ond}=${nbOnduleurs}\\ \\text{onduleur(s)}}
\\]`
},

//====================
{
texte:"Déterminer le nombre de panneaux qui doivent être raccordés à chaque onduleur.",
reponse:panneauxParOnd,
unite:"panneaux",
feedback:`On répartit les panneaux sur les \\(${nbOnduleurs}\\) onduleur(s).

Pour obtenir une configuration identique sur chaque onduleur, on choisit un nombre entier de panneaux par onduleur 
\\[
\\boxed{N=${panneauxParOnd}\\ \\text{panneaux par onduleur}}
\\]`
},

//====================
{
texte:"Déterminer le nombre maximal de panneaux pouvant être placé en série sur une branche afin que la tension de fonctionnement soit comprise dans la plage MPPT de l'onduleur.",
reponse:NsMax,
unite:"panneaux en série",
feedback:`Pour des panneaux en série, les tensions s'additionnent :<br>
\\[
N_{s,max}=\\frac{U_{MPPT,max}}{U_{mpp}}
\\]

\\[
\\boxed{N_{s,max}=${NsMax}\\ \\text{panneaux en série}}
\\]`
},
//====================
{
texte:"Déterminer le nombre de branches de panneaux à mettre en parallèle sur chaque onduleur.",
reponse:Np,
unite:"branches en parallèle",
feedback:`Le nombre total de panneaux par onduleur doit être réparti entre les branches série.

On utilise :<br>
\\[
N_p=\\frac{N_{panneaux\\ par\\ onduleur}}{N_{s,max}}
\\]

\\[
N_p=\\frac{${NpanneauxOnd}}{${NsMax}}
\\]

\\[
\\boxed{N_p=${Np}\\ \\text{branche(s) en parallèle}}
\\]`
},

//====================



//====================
{
texte:"Déterminer le nombre de chaines (panneaux placés en série) sur une branche afin que la tension de fonctionnement soit comprise dans la plage MPPT de l'onduleur.",
reponse:Ns,
unite:"panneaux en série",
feedback:`Pour des panneaux en série, les tensions s'additionnent :<br>
Le nombre de panneaux en série est défini par 
\\[
N_s=\\frac{N_{panneaux\\ par\\ onduleur}}{N_{p}}=\\frac{${NpanneauxOnd}}{${Np}}
\\]
La valeur retenue est :<br>
\\[
\\boxed{N_s=${Ns}\\ \\text{panneaux en série}}
\\]
On vérifie :
\\[
U_{mpp,branche}=N_s\\times U_{mpp}
\\]

Il faut respecter :<br>
\\[
U_{MPPT,min}\\leq U_{mpp,branche}\\leq U_{MPPT,max}
\\]

`
},


{
texte:"Calculer la tension DC au point de puissance maximale appliquée à l'entrée de l'onduleur.",
reponse:Udcc,
unite:"V",
feedback:`Dans une branche série, les tensions s'additionnent :<br>
\\[
U_{DC}=N_s\\times U_{mpp}
\\]

\\[
U_{DC}=${Ns}\\times${Ump}
\\]

\\[
\\boxed{U_{DC}=${Udcc}\\ \\text{V}}
\\]

Vérifier que cette tension appartient bien à la plage MPPT de l'onduleur.`
},

//====================
{
texte:"Calculer le courant DC fourni à l'onduleur au point de puissance maximale.",
reponse:Idcc,
unite:"A",
feedback:`Dans une branche série, le courant reste identique.

En revanche, les courants s'additionnent lorsque les branches sont mises en parallèle :<br>
\\[
I_{DC}=N_p\\times I_{mpp}
\\]

\\[
I_{DC}=${Np}\\times${Ipm}
\\]

\\[
\\boxed{I_{DC}=${Idcc}\\ \\text{A}}
\\]

Il faut comparer ce courant au courant DC maximal admissible par l'onduleur.`
},

//====================
{
texte:"Calculer la tension à vide de la chaîne de panneaux ne dépasse pas la tension DC maximale admissible de l'onduleur.",
reponse:Uoccc,
unite:"V",
feedback:`La tension à vide d'une chaîne série est :<br>
\\[
U_{oc,total}=N_s\\times U_{oc}
\\]

\\[
U_{oc,total}=${Ns}\\times${Uoc}
\\]

\\[
\\boxed{U_{oc,total}=${Uoccc}\\ \\text{V}}
\\]

La condition à respecter est :<br>
\\[
U_{oc,total}\\leq U_{DC,max}
\\]

Il faut donc comparer \\(${Uoccc}\\) V à la limite de \\(${UdcMax}\\) V.`
},

//====================
{
texte:"Calculer le courant DC au point de puissance maximale reste inférieur au courant maximal admissible par l'onduleur.",
reponse:Idcc,
unite:"A",
feedback:`Le courant calculé est :<br>
\\[
I_{DC}=${Idcc}\\ \\text{A}
\\]

Le courant maximal admissible par l'onduleur est :<br>
\\[
I_{DC,max}=${IdcMax}\\ \\text{A}
\\]

La condition est :<br>
\\[
I_{DC}\\leq I_{DC,max}
\\]

Il faut donc vérifier que :<br>
\\[
${Idcc}\\leq${IdcMax}
\\]

La configuration est acceptable si cette condition est respectée.`
},

//====================
{
texte:"Calculer la puissance totale réellement installée avec la configuration retenue.",
reponse:PtotReellekW,
unite:"kWc",
feedback:`La configuration comporte \\(${nbOnduleurs}\\) onduleurs, avec \\(${NpanneauxOnd}\\) panneaux par onduleur.

Le nombre total de panneaux est donc :<br>
\\[
N_{total}=${nbOnduleurs}\\times${NpanneauxOnd}
\\]

La puissance totale est :<br>
\\[
P_{total}=N_{total}\\times P_{panneau}
\\]

\\[
\\boxed{P_{total}=${PtotReellekW}\\ \\text{kWc}}
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