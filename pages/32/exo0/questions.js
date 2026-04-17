let theme="32";
let nomExo="exo0";

let chapitre="Régime monophasé avec harmoniques de courant";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Puissance active P=",
    choix: [
        "\\(VI_1\\cos\\varphi\\)",
        "\\(VI\\)",
        "\\(VI_1\\)",
        "\\(VI\\cos\\varphi\\)"
    ]
},
{
    texte: "Puissance réactive Q=",
    choix: [
        "\\(VI_1\\sin\\varphi\\)",
        "\\(VI\\)",
        "\\(VI \\sin \\varphi\\)",
        "\\(P sin \\varphi\\)"
    ]
},
{
    texte: "Puissance apparente S=",
    choix: [
        "\\(VI\\)",
        "\\(VI \\cos \\varphi\\)",
        "\\(\\sqrt{P^2-Q^2}\\)",
        "\\(VI_1\\)"
    ]
},
{
    texte: "Puiissance déformante D=",
    choix: [
        "\\(\\sqrt{S^2-P^2-Q^2}\\)",
        "\\(\\sqrt{S^2+P^2+Q^2}\\)",
        "\\(\\sqrt{S^2-P^2+Q^2}\\)",
        "\\(\\sqrt{S^2+P^2-Q^2}\\)"
    ]
},
{
    texte: "Valeur efficace de la tension V=",
    choix: [
        "\\(\\frac{V_{max}}{\\sqrt{2}}\\)",
        "\\({V_{max}}{\\sqrt{2}}\\)",
        "\\(\\frac{V_{max}}{\\sqrt{3}}\\)",
        "\\({V_{max}}{\\sqrt{3}}\\)"
    ]
},
{
    texte: "Valeur efficace du courant I=",
    choix: [
        "\\(Faut\\:mesurer!\\)",
        "\\({I_{max}}{\\sqrt{2}}\\)",
        "\\(\\frac{I_{max}}{\\sqrt{2}}\\)",
        "\\({I_{max}}{\\sqrt{3}}\\)"
    ]
},
{
    texte: "Valeur efficace du courant I",
    choix: [
        "\\(\\ne \\frac{I_{max}}{\\sqrt{2}}\\)",
        "\\(={I_{max}}{\\sqrt{2}}\\)",
        "\\(= \\frac{I_{max}}{\\sqrt{2}}\\)",
        "\\(={I_{max}}{\\sqrt{3}}\\)"
    ]
},
{
    texte: "Pulsation \\(\\omega\\)=",
    choix: [
        "\\(2 \\pi f\\)",
        "\\(\\frac{f}{2\\pi}\\)",
        "\\(2 \\pi T\\)",
        "\\(\\frac{2\\pi}{60}n\\)"
    ]
},
{
    texte: "Fréquence f=",
    choix: [
        "\\(\\frac{1}{T}\\)",
        "\\(\\frac{T}{2\\pi}\\)",
        "\\(2 \\pi T\\)",
        "\\(2 \\pi \\omega\\)"
    ]
},
{
    texte: "Déphasage \\(\\varphi\\)=",
    choix: [
        "\\(acos DFP\\)",
        "\\(\\frac{V}{I}\\)",
        "\\(atan F_p\\)",
        "\\(acos F_p\\)"
    ]
},
{
    texte: "Puissance apparente S=",
    choix: [
        "\\(\\sqrt{P^2+Q^2+D^2 }\\)",
        "\\(\\sqrt{P^2-Q^2}\\)",
        "\\(\\sqrt{P^2+Q^2}\\)",
        "\\(P F_p\\)"
    ]
},
{
    texte: "Facteur de puissance \\(F_p\\)=",
    choix: [
        "\\(\\frac{P}{S}\\)",
        "\\(\\frac{S}{P}\\)",
        "\\(\\sin \\varphi\\)",
        "\\(\\tan \\varphi\\)"
    ]
},
{
    texte: "Facteur de puissance \\(F_p\\)",
    choix: [
        "\\(\\ne\\cos \\varphi\\)",
        "\\(=\\frac{S}{P}\\)",
        "\\(=\\cos \\varphi\\)",
        "\\(=\\tan \\varphi\\)"
    ]
},
{
    texte: "Déplacement du facteur de puissance \\(DFP\\)=",
    choix: [
        "\\(cos \\varphi\\)",
        "\\(\\frac{P}{S}\\)",
        "\\(\\frac{S}{P}\\)",
        "\\(\\varphi\\)"
    ]
},
{
    texte: "Puissance réactive Q=",
    choix: [
        "\\(P \\tan \\varphi\\)",
        "\\(P \\sin \\varphi\\)",
        "\\(S \\cos\\varphi\\)",
        "\\(\\sqrt{P^2-S^2}\\)"
    ]
},
{
    texte: "Energie E=",
    choix: [
        "\\(P \\Delta t\\)",
        "\\(\\frac{P}{\\Delta t}\\)",
        "\\(S \\cos\\varphi\\)",
        "\\(S \\Delta  t\\)"
    ]
},
{
    texte: "Puissance active totale \\(P_{tot}\\)=",
    choix: [
        "\\(P_1+P_2+…\\)",
        "\\(\\sqrt{P_1^2+P_2^2+...}\\)",
        "\\(VI\\)",
        "\\(RI\\)"
    ]
},
{
    texte: "Puissance réactive totale \\(Q_{tot}\\)=",
    choix: [
        "\\(Q_1+Q_2+…\\)",
        "\\(\\sqrt{Q_1^2+Q_2^2+...}\\)",
        "\\(VI\\)",
        "\\(RI\\)"
    ]
},
{
    texte: "Puissance déformante totale \\(D_{tot}\\)=",
    choix: [
        "\\(\\sqrt{S_{tot}^2-P_{tot}^2-Q_{tot}^2}\\)",
        "\\(\\sqrt{D_1^2+D_2^2+...}\\)",
        "\\(D_1+D_2+…\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Puissance apparente totale \\(S_{tot}\\)=",
    choix: [
        "\\(\\sqrt{P_{tot}^2+Q_{tot}^2+D_{tot}^2}\\)",
        "\\(\\sqrt{S_1^2+S_2^2+...}\\)",
        "\\(P_{tot}+Q_{tot}+D_{tot}\\)",
        "\\(S_1+S_2+…\\)"
    ]
},
{
    texte: "Taux de distorsion harmonique \\(THD_i\\)=",
    choix: [
        "\\(\\frac{\\sqrt{I_2^2+I_3^2+…}}{I_1}\\)",
        "\\(\\frac{\\sqrt{I_1^2+I_2^2+I_3^2+…}}{I_1}\\)",
        "\\(\\frac{\\sqrt{I_2^2+I_3^2+…}}{I}\\)",
        "\\(\\frac{\\sqrt{I_1^2+I_2^2+I_3^2+…}}{I}\\)"
    ]
},
{
    texte: "Taux de distorsion harmonique \\(THD_i\\)=",
    choix: [
        "\\(\\frac{\\sqrt{I^2-I_1^2}}{I_1}\\)",
        "\\(\\frac{\\sqrt{I_1^2+I_2^2+I_3^2+…}}{I_1}\\)",
        "\\(\\frac{\\sqrt{I^2-I_1^2}}{I}\\)",
        "\\(\\frac{\\sqrt{I_1^2+I_2^2+I_3^2+…}}{I}\\)"
    ]
},
{
    texte: "Valeur efficace du courant \\(I\\)=",
    choix: [
        "\\(\\sqrt{I_1^2+I^2_2+I_3^2+…}\\)",
        "\\(\\sqrt{I^2_2+I_3^2+…}\\)",
        "\\(I_1+I_2+I_3+…\\)",
        "\\(\\frac{I_{max}}{\\sqrt{2}}\\)"
    ]
},
{
    texte: "Fréquence de l'harmonique de rang n \\(f_n\\)=",
    choix: [
        "\\(n f_1\\)",
        "\\(f_1\\)",
        "\\(\\frac{f_1}{n}\\)",
        "\\(f_1+n\\)"
    ]
},
];