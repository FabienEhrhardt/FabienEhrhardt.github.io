
 // =====================
 // PARAMÈTRES ALÉATOIRES
 // =====================

let tensions = [220, 230, 240];
let courants = [4, 5, 6, 8, 10];

let U = tensions[Math.floor(Math.random() * tensions.length)];
let Id = courants[Math.floor(Math.random() * courants.length)];

let f = 50;
let T = 1 / f;
let Tms = T * 1000;

// =====================
// CALCULS
// =====================

// Tension maximale du réseau
let Um = U * Math.sqrt(2);

// Tension moyenne en sortie
let Udc = 2 * Um / Math.PI;

// Courant efficace d'entrée
let Ieff = Id;

// Fondamental du courant d'entrée
let I1max = 4 * Id / Math.PI;
let I1eff = 2 * Math.sqrt(2) * Id / Math.PI;

// Puissance de sortie
let Psortie = Udc * Id;

// Puissance d'entrée
// Le fondamental du courant est en phase avec la tension
let Pentree = U * I1eff;

// Puissance apparente
let S = U * Ieff;

// Facteur de puissance
let Fp = Pentree / S;

// Rendement
let rendement = Psortie / Pentree * 100;

// =====================
// ARRONDIS
// =====================

let UdcRep = Math.round(Udc);
let IeffRep = Math.round(Ieff * 100) / 100;
let I1maxRep = Math.round(I1max * 100) / 100;
let I1effRep = Math.round(I1eff * 100) / 100;
let PsortieRep = Math.round(Psortie);
let PentreeRep = Math.round(Pentree);
let SRep = Math.round(S);
let FpRep = Math.round(Fp * 100) / 100;
let rendementRep = Math.round(rendement);

// =====================
// EXERCICE
// =====================

let theme = "33";
let nomExo = "exo11";

let exo = {

    titre: "Étude d'un redresseur monophasé double alternance",

    enonce: `
Un technicien intervient sur une alimentation industrielle
destinée à alimenter un procédé électrothermique.

L'installation utilise un pont redresseur monophasé à 4 diodes
(Pont de Graëtz). La charge est équipée d'une inductance de lissage
suffisamment importante pour maintenir un courant parfaitement constant.

<br>

<strong>Caractéristiques de l'installation :</strong>

<table class="feedback-table">
<tr><th>Grandeur</th><th>Valeur</th></tr>
<tr><td>Tension efficace du réseau</td><td>${U} V</td></tr>
<tr><td>Fréquence du réseau</td><td>${f} Hz</td></tr>
<tr><td>Courant continu dans la charge</td><td>${Id} A</td></tr>
<tr><td>Redresseur</td><td>Pont de Graëtz monophasé</td></tr>
<tr><td>Composants</td><td>4 diodes idéales</td></tr>
</table>

<br>

<strong>Hypothèses :</strong>

- Les diodes sont idéales.
- Le courant dans la charge est parfaitement constant.
- Les pertes dans le redresseur sont négligées.
- La tension du réseau est sinusoïdale.

<br>

Le technicien souhaite déterminer les caractéristiques électriques
de l'installation côté continu et côté alternatif.

Le graphique représente les formes d'ondes en entrée et en sortie
du redresseur.
`,

    courbe1:{},
	questions: [

        // QUESTION 1
        {
            type: "texte",
            texte: `Quel est le type de montage utilisé pour réaliser le redressement ?`,
            reponse: ["pont de graëtz", "double alternance", "pont redresseur"],
            unite: "",
            feedback: `
            Il s'agit d'un pont de Graëtz monophasé.

            Il est constitué de quatre diodes et permet de redresser
            les deux alternances de la tension alternative.
            `
        },

        // QUESTION 2
        {
            type: "texte",
            texte: `Quelle est la forme du courant absorbé au réseau ?`,
            reponse: ["rectangulaire", "créneau", "alternatif rectangulaire"],
            unite: "",
            feedback: `
            Le courant absorbé au réseau est rectangulaire.

            Il alterne entre +Id et -Id.

            L'inductance de lissage permet de maintenir le courant
            dans la charge constant, tandis que le pont de diodes
            inverse le sens du courant côté réseau à chaque alternance.
            `
        },

        // QUESTION 3
        {
            texte: `Calculer la valeur efficace du courant absorbé au réseau.`,
            reponse: IeffRep,
            unite: "A",
            feedback: `
            Le courant d'entrée est un signal rectangulaire
            qui prend les valeurs +Id et -Id.<br>
			Pour calculer la valeur efficac, on utilise la méthode du cours :
			<ul>
			<li>On trace le carré de la courbe de i réseau. On a alors la valeur constant \\(I_d^2\\)</li>
			<li>On calcule l'aire \\(A=I_d^2 T\\).</li>
			<li>On calcule la valeur efficace \\(I_{entrée,eff}=\\sqrt{\\frac{A}{T}}=\\sqrt{\\frac{I_d^2 T}{T}}=I_d\\)</li>
			</ul>
			

            Sa valeur efficace est égale à la valeur absolue
            du courant de charge :

            \\[I_{entrée,eff} = I_d\\]

            \\[I_{entrée,eff} = ${Id}\\ \\text{A}\\]
            `
        },

        // QUESTION 4
        {
            texte: `La valeur maximale de son fondamental est donnée par la formule : \\(I_{1,max} = \\frac{4 I_d}{\\pi}\\). Calculer la valeur efficace du fondamental du courant absorbé au réseau.`,
            reponse: I1effRep,
            unite: "A",
            feedback: `
            Le courant d'entrée est un signal rectangulaire.

            La valeur maximale de son fondamental est :

            \\[I_{1,max} = \\frac{4 I_d}{\\pi}\\]

            La valeur efficace du fondamental est donc :

            \\[I_{1,eff} = \\frac{4 I_d}{\\pi \\sqrt{2}}\\]

            \\[I_{1,eff} = \\frac{2\\sqrt{2}}{\\pi} \\times ${Id}\\]

            \\[I_{1,eff} \\approx ${I1effRep}\\ \\text{A}\\]

            Attention à bien distinguer la valeur efficace du courant
            total et celle de son fondamental.
            `
        },

        // QUESTION 5
        {
            texte: `Calculer la puissance active délivrée à la charge en sortie du redresseur.`,
            reponse: PsortieRep,
            unite: "W",
            feedback: `
            La puissance active en sortie est le produit
            de la tension moyenne par le courant continu.

            On calcule d'abord la tension moyenne :

            \\[U_{dc} = \\frac{2\\sqrt{2}}{\\pi} U\\]

            \\[U_{dc} \\approx ${UdcRep}\\ \\text{V}\\]

            Puis :

            \\[P_{sortie} = U_{dc} \\times I_d\\]

            \\[P_{sortie} = ${Udc.toFixed(2)} \\times ${Id}\\]

            \\[P_{sortie} \\approx ${PsortieRep}\\ \\text{W}\\]
            `
        },

        // QUESTION 6
        {
            texte: `Calculer la puissance active absorbée au réseau.`,
            reponse: PentreeRep,
            unite: "W",
            feedback: `
            La puissance active est calculée à partir
            de la tension efficace et du fondamental du courant.

            Le fondamental du courant est en phase avec la tension,
            donc son facteur de déplacement vaut 1 (\\(cos \\varphi=1\\).

            \\[P_{entrée} = U \\times I_{1,eff} cos \\varphi \\]

            \\[P_{entrée} = ${U} \\times ${I1eff.toFixed(2)}\\times 1\\]

            \\[P_{entrée} \\approx ${PentreeRep}\\ \\text{W}\\]

            Les harmoniques du courant ne contribuent pas
            à la puissance active dans ce cas.
            `
        },

        // QUESTION 7
        {
            texte: `Calculer la puissance apparente absorbée au réseau.`,
            reponse: SRep,
            unite: "VA",
            feedback: `
            La puissance apparente est le produit
            de la tension efficace par le courant efficace total.

            \\[S = U \\times I_{entrée,eff}\\]

            \\[S = ${U} \\times ${Id}\\]

            \\[S = ${SRep}\\ \\text{VA}\\]
            `
        },

        // QUESTION 8
        {
            texte: `Déterminer le facteur de puissance de l'installation.`,
            reponse: FpRep,
            unite: "",
            feedback: `
            Le facteur de puissance est le rapport
            entre la puissance active et la puissance apparente.

            \\[F_p = \\frac{P_{entrée}}{S}\\]

            \\[F_p = \\frac{${PentreeRep}}{${SRep}}\\]

            \\[F_p \\approx ${FpRep}\\]

            Le facteur de puissance est inférieur à 1
            en raison de la déformation du courant absorbé.

            Le fondamental est pourtant en phase avec la tension !
            `
        },

        // QUESTION 9
        {
            texte: `Calculer le rendement du redresseur.`,
            reponse: rendementRep,
            unite: "%",
            feedback: `
            Le rendement correspond au rapport entre
            la puissance utile en sortie et la puissance absorbée en entrée.

            \\[\\eta = \\frac{P_{sortie}}{P_{entrée}} \\times 100\\]

            \\[\\eta = \\frac{${PsortieRep}}{${PentreeRep}} \\times 100\\]

            \\[\\eta \\approx ${rendementRep}\\ \\%\\]

            Le rendement est de 100 % car les diodes sont considérées
            comme idéales et les pertes sont négligées.
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

    const gauche = 65;
    const droite = W - 20;
    const largeur = droite - gauche;

    // Deux périodes
    const tempsMax = 2 * Tms;

    // Deux zones graphiques
    const haut1 = 35;
    const bas1 = H / 2 - 15;

    const haut2 = H / 2 + 35;
    const bas2 = H - 65;

    const milieu1 = (haut1 + bas1) / 2;
    const milieu2 = (haut2 + bas2) / 2;

    const amplitudeU = Um * 1.2;
    const amplitudeI = Id * 1.5;

    const x = t => gauche + t / tempsMax * largeur;

    const yU = v => milieu1 - v / amplitudeU * (bas1 - haut1) / 2;
    const yI = v => milieu2 - v / amplitudeI * (bas2 - haut2) / 2;

    // =====================
    // GRILLE
    // =====================

    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 1;

    // Graduations temporelles
    for (let i = 0; i <= 4; i++) {

        let xp = gauche + i * largeur / 4;

        ctx.beginPath();
        ctx.moveTo(xp, haut1);
        ctx.lineTo(xp, bas2);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "11px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            (i * tempsMax / 4).toFixed(0),
            xp,
            H - 43
        );
    }

    // Axes zéro
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(gauche, milieu1);
    ctx.lineTo(droite, milieu1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gauche, milieu2);
    ctx.lineTo(droite, milieu2);
    ctx.stroke();

    // Axe vertical
    ctx.beginPath();
    ctx.moveTo(gauche, haut1);
    ctx.lineTo(gauche, bas2);
    ctx.stroke();

    // =====================
    // TITRES
    // =====================

    ctx.fillStyle = "black";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "left";

    ctx.fillText("Tensions", gauche, 20);
    ctx.fillText("Courants", gauche, haut2 - 12);

    ctx.font = "11px Arial";
    ctx.fillText("Temps (ms)", (gauche + droite) / 2, H - 25);

    // =====================
    // FONCTIONS
    // =====================

    function uEntree(t) {
        return Um * Math.sin(2 * Math.PI * f * t / 1000);
    }

    function uSortie(t) {
        return Math.abs(uEntree(t));
    }

    function iEntree(t) {
        return uEntree(t) >= 0 ? Id : -Id;
    }

    function iSortie(t) {
        return Id;
    }

    // =====================
    // TRACÉ COURBES
    // =====================

    function tracerCourbe(fonction, couleur, axeY) {

        ctx.beginPath();
        ctx.strokeStyle = couleur;
        ctx.lineWidth = 2.2;

        for (let i = 0; i <= 1200; i++) {

            let t = tempsMax * i / 1200;
            let xp = x(t);
            let yp = axeY(fonction(t));

            if (i === 0) {
                ctx.moveTo(xp, yp);
            } else {
                ctx.lineTo(xp, yp);
            }
        }

        ctx.stroke();
    }

    // Tensions
    tracerCourbe(uEntree, "#1565c0", yU);
    tracerCourbe(uSortie, "#e53935", yU);

    // Courants
    tracerCourbe(iEntree, "#1565c0", yI);
    tracerCourbe(iSortie, "#e53935", yI);

    // =====================
    // LÉGENDE
    // =====================

    function legende(xp, yp, couleur, texte) {

        ctx.strokeStyle = couleur;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(xp, yp);
        ctx.lineTo(xp + 20, yp);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "11px Arial";
        ctx.textAlign = "left";
        ctx.fillText(texte, xp + 25, yp + 4);
    }

    legende(gauche + 130, 20, "#1565c0", "u réseau");
    legende(gauche + 260, 20, "#e53935", "u sortie");

    legende(gauche + 130, haut2 - 12, "#1565c0", "i réseau");
    legende(gauche + 260, haut2 - 12, "#e53935", "i charge");

}

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload = function() {

    genererExercice(exo);

    tracerRedressement();

};
