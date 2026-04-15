let theme="41";
let nomExo="exo0";

let chapitre="Mécanique en translation";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Volume d'un cylindre \\(V=\\)",
    choix: [
        "\\(\\pi R^2 h\\)",
        "\\(2\\pi R h\\)",
        "\\(2\\pi R^2 h\\)",
        "\\(\\frac{4}{3}\\pi R^2 h\\)"
    ]
},
{
    texte: "Masse d'un objet \\(m=\\)",
    choix: [
        "\\(\\rho V\\)",
        "\\(P\\)",
        "\\(\\frac{V}{\\rho}\\)",
        "\\(\\frac{\\rho}{V}\\)"
    ]
},
{
    texte: "Accélération \\(a=\\)",
    choix: [
        "\\(\\frac{dv}[dt}\\)",
        "\\(\\frac{dx}[dt}\\)",
        "\\(v \\Delta t\\)",
        "\\(\\frac{dv}{dx}\\)"
    ]
},
{
    texte: "Vitesse \\(v=\\)",
    choix: [
        "\\(\\frac{dx}{dt}\\)",
        "\\(\\frac{dv}[dt}\\)",
        "\\(x\\Delta t\\)",
        "\\(\\frac{da}{dx}\\)"
    ]
},
{
    texte: "Distance \\(x\\)",
    choix: [
        "\\(Aire(v)\\)",
        "\\(Aire(a)\\)",
        "\\(\\frac{dv}{dt}\\)",
        "\\(\\frac{da}{dt}\\)"
    ]
},
{
    texte: "\\(v(m/s)\\)=",
    choix: [
        "\\(\\frac{v(km/h)}{3,6}\\)",
        "\\(\\frac{v(km/h)}{360}\\)",
        "\\(\\frac{v(km/h)}{100}\\)",
        "\\(\\frac{v(km/h)}{3600}\\)"
    ]
},
{
    texte: "Principe fondamental de la dynamique \\(m\\upperarrowright{a}\\)",
    choix: [
        "\\(\\Sigma \\upperarrowright{F}\\)",
        "\\(C_m-C_R\\)",
        "\\(F\\)",
        "\\(\\Sigma F\\)"
    ]
},
{
    texte: "Energie cinétique \\(E_c=\\)",
    choix: [
        "\\(\\frac{1}{2}mv^2\\)",
        "\\(\\frac{1}{2}mv\\)",
        "\\(mgh\\)",
        "\\(F AB\\)"
    ]
},
{
    texte: "Energie potentielle \\(E_p=\\)",
    choix: [
        "\\(mgh\\)",
        "\\(\\frac{1}{2}mv\\)",
        "\\(\\frac{1}{2}mv^2\\)",
        "\\(F AB\\)"
    ]
},
{
    texte: "Travail d'une force \\(W=\\)",
    choix: [
        "\\(F AB\\)",
        "\\(mgh\\)",
        "\\(\\frac{1}{2}mv^2\\)",
        "\\(P\\)"
    ]
},
{
    texte: "Puissance mécanique \\(P=\\)",
    choix: [
        "\\(Fv\\)",
        "\\(mg\\)",
        "\\(Fa\\)",
        "\\(ma\\)"
    ]
},
{
    texte: "Expression du poids \\(P=\\)",
    choix: [
        "\\(mg\\)",
        "\\(m\\)",
        "\\(g\\)",
        "\\(mgh\\)"
    ]
},
{
    texte: "Poussée d'Archimède \\(\\Pi=\\)",
    choix: [
        "\\(\\rho gV\\)",
        "\\(\\rho gh\\)",
        "\\(mg\\)",
        "\\(\\rho V\\)"
    ]
},
{
    texte: "Masse volumique \\(\\rho=\\)",
    choix: [
        "\\(\\frac{m}{V}\\)",
        "\\(\\frac{V}{m}\\)",
        "\\({m}{V}\\)",
        "\\(Q_v\\)"
    ]
},
];