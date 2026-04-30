// =====================
// PARAMÈTRES
// =====================

let Imax = (Math.floor(Math.random()*5)+5)*100; // 500 à 900 cd/klm
let Phi =  (Math.floor(Math.random()*5)+5)*100; // 500 à 900 lm
let angleOuverture = (Math.floor(Math.random()*10)+3)*10; // 30 à 60°
let sigma = (angleOuverture/2) / Math.sqrt(Math.log(2)); // Sigma pour la gaussienne
let ang=10*(Math.floor(Math.random()*3)+1);

let distance = Math.floor(Math.random()*3)+2; // 2 à 4 m

// =====================
// FONCTION POLAIRE
// =====================

function intensite(theta){
    // theta en degrés
    return Imax * Math.exp(-Math.pow(theta/sigma,2));
}


function tracerPolaire(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let cx = canvas.width/2;
    let cy = canvas.height/2;
    let Rmax = Math.min(cx,cy) - 30;

    let scale = Rmax / Imax;

    // =====================
    // CERcles de référence
    // =====================
    ctx.strokeStyle = "#ccc";
    for(let r=0; r<=Imax; r+=Imax/4){
        ctx.beginPath();
        ctx.arc(cx,cy,r*scale,0,2*Math.PI);
        ctx.stroke();
    }

    // =====================
    // AXES PRINCIPAUX
    // =====================
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(cx,0);
    ctx.lineTo(cx,canvas.height);
    ctx.moveTo(0,cy);
    ctx.lineTo(canvas.width,cy);
    ctx.stroke();

    // =====================
    // GRADUATIONS ANGULAIRES
    // =====================
    let angles = [0, 30, 60, 90];

    ctx.strokeStyle = "#888";
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    angles.forEach(angle => {

        // on trace +angle et -angle
        [angle, -angle].forEach(a => {

            let rad = a * Math.PI/180;

            let x = cx + Rmax * Math.sin(rad);
            let y = cy + Rmax * Math.cos(rad);

            // ligne radiale
            ctx.beginPath();
            ctx.moveTo(cx,cy);
            ctx.lineTo(x,y);
            ctx.stroke();

            // position du texte (un peu plus loin)
            let xt = cx + (Rmax+15) * Math.sin(rad);
            let yt = cy + (Rmax+15) * Math.cos(rad);

            ctx.fillText(Math.abs(a) + "°", xt, yt);
        });
	

    });
	ctx.fillText("Cd/kLm",30,canvas.height-10);
	ctx.fillText(I0,cx + (Rmax) * Math.sin(0.16),cy + (Rmax) * Math.cos(0.16));
    // =====================
    // COURBE POLAIRE
    // =====================
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();

    let first = true;

    for(let theta=-90; theta<=90; theta+=1){

        let I = intensite(theta);
        let r = I * scale;

        let rad = theta * Math.PI/180;

        let x = cx + r * Math.sin(rad);
        let y = cy + r * Math.cos(rad);

        if(first){
            ctx.moveTo(x,y);
            first=false;
        } else {
            ctx.lineTo(x,y);
        }
    }

    ctx.stroke();
}

let I0 = intensite(0);
let Iang = intensite(ang);

let E = Math.round(I0/Phi*1000 / (distance*distance));
let Eang= Math.round(Iang/Phi*1000 / (distance*distance)*Math.pow(Math.cos(ang/180*3.14159),3));

// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo7";

let exo={

titre:"Diagramme polaire d’un luminaire",

enonce:`On étudie le diagramme polaire d’un luminaire LED de flux lumineux \\(\\Phi=${Phi}\\) lm.<br>
La courbe représente l’intensité lumineuse en fonction de l’angle.<br>
Distance au sol : ${distance} m.`,

courbe1:{},

questions:[

// =====================
{
texte:"Donner l’intensité lumineuse normalisée maximale",
reponse:Imax,
unite:"Cd/klm",
feedback:`Lire au centre du diagramme \\(I_{N}(0)=${Imax}\\) Cd/kLm`
},

// =====================
{
texte:"Donner l’intensité lumineuse maximale",
reponse:Imax/Phi*1000,
unite:"Cd",
feedback:`On multiplie par le flux lumineux en kLm \\(I(0)=\\Phi \\times I_{N}(0)=${arrondi(Imax/Phi*1000)}\\) Cd`
},

// =====================
{
texte:`Donner l’intensité à ${ang}°`,
reponse:arrondi(Iang*Phi/1000),
unite:"Cd",
feedback:`Lecture sur la courbe + multiplication par le flux lumineux \\(I(${ang})=\\Phi \\times I_{N}(${ang})=${Phi/1000} \\times ${arrondi(Iang)}=${arrondi(Iang*Phi/1000)}\\) Cd`
},


// =====================
{
texte:"Donner l’angle d’ouverture approximatif",
reponse:angleOuverture,
unite:"°",
feedback:`Angle où l’intensité est supérieure à \\(\\frac{I_{max}}{2}\\). Ici l'angle d'ouverture est de ${angleOuverture}°`
},

// =====================
{
texte:"Calculer l’éclairement au sol à la verticale",
reponse:E,
unite:"lux",
feedback:`\\(E = \\frac{I(0)}{h^2}=${E}\\) lux`
},

// =====================
{
type:"texte",
texte:"Si on double la distance, que devient l’éclairement ?",
reponse:["divise par 4", "divisé par 4"],
feedback:`Loi en 1/d², on divise par 4`
},

// =====================
{
texte:"On rappelle la formule \\(E(\\alpha)=\\frac{I(\\alpha)}{h^2} cos^3 (\\alpha) \\). Calculer l'éclairement pour un angle \\(\\alpha\\)° ",
reponse:Eang,
feedback:`La formule est donnée, \\(E(\\alpha)=${Eang}\\) lux`
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
tracerPolaire("graph");

};