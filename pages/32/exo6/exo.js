// =====================
// PARAMÈTRES
// =====================

// Génération

let U=230;

// Courant fondamental
let I1=Math.floor(Math.random()*16+10);

// Courant efficace total
let Iharm=[4,5,6,7,8,10][Math.floor(Math.random()*6)];
let Ieff=Math.sqrt(I1*I1+Iharm*Iharm);

// Déphasage du fondamental
let cosphi=[0.75,0.80,0.85,0.90,0.95][Math.floor(Math.random()*5)];
let phi=Math.acos(cosphi);


// =====================
// CALCULS
// =====================

// Courant harmonique global
let Ih= Math.sqrt(Ieff*Ieff-I1*I1);

// THD courant
let THDi=Ih/I1;

// Puissance apparente
let S=U*Ieff;

// Puissance active
let P=U*I1*cosphi;

// Puissance réactive
let Q=U*I1*Math.sin(phi);

// Puissance déformante
let D=Math.sqrt(S*S-P*P-Q*Q);

// Facteur de puissance global
let PF=P/S;

// Puissance apparente liée au fondamental
let S1=U*I1;


// =====================
// EXERCICE
// =====================

let theme="32";
let nomExo="exo6";

let exo={

titre:"Bilan de puissance monophasé avec harmoniques de courant",

enonce:`Un récepteur monophasé non linéaire est alimenté par une tension sinusoïdale de \\(230\\,V\\).

Le courant absorbé n'est pas parfaitement sinusoïdal : il contient un courant fondamental et des courants harmoniques.

Les mesures donnent :
<ul>
<li> tension efficace : \\(U=${U}\\,V\\) ;</li>
<li> courant fondamental efficace : \\(I_1=${I1}\\,A\\) ;</li>
<li> courant efficace total : \\(I=${arrondi(Ieff)}\\,A\\) ;</li>
<li> facteur de puissance de la composante fondamentale : \\(\\cos\\varphi_1=${cosphi}\\).</li>
</ul>
On considère que la tension d'alimentation est parfaitement sinusoïdale.

On utilise les relations :
<ul>
<li>\\(S=UI\\)</li>
<li>\\(P=UI_1\\cos\\varphi_1\\)</li>
<li>\\(Q=UI_1\\sin\\varphi_1\\)</li>
<li>\\(D=\\sqrt{S^2-P^2-Q^2}\\)</li>
<li>Le taux de distorsion harmonique du courant est : \\(THD_I=\\frac{I_{harm}}{I_1}\\)</li>
<li>avec : \\(I_{harm}=\\sqrt{I^2-I_1^2}\\).</li>
</ul>

`,

questions:[


// ==================================================
// QUESTION 1
// ==================================================

{
texte:`Calculer le courant efficace correspondant à l'ensemble des harmoniques \\(I_{harm}\\).`,
reponse:arrondi(Ih),
unite:"A",
feedback:`
Le courant efficace total contient le fondamental et les harmoniques.

On utilise :

\\(I^2=I_1^2+I_{harm}^2\\)

Donc :

\\(I_{harm}=\\sqrt{I^2-I_1^2}\\)

\\(I_{harm}=\\sqrt{${arrondi(Ieff)}^2-${I1}^2}
=${arrondi(Ih)}\\,A\\).
`
},


// ==================================================
// QUESTION 2
// ==================================================

{
texte:`Calculer le taux de distorsion harmonique du courant \\(THD_I\\). Donner le résultat en %.`,
reponse:arrondi(THDi*100),
unite:"%",
feedback:`
Le taux de distorsion harmonique est :

\\(THD_I=\\frac{I_{harm}}{I_1}\\)

Donc :

\\(THD_I=\\frac{${arrondi(Ih)}}{${I1}}
=${arrondi(THDi*100)}\\,\\%\\).
`
},


// ==================================================
// QUESTION 3
// ==================================================

{
texte:`Calculer la puissance apparente absorbée par le récepteur.`,
reponse:arrondi(S),
unite:"VA",
feedback:`
En monophasé, la puissance apparente se calcule avec le courant efficace total :

\\(S=UI\\)

Attention : il faut utiliser le courant efficace total et non uniquement le courant fondamental.

\\(S=${U}\\times${arrondi(Ieff)}
=${arrondi(S)}\\,VA\\).
`
},


// ==================================================
// QUESTION 4
// ==================================================

{
texte:`Calculer la puissance active consommée par le récepteur.`,
reponse:arrondi(P),
unite:"W",
feedback:`
La tension est sinusoïdale. La puissance active est donc liée au courant fondamental :

\\(P=UI_1\\cos\\varphi_1\\)

Donc :

\\(P=${U}\\times${I1}\\times${cosphi}
=${arrondi(P)}\\,W\\).
`
},


// ==================================================
// QUESTION 5
// ==================================================

{
texte:`Calculer la puissance réactive associée au fondamental.`,
reponse:arrondi(Q),
unite:"var",
feedback:`
La puissance réactive est calculée à partir du courant fondamental :

\\(Q=UI_1\\sin\\varphi_1\\)

On détermine d'abord :

\\(\\sin\\varphi_1=\\sqrt{1-\\cos^2\\varphi_1}\\)

Puis :

\\(Q=${U}\\times${I1}\\times\\sin\\varphi_1
=${arrondi(Q)}\\,var\\).
`
},


// ==================================================
// QUESTION 6
// ==================================================

{
texte:`Calculer la puissance déformante \\(D\\) due à la présence des harmoniques.`,
reponse:arrondi(D),
unite:"VA",
feedback:`
Avec un courant non sinusoïdal, on utilise :

\\(D=\\sqrt{S^2-P^2-Q^2}\\)

Donc :

\\(D=\\sqrt{${arrondi(S)}^2-${arrondi(P)}^2-${arrondi(Q)}^2}\\)

\\(D=${arrondi(D)}\\,VA\\).
`
},


// ==================================================
// QUESTION 7
// ==================================================

{
texte:`Calculer le facteur de puissance global du récepteur.`,
reponse:arrondi(PF),
unite:"",
feedback:`
Le facteur de puissance global est :

\\(PF=\\frac{P}{S}\\)

Attention : avec des harmoniques, il ne faut pas simplement prendre \\(\\cos\\varphi_1\\).

On obtient :

\\(PF=\\frac{${arrondi(P)}}{${arrondi(S)}}
=${arrondi(PF)}\\).
`
},


// ==================================================
// QUESTION 8
// ==================================================

{
texte:`Calculer la puissance apparente correspondant uniquement au fondamental \\(S_1\\).`,
reponse:arrondi(S1),
unite:"VA",
feedback:`
Pour le fondamental :

\\(S_1=UI_1\\)

Donc :

\\(S_1=${U}\\times${I1}
=${arrondi(S1)}\\,VA\\).
`
},


// ==================================================
// QUESTION 9
// ==================================================

{
texte:`On suppose que les harmoniques sont supprimés par un filtre et que le courant efficace devient égal au courant fondamental \\(I_1=${I1}\\,A\\). Calculer la nouvelle puissance apparente.`,
reponse:arrondi(S1),
unite:"VA",
feedback:`
Sans les harmoniques, le courant efficace devient :

\\(I=I_1=${I1}\\,A\\)

La puissance apparente devient donc :

\\(S=UI_1\\)

\\(S=${U}\\times${I1}
=${arrondi(S1)}\\,VA\\).

La suppression des harmoniques diminue donc la puissance apparente appelée au réseau.
`
},


// ==================================================
// QUESTION 10
// ==================================================

{
texte:`Après filtrage des harmoniques, la puissance active reste inchangée. Calculer le nouveau facteur de puissance.`,
reponse:arrondi(P/S1),
unite:"",
feedback:`
La puissance active ne change pas :

\\(P=${arrondi(P)}\\,W\\)

Après filtrage :

\\(S_1=${arrondi(S1)}\\,VA\\)

Le nouveau facteur de puissance est :

\\(PF=\\frac{P}{S_1}\\)

\\(PF=\\frac{${arrondi(P)}}{${arrondi(S1)}}
=${arrondi(P/S1)}\\).

Le facteur de puissance s'améliore après suppression des harmoniques.
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