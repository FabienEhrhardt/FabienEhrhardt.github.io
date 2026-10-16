
// =====================
// PARAMÈTRES
// =====================

// Génération

let U=400;

// Courant
let I=Math.floor(Math.random()*46+5);

// Facteur de puissance
let cosphi=[0.65,0.70,0.75,0.80,0.85,0.90,0.95][Math.floor(Math.random()*7)];

// Puissance active
let PkW=[5,10,15,20,25,30,40,50][Math.floor(Math.random()*8)];
let P=PkW*1000;

// Puissance réactive
let Qkvar=[3,5,8,10,12,15,20,25,30][Math.floor(Math.random()*9)];
let Q=Qkvar*1000;


// =====================
// CALCULS
// =====================

// À partir de U, I et cos phi

let S_UI=Math.sqrt(3)*U*I;
let P_UI=S_UI*cosphi;
let Q_UI=Math.sqrt(S_UI*S_UI-P_UI*P_UI);


// À partir de P et cos phi

let S_Pcos=P/cosphi;
let I_Pcos=S_Pcos/(Math.sqrt(3)*U);
let Q_Pcos=Math.sqrt(S_Pcos*S_Pcos-P*P);


// À partir de P et Q

let S_PQ=Math.sqrt(P*P+Q*Q);
let cosphi_PQ=P/S_PQ;
let I_PQ=S_PQ/(Math.sqrt(3)*U);


// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo19";

let exo={

titre:"Bilan de puissance en triphasé",

enonce:`On étudie différents récepteurs triphasés équilibrés raccordés sur un réseau industriel \\(400\\,V - 50\\,Hz\\).

On rappelle les principales relations de puissance en triphasé :

\\(S=\\sqrt{3}\\,U\\,I\\)

\\(P=\\sqrt{3}\\,U\\,I\\cos\\varphi\\)

\\(Q=\\sqrt{3}\\,U\\,I\\sin\\varphi\\)

et le triangle des puissances :

\\(S^2=P^2+Q^2\\)

Le facteur de puissance est :

\\(\\cos\\varphi=\\frac{P}{S}\\)

avec :

- \\(P\\) en W ;
- \\(Q\\) en var ;
- \\(S\\) en VA ;
- \\(U\\) la tension entre phases ;
- \\(I\\) le courant de ligne.

Toutes les charges étudiées sont équilibrées.`,


questions:[


// ==================================================
// QUESTION 1
// ==================================================

{
texte:`Un récepteur triphasé absorbe un courant de \\(I=${I}\\,A\\) sous une tension entre phases de \\(U=${U}\\,V\\). Calculer sa puissance apparente \\(S\\).`,
reponse:arrondi(S_UI/1000),
unite:"kVA",
feedback:`
Pour un récepteur triphasé équilibré :

\\(S=\\sqrt{3}\\,U\\,I\\)

Donc :

\\(S=\\sqrt{3}\\times${U}\\times${I}
=${arrondi(S_UI)}\\,VA\\).

Soit :

\\(S=${arrondi(S_UI/1000)}\\,kVA\\).
`
},


// ==================================================
// QUESTION 2
// ==================================================

{
texte:`Le récepteur précédent possède un facteur de puissance de \\(\\cos\\varphi=${cosphi}\\). Calculer sa puissance active \\(P\\).`,
reponse:arrondi(P_UI/1000),
unite:"kW",
feedback:`
On utilise :

\\(P=S\\cos\\varphi\\)

La puissance apparente vaut :

\\(S=${arrondi(S_UI/1000)}\\,kVA\\).

Donc :

\\(P=${arrondi(S_UI/1000)}\\times${cosphi}
=${arrondi(P_UI/1000)}\\,kW\\).
`
},


// ==================================================
// QUESTION 3
// ==================================================

{
texte:`À partir des résultats précédents, calculer la puissance réactive \\(Q\\) absorbée par le récepteur.`,
reponse:arrondi(Q_UI/1000),
unite:"kvar",
feedback:`
On utilise le triangle des puissances :

\\(S^2=P^2+Q^2\\)

On isole \\(Q\\) :

\\(Q=\\sqrt{S^2-P^2}\\)

Avec :

\\(S=${arrondi(S_UI/1000)}\\,kVA\\)

et

\\(P=${arrondi(P_UI/1000)}\\,kW\\).

On obtient :

\\(Q=${arrondi(Q_UI/1000)}\\,kvar\\).
`
},


// ==================================================
// QUESTION 4
// ==================================================

{
texte:`Un moteur triphasé fournit une puissance active absorbée de \\(P=${PkW}\\,kW\\) avec un facteur de puissance \\(\\cos\\varphi=${cosphi}\\). Calculer sa puissance apparente.`,
reponse:arrondi(S_Pcos/1000),
unite:"kVA",
feedback:`
Le facteur de puissance est défini par :

\\(\\cos\\varphi=\\frac{P}{S}\\)

On isole \\(S\\) :

\\(S=\\frac{P}{\\cos\\varphi}\\)

Donc :

\\(S=\\frac{${PkW}}{${cosphi}}
=${arrondi(S_Pcos/1000)}\\,kVA\\).
`
},


// ==================================================
// QUESTION 5
// ==================================================

{
texte:`Le moteur précédent est alimenté sous \\(400\\,V\\). Calculer le courant de ligne absorbé.`,
reponse:arrondi(I_Pcos),
unite:"A",
feedback:`
En triphasé :

\\(S=\\sqrt{3}\\,U\\,I\\)

On isole le courant :

\\(I=\\frac{S}{\\sqrt{3}\\,U}\\)

Avec :

\\(S=${arrondi(S_Pcos/1000)}\\,kVA\\)

et

\\(U=${U}\\,V\\).

On obtient :

\\(I=${arrondi(I_Pcos)}\\,A\\).
`
},


// ==================================================
// QUESTION 6
// ==================================================

{
texte:`À partir de la puissance apparente et de la puissance active du moteur précédent, calculer sa puissance réactive.`,
reponse:arrondi(Q_Pcos/1000),
unite:"kvar",
feedback:`
On utilise :

\\(S^2=P^2+Q^2\\)

Donc :

\\(Q=\\sqrt{S^2-P^2}\\)

Avec :

\\(S=${arrondi(S_Pcos/1000)}\\,kVA\\)

et

\\(P=${PkW}\\,kW\\).

On obtient :

\\(Q=${arrondi(Q_Pcos/1000)}\\,kvar\\).
`
},


// ==================================================
// QUESTION 7
// ==================================================

{
texte:`Une installation triphasée absorbe une puissance active de \\(P=${PkW}\\,kW\\) et une puissance réactive de \\(Q=${Qkvar}\\,kvar\\). Calculer sa puissance apparente.`,
reponse:arrondi(S_PQ/1000),
unite:"kVA",
feedback:`
On utilise le triangle des puissances :

\\(S=\\sqrt{P^2+Q^2}\\)

Donc :

\\(S=\\sqrt{${PkW}^2+${Qkvar}^2}
=${arrondi(S_PQ/1000)}\\,kVA\\).
`
},


// ==================================================
// QUESTION 8
// ==================================================

{
texte:`Pour l'installation précédente, calculer le facteur de puissance \\(\\cos\\varphi\\).`,
reponse:arrondi(cosphi_PQ),
unite:"",
feedback:`
Le facteur de puissance est :

\\(\\cos\\varphi=\\frac{P}{S}\\)

Donc :

\\(\\cos\\varphi=
\\frac{${PkW}}{${arrondi(S_PQ/1000)}}
=${arrondi(cosphi_PQ)}\\).
`
},


// ==================================================
// QUESTION 9
// ==================================================

{
texte:`L'installation précédente est alimentée sous \\(400\\,V\\). Calculer le courant de ligne correspondant.`,
reponse:arrondi(I_PQ),
unite:"A",
feedback:`
La puissance apparente est liée au courant par :

\\(S=\\sqrt{3}\\,U\\,I\\)

On isole :

\\(I=\\frac{S}{\\sqrt{3}\\,U}\\)

Donc :

\\(I=\\frac{${arrondi(S_PQ/1000)}\\times1000}
{\\sqrt{3}\\times${U}}
=${arrondi(I_PQ)}\\,A\\).
`
},


// ==================================================
// QUESTION 10
// ==================================================

{
texte:`Un autre récepteur triphasé absorbe une puissance apparente de \\(S=${arrondi(S_UI/1000)}\\,kVA\\) avec un facteur de puissance de \\(\\cos\\varphi=${cosphi}\\). Calculer directement sa puissance active.`,
reponse:arrondi(S_UI/1000*cosphi),
unite:"kW",
feedback:`
La puissance active est :

\\(P=S\\cos\\varphi\\)

Donc :

\\(P=${arrondi(S_UI/1000)}
\\times${cosphi}
=${arrondi(S_UI/1000*cosphi)}\\,kW\\).
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