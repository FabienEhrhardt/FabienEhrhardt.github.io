
// =====================================================
// ONDULEUR TRIPHASE - COMMANDE MLI SINUS-TRIANGLE
// =====================================================

// ---------------------
// PARAMETRES ALEATOIRES
// ---------------------

let tensionsDC = [360, 400, 440];
let indicesModulation = [0.7, 0.8, 0.9];
let courants = [4, 5, 6, 7];
let facteurs = [0.80, 0.85, 0.90];

let Udc = tensionsDC[Math.floor(Math.random() * tensionsDC.length)];
let m = indicesModulation[Math.floor(Math.random() * indicesModulation.length)];
let I = courants[Math.floor(Math.random() * courants.length)];
let cosphi = facteurs[Math.floor(Math.random() * facteurs.length)];

let f = 50;
let fc = 1000;
let phi = Math.acos(cosphi);
let phiDeg = phi * 180 / Math.PI;

let T = 1 / f;
let rapportFrequence = fc / f;

// Fondamental de la tension simple
let V1 = m * Udc / (2 * Math.sqrt(2));

// Puissance active triphasée
let P = 3 * V1 * I * cosphi;

let V1rep = Math.round(V1);
let Prep = Math.round(P);
let phirep = Math.round(phiDeg);

// ---------------------
// EXERCICE
// ---------------------

let theme = "33";
let nomExo = "exo16";

let exo = {
    titre: "Onduleur triphasé et commande MLI",
	courbe1:{},
    enonce: `
Une installation industrielle est alimentée par un onduleur triphasé
à deux niveaux. Celui-ci permet de produire une tension alternative
à partir d'une source continue.

L'onduleur utilise une commande par <strong>modulation de largeur d'impulsions (MLI) sinus-triangle</strong>.
La commande compare trois références sinusoïdales décalées de 120°
à une porteuse triangulaire.

<br>
<strong>Caractéristiques de l'installation :</strong>

<table class="feedback-table">
<tr><th>Grandeur</th><th>Valeur</th></tr>
<tr><td>Tension du bus continu</td><td>${Udc} V</td></tr>
<tr><td>Indice de modulation \\(m\\)</td><td>${m}</td></tr>
<tr><td>Fréquence du fondamental</td><td>${f} Hz</td></tr>
<tr><td>Fréquence de la porteuse</td><td>${fc} Hz</td></tr>
<tr><td>Courant efficace de phase</td><td>${I} A</td></tr>
</table>

<br>
<strong>Hypothèses :</strong>
<ul>
<li>Le système triphasé est équilibré.</li>
<li>Le courant de chaque phase est supposé sinusoïdal.</li>
<li>Le courant est déphasé de ${phirep}° par rapport au fondamental de la tension simple.</li>
<li>Les interrupteurs de puissance sont supposés idéaux.</li>
</ul>

<strong>Formules utiles :</strong>

Fondamental efficace de la tension simple :
\\[
V_1 = \\frac{m \\times U_{dc}}{2\\sqrt{2}}
\\]

Puissance active triphasée :
\\[
P = 3 \\times V_1 \\times I \\times \\cos\\varphi
\\]

Rapport de fréquence :
\\[
m_f = \\frac{f_c}{f}
\\]

La tension représentée est la tension simple aux bornes de la charge.
Le spectre est exprimé en valeur efficace.
`,

    questions: [

        {
            texte: `Quelle est la tension continue qui alimente l'onduleur ?`,
            reponse: Udc,
            unite: "V",
            feedback: `
            La tension du bus continu est donnée dans les caractéristiques :
            \\[U_{dc} = ${Udc}\\ \\text{V}\\]
            `
        },

        {
            texte: `Calculer la période du fondamental de la tension de sortie.`,
            reponse: Math.round(T * 1000 * 100) / 100,
            unite: "ms",
            feedback: `
            La période est l'inverse de la fréquence :
            \\[T = \\frac{1}{f}\\]
            \\[T = \\frac{1}{${f}} = ${T * 1000}\\ \\text{ms}\\]
            `
        },

        {
            texte: `Calculer la valeur efficace du fondamental de la tension simple.`,
            reponse: V1rep,
            unite: "V",
            feedback: `
            On utilise la formule fournie :
            \\[V_1 = \\frac{m \\times U_{dc}}{2\\sqrt{2}}\\]
            \\[V_1 = \\frac{${m} \\times ${Udc}}{2\\sqrt{2}}\\]
            \\[V_1 \\approx ${V1.toFixed(1)}\\ \\text{V}\\]
            Soit environ ${V1rep} V.
            `
        },

        {
            texte: `Calculer le rapport entre la fréquence de la porteuse et celle du fondamental.`,
            reponse: rapportFrequence,
            unite: "",
            feedback: `
            Le rapport de fréquence est :
            \\[m_f = \\frac{f_c}{f}\\]
            \\[m_f = \\frac{${fc}}{${f}} = ${rapportFrequence}\\]
            La porteuse est donc ${rapportFrequence} fois plus rapide que le fondamental.
            `
        },

        {
            texte: `Calculer la puissance active transmise à la charge triphasée.`,
            reponse: Prep,
            unite: "W",
            feedback: `
            Pour un système triphasé équilibré :
            \\[P = 3 \\times V_1 \\times I \\times \\cos\\varphi\\]
            \\[P = 3 \\times ${V1.toFixed(1)} \\times ${I} \\times ${cosphi}\\]
            \\[P \\approx ${P.toFixed(1)}\\ \\text{W}\\]
            Soit environ ${Prep} W.
            `
        },

        {
            texte: `Sur le spectre, quelle est la fréquence autour de laquelle apparaît le principal groupe de composantes lié au découpage ?`,
            reponse: fc,
            unite: "Hz",
            feedback: `
            La fréquence de découpage est celle de la porteuse :
            \\[f_c = ${fc}\\ \\text{Hz}\\]
            Les composantes liées à la commutation apparaissent principalement
            autour de cette fréquence et de ses multiples.
            `
        },

        {
            type: "texte",
            texte: `La tension de sortie de l'onduleur est-elle parfaitement sinusoïdale ? Justifier.`,
            reponse: ["non", "hachée", "créneaux", "impulsions"],
            unite: "",
            feedback: `
            Non. La tension instantanée est constituée d'impulsions de largeur variable.
            Elle n'est donc pas parfaitement sinusoïdale.
            Son fondamental est sinusoïdal, mais elle contient également des harmoniques.
            `
        },

        {
            type: "texte",
            texte: `Quel est l'intérêt de la commande MLI concernant les harmoniques de tension ?`,
            reponse: ["repousse", "déplace", "hautes fréquences", "fréquences élevées"],
            unite: "",
            feedback: `
            La MLI repousse une grande partie des harmoniques vers les hautes fréquences,
            autour de la fréquence de découpage et de ses multiples.
            Les harmoniques de basse fréquence sont ainsi réduits.
            Les composantes hautes fréquences sont plus faciles à éliminer avec un filtre.
            `
        },

        {
            type: "texte",
            texte: `Pourquoi peut-on considérer que le courant dans la charge est quasiment sinusoïdal alors que la tension est hachée ?`,
            reponse: ["inductance", "inductif", "filtre", "lissage"],
            unite: "",
            feedback: `
            L'inductance de la charge s'oppose aux variations rapides du courant.
            Elle contribue à lisser le courant et à limiter ses ondulations.
            Le courant peut donc être beaucoup plus proche d'une sinusoïde que la tension.
            `
        }

    ]
};

// =====================================================
// TRACE DES COURBES ET DU SPECTRE
// =====================================================

let nbquestion = exo.questions.length;

window.onload = function() {

    genererExercice(exo);

    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // -------------------------------------------------
    // FONCTIONS DE DESSIN
    // -------------------------------------------------

    function texte(txt, x, y, taille = 11, couleur = "black") {
        ctx.fillStyle = couleur;
        ctx.font = taille + "px Arial";
        ctx.fillText(txt, x, y);
    }

    function axe(x1, y1, x2, y2) {
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function grille(x1, y1, x2, y2, nx, ny) {
        ctx.strokeStyle = "#dddddd";
        ctx.lineWidth = 1;

        for (let i = 0; i <= nx; i++) {
            let x = x1 + (x2 - x1) * i / nx;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
        }

        for (let i = 0; i <= ny; i++) {
            let y = y1 + (y2 - y1) * i / ny;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
        }
    }

    // -------------------------------------------------
    // MODELE DE LA COMMANDE MLI
    // -------------------------------------------------

    function porteuse(t) {
        let phase = (t * fc) % 1;
        return 4 * Math.abs(phase - 0.5) - 1;
    }

    function etatBras(t, decalage) {
        let reference = m * Math.sin(2 * Math.PI * f * t + decalage);
        return reference >= porteuse(t) ? 1 : 0;
    }

    function tensionSimple(t) {
        let Sa = etatBras(t, 0);
        let Sb = etatBras(t, -2 * Math.PI / 3);
        let Sc = etatBras(t, 2 * Math.PI / 3);

        let moyenne = (Sa + Sb + Sc) / 3;

        return Udc * (Sa - moyenne);
    }

    function tensionFondamentale(t) {
        return m * Udc / 2 * Math.sin(2 * Math.PI * f * t);
    }

    function courantCharge(t) {
        return Math.sqrt(2) * I *
            Math.sin(2 * Math.PI * f * t - phi);
    }

    // -------------------------------------------------
    // 1. TENSION SIMPLE : MLI ET FONDAMENTAL
    // -------------------------------------------------

    let x1 = 50;
    let x2 = W - 15;
    let y1 = 25;
    let y2 = 137;

    texte("Tension simple de sortie", 50, 15, 12);
    texte("V", 12, 35);

    grille(x1, y1, x2, y2, 8, 4);

    let Umax = Udc * 0.75;
    let yCentre = (y1 + y2) / 2;
    let echelleV = (y2 - y1) / (2 * Umax);

    function coordX(t, duree) {
        return x1 + (x2 - x1) * t / duree;
    }

    function coordY(v) {
        return yCentre - v * echelleV;
    }

    axe(x1, yCentre, x2, yCentre);
    texte("0", 32, yCentre + 4);
    texte("+" + Math.round(Umax) + " V", 2, y1 + 4);
    texte("-" + Math.round(Umax) + " V", 2, y2);

    let dureeAffichage = 2 / f;
    let Ncourbe = 2400;

    // Tension MLI
    ctx.strokeStyle = "#1769aa";
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    for (let i = 0; i <= Ncourbe; i++) {
        let t = dureeAffichage * i / Ncourbe;
        let x = coordX(t, dureeAffichage);
        let y = coordY(tensionSimple(t));

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Fondamental
    ctx.strokeStyle = "#e67e22";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();

    for (let i = 0; i <= 1000; i++) {
        let t = dureeAffichage * i / 1000;
        let x = coordX(t, dureeAffichage);
        let y = coordY(tensionFondamentale(t));

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.setLineDash([]);

    texte("Temps (ms)", W - 90, y2 + 13, 10);
    texte("Tension MLI", 65, y2 + 13, 10, "#1769aa");
    texte("Fondamental", 190, y2 + 13, 10, "#e67e22");

    // -------------------------------------------------
    // 2. COURANT DE PHASE
    // -------------------------------------------------

    let cy1 = 174;
    let cy2 = 275;
    let cCentre = (cy1 + cy2) / 2;
    let Imax = I * 1.6;
    let echelleI = (cy2 - cy1) / (2 * Imax);

    texte("Courant de phase (supposé sinusoïdal)", 50, 164, 12);
    texte("A", 20, 185);

    grille(x1, cy1, x2, cy2, 8, 4);
    axe(x1, cCentre, x2, cCentre);

    texte("+" + Imax.toFixed(1), 5, cy1 + 4, 10);
    texte("-" + Imax.toFixed(1), 5, cy2, 10);

    ctx.strokeStyle = "#238636";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i <= 1000; i++) {
        let t = dureeAffichage * i / 1000;
        let x = coordX(t, dureeAffichage);
        let y = cCentre - courantCharge(t) * echelleI;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    texte("Temps (ms)", W - 90, cy2 + 13, 10);
    texte("Courant i", 65, cy2 + 13, 10, "#238636");

    // -------------------------------------------------
    // 3. SPECTRE DE LA TENSION
    // -------------------------------------------------

    let sy1 = 316;
    let sy2 = 382;
    let sx1 = 50;
    let sx2 = W - 15;

    texte("Spectre de la tension simple (valeurs efficaces)", 50, 306, 12);
    texte("V", 20, 326);

    // Calcul du spectre par DFT
    // 4 périodes du fondamental
    let N = 4096;
    let dureeFFT = 4 / f;
    let signal = new Array(N);

    for (let n = 0; n < N; n++) {
        let t = n * dureeFFT / N;
        signal[n] = tensionSimple(t);
    }

    let resolution = 1 / dureeFFT;
    let fmaxSpectre = 2000;
    let maxBin = Math.floor(fmaxSpectre / resolution);

    let spectre = [];

    for (let k = 1; k <= maxBin; k++) {
        let re = 0;
        let im = 0;

        for (let n = 0; n < N; n++) {
            let angle = 2 * Math.PI * k * n / N;
            re += signal[n] * Math.cos(angle);
            im -= signal[n] * Math.sin(angle);
        }

        let amplitudeCrete = 2 * Math.sqrt(re * re + im * im) / N;
        let amplitudeEfficace = amplitudeCrete / Math.sqrt(2);

        spectre.push({
            frequence: k * resolution,
            amplitude: amplitudeEfficace
        });
    }

    let maxSpectre = Udc * 0.32;
    let largeur = (sx2 - sx1) / spectre.length;

    grille(sx1, sy1, sx2, sy2, 4, 2);

    for (let i = 0; i < spectre.length; i++) {
        let valeur = spectre[i].amplitude;
        let hauteur = Math.min(valeur / maxSpectre, 1) * (sy2 - sy1);

        let x = sx1 + i * largeur;
        let y = sy2 - hauteur;

        // Fondamental en orange
        if (Math.abs(spectre[i].frequence - f) < resolution / 2) {
            ctx.fillStyle = "#e67e22";
        }
        // Zone de découpage en rouge
        else if (spectre[i].frequence > 800) {
            ctx.fillStyle = "#c0392b";
        }
        // Autres composantes
        else {
            ctx.fillStyle = "#1769aa";
        }

        ctx.fillRect(x, y, Math.max(1, largeur - 0.2), hauteur);
    }

    axe(sx1, sy2, sx2, sy2);

    texte("0", sx1 - 5, sy2 + 12, 9);
    texte("500", sx1 + (sx2 - sx1) * 0.25 - 10, sy2 + 12, 9);
    texte("1000", sx1 + (sx2 - sx1) * 0.5 - 12, sy2 + 12, 9);
    texte("1500", sx1 + (sx2 - sx1) * 0.75 - 12, sy2 + 12, 9);
    texte("2000 Hz", sx2 - 40, sy2 + 12, 9);

    texte("Fréquence (Hz)", W / 2 - 40, H - 3, 10);

};
