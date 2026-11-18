
// =====================
// PARAMÈTRES ALÉATOIRES
// =====================

let tensions = [36, 40, 44, 48];
let rapports = [0.2,0.4, 0.5, 0.6,0.8];
let inductances = [1.5, 2, 2.5];

let Ue = tensions[Math.floor(Math.random() * tensions.length)];
let alpha = rapports[Math.floor(Math.random() * rapports.length)];
let L = inductances[Math.floor(Math.random() * inductances.length)] / 1000;

let f = 10000;
let T = 1 / f;
let Tmicro = T * 1e6;

// Grandeurs utilisées pour construire les courbes
let Us = Ue / (1 - alpha);
let R = 32;
let Is = Us / R;
let IL = Is / (1 - alpha);

let deltaI = Ue * alpha / (L * f);
let Imin = IL - deltaI / 2;
let Imax = IL + deltaI / 2;

// Durée de conduction
let Ton = alpha * Tmicro;
let Toff = Tmicro - Ton;

// Arrondis pour les réponses
let UsRep = Math.round(Us);
let IminRep = Math.round(Imin * 10) / 10;
let ImaxRep = Math.round(Imax * 10) / 10;
let deltaIRep = Math.round(deltaI * 10) / 10;

// =====================
// EXERCICE
// =====================

let theme = "33";
let nomExo = "exo12";

let exo = {
    titre: "Étude d'un convertisseur Boost",

    enonce: `
Une installation photovoltaïque fournit une tension continue à un convertisseur
Boost (hacheur survolteur). Ce convertisseur permet d'obtenir une tension continue
plus élevée afin d'alimenter un équipement.

On étudie le fonctionnement du convertisseur en régime établi.

La fréquence de découpage est de ${f / 1000} kHz.<br>

<strong>Document 1 : évolution des tensions et du courant dans le convertisseur</strong>

Les courbes représentent deux périodes de fonctionnement.
Les échelles sont indiquées sur chaque graphique.
`,

    courbe1:{},
	questions: [

        {
            type: "texte",
            texte: `Quel est le type de tension en entrée d'un convertisseur Boost ?`,
            reponse: ["continu", "DC"],
            unite: "",
            feedback: `Un convertisseur Boost est alimenté en tension continue.`
        },
		{
            type: "texte",
            texte: `Quel est le type de tension en sortie d'un convertisseur Boost ?`,
            reponse: ["continu", "DC"],
            unite: "",
            feedback: `Un convertisseur Boost fournit une tension continue, c'est un convertisseur DC/DC, un hacheur.`
        },
		{
            type: "texte",
            texte: `Quel est le rôle d'un convertisseur Boost ?`,
            reponse: ["survolteur", "élévateur", "augmenter la tension", "élever la tension"],
            unite: "",
            feedback: `Un convertisseur Boost est un convertisseur survolteur :
            il permet d'obtenir une tension de sortie supérieure à la tension d'entrée.`
        },
		

        {
            texte: `Relever la valeur de la tension d'entrée \\(U_e\\).`,
            reponse: Ue,
            unite: "V",
            feedback: `Sur le graphique des tensions, la tension d'entrée est constante.
            On lit : \\(U_e = ${Ue}\\ \\text{V}\\).`
        },

        {
            texte: `Relever la valeur de la tension de sortie \\(U_s\\).`,
            reponse: UsRep,
            unite: "V",
            feedback: `Sur le graphique des tensions, la tension de sortie est constante.
            On lit : \\(U_s \\approx ${UsRep}\\ \\text{V}\\).`
        },

        {
            texte: `Mesurer la période de découpage \\(T\\) sur le graphique.`,
            reponse: Tmicro,
            unite: "µs",
            feedback: `La période correspond à la durée d'un cycle complet.
            On mesure \\(T = ${Tmicro}\\ \\mu s\\).`
        },

        {
            texte: `Mesurer la durée pendant laquelle l'interrupteur est fermé.`,
            reponse: Math.round(Ton),
            unite: "µs",
            feedback: `L'interrupteur est fermé pendant la première partie de la période.
            On mesure environ \\(T_{on} = ${Math.round(Ton)}\\ \\mu s\\).`
        },

        {
            texte: `Relever la valeur minimale du courant dans l'inductance \\(i_L\\).`,
            reponse: IminRep,
            unite: "A",
            feedback: `Sur le graphique du courant, on lit la valeur minimale :
            \\(I_{Lmin} \\approx ${IminRep}\\ \\text{A}\\).`
        },

        {
            texte: `Relever la valeur maximale du courant dans l'inductance \\(i_L\\).`,
            reponse: ImaxRep,
            unite: "A",
            feedback: `Sur le graphique du courant, on lit la valeur maximale :
            \\(I_{Lmax} \\approx ${ImaxRep}\\ \\text{A}\\).`
        },

        {
            texte: `Déterminer l'ondulation du courant dans l'inductance \\(\\Delta i_L\\).`,
            reponse: deltaIRep,
            unite: "A",
            feedback: `L'ondulation correspond à l'écart entre la valeur maximale et la valeur minimale :

            \\[\\Delta i_L = I_{Lmax} - I_{Lmin}\\]

            \\[\\Delta i_L = ${ImaxRep} - ${IminRep}\\]

            \\[\\Delta i_L = ${deltaIRep}\\ \\text{A}\\]`
        }

    ]
};

// =====================
// TRACÉ DES GRAPHIQUES
// =====================

function tracerBoost() {

    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Deux périodes représentées
    const tMax = 2 * Tmicro;

    // Zone graphique
    const x0 = 65;
    const x1 = W - 20;
    const largeur = x1 - x0;

    // Graphique des tensions
    const haut1 = 35;
    const bas1 = 185;
    const hauteur1 = bas1 - haut1;

    // Graphique du courant
    const haut2 = 235;
    const bas2 = 370;
    const hauteur2 = bas2 - haut2;

    // Échelle verticale des tensions
    let Umax = Math.ceil(Us / 20) * 20 + 10;
    let pasU = 20;

    // Échelle verticale du courant
    let ImaxGraph = Math.ceil((Imax + 0.5) * 2) / 2;
    let pasI = Math.ceil(Imax/5);

    // Échelles horizontales
    let sx = largeur / tMax;
    let syU = hauteur1 / Umax;
    let syI = hauteur2 / ImaxGraph;

    // =====================
    // FONCTIONS DE DESSIN
    // =====================

    function ligne(xa, ya, xb, yb, couleur, epaisseur = 1) {
        ctx.beginPath();
        ctx.strokeStyle = couleur;
        ctx.lineWidth = epaisseur;
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.stroke();
    }

    function texte(txt, x, y, taille = 11, couleur = "black") {
        ctx.fillStyle = couleur;
        ctx.font = taille + "px Arial";
        ctx.fillText(txt, x, y);
    }

    function xPixel(t) {
        return x0 + t * sx;
    }

    function yTension(u) {
        return bas1 - u * syU;
    }

    function yCourant(i) {
        return bas2 - i * syI;
    }

    // =====================
    // TITRES
    // =====================

    texte("TENSIONS (V)", x0, 17, 13, "#111");
    texte("COURANT iL (A)", x0, 215, 13, "#111");

    // =====================
    // GRILLE DES TENSIONS
    // =====================

    for (let u = 0; u <= Umax; u += pasU) {
        let y = yTension(u);
        ligne(x0, y, x1, y, "#dddddd");
        texte(u, 35, y + 4);
    }

    // =====================
    // GRILLE DU COURANT
    // =====================

    for (let i = 0; i <= ImaxGraph + 0.001; i += pasI) {
        let y = yCourant(i);
        ligne(x0, y, x1, y, "#dddddd");
        texte(i.toFixed(1).replace(".", ","), 25, y + 4);
    }

    // =====================
    // GRILLE HORIZONTALE
    // =====================

    for (let t = 0; t <= tMax; t += Tmicro / 4) {
        let x = xPixel(t);
        ligne(x, haut1, x, bas1, "#eeeeee");
        ligne(x, haut2, x, bas2, "#eeeeee");
        texte(t, x - 8, 395);
    }

    texte("Temps (µs)", W / 2 - 25, 410, 11);

    // =====================
    // AXES
    // =====================

    ligne(x0, haut1, x0, bas1, "black", 2);
    ligne(x0, bas1, x1, bas1, "black", 2);

    ligne(x0, haut2, x0, bas2, "black", 2);
    ligne(x0, bas2, x1, bas2, "black", 2);

    // =====================
    // COURBES DE TENSION
    // =====================

    // Tension d'entrée Ue
    let yUe = yTension(Ue);
    ligne(x0, yUe, x1, yUe, "#1565c0", 2);

    // Tension de sortie Us
    let yUs = yTension(Us);
    ligne(x0, yUs, x1, yUs, "#2e7d32", 2);

    // Tension aux bornes de l'interrupteur
    // Interrupteur fermé : u = 0
    // Interrupteur ouvert : u = Us

    for (let n = 0; n < 2; n++) {

        let debut = n * Tmicro;
        let milieu = debut + Ton;
        let fin = debut + Tmicro;

        let xDebut = xPixel(debut);
        let xMilieu = xPixel(milieu);
        let xFin = xPixel(fin);

        ligne(xDebut, yTension(0), xMilieu, yTension(0), "#d32f2f", 2);
        ligne(xMilieu, yTension(0), xMilieu, yTension(Us), "#d32f2f", 2);

        ligne(xMilieu, yTension(Us), xFin, yTension(Us), "#d32f2f", 2);
        ligne(xFin, yTension(Us), xFin, yTension(0), "#d32f2f", 2);
    }

    // Légende tensions
    ligne(75, 195, 95, 195, "#1565c0", 3);
    texte("Ue", 100, 199, 11, "#1565c0");

    ligne(145, 195, 165, 195, "#d32f2f", 3);
    texte("u interrupteur", 170, 199, 11, "#d32f2f");

    ligne(280, 195, 300, 195, "#2e7d32", 3);
    texte("Us", 305, 199, 11, "#2e7d32");

    // =====================
    // COURANT DANS L'INDUCTANCE
    // =====================

    // Courant triangulaire sur deux périodes

    for (let n = 0; n < 2; n++) {

        let debut = n * Tmicro;
        let milieu = debut + Ton;
        let fin = debut + Tmicro;

        let xDebut = xPixel(debut);
        let xMilieu = xPixel(milieu);
        let xFin = xPixel(fin);

        let yMin = yCourant(Imin);
        let yMax = yCourant(Imax);

        // Montée du courant
        ligne(xDebut, yMin, xMilieu, yMax, "#6a1b9a", 2);

        // Descente du courant
        ligne(xMilieu, yMax, xFin, yMin, "#6a1b9a", 2);
    }

    // Repères des valeurs min et max
    ligne(x0, yCourant(Imin), x1, yCourant(Imin), "#6a1b9a", 1);
    ligne(x0, yCourant(Imax), x1, yCourant(Imax), "#6a1b9a", 1);

    texte("Imax", x1 - 35, yCourant(Imax) - 5, 10, "#6a1b9a");
    texte("Imin", x1 - 35, yCourant(Imin) - 5, 10, "#6a1b9a");

}

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload = function() {
    genererExercice(exo);
    tracerBoost();
};
