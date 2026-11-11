
 // =====================
 // PARAMÈTRES
 // =====================
let U = 230; // V
let f = 50;  // Hz

// =====================
// GÉNÉRATION DE VALEURS COHÉRENTES
// =====================

// Courant nominal et facteur de puissance
let courants = [2.1, 2.8, 3.5, 4.2, 5.0, 5.8, 6.5];
let facteurs = [0.68, 0.72, 0.76, 0.80, 0.84];

let I = courants[Math.floor(Math.random() * courants.length)];
let cosphi = facteurs[Math.floor(Math.random() * facteurs.length)];

// Grandeurs électriques calculées à partir de la plaque
let S = U * I;
let P = U * I * cosphi;
let phi = Math.acos(cosphi);
let phiDeg = phi * 180 / Math.PI;
let Q = U * I * Math.sin(phi);

// Puissance utile et rendement réalistes
let rendementsPossibles = [0.65, 0.68, 0.72, 0.75, 0.78, 0.80, 0.82];
let rendementChoisi = rendementsPossibles[
    Math.floor(Math.random() * rendementsPossibles.length)
];

// Puissance utile nominale arrondie aux 10 W
// Elle reste toujours inférieure à la puissance active absorbée.
let Pu = Math.round((P * rendementChoisi) / 10) * 10;

// Rendement réel correspondant aux valeurs affichées
let rendement = Pu / P * 100;

// Arrondis pour les réponses attendues
let Srep = Math.round(S);
let Prep = Math.round(P);
let Qrep = Math.round(Q);
let phirep = Math.round(phiDeg);
let rendementRep = Math.round(rendement);

// =====================
// EXERCICE
// =====================
let theme = "31";
let nomExo = "exo25";

let exo = {
    titre: "Lecture des grandeurs électriques d'une plaque d'un moteur monophasé",

    enonce: `
Un technicien doit relever les caractéristiques électriques d'un moteur monophasé
avant sa mise en service.<br>

<strong>Plaque signalétique du moteur</strong>
<table class="feedback-table">
<tr><th>Grandeur</th><th>Valeur</th></tr>
<tr><td>Tension nominale </td><td> ${U} V </td></tr>
<tr><td>Fréquence nominale </td><td> ${f} Hz </td></tr>
<tr><td>Courant nominal </td><td> ${I.toFixed(1).replace(".", ",")} A </td></tr>
<tr><td>Facteur de puissance </td><td> ${cosphi.toFixed(2).replace(".", ",")} </td></tr>
<tr><td>Puissance utile nominale</td><td> ${Pu} W </td></tr>
</table>

On étudie le moteur à son régime nominal. On assimile son alimentation à une tension sinusoïdale.
`,

    questions: [
        {
            texte: `Relever la tension nominale du moteur sur sa plaque signalétique.`,
            reponse: U,
            unite: "V",
            feedback: `La tension nominale lue sur la plaque est :
            \\(U = ${U}\\ \\text{V}\\).`
        },
        {
            texte: `Calculer la puissance apparente absorbée par le moteur.`,
            reponse: Srep,
            unite: "VA",
            feedback: `En monophasé :
            \\[S = U \\times I\\]
            \\[S = ${U} \\times ${I.toFixed(1)} = ${S.toFixed(0)}\\ \\text{VA}\\]
            Soit environ \\(${Srep}\\ \\text{VA}\\).`
        },
        {
            texte: `Calculer la puissance active absorbée par le moteur.`,
            reponse: Prep,
            unite: "W",
            feedback: `La puissance active absorbée vaut :
            \\[P = U \\times I \\times \\cos\\varphi\\]
            \\[P = ${U} \\times ${I.toFixed(1)} \\times ${cosphi} = ${P.toFixed(1)}\\ \\text{W}\\]
            Soit environ \\(${Prep}\\ \\text{W}\\).`
        },
        {
            texte: `Calculer la puissance réactive absorbée par le moteur.`,
            reponse: Qrep,
            unite: "var",
            feedback: `
            \\[Q = U \\times I \\times \\sin\\varphi\\]
            \\[Q = ${U} \\times ${I.toFixed(1)} \\times \\sin(\\arccos(${cosphi}))\\]
            \\[Q \\approx ${Q.toFixed(1)}\\ \\text{var}\\]
            Soit environ \\(${Qrep}\\ \\text{var}\\).`
        },
        {
            texte: `Déterminer le déphasage \\(\\varphi\\) entre la tension et le courant.`,
            reponse: phirep,
            unite: "°",
            feedback: `Le facteur de puissance vérifie :
            \\[\\cos\\varphi = ${cosphi}\\]
            Donc :
            \\[\\varphi = \\arccos(${cosphi}) \\approx ${phiDeg.toFixed(1)}^\\circ\\]
            Soit environ \\(${phirep}^\\circ\\).`
        },
        {
            texte: `Relever la puissance utile nominale indiquée sur la plaque du moteur.`,
            reponse: Pu,
            unite: "W",
            feedback: `La puissance utile nominale indiquée sur la plaque est :
            \\(P_u = ${Pu}\\ \\text{W}\\).`
        },
        {
            texte: `Calculer le rendement du moteur au régime nominal, en pourcentage.`,
            reponse: rendementRep,
            unite: "%",
            feedback: `Le rendement est le rapport entre la puissance utile et la puissance active absorbée :
            \\[\\eta = \\frac{P_u}{P} \\times 100\\]
            \\[\\eta = \\frac{${Pu}}{${P.toFixed(1)}} \\times 100\\]
            \\[\\eta \\approx ${rendement.toFixed(1)}\\ \\%\\]
            Le rendement est inférieur à 100 %, ce qui est cohérent avec les pertes du moteur.`
        }
    ]
};

// =====================
// LANCEMENT
// =====================
let nbquestion = exo.questions.length;

window.onload = function() {
    genererExercice(exo);
};
