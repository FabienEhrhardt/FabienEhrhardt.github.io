// ============================================================
// PHILOSOPHIE PÉDAGOGIQUE
// Exercice niveau accessible (ZPE) :
//  - Nombres entiers ou simples (1 décimale max)
//  - Formule rappelée dans chaque question
//  - Une seule opération par question
//  - Progression linéaire sans saut conceptuel
//  - Contexte concret et visuel (treuil de chantier)
// ============================================================

// ============================================================
// PARAMÈTRES — tirés pour garantir des nombres "propres"
// ============================================================

// Masse de la charge (kg) — multiple de 50 pour calculs nets
let masseTab = [200, 300, 400, 500];
let m = masseTab[Math.floor(Math.random() * masseTab.length)];

// Hauteur à monter (m) — entier simple
let hTab = [4, 5, 6, 8, 10];
let h = hTab[Math.floor(Math.random() * hTab.length)];

// Vitesse de levage (m/s) — valeur simple
let vTab = [0.5, 0.75, 1.5, 2.0];
let v = vTab[Math.floor(Math.random() * vTab.length)];

// Rendement du treuil (mécanique + transmission)
// Choisi parmi des valeurs donnant un résultat entier ou à 1 décimale
let etaTab = [0.8, 0.75, 0.5];
let eta = etaTab[Math.floor(Math.random() * etaTab.length)];

// Constante g fixée à 10 pour simplifier les calculs élèves
let g = 10;

// ============================================================
// CALCULS — tous exacts avec g=10
// ============================================================

// Poids de la charge
let P_poids = m * g;                          // N  (entier)

// Puissance utile (mécanique, côté charge)
let P_utile = P_poids * v;                    // W  (entier ou x.5)

// Puissance absorbée (côté moteur)
let P_absorbee = arrondi(P_utile / eta, 0);   // W

// Énergie pour monter la charge jusqu'en haut
let W_utile = P_poids * h;                    // J  (entier)

// Temps pour monter la charge
let t_montee = arrondi(h / v, 1);             // s

// Énergie totale absorbée par le moteur
let W_total = arrondi(W_utile / eta, 0);      // J

// ============================================================
// CANVAS — Schéma du treuil qui s'anime
// ============================================================

// État du canvas : position actuelle de la charge (pixels)
let posCharge_y = 320;   // position initiale en bas
const posCharge_yHaut = 100;  // position en haut

function tracerTreuil(canvasId, etape) {
    const canvas = document.getElementById(canvasId);
    const ctx    = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width;   // 600
    const H = canvas.height;  // 400

    // ---- Sol ----
    ctx.fillStyle = "#c8a96e";
    ctx.fillRect(0, H - 50, W, 50);
    ctx.fillStyle = "#a07850";
    ctx.fillRect(0, H - 52, W, 4);

    // ---- Structure treuil (portique) ----
    ctx.strokeStyle = "#555";
    ctx.lineWidth   = 6;
    ctx.lineCap     = "round";
    // Montant gauche
    ctx.beginPath(); ctx.moveTo(120, H - 50); ctx.lineTo(120, 70); ctx.stroke();
    // Montant droit
    ctx.beginPath(); ctx.moveTo(280, H - 50); ctx.lineTo(280, 70); ctx.stroke();
    // Traverse horizontale
    ctx.beginPath(); ctx.moveTo(110, 70); ctx.lineTo(290, 70); ctx.stroke();
    // Diagonales de renfort
    ctx.lineWidth = 3; ctx.strokeStyle = "#777";
    ctx.beginPath(); ctx.moveTo(120, 200); ctx.lineTo(200, 70); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(280, 200); ctx.lineTo(200, 70); ctx.stroke();

    // ---- Tambour du treuil ----
    ctx.fillStyle = "#1f3c88";
    ctx.beginPath();
    ctx.arc(200, 75, 22, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth   = 2;
    ctx.stroke();
    // Rayons du tambour
    ctx.strokeStyle = "#aac";
    ctx.lineWidth   = 1.5;
    for (let a = 0; a < 6; a++) {
        let angle = (a * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(200, 75);
        ctx.lineTo(200 + 18 * Math.cos(angle), 75 + 18 * Math.sin(angle));
        ctx.stroke();
    }

    // ---- Moteur électrique ----
    ctx.fillStyle = "#27ae60";
    ctx.beginPath();
    ctx.roundRect(300, 55, 90, 40, 6);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font      = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Moteur", 345, 73);
    ctx.fillText("électrique", 345, 87);
    // Axe moteur → tambour
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth   = 3;
    ctx.beginPath(); ctx.moveTo(300, 75); ctx.lineTo(222, 75); ctx.stroke();

    // ---- Câble ----
    // Position de la charge selon étape
    let yCharge = etape >= 9
        ? posCharge_yHaut
        : Math.round(posCharge_y - (etape / 8) * (posCharge_y - posCharge_yHaut));

    ctx.strokeStyle = "#444";
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(200, 97);       // sortie tambour
    ctx.lineTo(200, yCharge);  // descend vers la charge
    ctx.stroke();

    // ---- Charge ----
    let wBox = 70, hBox = 50;
    let xBox = 200 - wBox / 2;
    let yBox = yCharge;
    // Ombre
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(xBox + 5, yBox + 5, wBox, hBox);
    // Boîte
    ctx.fillStyle = "#e67e22";
    ctx.beginPath();
    ctx.roundRect(xBox, yBox, wBox, hBox, 5);
    ctx.fill();
    ctx.strokeStyle = "#c0612a";
    ctx.lineWidth   = 1.5;
    ctx.stroke();
    // Texte masse
    ctx.fillStyle = "#fff";
    ctx.font      = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${m} kg`, 200, yBox + 21);
    // Crochet
    ctx.strokeStyle = "#555";
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(200, yCharge);
    ctx.lineTo(200, yCharge - 8);
    ctx.arc(200, yCharge - 13, 5, Math.PI / 2, 3 * Math.PI / 2);
    ctx.stroke();

    // ---- Cotes et annotations (apparition progressive) ----

    // Poids (flèche vers le bas)
    if (etape >= 1) {
        ctx.strokeStyle = "#e74c3c";
        ctx.fillStyle   = "#e74c3c";
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(290, yBox + 25);
        ctx.lineTo(290, yBox + 60);
        ctx.stroke();
        // pointe
        ctx.beginPath();
        ctx.moveTo(290, yBox + 65);
        ctx.lineTo(284, yBox + 52);
        ctx.lineTo(296, yBox + 52);
        ctx.closePath();
        ctx.fill();
        ctx.font      = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`P = ${P_poids} N`, 296, yBox + 52);
    }

    // Hauteur h (cote verticale)
    if (etape >= 2) {
        ctx.strokeStyle = "#1f3c88";
        ctx.fillStyle   = "#1f3c88";
        ctx.lineWidth   = 1.5;
        // ligne verticale côtée
        let xCote = 90;
        ctx.beginPath();
        ctx.moveTo(xCote, H - 50);
        //ctx.lineTo(xCote, posCharge_y + hBox / 2);
		ctx.lineTo(xCote, 100);
        ctx.stroke();
        // tirets horizontaux
        //ctx.beginPath(); ctx.moveTo(xCote - 6, H - 50); ctx.lineTo(xCote + 6, H - 50); ctx.stroke();
        //ctx.beginPath(); ctx.moveTo(xCote - 6, posCharge_y + hBox / 2); ctx.lineTo(xCote + 6, posCharge_y + hBox / 2); ctx.stroke();
        // flèche haut/bas
        ctx.beginPath();
        ctx.moveTo(xCote, H - 50); ctx.lineTo(xCote - 5, H - 60); ctx.lineTo(xCote + 5, H - 60); ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(xCote, 100);
        ctx.lineTo(xCote - 5, 110);
        ctx.lineTo(xCote + 5, 110);
        ctx.closePath(); ctx.fill();
        ctx.font      = "12px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`h = ${h} m`, xCote-5, (H + 50) / 2);
    }

    // Vitesse (flèche vers le haut sur le câble)
    if (etape >= 3) {
        ctx.strokeStyle = "#27ae60";
        ctx.fillStyle   = "#27ae60";
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(215, yBox - 10);
        ctx.lineTo(215, yBox - 40);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(215, yBox - 45);
        ctx.lineTo(209, yBox - 33);
        ctx.lineTo(221, yBox - 33);
        ctx.closePath(); ctx.fill();
        ctx.font      = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`v = ${v} m/s`, 220, yBox - 25);
    }

    // Puissance utile
    if (etape >= 4) {
        ctx.fillStyle = "#155724";
        ctx.font      = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`P_utile = ${P_utile} W`, 390, 130);
    }

    // Rendement + Puissance absorbée
    if (etape >= 6) {
        ctx.fillStyle = "#6c3483";
        ctx.font      = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`η = ${eta}  →  P_abs = ${P_absorbee} W`, 390, 150);
    }

    // Énergie
    if (etape >= 8) {
        ctx.fillStyle = "#1a5276";
        ctx.font      = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`W_utile = ${W_utile} J`, 390, 170);
        ctx.fillText(`W_total = ${W_total} J`, 390, 188);
    }

    // Titre
    ctx.font      = "14px Arial";
    ctx.fillStyle = "#1f3c88";
    ctx.textAlign = "center";
    ctx.fillText(`Treuil électrique de chantier — charge : ${m} kg`, W / 2, 35);
}

// ============================================================
// EXERCICE
// ============================================================

let theme  = "41";
let nomExo = "exo5";

let exo = {

titre: "Treuil électrique de chantier — bilan des forces et puissances",

enonce:
`Un treuil électrique est utilisé sur un chantier pour soulever une charge de \\(${m}~\\text{kg}\\)
à une hauteur de \\(h = ${h}~\\text{m}\\).<br><br>

La charge monte à vitesse constante \\(v = ${v}~\\text{m/s}\\).<br>
Le rendement global du treuil (mécanique + transmission) est \\(\\eta = ${eta}\\).<br><br>

<i>On prendra \\(g = 10~\\text{m/s}^2\\) pour simplifier les calculs.</i>`,

courbe1: {},   // active l'affichage du canvas

questions: [

// ============================================================
// Q1 — Poids de la charge
// ============================================================
{
texte:
    `Calculer le poids \\(P\\) de la charge (en N).`,
reponse: P_poids,
unite: "N",
feedback:
    `\\(P = m \\times g = ${m} \\times 10 = ${P_poids}~\\text{N}\\)<br><br>
    Le poids est la force exercée par la pesanteur sur la charge.
    C'est la force que le câble du treuil doit vaincre pour soulever la charge.`,
action: function () { tracerTreuil("graph", 1); }
},

// ============================================================
// Q2 — Identification de la hauteur sur le schéma
// ============================================================
{
texte:
    `La charge doit monter de \\(h = ${h}~\\text{m}\\).
    Quelle est la distance parcourue par la charge (en m) ?`,
reponse: h,
unite: "m",
feedback:
    `La distance parcourue est bien \\(d = h = ${h}~\\text{m}\\).<br><br>
    On repère cette distance sur le schéma par la cote verticale entre le sol et la position finale de la charge.`,
action: function () { tracerTreuil("graph", 2); }
},

// ============================================================
// Q3 — Vitesse de levage (conversion et sens physique)
// ============================================================
{
texte:
    `La charge monte à \\(v = ${v}~\\text{m/s}\\).
    Combien de secondes faut-il pour monter la charge jusqu'en haut ? (en s)`,
reponse: t_montee,
unite: "s",
feedback:
    `\\(t = \\dfrac{h}{v} = \\dfrac{${h}}{${v}} = ${t_montee}~\\text{s}\\)<br><br>
    La vitesse est constante : la charge monte régulièrement sans accélérer ni freiner.`,
action: function () { tracerTreuil("graph", 3); }
},

// ============================================================
// Q4 — Puissance utile
// ============================================================
{
texte:
    `Calculer la puissance utile \\(P_{utile}\\) fournie à la charge (en W).`,
reponse: P_utile,
unite: "W",
feedback:
    `<small>💡 Rappel : \\(P_{utile} = F \\times v\\) avec \\(F\\) = force à vaincre = poids \\(P\\)</small> <br>
	\\(P_{utile} = P \\times v = ${P_poids} \\times ${v} = ${P_utile}~\\text{W}\\)<br><br>
    C'est la puissance réellement utilisée pour lever la charge.
    On l'appelle puissance <b>utile</b> car elle fait un travail utile (monter la charge).`,
action: function () { tracerTreuil("graph", 4); }
},

// ============================================================
// Q5 — Sens du rendement (question de compréhension)
// ============================================================
{
type: "texte",
texte:
    `Le rendement du treuil est \\(\\eta = ${eta}\\).
    Cela signifie que le moteur doit fournir <b>plus</b> ou <b>moins</b> de puissance
    que la puissance utile ? Tapez <i>plus</i> ou <i>moins</i>.`,
reponse: ["plus"],
feedback:
    `Le moteur doit fournir <b>plus</b> de puissance que la puissance utile.<br><br>
    En effet, une partie de l'énergie est perdue en chaleur dans les engrenages,
    les frottements et les roulements du treuil.<br>
    Le rendement \\(\\eta = ${eta}\\) signifie que seulement
    \\(${eta * 100}~\\%\\) de la puissance fournie par le moteur est
    réellement utilisée pour lever la charge.`
},

// ============================================================
// Q6 — Puissance absorbée par le moteur
// ============================================================
{
texte:
    `Calculer la puissance absorbée par le moteur \\(P_{abs}\\) (en W).`,
reponse: P_absorbee,
unite: "W",
feedback:
    `<small>💡 Rappel : \\(\\eta = \\dfrac{P_{utile}}{P_{abs}}\\) </small><br>
	\\(P_{abs} = \\dfrac{P_{utile}}{\\eta} = \\dfrac{${P_utile}}{${eta}} = ${P_absorbee}~\\text{W}\\)<br><br>
    C'est la puissance que le moteur électrique doit consommer sur le réseau
    pour que la charge monte à \\(v = ${v}~\\text{m/s}\\).`,
action: function () { tracerTreuil("graph", 6); }
},

// ============================================================
// Q7 — Pertes dans le treuil
// ============================================================
{
texte:
    `Calculer les pertes dans le treuil \\(P_{pertes}\\) (en W).`,
reponse: arrondi(P_absorbee - P_utile, 0),
unite: "W",
feedback:
    `<small>💡 Rappel : \\(P_{pertes} = P_{abs} - P_{utile}\\)</small> <br>
	\\(P_{pertes} = ${P_absorbee} - ${P_utile} = ${arrondi(P_absorbee - P_utile, 0)}~\\text{W}\\)<br><br>
    Ces pertes se dissipent sous forme de <b>chaleur</b> dans les engrenages et les roulements.
    C'est pourquoi un treuil chauffe lors d'une utilisation prolongée.`
},

// ============================================================
// Q8 — Énergie utile
// ============================================================
{
texte:
    `Calculer l'énergie utile \\(W_{utile}\\) nécessaire pour monter la charge
    jusqu'à \\(h = ${h}~\\text{m}\\) (en J).<br>
    <small>💡 Rappel : \\(W = P \\times t\\) ou bien \\(W = F \\times d\\)</small>`,
reponse: W_utile,
unite: "J",
feedback:
    `\\(W_{utile} = P \\times h = ${P_poids} \\times ${h} = ${W_utile}~\\text{J}\\)<br><br>
    On pouvait aussi calculer : \\(W_{utile} = P_{utile} \\times t = ${P_utile} \\times ${t_montee} = ${W_utile}~\\text{J}\\)<br><br>
    Cette énergie est stockée sous forme d'<b>énergie potentielle de pesanteur</b>
    dans la charge soulevée.`,
action: function () { tracerTreuil("graph", 8); }
},

// ============================================================
// Q9 — Énergie totale absorbée
// ============================================================
{
texte:
    `Calculer l'énergie totale absorbée par le moteur \\(W_{total}\\) pour
    effectuer cette opération de levage (en J).`,
reponse: W_total,
unite: "J",
feedback:
    `<small>💡 Rappel : \\(W_{total} = P_{abs} \\times t\\)
    ou bien \\(W_{total} = \\dfrac{W_{utile}}{\\eta}\\)</small> <br>
	\\(W_{total} = \\dfrac{W_{utile}}{\\eta} = \\dfrac{${W_utile}}{${eta}} = ${W_total}~\\text{J}\\)<br><br>
    Vérification : \\(W_{total} = P_{abs} \\times t = ${P_absorbee} \\times ${t_montee} = ${arrondi(P_absorbee * t_montee, 0)}~\\text{J}\\) ✅<br><br>
    Sur ces \\(${W_total}~J\\) consommés, seulement \\(${W_utile}~J\\) sont utiles —
    les \\(${W_total - W_utile}~J\\) restants partent en chaleur.`,
action: function () { tracerTreuil("graph", 9); }
}

] // fin questions
}; // fin exo

// ============================================================
// LANCEMENT
// ============================================================

let nbquestion = exo.questions.length;

window.onload = function () {
    genererExercice(exo);
    tracerTreuil("graph", 0);
};