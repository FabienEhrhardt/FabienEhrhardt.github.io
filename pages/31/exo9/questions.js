let theme="31";
let nomExo="exo8";

let chapitre="Régime continu";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Puissance électrique \\(P=\\)",
    choix: [
        "\\(VI\\)",
        "\\(VI cos \\varphi\\)",
        "\\(\\sqrt{3} UI cos \\varphi\\)",
        "\\(VI sin \\varphi\\)"
    ]
},
{
    texte: "Loi d'Ohm \\(U=\\)",
    choix: [
        "\\(RI\\)",
        "\\(\\frac{I}{R}\\)",
        "\\(VI\\)",
        "\\(RI^2\\)"
    ]
},
{
    texte: "Energie électrique \\(E=\\)",
    choix: [
        "\\(P \\Delta t\\)",
        "\\(\\frac{P}{\\Delta t}\\)",
        "\\(\\frac{P}{\\Delta T}\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Energie électrique \\(E=\\)",
    choix: [
        "\\(VI\\Delta t\\)",
        "\\(\\frac{VI}{\\Delta t}\\)",
        "\\(\\frac{P}{\\Delta T}\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Energie électrique \\(E=\\)",
    choix: [
        "\\(V Q\\)",
        "\\(\\frac{Q}{\\Delta t}\\)",
        "\\(\\frac{P}{\\Delta T}\\)",
        "\\(VI\\Delta T\\)"
    ]
},
{
    texte: "Association de résistance en série \\(R_{th_{eq}}=\\)",
    choix: [
        "\\(R_1+R_2\\)",
        "\\(\\frac{1}{R_1}+\\frac{1}{R_2}\\)",
        "\\(\\frac{R_1 R_2}{R_1+R_2}\\)",
        "\\(R_1 R_2\\)"
    ]
},
{
    texte: "Association de résistance en parallèle \\(R_{th_{eq}}=\\)",
    choix: [
        "\\(\\frac{R_1 R_2}{R_1+R_2}\\)",
        "\\(\\frac{1}{R_1}+\\frac{1}{R_2}\\)",
        "\\(R_1+R_2\\)",
        "\\(R_1 R_2\\)"
    ]
},
{
    texte: "Association de résistance en parallèle \\(\\frac{1}{R_{th_{eq}}}=\\)",
    choix: [
        "\\(\\frac{1}{R_1}+\\frac{1}{R_2}\\)",
        "\\(R_1+R_2\\)",
        "\\(R_1 R_2\\)",
        "\\(\\frac{R_1 R_2}{R_1+R_2}\\)"
    ]
},
{
    texte: "Loi des mailles",
    choix: [
        "\\(U_1+U_2+…=0\\)",
        "\\(I_1+I_2+…=0\\)",
        "\\(I_{rentrant}=I_{sortant}\\)",
        "\\(I_{rentrant}=-I_{sortant}\\)"
    ]
},
{
    texte: "Loi des nœuds",
    choix: [
        "\\(I_1+I_2+…=0\\)",
        "\\(U_1+U_2+…=0\\)",
        "\\(I_{rentrant}=-I_{sortant}\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Loi des nœuds",
    choix: [
        "\\(I_{rentrant}=I_{sortant}\\)",
        "\\(U_1+U_2+…=0\\)",
        "\\(I_{rentrant}=-I_{sortant}\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Puissance dans une résistance \\(P=\\)",
    choix: [
        "\\(RI^2\\)",
        "\\(RI\\)",
        "\\(VI \\Delta t\\)",
        "\\(\\frac{V}{R}\\)"
    ]
},
{
    texte: "Puissance dans une résistance \\(P=\\)",
    choix: [
        "\\(\\frac{V^2}{R}\\)",
        "\\(RI\\)",
        "\\(VI \\Delta t\\)",
        "\\(\\frac{V}{R}\\)"
    ]
},
{
    texte: "Générateur de Thevenin \\(V=\\)",
    choix: [
        "\\(E-R_{int} I\\)",
        "\\(E+R_{int} I\\)",
        "\\(E+R_{int}+ I\\)",
        "\\(E-I\\)"
    ]
},
{
    texte: "Générateur de Norton \\(I=\\)",
    choix: [
        "\\(I_0-\\frac{V}{R_{int}}\\)",
        "\\(I_0+\\frac{V}{R_{int}}\\)",
        "\\(I_0+R_{int}+ V\\)",
        "\\(I_0+V\\)"
    ]
},
{
    texte: "\\(1 Ah=\\)",
    choix: [
        "\\(3600 C\\)",
        "\\(3600 J\\)",
        "\\(1Wh\\)",
        "\\(1000 C\\)"
    ]
},
{
    texte: "\\(1 Wh=\\)",
    choix: [
        "\\(3600 J\\)",
        "\\(3600 C\\)",
        "\\(1Ah\\)",
        "\\(1000 C\\)"
    ]
},
];