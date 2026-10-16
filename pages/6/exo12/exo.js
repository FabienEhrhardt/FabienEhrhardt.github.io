// =====================
// PARAMÈTRES
// =====================

// Installation photovoltaïque
let nbChaine=[4,5,6][Math.floor(Math.random()*3)]; // nombre de chaînes en parallèle

let nbPanneauxSerie=[10,11,12][Math.floor(Math.random()*3)]; // panneaux par chaîne

let Ump=[32,34,36][Math.floor(Math.random()*3)]; // V
let Imp=[12.5,13.0,13.5][Math.floor(Math.random()*3)]; // A

let Ppanneau=Ump*Imp; // W
let Pdc=nbChaine*nbPanneauxSerie*Ppanneau; // W

// Longueur aller du câble DC
let longueurDC=[25,30,35,40][Math.floor(Math.random()*4)]; // m

// Chute de tension maximale autorisée côté DC
let chuteDCmax=[1.5,2][Math.floor(Math.random()*2)]; // %

// Résistivité du cuivre
let rho=0.0175; // Ω.mm²/m


// =====================
// CALCULS DC
// =====================

// Courant dans une chaîne
let Ich=Imp;

// Courant total côté DC
let Idc=nbChaine*Ich;

// Tension du champ PV
let Udc=nbPanneauxSerie*Ump;

// Chute de tension maximale autorisée
let dUdcmax=Udc*chuteDCmax/100;


// Sections normalisées étudiées
let sections=[2.5,4,6,10,16];


// Calcul des chutes de tension pour chaque section
let pertesDC={};

sections.forEach(S=>{
    let R=2*rho*longueurDC/S;
    let dU=R*Idc;
    let pct=dU/Udc*100;
    pertesDC[S]={
        R:R,
        dU:dU,
        pct:pct
    };
});


// Choix de la première section respectant la chute de tension
let sectionDC=sections.find(S=>pertesDC[S].dU<=dUdcmax);

let Rdc=pertesDC[sectionDC].R;
let dUdc=pertesDC[sectionDC].dU;
let pctDC=pertesDC[sectionDC].pct;

// Puissance perdue dans le câble DC
let PperdueDC=Idc*Idc*Rdc;

// Rendement du câble DC
let etaDC=(Pdc-PperdueDC)/Pdc*100;


// =====================
// PARTIE AC
// =====================

let etaOnduleur=[97,98,98.5][Math.floor(Math.random()*3)]; // %
let P_ac=Pdc*etaOnduleur/100; // W

let Uac=400; // V triphasé
let cosphi=[0.95,0.96,0.98,1][Math.floor(Math.random()*4)];


// Courant triphasé
let Iac=P_ac/(Math.sqrt(3)*Uac*cosphi);


// Longueur câble AC
let longueurAC=[20,25,30,35][Math.floor(Math.random()*4)]; // m

let chuteACmax=[1.5,2,3][Math.floor(Math.random()*3)]; // %

let dUacmax=Uac*chuteACmax/100;


// Sections AC étudiées
let sectionsAC=[4,6,10,16,25];


// Calcul simplifié de la chute de tension triphasée
let pertesAC={};

sectionsAC.forEach(S=>{
    let R= rho*longueurAC/S;
    let dU=Math.sqrt(3)*R*Iac;
    let pct=dU/Uac*100;

    pertesAC[S]={
        R:R,
        dU:dU,
        pct:pct
    };
});


// Choix de la première section respectant la chute de tension
let sectionAC=sectionsAC.find(S=>pertesAC[S].dU<=dUacmax);

let Rac=pertesAC[sectionAC].R;
let dUac=pertesAC[sectionAC].dU;
let pctAC=pertesAC[sectionAC].pct;


// Puissance perdue dans le câble AC
let PperdueAC=3*Iac*Iac*Rac;

// Rendement du câble AC
let etaAC=(P_ac-PperdueAC)/P_ac*100;


// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo12";

let exo={
titre:"Dimensionnement des câbles d'une installation photovoltaïque",

enonce:`Une installation photovoltaïque alimente le réseau électrique d'un bâtiment industriel.

Le champ photovoltaïque est constitué de \\(${nbChaine}\\) chaînes montées en parallèle, chaque chaîne comportant \\(${nbPanneauxSerie}\\) panneaux en série.

Les panneaux ont une tension au point de puissance maximale de \\(${Ump}\\,V\\) et fournissent un courant de \\(${Imp}\\,A\\).

L'installation est raccordée à un onduleur puis au réseau triphasé \\(${Uac}\\,V\\).

Données :
<ul>
<li> résistivité du cuivre : \\(\\rho=${rho}\\,\\Omega\\cdot mm^2/m\\)</li>
<li> longueur du câble : longueur aller \\(${longueurDC}\\,m\\) côté DC ;</li>
<li> longueur du câble : longueur aller \\(${longueurAC}\\,m\\) côté AC ;</li>
<li> la chute de tension maximale admissible est indiquée dans les questions ;</li>
<li> les sections normalisées disponibles sont indiquées dans les questions.</li>
</ul>`,

questions:[

{
texte:`Calculer la puissance totale \\(P_{DC}\\) fournie par le champ photovoltaïque.`,
reponse:Pdc,
unite:"W",
feedback:`\\[P_{DC}=N\\times P_{panneau}\\]

\\[P_{panneau}=U_{mpp}\\times I_{mpp}\\]

\\[P_{DC}=${nbChaine}\\times ${nbPanneauxSerie}\\times ${Ump}\\times ${Imp}\\]

\\[P_{DC}=\\boxed{${arrondi(Pdc,0)}\\,W}\\]`
},

{
texte:`Déterminer le courant total circulant dans le câble principal côté DC.`,
reponse:Idc,
unite:"A",
feedback:`Dans une association en parallèle, les courants s'additionnent :

\\[I_{DC}=N_{parallèle}\\times I_{mpp}\\]

\\[I_{DC}=${nbChaine}\\times ${Imp}\\]

\\[I_{DC}=\\boxed{${arrondi(Idc,1)}\\,A}\\]`
},

{
texte:`Déterminer la tension continue \\(U_{DC}\\) délivrée par une chaîne de panneaux.`,
reponse:Udc,
unite:"V",
feedback:`Dans une association en série, les tensions s'additionnent :

\\[U_{DC}=N_{série}\\times U_{mpp}\\]

\\[U_{DC}=${nbPanneauxSerie}\\times ${Ump}\\]

\\[U_{DC}=\\boxed{${arrondi(Udc,0)}\\,V}\\]`
},

{
texte:`La chute de tension maximale admissible côté DC est de \\(${chuteDCmax}\\,\\%\\). Calculer la chute de tension maximale admissible en volts.`,
reponse:dUdcmax,
unite:"V",
feedback:`\\[\\Delta U_{max}=U_{DC}\\times\\dfrac{\\Delta U_{max}(\\%)}{100}\\]

\\[\\Delta U_{max}=${Udc}\\times\\dfrac{${chuteDCmax}}{100}\\]

\\[\\Delta U_{max}=\\boxed{${arrondi(dUdcmax,2)}\\,V}\\]`
},

{
texte:`On hésite entre des câbles cuivre de sections \\(2,5\\), \\(4\\), \\(6\\), \\(10\\) et \\(16\\,mm^2\\). Pour une section de \\(6\\,mm^2\\), calculer la résistance du câble aller-retour côté DC.`,
reponse:pertesDC[6].R,
unite:"Ω",
feedback:`La longueur électrique comprend l'aller et le retour :

\\[R=\\rho\\times\\dfrac{2L}{S}\\]

\\[R=${rho}\\times\\dfrac{2\\times ${longueurDC}}{6}\\]

\\[R=\\boxed{${arrondi(pertesDC[6].R,4)}\\,\\Omega}\\]`
},

{
texte:`Pour un câble DC de section \\(6\\,mm^2\\), calculer la chute de tension provoquée par le câble.`,
reponse:pertesDC[6].dU,
unite:"V",
feedback:`\\(\\Delta U=R\\times I\\)

\\[\\Delta U=${arrondi(pertesDC[6].R,4)}\\times ${arrondi(Idc,1)}\\]

\\[\\Delta U=\\boxed{${arrondi(pertesDC[6].dU,2)}\\,V}\\]

Comparer ensuite cette valeur à la chute de tension maximale admissible.`
},

{
texte:`Choisir la plus petite section normalisée permettant de respecter la chute de tension maximale admissible côté DC.`,
reponse:sectionDC,
unite:"mm²",
feedback:`On teste les différentes sections jusqu'à obtenir :

\\[\\Delta U\\leq\\Delta U_{max}\\]

La section retenue est :

\\[\\boxed{${sectionDC}\\,mm^2}\\]

Elle donne une chute de tension de \\(${arrondi(dUdc,2)}\\,V\\), soit \\(${arrondi(pctDC,2)}\\,\\%\\).`
},

{
texte:`Avec la section de câble DC retenue, calculer la puissance perdue par effet Joule dans le câble.`,
reponse:PperdueDC,
unite:"W",
feedback:`La puissance perdue par effet Joule est :

\\[P_J=R\\times I^2\\]

\\[P_J=${arrondi(Rdc,4)}\\times ${arrondi(Idc,1)}^2\\]

\\[P_J=\\boxed{${arrondi(PperdueDC,1)}\\,W}\\]`
},

{
texte:`Calculer le rendement du câble DC.`,
reponse:etaDC,
unite:"%",
feedback:`\\[\\eta=\\dfrac{P_{utile}}{P_{entrée}}\\times100\\]

\\[\\eta_{DC}=\\dfrac{P_{DC}-P_J}{P_{DC}}\\times100\\]

\\[\\eta_{DC}=\\boxed{${arrondi(etaDC,2)}\\,\\%}\\]`
},

{
texte:`L'onduleur possède un rendement de \\(${etaOnduleur}\\,\\%\\). Calculer la puissance active disponible côté AC.`,
reponse:P_ac,
unite:"W",
feedback:`\\[P_{AC}=P_{DC}\\times\\eta_{ond}\\]

\\[P_{AC}=${arrondi(Pdc,0)}\\times\\dfrac{${etaOnduleur}}{100}\\]

\\[P_{AC}=\\boxed{${arrondi(P_ac,0)}\\,W}\\]`
},

{
texte:`L'onduleur fournit une tension triphasée de \\(${Uac}\\,V\\) avec un facteur de puissance \\(cos(\\varphi)=${cosphi}\\). Calculer le courant fourni par l'onduleur.`,
reponse:Iac,
unite:"A",
feedback:`Pour un récepteur triphasé :

\\(P=\\sqrt{3}\\times U\\times I\\times cos(\\varphi)\\)

On isole le courant :

\\[I=\\dfrac{P}{\\sqrt{3}\\times U\\times cos(\\varphi)}\\]

\\[I=\\dfrac{${arrondi(P_ac,0)}}{\\sqrt{3}\\times ${Uac}\\times ${cosphi}}\\]

\\[I=\\boxed{${arrondi(Iac,2)}\\,A}\\]`
},

{
texte:`La chute de tension maximale admissible sur le câble AC est de \\(${chuteACmax}\\,\\%\\). Calculer sa valeur en volts.`,
reponse:dUacmax,
unite:"V",
feedback:`\\[\\Delta U_{max}=U\\times\\dfrac{\\Delta U(\\%)}{100}\\]

\\[\\Delta U_{max}=${Uac}\\times\\dfrac{${chuteACmax}}{100}\\]

\\[\\Delta U_{max}=\\boxed{${arrondi(dUacmax,2)}\\,V}\\]`
},

{
texte:`Pour un câble AC de section \\(6\\,mm^2\\), calculer la chute de tension dans le câble triphasé.`,
reponse:pertesAC[6].dU,
unite:"V",
feedback:`Pour un câble triphasé :

\\(\\Delta U=\\sqrt{3}\\times R\\times I\\)

avec

\\(R=\\rho\\times\\dfrac{L}{S}\\)

Donc :

\\[\\Delta U=\\sqrt{3}\\times\\rho\\times\\dfrac{L}{S}\\times I\\]

\\[\\Delta U=\\sqrt{3}\\times ${rho}\\times\\dfrac{${longueurAC}}{6}\\times ${arrondi(Iac,2)}\\]

\\[\\Delta U=\\boxed{${arrondi(pertesAC[6].dU,2)}\\,V}\\]`
},

{
texte:`Choisir la section normalisée minimale du câble AC permettant de respecter la chute de tension maximale admissible.`,
reponse:sectionAC,
unite:"mm²",
feedback:`On recherche la plus petite section vérifiant :

\\(\\Delta U\\leq\\Delta U_{max}\\)

La section retenue est :

\\(\\boxed{${sectionAC}\\,mm^2}\\)

La chute de tension obtenue est de \\(${arrondi(dUac,2)}\\,V\\), soit \\(${arrondi(pctAC,2)}\\,\\%\\).`
},

{
texte:`Calculer la puissance perdue par effet Joule dans le câble AC avec la section retenue.`,
reponse:PperdueAC,
unite:"W",
feedback:`Pour un câble triphasé :

\\[P_J=3\\times R\\times I^2\\]

\\[P_J=3\\times ${arrondi(Rac,4)}\\times ${arrondi(Iac,2)}^2\\]

\\[P_J=\\boxed{${arrondi(PperdueAC,1)}\\,W}\\]`
},

{
texte:`Expliquer pourquoi augmenter la section d'un câble permet généralement de diminuer les pertes d'énergie.`,
type:"texte",
reponse:[
"résistance diminue",
"section augmente",
"R=rho*L/S",
"pertes joule diminuent"
],
feedback:`La résistance du câble dépend de sa section :

\\(R=\\rho\\times\\dfrac{L}{S}\\)

Lorsque la section \\(S\\) augmente, la résistance \\(R\\) diminue.

Or :

\\(P_J=R\\times I^2\\)

Donc une section plus importante permet de diminuer les pertes par effet Joule.`
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