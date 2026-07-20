let theme="0";
let nomExo="exo4";

let chapitre="Unités 2";


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
    texte: "Flux thermique",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(A\\)",
        "\\(°\\)"
    ]
},
{
    texte: "Résistance thermique",
    choix: [
        "\\(K/W\\)",
        "\\(W/K\\)",
        "\\(\\Omega\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Energie thermique",
    choix: [
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(K\\)",
        "\\(°C\\)"
    ]
},
{
    texte: "Débit massique",
    choix: [
        "\\(kg/s\\)",
        "\\(kg/h\\)",
        "\\(m^2/s\\)",
        "\\(m^3/s\\)"
    ]
},
{
    texte: "Débit volumique",
    choix: [
        "\\(m^3/s\\)",
        "\\(m^3/h\\)",
        "\\(kg/s\\)",
        "\\(m^2/s\\)"
    ]
},
{
    texte: "Puissance thermique",
    choix: [
        "\\(W\\)",
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(W/h\\)"
    ]
},
{
    texte: "Taux de distorsion harmonique",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(V\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Puissance active",
    choix: [
        "\\(W\\)",
        "\\(var\\)",
        "\\(VA\\)",
        "\\(vad\\)"
    ]
},
{
    texte: "Puissance réactive",
    choix: [
        "\\(var\\)",
        "\\(W\\)",
        "\\(VA\\)",
        "\\(vad\\)"
    ]
},
{
    texte: "Puissance apparente",
    choix: [
        "\\(VA\\)",
        "\\(var\\)",
        "\\(W\\)",
        "\\(vad\\)"
    ]
},
{
    texte: "Puissance déformante",
    choix: [
        "\\(vad\\)",
        "\\(VA\\)",
        "\\(var\\)",
        "\\(W\\)"
    ]
},
{
    texte: "Déplacement du facteur de puissance",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(V\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Réactance",
    choix: [
        "\\(\\Omega\\)",
        "\\(F\\)",
        "\\(H\\)",
        "\\(K/W\\)"
    ]
},
{
    texte: "Moment d'intertie",
    choix: [
        "\\(kg \\cdot m^2\\)",
        "\\(kg /m^2\\)",
        "\\(kg \\cdot m^{-2}\\)",
        "\\(Nm\\)"
    ]
},
{
    texte: "Masse volumique",
    choix: [
        "\\(kg \\cdot m^{-3}\\)",
        "\\(kg /m^2\\)",
        "\\(kg\\)",
        "\\(kg \\cdot m^3\\)"
    ]
},
{
    texte: "Accélération",
    choix: [
        "\\(m \\cdot s^{-2}\\)",
        "\\(m \\cdot s^{-1}\\)",
        "\\(m/s\\)",
        "\\(rad/s\\)"
    ]
},
{
    texte: "Accélération angulaire",
    choix: [
        "\\(rad \\cdot s^{-2}\\)",
        "\\(m \\cdot s^{-2}\\)",
        "\\(m/s\\)",
        "\\(rad/s\\)"
    ]
},
{
    texte: "Vitesse",
    choix: [
        "\\(m \\cdot s^{-1}\\)",
        "\\(m \\cdot s^{-2}\\)",
        "\\(km/h\\)",
        "\\(rad/s\\)"
    ]
},
{
    texte: "Vitesse angulaire",
    choix: [
        "\\(rad \\cdot s^{-1}\\)",
        "\\(m \\cdot s^{-2}\\)",
        "\\(m/s\\)",
        "\\(rad \\cdot s^{-2}\\)"
    ]
},
{
    texte: "Position",
    choix: [
        "\\(m\\)",
        "\\(rad\\)",
        "\\(\\Omega\\)",
        "\\(sans~unité\\)"
    ]
},
{
    texte: "Position angulaire",
    choix: [
        "\\(rad\\)",
        "\\(m\\)",
        "\\(\\Omega\\)",
        "\\(sans~unité\\)"
    ]
},
{
    texte: "Travail d'une force",
    choix: [
        "\\(J\\)",
        "\\(Wh\\)",
        "\\(Nm\\)",
        "\\(N\\)"
    ]
},
{
    texte: "Poids",
    choix: [
        "\\(N\\)",
        "\\(Nm\\)",
        "\\(kg\\)",
        "\\(Pa\\)"
    ]
},
{
    texte: "Pression",
    choix: [
        "\\(Pa\\)",
        "\\(bar\\)",
        "\\(N\\)",
        "\\(Nm\\)"
    ]
},
{
    texte: "Profondeur de décharge",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(C\\)",
        "\\(Ah\\)"
    ]
},
{
    texte: "Etat de charge",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(C\\)",
        "\\(Ah\\)"
    ]
},
{
    texte: "Capacité d'une batterie",
    choix: [
        "\\(C\\)",
        "\\(Ah\\)",
        "\\(A/h\\)",
        "\\(J\\)"
    ]
},
{
    texte: "Longueur d'onde",
    choix: [
        "\\(m\\)",
        "\\(Hz\\)",
        "\\(s\\)",
        "\\(m/s\\)"
    ]
},
{
    texte: "Température de couleur",
    choix: [
        "\\(K\\)",
        "\\(°C\\)",
        "\\(°\\)",
        "\\(W\\)"
    ]
},
{
    texte: "Intensité lumineuse",
    choix: [
        "\\(Cd\\)",
        "\\(A\\)",
        "\\(Lm\\)",
        "\\(lux\\)"
    ]
},
{
    texte: "Indice de rendu des couleurs",
    choix: [
        "\\(sans~unité\\)",
        "\\(\\%\\)",
        "\\(lux\\)",
        "\\(Lm\\)"
    ]
},
{
    texte: "Flux lumineux",
    choix: [
        "\\(Lm\\)",
        "\\(W\\)",
        "\\(lux\\)",
        "\\(W/m^2\\)"
    ]
},
{
    texte: "Efficacité lumineuse",
    choix: [
        "\\(Lm/W\\)",
        "\\(W/Lm\\)",
        "\\(\\%\\)",
        "\\(sans~unité\\)"
    ]
},
{
    texte: "Eclairement",
    choix: [
        "\\(lux\\)",
        "\\(Lm\\)",
        "\\(Cd\\)",
        "\\(Cd/m^2\\)"
    ]
},
{
    texte: "Uniformité",
    choix: [
        "\\(sans~unité\\)",
        "\\(lux\\)",
        "\\(Lm\\)",
        "\\(Cd/m^2\\)"
    ]
},
{
    texte: "Luminance",
    choix: [
        "\\(Cd/m^2\\)",
        "\\(lux\\)",
        "\\(Lm\\)",
        "\\(Cd\\)"
    ]
},
{
    texte: "Irradiance",
    choix: [
        "\\(W/m^2\\)",
        "\\(W\\)",
        "\\(Lm\\)",
        "\\(lux\\)"
    ]
},
{
    texte: "Puissance électromagnétique",
    choix: [
        "\\(W\\)",
        "\\(T\\)",
        "\\(A/m\\)",
        "\\(A\\)"
    ]
},
{
    texte: "Champ magnétique",
    choix: [
        "\\(T\\)",
        "\\(A/m\\)",
        "\\(W\\)",
        "\\(A\\)"
    ]
},
];