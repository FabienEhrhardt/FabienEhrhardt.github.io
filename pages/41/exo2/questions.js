let theme="41";
let nomExo="exo2";

let chapitre="Mécanique en rotation";


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
    texte: "Moment d'inertie d'un cylindre \\(J=\\)",
    choix: [
        "\\(\\frac{1}{2}mR^2\\)",
        "\\(mR^2\\)",
        "\\(\\frac{1}{2}mv^2\\)",
        "\\(\\frac{1}{2}mD^2\\)"
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
    texte: "Couple \\(C=\\)",
    choix: [
        "\\(FR\\)",
        "\\(FD\\)",
        "\\(F\\)",
        "\\(\\frac{F}{R}\\)"
    ]
},
{
    texte: "Accélération angulaire \\(\\gamma=\\)",
    choix: [
        "\\(\\frac{d\\Omega}[dt}\\)",
        "\\(\\frac{d\\theta}[dt}\\)",
        "\\(\\Omega \\Delta t\\)",
        "\\(\\frac{d\\Omega}{d\\theta}\\)"
    ]
},
{
    texte: "Vitesse angulaire \\(v=\\)",
    choix: [
        "\\(\\frac{d\\theta}{dt}\\)",
        "\\(\\frac{d\\Omega}[dt}\\)",
        "\\(\\theta \\Delta t\\)",
        "\\(\\frac{d\\gamma}{d\\theta}\\)"
    ]
},
{
    texte: "Angle \\(\\theta\\)",
    choix: [
        "\\(Aire(\\Omega)\\)",
        "\\(Aire(\\gamma)\\)",
        "\\(\\frac{d\\Omega}{dt}\\)",
        "\\(\\frac{d\\gamma}{dt}\\)"
    ]
},
{
    texte: "\\(\\Omega(rad/s)\\)=",
    choix: [
        "\\(\\frac{2\\pi n (tr/min)}{60}\\)",
        "\\(2\\pi n (tr/min)\\)",
        "\\(\\frac{2\\pi n (tr/min)}{360}\\)",
        "\\(\\frac{2\\pi n (tr/min)}{3600}\\)"
    ]
},
{
    texte: "Principe fondamental de la dynamique \\(J \\frac{d\\Omega}{dt}=\\)",
    choix: [
        "\\(C_m-C_R\\)",
        "\\(C_m+C_R\\)",
        "\\(\\Sigma \\upperarrowright{F}\\)",
        "\\(\\Sigma F\\)"
    ]
},
{
    texte: "Energie cinétique \\(E_c=\\)",
    choix: [
        "\\(\\frac{1}{2}J \\Omega^2\\)",
        "\\(\\frac{1}{2}J n^2\\)",
        "\\(mgh\\)",
        "\\(\\frac{1}{2}mv^2\\)"
    ]
},
{
    texte: "Travail d'une force \\(W=\\)",
    choix: [
        "\\(C \\theta\\)",
        "\\(mgh\\)",
        "\\(C \\Omega\\)",
        "\\(Fv\\)"
    ]
},
{
    texte: "Puissance mécanique \\(P=\\)",
    choix: [
        "\\(C \\Omega\\)",
        "\\(mg\\)",
        "\\(F AB\\)",
        "\\(ma\\)"
    ]
},
{
    texte: "Rapport d'un réducteur \\(k=\\)",
    choix: [
        "\\(\\frac{\\Omega_m}{\\Omega}\\)",
        "\\(\\frac{C_m}{C}\\)",
        "\\(\\frac{C}{C_m}\\)",
        "\\(\\frac{P}{S}\\)"
    ]
},
{
    texte: "Relation vitesse  \\(v=\\)",
    choix: [
        "\\(R \\Omega\\)",
        "\\(\\frac{\\Omega}{R}\\)",
        "\\(\\frac{\\Omega}{2 \\pi R}\\)",
        "\\(\\frac{\\Omega}{D}\\)"
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