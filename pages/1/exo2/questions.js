let theme="1";
let nomExo="exo2";

let chapitre="Energie et transferts thermiques ";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Energie thermique \\(Q=\\)",
    choix: [
        "\\(m C_m \\Delta T\\)",
        "\\(m C_m \\Delta t\\)",
        "\\(\\frac{P}{\\Delta t}\\)",
        "\\(\\frac{P}{\\Delta T}\\)"
    ]
},
{
    texte: "Energie massique de changement d'état \\(Q=\\)",
    choix: [
        "\\(m E_m\\)",
        "\\(E_m\\)",
        "\\(m \\Delta T\\)",
        "\\(\\frac{\\Delta T}{R_{th}}\\)"
    ]
},
{
    texte: "Flux thermique \\(\\Phi=\\)",
    choix: [
        "\\(\\frac{\\Delta Q}{\\Delta t}\\)",
        "\\(\\frac{\\Delta Q}{\\Delta T}\\)",
        "\\(P \\times \\Delta t\\)",
        "\\(P \\times \\Delta T\\)"
    ]
},
{
    texte: "Loi d'Ohm thermique \\(\\Delta T=\\)",
    choix: [
        "\\(R_{th} \\Phi\\)",
        "\\(\\frac{\\Phi}{R_{th}}\\)",
        "\\(\\frac{Q}{R_{th}}\\)",
        "\\(Q R_{th}\\)"
    ]
},
{
    texte: "Résistance thermique en conduction \\(R_{th}=\\)",
    choix: [
        "\\(\\frac{e}{\\lambda S}\\)",
        "\\(\\frac{1}{\\lambda S}\\)",
        "\\(\\frac{e}{\\lambda}\\)",
        "\\(\\frac{1}{h S}\\)"
    ]
},
{
    texte: "Résistance thermique en convection \\(R_{th}=\\)",
    choix: [
        "\\(\\frac{1}{h S}\\)",
        "\\(\\frac{e}{h S}\\)",
        "\\(\\frac{e}{h}\\)",
        "\\(\\frac{e}{\\lambda S}\\)"
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
    texte: "Surface d'une armoire \\(S=\\)",
    choix: [
        "\\(2(Lh+Lp+hp)\\)",
        "\\(Lhp\\)",
        "\\(2Lhp\\)",
        "\\(2(Lh \\times Lp \\times hp)\\)"
    ]
},
{
    texte: "Flux évacué par convection dans une armoire \\(\\Phi_c=\\)",
    choix: [
        "\\(\\frac{T_{int}-T_{ext}}{R_{th}}\\)",
        "\\(m C_m \\frac{\\Delta T}{\\Delta t}\\)",
        "\\(\\frac{T_{int}}{R_{th}}\\)",
        "\\(\\frac{T_{int}/T_{ext}}{R_{th}}\\)"
    ]
},
{
    texte: "Flux évacué par un ventilateur dans une armoire \\(\\Phi_c=\\)",
    choix: [
        "\\(m C_m \\frac{\\Delta T}{\\Delta t}\\)",
        "\\(\\frac{T_{int}-T_{ext}}{R_{th}}\\)",
        "\\(\\frac{T_{int}}{R_{th}}\\)",
        "\\(\\frac{T_{int}/T_{ext}}{R_{th}}\\)"
    ]
},
{
    texte: "Débit massique \\(Q_m=\\)",
    choix: [
        "\\(\\frac{\\Delta m}{\\Delta t}\\)",
        "\\(\\frac{\\Delta m}{\\Delta T}\\)",
        "\\(\\frac{\\Delta V}{\\Delta t}\\)",
        "\\(\\frac{\\Delta V}{\\Delta T}\\)"
    ]
},
{
    texte: "Débit volumique \\(Q_v=\\)",
    choix: [
        "\\(\\frac{\\Delta V}{\\Delta t}\\)",
        "\\(\\frac{\\Delta m}{\\Delta T}\\)",
        "\\(\\frac{\\Delta m}{\\Delta t}\\)",
        "\\(\\frac{\\Delta V}{\\Delta T}\\)"
    ]
},
{
    texte: "Débit massique \\(Q_m=\\)",
    choix: [
        "\\(\\rho Q_v\\)",
        "\\(\\frac{Q_v}{\\rho}\\)",
        "\\(\\frac{\\Delta m}{\\Delta T}\\)",
        "\\(\\frac{\\Delta V}{\\Delta t}\\)"
    ]
},
{
    texte: "Puissance perdue \\(P_p=\\)",
    choix: [
        "\\(P_a-P_u\\)",
        "\\(\\frac{P_a}{P_u}\\)",
        "\\(\\frac{P_u}{P_a}\\)",
        "\\(\\frac{P_u}{\\eta}\\)"
    ]
},
{
    texte: "Puissance perdue pour un appareil ne fonctionnant pas au nominal \\(P_p\\)",
    choix: [
        "\\(P_{pn} \\frac{I_e^2}{I_{en}^2}\\)",
        "\\(P_{pn} \\frac{I_{en}^2}{I_{e}^2}\\)",
        "\\(P_{pn} {I_{en}^2}\\)",
        "\\(P_{pn}\\)"
    ]
},
{
    texte: "Puissance dissipée totale \\(\\Phi_{tot}=\\)",
    choix: [
        "\\(\\Sigma P_p\\)",
        "\\(P_{p_{max}}\\)",
        "\\(P_{p_{min}}\\)",
        "\\(\\frac{P_{p_{max}}+P_{p_{max}}}{2}\\)"
    ]
},
{
    texte: "Flux thermique que doit évacuer le ventilateur \\(\\Phi_v=\\)",
    choix: [
        "\\(\\Phi_T-\\Phi_c\\)",
        "\\(\\Phi_T+\\Phi_c\\)",
        "\\(\\frac{\\Phi_T}{\\Phi_c}\\)",
        "\\(\\Phi_c-\\Phi_T\\)"
    ]
},
];