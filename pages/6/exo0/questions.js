let theme="6";
let nomExo="exo0";

let chapitre="Eclairage";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Fréquence \\(f=\\)",
    choix: [
        "\\(\\frac{1}{T}\\)",
        "\\(T\\)",
        "\\(2 \\pi \\omega\\)",
        "\\(\\frac{\\omega}{T}\\)"
    ]
},
{
    texte: "Célérité de la lumière \\(c=\\)",
    choix: [
        "\\(\\frac{\\Delta x}{\\Delta t}\\)",
        "\\(\\frac{\\Delta x}{T}\\)",
        "\\(\\frac{1}{f}\\)",
        "\\(T\\)"
    ]
},
{
    texte: "Célérité de la lumière \\(c=\\)",
    choix: [
        "\\(\\frac{\\lambda}{T}\\)",
        "\\(\\frac{\\Delta x}{ T}\\)",
        "\\(\\frac{\\lambda}{\\Delta t}\\)",
        "\\(T\\)"
    ]
},
{
    texte: "Température de couleur chaude \\(T\\)",
    choix: [
        "\\(<3000\\)",
        "\\(4000\\)",
        "\\(>5000\\)",
        "\\(?\\)"
    ]
},
{
    texte: "Flux lumineux \\(\\Phi=\\)",
    choix: [
        "\\(\\Omega I\\)",
        "\\(\\frac{I}{\\Omega}\\)",
        "\\(\\Omega\\)",
        "\\(I\\)"
    ]
},
{
    texte: "Efficacité lumineuse \\(\\eta=\\)",
    choix: [
        "\\(\\frac{\\Phi}{P_a}\\)",
        "\\(\\frac{P_a}{\\Phi}\\)",
        "\\(\\frac{I}{P_a}\\)",
        "\\(\\frac{I}{\\Phi}\\)"
    ]
},
{
    texte: "Eclairement \\(E=\\)",
    choix: [
        "\\(\\frac{\\Phi}{S}\\)",
        "\\(\\frac{\\Phi}{h^2}\\)",
        "\\(\\frac{I}{S}\\)",
        "\\(\\frac{I}{h}\\)"
    ]
},
{
    texte: "Uniformité \\(U_0=\\)",
    choix: [
        "\\(\\frac{E_{min}}{E_{max}}\\)",
        "\\(\\frac{E_{min}}{E_{moy}}\\)",
        "\\(\\frac{E_{moy}}{E_{max}}\\)",
        "\\(\\frac{E_{min}}{E_{moy}}\\)"
    ]
},
{
    texte: "Eclairement \\(E=\\)",
    choix: [
        "\\(\\frac{I}{h^2} (cos \\alpha)^3\\)",
        "\\(\\frac{\\Phi}{h^2}\\)",
        "\\(\\frac{I}{S}\\)",
        "\\(\\frac{I}{h}\\)"
    ]
},
{
    texte: "Surface éclairée pour un disque \\(S=\\)",
    choix: [
        "\\(\\pi R^2\\)",
        "\\(\\pi R\\)",
        "\\(2 \\pi R\\)",
        "\\(2 \\pi R^2\\)"
    ]
},
{
    texte: "Luminance \\(L=\\)",
    choix: [
        "\\(\\frac{I}{S_{source}}\\)",
        "\\(\\frac{\\Phi}{S_{source}}\\)",
        "\\(\\frac{\\Phi}{S_{éclairée}}\\)",
        "\\(\\frac{I}{S_{éclairée}}\\)"
    ]
},
{
    texte: "Rayon du disque éclairé au sol \\(R=\\)",
    choix: [
        "\\(h \\times tan \\alpha\\)",
        "\\(h \\times  sin \\alpha\\)",
        "\\(h \\times cos \\alpha\\)",
        "\\(\\frac{h}{cos \\alpha}\\)"
    ]
},
];