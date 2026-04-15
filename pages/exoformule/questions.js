let theme="33";
let nomExo="exo0";

let chapitre="Transformateur monophasé";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Rapport du transformateur \\(m=\\)",
    choix: [
        "\\(\\frac{V_{20}}{V_1}\\)",
        "\\(\\frac{V_{2}}{V_1}\\)",
        "\\(\\frac{V_{1}}{V_2}\\)",
        "\\(\\frac{I_{1}}{I_2}\\)"
    ]
},
{
    texte: "Courant nominal au primaire \\(I_{1n}=\\)",
    choix: [
        "\\(\\frac{S_n}{V_{1n}}\\)",
        "\\(\\frac{S_n}{V_{2n}}\\)",
        "\\(\\frac{S_n}{V_{20}}\\)",
        "\\({S_n}{V_{1n}}\\)"
    ]
},
{
    texte: "Courant nominal au secondaire \\(I_{2n}=\\)",
    choix: [
        "\\(\\frac{S_n}{V_{2n}}\\)",
        "\\(\\frac{S_n}{V_{20}}\\)",
        "\\(\\frac{S_n}{V_{1n}}\\)",
        "\\({S_n}{V_{1n}}\\)"
    ]
},
{
    texte: "Pertes Fer \\(P_F=\\)",
    choix: [
        "\\(P_0\\)",
        "\\(P_{cc}\\)",
        "\\(P_0+P_{cc}\\)",
        "\\(P_0-P_{cc}\\)"
    ]
},
{
    texte: "Pertes Fer \\(P_F=\\)",
    choix: [
        "\\(\\frac{V_1^2}{R_F}\\)",
        "\\(R_F I_{10}^2\\)",
        "\\(R_F I_{2cc}^2\\)",
        "\\(\\frac{V_1}{R_F}\\)"
    ]
},
{
    texte: "Puissance réactive absorbée à vide \\(Q_0=\\)",
    choix: [
        "\\(\\frac{V_1^2}{L_m \\omega}\\)",
        "\\({L_m \\omega} I_{10}^2\\)",
        "\\({L_m \\omega} I_{2cc}^2\\)",
        "\\(\\frac{V_1^2}{L_m }\\)"
    ]
},
{
    texte: "Pertes joules nominales \\(P_{jn}\\)=",
    choix: [
        "\\(P_{cc}\\)",
        "\\(P_0\\)",
        "\\(P_0+P_{cc}\\)",
        "\\(P_0-P_{cc}\\)"
    ]
},
{
    texte: "Pertes joules nominales \\(P_{jn}\\)=",
    choix: [
        "\\(R_s I_{2cc}^2\\)",
        "\\(R_s I_{2cc}\\)",
        "\\(\\frac{V_{1cc}}{R_s}\\)",
        "\\(\\frac{V_{20}}{R_s}\\)"
    ]
},
{
    texte: "Puissance réactive absorbée en court circuit \\(Q_{cc}\\)=",
    choix: [
        "\\(L_s \\omega I^2_{2cc}\\)",
        "\\(L_s  I^2_{2cc}\\)",
        "\\(\\frac{V_{1cc}}{L_s \\omega}\\)",
        "\\(\\frac{V_{20}}{L_s \\omega}\\)"
    ]
},
{
    texte: "Puissance utile \\(P_2=\\)",
    choix: [
        "\\(V_2I_2 cos \\varphi_2\\)",
        "\\(V_2I_2\\)",
        "\\(V_1I_1\\)",
        "\\(V_1I_1 cos \\varphi_1\\)"
    ]
},
{
    texte: "Puissance absorbée \\(P_1=\\)",
    choix: [
        "\\(V_1I_1 cos \\varphi_1\\)",
        "\\(V_2I_2\\)",
        "\\(V_1I_1\\)",
        "\\(V_2I_2 cos \\varphi_2\\)"
    ]
},
{
    texte: "Puissance absorbée \\(P_1=\\)",
    choix: [
        "\\(P_2+P_j+P_F\\)",
        "\\(P_2+P_j\\)",
        "\\(P_2+P_F\\)",
        "\\(P_2+P_j-P_F\\)"
    ]
},
{
    texte: "Pertes joules \\(P_j\\)=",
    choix: [
        "\\(P_{cc} \\frac{I_2^2}{I_{2cc}^2}\\)",
        "\\(P_{cc} \\frac{I_{2cc}^2}{I_2^2}\\)",
        "\\(P_{cc} \\frac{V_20}{V_2}\\)",
        "\\(R_s I_2\\)"
    ]
},
{
    texte: "Réactance en sortie \\(X_s\\)=",
    choix: [
        "\\(L_s \\omega\\)",
        "\\(R_s\\)",
        "\\(Z_s\\)",
        "\\(\\sqrt{R_s^2+(L_s \\omega)^2}\\)"
    ]
},
{
    texte: "Impédance au secondaire \\(Z_s=\\)",
    choix: [
        "\\(\\sqrt{R_s^2+(L_s \\omega)^2}\\)",
        "\\(L_s \\omega\\)",
        "\\(R_s\\)",
        "\\(R_s +L_s\\)"
    ]
},
{
    texte: "Pertes joules \\(P_j\\)=",
    choix: [
        "\\(R_s I_{2}^2\\)",
        "\\(R_s I_{1}^2\\)",
        "\\(\\frac{V_2^2}{R_s}\\)",
        "\\(\\frac{V_1^2}{R_s}\\)"
    ]
},
{
    texte: "Impédance au secondaire \\(Z_s=\\)",
    choix: [
        "\\(\\frac{mV_{1cc}}{I_{2cc}}\\)",
        "\\(\\frac{V_{1cc}}{I_{2cc}}\\)",
        "\\(\\frac{V_{2cc}}{I_{2cc}}\\)",
        "\\(\\frac{mV_{2cc}}{I_{2cc}}\\)"
    ]
},
{
    texte: "Courant de court circuit \\(I_{k}\\)",
    choix: [
        "\\(\\frac{mV_{1}}{Z_{s}}\\)",
        "\\(\\frac{mV_{1}}{R_{s}}\\)",
        "\\(\\frac{mV_{1}}{L_{s}}\\)",
        "\\(\\frac{mV_{1}}{L_{s}\\omega}\\)"
    ]
},
{
    texte: "Chute de tension \\(\\Delta V\\)",
    choix: [
        "\\(I_2 ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(I_1 ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(I_1 ( R_F cos \\varphi+X_m sin \\varphi)\\)",
        "\\(I_2 ( R_F cos \\varphi+X_m sin \\varphi)\\)"
    ]
},
{
    texte: "Rendement du transformateur \\(\\eta\\)=",
    choix: [
        "\\(\\frac{P_u}{P_a}\\)",
        "\\(\\frac{P_a}{P_u}\\)",
        "\\(\\frac{P_u}{P_a-P_p}\\)",
        "\\(\\frac{P_u-P_p}{P_a}\\)"
    ]
},
];