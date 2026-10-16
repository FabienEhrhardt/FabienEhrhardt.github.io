
// =====================
// PARAMÈTRES
// =====================

// Génération

let U=230;
let Usous=Math.floor(Math.random()*20+1)*10;

// ---------------------
// RÉSISTANCE
// ---------------------

let PR=[500,1000,1500,2000,2500,5000][Math.floor(Math.random()*6)];

// ---------------------
// BOBINE
// ---------------------

let QL=[500,1000,1500,2000,2500,5000][Math.floor(Math.random()*6)];
let fL=50;

// ---------------------
// CONDENSATEUR
// ---------------------

let QC=[-500,-1000,-1500,-2000,-2500,-5000][Math.floor(Math.random()*6)];
let fC=50;


// =====================
// CALCULS
// =====================

// ---------------------
// RÉSISTANCE
// ---------------------

let R=U*U/PR;
let IR=U/R;
let Psous=Usous*Usous/R;

// ---------------------
// BOBINE
// ---------------------

let XL=U*U/QL;
let L=XL/(2*3.14159*fL);
let IL=U/XL;

// Sous-alimentation
let XLsous=XL;
let ILsous=Usous/XLsous;
let QLsous=Usous*ILsous;

// ---------------------
// CONDENSATEUR
// ---------------------

let XC=U*U/Math.abs(QC);
let C=1/(2*3.14159*fC*XC);
let IC=U/XC;

// Sous-alimentation
let ICsous=Usous/XC;
let QCsous=Usous*ICsous;


// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo18";

let exo={

titre:"Charges pures : puissance, impédance et composants équivalents",

enonce:`Un technicien doit vérifier différents bancs de charge monophasés raccordés sur un réseau \\(230\\,V - 50\\,Hz\\).

On étudie séparément trois charges pures :

- une charge **résistive** ;
- une charge **inductive pure** assimilée à une bobine idéale ;
- une charge **capacitive pure** assimilée à un condensateur idéal.

Pour une charge résistive :

\\(P=\\frac{U^2}{R}\\)

Pour une bobine idéale :

\\(Q_L=\\frac{U^2}{X_L}\\)

avec :

\\(X_L=2\\pi fL\\)

Pour un condensateur idéal :

\\(Q_C=-\\frac{U^2}{X_C}\\)

avec :

\\(X_C=\\frac{1}{2\\pi fC}\\)

On rappelle également :

\\(I=\\frac{U}{Z}\\)

Attention : pour une bobine ou un condensateur idéal, la puissance active consommée est nulle.`,


questions:[


// ==================================================
// RÉSISTANCE
// ==================================================

{
texte:`Un banc de charge résistif consomme une puissance active de \\(P=${PR}\\,W\\) lorsqu'il est alimenté sous \\(230\\,V\\). Calculer sa résistance équivalente.`,
reponse:arrondi(R),
unite:"Ω",
feedback:`
Pour une charge purement résistive :

\\(P=\\frac{U^2}{R}\\)

On isole la résistance :

\\(R=\\frac{U^2}{P}\\)

Donc :

\\(R=\\frac{${U}^2}{${PR}}=${arrondi(R)}\\,\\Omega\\).
`
},


// ---------------------

{
texte:`Le banc de charge résistif précédent est alimenté sous \\(230\\,V\\). Calculer le courant efficace absorbé.`,
reponse:arrondi(IR),
unite:"A",
feedback:`
Pour une charge résistive :

\\(I=\\frac{U}{R}\\)

Donc :

\\(I=\\frac{${U}}{${arrondi(R)}}=${arrondi(IR)}\\,A\\).

On peut également retrouver ce résultat avec :

\\(P=UI\\).
`
},


// ---------------------

{
texte:`Le banc de charge résistif de \\(R=${arrondi(R)}\\,\\Omega\\) est accidentellement sous-alimenté et ne reçoit plus que \\(${Usous}\\,V\\). Calculer la puissance active consommée.`,
reponse:arrondi(Psous),
unite:"W",
feedback:`
Pour une résistance :

\\(P=\\frac{U^2}{R}\\)

La tension est maintenant de \\(${Usous}\\,V\\).

\\(P=\\frac{${Usous}^2}{${arrondi(R)}}=${arrondi(Psous)}\\,W\\).

Attention : la puissance ne diminue pas proportionnellement à la tension, mais avec le carré de la tension.
`
},


// ==================================================
// BOBINE
// ==================================================

{
texte:`Un banc de charge inductif pur absorbe une puissance réactive de \\(Q_L=${QL}\\,var\\) sous \\(230\\,V - 50\\,Hz\\). Calculer sa réactance inductive \\(X_L\\).`,
reponse:arrondi(XL),
unite:"Ω",
feedback:`
Pour une charge inductive pure :

\\(Q_L=\\frac{U^2}{X_L}\\)

On isole la réactance :

\\(X_L=\\frac{U^2}{Q_L}\\)

Donc :

\\(X_L=\\frac{${U}^2}{${QL}}=${arrondi(XL)}\\,\\Omega\\).
`
},


// ---------------------

{
texte:`La charge inductive précédente possède une réactance de \\(X_L=${arrondi(XL)}\\,\\Omega\\). Calculer son inductance à \\(50\\,Hz\\).`,
reponse:arrondi(L*1000),
unite:"mH",
feedback:`
On utilise :

\\(X_L=2\\pi fL\\)

On isole l'inductance :

\\(L=\\frac{X_L}{2\\pi f}\\)

Donc :

\\(L=\\frac{${arrondi(XL)}}{2\\pi\\times${fL}}
=${arrondi(L*1000)}\\,mH\\).

Ne pas oublier de convertir le résultat en mH.
`
},


// ---------------------

{
texte:`La charge inductive est sous-alimentée et ne reçoit plus que \\(${Usous}\\,V\\). Quelle est alors sa puissance active consommée ?`,
reponse:0,
unite:"W",
feedback:`
Une bobine idéale ne consomme aucune puissance active.

Même sous-alimentée :

\\(P=0\\,W\\).

Elle échange cependant de la puissance réactive avec le réseau.

La puissance réactive devient ici :

\\(Q_L=${arrondi(QLsous)}\\,var\\).
`
},


// ==================================================
// CONDENSATEUR
// ==================================================

{
texte:`Un banc de charge capacitif pur absorbe une puissance réactive de \\(Q_C=${QC}\\,var\\) sous \\(230\\,V - 50\\,Hz\\). Calculer la valeur de sa réactance capacitive \\(X_C\\).`,
reponse:arrondi(XC),
unite:"Ω",
feedback:`
Pour un condensateur pur :

\\(Q_C=-\\frac{U^2}{X_C}\\)

La puissance réactive est négative pour une charge capacitive.

Pour calculer la valeur positive de la réactance :

\\(X_C=\\frac{U^2}{|Q_C|}\\)

Donc :

\\(X_C=\\frac{${U}^2}{|${QC}|}
=${arrondi(XC)}\\,\\Omega\\).
`
},


// ---------------------

{
texte:`Le condensateur précédent possède une réactance de \\(X_C=${arrondi(XC)}\\,\\Omega\\). Calculer sa capacité à \\(50\\,Hz\\).`,
reponse:arrondi(C*1000000),
unite:"µF",
feedback:`
On utilise :

\\(X_C=\\frac{1}{2\\pi fC}\\)

On isole la capacité :

\\(C=\\frac{1}{2\\pi fX_C}\\)

Donc :

\\(C=\\frac{1}{2\\pi\\times${fC}\\times${arrondi(XC)}}
=${arrondi(C*1000000)}\\,\\mu F\\).
`
},


// ---------------------

{
texte:`Le condensateur est sous-alimenté et ne reçoit plus que \\(${Usous}\\,V\\). Quelle est alors sa puissance réactive consommée ?`,
reponse:QCsous,
unite:"var",
feedback:`
Un condensateur idéal ne consomme aucune puissance active.

Il échange cependant de la puissance réactive avec le réseau.

La puissance réactive devient :

\\(Q_C=-C \omega U^2 = ${arrondi(QCsous)}\\,var\\).
`
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