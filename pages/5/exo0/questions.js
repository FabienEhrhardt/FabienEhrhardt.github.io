let theme="5";
let nomExo="exo0";

let chapitre="Batteries";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Charge d'une batterie \\(Q=\\)",
    choix: [
        "\\(I \\Delta t\\)",
        "\\(I \\Delta T\\)",
        "\\(\\frac{I}{\\Delta t}\\)",
        "\\(\\frac{I}{\\Delta T}\\)"
    ]
},
{
    texte: "Energie stockée \\(W=\\)",
    choix: [
        "\\(QV\\)",
        "\\(IV\\)",
        "\\(\\frac{Q}{I}\\)",
        "\\(\\frac{E}{\\Delta t}\\)"
    ]
},
{
    texte: "Energie volumique \\(W_v=\\)",
    choix: [
        "\\(\\frac{W}{V}\\)",
        "\\(\\frac{W}{m}\\)",
        "\\(\\frac{W}{\\Delta t}\\)",
        "\\(\\frac{W}{\\Delta T}\\)"
    ]
},
{
    texte: "Rendement d'un cycle de charge/décharge \\(\eta=\\)",
    choix: [
        "\\(\\frac{W_{décharge}}{W{charge}}\\)",
        "\\(\\frac{P_u}{P_a}\\)",
        "\\(\\frac{P_{charge}}{P_{décharge}}\\)",
        "\\(\\frac{E_u}{E_a}\\)"
    ]
},
{
    texte: "Modèle de Thévenin  en convention récepteur \\(V=\\)",
    choix: [
        "\\(E+R_{int}I\\)",
        "\\(E-R_{int}I\\)",
        "\\(E+R_{int}+I\\)",
        "\\(E\\)"
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
    texte: "Tension aux bornes de 2 batteries en série \\(V_{ensemble}\\)",
    choix: [
        "\\(2V\\)",
        "\\(V\\)",
        "\\(\\frac{V}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Tension aux bornes de 2 batteries en parallèle  \\(V_{ensemble}\\)",
    choix: [
        "\\(V\\)",
        "\\(2V\\)",
        "\\(\\frac{V}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Courant fourni par 2 batteries en série \\(I_{ensemble}\\)",
    choix: [
        "\\(I\\)",
        "\\(2I\\)",
        "\\(\\frac{I}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Courant fourni par 2 batteries en parallèle  \\(I_{ensemble}\\)",
    choix: [
        "\\(2I\\)",
        "\\(I\\)",
        "\\(\\frac{I}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Energie stockée dans 2 batteries en série \\(W_{ensemble}\\)",
    choix: [
        "\\(2W\\)",
        "\\(W\\)",
        "\\(\\frac{W}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Energie stockée dans 2 batteries en parallèle  \\(W_{ensemble}\\)",
    choix: [
        "\\(2W\\)",
        "\\(W\\)",
        "\\(\\frac{W}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Capacité totale de 2 batteries en série \\(Q_{ensemble}\\)",
    choix: [
        "\\(Q\\)",
        "\\(2Q\\)",
        "\\(\\frac{Q}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Capacité totale de 2 batteries en parallèle  \\(Q_{ensemble}\\)",
    choix: [
        "\\(2Q\\)",
        "\\(Q\\)",
        "\\(\\frac{Q}{2}\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Profondeur de décharge \\(PDC=\\)",
    choix: [
        "\\(\\frac{W_{max}-W_{stock}}{W_{max}}\\)",
        "\\(\\frac{W_{stock}}{W_{max}}\\)",
        "\\(\\frac{W_{max}-W_{stock}}{W_{stock}}\\)",
        "\\(\\frac{W_{max}}{W_{stock}}\\)"
    ]
},
{
    texte: "Etat de charge \\(SOC=\\)",
    choix: [
        "\\(\\frac{W_{stock}}{W_{max}}\\)",
        "\\(\\frac{W_{max}-W_{stock}}{W_{stock}}\\)",
        "\\(\\frac{W_{max}-W_{stock}}{W_{max}}\\)",
        "\\(\\frac{W_{max}}{W_{stock}}\\)"
    ]
},
{
    texte: "Energie libérée lors d'une combustion \\(E=\\)",
    choix: [
        "\\(PC \\times m\\)",
        "\\(PC\\)",
        "\\(P \\times C\\)",
        "\\(P \\times C \\times m\\)"
    ]
},
];