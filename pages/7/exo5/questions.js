let theme="7";
let nomExo="exo5";

let chapitre="Machine synchrone";


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
    texte: "Vitesse de rotation \\(n=\\)",
    choix: [
        "\\(\\frac{60 f}{p}\\)",
        "\\(\\frac{60 f}{P}\\)",
        "\\(\\frac{\\omega}{p}\\)",
        "\\(2 \\pi \\Omega\\)"
    ]
},
{
    texte: "Puissance absorbée \\(P_{a}=\\)",
    choix: [
        "\\(P_e+P_{ai}\\)",
        "\\(P_e\\)",
        "\\(\\sqrt{3} UI cos \\varphi\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Puissance absorbée à l'induit \\(P_{ai}=\\)",
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
        "\\(P_a-P_{js}-P_{fs}-P_{je}-P_{pm}\\)",
        "\\(P_a-P_{js}-P_{fs}-P_{jr}-P_{pm}-P_{em}\\)",
        "\\(P_{em}\\)",
        "\\((1-g) P_a\\)"
    ]
},
{
    texte: "Puissance à l'inducteur (si bobiné !) \\(P_e=\\)",
    choix: [
        "\\(V_e I_e\\)",
        "\\(R_e I_e\\)",
        "\\(V_e I_e cos \\varphi\\)",
        "\\(\\frac{V_e}{R_e}\\)"
    ]
},
{
    texte: "Puissance à l'inducteur (si bobiné !) \\(P_e=\\)",
    choix: [
        "\\(R_e I_e^2\\)",
        "\\(R_e I_e\\)",
        "\\(V_e I_e cos \\varphi\\)",
        "\\(\\frac{V_e}{R_e}\\)"
    ]
},
{
    texte: "Puissance à l'inducteur (si bobiné !) \\(P_e=\\)",
    choix: [
        "\\(\\frac{V_e^2}{R_e}\\)",
        "\\(R_e I_e\\)",
        "\\(V_e I_e cos \\varphi\\)",
        "\\(\\frac{V_e}{R_e}\\)"
    ]
},
{
    texte: "Puissance électromagnétique \\(P_{em}=\\)",
    choix: [
        "\\(C_{em} \\Omega_s\\)",
        "\\(C_{em} n\\)",
        "\\(C_u \\Omega\\)",
        "\\(\\frac{C_{em}}{ \\Omega}\\)"
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
    texte: "Pertes collectives \\(P_c=\\)",
    choix: [
        "\\(P_{fs}+P_{pm}\\)",
        "\\(P_{fs}\\)",
        "\\(P_{pm}\\)",
        "\\(P_{fs}-P_{pm}\\)"
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
    texte: "Principe fondamental de la dynamique \\(J \\frac{d \\Omega }{dt}=\\)",
    choix: [
        "\\(C_u-C_R\\)",
        "\\(C_u-C_{em}\\)",
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