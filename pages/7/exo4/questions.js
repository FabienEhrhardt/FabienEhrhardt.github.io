let theme="7";
let nomExo="exo4";

let chapitre="Machine asynchrone";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Vitesse de synchronisme \\(n_s=\\)",
    choix: [
        "\\(\\frac{60 f}{p}\\)",
        "\\(\\frac{60 f}{P}\\)",
        "\\(\\frac{\\omega}{p}\\)",
        "\\(n\\)"
    ]
},
{
    texte: "glissement\\(g=\\)",
    choix: [
        "\\(\\frac{n_s-n}{n_s}\\)",
        "\\(\\frac{n}{n_s}\\)",
        "\\(\\frac{n-n_s}{n_s}\\)",
        "\\(\\frac{n_s}{n_s-n}\\)"
    ]
},
{
    texte: "Puissance absorbée \\(P_a=\\)",
    choix: [
        "\\(\\sqrt{3} UI cos \\varphi\\)",
        "\\(UI\\)",
        "\\(\\sqrt{3} VI cos \\varphi\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Puissance utile \\(P_{u}=\\)",
    choix: [
        "\\(P_a-P_{js}-P_{fs}-P_{jr}-P_{pm}\\)",
        "\\(P_a-P_{js}-P_{fs}-P_{jr}-P_{pm}-P_{em}\\)",
        "\\(P_{em}\\)",
        "\\((1-g) P_a\\)"
    ]
},
{
    texte: "Pertes joules statoriques \\(P_{js}=\\)",
    choix: [
        "\\(\\frac{3}{2}RI^2\\)",
        "\\(RI^2\\)",
        "\\(3RI^2\\)",
        "\\(\\frac{V^2}{R}\\)"
    ]
},
{
    texte: "Puissance électromagnétique \\(P_{em}=\\)",
    choix: [
        "\\(C_{em} \\Omega_s\\)",
        "\\(C_{em} \\Omega\\)",
        "\\(C_u \\Omega\\)",
        "\\(\\frac{C_{em}}{ \\Omega}\\)"
    ]
},
{
    texte: "Pertes joules rotoriques \\(P_{jr}=\\)",
    choix: [
        "\\(g P_{em}\\)",
        "\\((1-g) P_{em}\\)",
        "\\(\\frac{1-g}{g} P_{em}\\)",
        "\\(g P_{a}\\)"
    ]
},
{
    texte: "Pertes fer rotoriques \\(P_{fr}=\\)",
    choix: [
        "\\(0\\)",
        "\\(P_{em}\\)",
        "\\(P_{jr}+P_{js}\\)",
        "\\(P\\)"
    ]
},
{
    texte: "Puissance mécanique \\(P_m=\\)",
    choix: [
        "\\(C_{em} \\Omega\\)",
        "\\(C_{em} \\Omega_s\\)",
        "\\(C_u \\Omega\\)",
        "\\(g P_{em}\\)"
    ]
},
{
    texte: "Puissance mécanique \\(P_m=\\)",
    choix: [
        "\\((1-g) P_{em}\\)",
        "\\(C_{em} \\Omega_s\\)",
        "\\(C_u \\Omega\\)",
        "\\(g P_{em}\\)"
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
    texte: "Couple utile \\(C_u=\\)",
    choix: [
        "\\(C_{em}-C_f\\)",
        "\\(C_{em}+C_f\\)",
        "\\(\\eta C_{em}\\)",
        "\\(\\eta P_{u}\\)"
    ]
},
{
    texte: "Principe fondamental de la dynamique \\(J \\frac{d \\Omega }{dt}",
    choix: [
        "\\(C_u-C_R\\)",
        "\\(C_u-C_em\\)",
        "\\(C_u-C_f\\)",
        "\\(C_{em}-C_f\\)"
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
];