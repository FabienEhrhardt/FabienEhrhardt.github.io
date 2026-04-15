let theme="6";
let nomExo="exo2";

let chapitre="Panneau photovoltaïque";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Puissance électrique fournie par un panneau PV \\(P_{elec}=\\)",
    choix: [
        "\\(VI\\)",
        "\\(Phi S\\)",
        "\\(I\\)",
        "\\(VI cos \\varphi\\)"
    ]
},
{
    texte: "Puissance électrique fournie par un panneau PV \\(P_S=\\)",
    choix: [
        "\\(\\Phi S\\)",
        "\\(VI\\)",
        "\\(\\Phi\\)",
        "\\(VI cos \\varphi\\)"
    ]
},
{
    texte: "Rendement d'un panneau PV \\(\eta=\\)",
    choix: [
        "\\(\\frac{P_{elec}}{P_{S}}\\)",
        "\\(\\frac{P_{S}}{P_{elec}}\\)",
        "\\({P_{S}}{P_{elec}}\\)",
        "\\(P_{elec}\\)"
    ]
},
{
    texte: "Modèle de Norton  en convention générateur \\(I=\\)",
    choix: [
        "\\(I_0-\frac{V}{R_{int}}\\)",
        "\\(I_0+\frac{V}{R_{int}}\\)",
        "\\(I_0+ R_{int}+V\\)",
        "\\(I_0+ R_{int}-V\\)"
    ]
},
{
    texte: "Modèle de Thévenin  en convention générateur \\(V=\\)",
    choix: [
        "\\(E-R_{int}I\\)",
        "\\(E+R_{int}+I\\)",
        "\\(E\\)",
        "\\(E+R_{int}I\\)"
    ]
},
{
    texte: "Tension aux bornes de 2 Panneaux PV en série \\(V_{ensemble}\\)",
    choix: [
        "\\(2V\\)",
        "\\(V\\)",
        "\\(\\frac{V}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Tension aux bornes de 2 Panneaux PV en parallèle  \\(V_{ensemble}\\)",
    choix: [
        "\\(V\\)",
        "\\(2V\\)",
        "\\(\\frac{V}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Courant fourni par 2 Panneaux PV en série \\(I_{ensemble}\\)",
    choix: [
        "\\(I\\)",
        "\\(2I\\)",
        "\\(\\frac{I}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Courant fourni par 2 Panneaux PV en parallèle  \\(V_{ensemble}\\)",
    choix: [
        "\\(2I\\)",
        "\\(I\\)",
        "\\(\\frac{I}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Puissance fournie par 2 Panneaux PV en série \\(P_{ensemble}\\)",
    choix: [
        "\\(2P\\)",
        "\\(P\\)",
        "\\(\\frac{P}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Puissance fournie par 2 Panneaux PV en parallèle  \\(P_{ensemble}\\)",
    choix: [
        "\\(2P\\)",
        "\\(P\\)",
        "\\(\\frac{P}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Résistance interne \\(R_{int}=\\)",
    choix: [
        "\\(\\frac{\\Delta V}{\\Delta I}\\)",
        "\\(\\frac{\\Delta I}{\\Delta V}\\)",
        "\\(\\frac{ V}{ I}\\)",
        "\\(\\frac{ I}{ V}\\)"
    ]
},
];