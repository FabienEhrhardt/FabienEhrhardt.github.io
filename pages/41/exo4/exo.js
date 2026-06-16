// ============================================================
// PARAMÈTRES ALÉATOIRES
// ============================================================

// --- Type de véhicule ---
let vehicules = [
    { nom: "voiture électrique urbaine",   symbole: "🚗", masse_base: 1200, Cx: 0.28, S: 2.2  },
    { nom: "camionnette de livraison",      symbole: "🚐", masse_base: 2200, Cx: 0.38, S: 3.8  },
    { nom: "scooter électrique",            symbole: "🛵", masse_base: 180,  Cx: 0.55, S: 0.6  },
    { nom: "vélo cargo électrique",         symbole: "🚲", masse_base: 80,   Cx: 0.90, S: 0.5  }
];
let vi    = Math.floor(Math.random() * vehicules.length);
let VEH   = vehicules[vi];

// --- Masse totale (véhicule + occupants + charge) ---
let massesExtra = [60, 80, 100, 120, 150];
let mExtra      = massesExtra[Math.floor(Math.random() * massesExtra.length)];
let m           = VEH.masse_base + mExtra;   // kg

// --- Vitesse maximale ---
let VmaxTab = [90, 110, 130];
let Vmax_kmh, Vmax;
// Cohérence selon véhicule
if (vi === 2) { Vmax_kmh = 45; }         // scooter
else if (vi === 3) { Vmax_kmh = 25; }    // vélo cargo
else { Vmax_kmh = VmaxTab[Math.floor(Math.random() * VmaxTab.length)]; }
Vmax = arrondi(Vmax_kmh / 3.6, 2);       // m/s

// --- Pente (%) ---
let penteTab = [0, 3, 5, 8, 10];
let pente_pct = penteTab[Math.floor(Math.random() * penteTab.length)];
let alpha     = Math.atan(pente_pct / 100); // rad (petit angle)

// --- Coefficient de frottement roulement ---
let CrrTab = [0.010, 0.012, 0.015];
let Crr    = CrrTab[Math.floor(Math.random() * CrrTab.length)];

// --- Constante physique ---
let g    = 9.81;
let rhoA = 1.20;  // densité air kg/m³

// ============================================================
// CALCULS CHAÎNE D'ÉNERGIE
// ============================================================

// Force de frottement roulement
let Froul = arrondi(Crr * m * g * Math.cos(alpha), 1);

// Force aérodynamique à Vmax
let Faero = arrondi(0.5 * rhoA * VEH.Cx * VEH.S * Vmax * Vmax, 1);

// Force de gravité sur pente
let Fpente = arrondi(m * g * Math.sin(alpha), 1);

// Force totale résistante à Vmax
let Ftot = arrondi(Froul + Faero + Fpente, 1);

// Puissance résistive totale à Vmax (côté roues)
let Proues = arrondi(Ftot * Vmax, 0);

// --- Transmission : réducteur + différentiel ---
let etaTransTab = [0.92, 0.94, 0.95, 0.97];
let etaTrans    = etaTransTab[Math.floor(Math.random() * etaTransTab.length)];

// Rapport de réduction global (moteur → roue)
let rRedTab = [8, 9, 10, 12];
let rRed    = rRedTab[Math.floor(Math.random() * rRedTab.length)];

// Rayon des roues (m)
let rayonTab = [vi === 3 ? 0.35 : (vi === 2 ? 0.25 : 0.32)];
let Rroue    = rayonTab[0] + Math.floor(Math.random() * 3) * 0.01; // légère variation

// Puissance moteur nécessaire (en tenant compte du rendement transmission)
let PmotMin = arrondi(Proues / etaTrans, 0);

// Couple aux roues
let Croues = arrondi(Ftot * Rroue, 1);

// Vitesse angulaire roues à Vmax
let omegaRoues = arrondi(Vmax / Rroue, 2);

// Vitesse angulaire moteur à Vmax
let omegaMoteur = arrondi(omegaRoues * rRed, 1);

// Vitesse moteur en tr/min
let nMoteur = arrondi(omegaMoteur * 30 / Math.PI, 0);

// Couple moteur nominal (à Vmax)
let CmotMin = arrondi(PmotMin / omegaMoteur, 1);

// --- Rendement moteur électrique ---
let etaMotTab = [0.90, 0.92, 0.94, 0.95];
let etaMot    = etaMotTab[Math.floor(Math.random() * etaMotTab.length)];

// Puissance électrique absorbée par le moteur
let PelecMoteur = arrondi(PmotMin / etaMot, 0);

// --- Batterie ---
// Rendement onduleur/variateur
let etaOndTab = [0.95, 0.96, 0.97, 0.98];
let etaOnd    = etaOndTab[Math.floor(Math.random() * etaOndTab.length)];

// Puissance batterie
let Pbat = arrondi(PelecMoteur / etaOnd, 0);

// Rendement global chaîne
let etaGlobal = arrondi(Proues / Pbat * 100, 1);

// --- Autonomie ---
// Capacité batterie (kWh)
let CapTab = [20, 30, 40, 50, 60, 75];
let CapBat_kWh, CapBat;
if (vi === 2) { CapBat_kWh = 1.5; }
else if (vi === 3) { CapBat_kWh = 0.8; }
else { CapBat_kWh = CapTab[Math.floor(Math.random() * CapTab.length)]; }
CapBat = CapBat_kWh * 3600 * 1000; // Wh → J... on garde en Wh

// Consommation à Vmax (Wh/km)
let consommation_Whkm = arrondi(Pbat / Vmax * (1 / 3600) * 1000, 1); // Wh/km

// Autonomie à Vmax (km) — DON : on garde arrondi entier
let autonomie = arrondi(CapBat_kWh * 1000 / consommation_Whkm, 0);

// ============================================================
// CANVAS — Schéma chaîne d'énergie + bilan des forces
// ============================================================

// Couleurs palette
const COL = {
    bat   : "#1f3c88",
    ond   : "#2980b9",
    mot   : "#27ae60",
    trans : "#e67e22",
    roue  : "#c0392b",
    force : "#8e44ad",
    texte : "#2c3e50",
    gris  : "#95a5a6"
};

// --- Positions blocs (canvas 600 × 400) ---
const B = {
    bat   : { x: 15,  y: 60,  w: 70, h: 55 },
    ond   : { x: 110, y: 60,  w: 70, h: 55 },
    mot   : { x: 205, y: 60,  w: 70, h: 55 },
    trans : { x: 300, y: 60,  w: 70, h: 55 },
    roue  : { x: 395, y: 60,  w: 70, h: 55 },
    veh   : { x: 250, y: 150,  w: 95, h: 75 }
};

function dessinerBloc(ctx, b, couleur, lignes) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.w, b.h, 7);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px Arial";
    ctx.textAlign = "center";
    let cy = b.y + b.h / 2 - (lignes.length - 1) * 7;
    lignes.forEach((l, i) => ctx.fillText(l, b.x + b.w / 2, cy + i * 15));
}

function dessinerFleche(ctx, x1, y, x2, couleur) {
    ctx.strokeStyle = couleur;
    ctx.fillStyle   = couleur;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2 - 7, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y);
    ctx.lineTo(x2 - 10, y - 5);
    ctx.lineTo(x2 - 10, y + 5);
    ctx.closePath();
    ctx.fill();
}

function dessinerLabelPuissance(ctx, x, y, texte, couleur) {
    ctx.font      = "11px Arial";
    ctx.fillStyle = couleur;
    ctx.textAlign = "center";
    ctx.fillText(texte, x, y);
}

function dessinerVehicule(ctx, etape) {
    const canvas = ctx.canvas;
    // Carrosserie
    ctx.fillStyle = "#dce6f7";
    ctx.beginPath();
    ctx.roundRect(B.veh.x, B.veh.y + 20, B.veh.w, 35, 5);
    ctx.fill();
    ctx.strokeStyle = COL.texte;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Toit
    ctx.fillStyle = "#b8ccee";
    ctx.beginPath();
    ctx.roundRect(B.veh.x + 15, B.veh.y + 5, B.veh.w - 30, 22, 5);
    ctx.fill();
    ctx.stroke();
    // Roues
    [[B.veh.x + 18, B.veh.y + 55], [B.veh.x + B.veh.w - 18, B.veh.y + 55]].forEach(([cx, cy]) => {
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#aaa";
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
    // Étiquette vitesse
    ctx.font      = "10px Arial";
    ctx.fillStyle = COL.texte;
    ctx.textAlign = "center";
    ctx.fillText(`${Vmax_kmh} km/h`, B.veh.x + B.veh.w / 2, B.veh.y + 38);

    // Forces sur le véhicule (apparaissent progressivement)
    let xVeh = B.veh.x + B.veh.w / 2;
    let yVeh = B.veh.y + 35;
	
	if (etape >= 1) {
	ctx.strokeStyle = "black"; ctx.fillStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xVeh+50, yVeh); ctx.lineTo(xVeh +100, yVeh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xVeh+110,yVeh); ctx.lineTo(xVeh+100, yVeh - 5); ctx.lineTo(xVeh +100, yVeh+5); ctx.closePath(); ctx.fill();
    ctx.font = "10px Arial"; ctx.textAlign = "left";
    ctx.fillText(`V=${Vmax} m/s`, xVeh +110, yVeh-3);
	}

    // Force aéro (rouge, vers la gauche)
    if (etape >= 2) {
        ctx.strokeStyle = "#e74c3c"; ctx.fillStyle = "#e74c3c";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(xVeh - 10, yVeh - 5); ctx.lineTo(xVeh - 65, yVeh - 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(xVeh - 65, yVeh - 5); ctx.lineTo(xVeh - 55, yVeh - 10); ctx.lineTo(xVeh - 55, yVeh); ctx.closePath(); ctx.fill();
        ctx.font = "10px Arial"; ctx.textAlign = "right";
        ctx.fillText(`Faéro=${Faero} N`, xVeh - 68, yVeh - 8);
    }

    // Force roulement (orange, vers la gauche, en bas)
    if (etape >= 1) {
        ctx.strokeStyle = "#e67e22"; ctx.fillStyle = "#e67e22";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(xVeh - 10, yVeh + 8); ctx.lineTo(xVeh - 60, yVeh + 8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(xVeh - 60, yVeh + 8); ctx.lineTo(xVeh - 50, yVeh + 3); ctx.lineTo(xVeh - 50, yVeh + 13); ctx.closePath(); ctx.fill();
        ctx.font = "10px Arial"; ctx.textAlign = "right";
        ctx.fillText(`Froul=${Froul} N`, xVeh - 63, yVeh + 6);
    }

    // Force pente (violet, vers la gauche en bas)
    if (etape >= 3 && pente_pct > 0) {
        ctx.strokeStyle = "#8e44ad"; ctx.fillStyle = "#8e44ad";
        ctx.lineWidth = 2;
		ctx.beginPath(); ctx.moveTo(xVeh - 10, yVeh + 21); ctx.lineTo(xVeh - 60, yVeh + 21); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(xVeh - 60, yVeh + 21); ctx.lineTo(xVeh - 50, yVeh + 16); ctx.lineTo(xVeh - 50, yVeh + 26); ctx.closePath(); ctx.fill();
        ctx.font = "10px Arial"; ctx.textAlign = "right";
        ctx.fillText(`Fpente=${Fpente} N`, xVeh - 63, yVeh + 20);
		
		
		/*
        ctx.beginPath(); ctx.moveTo(xVeh, yVeh + 10); ctx.lineTo(xVeh - 20, yVeh + 38); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xVeh - 20, yVeh + 38);
        ctx.lineTo(xVeh - 10, yVeh + 28);
        ctx.lineTo(xVeh - 28, yVeh + 27);
        ctx.closePath(); ctx.fill();
        ctx.font = "10px Arial"; ctx.textAlign = "left";
        ctx.fillText(`Fpente=${Fpente} N`, xVeh - 15, yVeh + 50);*/
    }
}

function dessinerPente(ctx) {
    if (pente_pct === 0) return;
    ctx.strokeStyle = "#888";
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(380, 390);
    ctx.lineTo(590, 390);
    ctx.lineTo(590, arrondi(390 - 210 * pente_pct / 100, 0));
    ctx.stroke();
    ctx.font      = "11px Arial";
    ctx.fillStyle = "#555";
    ctx.textAlign = "left";
    ctx.fillText(`Pente : ${pente_pct} %`, 385, 385);
}

function tracerSchemaVehicule(canvasId, etape) {
    const canvas = document.getElementById(canvasId);
    const ctx    = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Titre
    ctx.font      = "14px Arial";
    ctx.fillStyle = COL.bat;
    ctx.textAlign = "center";
    ctx.fillText(`Chaîne d'énergie — ${VEH.nom} (${m} kg)`, canvas.width / 2, 22);

    // Blocs
    dessinerBloc(ctx, B.bat,   COL.bat,   ["Batterie", `${CapBat_kWh} kWh`]);
    dessinerBloc(ctx, B.ond,   COL.ond,   ["Onduleur", `η=${etaOnd}`]);
    dessinerBloc(ctx, B.mot,   COL.mot,   ["Moteur", "électrique"]);
    dessinerBloc(ctx, B.trans, COL.trans, ["Réduct.", `r=1/${rRed}`]);
    dessinerBloc(ctx, B.roue,  COL.roue,  ["Roues", `R=${Rroue} m`]);

    // Flèches entre blocs
    let yF = B.bat.y + B.bat.h / 2;
    dessinerFleche(ctx, B.bat.x + B.bat.w,   yF, B.ond.x,   COL.bat);
    dessinerFleche(ctx, B.ond.x + B.ond.w,   yF, B.mot.x,   COL.ond);
    dessinerFleche(ctx, B.mot.x + B.mot.w,   yF, B.trans.x, COL.mot);
    dessinerFleche(ctx, B.trans.x + B.trans.w, yF, B.roue.x, COL.trans);
    dessinerFleche(ctx, B.roue.x + B.roue.w,  yF, B.roue.x + B.roue.w+30,  COL.roue);

    // Véhicule et forces
    dessinerVehicule(ctx, etape);
    if (pente_pct > 0) dessinerPente(ctx);

    // Puissances sur les flèches (apparition progressive)
    let labelY = B.bat.y - 8;

    if (etape >= 7) dessinerLabelPuissance(ctx,
        (B.bat.x + B.bat.w + B.ond.x) / 2, labelY,
        `Pbat=${arrondi(Pbat/1000,2)} kW`, COL.bat);

    if (etape >= 6) dessinerLabelPuissance(ctx,
        (B.ond.x + B.ond.w + B.mot.x) / 2, labelY,
        `Pél=${arrondi(PelecMoteur/1000,2)} kW`, COL.ond);

    if (etape >= 5) dessinerLabelPuissance(ctx,
        (B.mot.x + B.mot.w + B.trans.x) / 2, labelY,
        `Pmot=${arrondi(PmotMin/1000,2)} kW`, COL.mot);

    if (etape >= 4) dessinerLabelPuissance(ctx,
        (B.trans.x + B.trans.w + B.roue.x) / 2, labelY,
        `Ptrans=${arrondi(Proues/1000,2)} kW`, COL.trans);

    // Pertes (flèches vers le bas en pointillé)
    if (etape >= 8) {
        let pertesData = [
            { bl: B.ond,   pertes: arrondi(PelecMoteur * (1 - etaOnd), 0),  label: "P_ond" },
            { bl: B.mot,   pertes: arrondi(PmotMin * (1 - etaMot) / etaMot, 0), label: "P_mot" },
            { bl: B.trans, pertes: arrondi(Proues * (1 - etaTrans) / etaTrans, 0), label: "P_frot" }
        ];
        pertesData.forEach(pd => {
            let xc = pd.bl.x + pd.bl.w / 2;
            let yb = pd.bl.y + pd.bl.h;
            ctx.strokeStyle = "#e74c3c";
            ctx.fillStyle   = "#e74c3c";
            ctx.lineWidth   = 1.5;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(xc, yb);
            ctx.lineTo(xc, yb + 28);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(xc, yb + 35); ctx.lineTo(xc - 5, yb + 25); ctx.lineTo(xc + 5, yb + 25);
            ctx.closePath(); ctx.fill();
            ctx.font = "9px Arial"; ctx.textAlign = "center";
            ctx.fillText(`${pd.label}`, xc, yb + 45);
            ctx.fillText(`${arrondi(pd.pertes/1000, 2)} kW`, xc, yb + 56);
        });
    }

    // Rendement global (dernière étape)
    if (etape >= 9) {
        ctx.font      = "12px Arial";
        ctx.fillStyle = "#155724";
        ctx.textAlign = "center";
        ctx.fillStyle = "#eafaf1";
        ctx.fillRect(15, 310, 570, 30);
        ctx.strokeStyle = "#27ae60";
        ctx.lineWidth = 1;
        ctx.strokeRect(15, 310, 570, 30);
        ctx.fillStyle = "#155724";
        ctx.fillText(
            `η_global = ${etaGlobal} %   |   Autonomie à ${Vmax_kmh} km/h ≈ ${autonomie} km   |   Consommation ≈ ${consommation_Whkm} Wh/km`,
            300, 330
        );
    }
}

// ============================================================
// EXERCICE
// ============================================================

let theme  = "41";
let nomExo = "exo4";

let exo = {

titre: `Dimensionnement du moteur d'un ${VEH.nom} ${VEH.symbole}`,

enonce: `On souhaite dimensionner le moteur électrique d'un <b>${VEH.nom}</b> de masse totale \\(m = ${m}~\\text{kg}\\)
(véhicule + occupants + charge).<br><br>

Le véhicule doit atteindre une vitesse maximale de \\(V_{max} = ${Vmax_kmh}~\\text{km/h}\\)
${pente_pct > 0 ? `sur une pente de <b>${pente_pct} %</b>` : "en terrain plat"}.<br><br>

<b>Chaîne d'énergie :</b> Batterie → Onduleur → Moteur électrique → Réducteur \\((r = 1/${rRed})\\) → Roues<br><br>

<b>Données :</b>
<ul>
  <li>Rayon des roues : \\(R = ${Rroue}~\\text{m}\\)</li>
  <li>Coefficient de frottement de roulement : \\(C_{rr} = ${Crr}\\)</li>
  <li>Coefficient de traînée aérodynamique : \\(C_x = ${VEH.Cx}\\) — Surface frontale : \\(S = ${VEH.S}~\\text{m}^2\\)</li>
  <li>Masse volumique de l'air : \\(\\rho = 1{,}20~\\text{kg/m}^3\\)</li>
  <li>Rendement réducteur + transmission : \\(\\eta_{trans} = ${etaTrans}\\)</li>
  <li>Rendement moteur électrique : \\(\\eta_{mot} = ${etaMot}\\)</li>
  <li>Rendement onduleur : \\(\\eta_{ond} = ${etaOnd}\\)</li>
  <li>Capacité batterie : \\(${CapBat_kWh}~\\text{kWh}\\)</li>
</ul>`,

courbe1: {},

questions: [

// ============================================================
// Q1 — Vitesse max en m/s
// ============================================================
{
texte: `Convertir la vitesse maximale en m/s : \\(V_{max} = ${Vmax_kmh}~\\text{km/h}\\).`,
reponse: Vmax,
unite: "m/s",
feedback: `\\(V_{max} = \\dfrac{${Vmax_kmh}}{3{,}6} = ${Vmax}~\\text{m/s}\\)<br>
La conversion km/h → m/s s'effectue en divisant par 3,6.`
},

// ============================================================
// Q2 — Force de frottement roulement
// ============================================================
{
texte: `Calculer la force de frottement de roulement \\(F_{roul}\\) (en N).<br>
<small>Rappel : \\(F_{roul} = C_{rr} \\times m \\times g \\times \\cos\\alpha\\)
— Pour une pente de ${pente_pct}% : \\(\\cos\\alpha \\approx ${arrondi(Math.cos(alpha),4)}\\)</small>`,
reponse: Froul,
unite: "N",
feedback: `\\(F_{roul} = ${Crr} \\times ${m} \\times 9{,}81 \\times ${arrondi(Math.cos(alpha),4)} = ${Froul}~\\text{N}\\)<br>
C'est la résistance au roulement des pneumatiques sur la chaussée.`,
action: function() { tracerSchemaVehicule("graph", 1); }
},

// ============================================================
// Q3 — Force aérodynamique
// ============================================================
{
texte: `Calculer la force de traînée aérodynamique \\(F_{aéro}\\) à \\(V_{max}\\) (en N).<br>
<small>Rappel : \\(F_{aéro} = \\dfrac{1}{2} \\rho \\, C_x \\, S \\, V^2\\)</small>`,
reponse: Faero,
unite: "N",
feedback: `\\(F_{aéro} = \\dfrac{1}{2} \\times 1{,}20 \\times ${VEH.Cx} \\times ${VEH.S} \\times ${Vmax}^2
= ${Faero}~\\text{N}\\)<br>
La traînée aérodynamique croît avec le <b>carré de la vitesse</b> : elle devient dominante à haute vitesse.`,
action: function() { tracerSchemaVehicule("graph", 2); }
},

// ============================================================
// Q4 — Force pente (si pente > 0, sinon on la saute logiquement)
// ============================================================
{
texte: pente_pct > 0
    ? `Calculer la composante de la pesanteur le long de la pente \\(F_{pente}\\) (en N).<br>
       <small>Rappel : \\(F_{pente} = m \\times g \\times \\sin\\alpha\\) — Pour ${pente_pct}% : \\(\\sin\\alpha \\approx ${arrondi(Math.sin(alpha),4)}\\)</small>`
    : `Le terrain est plat (pente = 0 %). Quelle est la valeur de \\(F_{pente}\\) ?`,
reponse: Fpente,
unite: "N",
feedback: pente_pct > 0
    ? `\\(F_{pente} = ${m} \\times 9{,}81 \\times ${arrondi(Math.sin(alpha),4)} = ${Fpente}~\\text{N}\\)<br>
       Sur une pente de ${pente_pct}%, le moteur doit vaincre en permanence la composante du poids le long de l'inclinaison.`
    : `\\(F_{pente} = 0~\\text{N}\\) — terrain horizontal, aucune composante gravitationnelle à vaincre.`,
action: function() { tracerSchemaVehicule("graph", 3); }
},

// ============================================================
// Q5 — Force totale résistante
// ============================================================
{
texte: `Calculer la force totale résistante \\(F_{tot}\\) à vaincre à \\(V_{max}\\) (en N).`,
reponse: Ftot,
unite: "N",
feedback: `\\(F_{tot} = ${Froul} + ${Faero} + ${Fpente} = ${Ftot}~\\text{N}\\)<br><br>
Répartition des efforts :
<ul>
<li>Frottement roulement : ${arrondi(Froul/Ftot*100,1)} %</li>
<li>Traînée aérodynamique : ${arrondi(Faero/Ftot*100,1)} %</li>
<li>Pente : ${arrondi(Fpente/Ftot*100,1)} %</li>
</ul>`
},

// ============================================================
// Q6 — Puissance aux roues
// ============================================================
{
texte: `Calculer la puissance mécanique nécessaire aux roues \\(P_{roues}\\) (en W).`,
reponse: Proues,
unite: "W",
feedback: `\\(P_{roues} = F_{tot} \\times V_{max} = ${Ftot} \\times ${Vmax} = ${Proues}~\\text{W}\\)<br>
C'est la puissance utile que la chaîne de transmission doit fournir aux roues.`,
action: function() { tracerSchemaVehicule("graph", 4); }
},

// ============================================================
// Q7 — Couple aux roues
// ============================================================
{
texte: `Calculer le couple résistant aux roues \\(C_{roues}\\) (en N·m).`,
reponse: Croues,
unite: "N·m",
feedback: `\\(C_{roues} = F_{tot} \\times R = ${Ftot} \\times ${Rroue} = ${Croues}~\\text{N·m}\\)`
},

// ============================================================
// Q8 — Vitesse angulaire des roues
// ============================================================
{
texte: `Calculer la vitesse angulaire des roues \\(\\Omega_{roues}\\) à \\(V_{max}\\) (en rad/s).<br>`,
reponse: omegaRoues,
unite: "rad/s",
feedback: `\\(\\Omega_{roues} = \\dfrac{V_{max}}{R} = \\dfrac{${Vmax}}{${Rroue}} = ${omegaRoues}~\\text{rad/s}\\)`
},

// ============================================================
// Q9 — Vitesse angulaire moteur
// ============================================================
{
texte: `En déduire la vitesse angulaire du moteur \\(\\Omega_{mot}\\) à \\(V_{max}\\) (en rad/s).`,
reponse: omegaMoteur,
unite: "rad/s",
feedback: `<small>Rappel : \\(\\Omega_{mot} = r_{red} \\times \\Omega_{roues}\\) avec \\(r_{red} = ${rRed}\\)</small> <br>
\\(\\Omega_{mot} = ${rRed} \\times ${omegaRoues} = ${omegaMoteur}~\\text{rad/s}\\)
soit \\(n_{mot} = \\dfrac{60 \\times ${omegaMoteur}}{2\\pi} = ${nMoteur}~\\text{tr/min}\\)<br>
Le réducteur démultiplie la vitesse : le moteur tourne ${rRed} fois plus vite que les roues.`
},

// ============================================================
// Q10 — Puissance minimale moteur
// ============================================================
{
texte: `Calculer la puissance minimale que doit développer le moteur \\(P_{mot}\\) (en W),
en tenant compte du rendement de la transmission.`,
reponse: PmotMin,
unite: "W",
feedback: `\\(P_{mot} = \\dfrac{${Proues}}{${etaTrans}} = ${PmotMin}~\\text{W} = ${arrondi(PmotMin/1000,2)}~\\text{kW}\\)<br>
Le moteur doit compenser les pertes dans le réducteur et la transmission.`,
action: function() { tracerSchemaVehicule("graph", 5); }
},

// ============================================================
// Q11 — Couple nominal moteur
// ============================================================
{
texte: `En déduire le couple nominal minimal du moteur \\(C_{mot}\\) (en N·m).`,
reponse: CmotMin,
unite: "N·m",
feedback: `\\(C_{mot} = \\dfrac{P_{mot}}{\\Omega_{mot}} = \\dfrac{${PmotMin}}{${omegaMoteur}} = ${CmotMin}~\\text{N·m}\\)<br>
Ce couple est bien inférieur au couple aux roues (${Croues} N·m) grâce à l'effet multiplicateur du réducteur.`
},

// ============================================================
// Q12 — Puissance électrique absorbée
// ============================================================
{
texte: `Calculer la puissance électrique absorbée par le moteur \\(P_{él}\\) (en W).`,
reponse: PelecMoteur,
unite: "W",
feedback: `\\(P_{él} = \\dfrac{P_{mot}}{\\eta_{mot}} = \\dfrac{${PmotMin}}{${etaMot}} = ${PelecMoteur}~\\text{W}\\)<br>
Les pertes dans le moteur (effet Joule dans les bobinages, pertes fer) justifient cet écart.`,
action: function() { tracerSchemaVehicule("graph", 6); }
},

// ============================================================
// Q13 — Puissance batterie
// ============================================================
{
texte: `Calculer la puissance que doit fournir la batterie \\(P_{bat}\\) (en W).`,
reponse: Pbat,
unite: "W",
feedback: `\\(P_{bat} = \\dfrac{P_{él}}{\\eta_{ond}} = \\dfrac{${PelecMoteur}}{${etaOnd}} = ${Pbat}~\\text{W}\\)<br>
L'onduleur (variateur de fréquence) convertit le courant continu de la batterie en courant alternatif triphasé pour le moteur.`,
action: function() { tracerSchemaVehicule("graph", 7); }
},

// ============================================================
// Q14 — Rendement global
// ============================================================
{
texte: `Calculer le rendement global de la chaîne de traction \\(\\eta_{global} \\) (en %).`,
reponse: etaGlobal,
unite: "%",
feedback: `\\(\\eta_{global} = \\dfrac{${Proues}}{${Pbat}} \\times 100 = ${etaGlobal}~\\%\\)<br><br>
Vérification par produit des rendements :<br>
\\(\\eta_{global} \\approx \\eta_{ond} \\times \\eta_{mot} \\times \\eta_{trans}
= ${etaOnd} \\times ${etaMot} \\times ${etaTrans}
= ${arrondi(etaOnd * etaMot * etaTrans * 100, 1)}~\\%\\)<br><br>
Un véhicule électrique atteint typiquement 80–90 % de rendement global, contre 25–35 % pour un thermique.`,
action: function() { tracerSchemaVehicule("graph", 8); }
},

// ============================================================
// Q15 — Consommation et autonomie
// ============================================================
{
texte: `Calculer la consommation énergétique à \\(V_{max}\\) (en Wh/km).`,
reponse: consommation_Whkm,
unite: "Wh/km",
feedback: `<small>\\(\\text{Conso} = \\dfrac{P_{bat}}{V_{max}} \\times \\dfrac{1}{3{,}6}\\)
(avec \\(V_{max}\\) en m/s → diviser par 3,6 pour obtenir des Wh/km)</small> <br>
\\(\\text{Conso} = \\dfrac{${Pbat}}{${Vmax}} \\times \\dfrac{1}{3{,}6} = ${consommation_Whkm}~\\text{Wh/km}\\)<br>
À titre de comparaison, une voiture électrique consomme typiquement 150–200 Wh/km en usage mixte.`
},

// ============================================================
// Q16 — Autonomie
// ============================================================
{
texte: `En déduire l'autonomie théorique du véhicule à \\(V_{max}\\) avec une batterie de \\(${CapBat_kWh}~\\text{kWh}\\) (en km).`,
reponse: autonomie,
unite: "km",
feedback: `<small>\\(\\text{Autonomie} = \\dfrac{\\text{Capacité (Wh)}}{\\text{Consommation (Wh/km)}}\\)</small> <br>
\\(\\text{Autonomie} = \\dfrac{${CapBat_kWh} \\times 1000}{${consommation_Whkm}} = ${autonomie}~\\text{km}\\)<br><br>
⚠️ Cette autonomie est calculée à vitesse constante maximale — en usage réel (accélérations, ralentissements, auxiliaires), l'autonomie effective est généralement 20 à 30 % inférieure.`,
action: function() { tracerSchemaVehicule("graph", 9); }
},

// ============================================================
// Q17 — Bilan et justification choix moteur électrique
// ============================================================
{
type: "texte",
texte: "Quel est le principal avantage du moteur électrique par rapport à un moteur thermique en termes de couple disponible au démarrage ?",
reponse: [
    "couple",
    "maximal",
    "dès",
    "démarrage",
    "immédiat",
    "nul",
    "arrêt",
    "plein couple",
    "instantané"
],
feedback: `Le moteur électrique fournit son <b>couple maximal dès le régime nul</b> (à l'arrêt), contrairement au moteur thermique qui nécessite d'atteindre une certaine plage de régime pour développer son couple maxi.<br><br>
Pour le ${VEH.nom}, cela signifie :<br>
<ul>
<li>Démarrage vif et progressif sans embrayage ni boîte de vitesses complexe</li>
<li>Récupération d'énergie au freinage (frein régénératif)</li>
<li>Rendement global de ${etaGlobal} % bien supérieur aux ~30 % d'un moteur thermique</li>
</ul>`
}

] // fin questions
}; // fin exo

// ============================================================
// LANCEMENT
// ============================================================

let nbquestion = exo.questions.length;

window.onload = function () {
    genererExercice(exo);
    tracerSchemaVehicule("graph", 0);
};