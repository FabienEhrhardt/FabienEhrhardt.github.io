let theme="31";
let nomExo="exo8";

let chapitre="Régime triphasé sinusoïdal";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "Valeur efficace de la tension U=",
    choix: [
        "\\({V}{\\sqrt{3}}\\)",
        "\\({V}}{\\sqrt{2}}\\)",
        "\\(\\frac{V_{max}}{\\sqrt{3}}\\)",
        "\\(\\frac{V_{max}}{\\sqrt{2}}\\)"
    ]
},
{
    texte: "Puissance active P=",
    choix: [
        "\\(\sqrt{3}UI\\cos\\varphi\\)",
        "\\(VI\\)",
        "\\(\sqrt{3}VI\\cos\\varphi\\)",
        "\\(VI\\cos\\varphi\\)"
    ]
},
{
    texte: "Puissance réactive Q=",
    choix: [
        "\\(\sqrt{3}UI\\sin\\varphi\\)",
        "\\(VI\\)",
        "\\(\sqrt{3}VI\\sin\\varphi\\)",
        "\\(P sin \\varphi\\)"
    ]
},
{
    texte: "Puissance apparente S=",
    choix: [
        "\\(\sqrt{3}UI\\)",
        "\\(VI\\)",
        "\\(\\sqrt{P^2-Q^2}\\)",
        "\\(3UI\\)"
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
        "\\(\\frac{I_{max}}{\\sqrt{2}}\\)",
        "\\({I_{max}}{\\sqrt{2}}\\)",
        "\\(\\frac{I_{max}}{\\sqrt{3}}\\)",
        "\\({I_{max}}{\\sqrt{3}}\\)"
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
    texte: "Déphasage entre \\(u_12\\) et \\(u_23\\) ?",
    choix: [
        "\\(120 \°\\)",
        "\\(60 \°\\)",
        "\\(180 \°\\)",
        "\\(30\°\\)"
    ]
},
{
    texte: "Déphasage entre \\(v_1\\) et \\(v_1\\) ?",
    choix: [
        "\\(120 \°\\)",
        "\\(60 \°\\)",
        "\\(180 \°\\)",
        "\\(30\°\\)"
    ]
},
{
    texte: "Déphasage entre \\(u_12\\) et \\(v_1\\) ?",
    choix: [
        "\\(30 \°\\)",
        "\\(60 \°\\)",
        "\\(180 \°\\)",
        "\\(120\°\\)"
    ]
},
{
    texte: "Déphasage \\(\\varphi\\)=",
    choix: [
        "\\(360 \\frac{\\Delta t}{T}\\)",
        "\\(\\frac{V}{I}\\)",
        "\\(atan F_p\\)",
        "\\(asin F_p\\)"
    ]
},
{
    texte: "Puissance apparente S=",
    choix: [
        "\\(\\sqrt{P^2+Q^2}\\)",
        "\\(\\sqrt{P^2-Q^2}\\)",
        "\\(VI\\cos \\varphi\\)",
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
    texte: "Facteur de puissance \\(F_p\\)=",
    choix: [
        "\\(\\cos \\varphi\\)",
        "\\(\\frac{S}{P}\\)",
        "\\(\\sin \\varphi\\)",
        "\\(\\tan \\varphi\\)"
    ]
},
{
    texte: "Puissance réactive Q=",
    choix: [
        "\\(P \\tan \\varphi\\)",
        "\\(P \\sin \\varphi\\)",
        "\\(S \\cos\\varphi\\)",
        "\\(\\racine{P^2-S^2}\\)"
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
        "\\(3VI\\)",
        "\\(RI\\)"
    ]
},
{
    texte: "Puissance réactive totale \\(Q_{tot}\\)=",
    choix: [
        "\\(Q_1+Q_2+…\\)",
        "\\(\\sqrt{Q_1^2+Q_2^2+...}\\)",
        "\\(\\sqrt{3}VI sin \\varphi\\)",
        "\\(RI\\)"
    ]
},
{
    texte: "Puissance apparente totale \\(S_{tot}\\)=",
    choix: [
        "\\(\\sqrt{P_{tot}^2+Q_{tot}^2}\\)",
        "\\(\\sqrt{S_1^2+S_2^2+...}\\)",
        "\\(\\sqrt{P_1^2+Q_1^2+P_2^2+Q_2^2+...}\\)",
        "\\(S_1+S_2+…\\)"
    ]
},
{
    texte: "Impédance d'une résistance Z=",
    choix: [
        "\\(R\\)",
        "\\(R\\omega\\)",
        "\\(\\frac{I}{V}\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Impédance d'une bobine Z=",
    choix: [
        "\\(L\\omega\\)",
        "\\(\\frac{1}{L\\omega}\\)",
        "\\(L\\)",
        "\\(VI\\)"
    ]
},
{
    texte: "Impédance d'un dipôle Z=",
    choix: [
        "\\(\\frac{V}{I}\\)",
        "\\(VI\\)",
        "\\(\\cos \\varphi\\)",
        "\\(\\tan \\varphi\\)"
    ]
},
{
    texte: "Impédance d'un condensateur",
    choix: [
        "\\(\\frac{1}{C\\omega}\\)",
        "\\(C \\omega\\)",
        "\\(C\\)",
        "\\(\\frac{1}{C}\\)"
    ]
},
{
    texte: "V=",
    choix: [
        "\\(ZI\\)",
        "\\(\\frac{I}{Z}\\)",
        "\\(LI\\)",
        "\\(CI\\)"
    ]
},
{
    texte: "Pour une résistance  \\(\\varphi\\)=",
    choix: [
        "\\(0\\)",
        "\\(90\\)",
        "\\(-90\\)",
        "\\(45\\)"
    ]
},
{
    texte: "Pour une bobine  \\(\\varphi\\)=",
    choix: [
        "\\(90\\)",
        "\\(0\\)",
        "\\(-90\\)",
        "\\(45\\)"
    ]
},
{
    texte: "Pour un condensateur \\(\\varphi\\)=",
    choix: [
        "\\(-90\\)",
        "\\(0\\)",
        "\\(90\\)",
        "\\(45\\)"
    ]
},
{
    texte: "Pour un circuit RL série \\(\\varphi\\)=",
    choix: [
        "\\(atan(\\frac{L\\omega}{R})\\)",
        "\\(atan(\\frac{R}{L\\omega})\\)",
        "\\(45\\)",
        "\\(atan(\\frac{L}{R})\\)"
    ]
},
{
    texte: "Pour un circuit RC série \\(\\varphi\\)=",
    choix: [
        "\\(atan(\\frac{1}{RC\\omega})\\)",
        "\\(atan({RC\\omega})\\)",
        "\\(atan(\\frac{C\\omega}{R})\\)",
        "\\(atan(\\frac{C}{R})\\)"
    ]
},
{
    texte: "Pour un circuit RLC série \\(\\varphi\\)=",
    choix: [
        "\\(atan(\\frac{L\\omega-\\frac{1}{C\\omega}}{R})\\)",
        "\\(atan({RLC\\omega})\\)",
        "\\(atan(\\frac{L+C}{R})\\)",
        "\\(atan(\\frac{L\\omega}{CR})\\)"
    ]
},
{
    texte: "Pour un circuit RL sérieZ=",
    choix: [
        "\\(\\sqrt{R^2+(L\\omega)^2}\\)",
        "\\(R+L\\)",
        "\\(R+L\\omega\\)",
        "\\(\\frac{L}{R}\\)"
    ]
},
{
    texte: "Pour un circuit RC série Z=",
    choix: [
        "\\(\\sqrt{R^2+(\\frac{1}{C\\omega})^2}\\)",
        "\\(R+C\\)",
        "\\(R+C\\omega\\)",
        "\\(R+\\frac{1}{C \\omega}\\)"
    ]
},
{
    texte: "Pour un circuit RLC série Z=",
    choix: [
        "\\(\\sqrt{R^2+(L\\omega-\\frac{1}{C\\omega})^2}\\)",
        "\\(R+L+C\\)",
        "\\(R+L\\omega+\\frac{1}{C\\omega}\\)",
        "\\(\\sqrt{R^2+(L\\omega+\\frac{1}{C\\omega})^2}\\)"
    ]
},
{
    texte: "Dans R triphasé couplé en étoile, P=",
    choix: [
        "\\(3RI^2\\)",
        "\\(3RI\\)",
        "\\(3\\frac{V}{R}\\)",
        "\\(0\\)"
    ]
},
{
    texte: "Dans R triphasé couplé en étoile, P=",
    choix: [
        "\\(3\\frac{V^2}{R}\\)",
        "\\(RI^2\\)",
        "\\(3\\frac{V}{R}\\)",
        "\\(0\\)"
    ]
},
{
    texte: "Dans R triphasé couplé en étoile, Q=",
    choix: [
        "\\(0\\)",
        "\\(3\\frac{V^2}{R}\\)",
        "\\(3RI^2\\)",
        "\\(RI^2\\)"
    ]
},
{
    texte: "Dans L triphasé couplé en étoile, P=",
    choix: [
        "\\(0\\)",
        "\\(3 L\\omega I^2\\)",
        "\\(3 \\frac{V^2}{L\\omega}\\)",
        "\\(3 L\\omega I\\)"
    ]
},
{
    texte: "Dans L triphasé couplé en étoile, Q=",
    choix: [
        "\\(3 L\\omega I^2\\)",
        "\\(3L\\omega I\\)",
        "\\(0\\)",
        "\\(3\\frac{V}{L\\omega}\\)"
    ]
},
{
    texte: "Dans L triphasé couplé en étoile, Q=",
    choix: [
        "\\(3 \\frac{V^2}{L\\omega}\\)",
        "\\(3 L\\omega I\\)",
        "\\(0\\)",
        "\\(\\frac{V}{L\\omega}\\)"
    ]
},
{
    texte: "Dans C triphasé couplé en étoile, P=",
    choix: [
        "\\(0\\)",
        "\\(-3 C\\omega V^2\\)",
        "\\(-3\\frac{1}{C\\omega}I^2\\)",
        "\\(-3C\\omega I\\)"
    ]
},
{
    texte: "Dans C triphasé couplé en étoile, Q=",
    choix: [
        "\\(-3C\\omega V^2\\)",
        "\\(-C\\omega V^2\\)",
        "\\(-3C\\omega V\\)",
        "\\(-3C\\omega I\\)"
    ]
},
{
    texte: "Dans C triphasé couplé en étoile, Q=",
    choix: [
        "\\(-3\\frac{1}{C\\omega}I^2\\)",
        "\\(-\\frac{1}{C\\omega}I^2\\)",
        "\\(-3C\\omega V\\)",
        "\\(-3C\\omega I\\)"
    ]
},
{
    texte: "Dans R triphasé couplé en étoile, \\(F_p\\)=",
    choix: [
        "\\(1\\)",
        "\\(0\\)",
        "\\(0,5\\)",
        "\\(0,93\\)"
    ]
},
{
    texte: "Dans L triphasé couplé en étoile, \\(F_p\\)=",
    choix: [
        "\\(0\\)",
        "\\(0,5\\)",
        "\\(0,93\\)",
        "\\(1\\)"
    ]
},
{
    texte: "Dans C triphasé couplé en étoile, \\(F_p\\)=",
    choix: [
        "\\(0\\)",
        "\\(0,5\\)",
        "\\(0,93\\)",
        "\\(1\\)"
    ]
},
];