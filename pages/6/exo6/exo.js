// =====================
// PARAMÈTRES
// =====================

let nx = 6;
let ny = 4;

let Emin = 200;
let Emax = 600;

let Emoy_norm = Math.round(200 + 50*Math.round(Math.random()*6));
let U0_norm = Math.round(5 + Math.round(Math.random()*3))/10;

let grille = [];

for(let j=0; j<ny; j++){
    for(let i=0; i<nx; i++){

        // effet centre + bruit
        let centre = 1 - Math.abs(i-(nx-1)/2)/(nx/2) * 0.5
                       - Math.abs(j-(ny-1)/2)/(ny/2) * 0.5;

        let bruit = Math.random()*100 - 50;

        let E = Math.max(0, Math.round(300 + 200*centre + bruit));

        grille.push(E);
    }
}

function tracerCartographie(canvasId){

    const canvas = document.getElementById(canvasId);

    if(!canvas){
        console.error("Canvas introuvable :", canvasId);
        return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let largeur = canvas.width / nx;
    let hauteur = canvas.height / ny;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "14px Arial";

    for(let j=0; j<ny; j++){
        for(let i=0; i<nx; i++){

            let E = grille[j*nx + i];

            // 🔲 normalisation (0 → 1)
            let ratio = (E - Emin) / (Emax - Emin);
            ratio = Math.max(0, Math.min(ratio,1));

            // 🎨 niveau de gris
            let gris = Math.round(255 * ratio);

            ctx.fillStyle = `rgb(${gris},${gris},${gris})`;
            ctx.fillRect(i*largeur, j*hauteur, largeur, hauteur);

            // 🧠 texte centré
            ctx.fillStyle = (gris > 140) ? "black" : "white";

            let xCentre = i*largeur + largeur/2;
            let yCentre = j*hauteur + hauteur/2;

            ctx.fillText(E, xCentre, yCentre);
        }
    }

    // 🔲 grille
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    for(let i=0; i<=nx; i++){
        ctx.beginPath();
        ctx.moveTo(i*largeur, 0);
        ctx.lineTo(i*largeur, canvas.height);
        ctx.stroke();
    }

    for(let j=0; j<=ny; j++){
        ctx.beginPath();
        ctx.moveTo(0, j*hauteur);
        ctx.lineTo(canvas.width, j*hauteur);
        ctx.stroke();
    }
}

let somme = grille.reduce((a,b)=>a+b,0);
let E_moy = Math.round(somme / grille.length);

let Emin_mes = Math.min(...grille);
let Emax_mes = Math.max(...grille);

let uniformite = (Emin_mes / E_moy).toFixed(2);





// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo6";

let exo={

titre:"Cartographie d’éclairement d’un atelier",

enonce:`Un relevé d’éclairement a été réalisé sur 24 points dans un atelier à l’aide d’un luxmètre.<br>
La cartographie est représentée ci-dessous.<br>
La norme indique un éclairement moyen de \\(E_{moy norm}=${Emoy_norm} lux \\) avec une uniformité de \\(U_{0 norm}=${U0_norm}\\)`,

courbe1:{
},

questions:[

// =====================
{
texte:"Calculer l’éclairement moyen",
reponse:E_moy,
unite:"lux",
feedback:`Moyenne des 24 valeurs \\(E_{moy}=\\frac{\\Sigma E_{mes}}{24}=${E_moy}lux\\)`
},

// =====================
{
type:"texte",
texte:"L’éclairage moyen est-il conforme ? (oui ou non)",
reponse:((E_moy>Emoy_norm)?["oui"]:["non"]),
feedback:`Pour être conforme il faut avoir \\(E_{moy}>E_{moy norm}\\)`
},

// =====================
{
texte:"Donner l’éclairement minimum",
reponse:Emin_mes,
unite:"lux",
feedback:`Lire la plus petite valeur \\(E_{min}=${Emin_mes}lux\\)`
},

// =====================
{
texte:"Donner l’éclairement maximum",
reponse:Emax_mes,
unite:"lux",
feedback:`Lire la plus grande valeur \\(E_{max}=${Emax_mes}lux\\)`
},

// =====================
{
texte:"Calculer l’uniformité \\(U_0=\\frac{E_{min}}{E_{moy}}\\)",
reponse:uniformite,
feedback:`\\(U_0=\\frac{E_{min}}{E_{moy}}=${uniformite}lux\\)`
},

// =====================
{
type:"texte",
texte:"L’uniformité est-elle conforme ? (oui ou non)",
reponse:((uniformite>U0_norm)?["oui"]:["non"]),
feedback:`Pour être conforme il faut avoir \\(U_{0}>U_{0 norm}\\)`
},


{
type:"texte",
texte:"Où sont situées les zones les moins éclairées ?",
reponse:["bords"],
feedback:`Souvent aux bords`
},

// =====================
{
type:"texte",
texte:"Proposer une amélioration",
reponse:["ajouter lampes","répartir"],
feedback:`Ajouter luminaires ou mieux répartir`
}

]

};
// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){

genererExercice(exo);
// canvas dédié
tracerCartographie("graph");

};