let theme="33";
let nomExo="exo3";

let chapitre="Transformateur triphasé";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Rapport du transformateur \\(m=\\)",
    choix: [
        "\\(\\frac{V_{a0}}{V_A}\\)",
        "\\(\\frac{V_{a}}{V_A}\\)",
        "\\(\\frac{V_{A}}{V_a}\\)",
        "\\(\\frac{I_{A}}{I_{a0}}\\)"
    ]
},
{
    texte: "Rapport du transformateur \\(m=\\)",
    choix: [
        "\\(\\frac{U_{ab0}}{U_{AB}}\\)",
        "\\(\\frac{V_{a}}{V_A}\\)",
        "\\(\\frac{U_{AB}}{U_{ab}}\\)",
        "\\(\\frac{I_{A}}{I_{a0}}\\)"
    ]
},
{
    texte: "Courant nominal au primaire \\(I_{1n}=\\)",
    choix: [
        "\\(\\frac{S_n}{\\sqrt{3}U_{AB}}\\)",
        "\\(\\frac{S_n}{\\sqrt{3}U_{ab}}\\)",
        "\\(\\frac{S_n}{U_{AB}}\\)",
        "\\(\\frac{S_n}{U_{ab}}\\)"
    ]
},
{
    texte: "Courant nominal au primaire \\(I_{1n}=\\)",
    choix: [
        "\\(\\frac{S_n}{3V_{A}}\\)",
        "\\(\\frac{S_n}{3V_{a}}\\)",
        "\\(\\frac{S_n}{V_{A}}\\)",
        "\\({S_n}{V_{A}}\\)"
    ]
},
{
    texte: "Courant nominal au secondaire \\(I_{2n}=\\)",
    choix: [
        "\\(\\frac{S_n}{\\sqrt{3}U_{ab}}\\)",
        "\\(\\frac{S_n}{\\sqrt{3}U_{AB}}\\)",
        "\\(\\frac{S_n}{U_{AB}}\\)",
        "\\(\\frac{S_n}{U_{ab}}\\)"
    ]
},
{
    texte: "Courant nominal au secondaire \\(I_{2n}=\\)",
    choix: [
        "\\(\\frac{S_n}{3V_{a}}\\)",
        "\\(\\frac{S_n}{3V_{A}}\\)",
        "\\(\\frac{S_n}{V_{A}}\\)",
        "\\({S_n}{V_{A}}\\)"
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
        "\\(3\\frac{V_{A}^2}{R_F}\\)",
        "\\(3R_F I_{A0}^2\\)",
        "\\(3R_F I_{acc}^2\\)",
        "\\(\\frac{V_A^2}{R_F}\\)"
    ]
},
{
    texte: "Puissance réactive absorbée à vide \\(Q_0=\\)",
    choix: [
        "\\(3\\frac{V_A^2}{L_m \\omega}\\)",
        "\\(3{L_m \\omega} I_{A0}^2\\)",
        "\\(3{L_m \\omega} I_{acc}^2\\)",
        "\\(\\frac{V_A^2}{L_m \\omega}\\)"
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
        "\\(3R_s I_{acc}^2\\)",
        "\\(3R_s I_{acc}\\)",
        "\\(3\\frac{V_{acc}}{R_s}\\)",
        "\\(R_s I_{acc}^2\\)"
    ]
},
{
    texte: "Puissance réactive absorbée en court circuit \\(Q_{cc}\\)=",
    choix: [
        "\\(3L_s \\omega I^2_{acc}\\)",
        "\\(L_s  I^2_{acc}\\)",
        "\\(\\frac{V_{acc}}{L_s \\omega}\\)",
        "\\(L_s \\omega I^2_{acc}\\)"
    ]
},
{
    texte: "Puissance utile \\(P_2=\\)",
    choix: [
        "\\(3V_aI_a cos \\varphi_2\\)",
        "\\(3V_aI_a\\)",
        "\\(3V_AI_A\\)",
        "\\(3V_AI_A cos \\varphi_1\\)"
    ]
},
{
    texte: "Puissance absorbée \\(P_1=\\)",
    choix: [
        "\\(3V_AI_A cos \\varphi_1\\)",
        "\\(3V_aI_a\\)",
        "\\(3V_AI_A\\)",
        "\\(3V_aI_a cos \\varphi_2\\)"
    ]
},
{
    texte: "Puissance absorbée \\(P_1=\\)",
    choix: [
        "\\(P_2+P_j+P_F\\)",
        "\\(3P_2+P_j+P_F\\)",
        "\\(P_2+P_F\\)",
        "\\(P_2+P_j-P_F\\)"
    ]
},
{
    texte: "Pertes joules \\(P_j\\)=",
    choix: [
        "\\(P_{cc} \\frac{I_a^2}{I_{acc}^2}\\)",
        "\\(P_{cc} \\frac{I_{acc}^2}{I_a^2}\\)",
        "\\(P_{cc} \\frac{V_{A0}}{V_a}\\)",
        "\\(3P_{cc} \\frac{I_a^2}{I_{acc}^2}\\)"
    ]
},
{
    texte: "Réactance en sortie \\(X_s\\)=",
    choix: [
        "\\(L_s \\omega\\)",
        "\\(3L_s \\omega\\)",
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
        "\\(3R_s I_{a}^2\\)",
        "\\(3R_s I_{A}^2\\)",
        "\\(3\\frac{V_a^2}{R_s}\\)",
        "\\(R_s I_{a}^2\\)"
    ]
},
{
    texte: "Impédance au secondaire \\(Z_s=\\)",
    choix: [
        "\\(\\frac{mV_{Acc}}{I_{acc}}\\)",
        "\\(\\frac{mU_{ABcc}}{I_{acc}}\\)",
        "\\(\\frac{V_{acc}}{I_{acc}}\\)",
        "\\(\\frac{mV_{acc}}{I_{acc}}\\)"
    ]
},
{
    texte: "Courant de court circuit \\(I_{k}\\)",
    choix: [
        "\\(\\frac{mV_{A}}{Z_{s}}\\)",
        "\\(3\\frac{mV_{A}}{Z_{s}}\\)",
        "\\(\\frac{mV_{A}}{L_{s}}\\)",
        "\\(\\frac{mV_{A}}{L_{s}\\omega}\\)"
    ]
},
{
    texte: "Chute de tension \\(\\Delta V\\)",
    choix: [
        "\\(I_a ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(3 I_a ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(\\sqrt{3} I_a ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(I_a ( R_F cos \\varphi+X_m sin \\varphi)\\)"
    ]
},
{
    texte: "Chute de tension \\(\\Delta U\\)",
    choix: [
        "\\(\\sqrt{3} I_a ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(3 I_a ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(I_a ( R_s cos \\varphi+X_s sin \\varphi)\\)",
        "\\(I_a ( R_F cos \\varphi+X_m sin \\varphi)\\)"
    ]
},
{
    texte: "Rendement du transformateur \\(\\eta\\)=",
    choix: [
        "\\(\\frac{P_u}{P_a}\\)",
        "\\(\\frac{P_a}{P_u}\\)",
        "\\(3\\frac{P_u}{P_a}\\)",
        "\\(\\frac{P_u-P_p}{P_a}\\)"
    ]
},
];