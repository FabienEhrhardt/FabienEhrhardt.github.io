// ============================================================
// PARAMÈTRES ALÉATOIRES
// ============================================================

// --- Contexte industriel (toujours ancré en électrotechnique) ---
let contextes = [
    {
        application : "tapis roulant de convoyage",
        charge      : "tapis roulant",
        lieu        : "ligne d'assemblage automobile",
        symbCharge  : "tapis"
    },
    {
        application : "pompe centrifuge industrielle",
        charge      : "pompe centrifuge",
        lieu        : "station de pompage",
        symbCharge  : "pompe"
    },
    {
        application : "treuil de levage industriel",
        charge      : "tambour de levage",
        lieu        : "pont roulant d'atelier",
        symbCharge  : "tambour"
    },
    {
        application : "compresseur d'air",
        charge      : "compresseur",
        lieu        : "atelier de production",
        symbCharge  : "compresseur"
    }
];
let ci = Math.floor(Math.random() * contextes.length);
let C  = contextes[ci];

// --- Moteur asynchrone triphasé ---
// Vitesse de synchronisme choisie parmi des valeurs standard (50 Hz)
let nsTAB = [1500, 3000, 1000];
let ns     = nsTAB[Math.floor(Math.random() * nsTAB.length)];

// Glissement nominal (%)
let gTAB = [3, 4, 5];
let g_pct = gTAB[Math.floor(Math.random() * gTAB.length)];
let g     = g_pct / 100;

// Vitesse nominale moteur (tr/min)
let nMoteur = arrondi(ns * (1 - g), 0);

// Couple nominal moteur (N·m)
let CnTAB = [20, 30, 40, 50, 60];
let Cn     = CnTAB[Math.floor(Math.random() * CnTAB.length)];

// Puissance mécanique nominale moteur (W)
let omegaMoteur = arrondi(nMoteur * Math.PI / 30, 2);   // rad/s
let PmecMoteur  = arrondi(Cn * omegaMoteur, 0);         // W

// --- Réducteur ---
// Rapport de réduction r = n_sortie / n_entrée  (< 1 : réduction)
let rTAB = [0.25, 0.2, 0.1, 0.5, 1/3];
let rIdx = Math.floor(Math.random() * rTAB.length);
let r    = rTAB[rIdx];
// Affichage fraction propre
let rFracTab = ["1/4", "1/5", "1/10", "1/2", "1/3"];
let rFrac    = rFracTab[rIdx];

// Rendement réducteur
let etaRedTAB = [0.90, 0.92, 0.95, 0.97];
let etaRed    = etaRedTAB[Math.floor(Math.random() * etaRedTAB.length)];

// Vitesse en sortie réducteur = vitesse charge (tr/min)
let nCharge  = arrondi(nMoteur * r, 1);
// Vitesse angulaire charge
let omegaCharge = arrondi(nCharge * Math.PI / 30, 2);

// Couple en sortie réducteur (N·m) — tient compte du rendement
let CCharge = arrondi(Cn / r * etaRed, 1);

// Puissance transmise à la charge (W)
let PCharge = arrondi(PmecMoteur * etaRed, 0);

// Pertes dans le réducteur (W)
let Pertes = arrondi(PmecMoteur - PCharge, 0);

// --- Variateur de fréquence ---
// Rendement variateur
let etaVarTAB = [0.95, 0.96, 0.97, 0.98];
let etaVar    = etaVarTAB[Math.floor(Math.random() * etaVarTAB.length)];

// Puissance électrique absorbée par le moteur (hypothèse rendement moteur)
let etaMotTAB = [0.88, 0.90, 0.92, 0.94];
let etaMot    = etaMotTAB[Math.floor(Math.random() * etaMotTAB.length)];

// Puissance absorbée côté réseau (entrée variateur)
let PReseau = arrondi(PmecMoteur / (etaMot * etaVar), 0);

// Puissance absorbée par le moteur (sortie variateur)
let PMotElec = arrondi(PmecMoteur / etaMot, 0);

// Rendement global de la chaîne
let etaGlobal = arrondi(PCharge / PReseau * 100, 1);

// --- Fréquence de rotation réduite (variateur) ---
// On veut faire tourner la charge à une vitesse réduite
let facteurVitesse_pct = [50, 60, 70, 80];
let fv_pct = facteurVitesse_pct[Math.floor(Math.random() * facteurVitesse_pct.length)];
let nMoteurReduit  = arrondi(nMoteur * fv_pct / 100, 0);
let nChargeReduit  = arrondi(nCharge  * fv_pct / 100, 1);
// En régime à couple constant, P ∝ n  → P réduite ∝ fv
// En loi U/f, le couple reste constant → Pmec réduite = Cn × ω_réduite
let omegaMotReduit = arrondi(nMoteurReduit * Math.PI / 30, 2);
let PmecReduit     = arrondi(Cn * omegaMotReduit, 0);
let fReduit        = arrondi(ns / 60 * (1 - g) * fv_pct / 100 / (ns / 60), 2); // Hz
// Fréquence statorique pour obtenir nMoteurReduit
let fStato = arrondi(50 * fv_pct / 100, 1);

// ============================================================
// CANVAS — Schéma de la chaîne de transmission
// ============================================================

// Positions des blocs (fixes, canvas 600×400)
const BLK = {
    reseau : { x: 20,  y: 160, w: 60,  h: 60  },
    vari   : { x: 110, y: 145, w: 80,  h: 90  },
    moteur : { x: 240, y: 150, w: 90,  h: 80  },
    reduc  : { x: 385, y: 155, w: 80,  h: 70  },
    charge : { x: 510, y: 160, w: 70,  h: 60  }
};

function bloc(ctx, b, couleur, textes) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.w, b.h, 8);
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    let cy = b.y + b.h / 2 - (textes.length - 1) * 8;
    textes.forEach((t, i) => {
        ctx.fillText(t, b.x + b.w / 2, cy + i * 17);
    });
}

function fleche(ctx, x1, y, x2, label, couleur, labelY) {
    ctx.strokeStyle = couleur;
    ctx.fillStyle   = couleur;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2 - 8, y);
    ctx.stroke();
    // pointe
    ctx.beginPath();
    ctx.moveTo(x2, y);
    ctx.lineTo(x2 - 12, y - 6);
    ctx.lineTo(x2 - 12, y + 6);
    ctx.closePath();
    ctx.fill();
    // label
    if (label) {
        ctx.font = "11px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = couleur;
        ctx.fillText(label, (x1 + x2) / 2, labelY || y - 8);
    }
}

function axeRotatif(ctx, x, y, label, couleur) {
    // Représente un arbre mécanique (double trait horizontal)
    ctx.strokeStyle = couleur;
    ctx.lineWidth   = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 40, y);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 40, y);
    ctx.stroke();
    if (label) {
        ctx.font      = "11px Arial";
        ctx.fillStyle = couleur;
        ctx.textAlign = "center";
        ctx.fillText(label, x + 20, y - 8);
    }
}

function tracerSchemaChaineComplete(canvasId, etape) {
    const canvas = document.getElementById(canvasId);
    const ctx    = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Titre ---
    ctx.font      = "15px Arial";
    ctx.fillStyle = "#1f3c88";
    ctx.textAlign = "center";
    ctx.fillText("Chaîne de transmission — " + C.application, canvas.width / 2, 28);

    // --- Réseau ---
    bloc(ctx, BLK.reseau, "#2c3e50", ["Réseau", "400V/50Hz"]);

    // --- Variateur ---
    bloc(ctx, BLK.vari, "#1f3c88", ["Variateur", "de", "fréquence"]);

    // --- Moteur ---
    bloc(ctx, BLK.moteur, "#27ae60", ["Moteur", "MAS", `${arrondi(PmecMoteur/1000, 2)} kW`]);

    // --- Réducteur ---
    bloc(ctx, BLK.reduc, "#e67e22", ["Réducteur", `r = ${rFrac}`, `η = ${etaRed}`]);

    // --- Charge ---
    bloc(ctx, BLK.charge, "#c0392b", [C.symbCharge]);

    // --- Flèche réseau → variateur (puissance électrique réseau) ---
    fleche(ctx,
        BLK.reseau.x + BLK.reseau.w, BLK.reseau.y + BLK.reseau.h / 2,
        BLK.vari.x,                   BLK.vari.y   + BLK.vari.h   / 2,
        etape >= 1 ? `P_réseau = ${arrondi(PReseau/1000,2)} kW` : "P_réseau = ?",
        "#2c3e50", 150
    );

    // --- Flèche variateur → moteur (puissance électrique moteur) ---
    fleche(ctx,
        BLK.vari.x   + BLK.vari.w,   BLK.vari.y   + BLK.vari.h   / 2,
        BLK.moteur.x,                 BLK.moteur.y + BLK.moteur.h / 2,
        etape >= 2 ? `P_él = ${arrondi(PMotElec/1000,2)} kW` : "P_él = ?",
        "#1f3c88", 140
    );

    // --- Arbre moteur → réducteur ---
    let xArbre1 = BLK.moteur.x + BLK.moteur.w;
    let yArbre  = BLK.moteur.y + BLK.moteur.h / 2;
    fleche(ctx,
        xArbre1, yArbre,
        BLK.reduc.x, yArbre,
        etape >= 3 ? `${nMoteur} tr/min — ${arrondi(PmecMoteur/1000,2)} kW` : "n_m = ?",
        "#27ae60", 145
    );

    // --- Arbre réducteur → charge ---
    let xArbre2 = BLK.reduc.x + BLK.reduc.w;
    fleche(ctx,
        xArbre2, yArbre,
        BLK.charge.x, yArbre,
        etape >= 4 ? `${nCharge} tr/min — ${arrondi(PCharge/1000,2)} kW` : "n_ch = ?",
        "#e67e22", 145
    );

    // --- Pertes réducteur (flèche vers le bas) ---
    if (etape >= 4) {
        let xMidR = BLK.reduc.x + BLK.reduc.w / 2;
        let yBot  = BLK.reduc.y + BLK.reduc.h;
        ctx.strokeStyle = "#c0392b";
        ctx.fillStyle   = "#c0392b";
        ctx.lineWidth   = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(xMidR, yBot);
        ctx.lineTo(xMidR, yBot + 40);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(xMidR, yBot + 48);
        ctx.lineTo(xMidR - 6, yBot + 36);
        ctx.lineTo(xMidR + 6, yBot + 36);
        ctx.closePath();
        ctx.fill();
        ctx.font      = "11px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`P_pertes = ${arrondi(Pertes/1000,2)} kW`, xMidR, yBot + 62);
    }

    // --- Légende rendements ---
    if (etape >= 5) {
        ctx.font      = "11px Arial";
        ctx.fillStyle = "#555";
        ctx.textAlign = "left";
        ctx.fillText(`η_variateur = ${etaVar}`, 10, 360);
        ctx.fillText(`η_moteur = ${etaMot}`, 10, 378);
        ctx.fillText(`η_réducteur = ${etaRed}`, 160, 360);
        ctx.fillText(`η_global = ${etaGlobal} %`, 160, 378);
    }
}

// ============================================================
// EXERCICE
// ============================================================

let theme  = "41";
let nomExo = "exo3";

let exo = {

titre: `Entraînement par variateur de fréquence — ${C.application}`,

enonce: `Un variateur de fréquence entraîne un moteur asynchrone triphasé qui actionne un <b>${C.application}</b> via un réducteur mécanique, dans un ${C.lieu}.<br><br>

<b>Données du moteur asynchrone triphasé :</b>
<ul>
  <li>Vitesse de synchronisme : \\(n_s = ${ns}~\\text{tr/min}\\)</li>
  <li>Glissement nominal : \\(g = ${g_pct}~\\%\\)</li>
  <li>Couple nominal : \\(C_n = ${Cn}~\\text{N·m}\\)</li>
  <li>Rendement nominal : \\(\\eta_{mot} = ${etaMot}\\)</li>
</ul>

<b>Données du réducteur :</b>
<ul>
  <li>Rapport de réduction : \\(r = \\dfrac{n_{sortie}}{n_{entrée}} = ${rFrac}\\)</li>
  <li>Rendement : \\(\\eta_{red} = ${etaRed}\\)</li>
</ul>

<b>Données du variateur de fréquence :</b>
<ul>
  <li>Rendement : \\(\\eta_{var} = ${etaVar}\\)</li>
</ul>

Le schéma de la chaîne de transmission s'affiche dans le graphe ci-dessous et se complète au fil des questions.`,

courbe1: {},   // déclenchement de l'affichage du canvas

questions: [

// ============================================================
// Q1 — Vitesse nominale moteur
// ============================================================
{
texte: `Calculer la vitesse de rotation nominale du moteur \\(n_{moteur}\\) (en tr/min).`,
reponse: nMoteur,
unite: "tr/min",
feedback: `\\(g=\\frac{n_s-n}{n_s}\\) <br>
\\(n_{moteur} = n_s \\times (1 - g) = ${ns} \\times (1 - ${g}) = ${nMoteur}~\\text{tr/min}\\)<br>
Le glissement traduit l'écart entre la vitesse de synchronisme (champ tournant) et la vitesse réelle du rotor.`
},

// ============================================================
// Q2 — Vitesse angulaire moteur
// ============================================================
{
texte: `Convertir cette vitesse en vitesse angulaire \\(\\Omega_{moteur}\\) (en rad/s).`,
reponse: omegaMoteur,
unite: "rad/s",
feedback: `\\(\\Omega_{moteur} = \\dfrac{2\\pi \\times ${nMoteur}}{60} = ${omegaMoteur}~\\text{rad/s}\\)`
},

// ============================================================
// Q3 — Puissance mécanique moteur
// ============================================================
{
texte: `Calculer la puissance mécanique développée par le moteur \\(P_{mec}\\) (en W).`,
reponse: PmecMoteur,
unite: "W",
feedback: `\\(P_{mec} = C_n \\times \\Omega_{moteur} = ${Cn} \\times ${omegaMoteur} = ${PmecMoteur}~\\text{W}\\)<br>
C'est la puissance disponible sur l'arbre moteur, avant le réducteur.`,
action: function() {
    tracerSchemaChaineComplete("graph", 3);
}
},

// ============================================================
// Q4 — Vitesse de rotation de la charge
// ============================================================
{
texte: `Calculer la vitesse de rotation de la charge \\(n_{charge}\\) en sortie du réducteur (en tr/min).<br>
<small>Rappel : \\(n_{sortie} = r \\times n_{entrée}\\)</small>`,
reponse: nCharge,
unite: "tr/min",
feedback: `\\(n_{charge} = r \\times n_{moteur} = ${rFrac} \\times ${nMoteur} = ${nCharge}~\\text{tr/min}\\)<br>
Le réducteur diminue la vitesse et augmente le couple en proportion (corrigé du rendement).`
},

// ============================================================
// Q5 — Couple en sortie réducteur
// ============================================================
{
texte: `Calculer le couple transmis à la charge \\(C_{charge}\\) en sortie du réducteur (en N·m).<br>
<small>Rappel : \\(C_{sortie} = \\dfrac{C_{entrée}}{r} \\times \\eta_{red}\\)</small>`,
reponse: CCharge,
unite: "N·m",
feedback: `\\(C_{charge} = \\dfrac{${Cn}}{${rFrac}} \\times ${etaRed} = ${arrondi(Cn / r, 1)} \\times ${etaRed} = ${CCharge}~\\text{N·m}\\)<br>
L'effet réducteur multiplie le couple par \\(1/r\\), mais les pertes mécaniques (frottements) réduisent ce gain d'un facteur \\(\\eta_{red}\\).`
},

// ============================================================
// Q6 — Puissance utile charge
// ============================================================
{
texte: `Calculer la puissance mécanique utile transmise à la charge \\(P_{charge}\\) (en W).<br>
<small>Rappel : \\(P_{sortie} = P_{entrée} \\times \\eta_{red}\\)</small>`,
reponse: PCharge,
unite: "W",
feedback: `\\(P_{charge} = P_{mec} \\times \\eta_{red} = ${PmecMoteur} \\times ${etaRed} = ${PCharge}~\\text{W}\\)`,
action: function() {
    tracerSchemaChaineComplete("graph", 4);
}
},

// ============================================================
// Q7 — Pertes dans le réducteur
// ============================================================
{
texte: `Calculer les pertes mécaniques \\(P_{pertes}\\) dans le réducteur (en W).`,
reponse: Pertes,
unite: "W",
feedback: `\\(P_{pertes} = P_{mec} - P_{charge} = ${PmecMoteur} - ${PCharge} = ${Pertes}~\\text{W}\\)<br>
Ces pertes sont dissipées sous forme de chaleur dans le réducteur (frottements, lubrification).`
},

// ============================================================
// Q8 — Puissance électrique absorbée par le moteur
// ============================================================
{
texte: `Calculer la puissance électrique absorbée par le moteur \\(P_{él}\\) (en W).`,
reponse: PMotElec,
unite: "W",
feedback: `\\(P_{él} = \\dfrac{P_{mec}}{\\eta_{mot}} = \\dfrac{${PmecMoteur}}{${etaMot}} = ${PMotElec}~\\text{W}\\)<br>
C'est la puissance que le variateur doit fournir en sortie pour que le moteur développe \\(${PmecMoteur}~W\\) mécaniques.`,
action: function() {
    tracerSchemaChaineComplete("graph", 2);
}
},

// ============================================================
// Q9 — Puissance réseau (entrée variateur)
// ============================================================
{
texte: `Calculer la puissance active absorbée sur le réseau électrique \\(P_{réseau}\\) (en W).`,
reponse: PReseau,
unite: "W",
feedback: `\\(P_{réseau} = \\dfrac{P_{él}}{\\eta_{var}} = \\dfrac{${PMotElec}}{${etaVar}} = ${PReseau}~\\text{W}\\)<br>
C'est la puissance consommée sur le réseau triphasé 400 V / 50 Hz.`,
action: function() {
    tracerSchemaChaineComplete("graph", 1);
}
},

// ============================================================
// Q10 — Rendement global
// ============================================================
{
texte: `Calculer le rendement global de la chaîne \\(\\eta_{global}\\) (en %).`,
reponse: etaGlobal,
unite: "%",
feedback: `\\(\\eta_{global} = \\dfrac{${PCharge}}{${PReseau}} \\times 100 = ${etaGlobal}~\\%\\)<br><br>
On retrouve bien : \\(\\eta_{global} \\approx \\eta_{var} \\times \\eta_{mot} \\times \\eta_{red} = ${etaVar} \\times ${etaMot} \\times ${etaRed} = ${arrondi(etaVar*etaMot*etaRed*100,1)}~\\%\\)`,
action: function() {
    tracerSchemaChaineComplete("graph", 5);
}
},

// ============================================================
// Q11 — Fréquence statorique réduite (variateur)
// ============================================================
{
texte: `Le variateur est réglé pour faire tourner la charge à <b>${fv_pct}%</b> de sa vitesse nominale.<br>
Quelle sera alors la vitesse du moteur?`,
reponse: nMoteurReduit,
unite: "tr/min",
feedback: `La vitesse moteur devient : \\(n = ${nMoteur} \\times ${fv_pct/100} = ${nMoteurReduit}~\\text{tr/min}\\)<br>
La vitesse de la charge devient : \\(n_{charge} = ${nCharge} \\times ${fv_pct/100} = ${nChargeReduit}~\\text{tr/min}\\)<br><br>
C'est tout l'intérêt du variateur de fréquence : adapter la vitesse de la machine sans pertes par rhéostat !`
},

// ============================================================
// Q12 — Puissance à vitesse réduite
// ============================================================
{
texte: `À cette vitesse réduite (${fv_pct}% de la vitesse nominale), et en supposant le couple résistant constant, calculer la nouvelle puissance mécanique développée par le moteur \\(P'_{mec}\\) (en W).`,
reponse: PmecReduit,
unite: "W",
feedback: `\\(\\Omega'_{moteur} = \\dfrac{2\\pi \\times ${nMoteurReduit}}{60} = ${omegaMotReduit}~\\text{rad/s}\\)<br>
\\(P'_{mec} = C_n \\times \\Omega'_{moteur} = ${Cn} \\times ${omegaMotReduit} = ${PmecReduit}~\\text{W}\\)<br><br>
La puissance est réduite dans le même rapport que la vitesse : à couple constant, diviser la vitesse par ${100/fv_pct} divise la puissance par ${100/fv_pct}.<br>
C'est l'un des grands avantages du variateur : <b>économies d'énergie significatives à charge partielle</b>.`
},

// ============================================================
// Q13 — Question ouverte
// ============================================================
{
type: "texte",
texte: "Quel est le principal avantage du variateur de fréquence par rapport à un démarrage direct ou étoile-triangle pour ce type d'application ?",
reponse: [
    "économie",
    "énergie",
    "vitesse",
    "couple",
    "doux",
    "progressif",
    "courant",
    "pointe"
],
feedback: `Le variateur de fréquence offre plusieurs avantages :<br>
<ul>
<li>Démarrage progressif (limitation du courant de démarrage, pas de pointe à 5–7 I_n)</li>
<li>Réglage continu de la vitesse sans pertes par rhéostat</li>
<li>Économies d'énergie importantes à charge partielle (P ∝ n à couple constant)</li>
<li>Protection du moteur et de la mécanique (surcharges, calages)</li>
</ul>
Pour un ${C.application}, la variation de vitesse est souvent indispensable au process industriel.`
}

] // fin questions

}; // fin exo

// ============================================================
// LANCEMENT
// ============================================================

let nbquestion = exo.questions.length;

window.onload = function() {
    genererExercice(exo);
    tracerSchemaChaineComplete("graph", 0);
};
