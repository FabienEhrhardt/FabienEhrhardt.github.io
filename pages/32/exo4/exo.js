// =====================
// EXERCICE : Harmoniques de courant – Analyseur de réseau CA8336
// Thème 32 – Signaux avec harmoniques
// =====================

// =====================
// PARAMÈTRES ALÉATOIRES
// =====================

// Tension secteur
const Veff = 230; // V efficace
const Vpeak = Math.round(Veff * Math.sqrt(2)); // ~325 V

// Fréquence fondamentale
const freq = 50;
const T = 1 / freq; // 0.02 s
const omega = 2 * Math.PI * freq;

// Courant fondamental : entre 0.5 A et 5 A
const I1 = Math.floor(Math.random() *100+1)/10; // en A

const choix=Math.floor(Math.random() * profilMesuse.length);
const profilChoisi = profilMesuse[choix];
const harmonics=profilChoisi["Harm"];

const harmonicsD= new Array(52).fill(0);
for (let n = 0; n < harmonics.length; n++) {
	harmonicsD[n]=Math.PI/180*profilChoisi["Phase"][n];
}

const phi1=Math.PI/180*(profilChoisi["phif"]+Math.floor(Math.random() * 20-10));


// =====================
// CALCULS THÉORIQUES
// =====================

// Ieff total (formule : Ieff = I1 * sqrt(somme(Hn²/100²)))
let sumHsq = 0;
for (let n = 0; n < harmonics.length; n++) {
  sumHsq += (harmonics[n] / 100) ** 2;
}
const Ieff = arrondi(I1 * Math.sqrt(sumHsq)); // en A

// Imax (crête) – valeur de crête du signal temporel
// approximation : Imax ≈ sqrt(2)*I1 + contributions harmoniques (on calcule correctement)
const N_pts = 1000;
let Imax = 0;
for (let k = 0; k < N_pts; k++) {
  const t = k / N_pts * T;
  let i = 0;
  for (let n = 1; n < harmonics.length; n++) {
    if (harmonics[n] > 0) {
		i += I1 * (harmonics[n] / 100) * Math.sin(n * omega * (t-phi1)+harmonicsD[n]); //-phi1
   	}
  }
  if (Math.abs(i) > Imax) Imax = Math.abs(i);
}

// THD
let sumHd = 0;
for (let n = 2; n < harmonics.length; n++) {
  sumHd += (harmonics[n] / 100) ** 2;
}
const THD = Math.sqrt(sumHd) * 100; // en % par rapport à fondamental
const THDarrondi = Math.round(THD * 10) / 10;

// Courant de distorsion Iad
const Iad = I1 * Math.sqrt(sumHd); // en A

// Puissances
// P = V * I1 * cos(phi1)
const P = Math.round(Veff * I1 * Math.cos(phi1));

// Q1 (puissance réactive fondamentale)
const Q1 = Math.round(Veff * I1 * Math.sin(phi1));

// D (puissance de déformation) = V * Iad
const D = Math.round(Veff * Iad);

// S (puissance apparente totale) = V * Ieff
const S = Math.round(Veff * Ieff);

// Facteurs
const cosphi = Math.round(Math.cos(phi1) * 1000) / 1000;
const tanphi = Math.round(Math.tan(phi1) * 1000) / 1000;
// PF (facteur de puissance réel) = P / S
const PF = Math.round((P / S) * 1000) / 1000;

// Fréquences harmoniques à retrouver
const top0 = top3Calc(harmonics);
const rang1 = top0[0]; // rang harmonique dominant
const freq1 = rang1 * freq;
const val1 = Math.round(I1 * harmonics[rang1] / 100);

const rang2 = top0[1];
const freq2 = rang2 * freq;
const val2 = Math.round(I1 * harmonics[rang2] / 100);

// Curseur temporel fixé à t = T/4 = 5 ms
const tcursor = T / 4;
const Vcursor = Math.round(Veff * Math.sqrt(2) * Math.sin(omega * tcursor));
const Icursor_calcul = (function () {
  let i = 0;
  for (let n = 1; n < harmonics.length; n++) {
    if (harmonics[n] > 0) {
	  i += I1 * (harmonics[n] / 100) * Math.sin(n * (omega * tcursor-phi1)+harmonicsD[n]); //-phi1
    }
  }
  return Math.round(i * 1000);
})();

// Arrondi pour réponses
const Ieff_rep = Math.round(Ieff * 1000) / 1000; // A, 3 décimales
const Imax_rep = Math.round(Imax * 1000) / 1000; // A
const D_rep = D;
const S_rep = S;
const PF_rep = PF;

// =====================
// FONCTIONS UTILITAIRES LOCALES
// =====================

function top3Calc(H) {
  let max1 = 0, max2 = 0, max3 = 0;
  let i1 = 0, i2 = 0, i3 = 0;
  for (let i = 2; i < H.length; i++) {
    if (H[i] > max1) { max3 = max2; i3 = i2; max2 = max1; i2 = i1; max1 = H[i]; i1 = i; }
    else if (H[i] > max2) { max3 = max2; i3 = i2; max2 = H[i]; i2 = i; }
    else if (H[i] > max3) { max3 = H[i]; i3 = i; }
  }
  return [i1, i2, i3];
}

// =====================
// PARAMÈTRES ÉCRANS (utilisés par CourbeCA / SpectreCA / PuissanceCA)
// =====================

// -- Écran 1 : Formes d'ondes --
// Variables globales requises par CourbeCA.js
var Vmax = Veff * Math.sqrt(2);
var tcursor_g = tcursor;

// Fonctions signal
function fV(t) {
  return Veff * Math.sqrt(2) * Math.sin(omega * t);
}
function fI(t) {
  let i = 0;
  for (let n = 1; n < harmonics.length; n++) {
    if (harmonics[n] > 0) {
	  i += I1 * (harmonics[n] / 100) * Math.sin(n * (omega * t-phi1)+harmonicsD[n]); 
    }
  }
  return i;
}

// Calcul des tableaux
const N_calc = 1200;
var tvals = [], Vvals = [], Ivals = [];
var Imax_global = 0;
for (let k = 0; k < N_calc; k++) {
  const t = k / N_calc * T;
  tvals.push(t);
  Vvals.push(fV(t));
  const iv = fI(t);
  Ivals.push(iv);
  if (Math.abs(iv) > Imax_global) Imax_global = Math.abs(iv);
}

// -- Écran 2 : Spectre -- (harmonics déjà défini)
var I1_spec = I1; // A, utilisé par SpectreCA
var THD_spec = '??';
var Iad_spec = Iad; // A (P10 attend des A)

// -- Écran 3 : Puissances --
var freq_p = 50.00;
var date_p = (() => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(2)}`;
})();
var time_p = (() => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
})();
var P_p = '??';
var Q_p = '??';
var D_p = '??';
var S_p = '??';
var PF_p = PF;
var cosphi_p = cosphi;
var tanphi_p = tanphi;

// =====================
// FONCTIONS DE DESSIN DES 3 ÉCRANS
// =====================

function rmsLocal(arr) {
  let s = 0;
  for (let v of arr) s += v * v;
  return Math.sqrt(s / arr.length);
}

function drawEcran1(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const VmaxC = 1.1 * Vmax;
  const ImaxC = 1.1 * Imax_global;

  // Fond appareil
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, 600, 400);

  // Bandeau titre
  ctx.fillStyle = "#0f3460";
  ctx.fillRect(0, 0, 600, 35);
  ctx.fillStyle = "#e0e0e0";
  ctx.font = "bold 14px monospace";
  ctx.fillText("CA 8336   CHAUVIN ARNOUX", 10, 22);
  ctx.fillText("FORMES D'ONDES", 390, 22);

  // Zone graphique
  const gx = 80, gy = 100, gw = 470, gh = 220; //50
  ctx.fillStyle = "#000";
  ctx.fillRect(gx, gy, gw, gh);
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 1;
  ctx.strokeRect(gx, gy, gw, gh);

  // Grille
  ctx.setLineDash([3, 4]);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(gx, gy + gh * i / 4);
    ctx.lineTo(gx + gw, gy + gh * i / 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(gx + gw * i / 4, gy);
    ctx.lineTo(gx + gw * i / 4, gy + gh);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Axe central
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(gx, gy + gh / 2);
  ctx.lineTo(gx + gw, gy + gh / 2);
  ctx.stroke();
  


  // Curseur
  const xc = gx + gw * (tcursor / T);
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(xc, gy);
  ctx.lineTo(xc, gy + gh);
  ctx.stroke();
  ctx.setLineDash([]);

  // Courbe tension
  ctx.strokeStyle = "#00ff44";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < N_calc; i++) {
    const x = gx + gw * (tvals[i] / T);
    const y = gy + gh / 2 - (Vvals[i] / VmaxC) * (gh / 2);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Courbe courant
  ctx.strokeStyle = "#ffaa00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < N_calc; i++) {
    const x = gx + gw * (tvals[i] / T);
    const y = gy + gh / 2 - (Ivals[i] / ImaxC) * (0.8 * gh / 2);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  
  // Axe central
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(gx, gy+ 0.2* gh / 2);
  ctx.lineTo(gx + gw, gy+ 0.2* gh / 2);
  ctx.moveTo(gx, gy+ 1.8* gh / 2);
  ctx.lineTo(gx + gw, gy+ 1.8* gh / 2);
  ctx.stroke();

  // Infos haut
  const Vrms_calc = Math.round(rmsLocal(Vvals) * 10) / 10;
  const Irms_calc = Math.round(rmsLocal(Ivals) * 1000);
  ctx.fillStyle = "#00ff44";
  ctx.font = "bold 22px monospace";
  ctx.fillText(Vrms_calc.toFixed(1) + " V", 10, 70);
  ctx.fillStyle = "#ffaa00";
  ctx.fillText(Ieff + " A", 150, 70);

  // Échelles
  ctx.fillStyle = "#00ff44";
  ctx.font = "12px monospace";
  ctx.fillText("+" + VmaxC.toFixed(0), 5, gy + 12);
  ctx.fillStyle = "#ffaa00";
  ctx.fillText("+" + (ImaxC * 1000).toFixed(0) + "m", 5, gy + 26);

  ctx.fillStyle = "#aaa";
  ctx.fillText("0", 60, gy + gh / 2 + 5);

  ctx.fillStyle = "#00ff44";
  ctx.fillText("-" + VmaxC.toFixed(0), 5, gy + gh + 5);
  ctx.fillStyle = "#ffaa00";
  ctx.fillText("-" + (ImaxC * 1000).toFixed(0) + "m", 5, gy + gh - 10);

  // Axe temps
  ctx.fillStyle = "#aaa";
  ctx.font = "11px monospace";
  ctx.fillText("0", gx, gy + gh + 15);
  ctx.fillText("5ms", gx + gw * 0.25 - 10, gy + gh + 15);
  ctx.fillText("10ms", gx + gw * 0.5 - 15, gy + gh + 15);
  ctx.fillText("15ms", gx + gw * 0.75 - 15, gy + gh + 15);
  ctx.fillText("20ms", gx + gw - 20, gy + gh + 15);

  // Valeur curseur
  const V_cur = Math.round(fV(tcursor));
  const I_cur = Math.round(fI(tcursor) * 1000);
  ctx.fillStyle = "#ccc";
  ctx.font = "13px monospace";
  ctx.fillText(`t=${(tcursor * 1000).toFixed(1)}ms   `, gx, 380);
  ctx.fillStyle = "#00ff44";
  ctx.fillText(`V=${V_cur}V  `, gx + 90, 380);
  ctx.fillStyle = "#ffaa00";
  ctx.fillText(`A=${I_cur} A`, gx + 180, 380);

  // Légende
  ctx.fillStyle = "#00ff44";
  ctx.fillText("▬ Tension (V)", gx + gw - 200, 70);
  ctx.fillStyle = "#ffaa00";
  ctx.fillText("▬ Courant (A)", gx + gw - 70, 70);
}

function drawEcran2(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, 600, 400);

  ctx.fillStyle = "#0f3460";
  ctx.fillRect(0, 0, 600, 35);
  ctx.fillStyle = "#e0e0e0";
  ctx.font = "bold 14px monospace";
  ctx.fillText("CA 8336   CHAUVIN ARNOUX", 10, 22);
  ctx.fillText("HARMONIQUES", 420, 22);

  // Entête
  ctx.fillStyle = "#ffaa00";
  ctx.font = "bold 16px monospace";
  ctx.fillText("A-h01", 10, 60);
  ctx.fillStyle = "#00ff44";
  ctx.fillText(I1 + " A", 280, 55);
  ctx.fillText("+000°", 430, 55);
  ctx.fillStyle = "#ff6666";
  ctx.fillText("THD  " + '??' + " %", 430, 80); ////Attention on cache volontairement le THD!
  ctx.fillText("Ad   " + arrondi(Iad) + " A", 430, 100);

  // Zone graphique
  const gx = 40, gy = 120, gw = 520, gh = 220;
  ctx.fillStyle = "#000";
  ctx.fillRect(gx, gy, gw, gh);
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.strokeRect(gx, gy, gw, gh);

  // Graduations axe Y
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 3]);
  ctx.beginPath();
  ctx.moveTo(gx, gy + gh * 0.5); ctx.lineTo(gx + gw, gy + gh * 0.5); // 50%
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#aaa";
  ctx.font = "11px monospace";
  ctx.fillText("100%", gx - 35, gy + 5);
  ctx.fillText("50%", gx - 28, gy + gh / 2 + 5);
  ctx.fillText("0%", gx - 20, gy + gh + 5);

  // Barres harmoniques
  const barW = 14;
  const spacing = 6;
  const total = 26;
  const zoneW = gw / total;

  for (let i = 0; i < harmonics.length && i < total; i++) {
    const val = harmonics[i];
    const barH = (val / 100) * gh;
    const bx = gx + i * (barW + spacing);
    const by = gy + gh - barH;

    // Couleur : fondamental en vert vif, harmoniques en orange/rouge
    if (i === 1) ctx.fillStyle = "#00ff44";
    else if (i === 0) ctx.fillStyle = "#555";
    else if (val > 50) ctx.fillStyle = "#ff4444";
    else if (val > 20) ctx.fillStyle = "#ff8800";
    else ctx.fillStyle = "#ffcc44";

    ctx.fillRect(bx, by, barW, barH);

    // Numéro
    ctx.fillStyle = "#aaa";
    ctx.font = "10px monospace";
    if (i === 0) ctx.fillText("DC", bx, gy + gh + 14);
    else ctx.fillText(i, bx + 2, gy + gh + 14);
  }

  // Axe rang
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("Rang harmonique →", gx + 200, 395);
}

function drawEcran3(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, 600, 400);

  ctx.fillStyle = "#0f3460";
  ctx.fillRect(0, 0, 600, 35);
  ctx.fillStyle = "#e0e0e0";
  ctx.font = "bold 14px monospace";
  ctx.fillText("CA 8336   CHAUVIN ARNOUX", 10, 22);
  ctx.fillText("PUISSANCES", 430, 22);

  // Fréquence / date
  ctx.fillStyle = "#aaa";
  ctx.font = "14px monospace";
  ctx.fillText(freq_p.toFixed(2) + " Hz", 220, 55);
  ctx.fillText(date_p + "  " + time_p, 350, 55);

  // Colonne gauche : grandeurs
  const labels = ["P (W)", "Q₁ (var)", "D (vad)", "S (VA)"];
  const vals = [P_p, Q_p, D_p, S_p];
  const units = ["W", "var", "var", "VA"];
  const ys = [110, 165, 220, 275];

  ctx.font = "16px monospace";
  ctx.fillStyle = "#aaa";
  for (let i = 0; i < labels.length; i++) {
    ctx.fillText(labels[i], 30, ys[i]);
  }

  ctx.font = "bold 24px monospace";
  for (let i = 0; i < vals.length; i++) {
    const v = vals[i];
    if (i === 0) ctx.fillStyle = "#00ff44"; // P en vert
    else if (i === 1) ctx.fillStyle = "#ffaa00"; // Q en orange
    else if (i === 2) ctx.fillStyle = "#ff6666"; // D en rouge
    else ctx.fillStyle = "#66ccff"; // S en bleu
	let txt;
	if(typeof v==='number'){ 
		const sign = (v >= 0 ? "+" : "-");
		const absv = Math.abs(v);
		txt = sign + (absv >= 1000 ? (absv / 1000).toFixed(3) + "k" : absv.toFixed(0));
	} else
	{
		txt = v;
	}
	
    ctx.fillText(txt, 160, ys[i]);
  }

  // Colonne droite : facteurs
  const flabels = ["PF", "cosφ", "tanφ"];
  const fvals = [PF_p, cosphi_p, tanphi_p];
  const fys = [110, 165, 220];

  ctx.font = "16px monospace";
  ctx.fillStyle = "#aaa";
  for (let i = 0; i < flabels.length; i++) {
    ctx.fillText(flabels[i], 340, fys[i]);
  }

  ctx.font = "bold 22px monospace";
  ctx.fillStyle = "#fff";
  for (let i = 0; i < fvals.length; i++) {
    let sign;
	if(typeof fvals[i]==='number'){ 
		sign	= fvals[i] >= 0 ? "+" : "-";
		ctx.fillText(sign + Math.abs(fvals[i]).toFixed(3), 420, fys[i]);
	} else
	{
    ctx.fillText(fvals[i], 420, fys[i]);
	}
  }

  // Symbole type charge (bobine si Q>0, condo si Q<0)
  ctx.strokeStyle = "#ffaa00";
  ctx.lineWidth = 2;
  const sx = 130, sy = 165;
  if (tanphi_p > 0) {
    // bobine
    ctx.beginPath();
    ctx.moveTo(sx - 10, sy);
    for (let i = 0; i < 3; i++) ctx.arc(sx + i * 6, sy, 4, Math.PI, 0);
    ctx.lineTo(sx + 3 * 4 + 10, sy);
    ctx.stroke();
  } else {
    // condensateur
    ctx.beginPath();
    ctx.moveTo(sx-10, sy); ctx.lineTo(sx, sy);ctx.lineTo(sx, sy+10);ctx.lineTo(sx, sy-10);
	ctx.moveTo(sx+10, sy - 10); ctx.lineTo(sx+10, sy + 10); ctx.lineTo(sx+10, sy);ctx.lineTo(sx+20, sy);
    ctx.stroke();
  }

  // Séparateur
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(310, 40); ctx.lineTo(310, 310);
  ctx.stroke();

  // Note bas
  ctx.fillStyle = "#555";
  ctx.font = "11px monospace";
  ctx.fillText("* Q₁ = puissance réactive fondamentale", 30, 350);
  ctx.fillText("* D = puissance de déformation", 30, 368);
}

// =====================
// EXERCICE
// =====================

let theme = "32";
let nomExo = "exo4";

let exo = {

  titre: "Analyse d'un réseau avec harmoniques de courant – Calculs",

  enonce: `Un analyseur de réseau <b>Chauvin Arnoux CA 8336</b> est branché sur une installation monophasée 
  comportant une charge non-linéaire alimentée sous \\(${Veff}~V\\) / \\(${freq}~Hz\\).<br><br>
  L'appareil affiche <b>3 écrans</b> reproduits ci-dessous. Répondre aux questions en vous appuyant uniquement sur la lecture des écrans.`,

  courbe1: {}, // indique qu'il y a un canvas graph

  questions: [


    // ===================== Q3 – Lecture Ieff
    {
      texte: `Relever la valeur efficace du <span style="color:#cc7700">courant</span> affichée sur l'analyseur. Donner la réponse en A.`,
      reponse: Ieff,
      unite: "A",
      feedback: `L'écran 1 affiche la valeur efficace du courant : <b>${Ieff} A</b>.`
    },
	
	// ===================== Q4 – Lecture Imax
    {
      texte: `Relever la valeur maximale du <span style="color:#cc7700">courant</span> affichée sur l'analyseur. Donner la réponse en A.`,
      reponse: Imax,
      unite: "A",
      feedback: `L'écran 1 affiche la variation de la valeur instantanée  du courant. L'échelle est donnée à gauche de la courbe, il faut donc mesurer, avec le curseur ou avec la règle la valeur. \\(I_{max}=\\)<b>${arrondi(Imax)} A</b>.<br>
      Ce courant contient des harmoniques, donc \\(I_{eff} \\ne \\frac{I_{max}}{\\sqrt{2}}\\).`
    },

    // ===================== Q5 – Lecture fondamental sur spectre
    {
      texte: `Relever la valeur efficace du courant fondamental (rang 1) indiquée en haut de l'écran 2. Donner la réponse en A.`,
      reponse: I1,
      unite: "A",
      feedback: `L'écran 2 affiche en haut : <b>"A-h01 → ${I1} A"</b>.<br>
      C'est la valeur efficace du fondamental seul (rang 1, fréquence ${freq} Hz).
	  Ce courant contient des harmoniques, donc \\(I_{eff} > I_1 = ${I1}~A\\).`
    },

    // ===================== Q8 – Lecture THD
    {
      texte: `Calculer le taux de distorsion harmonique en courant (THD).`,
      reponse: THDarrondi,
      unite: "%",
      feedback: `Le THD mesure le rapport entre les harmoniques et le fondamental :<br>
      \\(THD = \\frac{\\sqrt[I_{eff}^2-I_{1}^2}{I_1} \\times 100 \\approx ${THDarrondi}~\\%\\)`
    },


    // ===================== Q9 – Lecture puissance active P
    {
      texte: `Calculer la puissance active consommée par la charge.`,
      reponse: P,
      unite: "W",
      feedback: `On la calcule avec la formule \\(P=V I_1 \\cos \\varphi= ${Veff} \\times ${I1} \\times ${cosphi_p}=${P} W\\).`
    },
	
	    // ===================== Q9 – Lecture puissance réactive Q1
    {
      texte: `Calculer la puissance réactive consommée par la charge.`,
      reponse: Q1,
      unite: "var",
	feedback: `On la calcule avec la formule \\(Q=V I_1 \\sin \\varphi= ${Veff} \\times ${I1} \\times \\sin {\\acos{${cosphi_p}}}=${Q1} var\\).`
    },
	
			    // ===================== Q9 – Lecture puissance apparente S
    {
      texte: `Calculer la puissance apparente consommée par la charge.`,
      reponse: S,
      unite: "VA",
	feedback: `On la calcule avec la formule \\(S=V I = ${Veff} \\times ${Ieff}=${S} VA\\).<br>
	Attention \\(S \\ne V I_1 \\) et \\(S \\ne \\sqrt{P^2+Q^2} \\) car il y a présence d'harmoniques!`
    },
	
		    // ===================== Q9 – Lecture puissance déformante D
    {
      texte: `Calculer la puissance déformante consommée par la charge.`,
      reponse: D,
      unite: "vad",
	feedback: `On la calcule avec la formule \\(D=\\sqrt{S^2-P^2-Q^2}= ${D} vad\\).`
    },

    // ===================== Q10 – Calcul facteur de puissance
    {
      texte: `Calculer le facteur de puissance de l'installation.`,
      reponse: PF,
      unite: "",
      feedback: `On calcule le facteur de puissance \\(F_p=\\frac{P}{S}=${PF} <br>
	  Attention il y a des harmoniques donc \\(PF \\ne \\cos \\varphi\\)`
    },


    // ===================== Q13 – Question texte : amélioration FP
    {
      type: "texte",
      texte: `Le facteur de puissance de cette installation est de <b>${PF_rep}</b>. Citer un moyen de l'améliorer.`,
      reponse: [
        "filtre",
        "harmonique",
        "APF",
        "PFC"
      ],
      feedback: `Pour améliorer le facteur de puissance dégradé par les harmoniques :<br>
      ✅ <b>Filtre actif d'harmoniques (APF)</b> : compense dynamiquement les harmoniques de courant.<br>
      ✅ <b>Filtre passif accordé</b> : circuit LC accordé sur un rang harmonique.<br>
      ✅ <b>Correcteur de facteur de puissance (PFC)</b> : intégré à l'alimentation.<br>
      ⚠️ Un simple condensateur ne suffit pas : il corrigerait un \\(\\cos\\varphi\\) inductif mais pas la déformation due aux harmoniques.`
    },

  ]
};

// =====================
// CANVAS PERSONNALISÉ
// =====================

// On surcharge l'initialisation pour afficher 3 canvases
let nbquestion = exo.questions.length;

window.onload = function () {

  genererExercice(exo);

  // Le canvas principal (graph) affiche l'écran 1 par défaut
  // On crée dynamiquement les 3 écrans dans l'énoncé

  const enonce = document.getElementById("enonce");
  const conteneur = document.createElement("div");
  conteneur.style.cssText = "display:flex;flex-wrap:wrap;gap:0px;margin-top:0px;justify-content:center;";

  const titrStyles = "font-size:13px;font-weight:bold;text-align:center;margin-bottom:0px;color:#1f3c88;font-family:monospace;";

  for (let n = 1; n <= 3; n++) {
    const bloc = document.createElement("div");
    bloc.style.cssText = "display:flex;flex-direction:column;align-items:center;";
    const label = document.createElement("div");
    label.style.cssText = titrStyles;
    label.textContent = `📺 Écran ${n}`;
    const cv = document.createElement("canvas");
    cv.id = `ecran${n}`;
    cv.width = 600;
    cv.height = 400;
	
	/*cv.style.cssText = `border:2px solid #1f3c88;border-radius:6px;max-width:100%;
      transform:scale(0.72);transform-origin:top left;margin-bottom:-115px;`;*/
    bloc.appendChild(label);
    bloc.appendChild(cv);
    conteneur.appendChild(bloc);
  }

  enonce.appendChild(conteneur);

  // Masquer le canvas graph principal
  const graphEl = document.getElementById("graph");
  if (graphEl) graphEl.style.display = "none";

  // Dessiner les 3 écrans
  drawEcran1("ecran1");
  drawEcran2("ecran2");
  drawEcran3("ecran3");
};