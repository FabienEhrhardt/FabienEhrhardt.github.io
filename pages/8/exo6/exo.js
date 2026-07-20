// =====================================================================
// EXERCICE : Schéma-bloc d'un système asservi (Comparateur/Correcteur
// regroupés dans le Régulateur, Actionneur, Processus, Capteur, Perturbation)
// ⚠️ Comme exo_chaine.js, cet exercice bypass genererExercice() : interaction
// non-standard (drag & drop Canvas). Respecte #titre, #enonce, #graph, #questions.
// =====================================================================

let theme = "8";
let nomExo = "exo6";
let nbquestion = 17; // 6 (phase1) + 7 (phase2) + 4 (phase3)

// =====================================================================
// CONTEXTES RANDOMISÉS (vocabulaire métier, structure du schéma identique)
// =====================================================================
const contextesSchema = [
	{
		nom: "Asservissement de vitesse d'un moteur à courant continu",
		xc: "consigne de vitesse (tr/min)",
		greglante: "tension d'induit du moteur",
		perturbation: "couple résistant appliqué à l'arbre (charge)",
		sortie: "vitesse réelle du moteur",
		mesure: "tension image de la vitesse (sortie génératrice tachymétrique)",
		actionneurTxt: "Variateur électronique",
		capteurTxt: "Génératrice tachymétrique / codeur",
		processusTxt: "Moteur CC + charge"
	},
	{
		nom: "Asservissement de température d'un four industriel",
		xc: "consigne de température (°C)",
		greglante: "puissance électrique des résistances chauffantes",
		perturbation: "ouverture de porte / charge froide enfournée",
		sortie: "température réelle à l'intérieur du four",
		mesure: "tension image de la température (sortie sonde)",
		actionneurTxt: "Gradateur de puissance",
		capteurTxt: "Sonde PT100 / thermocouple",
		processusTxt: "Four + charge à chauffer"
	},
	{
		nom: "Asservissement de niveau d'une cuve",
		xc: "consigne de niveau (m)",
		greglante: "débit d'alimentation de la cuve",
		perturbation: "débit de soutirage (consommation en sortie)",
		sortie: "niveau réel du liquide dans la cuve",
		mesure: "tension image du niveau (sortie capteur)",
		actionneurTxt: "Vanne motorisée",
		capteurTxt: "Capteur de niveau à ultrasons",
		processusTxt: "Cuve de stockage"
	},
	{
		nom: "Asservissement de position d'un axe robotisé",
		xc: "consigne de position angulaire",
		greglante: "couple moteur",
		perturbation: "frottements et efforts résistants sur l'axe",
		sortie: "position réelle de l'axe",
		mesure: "signal de position mesurée (sortie codeur)",
		actionneurTxt: "Servomoteur + réducteur",
		capteurTxt: "Codeur incrémental",
		processusTxt: "Axe mécanique + charge entraînée"
	}
];

let ctxSchema = contextesSchema[Math.floor(Math.random() * contextesSchema.length)];

// =====================================================================
// GÉOMÉTRIE DU SCHÉMA-BLOC (canvas 600x400, cf index.html)
// =====================================================================
const boxes = {
	comparateur: { x: 60, y: 65, w: 70, h: 50, texte: "Comparateur" },
	correcteur:  { x: 170, y: 65, w: 70, h: 50, texte: "Correcteur" },
	preactionneur:  { x: 280, y: 65, w: 80, h: 50, texte: "Préactionneur" },
	actionneur:   { x: 400, y: 65, w: 90, h: 50, texte: "Actionneur" },
	capteur:     { x: 400, y: 260, w: 90, h: 40, texte: "Capteur" }
};

const regulateurRect = { x: 45, y: 32, w: 195, h: 98 }; // englobe comparateur + correcteur
const regulateurLabelSlot = { x: 45, y: 13, w: 195, h: 16, id: "regulateur" };

const feedbackY = 280;
const outputTipX = 580;

// =====================================================================
// SLOTS — PHASE 1 (identification des blocs)
// =====================================================================
function slotsPhase1() {
	return [
		{ id: "comparateur", x: boxes.comparateur.x, y: boxes.comparateur.y, w: boxes.comparateur.w, h: boxes.comparateur.h },
		{ id: "correcteur",  x: boxes.correcteur.x,  y: boxes.correcteur.y,  w: boxes.correcteur.w,  h: boxes.correcteur.h },
		{ id: "regulateur",  x: regulateurLabelSlot.x, y: regulateurLabelSlot.y, w: regulateurLabelSlot.w, h: regulateurLabelSlot.h },
		{ id: "preactionneur",  x: boxes.preactionneur.x,  y: boxes.preactionneur.y,  w: boxes.preactionneur.w,  h: boxes.preactionneur.h },
		{ id: "actionneur",   x: boxes.actionneur.x,   y: boxes.actionneur.y,   w: boxes.actionneur.w,   h: boxes.actionneur.h },
		{ id: "capteur",     x: boxes.capteur.x,     y: boxes.capteur.y,     w: boxes.capteur.w,     h: boxes.capteur.h }
	];
}

const chipsPhase1 = [
	{ id: "comparateur", label: "Comparateur" },
	{ id: "correcteur", label: "Correcteur" },
	{ id: "regulateur", label: "Régulateur" },
	{ id: "preactionneur", label: "Préactionneur" },
	{ id: "actionneur", label: "Actionneur" },
	{ id: "capteur", label: "Capteur" }
];

// =====================================================================
// SLOTS — PHASE 2 (identification des grandeurs sur les flèches)
// =====================================================================
function slotsPhase2() {
	return [
		{ id: "xc", x: 8, y: 70, w: 42, h: 16 },
		{ id: "epsilon", x: 133, y: 70, w: 34, h: 16 },
		{ id: "u", x: 244, y: 70, w: 32, h: 16 },
		{ id: "gr", x: 360, y: 70, w: 38, h: 16 },
		{ id: "perturbation", x: 452, y: 6, w: 40, h: 14 },
		{ id: "s", x: 562, y: 70, w: 30, h: 16 },
		{ id: "sm", x: 195, y: 260, w: 40, h: 16 }
	];
}

function chipsPhase2() {
	return [
		{ id: "xc", label: "Xc" },
		{ id: "epsilon", label: "ε" },
		{ id: "u", label: "U" },
		{ id: "gr", label: "Gr" },
		{ id: "perturbation", label: "P" },
		{ id: "s", label: "S" },
		{ id: "sm", label: "Sm" }
	];
}

// =====================================================================
// ÉTAT GLOBAL DE L'EXERCICE
// =====================================================================
let phase = 1;
let slots = [];
let doneSlots = []; // blocs/grandeurs déjà validés lors des phases précédentes (restent affichés)
let tray = [];
let dragChip = null;
let dragOffsetX = 0, dragOffsetY = 0;
let flashSlotId = null;

const canvas = () => document.getElementById("graph");
const ctx2d = () => canvas().getContext("2d");

// =====================================================================
// DESSIN
// =====================================================================
function drawLine(c, x1, y1, x2, y2, color = "#333", dashed = false) {
	c.strokeStyle = color;
	c.lineWidth = 2;
	c.setLineDash(dashed ? [5, 4] : []);
	c.beginPath();
	c.moveTo(x1, y1);
	c.lineTo(x2, y2);
	c.stroke();
	c.setLineDash([]);
}

function drawArrow(c, x1, y1, x2, y2, color = "#333") {
	drawLine(c, x1, y1, x2, y2, color);
	let angle = Math.atan2(y2 - y1, x2 - x1);
	let taille = 8;
	c.fillStyle = color;
	c.beginPath();
	c.moveTo(x2, y2);
	c.lineTo(x2 - taille * Math.cos(angle - Math.PI / 6), y2 - taille * Math.sin(angle - Math.PI / 6));
	c.lineTo(x2 - taille * Math.cos(angle + Math.PI / 6), y2 - taille * Math.sin(angle + Math.PI / 6));
	c.closePath();
	c.fill();
}

function dessinerSquelette(c) {
	// --- Chemin direct ---
	drawArrow(c, 15, 90, boxes.comparateur.x, 90);                                  // Xc -> comparateur
	drawArrow(c, boxes.comparateur.x + boxes.comparateur.w, 90, boxes.correcteur.x, 90); // epsilon
	drawArrow(c, boxes.correcteur.x + boxes.correcteur.w, 90, boxes.preactionneur.x, 90);   // U
	drawArrow(c, boxes.preactionneur.x + boxes.preactionneur.w, 90, boxes.actionneur.x, 90);    // Gr
	drawLine(c, boxes.actionneur.x + boxes.actionneur.w, 90, outputTipX - 15, 90);         // S (segment)
	drawArrow(c, outputTipX - 15, 90, outputTipX, 90);                                    // pointe S

	// --- Perturbation ---
	let xPerturb = boxes.actionneur.x + boxes.actionneur.w / 2;
	drawArrow(c, xPerturb, 25, xPerturb, boxes.actionneur.y, "#b45309");

	// --- Boucle de retour ---
	drawLine(c, outputTipX, 90, outputTipX, feedbackY);                                   // descente
	drawLine(c, outputTipX, feedbackY, boxes.capteur.x + boxes.capteur.w, feedbackY);      // -> capteur (droite)
	drawLine(c, boxes.capteur.x, feedbackY, 100, feedbackY);                               // capteur -> gauche
	drawArrow(c, 100, feedbackY, 100, boxes.comparateur.y + boxes.comparateur.h - 5, "#333"); // remontée -> comparateur

	// --- Signes + / - au comparateur ---
	c.fillStyle = "#1f3c88";
	c.font = "bold 16px Arial";
	c.textAlign = "center";
	c.fillText("+", boxes.comparateur.x - 8, 75);
	c.fillText("−", boxes.comparateur.x - 8, boxes.comparateur.h + 58);

	// --- Rectangle pointillé Régulateur ---
	c.strokeStyle = "#7c3aed";
	c.lineWidth = 2;
	c.setLineDash([6, 4]);
	c.strokeRect(regulateurRect.x, regulateurRect.y, regulateurRect.w, regulateurRect.h);
	c.setLineDash([]);
}

function drawSlotBox(c, slot, texteAffiche, filled, isLabelStrip) {
	c.lineWidth = 2;
	if (filled) {
		c.fillStyle = "#e8f8e8";
		c.strokeStyle = "#28a745";
	} else if (flashSlotId === slot.id) {
		c.fillStyle = "#fde8e8";
		c.strokeStyle = "#c0392b";
	} else {
		c.fillStyle = "#fafafa";
		c.strokeStyle = "#1f3c88";
		c.setLineDash([4, 3]);
	}
	if (!isLabelStrip) c.fillRect(slot.x, slot.y, slot.w, slot.h);
	c.strokeRect(slot.x, slot.y, slot.w, slot.h);
	c.setLineDash([]);

	c.fillStyle = filled ? "#1e7e34" : "#888";
	c.font = isLabelStrip ? "12px Arial" : "bold 12px Arial";
	c.textAlign = "center";
	let lines = texteAffiche ? texteAffiche.split(" ") : ["?"];
	if (texteAffiche && texteAffiche.length > 12) {
		// retour à la ligne simple pour les libellés longs
		let mid = Math.ceil(lines.length / 2);
		c.fillText(lines.slice(0, mid).join(" "), slot.x + slot.w / 2, slot.y + slot.h / 2 - 2);
		c.fillText(lines.slice(mid).join(" "), slot.x + slot.w / 2, slot.y + slot.h / 2 + 12);
	} else {
		c.fillText(texteAffiche || "?", slot.x + slot.w / 2, slot.y + slot.h / 2 + 4);
	}
}

function redraw() {
	const c = ctx2d();
	c.clearRect(0, 0, 600, 400);
	dessinerSquelette(c);

	// Blocs/grandeurs validés lors des phases précédentes : restent affichés en permanence
	doneSlots.forEach(slot => {
		let isLabelStrip = (slot.id === "regulateur");
		drawSlotBox(c, slot, slot.filledLabel, true, isLabelStrip);
	});

	// Slots de la phase en cours (interactifs)
	slots.forEach(slot => {
		let isLabelStrip = (slot.id === "regulateur");
		drawSlotBox(c, slot, slot.filledLabel, slot.state === "correct", isLabelStrip);
	});

	// Tray
	if (tray.length || dragChip) {
		c.fillStyle = "#555";
		c.font = "11px Arial";
		c.textAlign = "left";
		c.fillText("Étiquettes à placer :", 8, 335);
	}

	tray.forEach(chip => {
		if (dragChip && dragChip.id === chip.id) return; // dessiné à part
		c.fillStyle = "#1f3c88";
		c.strokeStyle = "#1f3c88";
		c.lineWidth = 2;
		c.fillStyle = "#f0f4ff";
		c.fillRect(chip.x, chip.y, chip.w, chip.h);
		c.strokeRect(chip.x, chip.y, chip.w, chip.h);
		c.fillStyle = "#1f3c88";
		c.font = "bold 12px Arial";
		c.textAlign = "center";
		c.fillText(chip.label, chip.x + chip.w / 2, chip.y + chip.h / 2 + 4);
	});

	if (dragChip) {
		c.fillStyle = "#fff3cd";
		c.strokeStyle = "#e07b00";
		c.lineWidth = 2;
		c.fillRect(dragChip.x, dragChip.y, dragChip.w, dragChip.h);
		c.strokeRect(dragChip.x, dragChip.y, dragChip.w, dragChip.h);
		c.fillStyle = "#7a4a00";
		c.font = "bold 12px Arial";
		c.textAlign = "center";
		c.fillText(dragChip.label, dragChip.x + dragChip.w / 2, dragChip.y + dragChip.h / 2 + 4);
	}
}

// =====================================================================
// GESTION DES PHASES
// =====================================================================
function layoutTray(chipDefs) {
	let n = chipDefs.length;
	let w = Math.min(90, Math.floor(560 / n) - 6);
	let h = 28;
	let startX = (600 - (w + 6) * n) / 2;
	return chipDefs.map((d, i) => ({
		id: d.id,
		label: d.label,
		x: startX + i * (w + 6),
		y: 350,
		w: w,
		h: h
	}));
}

function startPhase(n) {
	// On archive les blocs/grandeurs validés de la phase qui se termine
	// pour qu'ils restent visibles sur le schéma pendant les phases suivantes.
	if (slots.length) {
		doneSlots = doneSlots.concat(slots.filter(s => s.state === "correct"));
	}

	phase = n;
	dragChip = null;
	flashSlotId = null;

	if (n === 1) {
		slots = slotsPhase1().map(s => ({ ...s, state: "empty", filledLabel: null }));
		tray = layoutTray(shuffle(chipsPhase1.slice()));
		setEnonce(`Le schéma-bloc ci-dessous représente un système asservi : <b>${ctxSchema.nom}</b>.<br><br>
		<b>Étape 1/3</b> — Faites glisser chaque étiquette dans la case correspondante.<br>
		⚠️ Le <b>Régulateur</b> est un bloc qui <b>englobe</b> le Comparateur et le Correcteur : ce n'est pas un bloc supplémentaire dans la chaîne directe, mais le regroupement fonctionnel de ces deux blocs (zone en pointillés violets).`);
	}

	if (n === 2) {
		slots = slotsPhase2().map(s => ({ ...s, state: "empty", filledLabel: null }));
		tray = layoutTray(shuffle(chipsPhase2()));
		setEnonce(`<b>Étape 2/3</b> — Placez les grandeurs sur les flèches du schéma.<br>
		<b>Xc</b> = ${ctxSchema.xc} &nbsp;|&nbsp; <b>ε</b> = écart (erreur) &nbsp;|&nbsp; <b>U</b> = signal de commande &nbsp;|&nbsp;
		<b>Gr</b> = grandeur réglante (${ctxSchema.greglante}) &nbsp;|&nbsp; <b>P</b> = perturbation (${ctxSchema.perturbation}) &nbsp;|&nbsp;
		<b>S</b> = sortie (${ctxSchema.sortie}) &nbsp;|&nbsp; <b>Sm</b> = grandeur mesurée (${ctxSchema.mesure})`);
	}

	if (n === 3) {
		slots = [];
		tray = [];
		setEnonce(`<b>Étape 3/3</b> — Le schéma est complet. Répondez maintenant aux questions ci-dessous à propos de : <b>${ctxSchema.nom}</b>.`);
		buildPhase3();
	}

	redraw();
}

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function setEnonce(html) {
	document.getElementById("enonce").innerHTML = html;
}

function phaseComplete() {
	return slots.every(s => s.state === "correct");
}

// =====================================================================
// INTERACTION (souris + tactile via Pointer Events)
// =====================================================================
function getPointerPos(evt) {
	const c = canvas();
	const rect = c.getBoundingClientRect();
	const scaleX = c.width / rect.width;
	const scaleY = c.height / rect.height;
	return {
		x: (evt.clientX - rect.left) * scaleX,
		y: (evt.clientY - rect.top) * scaleY
	};
}

function chipAt(x, y) {
	for (let i = tray.length - 1; i >= 0; i--) {
		let ch = tray[i];
		if (x >= ch.x && x <= ch.x + ch.w && y >= ch.y && y <= ch.y + ch.h) return ch;
	}
	return null;
}

function slotAt(x, y) {
	for (let s of slots) {
		if (s.state === "correct") continue;
		if (x >= s.x && x <= s.x + s.w && y >= s.y && y <= s.y + s.h) return s;
	}
	return null;
}

function onPointerDown(evt) {
	if (phase === 3) return;
	evt.preventDefault();
	const pos = getPointerPos(evt);
	const chip = chipAt(pos.x, pos.y);
	if (!chip) return;
	dragChip = { ...chip };
	dragOffsetX = pos.x - chip.x;
	dragOffsetY = pos.y - chip.y;
	tray = tray.filter(c => c.id !== chip.id || c.label !== chip.label);
	redraw();
}

function onPointerMove(evt) {
	if (!dragChip) return;
	evt.preventDefault();
	const pos = getPointerPos(evt);
	dragChip.x = pos.x - dragOffsetX;
	dragChip.y = pos.y - dragOffsetY;
	redraw();
}

function onPointerUp(evt) {
	if (!dragChip) return;
	evt.preventDefault();
	const pos = getPointerPos(evt);
	const centerX = dragChip.x + dragChip.w / 2;
	const centerY = dragChip.y + dragChip.h / 2;
	const slot = slotAt(centerX, centerY);

	if (slot && slot.id === dragChip.id) {
		slot.state = "correct";
		slot.filledLabel = dragChip.label;
		score++;
		dragChip = null;
		redraw();
		if (phaseComplete()) {
			setTimeout(() => startPhase(phase + 1), 700);
		}
	} else if (slot) {
		flashSlotId = slot.id;
		tray.push({ id: dragChip.id, label: dragChip.label, x: 0, y: 0, w: dragChip.w, h: dragChip.h });
		tray = layoutTray(tray.map(c => ({ id: c.id, label: c.label })));
		dragChip = null;
		redraw();
		setTimeout(() => { flashSlotId = null; redraw(); }, 500);
	} else {
		tray.push({ id: dragChip.id, label: dragChip.label, x: 0, y: 0, w: dragChip.w, h: dragChip.h });
		tray = layoutTray(tray.map(c => ({ id: c.id, label: c.label })));
		dragChip = null;
		redraw();
	}
}

function attachEvents() {
	const c = canvas();
	c.style.touchAction = "none";
	c.addEventListener("pointerdown", onPointerDown);
	c.addEventListener("pointermove", onPointerMove);
	c.addEventListener("pointerup", onPointerUp);
	c.addEventListener("pointercancel", onPointerUp);
}

// =====================================================================
// PHASE 3 — Questions de compréhension (validation manuelle, hors base.js)
// =====================================================================
const questionsPhase3 = [
	{
		texte: "Quel est le rôle du Comparateur dans la boucle ?",
		check: r => /(écart|difference|différence|soustrait|erreur)/i.test(r),
		feedback: "Le comparateur calcule l'écart ε = Xc − Sm entre la consigne et la grandeur mesurée."
	},
	{
		texte: "Quels sont les deux blocs contenus à l'intérieur du bloc Régulateur ?",
		check: r => /comparateur/i.test(r) && /correcteur/i.test(r),
		feedback: "Le Régulateur englobe le Comparateur ET le Correcteur : c'est un regroupement fonctionnel, pas un bloc de plus dans la chaîne."
	},
	{
		texte: `Sans intervention du régulateur, que se passe-t-il sur la sortie (${ctxSchema.sortie}) si la perturbation (${ctxSchema.perturbation}) augmente brutalement ?`,
		check: r => /(écart|varie|s'écart|change|perturb|erreur|s ecart)/i.test(r),
		feedback: "La perturbation agit directement sur le processus : sans correction, la sortie s'écarte de la consigne et un écart apparaît."
	},
	{
		texte: "Si le capteur tombe en panne (signal figé), le système reste-t-il en boucle fermée ? Justifiez.",
		check: r => /(non|plus de retour|boucle ouverte|pas de comparaison|plus de mesure)/i.test(r),
		feedback: "Non : sans retour d'information (mesure), il n'y a plus de comparaison possible avec la consigne. Le système fonctionne alors en boucle ouverte, non corrigée."
	}
];

let q3Done = [];

function buildPhase3() {
	q3Done = new Array(questionsPhase3.length).fill(false);
	let zone = document.getElementById("questions");
	zone.innerHTML = "";
	questionsPhase3.forEach((q, i) => {
		zone.innerHTML += `
		<div class="question">
			<p><b>Question ${i + 1} :</b> ${q.texte}</p>
			<input type="text" id="q3-${i}" style="width:70%;">
			<button onclick="validerPhase3(${i})">Valider</button>
			<div id="fb3-${i}" class="feedback"></div>
		</div>`;
	});
}

function validerPhase3(i) {
	if (q3Done[i]) return;
	let input = document.getElementById("q3-" + i);
	let fb = document.getElementById("fb3-" + i);
	let q = questionsPhase3[i];
	let ok = q.check(input.value || "");
	if (ok) {
		score++;
		fb.innerHTML = "✅ Bonne réponse<br>" + q.feedback;
	} else {
		fb.innerHTML = "❌ Réponse incomplète<br>" + q.feedback;
	}
	q3Done[i] = true;
	input.disabled = true;
}

// =====================================================================
// LANCEMENT
// =====================================================================
window.onload = function () {
	document.getElementById("titre").innerHTML = "Schéma-bloc d'un système asservi";
	attachEvents();
	startPhase(1);
};
