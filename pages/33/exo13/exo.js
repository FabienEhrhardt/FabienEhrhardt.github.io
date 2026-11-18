
let theme = "33";
let nomExo = "exo13";

// =====================
// PARAMÈTRES ALÉATOIRES
// =====================

let tensions = [24, 36, 48];
let courants = [-6,-5,-4,-3,3, 4, 5, 6];
let periodes = [100, 200, 250];
let alphas=[0.2,0.3,0.4,0.6,0.7,0.9];

let U = tensions[Math.floor(Math.random() * tensions.length)];
let I = courants[Math.floor(Math.random() * courants.length)];
let Tmicro = periodes[Math.floor(Math.random() * periodes.length)];


let courantMoyen = I;
let ondulation = 0.8 + Math.random() * 0.6;
ondulation = Math.round(ondulation * 10) / 10;

let Imin = I - ondulation / 2;
let Imax = I+ ondulation / 2;

// Rapport cyclique : la tension prend principalement la polarité du courant
let alpha = alphas[Math.floor(Math.random() * alphas.length)];
let Ton = alpha * Tmicro;
let Toff = Tmicro - Ton;

let Umoy = (2*alpha-1) * U;
let IminRep = Math.round(Imin * 10) / 10;
let ImaxRep = Math.round(Imax * 10) / 10;
let P=Umoy*I;

// =====================
// EXERCICE
// =====================

let exo = {
    titre: "Étude d'un hacheur quatre quadrants alimentant un moteur à courant continu",

    courbe1:{},
	enonce: `
Un moteur à courant continu est alimenté par un hacheur quatre quadrants.
Ce convertisseur permet de commander le moteur dans les deux sens de rotation
et de gérer les phases de freinage.

On étudie ici un fonctionnement dans lequel le courant de sortie conserve
toujours le même signe.

La tension d'alimentation du hacheur vaut ${U} V.
La période de découpage vaut ${Tmicro} µs.

Les courbes présentent plusieurs périodes de fonctionnement.
Les échelles sont indiquées sur les graphiques.
<canvas id="schema" width="440" height="300"
        style="display:block; width:100%; max-width:600px; height:auto;
        border:1px solid #cccccc; margin:15px auto;">
    </canvas>
`,

    questions: [

        {
            type: "texte",
            texte: `Quel est le nom du convertisseur étudié ?`,
            reponse: ["hacheur quatre quadrants", "hacheur 4 quadrants", "quatre quadrants", "4 quadrants"],
            unite: "",
            feedback: `Il s'agit d'un hacheur quatre quadrants. Il permet de commander
            la tension et le courant dans les deux sens.`
        },

        {
            texte: `Relever la valeur de la tension d'alimentation du hacheur.`,
            reponse: U,
            unite: "V",
            feedback: `La tension d'alimentation vaut ${U} V.`
        },

        {
            texte: `Relever la valeur maximale de la tension de sortie \\(u\\).`,
            reponse: U,
            unite: "V",
            feedback: `La tension de sortie atteint la valeur maximale de ${U} V
            en valeur absolue.`
        },

        {
            texte: `Déterminer la période de découpage \\(T\\) à partir du graphique.`,
            reponse: Tmicro,
            unite: "µs",
            feedback: `La période correspond à la durée d'un cycle complet.
            On mesure ${Tmicro} µs.`
        },

        {
            texte: `Relever la valeur moyenne du courant de sortie \\(i\\).`,
            reponse: courantMoyen,
            unite: "A",
            feedback: `Le courant moyen est de ${courantMoyen} A.
            Le signe indique le sens du courant dans la charge.`
        },

        {
            texte: `Relever la valeur maximale du courant de sortie en valeur absolue.`,
            reponse: Math.max(Math.abs(Imin), Math.abs(Imax)),
            unite: "A",
            feedback: `La valeur maximale en valeur absolue est
            ${Math.max(Math.abs(Imin), Math.abs(Imax)).toFixed(1)} A.`
        },

        {
            texte: `Mesurer l'ondulation du courant \\(\\Delta i\\) sur le graphique.`,
            reponse: ondulation,
            unite: "A",
            feedback: `L'ondulation est l'écart entre les deux extrêmes du courant :

            \\[\\Delta i = |I_{max}-I_{min}|\\]

            On trouve ${ondulation} A.`
        },

		{
            type: "texte",
            texte: `Indiquer le signe de la valeur moyenne du courant.`,
            reponse: I < 0 ? ["négatif","négative"] : ["positif","positive"],
            unite: "",
            feedback: I < 0 ? "La valeur moyenne du courant est négative." : "La valeur moyenne du courant est positive."
        },
		{
            type: "texte",
            texte: `Indiquer le signe de la valeur moyenne de la tension.`,
            reponse: alpha < 0.5 ? ["négatif","négative"] : ["positif","positive"],
            unite: "",
            feedback: alpha < 0.5 ? "La valeur moyenne de la tension est négative car on est plus longtemps dans le négatif." : "La valeur moyenne de la tension est positive car on est plus longtemps dans le positif."
        },
		{
            type: "texte",
            texte: `Le moteur fonctionne-t-il en moteur ou en générateur?`,
            reponse: P < 0 ? ["générateur"] : ["moteur"],
            unite: "",
            feedback: P < 0 ? `On regarde le signe de la puissance qu'on calcule avec la formule \\(P=U_{moy}I_{moy}\\). Ici le fonctionnement est générateur` : `On regarde le signe de la puissance qu'on calcule avec la formule \\(P=U_{moy}I_{moy}\\). Ici le fonctionnement est moteur`
        },
		{
            type: "texte",
            texte: `Indiquer les composants passants sur l'intervalle 0-\\(\\alpha T\\).`,
            reponse: I < 0 ? ["D1D4", "D1 D4", "D4 D1"] : ["T1T4", "T1 T4", "T4 T1"],
            unite: "",
            feedback: "On regarde le sens du courant en passant par les interrupteurs 1 et 4 car on est de 0 à \\(\\alpha T\\). Si I<0 on passe par D1 D4 et si I>0 on passe par T1 T4."
        },
		{
            type: "texte",
            texte: `Indiquer les composants passants sur l'intervalle \\(\\alpha T\\) à \\(T\\).`,
            reponse: I < 0 ? ["T2T3", "T2 T3","T3 T2"] : ["D2D3", "D2 D3", "D3 D2"],
            unite: "",
            feedback: "On regarde le sens du courant en passant par les interrupteurs 2 et 3 car on est de \\(\\alpha T\\) à \\(T\\). Si I<0 on passe par T2 T3 et si I>0 on passe par D2 D3."
        }

    ]
};

let nbquestion = exo.questions.length;

// =====================
// TRACÉ DES GRAPHIQUES
// =====================

function tracerSchema() {

    const canvas = document.getElementById("schema");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
	let p,p1;
	let x0=50;
	let y0=100;
	p=SourceV("schema",'E',x0,y0,90,'black',true,true);
	p=Fil("schema",p.x,p.y,90,'black',i=false);
	p=Fil("schema",p.x,p.y,0,'black',i=false);
	p=Diode("schema","D2",p.x,p.y,-90,'black');
	p=Fil("schema",p.x,p.y,-90,'black',i=false);
	p=Diode("schema","D1",p.x,p.y,-90,'black');
	p1=Fil("schema",p.x,p.y,180,'black',i=false);
	p1=Fil("schema",p1.x,p1.y,90,'black',i=false);
	
	p=Fil("schema",p.x,p.y,0,'black',i=false);
	p1=p;
	p=IGBT("schema","T1",p.x,p.y,90,'black');
	p=Fil("schema",p.x,p.y,90,'black',i=false);
	p=IGBT("schema","T2",p.x,p.y,90,'black');
	Fil("schema",p.x,p.y,180,'black',i=false);
	
	p=Fil("schema",p1.x,p1.y,0,'black',i=false);
	p=Fil("schema",p.x,p.y,0,'black',i=false);
	p=IGBT("schema","T3",p.x,p.y,90,'black');
	p=Fil("schema",p.x,p.y,90,'black',i=false);
	p=IGBT("schema","T4",p.x,p.y,90,'black');
	p=Fil("schema",p.x,p.y,180,'black',i=false);
	p1=p;
	p=Diode("schema","D4",p.x,p.y,-90,'black');
	p=Fil("schema",p.x,p.y,-90,'black',i=false);
	p=Diode("schema","D3",p.x,p.y,-90,'black');
	p1=Fil("schema",p1.x,p1.y,180,'black',i=false);
	p1=Fil("schema",p1.x,p1.y,180,'black',i=false);
	p1=Fil("schema",p1.x,(p1.y+p.y)/2,0,'black',i=false);
	p=MoteurDC("schema",'',p1.x,p1.y,0,'black',true,true);
	p1=Fil("schema",p1.x+80,p1.y,0,'black',i=false);	
	
	
	
}

function tracerHacheur4Q() {

    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    let x0 = 65;
    let x1 = W - 20;
    let largeur = x1 - x0;

    let hautU = 35;
    let basU = 180;

    let hautI = 235;
    let basI = 370;

    let tMax = 2 * Tmicro;
    let sx = largeur / tMax;

    // Échelles verticales
    let pasU = 10;
    let Umax = Math.ceil(U / pasU) * pasU + 10;

    let pasI = 1;
    let ImaxGraph = Math.ceil(Math.max(Math.abs(Imin), Math.abs(Imax)) + 1);

    let syU = (basU - hautU) / (2 * Umax);
    let syI = (basI - hautI) / (2 * ImaxGraph);

    let milieuU = (hautU + basU) / 2;
    let milieuI = (hautI + basI) / 2;

    function xPixel(t) {
        return x0 + t * sx;
    }

    function yU(val) {
        return milieuU - val * syU;
    }

    function yI(val) {
        return milieuI - val * syI;
    }

    function ligne(xa, ya, xb, yb, couleur, ep = 1) {
        ctx.beginPath();
        ctx.strokeStyle = couleur;
        ctx.lineWidth = ep;
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.stroke();
    }

    function texte(txt, x, y, taille = 11, couleur = "black") {
        ctx.fillStyle = couleur;
        ctx.font = taille + "px Arial";
        ctx.fillText(txt, x, y);
    }

    // =====================
    // TITRES
    // =====================

    texte("TENSION DE SORTIE u (V)", x0, 20, 13);
    texte("COURANT DE SORTIE i (A)", x0, 220, 13);

    // =====================
    // GRILLE TENSION
    // =====================

    for (let u = -Umax; u <= Umax; u += pasU) {
        let y = yU(u);
        ligne(x0, y, x1, y, u === 0 ? "#777777" : "#dddddd");
        texte(u, 25, y + 4);
    }

    // =====================
    // GRILLE COURANT
    // =====================

    for (let i = -ImaxGraph; i <= ImaxGraph; i += pasI) {
        let y = yI(i);
        ligne(x0, y, x1, y, i === 0 ? "#777777" : "#dddddd");
        texte(i, 35, y + 4);
    }

    // =====================
    // GRILLE TEMPS
    // =====================

    for (let t = 0; t <= tMax; t += Tmicro / 4) {
        let x = xPixel(t);
        ligne(x, hautU, x, basU, "#eeeeee");
        ligne(x, hautI, x, basI, "#eeeeee");
        texte(t, x - 10, 395);
    }

    texte("Temps (µs)", W / 2 - 25, 412);

    // Axes
    ligne(x0, hautU, x0, basU, "black", 2);
    ligne(x0, milieuU, x1, milieuU, "black", 1);

    ligne(x0, hautI, x0, basI, "black", 2);
    ligne(x0, milieuI, x1, milieuI, "black", 1);

    // =====================
    // TENSION DE SORTIE
    // =====================

    // Le pont commute entre +U et -U.
    // La durée passée dans la polarité du courant est alpha*T.

    for (let n = 0; n < 2; n++) {

        let debut = n * Tmicro;
        let milieu = debut + Ton;
        let fin = debut + Tmicro;

        let u1 = U;
        let u2 = -U;

        ligne(xPixel(debut), yU(u1), xPixel(milieu), yU(u1), "#1565c0", 2);
        ligne(xPixel(milieu), yU(u1), xPixel(milieu), yU(u2), "#1565c0", 2);
        ligne(xPixel(milieu), yU(u2), xPixel(fin), yU(u2), "#1565c0", 2);
        ligne(xPixel(fin), yU(u2), xPixel(fin), yU(u1), "#1565c0", 2);
    }

    // =====================
    // COURANT DE SORTIE
    // =====================

    // Courant triangulaire avec ondulation sans passage par zéro

    for (let n = 0; n < 2; n++) {

        let debut = n * Tmicro;
        let milieu = debut + Ton;
        let fin = debut + Tmicro;

        let premier = Imin;
        let second = Imax;

        ligne(
            xPixel(debut),
            yI(premier),
            xPixel(milieu),
            yI(second),
            "#d32f2f",
            2
        );

        ligne(
            xPixel(milieu),
            yI(second),
            xPixel(fin),
            yI(premier),
            "#d32f2f",
            2
        );
    }

    // Repères min et max du courant
    ligne(x0, yI(Imin), x1, yI(Imin), "#d32f2f", 1);
    ligne(x0, yI(Imax), x1, yI(Imax), "#d32f2f", 1);

    texte("i max", x1 - 35, yI(Imax) - 5, 10, "#d32f2f");
    texte("i min", x1 - 35, yI(Imin) - 5, 10, "#d32f2f");

    // Légendes
    ligne(80, 195, 105, 195, "#1565c0", 3);
    texte("u", 110, 199, 11, "#1565c0");

    ligne(155, 195, 180, 195, "#d32f2f", 3);
    texte("i", 185, 199, 11, "#d32f2f");
}

// =====================
// LANCEMENT
// =====================

window.onload = function() {
    genererExercice(exo);
    tracerHacheur4Q();
	tracerSchema();
};
