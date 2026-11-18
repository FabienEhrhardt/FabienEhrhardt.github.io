
let theme = "33";
let nomExo = "exo17";

// =====================================================
// GRADATEUR MONOPHASE SUR CHARGE RESISTIVE
// =====================================================

// ---------------------
// PARAMETRES ALEATOIRES
// ---------------------

let tensions = [220, 230, 240];
let resistances = [46, 57.5, 69, 82];
let angles = [30, 45, 60, 75];

let U = tensions[Math.floor(Math.random() * tensions.length)];
let R = resistances[Math.floor(Math.random() * resistances.length)];
let psiDeg = angles[Math.floor(Math.random() * angles.length)];

let psi = psiDeg * Math.PI / 180;

let f = 50;
let omega = 2 * Math.PI * f;
let omegaAff = 314;
let T = 1 / f;

// =====================================================
// CALCULS EFFECTUES PAR LE PROGRAMME
// =====================================================

// Terme intermédiaire
let A = Math.PI - psi + Math.sin(2 * psi) / 2;

// Courant efficace total
let I = (U / R) * Math.sqrt(A / Math.PI);

// Coefficients du fondamental
let a1 = -(Math.sqrt(2) * U / (R * Math.PI)) *
    Math.sin(psi) ** 2;

let b1 = (Math.sqrt(2) * U / (R * Math.PI)) * A;

// Valeur maximale du fondamental
let I1max = Math.sqrt(a1 * a1 + b1 * b1);

// Valeur efficace du fondamental
let I1 = I1max / Math.sqrt(2);

// Déphasage du fondamental en radians
let phi = Math.atan2(-a1, b1);

// Déphasage en degrés
let phiDeg = phi * 180 / Math.PI;

// Valeurs affichées dans l'énoncé
// Les réponses attendues sont calculées à partir de ces valeurs.
let I1maxAff = Math.round(I1max * 100) / 100;
let phiAff = Math.round(phi * 1000) / 1000;

let I1Aff = I1maxAff / Math.sqrt(2);
let phiDegAff = phiAff * 180 / Math.PI;

// =====================================================
// PUISSANCES
// =====================================================

let P = U * I1Aff * Math.cos(phiAff);
let Q = U * I1Aff * Math.sin(phiAff);
let S = U * I;
let D = Math.sqrt(Math.max(0, S * S - P * P - Q * Q));

let lambda = P / S;

// Arrondis
let Ir = Math.round(I * 100) / 100;
let I1r = Math.round(I1Aff * 100) / 100;
let phir = Math.round(phiDegAff * 10) / 10;

let Pr = Math.round(P);
let Qr = Math.round(Q);
let Sr = Math.round(S);
let Dr = Math.round(D);
let lambdar = Math.round(lambda * 100) / 100;

// Expression numérique du fondamental
let expressionFondamental =
    `i_1(t)=${I1maxAff.toFixed(2)}\\sin(314t-${phiAff.toFixed(3)})`;

// =====================================================
// EXERCICE
// =====================================================

let exo = {

    titre: "Gradateur monophasé sur charge résistive",

    courbe1:{},
	enonce: `
Un gradateur monophasé permet de faire varier la puissance
transmise à une charge en retardant l'amorçage des composants
de puissance à chaque alternance.

On étudie un gradateur alimentant une résistance pure.

<strong>Caractéristiques de l'installation :</strong>

<table class="feedback-table">
<tr><th>Grandeur</th><th>Valeur</th></tr>
<tr><td>Tension efficace d'alimentation</td><td>${U} V</td></tr>
<tr><td>Résistance de la charge</td><td>${R} Ω</td></tr>
<tr><td>Angle de retard à l'amorçage ψ</td><td>${psiDeg}°</td></tr>
<tr><td>Fréquence d'alimentation</td><td>${f} Hz</td></tr>
</table>

<strong>
<br>1. Valeur efficace du courant total</strong>

La valeur efficace du courant absorbé est donnée par :

\\[
I=\\frac{U}{R}
\\sqrt{\\frac{\\pi-\\psi+\\frac{\\sin(2\\psi)}{2}}{\\pi}}
\\]

Attention : l'angle ψ doit être exprimé en radians pour effectuer le calcul.
<br>

<strong>2. Fondamental du courant</strong>

Le fondamental du courant a été déterminé à partir de l'étude
mathématique du courant absorbé.

On donne directement son expression :

\\[
${expressionFondamental}
\\]

avec t en secondes.
<canvas id="schema" width="370" height="180"
        style="display:block; width:100%; max-width:600px; height:auto;
        border:1px solid #cccccc; margin:15px auto;">
    </canvas>`,

    questions: [

        // 1
        {
            texte: `Calculer la valeur efficace du courant total absorbé par la charge.`,
            reponse: Ir,
            unite: "A",
            feedback: `
On utilise la formule donnée dans l'énoncé :

\\[
I=\\frac{U}{R}
\\sqrt{\\frac{\\pi-\\psi+\\frac{\\sin(2\\psi)}{2}}{\\pi}}
\\]

On convertit l'angle :

\\[
\\psi=${psiDeg}^\\circ=${psi.toFixed(3)}\\ \\text{rad}
\\]

Puis :

\\[
I=\\frac{${U}}{${R}}
\\sqrt{\\frac{\\pi-${psi.toFixed(3)}+
\\frac{\\sin(2\\times${psi.toFixed(3)})}{2}}{\\pi}}
\\]

\\[
I\\approx ${I.toFixed(2)}\\ \\text{A}
\\]
`
        },

        // 2
        {
            texte: `À partir de l'expression du fondamental donnée dans l'énoncé, déterminer la valeur efficace I₁ du courant fondamental.`,
            reponse: I1r,
            unite: "A",
            feedback: `
L'expression donnée est :

\\[
i_1(t)=${I1maxAff.toFixed(2)}
\\sin(314t-${phiAff.toFixed(3)})
\\]

On identifie la valeur maximale :

\\[
I_{1\\max}=${I1maxAff.toFixed(2)}\\ \\text{A}
\\]

La valeur efficace est :

\\[
I_1=\\frac{I_{1\\max}}{\\sqrt{2}}
\\]

\\[
I_1=\\frac{${I1maxAff.toFixed(2)}}{\\sqrt{2}}
\\]

\\[
I_1\\approx ${I1Aff.toFixed(2)}\\ \\text{A}
\\]
`
        },

        // 3
        {
            texte: `Déterminer le déphasage φ₁ du fondamental du courant par rapport à la tension d'alimentation, en degrés.`,
            reponse: phir,
            unite: "°",
            feedback: `
L'expression donnée est :

\\[
i_1(t)=${I1maxAff.toFixed(2)}
\\sin(314t-${phiAff.toFixed(3)})
\\]

On compare avec :

\\[
i_1(t)=I_{1\\max}\\sin(\\omega t-\\varphi_1)
\\]

On identifie :

\\[
\\varphi_1=${phiAff.toFixed(3)}\\ \\text{rad}
\\]

Conversion en degrés :

\\[
\\varphi_1=${phiAff.toFixed(3)}\\times\\frac{180}{\\pi}
\\]

\\[
\\varphi_1\\approx ${phiDegAff.toFixed(1)}^\\circ
\\]

Le fondamental du courant est en retard sur la tension.
`
        },

        // 4
        {
            texte: `Calculer la puissance active P absorbée par la charge.`,
            reponse: Pr,
            unite: "W",
            feedback: `
\\[
P=U\\times I_1\\times\\cos(\\varphi_1)
\\]

\\[
P=${U}\\times${I1Aff.toFixed(2)}
\\times\\cos(${phiDegAff.toFixed(1)}^\\circ)
\\]

\\[
P\\approx ${P.toFixed(1)}\\ \\text{W}
\\]
`
        },

        // 5
        {
            texte: `Calculer la puissance réactive Q du fondamental.`,
            reponse: Qr,
            unite: "var",
            feedback: `
\\[
Q=U\\times I_1\\times\\sin(\\varphi_1)
\\]

\\[
Q=${U}\\times${I1Aff.toFixed(2)}
\\times\\sin(${phiDegAff.toFixed(1)}^\\circ)
\\]

\\[
Q\\approx ${Q.toFixed(1)}\\ \\text{var}
\\]

Le courant fondamental étant en retard, Q est positive.
`
        },

        // 6
        {
            texte: `Calculer la puissance apparente S absorbée par la charge.`,
            reponse: Sr,
            unite: "VA",
            feedback: `
La puissance apparente utilise le courant efficace total :

\\[
S=U\\times I
\\]

\\[
S=${U}\\times${I.toFixed(2)}
\\]

\\[
S\\approx ${S.toFixed(1)}\\ \\text{VA}
\\]
`
        },

        // 7
        {
            texte: `Calculer la puissance déformante D.`,
            reponse: Dr,
            unite: "vad",
            feedback: `
\\[
D=\\sqrt{S^2-P^2-Q^2}
\\]

\\[
D=\\sqrt{${S.toFixed(1)}^2-
${P.toFixed(1)}^2-
${Q.toFixed(1)}^2}
\\]

\\[
D\\approx ${D.toFixed(1)}\\ \\text{VA}
\\]
`
        },

        // 8
        {
            texte: `Calculer le facteur de puissance \\(F_p\\) de l'installation.`,
            reponse: lambdar,
            unite: "",
            feedback: `
\\[
F_p=\\frac{P}{S}
\\]

\\[
F_p=\\frac{${P.toFixed(1)}}{${S.toFixed(1)}}
\\]

\\[
F_p\\approx ${lambda.toFixed(3)}
\\]
`
        },

        // 9
        {
            type: "texte",
            texte: `Pourquoi le facteur de puissance est-il inférieur à 1 alors que la charge est résistive ?`,
            reponse: [
                "harmonique",
                "déform",
                "déformation",
                "non sinusoïdal",
                "non sinusoidal"
            ],
            unite: "",
            feedback: `
La charge est résistive : le courant est en phase avec la tension
pendant les intervalles de conduction.

Cependant, le courant total est déformé par le fonctionnement
du gradateur. Il contient des harmoniques.

Le fondamental du courant est en retard sur la tension.
La déformation du courant et ce déphasage expliquent que
le facteur de puissance soit inférieur à 1.
`
        }

    ]
};



function tracerSchema() {

    const canvas = document.getElementById("schema");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
	let p,p1;
	let x0=50;
	let y0=80;
	p=SourceV("schema",'',x0,y0,90,'black',true,true);
	p.y=y0;
	p=Fil("schema",p.x,p.y,0,'black',i=false);
	p.y-=40;
	p=Fil("schema",p.x,p.y,90,'black',i=false);
	p=Thyristor("schema","T1",p.x,p.y,0,'black');
	p=Fil("schema",p.x,p.y,-90,'black',i=false);
	Thyristor("schema","T2",p.x,p.y,180,'black');
	p=Fil("schema",p.x,p.y+40,0,'black',i=false);
	p=Resistance("schema","R",p.x,p.y,90,'black',true);
	p=Fil("schema",p.x,p.y,180,'black',i=false);
	p=Fil("schema",p.x,p.y,180,'black',i=false);
	p=Fil("schema",p.x,p.y,180,'black',i=false);

	
}



// =====================================================
// TRACE DES COURBES
// =====================================================

let nbquestion = exo.questions.length;

window.onload = function() {

    genererExercice(exo);
	tracerSchema();

    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    function texte(txt, x, y, taille = 11, couleur = "#222") {
        ctx.fillStyle = couleur;
        ctx.font = taille + "px Arial";
        ctx.fillText(txt, x, y);
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

    function axe(x1, y1, x2, y2) {
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // ----------------------------------------
    // PARAMETRES GRAPHIQUES
    // ----------------------------------------

    let x1 = 55;
    let x2 = W - 20;

    let y1 = 30;
    let y2 = 170;

    let cy1 = 225;
    let cy2 = 365;

    let duree = 2 * T;

    let Umax = Math.ceil(U * Math.sqrt(2) / 50) * 50;
    let Imax = Math.ceil((Math.sqrt(2) * U / R) * 2) / 2;

    let centreU = (y1 + y2) / 2;
    let centreI = (cy1 + cy2) / 2;

    let echelleU = (y2 - y1) / (2 * Umax);
    let echelleI = (cy2 - cy1) / (2 * Imax);

    function X(t) {
        return x1 + (x2 - x1) * t / duree;
    }

    function YU(v) {
        return centreU - v * echelleU;
    }

    function YI(i) {
        return centreI - i * echelleI;
    }

    // ----------------------------------------
    // TENSION D'ALIMENTATION
    // ----------------------------------------

    texte("Tension d'alimentation u(t)", 55, 18, 12);
    texte("V", 25, 40);

    grille(x1, y1, x2, y2, 8, 4);
    axe(x1, centreU, x2, centreU);

    texte("+" + Umax + " V", 2, y1 + 4, 10);
    texte("0", 35, centreU + 4, 10);
    texte("-" + Umax + " V", 2, y2, 10);

    ctx.strokeStyle = "#1769aa";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let n = 0; n <= 1200; n++) {
        let t = duree * n / 1200;
        let u = Math.sqrt(2) * U * Math.sin(omega * t);

        let x = X(t);
        let y = YU(u);

        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // ----------------------------------------
    // COURANT DANS LA CHARGE
    // ----------------------------------------

    texte("Courant dans la charge i(t)", 55, 213, 12);
    texte("A", 25, 235);

    grille(x1, cy1, x2, cy2, 8, 4);
    axe(x1, centreI, x2, centreI);

    texte("+" + Imax.toFixed(1) + " A", 2, cy1 + 4, 10);
    texte("0", 35, centreI + 4, 10);
    texte("-" + Imax.toFixed(1) + " A", 2, cy2, 10);

    ctx.strokeStyle = "#238636";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let n = 0; n <= 2400; n++) {

        let t = duree * n / 2400;
        let angle = (omega * t) % (2 * Math.PI);

        let i = 0;

        // Alternance positive
        if (angle >= psi && angle <= Math.PI) {
            i = Math.sqrt(2) * U / R * Math.sin(angle);
        }

        // Alternance négative
        if (angle >= Math.PI + psi && angle <= 2 * Math.PI) {
            i = Math.sqrt(2) * U / R * Math.sin(angle);
        }

        let x = X(t);
        let y = YI(i);

        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // ----------------------------------------
    // AXE DU TEMPS
    // ----------------------------------------

    texte("Temps (ms)", W - 95, H - 5, 10);

    for (let n = 0; n <= 4; n++) {
        let t = n * T / 2;
        let x = X(t);
        let valeur = (t * 1000).toFixed(1);

        texte(valeur, x - 10, H - 18, 9);
    }

};
