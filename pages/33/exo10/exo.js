
 // =====================
 // PARAMÈTRES
 // =====================

let tensions = [220, 230, 240];
let resistances = [100, 120, 150, 180];

let U = tensions[Math.floor(Math.random() * tensions.length)];
let f = 50;
let R = resistances[Math.floor(Math.random() * resistances.length)];

// =====================
// CALCULS
// =====================

// Période
let T = 1 / f;
let Tms = T * 1000;

// Tension maximale
let Um = U * Math.sqrt(2);

// Courant maximal
let Imax = Um / R;

// Tension moyenne redressée
let Umoy = Um / Math.PI;

// Tension efficace en sortie
let UeffSortie = Um / 2;

// Courant moyen
let Imoy = Umoy / R;

let P=Umoy*Umoy/R;

// Arrondis
let UmRep = Math.round(Um);
let ImaxRep = Math.round(Imax * 100) / 100;
let UmoyRep = Math.round(Umoy);
let UeffSortieRep = Math.round(UeffSortie);

// =====================
// EXERCICE
// =====================

let theme = "33";
let nomExo = "exo10";

let exo = {

    titre: "Étude d'un redresseur monophasé simple alternance",

    enonce: `
Un technicien de maintenance doit contrôler une alimentation
continue installée sur une petite machine industrielle.

Cette alimentation est constituée d'un redresseur monophasé
simple alternance alimentant une résistance.

<br>

<strong>Caractéristiques de l'installation :</strong>

<table class="feedback-table">
<tr><th>Grandeur</th><th>Valeur</th></tr>
<tr><td>Tension efficace d'entrée</td><td>${U} V</td></tr>
<tr><td>Fréquence du réseau</td><td>${f} Hz</td></tr>
<tr><td>Résistance de charge</td><td>${R} Ω</td></tr>
<tr><td>Type de redressement</td><td>Simple alternance</td></tr>
<tr><td>Composant de redressement</td><td>Diode idéale</td></tr>
</table>

La charge est purement résistive. On néglige les pertes dans la diode.

<br>

<strong>Observation des formes d'ondes :</strong>

Le graphique ci-dessous représente les tensions à l'entrée,
aux bornes de la charge et aux bornes de la diode.

On prendra comme convention pour la diode :
\\(u_D = u_A - u_K\\), où A désigne l'anode et K la cathode.
`,
	courbe1:{},
    questions: [

        // QUESTION 1
        {
            type: "texte",
            texte: `Quel est le type de redressement réalisé par cette installation ?`,
            reponse: ["simple alternance", "monoalternance"],
            unite: "",
            feedback: `
            Il s'agit d'un redressement monophasé simple alternance.

            Une seule alternance de la tension d'entrée est conservée
            en sortie grâce à la diode.
            `
        },

        // QUESTION 2
        {
            type: "texte",
            texte: `Quel composant électronique permet de réaliser le redressement ?`,
            reponse: ["diode"],
            unite: "",
            feedback: `
            Le redressement est réalisé à l'aide d'une diode.

            Elle laisse passer le courant dans un seul sens
            et bloque le courant dans le sens opposé.
            `
        },

        // QUESTION 3
        {
            texte: `Relever la tension efficace du réseau d'alimentation.`,
            reponse: U,
            unite: "V",
            feedback: `
            La tension efficace d'entrée est indiquée dans les caractéristiques
            de l'installation :

            \\[U = ${U}\\ \\text{V}\\]
            `
        },

        // QUESTION 4
        {
            texte: `Calculer la période du signal d'entrée.`,
            reponse: Tms,
            unite: "ms",
            feedback: `
            La période est l'inverse de la fréquence :

            \\[T = \\frac{1}{f}\\]

            \\[T = \\frac{1}{${f}} = ${T}\\ \\text{s}\\]

            Soit :

            \\[T = ${Tms}\\ \\text{ms}\\]
            `
        },

        // QUESTION 5
        {
            texte: `Calculer la valeur maximale de la tension sinusoïdale d'entrée.`,
            reponse: UmRep,
            unite: "V",
            feedback: `
            Pour une tension sinusoïdale :

            \\[U_m = U \\times \\sqrt{2}\\]

            \\[U_m = ${U} \\times \\sqrt{2}\\]

            \\[U_m \\approx ${Um.toFixed(1)}\\ \\text{V}\\]

            Soit ${UmRep} V.
            `
        },

        // QUESTION 6
        {
            texte: `Déterminer le courant maximal traversant la résistance de charge.`,
            reponse: ImaxRep,
            unite: "A",
            feedback: `
            On applique la loi d'Ohm :

            \\[I_{max} = \\frac{U_m}{R}\\]

            \\[I_{max} = \\frac{${UmRep}}{${R}}\\]

            \\[I_{max} \\approx ${Imax.toFixed(2)}\\ \\text{A}\\]
            `
        },

        // QUESTION 7
        {
            texte: `Pour un redressement simple alternance : \\(U_{moy} = \\frac{U_m}{\\pi}\\). Calculer la valeur moyenne de la tension redressée en sortie.`,
            reponse: UmoyRep,
            unite: "V",
            feedback: `
            Pour un redressement simple alternance :

            \\[U_{moy} = \\frac{U_m}{\\pi}\\]

            \\[U_{moy} = \\frac{${Um.toFixed(1)}}{\\pi}\\]

            \\[U_{moy} \\approx ${Umoy.toFixed(1)}\\ \\text{V}\\]

            Soit ${UmoyRep} V.
            `
        },
		// QUESTION 2
        {
            type: "texte",
            texte: `Quel est le type de tension sur la résistance?`,
            reponse: ["continu","DC"],
            unite: "",
            feedback: `
            La tension possède une valeur moyenne non nulle. La tension est donc continue.
            `
        },

        // QUESTION 8
        {
            texte: `Calculer la valeur moyenne du courant dans la résistance.`,
            reponse: Imoy,
            unite: "A",
            feedback: `
            On utilise la loi d'Ohm :
			\\[I_{moy} = \\frac{U_{moy}}{R}\\]

            \\[I_{moy} = \\frac{${Umoy.toFixed(1)}}{${R}}\\]

            \\[I_{moy} \\approx ${Imoy.toFixed(1)}\\ \\text{A}\\]
            `
        },
		
		// QUESTION 8
        {
            texte: `Calculer la puissance consommée dans la charge.`,
            reponse: P,
            unite: "W",
            feedback: `
            La puissance en continue est donnée par la formule :
			\\[P=I_{moy}U_{moy}\\]

            \\[P = ${Imoy.toFixed(1)} \\times ${Umoy.toFixed(1)}\\]

            \\[P \\approx ${P.toFixed(1)}\\ \\text{W}\\]
            `
        },

        // QUESTION 9
        {
            type: "texte",
            texte: `Que fait la diode pendant l'alternance négative de la tension d'entrée ?`,
            reponse: ["bloquée", "bloque", "passante inversée"],
            unite: "",
            feedback: `
            Pendant l'alternance négative, la diode est polarisée en inverse.

            Elle est donc bloquée et aucun courant ne circule dans la charge.

            La tension de sortie est alors nulle.
            `
        }

    ]
};

// =====================
// TRACÉ DES FORMES D'ONDES
// =====================

function tracerRedressement() {

    const canvas = document.getElementById("graph");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Zone graphique
    const gauche = 65;
    const droite = W - 25;
    const haut = 45;
    const bas = H - 75;

    const largeur = droite - gauche;
    const hauteur = bas - haut;

    const tempsMax = 2 * Tms;
    const tensionMax = Um * 1.2;

    const x = t => gauche + t / tempsMax * largeur;
    const y = v => haut + hauteur / 2 - v / tensionMax * hauteur / 2;

    // =====================
    // GRILLE
    // =====================

    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {

        let xp = gauche + i * largeur / 4;

        ctx.beginPath();
        ctx.moveTo(xp, haut);
        ctx.lineTo(xp, bas);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText((i * tempsMax / 4).toFixed(0), xp, bas + 18);
    }

    for (let i = -1; i <= 1; i++) {

        let yp = y(i * Um);

        ctx.beginPath();
        ctx.moveTo(gauche, yp);
        ctx.lineTo(droite, yp);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.fillText((i * Um).toFixed(0), gauche - 8, yp + 4);
    }

    // =====================
    // AXES
    // =====================

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(gauche, haut);
    ctx.lineTo(gauche, bas);
    ctx.lineTo(droite, bas);
    ctx.stroke();

    // Axe horizontal à 0 V
    ctx.beginPath();
    ctx.moveTo(gauche, y(0));
    ctx.lineTo(droite, y(0));
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Temps (ms)", (gauche + droite) / 2, H - 8);

    ctx.save();
    ctx.translate(17, (haut + bas) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Tension (V)", 0, 0);
    ctx.restore();

    // =====================
    // TRACÉ DES COURBES
    // =====================

    function tracerCourbe(fonction, couleur) {

        ctx.beginPath();
        ctx.strokeStyle = couleur;
        ctx.lineWidth = 2.5;

        let premier = true;

        for (let i = 0; i <= 1000; i++) {

            let t = tempsMax * i / 1000;

            let v = fonction(t);

            let xp = x(t);
            let yp = y(v);

            if (premier) {
                ctx.moveTo(xp, yp);
                premier = false;
            } else {
                ctx.lineTo(xp, yp);
            }
        }

        ctx.stroke();
    }

    // Tension d'entrée
    function uEntree(t) {
        return Um * Math.sin(2 * Math.PI * f * t / 1000);
    }

    // Tension aux bornes de la charge
    function uSortie(t) {
        return Math.max(0, uEntree(t));
    }

    // Tension aux bornes de la diode (anode - cathode)
    function uDiode(t) {
        return uEntree(t) - uSortie(t);
    }

    // Courbes
    tracerCourbe(uEntree, "#1565c0");
    tracerCourbe(uSortie, "#e53935");
    tracerCourbe(uDiode, "#2e7d32");

    // =====================
    // LÉGENDE
    // =====================

    const legende = [
        { nom: "Entrée u(t)", couleur: "#1565c0" },
        { nom: "Sortie uR(t)", couleur: "#e53935" },
        { nom: "Diode uD(t)", couleur: "#2e7d32" }
    ];

    ctx.font = "12px Arial";
    ctx.textAlign = "left";

    let position = gauche;

    legende.forEach(item => {

        ctx.strokeStyle = item.couleur;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(position, H - 38);
        ctx.lineTo(position + 20, H - 38);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.fillText(item.nom, position + 25, H - 34);

        position += 165;
    });

}

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload = function() {

    genererExercice(exo);

    tracerRedressement();

};
