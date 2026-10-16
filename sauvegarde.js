// ============================================================
// sauvegarde.js — Export / import de la progression
// ============================================================
// - Le fichier exporté (.bts) est chiffré et authentifié (AES-GCM) :
//   le modifier à la main le rend illisible, l'import le refuse.
// - À l'import, si le pseudo du fichier est différent de celui du
//   navigateur, le profil actuel est REMPLACÉ (pseudo compris) par celui
//   du fichier. Si le pseudo est identique, les progressions sont FUSIONNÉES
//   (on garde le meilleur score de chaque exercice).
// ============================================================
(function () {
"use strict";

// Clés du localStorage sauvegardées (à compléter si vous en ajoutez d'autres)
const CLES = ["scoresApp", "streak", "lastDate", "bestSerie", "aventure",
              "defiScore", "highscores", "platine"];

const PREFIXE = "BTS1.";
// Secret de chiffrement : À CHANGER (puis ne plus y toucher, sinon les anciens
// fichiers deviennent illisibles).
const SECRET = ["bts", "electro", "couffignal", "2026", "k7Qz"].join("-");
const SEL = "bts-couffignal-sel-v1";

// ------------------------------------------------------------
// Base64 « URL-safe »
// ------------------------------------------------------------
function versB64(u8) {
  let s = "";
  for (let i = 0; i < u8.length; i += 8192)
    s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function depuisB64(t) {
  t = t.replace(/-/g, "+").replace(/_/g, "/");
  while (t.length % 4) t += "=";
  const s = atob(t), u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return u;
}

// ------------------------------------------------------------
// Chiffrement AES-GCM (clé dérivée du secret par PBKDF2)
// ------------------------------------------------------------
let _cle = null;
function cle() {
  if (!_cle) {
    const enc = new TextEncoder();
    _cle = crypto.subtle.importKey("raw", enc.encode(SECRET), "PBKDF2", false, ["deriveKey"])
      .then(base => crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode(SEL), iterations: 100000, hash: "SHA-256" },
        base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]));
  }
  return _cle;
}
async function chiffrer(obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const clair = new TextEncoder().encode(JSON.stringify(obj));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await cle(), clair));
  const out = new Uint8Array(12 + ct.length);
  out.set(iv, 0); out.set(ct, 12);
  return PREFIXE + versB64(out);
}
async function dechiffrer(texte) {
  texte = String(texte).trim();
  if (!texte.startsWith(PREFIXE)) throw new Error("format");
  const u = depuisB64(texte.slice(PREFIXE.length));
  if (u.length < 13) throw new Error("format");
  const clair = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: u.subarray(0, 12) }, await cle(), u.subarray(12));
  return JSON.parse(new TextDecoder().decode(clair));
}

// ------------------------------------------------------------
// Outils sur le localStorage
// ------------------------------------------------------------
function lireJSON(txt, def) {
  try { const v = JSON.parse(txt); return (v && typeof v === "object") ? v : def; }
  catch (e) { return def; }
}
function pseudoLocal() {
  const s = lireJSON(localStorage.getItem("scoresApp"), {});
  return s.pseudo || "Anonyme";
}
function cryptoOK() { return typeof crypto !== "undefined" && crypto.subtle; }

// Remplacement complet du profil par celui du fichier
function remplacer(d) {
  CLES.forEach(k => localStorage.removeItem(k));
  Object.keys(d).forEach(k => {
    if (CLES.indexOf(k) !== -1 && typeof d[k] === "string") localStorage.setItem(k, d[k]);
  });
}

// Fusion (même pseudo) : on garde le meilleur de chaque côté
function fusionner(d) {
  const L = k => localStorage.getItem(k);

  // Scores par exercice : maximum
  const sl = lireJSON(L("scoresApp"), {}), sf = lireJSON(d.scoresApp, {});
  Object.keys(sf).forEach(th => {
    if (th === "pseudo" || !sf[th] || typeof sf[th] !== "object") return;
    if (!sl[th] || typeof sl[th] !== "object") sl[th] = {};
    Object.keys(sf[th]).forEach(ex => {
      const v = sf[th][ex];
      if (typeof v === "number" && !(sl[th][ex] >= v)) sl[th][ex] = v;
    });
  });
  if (!sl.pseudo && sf.pseudo) sl.pseudo = sf.pseudo;
  localStorage.setItem("scoresApp", JSON.stringify(sl));

  // Série en cours : celle dont la dernière date est la plus récente
  const dl = Date.parse(L("lastDate") || ""), df = Date.parse(d.lastDate || "");
  if (!isNaN(df) && (isNaN(dl) || df > dl)) {
    if (d.streak !== undefined) localStorage.setItem("streak", d.streak);
    localStorage.setItem("lastDate", d.lastDate);
  }
  // Meilleures séries : maximum
  ["bestSerie", "platine"].forEach(k => {
    const a = parseInt(L(k)) || 0, b = parseInt(d[k]) || 0;
    if (b > a) localStorage.setItem(k, b);
  });

  // Aventure : réunion des étapes passées / TP réalisés
  const al = lireJSON(L("aventure"), {}), af = lireJSON(d.aventure, {});
  const res = { passe: Object.assign({}, al.passe, af.passe), tp: Object.assign({}, al.tp, af.tp) };
  localStorage.setItem("aventure", JSON.stringify(res));

  // Défi timbre : celui qui a le plus de réponses
  const gl = lireJSON(L("defiScore"), null), gf = lireJSON(d.defiScore, null);
  if (gf && (!gl || (gf.total || 0) > (gl.total || 0)))
    localStorage.setItem("defiScore", JSON.stringify(gf));

  // Autres clés : on ne les écrase pas
  ["highscores"].forEach(k => {
    if (L(k) === null && typeof d[k] === "string") localStorage.setItem(k, d[k]);
  });
}

// ------------------------------------------------------------
// Export
// ------------------------------------------------------------
async function exporterProgression() {
  if (!cryptoOK()) {
    alert("L'export n'est pas disponible dans ce contexte (le site doit être ouvert en https).");
    return;
  }
  const pseudo = pseudoLocal();
  if (pseudo === "Anonyme" &&
      !confirm("Tu n'as pas encore de pseudo : le fichier sera au nom « Anonyme ». Exporter quand même ?"))
    return;

  const donnees = {};
  CLES.forEach(k => { const v = localStorage.getItem(k); if (v !== null) donnees[k] = v; });
  const texte = await chiffrer({ v: 1, pseudo: pseudo, date: new Date().toISOString(), donnees: donnees });

  const blob = new Blob([texte], { type: "text/plain" });
  const a = document.createElement("a");
  const propre = pseudo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]+/g, "_");
  a.href = URL.createObjectURL(blob);
  a.download = "progression_" + propre + "_" + new Date().toISOString().slice(0, 10) + ".bts";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ------------------------------------------------------------
// Import
// ------------------------------------------------------------
async function importerProgression(fichier) {
  if (!fichier) return;
  if (!cryptoOK()) {
    alert("L'import n'est pas disponible dans ce contexte (le site doit être ouvert en https).");
    return;
  }
  let p;
  try { p = await dechiffrer(await fichier.text()); }
  catch (e) {
    alert("❌ Fichier illisible ou modifié. Utilise uniquement un fichier exporté depuis ce site.");
    return;
  }
  if (!p || p.v !== 1 || !p.donnees || typeof p.donnees !== "object") {
    alert("❌ Ce fichier n'est pas une sauvegarde valide.");
    return;
  }

  const pf = String(p.pseudo || "Anonyme"), pl = pseudoLocal();
  if (pf !== pl) {
    const ok = confirm(
      "Ce fichier appartient à « " + pf + " », alors que tu es actuellement « " + pl + " ».\n\n" +
      "L'import va REMPLACER ton profil actuel (progression et pseudo) par celui de « " + pf + " ».\n\n" +
      "Continuer ?");
    if (!ok) return;
    remplacer(p.donnees);
    const s = lireJSON(localStorage.getItem("scoresApp"), {});
    s.pseudo = pf;                                   // le pseudo suit toujours le fichier
    localStorage.setItem("scoresApp", JSON.stringify(s));
  } else {
    fusionner(p.donnees);
  }
  alert("✅ Progression importée (profil : " + pf + ").");
  rechargerTout();
}

// Recharge la page principale (index.html qui contient cet iframe).
// 1) rechargement direct de la page parente ;
// 2) si le navigateur le refuse (iframe « sandbox », autre origine...), on lui envoie un
//    message que index.html écoute (voir la ligne à ajouter dans index.html) ;
// 3) sinon, on recharge au moins cette page.
function rechargerTout() {
  if (window.parent === window) { location.reload(); return; }
  try { window.parent.location.reload(); return; } catch (e) { console.warn("reload parent refusé :", e); }
  try { window.parent.postMessage({ type: "bts-recharger" }, "*"); } catch (e) {}
  setTimeout(function () { location.reload(); }, 400);
}

window.rechargerTout = rechargerTout;
window.exporterProgression = exporterProgression;
window.importerProgression = importerProgression;
window._sauvegardeTest = { chiffrer: chiffrer, dechiffrer: dechiffrer, fusionner: fusionner, remplacer: remplacer };
})();
