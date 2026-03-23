// =====================
// PARAMÈTRES
// =====================

// Réseau monophasé
let U = 230; // V

// Données aléatoires
let P1 = (Math.floor(Math.random()*5)+5)*100; // 500 à 900 W
let cosphi1 = (Math.floor(Math.random()*4)+6)/10; // 0.6 à 0.9
let P2 = (Math.floor(Math.random()*5)+5)*100; // 500 à 900 W
let cosphi2 = (Math.floor(Math.random()*4)+6)/10; // 0.6 à 0.9
let eta=(Math.floor(Math.random()*15)+75); 

// Calculs
let S1 = P1 / cosphi1;
let Q1 = Math.sqrt(S1*S1 - P1*P1);
let I1 = S1 / U;

let P2a=P2/eta*100;
let S2 = P2a / cosphi2;
let Q2 = Math.sqrt(S2*S2 - P2a*P2a);
let I2 = S2 / U;

let Ptot=P1+P2a;
let Qtot=Q1+Q2;
let Stot=Math.sqrt(Ptot*Ptot + Qtot*Qtot);
let Itot=Stot/U;
let Fptot=Ptot/Stot;


// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo6";

let exo={

titre:"Bilan de puissance en monophasé",

enonce:`On alimente 2 charges monophasée sous ${U} V:<br>
La charge 1 consomme une puissance \\(P_1=${P1} W\\) avec un facteur de puissance \\(F_{p1} =${cosphi1}\\) en retard.<br>
La charge 2 est un moteur de puissance utile \\(P_{u2}=${P2} W\\) avec un \\(cos \\varphi_1 =${cosphi2}\\) et un rendement \\(\\eta_2=${eta} \\%\\).`,

questions:[

// =====================
{
texte:"Calculer la puissance réactive consommée par la charge 1 \\(Q_1\\)",
reponse:Q1,
unite:"var",
feedback:`\\(Q_1=P_1 \\times tan \\varphi_1=${P1}\\times tan (acos(${cosphi1})=${arrondi(Q1)}var\\)`
},

// =====================
{
texte:"Calculer la puissance apparente de la charge 1 \\(S_1\\)",
reponse:S1,
unite:"VA",
feedback:`\\(S_1=\\sqrt{P_1^2+Q^2_1}=${arrondi(S1)}VA\\)`
},

// =====================
{
texte:"Calculer la puissance absrobée par le moteur \\(P_{a2}\\)",
reponse:P2a,
unite:"W",
feedback:`\\(P_{a2}=\\frac{P_{u2}}{\\eta_2}=${arrondi(P2a)}W\\)`
},

// =====================
{
texte:`La puissance apparente absorbée par le moteur est de \\(S_2=${arrondi(S2)} VA\\), en déduire la puissance réactive \\(Q_2\\)`,
reponse:Q2,
unite:"var",
feedback:`\\(Q_2=\\sqrt{S_2^2-P_{a2}^2}=${arrondi(Q2)}var\\)`
},


// =====================
{
texte:"Calculer la puissance active absorbée totale \\(P_{tot}\\)",
reponse:Ptot,
unite:"W",
feedback:`\\(P_{tot}=P_1+P_{a2}=${arrondi(Ptot)} W\\)`
},

// =====================
{
texte:"Calculer la puissance réactive absorbée totale \\(Q_{tot}\\)",
reponse:Qtot,
unite:"var",
feedback:`\\(Q_{tot}=Q_1+Q_{2}=${arrondi(Qtot)} var\\)`
},

// =====================
{
texte:"Calculer la puissance apparente absorbée totale \\(S_{tot}\\)",
reponse:Stot,
unite:"VA",
feedback:`\\(S_{tot}=\\sqrt{P_{tot}^2+Q^2_{tot}}=${arrondi(Stot)} VA\\)`
},

// =====================
{
texte:"Calculer le courant absorbé total \\(I_{tot}\\)",
reponse:Itot,
unite:"A",
feedback:`\\(I_{tot}=\\frac{S_{tot}}{V}=${arrondi(Itot)} A\\) <br>
Attention on ne peut pas faire la somme des courants des charges 1 et 2!`
},

// =====================
{
texte:"Calculer le facteur de puissance de l'installation \\(F_{ptot}\\)",
reponse:Fptot,
unite:"",
feedback:`\\(F_{ptot}=\\frac{P_{tot}}{S_{tot}}=${arrondi(Fptot)}\\)`
},

// =====================
{
texte:"Est ce que le facteur de puissance est bon? (1=oui, 0=non)",
reponse:(Fptot>0.93)?1:0,
unite:"",
feedback:`Si \\(F_{ptot} < 0.93\\) le facteur de puissance n'est pas bon et on risque des pénalités du fournisseur d'énergie. Pour l'améliorer dans ce cas, on peut ajouter un condensateur en parallèle de l'installation`
},


]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
genererExercice(exo);
};