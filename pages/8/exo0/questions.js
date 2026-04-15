let theme="8";
let nomExo="exo0";

let chapitre="Maitrise des procédés";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Sensibilité \\(S=\\)",
    choix: [
        "\\(\\frac'\\Delta s}{\\Delta m}\\)",
        "\\(2^n-1\\)",
        "\\(\\frac{\\Delta s}{2^n-1}\\)",
        "\\(\\frac{\\Delta m}{2^n-1}\\)"
    ]
},
{
    texte: "Résolution du convertisseur CAN \\(q=\\)",
    choix: [
        "\\(\\frac{V_{max}-V_{min}}{2^n-1}\\)",
        "\\(\\frac{V_{max}}{2^n-1}\\)",
        "\\(\\frac{V_{max}+V_{min}}{2^n-1}\\)",
        "\\(\\frac{V_{min}}{2^n-1}\\)"
    ]
},
{
    texte: "Résolution de la chaine de mesure  \\(q=\\)",
    choix: [
        "\\(\\frac{\\Delta m}{2^n-1}\\)",
        "\\(\\frac{\\Delta s}{2^n-1}\\)",
        "\\(\\frac'\\Delta s}{\\Delta m}\\)",
        "\\(2^n-1\\)"
    ]
},
{
    texte: "Erreur absolue \\(\\epsilon=\\)",
    choix: [
        "\\(X_c-X_{s \infty}\\)",
        "\\(\\frac{X_c-X_{s \infty}}{X_c}\\)",
        "\\(\\frac{X_c-X_{s \infty}}{X_{s \infty}}\\)",
        "\\(\\frac{X_{s \infty}-X_c}{X_c}\\)"
    ]
},
{
    texte: "Erreur relative \\(\\epsilon_{\%}=\\)",
    choix: [
        "\\(\\frac{X_c-X_{s \infty}}{X_c}\\)",
        "\\(X_c-X_{s \infty}\\)",
        "\\(\\frac{X_c-X_{s \infty}}{X_{s \infty}}\\)",
        "\\(\\frac{X_{s \infty}-X_c}{X_c}\\)"
    ]
},
{
    texte: "Dépassement \\(D=\\)",
    choix: [
        "\\(\\frac{X_{s max}-X_{s \infty}}{X_{s \infty}}\\)",
        "\\(\\frac{X_{s max}-X_{c}}{X_{c}}\\)",
        "\\(\\frac{X_{s max}-X_{s \infty}}{X_{c}}\\)",
        "\\(\\frac{X_{s max}-X_{c}{X_{s \infty}}\\)"
    ]
},
{
    texte: "Nombre de valeur pour un signal n bits",
    choix: [
        "\\(2^n\\)",
        "\\(2^n-1\\)",
        "\\(n\\)",
        "\\(2n\\)"
    ]
},
{
    texte: "Valeur la plus grande pour un signal n bits",
    choix: [
        "\\(2^n-1\\)",
        "\\(2^n\\)",
        "\\(n\\)",
        "\\(2n\\)"
    ]
},
];