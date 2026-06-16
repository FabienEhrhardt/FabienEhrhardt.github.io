// ============================================================
// EXERCICE — Pont roulant d'atelier
// Compétences couvertes (référentiel 4.1) :
//   - PFD translation avec accélération : ΣF = m·a
//   - Phases démarrage (acc.), vitesse constante, freinage (déc.)
//   - Énergie cinétique : Ec = ½·m·v²
//   - Travail d'une force : W = F·d
//   - Puissance : P = F·v
//   - Bilan énergétique sur un cycle complet
// ============================================================

// ============================================================
// PARAMÈTRES ALÉATOIRES
// ============================================================

// Masse totale du pont + charge (t → kg)
let masseTab = [2000, 3000, 4000, 5000, 6000];
let m = masseTab[Math.floor(Math.random() * masseTab.length)];

// Vitesse nominale de translation (m/s)
let vTab = [0.5, 1.0, 1.5, 2.0];
let v = vTab[Math.floor(Math.random() * vTab.length)];

// Durée de la phase d'accélération (s) — entier
let taccTab = [4, 5, 6, 8, 10];
let tacc = taccTab[Math.floor(Math.random() * taccTab.length)];

// Coefficient de frottement roulement (roues acier sur rail)
let CrrTab = [0.005, 0.008, 0.010];
let Crr = CrrTab[Math.floor(Math.random() * CrrTab.length)];

// Distance totale à parcourir (m)
let dTotTab = [20, 25, 30, 40, 50];
let dTot = dTotTab[Math.floor(Math.random() * dTotTab.length)];

// Rendement moteur + transmission
let etaTab = [0.80, 0.85, 0.90];
let eta = etaTab[Math.floor(Math.random() * etaTab.length)];

// g = 9.81
let g = 9.81;

// ============================================================
// CALCULS
// ============================================================

// --- Phase 1 : Accélération ---
let a = arrondi(v / tacc, 3);                         // accélération (m/s²)
let Facc = arrondi(m * a, 0);                         // force d'accélération (N)
let Ffrott = arrondi(Crr * m * g, 1);                 // force de frottement (N)
let Ftraction_acc = arrondi(Facc + Ffrott, 0);        // force de traction totale en accél. (N)
let dacc = arrondi(0.5 * a * tacc * tacc, 2);         // distance phase acc. (m)

// --- Phase 2 : Vitesse constante ---
// Force de traction = frottement seul
let Ftraction_cst = Ffrott;                           // (N)

// --- Phase 3 : Freinage (symétrique à l'accélération) ---
// Même durée, même décélération
let tfrein = tacc;
let dfrein = dacc;                                    // distance phase freinage (m)

// Distance phase constante
let dcst = arrondi(dTot - dacc - dfrein, 2);

// Énergie cinétique au régime établi
let Ec = arrondi(0.5 * m * v * v, 0);                // J

// Travail de la force de frottement sur toute la distance
let W_frott = arrondi(Ffrott * dTot, 0);              // J

// Travail de la force de traction en accélération
let W_traction_acc = arrondi(Ftraction_acc * dacc, 0); // J

// Puissance mécanique développée en phase d'accélération (à Vmax)
let P_mec_acc = arrondi(Ftraction_acc * v, 0);        // W

// Puissance mécanique en vitesse constante
let P_mec_cst = arrondi(Ffrott * v, 0);               // W

// Puissance électrique absorbée (vitesse constante)
let P_elec = arrondi(P_mec_cst / eta, 0);             // W

// Énergie électrique totale consommée sur le déplacement
// Phase acc : travail = Facc*dacc + Ffrott*dacc  / eta
// Phase cst : Ffrott*dcst / eta
// Phase freinage : freinage mécanique, on néglige la récupération (simplification)
let W_elec = arrondi((Ftraction_acc * dacc + Ffrott * dcst) / eta, 0); // J

// ============================================================
// CANVAS — Schéma du pont roulant + diagramme des phases
// ============================================================

// Couleurs
const C = {
    structure : "#455a64",
    pont      : "#1f3c88",
    charge    : "#e67e22",
    rail      : "#78909c",
    acc       : "#27ae60",
    cst       : "#1f3c88",
    frein     : "#e74c3c",
    force     : "#8e44ad",
    fond      : "#eceff1"
};

function tracerPontRoulant(canvasId, etape) {
    const canvas = document.getElementById(canvasId);
    const ctx    = canvas.getContext("2d");
    const W = canvas.width;   // 600
    const H = canvas.height;  // 400
    ctx.clearRect(0, 0, W, H);

    // ---- Fond atelier ----
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, W, H);

    // ---- Sol ----
    ctx.fillStyle = "#bdbdbd";
    ctx.fillRect(0, H - 40, W, 40);
    // Hachures sol
    ctx.strokeStyle = "#9e9e9e";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, H - 40);
        ctx.lineTo(x + 20, H);
        ctx.stroke();
    }

    // ---- Colonnes de la structure ----
    [[30, 120], [30, 290], [570, 120], [570, 290]].forEach(([x, yTop]) => {
        ctx.fillStyle = C.structure;
        ctx.fillRect(x - 8, yTop, 16, H - 40 - yTop);
    });

    // ---- Rails horizontaux ----
    let yRail = 118;
    ctx.fillStyle = C.rail;
    ctx.fillRect(22, yRail, W - 44, 8);
    // Détail rails (semelles)
    ctx.fillStyle = "#546e7a";
    ctx.fillRect(22, yRail + 5, W - 44, 4);

    // ---- Pont roulant (poutre) ----
    // Position du pont selon l'étape (animation)
    let xPont = 80 + Math.min(etape, 8) * 42;
    let wPont = 140;
    let yPont = yRail + 8;
    let hPont = 30;

    // Corps du pont
    ctx.fillStyle = C.pont;
    ctx.beginPath();
    ctx.roundRect(xPont, yPont, wPont, hPont, 4);
    ctx.fill();
    ctx.strokeStyle = "#0d2761";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Roues du pont sur les rails
    [[xPont + 20, yPont], [xPont + wPont - 20, yPont]].forEach(([cx, cy]) => {
        ctx.fillStyle = "#37474f";
        ctx.beginPath();
        ctx.arc(cx, cy + 4, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#78909c";
        ctx.beginPath();
        ctx.arc(cx, cy + 4, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Label pont
    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PONT ROULANT", xPont + wPont / 2, yPont + 14);
    ctx.font = "10px Arial";
    ctx.fillText(`${m / 1000} t`, xPont + wPont / 2, yPont + 26);

    // ---- Câble + crochet + charge ----
    let xCrochet = xPont + wPont / 2;
    let yCableTop = yPont + hPont;
    let yCableBot = 200;

    ctx.strokeStyle = "#37474f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xCrochet, yCableTop);
    ctx.lineTo(xCrochet, yCableBot);
    ctx.stroke();

    // Crochet
    ctx.strokeStyle = "#37474f";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(xCrochet, yCableBot + 6, 6, Math.PI, 0);
    ctx.stroke();

    // Charge (palette industrielle)
    let wCharge = 80, hCharge = 45;
    let xCharge = xCrochet - wCharge / 2;
    let yCharge = yCableBot + 12;
    ctx.fillStyle = C.charge;
    ctx.beginPath();
    ctx.roundRect(xCharge, yCharge, wCharge, hCharge, 4);
    ctx.fill();
    ctx.strokeStyle = "#c0612a";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${m / 1000} t`, xCrochet, yCharge + 22);
    ctx.font = "10px Arial";
    ctx.fillText("charge", xCrochet, yCharge + 36);

    // ---- Flèche vitesse ----
    if (etape >= 1) {
        ctx.strokeStyle = C.cst;
        ctx.fillStyle   = C.cst;
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(xPont + wPont + 5, yPont + 15);
        ctx.lineTo(xPont + wPont + 40, yPont + 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xPont + wPont + 45, yPont + 15);
        ctx.lineTo(xPont + wPont + 33, yPont + 9);
        ctx.lineTo(xPont + wPont + 33, yPont + 21);
        ctx.closePath();
        ctx.fill();
        ctx.font = "11px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`v = ${v} m/s`, xPont + wPont + 48, yPont + 19);
    }

    // ---- Force de frottement ----
    if (etape >= 2) {
        let yF = yCharge + 20;
        ctx.strokeStyle = "#e67e22";
        ctx.fillStyle   = "#e67e22";
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(xCharge - 10, yF);
        ctx.lineTo(xCharge - 40, yF);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xCharge - 45, yF);
        ctx.lineTo(xCharge - 33, yF - 6);
        ctx.lineTo(xCharge - 33, yF + 6);
        ctx.closePath();
        ctx.fill();
        ctx.font = "11px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`Ff = ${Ffrott} N`, xCharge - 48, yF + 4);
    }

    // ---- Force de traction (accélération) ----
    if (etape >= 3) {
        let yF = yCharge + 5;
        ctx.strokeStyle = C.acc;
        ctx.fillStyle   = C.acc;
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(xCharge + wCharge + 5, yF);
        ctx.lineTo(xCharge + wCharge + 45, yF);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xCharge + wCharge + 50, yF);
        ctx.lineTo(xCharge + wCharge + 38, yF - 6);
        ctx.lineTo(xCharge + wCharge + 38, yF + 6);
        ctx.closePath();
        ctx.fill();
        ctx.font = "11px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Ftrac = ${Ftraction_acc} N`, xCharge + wCharge + 53, yF + 4);
    }

    // ---- Diagramme v(t) en bas du canvas ----
    tracerDiagrammeVitesse(ctx, W, H, etape);

    // ---- Titre ----
    ctx.font = "13px Arial";
    ctx.fillStyle = C.pont;
    ctx.textAlign = "center";
    ctx.fillText(`Pont roulant d'atelier — masse totale : ${m} kg`, W / 2, 22);
}

function tracerDiagrammeVitesse(ctx, W, H, etape) {
    if (etape < 4) return;

    // Zone du graphe
    let gx = 30, gy = H - 135, gw = W - 60, gh = 90;

    // Fond
    ctx.fillStyle = "#fff";
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.strokeRect(gx, gy, gw, gh);

    // Axes
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke(); // x
    ctx.beginPath();
    ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.stroke(); // y

    // Labels axes
    ctx.font = "10px Arial";
    ctx.fillStyle = "#555";
    ctx.textAlign = "center";
    ctx.fillText("t (s)", gx + gw - 10, gy + gh + 12);
    ctx.save();
    ctx.translate(gx - 16, gy + gh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("v (m/s)", 0, 0);
    ctx.restore();

    // Calcul des temps pour le graphe
    let tTotal = tacc + (dcst / v) + tfrein;
    let scaleX = (gw - 20) / tTotal;
    let scaleY = (gh - 15) / (v * 1.3);

    let t0 = gx + 10;
    let y0 = gy + gh;

    // Phase 1 : accélération (vert)
    let x1 = t0 + tacc * scaleX;
    let yv = y0 - v * scaleY;

    ctx.strokeStyle = C.acc;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(t0, y0);
    ctx.lineTo(x1, yv);
    ctx.stroke();

    // Phase 2 : constante (bleu)
    let tcst_dur = dcst / v;
    let x2 = x1 + tcst_dur * scaleX;
    ctx.strokeStyle = C.cst;
    ctx.beginPath();
    ctx.moveTo(x1, yv);
    ctx.lineTo(x2, yv);
    ctx.stroke();

    // Phase 3 : freinage (rouge)
    let x3 = x2 + tfrein * scaleX;
    ctx.strokeStyle = C.frein;
    ctx.beginPath();
    ctx.moveTo(x2, yv);
    ctx.lineTo(x3, y0);
    ctx.stroke();

    // Graduations temps
    ctx.font = "9px Arial";
    ctx.fillStyle = "#555";
    ctx.textAlign = "center";
    [
        [t0, "0"],
        [x1, `${tacc}`],
        [x2, `${arrondi(tacc + tcst_dur, 0)}`],
        [x3, `${arrondi(tTotal, 0)}`]
    ].forEach(([x, lbl]) => {
        ctx.beginPath();
        ctx.moveTo(x, gy + gh);
        ctx.lineTo(x, gy + gh + 4);
        ctx.strokeStyle = "#999"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillText(lbl, x, gy + gh + 13);
    });

    // Graduation vitesse
    ctx.textAlign = "right";
    ctx.fillText(`${v}`, gx - 3, yv + 3);

    // Labels phases
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = C.acc;
    ctx.fillText("Acc.", (t0 + x1) / 2, yv - 6);
    ctx.fillStyle = C.cst;
    ctx.fillText("V cst", (x1 + x2) / 2, yv - 6);
    ctx.fillStyle = C.frein;
    ctx.fillText("Frein.", (x2 + x3) / 2, yv - 6);

    // Titre graphe
    ctx.fillStyle = "#333";
    ctx.font = "10px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Profil de vitesse v(t)", gx + 4, gy + 11);
}

// ============================================================
// EXERCICE
// ============================================================

let theme  = "41";
let nomExo = "exo6";

let exo = {

titre: "Pont roulant d'atelier — PFD et bilan énergétique",

enonce:
`Un pont roulant d'atelier déplace une charge sur une distance de \\(d = ${dTot}~\\text{m}\\).
La masse totale (pont + charge) est \\(m = ${m}~\\text{kg}\\).<br><br>

Le mouvement se déroule en trois phases :
<ul>
  <li><b>Phase 1 — Accélération :</b> de 0 à \\(v = ${v}~\\text{m/s}\\) en \\(t_{acc} = ${tacc}~\\text{s}\\)</li>
  <li><b>Phase 2 — Vitesse constante :</b> à \\(v = ${v}~\\text{m/s}\\)</li>
  <li><b>Phase 3 — Freinage :</b> de \\(v\\) à 0, symétrique à la phase 1</li>
</ul>

<b>Données :</b>
<ul>
  <li>Coefficient de frottement roulement (roues sur rail) : \\(C_{rr} = ${Crr}\\)</li>
  <li>Rendement moteur + transmission : \\(\\eta = ${eta}\\)</li>
  <li>\\(g = 9{,}81~\\text{m/s}^2\\)</li>
</ul>`,

courbe1: {},

questions: [

// ============================================================
// Q1 — Accélération
// ============================================================
{
texte: `Calculer l'accélération \\(a\\) du pont pendant la phase 1 (en m/s²).`,
reponse: a,
tolerance: 0.02,
unite: "m/s²",
feedback:
    `\\(a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{${v} - 0}{${tacc}} = ${a}~\\text{m/s}^2\\)<br><br>
    L'accélération est constante pendant la phase 1 : le pont gagne uniformément de la vitesse.`,
action: function () { tracerPontRoulant("graph", 1); }
},

// ============================================================
// Q2 — Force de frottement
// ============================================================
{
texte: `Calculer la force de frottement de roulement \\(F_f\\) (en N).<br>
<small>\\(F_f = C_{rr} \\times m \\times g\\)</small>`,
reponse: Ffrott,
unite: "N",
feedback:
    `\\(F_f = ${Crr} \\times ${m} \\times 9{,}81 = ${Ffrott}~\\text{N}\\)<br><br>
    C'est la résistance permanente au roulement des roues en acier sur les rails.
    Elle s'oppose au mouvement dans toutes les phases.`,
action: function () { tracerPontRoulant("graph", 2); }
},

// ============================================================
// Q3 — PFD : force de traction en phase d'accélération
// ============================================================
{
texte: `En appliquant le <b>Principe Fondamental de la Dynamique</b> (PFD) en phase d'accélération,
calculer la force de traction \\(F_{trac}\\) exercée par le moteur (en N).`,
reponse: Ftraction_acc,
unite: "N",
feedback:
    `<small>\\(\\sum F = m \\cdot a \\Rightarrow F_{trac} - F_f = m \\cdot a\\)</small> <br>
	Application du PFD : \\(F_{trac} - F_f = m \\cdot a\\)<br>
    \\(F_{trac} = m \\cdot a + F_f = ${m} \\times ${a} + ${Ffrott}\\)<br>
    \\(F_{trac} = ${Facc} + ${Ffrott} = ${Ftraction_acc}~\\text{N}\\)<br><br>
    Le moteur doit donc vaincre <b>à la fois</b> les frottements <i>et</i> fournir la force d'accélération.`,
action: function () { tracerPontRoulant("graph", 3); }
},

// ============================================================
// Q4 — Distance phase d'accélération
// ============================================================
{
texte: `Calculer la distance parcourue pendant la phase d'accélération \\(d_{acc}\\) (en m).`,
reponse: dacc,
unite: "m",
feedback:
    `<small>Mouvement uniformément accéléré depuis l'arrêt : \\(d = \\dfrac{1}{2} \\cdot a \\cdot t^2\\)</small> <br>
	\\(d_{acc} = \\dfrac{1}{2} \\times ${a} \\times ${tacc}^2 = ${dacc}~\\text{m}\\)<br><br>
    Par symétrie, la phase de freinage parcourt également \\(d_{frein} = ${dfrein}~\\text{m}\\).<br>
    La phase à vitesse constante couvre donc : \\(d_{cst} = ${dTot} - ${dacc} - ${dfrein} = ${dcst}~\\text{m}\\)`,
action: function () { tracerPontRoulant("graph", 4); }
},

// ============================================================
// Q5 — Force de traction en vitesse constante
// ============================================================
{
texte: `En phase de vitesse constante, quelle est la force de traction \\(F'_{trac}\\) exercée par le moteur (en N) ?<br>
<small>Rappel : si \\(a = 0\\), que dit le PFD ?</small>`,
reponse: Ftraction_cst,
unite: "N",
feedback:
    `Quand \\(a = 0\\) : \\(\\sum F = 0 \\Rightarrow F'_{trac} = F_f = ${Ffrott}~\\text{N}\\)<br><br>
    En vitesse constante, le moteur ne fournit plus que la force nécessaire à <b>compenser les frottements</b>.
    C'est nettement moins qu'en phase d'accélération (${Ftraction_acc} N) : la puissance moteur est donc réduite.`,
action: function () { tracerPontRoulant("graph", 5); }
},

// ============================================================
// Q6 — Énergie cinétique
// ============================================================
{
texte: `Calculer l'énergie cinétique \\(E_c\\) du pont en régime établi (en J).`,
reponse: Ec,
unite: "J",
feedback:
    `<small>\\(E_c = \\dfrac{1}{2} \\cdot m \\cdot v^2\\)</small> <br>
	\\(E_c = \\dfrac{1}{2} \\times ${m} \\times ${v}^2 = ${Ec}~\\text{J}\\)<br><br>
    C'est l'énergie stockée sous forme de mouvement. Lors du freinage, cette énergie est
    dissipée dans les freins mécaniques (ou récupérée par freinage régénératif sur un variateur moderne).`,
action: function () { tracerPontRoulant("graph", 6); }
},

// ============================================================
// Q7 — Puissance mécanique en phase constante
// ============================================================
{
texte: `Calculer la puissance mécanique \\(P_{mec}\\) développée par le moteur
en phase de vitesse constante (en W).`,
reponse: P_mec_cst,
unite: "W",
feedback:
    `\\(P_{mec} = F'_{trac} \\times v = ${Ffrott} \\times ${v} = ${P_mec_cst}~\\text{W}\\)<br><br>
    C'est la puissance <i>utile</i> en régime établi. La puissance en phase d'accélération est
    plus élevée : \\(P_{acc} = F_{trac} \\times v = ${Ftraction_acc} \\times ${v} = ${P_mec_acc}~\\text{W}\\).
    C'est cette valeur de pointe qui dimensionne le moteur.`,
action: function () { tracerPontRoulant("graph", 7); }
},

// ============================================================
// Q8 — Puissance électrique absorbée
// ============================================================
{
texte: `Calculer la puissance électrique absorbée par le moteur \\(P_{élec}\\)
en phase de vitesse constante (en W).`,
reponse: P_elec,
unite: "W",
feedback:
    `<small>\\(\\eta = \\dfrac{P_{mec}}{P_{élec}}\\)</small> <br>
	\\(P_{élec} = \\dfrac{P_{mec}}{\\eta} = \\dfrac{${P_mec_cst}}{${eta}} = ${P_elec}~\\text{W}\\)<br><br>
    L'écart avec \\(P_{mec}\\) représente les pertes Joule dans les enroulements du moteur
    et les pertes mécaniques dans la transmission.`,
action: function () { tracerPontRoulant("graph", 8); }
},

// ============================================================
// Q9 — Bilan énergétique : énergie électrique totale
// ============================================================
{
texte: `Calculer l'énergie électrique totale \\(W_{élec}\\) consommée
pour effectuer le déplacement complet de \\(${dTot}~\\text{m}\\) (en J).<br>
<small>On ne considère que les phases d'accélération et de vitesse constante
(le freinage est mécanique, sans récupération).</small>`,
reponse: W_elec,
unite: "J",
feedback:
    `\\(W_{élec} = \\dfrac{F_{trac} \\times d_{acc} + F'_{trac} \\times d_{cst}}{\\eta}\\) <br>
	\\(W_{élec} = \\dfrac{${Ftraction_acc} \\times ${dacc} + ${Ffrott} \\times ${dcst}}{${eta}}\\)<br><br>
    \\(W_{élec} = \\dfrac{${arrondi(Ftraction_acc * dacc, 0)} + ${arrondi(Ffrott * dcst, 0)}}{${eta}}
    = \\dfrac{${arrondi(Ftraction_acc * dacc + Ffrott * dcst, 0)}}{${eta}} = ${W_elec}~\\text{J}\\)<br><br>
    <b>Bilan du cycle :</b>
    <ul>
      <li>Énergie utile (vaincre les frottements sur tout le trajet) :
          \\(W_{frott} = ${Ffrott} \\times ${dTot} = ${W_frott}~\\text{J}\\)</li>
      <li>Énergie cinétique acquise (dissipée au freinage) : \\(E_c = ${Ec}~\\text{J}\\)</li>
      <li>Pertes dans le moteur et la transmission :
          \\(W_{pertes} = ${W_elec} - ${arrondi(Ftraction_acc * dacc + Ffrott * dcst, 0)} = ${W_elec - arrondi(Ftraction_acc * dacc + Ffrott * dcst, 0)}~\\text{J}\\)</li>
    </ul>
    Sur un pont roulant équipé d'un <b>variateur avec freinage régénératif</b>,
    l'énergie cinétique (${Ec} J) serait restituée au réseau lors du freinage !`,
action: function () { tracerPontRoulant("graph", 9); }
}

] // fin questions
}; // fin exo

// ============================================================
// LANCEMENT
// ============================================================

let nbquestion = exo.questions.length;

window.onload = function () {
    genererExercice(exo);
    tracerPontRoulant("graph", 0);
};