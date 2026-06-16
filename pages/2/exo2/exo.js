// =====================
// PARAMÈTRES ALÉATOIRES
// =====================

// Contexte industriel varié
let contexteTab = [
    {
        systeme: "four industriel",
        entree: "puissance de chauffe",
        sortie: "température",
        uniteY: "°C",
        uniteU: "kW",
        symboleY: "T",
        symboleU: "P"
    },
    {
        systeme: "réservoir hydraulique",
        entree: "débit d'entrée",
        sortie: "niveau",
        uniteY: "cm",
        uniteU: "L/min",
        symboleY: "h",
        symboleU: "Q"
    },
    {
        systeme: "moteur à courant continu",
        entree: "tension d'alimentation",
        sortie: "vitesse de rotation",
        uniteY: "tr/min",
        uniteU: "V",
        symboleY: "n",
        symboleU: "U"
    },
    {
        systeme: "échangeur thermique",
        entree: "débit de fluide chaud",
        sortie: "température de sortie",
        uniteY: "°C",
        uniteU: "L/min",
        symboleY: "T",
        symboleU: "Q"
    }
];

let ctx_idx = Math.floor(Math.random() * contexteTab.length);
let ctx_sys = contexteTab[ctx_idx];

// Valeur initiale (régime permanent avant échelon)
let Y0tab = [20, 15, 0, 25, 10];
let Y0 = Y0tab[Math.floor(Math.random() * Y0tab.length)];

// Gain statique K (entier simple)
let Ktab = [2, 3, 4, 5, 2.5];
let K = Ktab[Math.floor(Math.random() * Ktab.length)];

// Amplitude de l'échelon
let dUtab = [10, 20, 30, 40, 50];
let dU = dUtab[Math.floor(Math.random() * dUtab.length)];

// Constante de temps τ (en secondes)
let tauTab = [20, 30, 40, 50, 60];
let tau = tauTab[Math.floor(Math.random() * tauTab.length)];

// Retard pur Tr (en secondes) — Broïda utilise Tr et τ
let TrTab = [5, 8, 10, 12, 15];
let Tr = TrTab[Math.floor(Math.random() * TrTab.length)];

// =====================
// CALCULS
// =====================

// Valeur finale en régime permanent
let Yinfini = arrondi(Y0 + K * dU, 1);

// Valeur de l'échelon de sortie total
let dY = arrondi(K * dU, 1);

// Méthode de Broïda :
// On relève t1 (instant où y atteint 28% de la variation) et t2 (à 40%)
// τ = 5.5 * (t2 - t1)
// Tr = 2.8*t1 - 1.8*t2

// Calcul de t1 et t2 à partir de τ et Tr connus
// Pour un 1er ordre avec retard : y(t) = Y0 + dY*(1 - exp(-(t-Tr)/tau)) pour t > Tr
// 28% → t1 : Y0 + 0.28*dY = Y0 + dY*(1-exp(-(t1-Tr)/tau))
//   → 0.28 = 1 - exp(-(t1-Tr)/tau)  → t1 = Tr - tau*ln(0.72)
// 40% → t2 : t2 = Tr - tau*ln(0.60)

let t1 = arrondi(Tr - tau * Math.log(0.72), 1);
let t2 = arrondi(Tr - tau * Math.log(0.60), 1);

// Vérification inversée (ce que l'élève doit retrouver)
let tau_broida = arrondi(5.5 * (t2 - t1), 1);
let Tr_broida  = arrondi(2.8 * t1 - 1.8 * t2, 1);

// Valeurs à 28% et 40% de la variation (pour lecture graphique)
let Y_28 = arrondi(Y0 + 0.28 * dY, 1);
let Y_40 = arrondi(Y0 + 0.40 * dY, 1);

// Valeur à 95% (temps de réponse à 5%)
let tr5 = arrondi(Tr_broida + 3 * tau_broida, 1);
let Y_95 = arrondi(Y0 + 0.95 * dY, 1);

// Échelle graphique
let xmax = arrondi(Math.max(tr5 * 1.4, Tr * 2 + tau * 5), 0);
let ymax1 = arrondi(superarrondi((Yinfini - Y0) * 1.3 + Y0), 0);
let ymax2 = 1; // inutilisé

// =====================
// CANVAS — Courbe de réponse
// =====================

function tracerReponseBroida(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx2 = canvas.getContext("2d");

    // Réinitialisation via initialisationGraph (type 2 = origine en bas)
    initialisationGraph(canvasId, 2);
    tracerEcran(canvasId);

    // Courbe de réponse y(t)
    tracerCourbe(
        canvasId,
        function(t) {
            if (t < Tr) return Y0;
            return Y0 + dY * (1 - Math.exp(-(t - Tr) / tau));
        },
        `${ctx_sys.symboleY}(t) [${ctx_sys.uniteY}]`,
        "#1f3c88",
        1
    );

    // Ligne horizontale valeur finale
    tracerHorizontale(canvasId, Yinfini, 1, "#999");

    // Points clés Broïda (affichés progressivement via actions)
}

function afficherPoint28(canvasId) {
    tracerPoint(canvasId, t1, Y_28, `t₁=${t1}s`, 1, "#e74c3c");
    tracerVerticale(canvasId, t1, 1, "#e74c3c");
    tracerHorizontale(canvasId, Y_28, 1, "#e74c3c");
}

function afficherPoint40(canvasId) {
    tracerPoint(canvasId, t2, Y_40, `t₂=${t2}s`, 1, "#e67e22");
    tracerVerticale(canvasId, t2, 1, "#e67e22");
    tracerHorizontale(canvasId, Y_40, 1, "#e67e22");
}

function afficherTr5(canvasId) {
    tracerVerticale(canvasId, tr5, 1, "#27ae60");

    const canvas = document.getElementById(canvasId);
    const ctx2 = canvas.getContext("2d");
    ctx2.fillStyle = "#27ae60";
    ctx2.font = "13px Arial";
    ctx2.textAlign = "left";
    ctx2.fillText(`tr5% = ${tr5} s`, ox + tr5 * scaleX + 5, oy - Y_95 * scaleY1 - 10);
}

// =====================
// EXERCICE
// =====================

let theme = "2";
let nomExo = "exo2";

let exo = {

titre: "Identification d'un système par la méthode de Broïda",

enonce: `Un ${ctx_sys.systeme} industriel est soumis à un échelon de ${ctx_sys.entree} de \\(${dU}~${ctx_sys.uniteU}\\) à \\(t = 0\\).<br><br>
La ${ctx_sys.sortie} (${ctx_sys.symboleY}) est enregistrée et représentée sur le graphe ci-dessous.<br><br>
Avant l'échelon, le système est en régime permanent : \\(${ctx_sys.symboleY}_0 = ${Y0}~${ctx_sys.uniteY}\\).<br>
Après stabilisation, la valeur finale est : \\(${ctx_sys.symboleY}_\\infty = ${Yinfini}~${ctx_sys.uniteY}\\).<br><br>
L'objectif est d'identifier le modèle du premier ordre avec retard de ce système par la <b>méthode de Broïda</b>.<br><br>
<b>Rappel — Méthode de Broïda :</b><br>
On relève sur la courbe les instants \\(t_1\\) et \\(t_2\\) tels que :<br>
\\(${ctx_sys.symboleY}(t_1) = ${ctx_sys.symboleY}_0 + 0{,}28 \\cdot \\Delta ${ctx_sys.symboleY}\\) &nbsp;et&nbsp; \\(${ctx_sys.symboleY}(t_2) = ${ctx_sys.symboleY}_0 + 0{,}40 \\cdot \\Delta ${ctx_sys.symboleY}\\)<br><br>
Puis on applique :<br>
\\[\\tau = 5{,}5\\,(t_2 - t_1) \\qquad T_r = 2{,}8\\,t_1 - 1{,}8\\,t_2\\]`,

courbe1: {
    Nom: `${ctx_sys.symboleY}(t) [${ctx_sys.uniteY}]`,
    axeX: "Temps (s)",
    axeY: `${ctx_sys.symboleY} [${ctx_sys.uniteY}]`
},

questions: [

// =====================
{
texte: `Calculer la variation totale \\(\\Delta ${ctx_sys.symboleY} = ${ctx_sys.symboleY}_\\infty - ${ctx_sys.symboleY}_0\\).`,
reponse: dY,
unite: ctx_sys.uniteY,
feedback: `\\(\\Delta ${ctx_sys.symboleY} = ${Yinfini} - ${Y0} = ${dY}~${ctx_sys.uniteY}\\)`
},

// =====================
{
texte: `Calculer le gain statique \\(K = \\dfrac{\\Delta ${ctx_sys.symboleY}}{\\Delta ${ctx_sys.symboleU}}\\).`,
reponse: K,
unite: `${ctx_sys.uniteY}/${ctx_sys.uniteU}`,
feedback: `\\(K = \\dfrac{\\Delta ${ctx_sys.symboleY}}{\\Delta ${ctx_sys.symboleU}} = \\dfrac{${dY}}{${dU}} = ${K}~${ctx_sys.uniteY}/${ctx_sys.uniteU}\\)<br>
Le gain statique traduit la sensibilité du système : une variation de \\(1~${ctx_sys.uniteU}\\) provoque une variation de \\(${K}~${ctx_sys.uniteY}\\) en régime permanent.`
},

// =====================
{
texte: `Calculer la valeur de ${ctx_sys.symboleY} correspondant à 28% de la variation (\\(${ctx_sys.symboleY}_0 + 0{,}28 \\cdot \\Delta ${ctx_sys.symboleY}\\)).`,
reponse: Y_28,
unite: ctx_sys.uniteY,
feedback: `\\(${ctx_sys.symboleY}(t_1) = ${Y0} + 0{,}28 \\times ${dY} = ${Y_28}~${ctx_sys.uniteY}\\)<br>
C'est le premier point clé de la méthode de Broïda.`,
action: function() {
    afficherPoint28("graph");
}
},

// =====================
{
texte: `Calculer la valeur de ${ctx_sys.symboleY} correspondant à 40% de la variation (\\(${ctx_sys.symboleY}_0 + 0{,}40 \\cdot \\Delta ${ctx_sys.symboleY}\\)).`,
reponse: Y_40,
unite: ctx_sys.uniteY,
feedback: `\\(${ctx_sys.symboleY}(t_2) = ${Y0} + 0{,}40 \\times ${dY} = ${Y_40}~${ctx_sys.uniteY}\\)<br>
C'est le second point clé de la méthode de Broïda.`,
action: function() {
    afficherPoint40("graph");
}
},

// =====================
{
texte: `Sur le graphe, relevez l'instant \\(t_1\\) (correspondant à 28% de la variation). Entrez la valeur lue.`,
reponse: t1,
tolerance: 0.08,
unite: "s",
feedback: `\\(t_1 = ${t1}~s\\)<br>
On lit l'abscisse du point d'intersection entre la courbe et la droite horizontale à \\(${Y_28}~${ctx_sys.uniteY}\\).`
},

// =====================
{
texte: `Sur le graphe, relevez l'instant \\(t_2\\) (correspondant à 40% de la variation). Entrez la valeur lue.`,
reponse: t2,
tolerance: 0.08,
unite: "s",
feedback: `\\(t_2 = ${t2}~s\\)<br>
On lit l'abscisse du point d'intersection entre la courbe et la droite horizontale à \\(${Y_40}~${ctx_sys.uniteY}\\).`
},

// =====================
{
texte: `Appliquer la formule de Broïda pour calculer la constante de temps \\(\\tau = 5{,}5\\,(t_2 - t_1)\\).`,
reponse: tau_broida,
unite: "s",
feedback: `\\(\\tau = 5{,}5 \\times (${t2} - ${t1}) = 5{,}5 \\times ${arrondi(t2-t1,1)} = ${tau_broida}~s\\)<br>
La constante de temps caractérise la vitesse de réponse du système : au bout de \\(\\tau\\), le système a réalisé 63% de sa variation totale.`
},

// =====================
{
texte: `Appliquer la formule de Broïda pour calculer le retard pur \\(T_r = 2{,}8\\,t_1 - 1{,}8\\,t_2\\).`,
reponse: Tr_broida,
unite: "s",
feedback: `\\(T_r = 2{,}8 \\times ${t1} - 1{,}8 \\times ${t2} = ${arrondi(2.8*t1,1)} - ${arrondi(1.8*t2,1)} = ${Tr_broida}~s\\)<br>
Le retard pur représente le temps mort avant que le système ne commence à réagir à l'échelon.`
},

// =====================
{
texte: `Écrire la fonction de transfert du système identifié sous la forme \\(H(p) = \\dfrac{K}{1 + \\tau p} \\cdot e^{-T_r p}\\). Quelle est la valeur du numérateur ?`,
reponse: K,
unite: `${ctx_sys.uniteY}/${ctx_sys.uniteU}`,
feedback: `\\(H(p) = \\dfrac{${K}}{1 + ${tau_broida}\\,p} \\cdot e^{-${Tr_broida}\\,p}\\)<br><br>
Le modèle complet identifié est :<br>
\\(K = ${K}\\) — gain statique<br>
\\(\\tau = ${tau_broida}~s\\) — constante de temps<br>
\\(T_r = ${Tr_broida}~s\\) — retard pur`
},

// =====================
{
texte: `Calculer le temps de réponse à 5% : \\(t_{r5\\%} = T_r + 3\\tau\\).`,
reponse: tr5,
unite: "s",
feedback: `\\(t_{r5\\%} = T_r + 3\\tau = ${Tr_broida} + 3 \\times ${tau_broida} = ${Tr_broida} + ${arrondi(3*tau_broida,1)} = ${tr5}~s\\)<br>
Au bout de \\(t_{r5\\%}\\), la sortie est à moins de 5% de sa valeur finale.`,
action: function() {
    afficherTr5("graph");
}
},

// =====================
{
type: "texte",
texte: "Quel est l'intérêt du modèle de Broïda par rapport à un simple modèle du premier ordre sans retard ?",
reponse: [
    "retard",
    "temps mort",
    "réel",
    "plus précis",
    "délai",
    "représentatif"
],
feedback: `Le modèle de Broïda (1er ordre + retard pur) est plus représentatif des systèmes industriels réels. Le retard pur \\(T_r\\) modélise les phénomènes de transport ou de réponse différée (inertie thermique, distance capteur/actionneur, temps de traitement). Il est essentiel pour le réglage des correcteurs PI/PID.`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload = function() {
    genererExercice(exo);
    tracerReponseBroida("graph");
};