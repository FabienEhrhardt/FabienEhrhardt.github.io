let theme="1";
let nomExo="exo0";

let chapitre="Energie / Puissance";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Rendement \\(\\eta=\\)",
    choix: [
        "\\(\\frac{P_u}{P_a}\\)",
        "\\(\\frac{P_a}{P_u}\\)",
        "\\(P_u+P_a\\)",
        "\\(P_a-P_u\\)"
    ]
},
{
    texte: "Puissance absorbée \\(P_a=\\)",
    choix: [
        "\\(\\frac{P_u}{\\eta}\\)",
        "\\({P_u} \\times {\\eta}\\)",
        "\\(P_u-P_p\\)",
        "\\(P_u\\)"
    ]
},
{
    texte: "Puissance utile \\(P_u=\\)",
    choix: [
        "\\(P_a \\times \\eta\\)",
        "\\(P_a+P_p\\)",
        "\\(\\frac{P_a}{\\eta}\\)",
        "\\(P_p\\)"
    ]
},
{
    texte: "Rendement \\(\\eta=\\)",
    choix: [
        "\\(\\frac{E_u}{E_a}\\)",
        "\\(\\frac{E_a}{E_u}\\)",
        "\\(E_u+P_a\\)",
        "\\(E_a-E_u\\)"
    ]
},
{
    texte: "Energie absorbée \\(E_a=\\)",
    choix: [
        "\\(\\frac{E_u}{\\eta}\\)",
        "\\({E_u} \\times {\\eta}\\)",
        "\\(E_u-E_p\\)",
        "\\(E_u\\)"
    ]
},
{
    texte: "Energie utile \\(E_u=\\)",
    choix: [
        "\\(E_a \\times \\eta\\)",
        "\\(E_a+E_p\\)",
        "\\(\\frac{E_a}{\\eta}\\)",
        "\\(E_p\\)"
    ]
},
{
    texte: "Energie perdue \\(E_p=\\)",
    choix: [
        "\\(E_a-E_u\\)",
        "\\(E_a+E_p\\)",
        "\\(\\frac{E_u}{\\eta}\\)",
        "\\(\\frac{E_a}{\\eta}\\)"
    ]
},
{
    texte: "Puissance perdue \\(P_p=\\)",
    choix: [
        "\\(P_a-P_u\\)",
        "\\(P_a+P_p\\)",
        "\\(\\frac{P_u}{\\eta}\\)",
        "\\(\\frac{P_a}{\\eta}\\)"
    ]
},
{
    texte: "Facteur de charge \\(F=\\)",
    choix: [
        "\\(\\frac{E_{réelle}}{P_n \\Delta t}\\)",
        "\\(\\frac{E_{réelle}\\Delta t}{P_n }\\)",
        "\\(\\frac{E_{réelle}}{P_n }\\)",
        "\\(\\frac{P_n }{E_{réelle}}\\)"
    ]
},
{
    texte: "1 Wh =",
    choix: [
        "\\(3 600 J\\)",
        "\\(360 J\\)",
        "\\(1000 J\\)",
        "\\(\\frac{1}{3600} J\\)"
    ]
},
{
    texte: "1 kWh =",
    choix: [
        "\\(3 600 000 J\\)",
        "\\(360 J\\)",
        "\\(1000 J\\)",
        "\\(\\frac{1}{3600000} J\\)"
    ]
},
{
    texte: "Energie \\(\\Delta E\\)",
    choix: [
        "\\({P}\\times{\\Delta t}\\)",
        "\\(\\frac{P}{\\Delta t}\\)",
        "\\(P \\times 3600\\)",
        "\\(\\frac{P}{3600}\\)"
    ]
},
];