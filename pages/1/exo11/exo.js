// =====================
// PARAMÈTRES
// =====================

let valeurs=[
    3600, 7200, 18000, 36000, 72000,
    180000, 360000, 720000, 1800000, 3600000
];

let E1=valeurs[Math.floor(Math.random()*valeurs.length)]; // J
let E2=[2,5,12,25,50,75,120][Math.floor(Math.random()*7)]; // kJ
let E3=[0.5,1.2,2.5,4,7.5,12][Math.floor(Math.random()*6)]; // kWh
let E4=[250,500,750,1200,2500,5000][Math.floor(Math.random()*6)]; // Wh
let E5=[0.1,0.25,0.5,1,2][Math.floor(Math.random()*5)]; // tep
let E6=[0.5,1,2,5,10][Math.floor(Math.random()*5)]; // tec
let E7=[100,250,500,1000,2500,5000][Math.floor(Math.random()*6)]; // cal
let E8=[1,2.5,5,10,25,50][Math.floor(Math.random()*6)]; // MJ
let E9=[1000,5000,10000,25000,50000][Math.floor(Math.random()*5)]; // BTU
let E10=[1e6,5e6,1e7,5e7,1e8][Math.floor(Math.random()*5)]; // eV

// =====================
// CONVERSIONS
// =====================

// Constantes utilisées
let JparkWh=3600000;
let JparWh=3600;
let JparCal=4.184;
let JparBTU=1055.06;
let JparEV=1.602176634e-19;

// Convention énergétique
let JparTep=41.868e9;
let JparTec=29.3076e9;


// =====================
// CALCULS
// =====================

let R1=E1/3600;              // Wh
let R2=E2*1000;              // J
let R3=E3*1000;              // kJ
let R4=E4/1000;              // kWh
let R5=E5*JparTep/1e6;       // MJ
let R6=E6*JparTec/1e9;       // GJ
let R7=E7*JparCal;           // J
let R8=E8*1000;              // kJ
let R9=E9*JparBTU/1000;      // kJ
let R10=E10*JparEV;          // J


// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo11";

let exo={
titre:"Conversions d'énergie",

enonce:`En électrotechnique, l'énergie peut être exprimée dans différentes unités selon le contexte : énergie électrique consommée, énergie thermique, énergie des combustibles ou énergie à l'échelle microscopique.

Pour cet exercice, utiliser les équivalences suivantes :
<ul>
<li> \\(1\\,Wh=3600\\,J\\)</li>
<li> \\(1\\,kWh=3,6\\,MJ\\)</li>
<li> \\(1\\,cal=4,184\\,J\\)</li>
<li> \\(1\\,BTU\\approx1055\\,J\\)</li>
<li> \\(1\\,tep=41,868\\,GJ\\)</li>
<li> \\(1\\,tec=29,3076\\,GJ\\)</li>
<li> \\(1\\,eV=1,602\\times10^{-19}\\,J\\)</li>
</ul>
Attention : une conversion d'énergie ne modifie pas la quantité d'énergie, uniquement son unité.`,

questions:[

{
texte:`Convertir \\(${E1}\\,J\\) en Wh.`,
reponse:R1,
unite:"Wh",
feedback:`On utilise :

\\(1\\,Wh=3600\\,J\\)<br>

Donc :

\\(E(Wh)=\\dfrac{E(J)}{3600}\\)<br>

\\(E=\\dfrac{${E1}}{3600}\\)<br>

\\(E=\\boxed{${arrondi(R1,3)}\\,Wh}\\)`
},

{
texte:`Convertir \\(${E2}\\,kJ\\) en joules.`,
reponse:R2,
unite:"J",
feedback:`Le préfixe kilo signifie \\(1000\\).<br>

\\(1\\,kJ=1000\\,J\\)<br>

\\(E=${E2}\\times1000\\)<br>

\\(E=\\boxed{${arrondi(R2,0)}\\,J}\\)`
},

{
texte:`Convertir \\(${E3}\\,kWh\\) en kJ.`,
reponse:R3,
unite:"kJ",
feedback:`On utilise :

\\(1\\,kWh=3600\\,kJ\\)<br>

\\(E=${E3}\\times3600\\)<br>

\\(E=\\boxed{${arrondi(R3,2)}\\,kJ}\\)`
},

{
texte:`Un appareil consomme \\(${E4}\\,Wh\\). Convertir cette énergie en kWh.`,
reponse:R4,
unite:"kWh",
feedback:`\\(1\\,kWh=1000\\,Wh\\)<br>

\\(E(kWh)=\\dfrac{E(Wh)}{1000}\\)<br>

\\(E=\\dfrac{${E4}}{1000}\\)<br>

\\(E=\\boxed{${arrondi(R4,3)}\\,kWh}\\)`
},

{
texte:`Convertir \\(${E5}\\,tep\\) en MJ.`,
reponse:R5,
unite:"MJ",
feedback:`On utilise :

\\(1\\,tep=41,868\\,GJ=41868\\,MJ\\)<br>

\\(E=${E5}\\times41868\\)<br>

\\(E=\\boxed{${arrondi(R5,2)}\\,MJ}\\)`
},

{
texte:`Convertir \\(${E6}\\,tec\\) en GJ.`,
reponse:R6,
unite:"GJ",
feedback:`\\(1\\,tec=29,3076\\,GJ\\)<br>

\\(E=${E6}\\times29,3076\\)<br>

\\(E=\\boxed{${arrondi(R6,3)}\\,GJ}\\)`
},

{
texte:`Convertir \\(${E7}\\,cal\\) en joules.`,
reponse:R7,
unite:"J",
feedback:`\\(1\\,cal=4,184\\,J\\)<br>

\\(E=${E7}\\times4,184\\)<br>

\\(E=\\boxed{${arrondi(R7,2)}\\,J}\\)`
},

{
texte:`Convertir \\(${E8}\\,MJ\\) en kJ.`,
reponse:R8,
unite:"kJ",
feedback:`\\(1\\,MJ=1000\\,kJ\\)<br>

\\(E=${E8}\\times1000\\)<br>

\\(E=\\boxed{${arrondi(R8,0)}\\,kJ}\\)`
},

{
texte:`Convertir \\(${E9}\\,BTU\\) en kJ.`,
reponse:R9,
unite:"kJ",
feedback:`On utilise :

\\(1\\,BTU\\approx1055\\,J\\)<br>

\\(E(kJ)=\\dfrac{E(BTU)\\times1055,06}{1000}\\)<br>

\\(E=\\dfrac{${E9}\\times1055,06}{1000}\\)<br>

\\(E\\approx\\boxed{${arrondi(R9,2)}\\,kJ}\\)`
},

{
texte:`Convertir \\(${E10}\\,eV\\) en joules. Donner le résultat en notation ingénieur (résultat de la calculette).`,
reponse:R10,
unite:"J",
feedback:`\\(1\\,eV=1,602\\times10^{-19}\\,J\\)<br>

\\(E=${E10}\\times1,602\\times10^{-19}\\)<br>

En écriture ingénieur : \\(E\\approx\\boxed{${R10.toExponential(3)}\\,J}\\) <br>
En écriture scientifique : \\(E\\approx\\boxed{${(() => {
    let [a, b] = R10.toExponential(3).split("e");
    return `${a}\\times10^{${Number(b)}}`;
})()}\\,J
}\\)<br>

L'électronvolt est principalement utilisé à l'échelle atomique et des particules.`
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