// =====================
// PARAMÈTRES
// =====================

// Nombre d'occupants de la salle
let N = Math.floor(Math.random()*16)+15; // 15 à 30 personnes

// Volume de la salle
let V = Math.floor(Math.random()*151)+150; // 150 à 300 m³

// Section de la gaine de ventilation
let S = Math.round(Math.random()*10+5)/100; // 0.05 à 0.15 m²

// Données de référence (constantes du domaine, fournies dans l'énoncé)
let qCO2 = 0.020;      // m³/h/personne, rejet de CO2 par occupant au repos
let Cext = 400;        // ppm, taux de CO2 dans l'air extérieur
let Cmax = 1000;       // ppm, seuil réglementaire à respecter (décret n°2012-14)
let DebitReg = 25;      // m³/h/personne, débit d'air neuf minimal réglementaire (locaux sans travail physique)

// =====================
// CALCULS
// =====================

let Dtot = N * qCO2;                              // m³/h, débit total de CO2 rejeté
let Qreg = N * DebitReg;                          // m³/h, débit réglementaire minimal
let Qv = Dtot / ((Cmax - Cext) * 1e-6);           // m³/h, débit d'air neuf nécessaire pour respecter Cmax
let taux_brassage = Qv / V;                       // vol/h
let tau_h = V / Qv;                               // h
let tau_min = tau_h * 60;                         // min
let v_gaine = Qv / 3600 / S;                      // m/s

// =====================
// EXERCICE
// =====================

let theme = "42";
let nomExo = "exo8";

let exo = {

titre: "Renouvellement de l'air — débit de ventilation",

enonce: `Une salle de classe de volume \\(V=\\)${V} m³ accueille \\(N=\\)${N} élèves.
Chaque occupant rejette en moyenne \\(q_{CO_2}=\\)${qCO2} m³/h de CO2 (activité au repos).
Le taux de CO2 de l'air extérieur est \\(C_{ext}=\\)${Cext} ppm.
La réglementation impose de ne pas dépasser \\(C_{max}=\\)${Cmax} ppm dans la salle, et fixe un débit d'air neuf
minimal de ${DebitReg} m³/h par personne (locaux sans travail physique).
L'air neuf est amené par une gaine de section \\(S=\\)${S} m².`,

questions:[

// =====================
{
texte:"Calculer le débit total de CO2 rejeté par l'ensemble des occupants",
reponse: Dtot,
unite:"m³/h",
feedback:`\\(D_{tot}=N \\times q_{CO_2}=${arrondi(Dtot)}\\;m^3/h\\)`
},

// =====================
{
texte:"Calculer le débit d'air neuf minimal imposé par la réglementation (25 m³/h par personne)",
reponse: Qreg,
unite:"m³/h",
feedback:`\\(Q_{reg}=N \\times 25=${arrondi(Qreg)}\\;m^3/h\\)`
},

// =====================
{
texte:"Calculer le débit d'air neuf \\(Q_v\\) nécessaire pour que le taux de CO2 ne dépasse pas 1000 ppm à l'équilibre",
reponse: Qv,
unite:"m³/h",
feedback:`À l'équilibre, tout le CO2 rejeté est évacué par l'air neuf :
\\(D_{tot}=Q_v \\times \\dfrac{C_{max}-C_{ext}}{10^6}\\)
donc \\(Q_v=\\dfrac{D_{tot}}{(C_{max}-C_{ext})\\times 10^{-6}}=${arrondi(Qv)}\\;m^3/h\\)`
},

// =====================
{
texte:"Le débit réglementaire minimal (25 m³/h/personne) suffit-il à respecter le seuil de 1000 ppm ? (1=oui, 2=non, il faut un débit plus grand)",
reponse: (Qreg >= Qv) ? 1 : 2,
unite:"",
feedback:`On compare \\(Q_{reg}=${arrondi(Qreg)}\\;m^3/h\\) à \\(Q_v=${arrondi(Qv)}\\;m^3/h\\) calculé précédemment : le débit réglementaire minimal ne suffit pas toujours à garantir 1000 ppm, c'est un plancher, pas un objectif de confort.`
},

// =====================
{
texte:"Calculer le taux de brassage horaire de la salle avec le débit \\(Q_v\\) calculé",
reponse: taux_brassage,
unite:"vol/h",
feedback:`\\(n=\\dfrac{Q_v}{V}=${arrondi(taux_brassage)}\\;vol/h\\).
C'est le nombre de fois où le volume d'air de la salle est renouvelé chaque heure.`
},

// =====================
{
texte:"Calculer la constante de temps de renouvellement d'air de ce local",
reponse: tau_min,
unite:"min",
feedback:`\\(\\tau=\\dfrac{V}{Q_v}=${arrondi(tau_h)}\\;h=${arrondi(tau_min)}\\;min\\).
C'est cette constante de temps qui régit la montée exponentielle du CO2 observée dans le TP sur le C.A 1510.`
},

// =====================
{
texte:"Calculer la vitesse de l'air dans la gaine d'amenée d'air neuf",
reponse: v_gaine,
unite:"m/s",
feedback:`\\(Q_v=v \\times S\\) donc \\(v=\\dfrac{Q_v}{S}=${arrondi(Qv)}\\;m^3/h \\div ${S}\\;m^2\\),
en convertissant en m³/s : \\(v=${arrondi(v_gaine)}\\;m/s\\)`
},

// =====================
{
texte:"Si le débit de ventilation \\(Q_v\\) est doublé (occupation N inchangée), que devient l'écart \\((C_{équilibre}-C_{ext})\\) à l'équilibre ? (1=il double, 2=il est divisé par deux, 3=il ne change pas)",
reponse: 2,
unite:"",
feedback:`\\(D_{tot}=Q_v \\times \\dfrac{\\Delta C}{10^6}\\) est fixé par le nombre d'occupants : si \\(Q_v\\) double, \\(\\Delta C=C_{équilibre}-C_{ext}\\) est divisé par deux.`
},

// =====================
{
texte:"Quel est l'intérêt principal d'une VMC (ventilation mécanique contrôlée) par rapport à une simple ouverture des fenêtres ? (1=un débit constant et maîtrisé, indépendant de la météo, 2=un coût de fonctionnement nul, 3=aucun intérêt particulier)",
reponse: 1,
unite:"",
feedback:`Une VMC assure un débit d'air neuf régulier et maîtrisé toute l'année, alors que l'ouverture des fenêtres dépend du vent, de la température extérieure et de la vigilance des occupants.`
},

// =====================
{
type:"texte",
texte:"Citer un moyen de réduire le débit de ventilation nécessaire sans dégrader la qualité de l'air",
reponse:["réduire le nombre d'occupants","réduire l'occupation","augmenter le volume","limiter l'activité physique","détection de présence","ventilation à la demande"],
feedback:`Exemples : réduire le nombre d'occupants, augmenter le volume de la salle, ou utiliser une ventilation pilotée par un capteur de CO2 (débit adapté à l'occupation réelle).`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};
