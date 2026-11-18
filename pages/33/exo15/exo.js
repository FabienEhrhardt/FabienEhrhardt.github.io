
 // =====================
 // PARAMÈTRES ALÉATOIRES
 // =====================

let tensions = [300, 400, 500];
let courants = [8, 10, 12, 15];
let cosphis = [0.7,0.8, 0.85, 0.9,0.95];

let Udc = tensions[Math.floor(Math.random() * tensions.length)];
let I = courants[Math.floor(Math.random() * courants.length)];
let cosphi = cosphis[Math.floor(Math.random() * cosphis.length)];

let phi = Math.acos(cosphi);
let phiDeg = Math.round(phi * 180 / Math.PI);
let sinphi = Math.sin(phi);

let f = 50;
let T = 1 / f;
let Tms = T * 1000;

// Fondamental de la tension composée
let U1 = Math.sqrt(6) / Math.PI * Udc;

// Tension simple fondamentale
let V1 = U1 / Math.sqrt(3);

// Tension simple
let V1eff=Math.sqrt(2)*Udc/3;

// Puissances en sortie
let S1 = Math.sqrt(3) * U1 * I;
let Pout = S1 * cosphi;
let Qout = S1 * sinphi;
let S=3*V1eff*I;

// Puissances en entrée (convertisseur idéal)
let Pin = Pout;
let Pdc = Pin;
let Qdc = 0;
let Sdc = Pdc;
let Idc = Pdc / Udc;

// Rendement
let rendement = 100;

// Arrondis
let U1Rep = Math.round(U1);
let S1Rep = Math.round(S1);
let SRep = Math.round(S);
let V1effRep = Math.round(V1eff);
let PoutRep = Math.round(Pout);
let QoutRep = Math.round(Qout);
let IdcRep = Math.round(Idc * 10) / 10;
let FpRep=Math.round(Pout/S*100) / 100;

// =====================
// EXERCICE
// =====================

let theme = "33";
let nomExo = "exo15";

let exo = {
    titre: "Onduleur triphasé pleine onde",

    enonce: `
Une installation industrielle utilise un onduleur triphasé pleine onde
pour alimenter un récepteur triphasé équilibré.

L'onduleur est alimenté par une source continue de tension :

\\(U_{DC} = ${Udc}\\ \\text{V}\\)

Le récepteur absorbe un courant sinusoïdal de valeur efficace :

\\(I = ${I}\\ \\text{A}\\)

La fréquence du réseau triphasé est de ${f} Hz.

<strong>Rappel : calcul de la valeur efficace du fondamental de la tension composée en sortie de l'onduleur</strong>

Pour un onduleur triphasé pleine onde :

\\[
\\boxed{U_1 = \\frac{\\sqrt{6}}{\\pi}\\times U_{DC}}
\\]

L'onduleur est supposé idéal, il n'y a donc pas de pertes dans l'onduleur.

`,

    courbe1:{},
	questions: [

        {
            texte: `Déterminer le déphasage entre le courant et le fondamental de la tension.`,
            reponse: phiDeg,
            unite: "°",
            feedback: `On utilise la formule :

            \\[
            \\varphi = 360 \\frac{\\Delta t}{T}
            \\]

            \\[
            \\varphi \\approx ${phiDeg}\\ \\text{°}
            \\]`
        },{
            texte: `Calculer la valeur efficace du fondamental de la tension composée \\(U_1\\) en sortie de l'onduleur.`,
            reponse: U1Rep,
            unite: "V",
            feedback: `On utilise la formule rappelée dans l'énoncé :

            \\[
            U_1 = \\frac{\\sqrt{6}}{\\pi}\\times U_{DC}
            \\]

            \\[
            U_1 = \\frac{\\sqrt{6}}{\\pi}\\times ${Udc}
            \\]

            \\[
            U_1 \\approx ${U1Rep}\\ \\text{V}
            \\]`
        },

        {
            texte: `Calculer la valeur efficace de la tension simple en sortie de l'onduleur.`,
            reponse: V1effRep,
            unite: "V",
            feedback: `Pour calculer la valeur efficace de la tension simple:
			<ul>
			<li> On élève le signal v1 au carré </li>
			<li> Pour l'axe des temps, on travaille en carreau donc T=6.</li>
		<li> On calcule l'aire de la courbe \\(A=4 \\times (\\frac{U_{dc}}{3})^2+2 \\times (\\frac{2 U_{dc}}{3})^2=\\frac{4}{3} U_{dc}^2\\)</li>
		<li> On fait \\(V_{eff}=\\sqrt{\\frac{A}{T}}=\\sqrt{2} \\frac{U_{dc}}{3}\\)</li>
		</ul>

            \\[
            V_{eff} \\approx ${V1effRep}\\ \\text{V}
            \\]`
        },
		
		{
            texte: `Calculer la puissance apparente \\(S\\) en sortie de l'onduleur.`,
            reponse: SRep,
            unite: "VA",
            feedback: `La puissance apparente triphasée est :

            \\[
            S = 3\\times V_{eff}\\times I
            \\]

            \\[
            S = 3\\times ${V1effRep}\\times ${I}
            \\]

            \\[
            S \\approx ${SRep}\\ \\text{VA}
            \\]`
        },

        {
            texte: `Calculer la puissance active \\(P\\) consommée par la charge triphasée.`,
            reponse: PoutRep,
            unite: "W",
            feedback: `La puissance active est :

            \\[
            P = \\sqrt{3}\\times U_1\\times I\\times \\cos(\\varphi)
            \\]

            \\[
            P = \\sqrt{3}\\times ${U1Rep}\\times ${I}\\times ${cosphi}
            \\]

            \\[
            P \\approx ${PoutRep}\\ \\text{W}
            \\]`
        },

        {
            texte: `Calculer la puissance réactive \\(Q\\) consommée par la charge triphasée.`,
            reponse: QoutRep,
            unite: "var",
            feedback: `La puissance réactive est :

            \\[
            Q = \\sqrt{3}\\times U_1\\times I\\times \\sin(\\varphi)
            \\]

            \\[
            Q = \\sqrt{3}\\times ${U1Rep}\\times ${I}\\times \\sin(${phiDeg}°)
            \\]

            \\[
            Q \\approx ${QoutRep}\\ \\text{var}
            \\]`
        },

        {
            texte: `Calculer le déplacement du facteur de puissance de la charge.`,
            reponse: cosphi,
            unite: "",
            feedback: `Le facteur de puissance est égal au cosinus du déphasage :

            \\[
            \\cos(\\varphi) = ${cosphi}
            \\]`
        },
		{
            texte: `Calculer le facteur de puissance de la charge.`,
            reponse: FpRep,
            unite: "",
            feedback: `Le facteur de puissance est égal à :

            \\[
            F_p=\\frac{P}{S} = ${FpRep}
            \\]`
        },

        {
            texte: `Déterminer la puissance active absorbée à l'entrée continue de l'onduleur.`,
            reponse: PoutRep,
            unite: "W",
            feedback: `L'onduleur est considéré idéal. La puissance active est donc conservée :

            \\[
            P_{DC} = P_{AC}
            \\]

            \\[
            P_{DC} = ${PoutRep}\\ \\text{W}
            \\]`
        },

        {
            texte: `Calculer le courant continu \\(I_{DC}\\) absorbé par l'onduleur.`,
            reponse: IdcRep,
            unite: "A",
            feedback: `En entrée continue :

            \\[
            P_{DC} = U_{DC}\\times I_{DC}
            \\]

            On isole le courant :

            \\[
            I_{DC} = \\frac{P_{DC}}{U_{DC}}
            \\]

            \\[
            I_{DC} = \\frac{${PoutRep}}{${Udc}}
            \\]

            \\[
            I_{DC} \\approx ${IdcRep}\\ \\text{A}
            \\]`
        },

        {
            texte: `Calculer le rendement de l'onduleur.`,
            reponse: rendement,
            unite: "%",
            feedback: `Le rendement est :

            \\[
            \\eta = \\frac{P_{sortie}}{P_{entrée}}\\times 100
            \\]

            L'onduleur étant idéal, les puissances actives sont égales.

            \\[
            \\eta = 100\\ %
            \\]`
        }

    ]
};

let nbquestion = exo.questions.length;

// =====================
// TRACÉ DES COURBES
// =====================


function tracerOnduleurTriphasé() {

    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    let x0 = 65;
    let x1 = W - 20;
    let largeur = x1 - x0;

    // Deux périodes
    let tMax = 2 * Tms;
    let sx = largeur / tMax;

    // Zones graphiques
    let hautU = 35;
    let basU = 180;

    let hautI = 235;
    let basI = 370;

    // Échelles verticales
    let Umax = superarrondi((Udc));
    let Imax = superarrondi(I * Math.sqrt(2));

    let milieuU = (hautU + basU) / 2;
    let milieuI = (hautI + basI) / 2;

    let syU = (basU - hautU) / (2 * Umax);
    let syI = (basI - hautI) / (2 * Imax);

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

    texte("TENSION SIMPLE v1 (V)", x0, 18, 12);
    texte("COURANT DE PHASE i1 (A)", x0, 218, 12);

    // =====================
    // GRILLE TENSION
    // =====================
	let upas=Umax/5;
    for (let u = -Umax; u <= Umax; u += upas) {
        let y = yU(u);
        ligne(x0, y, x1, y, u === 0 ? "#777" : "#ddd");
        texte(u, 25, y + 4);
    }

    // =====================
    // GRILLE COURANT
    // =====================
	
	let ipas=Imax/5;
    for (let i = -Imax; i <= Imax; i += ipas) {
        let y = yI(i);
        ligne(x0, y, x1, y, i === 0 ? "#777" : "#ddd");
        texte(i, 35, y + 4);
    }

    // =====================
    // GRILLE TEMPS
    // =====================

    for (let t = 0; t <= tMax + 0.001; t += Tms / 8) {
        let x = xPixel(t);
        ligne(x, hautU, x, basU, "#eee");
        ligne(x, hautI, x, basI, "#eee");
        texte(t.toFixed(1).replace(".", ","), x - 10, 395);
    }

    texte("Temps (ms)", W / 2 - 25, 410);

    // AXES
    ligne(x0, hautU, x0, basU, "black", 2);
    ligne(x0, milieuU, x1, milieuU, "black", 1);

    ligne(x0, hautI, x0, basI, "black", 2);
    ligne(x0, milieuI, x1, milieuI, "black", 1);

    // =====================
    // TENSION SIMPLE RÉELLE
    // =====================

    function tensionSimple(theta) {

        // États des trois bras du pont
        let sa = (theta % (2 * Math.PI)) < Math.PI ? 1 : 0;

        let thetaB = (theta - 2 * Math.PI / 3 + 2 * Math.PI) % (2 * Math.PI);
        let sb = thetaB < Math.PI ? 1 : 0;

        let thetaC = (theta + 2 * Math.PI / 3) % (2 * Math.PI);
        let sc = thetaC < Math.PI ? 1 : 0;

        // Tension simple phase 1 / neutre de la charge
        return Udc * (sa - (sa + sb + sc) / 3);
    }

    // Tracé de la tension réelle
    ctx.beginPath();
    ctx.strokeStyle = "#1565c0";
    ctx.lineWidth = 2;

    let points = 1200;

    for (let n = 0; n <= points; n++) {

        let t = tMax * n / points;
        let theta = 2 * Math.PI * f * t / 1000;

        let v = tensionSimple(theta);

        let x = xPixel(t);
        let y = yU(v);

        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // =====================
    // FONDAMENTAL TENSION SIMPLE
    // =====================

    // V1 est la valeur efficace du fondamental de la tension simple
    let amplitudeFondamental = Math.sqrt(2) * V1;

    ctx.beginPath();
    ctx.strokeStyle = "#e65100";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);

    for (let n = 0; n <= points; n++) {

        let t = tMax * n / points;
        let theta = 2 * Math.PI * f * t / 1000;

        let v1 = amplitudeFondamental * Math.sin(theta);

        let x = xPixel(t);
        let y = yU(v1);

        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.setLineDash([]);

    // =====================
    // COURANT DE PHASE
    // =====================

    ctx.beginPath();
    ctx.strokeStyle = "#d32f2f";
    ctx.lineWidth = 2;

    for (let n = 0; n <= points; n++) {

        let t = tMax * n / points;
        let theta = 2 * Math.PI * f * t / 1000 - phi;

        let i = Math.sqrt(2) * I * Math.sin(theta);

        let x = xPixel(t);
        let y = yI(i);

        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // =====================
    // LÉGENDES
    // =====================

    ligne(75, 195, 95, 195, "#1565c0", 3);
    texte("Tension simple réelle v1", 100, 199, 10, "#1565c0");

    ligne(290, 195, 310, 195, "#e65100", 3);
    texte("Fondamental v1,1", 315, 199, 10, "#e65100");

    ligne(75, 385, 95, 385, "#d32f2f", 3);
    texte("Courant i1", 100, 389, 10, "#d32f2f");
}


// =====================
// LANCEMENT
// =====================

window.onload = function() {
    genererExercice(exo);
    tracerOnduleurTriphasé();
};
