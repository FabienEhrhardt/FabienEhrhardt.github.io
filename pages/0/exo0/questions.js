let theme="0";
let nomExo="exo0";

let chapitre="Unités 1";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Rendement",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(W\\)",
        "\\(J\\)"
    ]
},
{
    texte: "Energie absorbée",
    choix: [
        "\\(J\\)",
        "\\(W\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Energie utile",
    choix: [
        "\\(J\\)",
        "\\(W\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Energie perdue",
    choix: [
        "\\(J\\)",
        "\\(W\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Puissance absorbée",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Puissance utile",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Puissance perdue",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Facteur de charge",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(W\\)",
        "\\(J\\)"
    ]
},
{
    texte: "Température",
    choix: [
        "\\(K\\)",
        "\\(°\\)",
        "\\(m\\)",
        "\\(s\\)"
    ]
},
{
    texte: "Courant électrique",
    choix: [
        "\\(A\\)",
        "\\(C\\)",
        "\\(W\\)",
        "\\(V\\)"
    ]
},
{
    texte: "Tension électrique",
    choix: [
        "\\(V\\)",
        "\\(A\\)",
        "\\(C\\)",
        "\\(W\\)"
    ]
},
{
    texte: "Charge électrque",
    choix: [
        "\\(C\\)",
        "\\(Ah\\)",
        "\\(V\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Puissance électrique",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Energie électrique",
    choix: [
        "\\(J\\)",
        "\\(W\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Résistance",
    choix: [
        "\\(\\Omega\\)",
        "\\(F\\)",
        "\\(H\\)",
        "\\(K/W\\)"
    ]
},
{
    texte: "Durée",
    choix: [
        "\\(s\\)",
        "\\(h\\)",
        "\\(min\\)",
        "\\(m\\)"
    ]
},
{
    texte: "Force électromotrice",
    choix: [
        "\\(V\\)",
        "\\(N\\)",
        "\\(Nm\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Fréquence",
    choix: [
        "\\(Hz\\)",
        "\\(s\\)",
        "\\(m\\)",
        "\\(V\\)"
    ]
},
{
    texte: "Pulsation",
    choix: [
        "\\(rad/s\\)",
        "\\(rad\\)",
        "\\(s\\)",
        "\\(Hz\\)"
    ]
},
{
    texte: "Période",
    choix: [
        "\\(s\\)",
        "\\(h\\)",
        "\\(rad\\)",
        "\\(m\\)"
    ]
},
{
    texte: "Déphasage",
    choix: [
        "\\(°\\)",
        "\\(°C\\)",
        "\\(s\\)",
        "\\(rad/s\\)"
    ]
},
{
    texte: "Inductance",
    choix: [
        "\\(H\\)",
        "\\(F\\)",
        "\\(\\Omega\\)",
        "\\(Hz\\)"
    ]
},
{
    texte: "Capacité",
    choix: [
        "\\(F\\)",
        "\\(H\\)",
        "\\(\\Omega\\)",
        "\\(Hz\\)"
    ]
},
{
    texte: "Puissance active",
    choix: [
        "\\(W\\)",
        "\\(var\\)",
        "\\(VA\\)",
        "\\(J\\)"
    ]
},
{
    texte: "Puissance réactive",
    choix: [
        "\\(var\\)",
        "\\(W\\)",
        "\\(VA\\)",
        "\\(J\\)"
    ]
},
{
    texte: "Puissance apparente",
    choix: [
        "\\(VA\\)",
        "\\(var\\)",
        "\\(W\\)",
        "\\(Wh\\)"
    ]
},
{
    texte: "Facteur de puissance",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(W\\)",
        "\\(Wh\\)"
    ]
},
{
    texte: "Energie électrique",
    choix: [
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(V\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Rapport de transformation",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(V\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Pertes joules",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Pertes ferromagnétiques",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Impédance",
    choix: [
        "\\(\\Omega\\)",
        "\\(F\\)",
        "\\(H\\)",
        "\\(K/W\\)"
    ]
},
{
    texte: "Masse",
    choix: [
        "\\(kg\\)",
        "\\(g\\)",
        "\\(N\\)",
        "\\(Nm\\)"
    ]
},
{
    texte: "Force",
    choix: [
        "\\(N\\)",
        "\\(Nm\\)",
        "\\(kg\\)",
        "\\(Pa\\)"
    ]
},
{
    texte: "Couple",
    choix: [
        "\\(Nm\\)",
        "\\(N\\)",
        "\\(kg\\)",
        "\\(Pa\\)"
    ]
},
{
    texte: "Energie cinétique",
    choix: [
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Energie potentielle",
    choix: [
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Puissance mécanique",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Surface",
    choix: [
        "\\(m^2\\)",
        "\\(m\\)",
        "\\(m^3\\)",
        "\\(m^4\\)"
    ]
},
{
    texte: "Volume",
    choix: [
        "\\(m^3\\)",
        "\\(m\\)",
        "\\(m^2\\)",
        "\\(m^4\\)"
    ]
},
{
    texte: "Hauteur",
    choix: [
        "\\(m\\)",
        "\\(s\\)",
        "\\(m^2\\)",
        "\\(m^3\\)"
    ]
},
{
    texte: "Diamètre",
    choix: [
        "\\(m\\)",
        "\\(s\\)",
        "\\(m^2\\)",
        "\\(\\pi\\)"
    ]
},
{
    texte: "Rayon",
    choix: [
        "\\(m\\)",
        "\\(s\\)",
        "\\(m^2\\)",
        "\\(\\pi\\)"
    ]
},
{
    texte: "Tension nominale",
    choix: [
        "\\(V\\)",
        "\\(A\\)",
        "\\(W\\)",
        "\\(Wh\\)"
    ]
},
{
    texte: "Courant nominal",
    choix: [
        "\\(A\\)",
        "\\(V\\)",
        "\\(W\\)",
        "\\(Wh\\)"
    ]
},
{
    texte: "Glissement",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(tr/min\\)",
        "\\(rad/s\\)"
    ]
},
{
    texte: "Vitesse angulaire",
    choix: [
        "\\(rad/s\\)",
        "\\(rad \\cdot s\\)",
        "\\(tr/min\\)",
        "\\(rad\\)"
    ]
},
{
    texte: "Couple utile",
    choix: [
        "\\(Nm\\)",
        "\\(N\\)",
        "\\(A\\)",
        "\\(W\\)"
    ]
},
];