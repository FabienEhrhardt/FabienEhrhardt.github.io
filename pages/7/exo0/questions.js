let theme="7";
let nomExo="exo0";

let chapitre="Machine à courant continu";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Puissance totale absorbée \\(P_a=\\)",
    choix: [
        "\\(P_i+P_e\\)",
        "\\(P_i\\)",
        "\\(P_e\\)",
        "\\(\\frac{P_i}{P_e}\\)"
    ]
},
{
    texte: "Puissance totale absorbée \\(P_a=\\)",
    choix: [
        "\\(P_e+P_{ji}+P_{pm}+P_u\\)",
        "\\(P_e+P_{ji}+P_{pm}\\)",
        "\\(P_e+P_{ji}+P_{pm}+P_u+P_i\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Puissance à l'inducteur \\(P_e=\\)",
    choix: [
        "\\(V_e I_e\\)",
        "\\(R_e I_e\\)",
        "\\(V_e I_e cos \\varphi\\)",
        "\\(\\frac{V_e}{R_e}\\)"
    ]
},
{
    texte: "Puissance à l'inducteur \\(P_e=\\)",
    choix: [
        "\\(R_e I_e^2\\)",
        "\\(R_e I_e\\)",
        "\\(V_e I_e cos \\varphi\\)",
        "\\(\\frac{V_e}{R_e}\\)"
    ]
},
{
    texte: "Puissance à l'inducteur \\(P_e=\\)",
    choix: [
        "\\(\\frac{V_e^2}{R_e}\\)",
        "\\(R_e I_e\\)",
        "\\(V_e I_e cos \\varphi\\)",
        "\\(\\frac{V_e}{R_e}\\)"
    ]
},
{
    texte: "Puissance absorbée à l'induit \\(P_i=\\)",
    choix: [
        "\\(VI\\)",
        "\\(VI cos \\varphi\\)",
        "\\(R I^2\\)",
        "\\(\\frac{V^2}{R}\\)"
    ]
},
{
    texte: "Pertes joules à l'induit \\(P_{ji}=\\)",
    choix: [
        "\\(R I^2\\)",
        "\\(R_e I_e^2\\)",
        "\\(\\frac{V^2}{R}\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Puissance électromagnétique \\(P_{em}=\\)",
    choix: [
        "\\(EI\\)",
        "\\(VI\\)",
        "\\(C_u \\Omega\\)",
        "\\(R I^2\\)"
    ]
},
{
    texte: "Puissance électromagnétique \\(P_{em}=\\)",
    choix: [
        "\\(C_{em} \\Omega\\)",
        "\\(C_{em} \\Omega^2\\)",
        "\\(C_u \\Omega\\)",
        "\\(\\frac{C_{em}}{ \\Omega}\\)"
    ]
},
{
    texte: "Pertes mécaniques \\(P_{pm}=\\)",
    choix: [
        "\\(C_f \\Omega\\)",
        "\\(C_{em} \\Omega\\)",
        "\\(C_u \\Omega\\)",
        "\\(\\frac{C_{em}}{ \\Omega}\\)"
    ]
},
{
    texte: "Puissance utile \\(P_{u}=\\)",
    choix: [
        "\\(C_u \\Omega\\)",
        "\\(C_{em} \\Omega\\)",
        "\\(C_f \\Omega\\)",
        "\\(\\frac{C_{em}}{ \\Omega}\\)"
    ]
},
{
    texte: "Rendement du moteur \\(\\eta=\\)",
    choix: [
        "\\(\\frac{P_u}{P_a}\\)",
        "\\(\\frac{P_a}{P_u}\\)",
        "\\(\\frac{P_u}{P_i}\\)",
        "\\(\\frac{P_u}{P_e}\\)"
    ]
},
{
    texte: "Relation sur les tensions à l'induit \\(V=\\)",
    choix: [
        "\\(E-RI\\)",
        "\\(E+R\\)",
        "\\(RI\\)",
        "\\(E\\)"
    ]
},
{
    texte: "Force électromotrice \\(E=\\)",
    choix: [
        "\\(K \\Omega\\)",
        "\\(K I\\)",
        "\\(\\frac{\\Omega}{K}\\)",
        "\\(C \\Omega\\)"
    ]
},
{
    texte: "Vitesse de rotation \\(\\Omega=\\)",
    choix: [
        "\\(\\frac{2 \\pi n}{60}\\)",
        "\\(\\frac{n}{60}\\)",
        "\\({2 \\pi n}\\)",
        "\\(\\frac{2 \\pi n}{360}\\)"
    ]
},
{
    texte: "Couple électromagnétique \\(C_{em}\\)",
    choix: [
        "\\(K I\\)",
        "\\(K \\Omega\\)",
        "\\(\\frac{E}{I}\\)",
        "\\(\\frac{E}{\\Omega}\\)"
    ]
},
{
    texte: "Couple utile \\(C_u=\\)",
    choix: [
        "\\(C_{em}-C_f\\)",
        "\\(C_{em}+C_f\\)",
        "\\(\\eta C_{em}\\)",
        "\\(\\eta P_{u}\\)"
    ]
},
{
    texte: "Principe fondamental de la dynamique \\(J \\frac{d \\Omega }{dt}=\\)",
    choix: [
        "\\(C_u-C_R\\)",
        "\\(C_u-C_em\\)",
        "\\(C_u-C_f\\)",
        "\\(C_{em}-C_f\\)"
    ]
},
];