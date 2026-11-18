
 // =====================
 // PARAMÈTRES ALÉATOIRES
 // =====================

let tensions = [12, 24, 36, 48, 60];
let resistances = [8, 10, 12, 16];
let frequences = [25, 50, 60, 100, 400];

let Udc = tensions[Math.floor(Math.random() * tensions.length)];
let R = resistances[Math.floor(Math.random() * resistances.length)];
let f = frequences[Math.floor(Math.random() * frequences.length)];

let T = 1 / f;
let Tms = T * 1000;

// Grandeurs électriques
let Umax = Udc;
let Ueff = Udc;
let Imax = Udc / R;
let Ieff = Imax;
let P = Ueff * Ieff;

// Arrondis
let ImaxRep = Math.round(Imax * 10) / 10;
let IeffRep = Math.round(Ieff * 10) / 10;
let Prep = Math.round(P);

// =====================
// EXERCICE
// =====================

let theme = "33";
let nomExo = "exo14";

let exo = {
    titre: "Étude d'un onduleur monophasé pleine onde sur résistance",

    enonce: `
Un technicien étudie un onduleur monophasé utilisé pour alimenter une charge
résistive à partir d'une source de tension continue.

L'onduleur est constitué d'un pont de quatre interrupteurs électroniques.
La tension continue d'alimentation vaut ${Udc} V.

La charge est constituée d'une résistance de ${R} Ω.

Les deux graphiques représentent l'évolution de la tension et du courant
en sortie de l'onduleur sur deux périodes de fonctionnement.

Les échelles sont indiquées sur les graphiques.
`,

    courbe1:{},
	questions: [

        {
            type: "texte",
            texte: `Quel est le rôle d'un onduleur ?`,
            reponse: [
                "convertir une tension continue en tension alternative",
                "continu en alternatif",
                "continu vers alternatif",
                "transformer une tension continue en alternative"
            ],
            unite: "",
            feedback: `Un onduleur transforme une tension continue en tension alternative.`
        },

        {
            texte: `Relever la valeur maximale de la tension de sortie \\(u\\).`,
            reponse: Umax,
            unite: "V",
            feedback: `Sur le graphique, la tension atteint ${Umax} V en valeur positive
            et -${Umax} V en valeur négative.`
        },

        {
            texte: `Déterminer la période \\(T\\) de la tension de sortie à partir du graphique.`,
            reponse: Tms,
            unite: "ms",
            feedback: `La période correspond à la durée d'un cycle complet.
            \\[T = ${Tms}\\ \\text{ms}\\]`
        },

        {
            texte: `Déterminer la fréquence de la tension de sortie.`,
            reponse: f,
            unite: "Hz",
            feedback: `La fréquence est l'inverse de la période :
            \\[f = \\frac{1}{T}\\]
            \\[f = \\frac{1}{${T.toFixed(3)}} = ${f}\\ \\text{Hz}\\]`
        },

        {
            texte: `Déterminer la valeur efficace de la tension de sortie \\(U\\).`,
            reponse: Ueff,
            unite: "V",
            feedback: `Pour une tension carrée symétrique alternant entre +${Udc} V
            et -${Udc} V, la valeur efficace est égale à sa valeur maximale :
            \\[U = ${Ueff}\\ \\text{V}\\]`
        },

        {
            texte: `Relever la valeur maximale du courant dans la charge.`,
            reponse: ImaxRep,
            unite: "A",
            feedback: `La valeur maximale du courant est :
            \\[I_{max} = \\frac{U_{dc}}{R}\\]
            \\[I_{max} = \\frac{${Udc}}{${R}} = ${Imax.toFixed(2)}\\ \\text{A}\\]
            Soit ${ImaxRep} A.`
        },

        {
            texte: `Déterminer la valeur efficace du courant dans la charge.`,
            reponse: IeffRep,
            unite: "A",
            feedback: `Le courant est également un signal carré symétrique.
            Sa valeur efficace est égale à sa valeur maximale :
            \\[I = ${IeffRep}\\ \\text{A}\\]`
        },

        {
            texte: `Calculer la puissance active consommée par la résistance.`,
            reponse: Prep,
            unite: "W",
            feedback: `Pour une charge résistive :
            \\[P = U \\times I\\]
            \\[P = ${Ueff} \\times ${Ieff.toFixed(2)}\\]
            \\[P \\approx ${Prep}\\ \\text{W}\\]`
        }

    ]
};

// =====================
// TRACÉ DES GRAPHIQUES
// =====================

function tracerOnduleur() {

    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    let x0 = 65;
    let x1 = W - 20;
    let largeur = x1 - x0;

    let hautU = 35;
    let basU = 175;

    let hautI = 225;
    let basI = 365;

    // Deux périodes
    let tMax = 2 * Tms;
    let sx = largeur / tMax;

    // Échelles verticales
    let pasU = 10;
    let echelleU = Math.ceil(Udc / pasU) * pasU + 10;

    let pasI = 1;
    let echelleI = Math.ceil(Imax + 1);

    let milieuU = (hautU + basU) / 2;
    let milieuI = (hautI + basI) / 2;

    let syU = (basU - hautU) / 2 / echelleU;
    let syI = (basI - hautI) / 2 / echelleI;

    function xPixel(t) {
        return x0 + t * sx;
    }

    function yU(val) {
        return milieuU - val * syU;
    }

    function yI(val) {
        return milieuI - val * syI;
    }

    function ligne(xa, ya, xb, yb, couleur, ep = 1) {
        ctx.beginPath();
        ctx.strokeStyle = couleur;
        ctx.lineWidth = ep;
        ctx.setLineDash([]);
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.stroke();
    }

    function texte(txt, x, y, taille = 11, couleur = "black") {
        ctx.fillStyle = couleur;
        ctx.font = taille + "px Arial";
        ctx.fillText(txt, x, y);
    }

    // =====================
    // TITRES
    // =====================

    texte("TENSION DE SORTIE u (V)", x0, 18, 13);
    texte("COURANT DANS LA CHARGE i (A)", x0, 210, 13);

    // =====================
    // GRILLE DES TENSIONS
    // =====================

    for (let u = -echelleU; u <= echelleU; u += pasU) {
        let y = yU(u);
        ligne(x0, y, x1, y, u === 0 ? "#777" : "#ddd");
        texte(u, 25, y + 4);
    }

    // =====================
    // GRILLE DES COURANTS
    // =====================

    for (let i = -echelleI; i <= echelleI; i += pasI) {
        let y = yI(i);
        ligne(x0, y, x1, y, i === 0 ? "#777" : "#ddd");
        texte(i, 35, y + 4);
    }

    // =====================
    // GRILLE DU TEMPS
    // =====================

    for (let t = 0; t <= tMax + 0.001; t += Tms / 4) {
        let x = xPixel(t);
        ligne(x, hautU, x, basU, "#eee");
        ligne(x, hautI, x, basI, "#eee");
        texte(t.toFixed(1).replace(".", ","), x - 10, 390);
    }

    texte("Temps (ms)", W / 2 - 25, 405);

    // Axes
    ligne(x0, hautU, x0, basU, "black", 2);
    ligne(x0, milieuU, x1, milieuU, "black", 1);

    ligne(x0, hautI, x0, basI, "black", 2);
    ligne(x0, milieuI, x1, milieuI, "black", 1);

    // =====================
    // TENSION DE SORTIE
    // =====================

    for (let n = 0; n < 2; n++) {

        let debut = n * Tms;
        let milieu = debut + Tms / 2;
        let fin = debut + Tms;

        ligne(
            xPixel(debut), yU(Udc),
            xPixel(milieu), yU(Udc),
            "#1565c0", 2
        );

        ligne(
            xPixel(milieu), yU(Udc),
            xPixel(milieu), yU(-Udc),
            "#1565c0", 2
        );

        ligne(
            xPixel(milieu), yU(-Udc),
            xPixel(fin), yU(-Udc),
            "#1565c0", 2
        );

        ligne(
            xPixel(fin), yU(-Udc),
            xPixel(fin), yU(Udc),
            "#1565c0", 2
        );
    }

    // =====================
    // COURANT DE LA CHARGE
    // =====================

    for (let n = 0; n < 2; n++) {

        let debut = n * Tms;
        let milieu = debut + Tms / 2;
        let fin = debut + Tms;

        ligne(
            xPixel(debut), yI(Imax),
            xPixel(milieu), yI(Imax),
            "#d32f2f", 2
        );

        ligne(
            xPixel(milieu), yI(Imax),
            xPixel(milieu), yI(-Imax),
            "#d32f2f", 2
        );

        ligne(
            xPixel(milieu), yI(-Imax),
            xPixel(fin), yI(-Imax),
            "#d32f2f", 2
        );

        ligne(
            xPixel(fin), yI(-Imax),
            xPixel(fin), yI(Imax),
            "#d32f2f", 2
        );
    }

    // Légendes
    ligne(80, 190, 105, 190, "#1565c0", 3);
    texte("u", 110, 194, 11, "#1565c0");

    ligne(160, 190, 185, 190, "#d32f2f", 3);
    texte("i", 190, 194, 11, "#d32f2f");
}

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload = function() {
    genererExercice(exo);
    tracerOnduleur();
};
