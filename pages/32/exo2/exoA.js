// =====================
// EXERCICE : Harmoniques de courant
// Lecture d'un analyseur de réseau type Chauvin Arnoux 8336
// =====================
// Convention : u(t) = Umax * sin(w*t)
//              i(t) = sum_h  Ih_crete * sin(h*w*t + phi_h)
// phi_h = déphasage de chaque harmonique (en radians)
// =====================

// =====================
// PARAMÈTRES RÉSEAU
// =====================
let Veff_u  = 230;                          // V efficace réseau
let Vmax_u  = arrondi(Veff_u * Math.sqrt(2)); // V crête
let freq_u  = 50;                           // Hz
let w_u     = 2 * Math.PI * freq_u;        // rad/s

// =====================
// PROFILS PHYSIQUES — amplitudes (% de I1) + déphasages (rad)
// Sources : IEC 61000-3-2, Dugan "Power Quality", mesures terrain
// =====================
const PROFILS = [
  {
    nom:      "Pont de diodes + condensateur",
    type:     "Redresseur PD2 (PC, TV, chargeur)",
    cosPhi1:  0.955,
    // Courant en créneaux étroits autour des pics de tension
    // Impairs dominants, alternance phi=0 / phi=PI → symétrie demi-onde
    H: [
      { h:1,  A:100, phi:  0.30 },
      { h:3,  A:  75, phi:  0.00 },
      { h:5,  A:  45, phi:  Math.PI },
      { h:7,  A:  25, phi:  0.00 },
      { h:9,  A:  15, phi:  Math.PI },
      { h:11, A:  10, phi:  0.00 },
      { h:13, A:   7, phi:  Math.PI },
      { h:15, A:   4, phi:  0.00 },
      { h:17, A:   3, phi:  Math.PI },
      { h:19, A:   2, phi:  0.00 },
    ]
  },
  {
    nom:      "Variateur de vitesse monophasé",
    type:     "Variateur + inductance de lissage",
    cosPhi1:  0.853,
    // Fondamental inductif (retard), harmoniques avec phases décalées
    H: [
      { h:1,  A:100, phi: -0.55 },
      { h:3,  A:  60, phi:  1.20 },
      { h:5,  A:  35, phi: -1.80 },
      { h:7,  A:  18, phi:  0.80 },
      { h:9,  A:   8, phi: -0.60 },
      { h:11, A:   6, phi:  1.50 },
      { h:13, A:   4, phi: -1.20 },
      { h:15, A:   2, phi:  0.40 },
    ]
  },
  {
    nom:      "Alimentation à découpage (SMPS)",
    type:     "Alimentation à découpage haute fréquence",
    cosPhi1:  0.989,
    // 3e harmonique dominant, courant très pulsé, THD très élevé
    H: [
      { h:1,  A:100, phi:  0.15 },
      { h:3,  A:  88, phi:  0.05 },
      { h:5,  A:  62, phi:  Math.PI + 0.10 },
      { h:7,  A:  38, phi:  0.20 },
      { h:9,  A:  22, phi:  Math.PI + 0.05 },
      { h:11, A:  14, phi:  0.15 },
      { h:13, A:   9, phi:  Math.PI + 0.10 },
      { h:15, A:   6, phi:  0.20 },
      { h:17, A:   4, phi:  Math.PI },
      { h:19, A:   3, phi:  0.00 },
    ]
  },
  {
    nom:      "Lampes fluorescentes compactes",
    type:     "Ballast électronique (LFC)",
    cosPhi1:  0.980,
    // Courant en double bosse par demi-période (forme en «M»)
    H: [
      { h:1,  A:100, phi:  0.20 },
      { h:3,  A:  78, phi:  0.00 },
      { h:5,  A:  48, phi:  Math.PI },
      { h:7,  A:  22, phi:  0.10 },
      { h:9,  A:  12, phi:  Math.PI },
      { h:11, A:   7, phi:  0.05 },
      { h:13, A:   5, phi:  Math.PI },
      { h:15, A:   3, phi:  0.00 },
    ]
  },
  {
    nom:      "Gradateur TRIAC à mi-course",
    type:     "Gradateur de lumière (angle de phase ~90°)",
    cosPhi1:  0.921,
    // Pairs ET impairs présents (asymétrie légère), courant tronqué
    H: [
      { h:1,  A:100, phi: -0.40 },
      { h:2,  A:   8, phi:  1.20 },
      { h:3,  A:  55, phi:  Math.PI/2 },
      { h:4,  A:   5, phi: -0.80 },
      { h:5,  A:  32, phi: -Math.PI/3 },
      { h:6,  A:   3, phi:  0.50 },
      { h:7,  A:  18, phi:  Math.PI/4 },
      { h:8,  A:   2, phi: -0.30 },
      { h:9,  A:   9, phi:  0.60 },
      { h:11, A:   5, phi: -0.20 },
      { h:13, A:   3, phi:  0.40 },
    ]
  }
];

// =====================
// TIRAGE ALÉATOIRE
// =====================
let profilIdx = Math.floor(Math.random() * PROFILS.length);
let profil    = PROFILS[profilIdx];

// Fondamental courant (valeur efficace, mA)
const I1_tab = [450, 580, 720, 860, 1010, 1180, 1350];
let I1_mA    = I1_tab[Math.floor(Math.random() * I1_tab.length)];
let I1_crete = I1_mA * Math.sqrt(2); // mA crête

// Légère variation aléatoire ±6% sur chaque harmonique (hors fondamental)
let H_rand = profil.H.map((h, idx) => {
    if (idx === 0) return { ...h };
    let noise = 0.94 + Math.random() * 0.12;
    return { h: h.h, A: Math.round(h.A * noise), phi: h.phi };
});

// =====================
// FONCTION COURANT
// =====================
function iCourant(t) {
    let s = 0;
    for (let h of H_rand) {
        s += (I1_crete * h.A / 100) * Math.sin(h.h * w_u * t + h.phi);
    }
    return s; // mA crête
}

// =====================
// CALCULS ANALYTIQUES
// =====================

// Ieff total = sqrt(somme des Ih_eff²)   avec Ih_eff = I1_mA * Ah/100 / sqrt(2) * sqrt(2) = I1_mA * Ah/100
// Attention : Ih_eff = (I1_mA * Ah/100) car I1_mA est déjà en valeur efficace
let Ieff_mA  = arrondi(Math.sqrt(H_rand.reduce((s, h) => s + (I1_mA * h.A / 100) ** 2, 0)));

// Imax par balayage numérique précis
const N_calc = 4000;
let Imax_num = 0;
for (let k = 0; k < N_calc; k++) {
    let t = k / N_calc / freq_u;
    let v = Math.abs(iCourant(t));
    if (v > Imax_num) Imax_num = v;
}
let Imax_mA = arrondi(Imax_num); // mA crête réel

// Courant déformant (harmoniques de rang ≥ 2)
let Iad_mA = arrondi(Math.sqrt(H_rand.filter(h => h.h > 1).reduce((s, h) => s + (I1_mA * h.A / 100) ** 2, 0)));

// THD
let THD_val = arrondi((Iad_mA / I1_mA) * 100);

// Rang harmonique dominant (hors fondamental)
let maxA = 0, rangMax_h = 0;
for (let h of H_rand) {
    if (h.h > 1 && h.A > maxA) { maxA = h.A; rangMax_h = h.h; }
}
let freqHmax_val = rangMax_h * freq_u;
let IhMax_mA     = arrondi(I1_mA * maxA / 100);

// Puissances
let phi1_val   = H_rand[0].phi;
let cosPhi1_val = arrondi(Math.cos(phi1_val));
let sinPhi1_val = Math.sin(phi1_val);
let tanPhi1_val = arrondi(Math.tan(phi1_val));

let P_W    = arrondi((Veff_u * I1_mA / 1000) * cosPhi1_val);
let Q1_var = arrondi((Veff_u * I1_mA / 1000) * sinPhi1_val);
let S_VA   = arrondi(Veff_u * Ieff_mA / 1000);
let D_var  = arrondi(Math.sqrt(Math.max(0, S_VA ** 2 - P_W ** 2 - Q1_var ** 2)));
let FP_val = arrondi(P_W / S_VA);

// =====================
// DESSIN DES ÉCRANS LCD
// =====================
const LCD_BG  = "#0f1f0f";
const LCD_GRN = "#00ff44";
const LCD_DIM = "#006622";
const LCD_ORG = "#ff8800";
const LCD_RED = "#ff3300";
const LCD_WHT = "#ccffcc";

function roundR(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

function drawBoitier(ctx, W, H) {
    let g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#2e2e2e"); g.addColorStop(1, "#181818");
    ctx.fillStyle = g;
    roundR(ctx, 0, 0, W, H, 10); ctx.fill();
    ctx.strokeStyle = "#3a3a3a"; ctx.lineWidth = 1.5;
    roundR(ctx, 0, 0, W, H, 10); ctx.stroke();
    // écran
    ctx.fillStyle = LCD_BG;
    roundR(ctx, 10, 10, W - 20, H - 46, 5); ctx.fill();
    ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 1;
    roundR(ctx, 10, 10, W - 20, H - 46, 5); ctx.stroke();
    // boutons
    let nb = 4, bW = Math.floor((W - 30) / nb) - 4;
    for (let i = 0; i < nb; i++) {
        let bx = 15 + i * (bW + 4);
        ctx.fillStyle = "#252525"; roundR(ctx, bx, H - 33, bW, 18, 3); ctx.fill();
        ctx.strokeStyle = "#404040"; ctx.lineWidth = 0.8;
        roundR(ctx, bx, H - 33, bW, 18, 3); ctx.stroke();
    }
    ctx.fillStyle = "#444"; ctx.font = "bold 7px Arial";
    ctx.textAlign = "right";
    ctx.fillText("CHAUVIN ARNOUX  8336", W - 12, H - 37);
}

// ---- ÉCRAN 1 : Formes d'ondes ----
function drawEcran1(ctx, W, H) {
    drawBoitier(ctx, W, H);
    const gx = 14, gy = 14, gw = W - 28, gh = H - 60;
    const cy = gy + gh / 2;

    // Grille
    ctx.strokeStyle = "#0b3a0b"; ctx.lineWidth = 0.7;
    for (let i = 1; i <= 9; i++) {
        ctx.beginPath(); ctx.moveTo(gx + i*gw/10, gy); ctx.lineTo(gx + i*gw/10, gy+gh); ctx.stroke();
    }
    for (let i = 1; i <= 7; i++) {
        ctx.beginPath(); ctx.moveTo(gx, gy + i*gh/8); ctx.lineTo(gx+gw, gy + i*gh/8); ctx.stroke();
    }
    ctx.strokeStyle = LCD_DIM; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx, cy); ctx.lineTo(gx+gw, cy); ctx.stroke();

    const N  = 800;
    const T2 = 2 / freq_u;
    const VscMax  = Vmax_u * 1.15;
    const IscMax  = Imax_mA * 1.15; // mA

    // Tension (vert)
    ctx.strokeStyle = LCD_GRN; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let k = 0; k <= N; k++) {
        let t  = k / N * T2;
        let v  = Vmax_u * Math.sin(w_u * t);
        let px = gx + k/N * gw;
        let py = cy - (v / VscMax) * (gh / 2);
        k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Courant (orange) — avec les vrais déphasages
    ctx.strokeStyle = LCD_ORG; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let k = 0; k <= N; k++) {
        let t  = k / N * T2;
        let iV = iCourant(t);          // mA (valeur instantanée crête)
        let px = gx + k/N * gw;
        let py = cy - (iV / IscMax) * (gh / 2);
        py = Math.max(gy + 1, Math.min(gy + gh - 1, py));
        k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Mesures
    ctx.font = "bold 9px 'Courier New', monospace"; ctx.textAlign = "left";
    ctx.fillStyle = LCD_GRN;
    ctx.fillText("U= " + Veff_u.toFixed(1) + " V",       gx+3, gy+12);
    ctx.fillText("Umax= " + Vmax_u.toFixed(1) + " V",    gx+3, gy+23);
    ctx.fillStyle = LCD_ORG;
    ctx.fillText("I= " + (Ieff_mA/1000).toFixed(3) + " A",    gx+3, gy+38);
    ctx.fillText("Imax= " + (Imax_mA/1000).toFixed(3) + " A", gx+3, gy+49);
    ctx.fillStyle = LCD_DIM; ctx.textAlign = "right";
    ctx.fillText(freq_u.toFixed(2) + " Hz",              gx+gw-3, gy+12);
    ctx.fillText("T= " + (1000/freq_u).toFixed(1)+" ms", gx+gw-3, gy+23);
    ctx.fillStyle = LCD_GRN; ctx.textAlign = "right";
    ctx.fillText("─ U(t)", gx+gw-3, gy+gh-14);
    ctx.fillStyle = LCD_ORG;
    ctx.fillText("─ I(t)", gx+gw-3, gy+gh-3);
    ctx.fillStyle = "#3a4a3a"; ctx.font = "8px Arial"; ctx.textAlign = "center";
    ctx.fillText("ÉCRAN 1 — FORMES D'ONDES", W/2, H-5);
}

// ---- ÉCRAN 2 : Spectre harmoniques ----
function drawEcran2(ctx, W, H) {
    drawBoitier(ctx, W, H);
    const gx = 38, gy = 14, gw = W - 52, gh = H - 62;

    // Axe Y gradué en %
    ctx.font = "7px 'Courier New', monospace";
    for (let p = 0; p <= 100; p += 25) {
        let yp = gy + gh - (p / 110) * gh;
        ctx.strokeStyle = "#0b3a0b"; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(gx, yp); ctx.lineTo(gx+gw, yp); ctx.stroke();
        ctx.fillStyle = LCD_DIM; ctx.textAlign = "right";
        ctx.fillText(p + "%", gx - 2, yp + 3);
    }
    ctx.strokeStyle = LCD_DIM; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(gx, gy+gh); ctx.lineTo(gx+gw, gy+gh); ctx.stroke();

    // Trouver le rang max à afficher
    let hMax = Math.max(...H_rand.map(h => h.h));
    let nB   = hMax + 1;
    let sp   = Math.floor(gw / nB);
    let bW   = Math.max(3, sp - 2);

    // Barres (rang 0 à hMax)
    for (let rank = 0; rank <= hMax; rank++) {
        let hObj = H_rand.find(h => h.h === rank);
        let val  = hObj ? hObj.A : 0;
        let bH   = (val / 110) * gh;
        let bx   = gx + rank * sp + Math.floor((sp - bW) / 2);
        let by   = gy + gh - bH;

        if (rank === 0) ctx.fillStyle = "#005566";
        else if (rank === 1) ctx.fillStyle = LCD_GRN;
        else if (rank === rangMax_h) ctx.fillStyle = LCD_RED;
        else ctx.fillStyle = LCD_ORG;

        ctx.fillRect(bx, by, bW, bH);

        ctx.fillStyle = LCD_DIM;
        ctx.font = "7px 'Courier New', monospace"; ctx.textAlign = "center";
        ctx.fillText(rank === 0 ? "DC" : rank, bx + bW/2, gy+gh+9);
    }

    // Panel info
    const IF = "bold 8px 'Courier New', monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = LCD_GRN; ctx.font = IF;
    ctx.fillText("A-h01 " + (I1_mA/1000).toFixed(3) + " A",  gx+1, gy+12);
    ctx.fillStyle = LCD_ORG;
    ctx.fillText("THD   " + THD_val.toFixed(1) + " %",        gx+1, gy+23);
    ctx.fillText("Iad   " + (Iad_mA/1000).toFixed(3) + " A",  gx+1, gy+34);
    ctx.fillText("Ieff  " + (Ieff_mA/1000).toFixed(3) + " A", gx+1, gy+45);
    ctx.fillStyle = LCD_RED;
    ctx.fillText("▲ h" + String(rangMax_h).padStart(2,"0") + "  " + maxA + "%", gx+1, gy+56);

    ctx.fillStyle = "#3a4a3a"; ctx.font = "8px Arial"; ctx.textAlign = "center";
    ctx.fillText("ÉCRAN 2 — HARMONIQUES DE COURANT", W/2, H-5);
}

// ---- ÉCRAN 3 : Puissances ----
function drawEcran3(ctx, W, H) {
    drawBoitier(ctx, W, H);
    const gx = 12, gy = 14, gw = W - 24, gh = H - 60;

    ctx.fillStyle = LCD_GRN; ctx.font = "bold 16px 'Courier New', monospace"; ctx.textAlign = "left";
    ctx.fillText("W", gx+4, gy+18);
    ctx.fillStyle = LCD_DIM; ctx.font = "8px 'Courier New', monospace"; ctx.textAlign = "right";
    ctx.fillText(freq_u.toFixed(2) + " Hz",  gx+gw-2, gy+10);
    ctx.fillText(Veff_u.toFixed(1) + " V",   gx+gw-2, gy+21);

    ctx.strokeStyle = "#0b3a0b"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx, gy+27); ctx.lineTo(gx+gw, gy+27); ctx.stroke();

    const colW  = Math.floor(gw/2) - 6;
    const rowH  = Math.floor((gh - 32) / 4);
    const rowH2 = Math.floor((gh - 32) / 3);
    const rx2   = gx + colW + 10;

    const rowsL = [
        { lbl: "P  (W)",   val: P_W.toFixed(0),    col: LCD_GRN },
        { lbl: "Q1 (var)", val: Q1_var.toFixed(0),  col: LCD_ORG },
        { lbl: "D  (var)", val: D_var.toFixed(0),   col: "#ff55aa" },
        { lbl: "S  (VA)",  val: S_VA.toFixed(0),    col: LCD_WHT },
    ];
    const rowsR = [
        { lbl: "cosPhi1", val: cosPhi1_val.toFixed(3), col: LCD_GRN },
        { lbl: "tanPhi1", val: tanPhi1_val.toFixed(3), col: LCD_ORG },
        { lbl: "FP     ", val: FP_val.toFixed(3),      col: LCD_WHT },
    ];

    rowsL.forEach((r, i) => {
        let ry = gy + 31 + i * rowH;
        ctx.fillStyle = i%2===0 ? "#0c1e0c" : "#0a180a";
        ctx.fillRect(gx, ry, colW, rowH-2);
        ctx.fillStyle = LCD_DIM; ctx.font = "7px 'Courier New', monospace"; ctx.textAlign = "left";
        ctx.fillText(r.lbl, gx+3, ry+10);
        ctx.fillStyle = r.col; ctx.font = "bold 13px 'Courier New', monospace";
        let sign = parseFloat(r.val) >= 0 ? "+" : "";
        ctx.fillText(sign + r.val, gx+3, ry+rowH-3);
    });

    ctx.strokeStyle = "#0b3a0b";
    ctx.beginPath(); ctx.moveTo(rx2-2, gy+27); ctx.lineTo(rx2-2, gy+gh); ctx.stroke();

    rowsR.forEach((r, i) => {
        let ry = gy + 31 + i * rowH2;
        ctx.fillStyle = i%2===0 ? "#0c1e0c" : "#0a180a";
        ctx.fillRect(rx2, ry, colW, rowH2-2);
        ctx.fillStyle = LCD_DIM; ctx.font = "7px 'Courier New', monospace"; ctx.textAlign = "left";
        ctx.fillText(r.lbl, rx2+3, ry+10);
        ctx.fillStyle = r.col; ctx.font = "bold 13px 'Courier New', monospace";
        let sign = parseFloat(r.val) >= 0 ? "+" : "";
        ctx.fillText(sign + r.val, rx2+3, ry+rowH2-3);
    });

    // Symbole bobine/condo
    ctx.strokeStyle = LCD_ORG; ctx.lineWidth = 1.5;
    let sx = rx2 + 8, sy = gy + gh - 12;
    if (Q1_var >= 0) {
        ctx.beginPath(); ctx.moveTo(sx-6, sy);
        for (let j = 0; j < 4; j++) ctx.arc(sx + j*7, sy, 3.5, Math.PI, 0);
        ctx.lineTo(sx+3*7+6, sy); ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(sx, sy-7); ctx.lineTo(sx, sy+7);
        ctx.moveTo(sx+7, sy-7); ctx.lineTo(sx+7, sy+7);
        ctx.moveTo(sx-5, sy); ctx.lineTo(sx, sy);
        ctx.moveTo(sx+7, sy); ctx.lineTo(sx+12, sy);
        ctx.stroke();
    }

    ctx.fillStyle = "#3a4a3a"; ctx.font = "8px Arial"; ctx.textAlign = "center";
    ctx.fillText("ÉCRAN 3 — BILAN DE PUISSANCES", W/2, H-5);
}

// ---- ASSEMBLAGE des 3 écrans ----
function dessinerAnalyseur(canvasId) {
    const canvas = document.getElementById(canvasId);
    canvas.width  = 900;
    canvas.height = 400;
    canvas.style.width    = "900px";
    canvas.style.maxWidth = "100%";

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 900, 400);

    ctx.fillStyle = "#555"; ctx.font = "bold 10px Arial"; ctx.textAlign = "center";
    ctx.fillText("ANALYSEUR DE RÉSEAU  CHAUVIN ARNOUX  8336  —  " + profil.type.toUpperCase(), 450, 13);

    const eW = 290, eH = 375;
    const fns = [drawEcran1, drawEcran2, drawEcran3];

    fns.forEach((fn, i) => {
        let off = document.createElement("canvas");
        off.width = eW; off.height = eH;
        fn(off.getContext("2d"), eW, eH);
        ctx.drawImage(off, 5 + i * (eW + 5), 17, eW, eH);
    });
}

// =====================
// DÉFINITION DE L'EXERCICE
// =====================
let theme   = "32";
let nomExo  = "exo_harmoniques_lecture";

let exo = {

    titre: "Lecture d'un analyseur de réseau — Harmoniques de courant",

    enonce: `Un technicien utilise un analyseur de réseau <b>Chauvin Arnoux 8336</b> sur une charge de type <i>${profil.nom}</i> alimentée sous <b>${Veff_u} V – ${freq_u} Hz</b>.<br><br>
Les trois écrans ci-dessous sont relevés simultanément :<br>
<ul>
  <li><b>Écran 1</b> – Formes d'ondes de u(t) et i(t)</li>
  <li><b>Écran 2</b> – Spectre harmonique du courant</li>
  <li><b>Écran 3</b> – Bilan des puissances</li>
</ul>
<i>La tension est sinusoïdale pure. Le courant présente des distorsions harmoniques.</i>`,

    courbe1: { Nom: "Analyseur 8336", axeX: "t", axeY: "U / I" },

    questions: [

        {
            texte: `<b>[Écran 1]</b> Relever la valeur efficace totale du courant \\(I_{eff}\\).`,
            reponse: arrondi(Ieff_mA / 1000),
            tolerance: 0.02,
            unite: "A",
            feedback: `L'analyseur affiche la valeur efficace réelle (tous harmoniques) :<br>
\\(I_{eff} = ${(Ieff_mA/1000).toFixed(3)}~\\text{A}\\)<br>
<small>\\(I_{eff} = \\sqrt{\\displaystyle\\sum_{h} I_h^2}\\) — la RMS inclut l'intégralité du spectre.</small>`,
        },

        {
            texte: `<b>[Écran 1]</b> Relever la valeur maximale (crête) du courant \\(I_{max}\\).`,
            reponse: arrondi(Imax_mA / 1000),
            tolerance: 0.02,
            unite: "A",
            feedback: `L'analyseur mesure le pic réel du signal :<br>
\\(I_{max} = ${(Imax_mA/1000).toFixed(3)}~\\text{A}\\)<br>
<small>⚠️ Pour un courant non sinusoïdal, \\(I_{max} \\neq I_{eff}\\times\\sqrt{2}\\). Le facteur de crête \\(k_c = I_{max}/I_{eff} = ${arrondi(Imax_mA/Ieff_mA)}\\) est différent de 1,414.</small>`,
        },

        {
            texte: `<b>[Écran 1]</b> La tension est sinusoïdale. Calculer sa valeur maximale \\(U_{max}\\) à partir de \\(U_{eff}\\).`,
            reponse: Vmax_u,
            tolerance: 0.02,
            unite: "V",
            feedback: `La tension étant sinusoïdale, le facteur de crête vaut \\(\\sqrt{2}\\) :<br>
\\(U_{max} = U_{eff}\\times\\sqrt{2} = ${Veff_u}\\times 1{,}414 = ${Vmax_u}~\\text{V}\\)`,
        },

        {
            texte: `<b>[Écran 2]</b> Relever la valeur efficace du courant fondamental \\(I_1\\) (ligne "A-h01").`,
            reponse: arrondi(I1_mA / 1000),
            tolerance: 0.02,
            unite: "A",
            feedback: `"A-h01" désigne le rang 1 (fondamental à ${freq_u} Hz) :<br>
\\(I_1 = ${(I1_mA/1000).toFixed(3)}~\\text{A}\\)`,
        },

        {
            texte: `<b>[Écran 2]</b> Identifier le rang \\(h\\) de l'harmonique de courant dominant (hors fondamental). Donner ce rang (entier).`,
            reponse: rangMax_h,
            tolerance: 0.01,
            unite: "",
            feedback: `La barre la plus haute hors rang 1 correspond au rang :<br>
\\(h = ${rangMax_h}\\quad(${maxA}\\%~\\text{de}~I_1)\\)<br>
Soit \\(I_{h${rangMax_h}} = ${(IhMax_mA/1000).toFixed(3)}~\\text{A}\\) efficace.`,
        },

        {
            texte: `<b>[Calcul]</b> Calculer la fréquence de cet harmonique de rang \\(${rangMax_h}\\).`,
            reponse: freqHmax_val,
            tolerance: 0.01,
            unite: "Hz",
            feedback: `\\(f_h = h\\times f_1 = ${rangMax_h}\\times${freq_u} = ${freqHmax_val}~\\text{Hz}\\)`,
        },

        {
            texte: `<b>[Écran 2]</b> Relever le taux de distorsion harmonique \\(THD\\).`,
            reponse: THD_val,
            tolerance: 0.05,
            unite: "%",
            feedback: `\\(THD = \\dfrac{I_{ad}}{I_1}\\times 100 = \\dfrac{${(Iad_mA/1000).toFixed(3)}}{${(I1_mA/1000).toFixed(3)}}\\times 100 = ${THD_val}~\\%\\)<br>
<small>Un THD élevé traduit une forte déformation du courant par rapport à la sinusoïde pure.</small>`,
        },

        {
            texte: `<b>[Écran 3]</b> Relever la puissance active \\(P\\) et la puissance apparente \\(S\\). Vérifier que \\(S = U_{eff}\\times I_{eff}\\).`,
            reponse: P_W,
            tolerance: 0.03,
            unite: "W",
            feedback: `Lecture écran 3 :<br>
\\(P = ${P_W}~\\text{W}\\quad;\\quad S = ${S_VA}~\\text{VA}\\)<br>
Vérification : \\(S = ${Veff_u}\\times ${(Ieff_mA/1000).toFixed(3)} = ${S_VA}~\\text{VA}\\) ✓`,
        },

        {
            texte: `<b>[Écran 3]</b> Relever le facteur de puissance \\(FP\\) et le \\(\\cos\\varphi_1\\). Expliquer pourquoi \\(FP < \\cos\\varphi_1\\).`,
            type: "texte",
            reponse: ["harmoniques", "distorsion", "FP < cos", "dégradé", "déformante", "inférieur", "plus faible"],
            feedback: `Lecture :<br>
\\(FP = ${FP_val}\\quad;\\quad\\cos\\varphi_1 = ${cosPhi1_val}\\)<br><br>
\\(FP = P/S < \\cos\\varphi_1\\) car les harmoniques augmentent \\(I_{eff}\\) donc \\(S\\), sans augmenter \\(P\\).<br>
La puissance déformante \\(D = ${D_var}~\\text{var}\\) dégrade le facteur de puissance global.`,
        },

        {
            texte: `<b>[Calcul]</b> Calculer la puissance déformante \\(D\\) à partir de \\(S\\), \\(P\\) et \\(Q_1\\).`,
            reponse: D_var,
            tolerance: 0.05,
            unite: "var",
            feedback: `Relation entre les puissances :<br>
\\(S^2 = P^2 + Q_1^2 + D^2\\)<br>
\\(D = \\sqrt{S^2 - P^2 - Q_1^2} = \\sqrt{${S_VA}^2 - ${P_W}^2 - ${Q1_var}^2} = ${D_var}~\\text{var}\\)<br>
<small>\\(D\\) est due aux harmoniques de courant. Elle ne produit pas de travail mais sollicite les câbles et les transformateurs.</small>`,
        },

    ]
};

// =====================
// LANCEMENT
// =====================
let nbquestion = exo.questions.length;

window.onload = function () {
    genererExercice(exo);
    dessinerAnalyseur("graph");
};





