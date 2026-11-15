
// =====================
// PARAMÈTRES DU MOTEUR
// =====================

// Moteur à courant continu à excitation indépendante
let U = [160,180,200,220,240][Math.floor(Math.random()*5)];       // Tension d'induit (V)
let Ue = 180;      // Tension d'excitation (V)
let Ie = 0.5;      // Courant d'excitation (A)
let Pu = [500,750,1000,1500,2000,3000,5000][Math.floor(Math.random()*7)];     // Puissance utile (W)
let n =[1000,1250,1500,2000][Math.floor(Math.random()*4)];      // Vitesse de rotation (tr/min)
let rendement = Math.floor(Math.random()*20+60);


// =====================
// CALCULS
// =====================



// Puissance électrique absorbée par l'excitation
let Pe = Ue * Ie;

// Puissance totale absorbée
let Pabs = arrondi(Pu/rendement*100);

// Puissance électrique absorbée par l'induit
let Pa = arrondi(Pabs-Pe);
let Ia = Math.round(Pa/U*10)/10;      // Courant d'induit (A)

// Pertes totales
let pertes = Pabs - Pu;

// Couple utile
let omega = 2 * Math.PI * n / 60;
let couple = Pu / omega;

// Réponses arrondies
let PabsRep = Math.round(Pabs);
let pertesRep = Math.round(pertes);
let rendementRep = Math.round(rendement);
let coupleRep = Math.round(couple * 10) / 10;

// =====================
// EXERCICE
// =====================

let theme = "7";
let nomExo = "exo9";

let exo = {

    titre: "Étude de la plaque signalétique d'un moteur à courant continu",

    enonce: `
Un technicien de maintenance doit remplacer un moteur à courant continu
installé sur un système de convoyage industriel.

Avant de commander un nouveau moteur, il relève les informations
présentes sur la plaque signalétique du moteur existant.

<br>

<strong>Plaque signalétique du moteur</strong>

<table class="feedback-table">
<tr><th>Caractéristique</th><th>Valeur</th></tr>
<tr><td>Type de moteur</td><td>Courant continu à excitation indépendante</td></tr>
<tr><td>Tension nominale d'induit</td><td>${U} V</td></tr>
<tr><td>Courant nominal d'induit</td><td>${Ia.toFixed(1).replace(".", ",")} A</td></tr>
<tr><td>Tension nominale d'excitation</td><td>${Ue} V</td></tr>
<tr><td>Courant nominal d'excitation</td><td>${Ie.toFixed(1).replace(".", ",")} A</td></tr>
<tr><td>Puissance utile nominale</td><td>${Pu} W</td></tr>
<tr><td>Vitesse nominale</td><td>${n} tr/min</td></tr>
</table>

Le moteur fonctionne à son régime nominal.
L'induit et l'enroulement d'excitation sont alimentés par deux sources
continues indépendantes.

Le technicien souhaite vérifier les caractéristiques électriques
et les performances du moteur avant sa remise en service.
`,

    questions: [

        // QUESTION 1
        {
            type:"texte",
			texte: `Quel est le type de moteur étudié ?`,

		reponse: ["excitation indépendante"],

            unite: "",

            feedback: `
            Il s'agit d'un moteur à courant continu à excitation indépendante.
            L'induit et l'enroulement d'excitation sont alimentés
            par deux sources distinctes.
            `
        },

        // QUESTION 2
        {
            texte: `Relever la tension nominale d'alimentation de l'induit.`,

            reponse: U,

            unite: "V",

            feedback: `
            La tension nominale de l'induit est indiquée sur la plaque :

            \\[U = ${U}\\ \\text{V}\\]
            `
        },

        // QUESTION 3
        {
            texte: `Relever le courant nominal traversant l'induit.`,

            reponse: Ia,

            unite: "A",

            feedback: `
            Le courant nominal d'induit est :

            \\[I_a = ${Ia.toFixed(1)}\\ \\text{A}\\]

            Attention : il ne faut pas confondre le courant d'induit
            avec le courant d'excitation.
            `
        },

        // QUESTION 4
        {
            texte: `Quelle est la vitesse de rotation nominale du moteur ?`,

            reponse: n,

            unite: "tr/min",

            feedback: `
            La vitesse nominale indiquée sur la plaque est :

            \\[n = ${n}\\ \\text{tr/min}\\]
            `
        },

        // QUESTION 5
        {
            texte: `Calculer la puissance électrique totale absorbée par le moteur.
            Prendre en compte l'induit et l'excitation.`,

            reponse: PabsRep,

            unite: "W",

            feedback: `
            Le moteur possède deux circuits d'alimentation.

            Puissance absorbée par l'induit :

            \\[P_a = U \\times I_a\\]

            \\[P_a = ${U} \\times ${Ia.toFixed(1)} = ${Pa}\\ \\text{W}\\]

            Puissance absorbée par l'excitation :

            \\[P_e = U_e \\times I_e\\]

            \\[P_e = ${Ue} \\times ${Ie.toFixed(1)} = ${Pe}\\ \\text{W}\\]

            Puissance totale absorbée :

            \\[P_{abs} = P_a + P_e\\]

            \\[P_{abs} = ${Pa} + ${Pe} = ${Pabs}\\ \\text{W}\\]

            Le moteur absorbe donc ${PabsRep} W.
            `
        },

        // QUESTION 6
        {
            texte: `Déterminer les pertes totales du moteur à son régime nominal.`,

            reponse: pertesRep,

            unite: "W",

            feedback: `
            Les pertes correspondent à la différence entre
            la puissance absorbée et la puissance utile.

            \\[P_{pertes} = P_{abs} - P_u\\]

            \\[P_{pertes} = ${Pabs} - ${Pu}\\]

            \\[P_{pertes} = ${pertes}\\ \\text{W}\\]
            `
        },

        // QUESTION 7
        {
            texte: `Calculer le rendement du moteur en pourcentage.`,

            reponse: rendementRep,

            unite: "%",

            feedback: `
            Le rendement correspond au rapport entre
            la puissance utile et la puissance absorbée.

            \\[\\eta = \\frac{P_u}{P_{abs}} \\times 100\\]

            \\[\\eta = \\frac{${Pu}}{${Pabs}} \\times 100\\]

            \\[\\eta = ${rendement.toFixed(1)}\\ \\%\\]

            Le rendement est inférieur à 100 % en raison
            des pertes présentes dans le moteur.
            `
        },

        // QUESTION 8
        {
            texte: `Calculer le couple mécanique utile développé par le moteur
            à sa vitesse nominale.`,

            reponse: coupleRep,

            unite: "N.m",

            feedback: `
            La puissance mécanique utile est liée au couple
            et à la vitesse angulaire par :

            \\[P_u = C_u \\times \\Omega\\]

            On calcule d'abord la vitesse angulaire :

            \\[\\Omega = \\frac{2\\pi n}{60}\\]

            \\[\\Omega = \\frac{2\\pi \\times ${n}}{60}\\]

            \\[\\Omega \\approx ${omega.toFixed(1)}\\ \\text{rad/s}\\]

            On en déduit le couple :

            \\[C_u = \\frac{P_u}{\\Omega}\\]

            \\[C_u = \\frac{${Pu}}{${omega.toFixed(1)}}\\]

            \\[C_u \\approx ${couple.toFixed(2)}\\ \\text{N.m}\\]

            Soit environ ${coupleRep} N.m.
            `
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
