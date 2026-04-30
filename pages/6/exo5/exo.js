// =====================
// PARAMÈTRES
// =====================

let types = ["raies","continu"];
let typeSpectre = types[Math.floor(Math.random()*2)];

let lambdaMin = 300;
let lambdaMax = 900;
let T=Math.floor(Math.random()*5000)+2000;

// pics si spectre de raies
let pic1 = 450;
let pic2 = 550;
let pic3 = 650;
let I1=Math.floor(Math.random()*50)+50;
let I2=Math.floor(Math.random()*50)+50;
let I3=Math.floor(Math.random()*50)+50;
let Imax=Math.max(I1,I2,I3);

let lmax;
if(typeSpectre=="raies"){
	if(Imax==I1) {lmax=450;}
	else if(Imax==I2) {lmax=550;}
	else if(Imax==I3) {lmax=650;}
}else{
	lmax=lambdaspectreCorpsNoir();
	if(lmax<300){lmax=300;}
	if(lmax>900){lmax=900;}
}

let Coef=CoeffspectreCorpsNoir();

// =====================
// FONCTION SPECTRE
// =====================

function spectre(lambda){

    if(typeSpectre=="raies"){
        return I1*Math.exp(-Math.pow((lambda-pic1)/10,2))
             + I2*Math.exp(-Math.pow((lambda-pic2)/10,2))
             + I3*Math.exp(-Math.pow((lambda-pic3)/10,2));
    }
    else{
        return spectreCorpsNoir(lambda);
    }
}

function spectreCorpsNoir(lambda){
    let lambda_m = lambda * 1e-9;
    let lambda_max = 2.9e-3 / T;
    let x = lambda_m / lambda_max;
    return 80 * (Math.pow(x,3) * Math.exp(-4 * x)) / Coef;
}

function CoeffspectreCorpsNoir(){
    let lambda_max = 2.9e-3 / T;
    let max = 0;
    for(let lambda_i = lambdaMin; lambda_i <= lambdaMax; lambda_i += 1){
        let lambda_m = lambda_i * 1e-9;
        let x = lambda_m / lambda_max;
        let I = Math.pow(x,3) * Math.exp(-4 * x);
        if(I > max){
            max = I;
        }
    }
    return max;
}

function lambdaspectreCorpsNoir(){
    let lambda_max = 2.9e-3 / T;
	let lambda_du_max=300;
    let max = 0;
    for(let lambda_i = lambdaMin; lambda_i <= lambdaMax; lambda_i += 1){
        let lambda_m = lambda_i * 1e-9;
        let x = lambda_m / lambda_max;
        let I = Math.pow(x,3) * Math.exp(-4 * x);
        if(I > max){
            max = I;
			lambda_du_max=lambda_i;
		
        }
    }
    return lambda_du_max;
}


// =====================
// COULEUR DU SPECTRE
// =====================

function longueurOndeToRGB(lambda){

    let r=0, g=0, b=0;

    if(lambda<400){}
	else if(lambda>=400 && lambda<440){
        r = -(lambda-440)/(440-400);
        g = 0;
        b = 1;
    }
    else if(lambda<510){
        r = 0;
        g = (lambda-440)/(510-440);
        b = 1;
    }
    else if(lambda<520){
        r = 0;
        g = 1;
        b = -(lambda-520)/(520-510);
    }
    else if(lambda<580){
        r = (lambda-510)/(580-510);
        g = 1;
        b = 0;
    }
    else if(lambda<645){
        r = 1;
        g = -(lambda-645)/(645-580);
        b = 0;
    }
    else if(lambda<=780){
        r = 1;
        g = 0;
        b = 0;
    }

    // atténuation aux limites (réalisme)
    let facteur = 1;
    if(lambda < 420){
        facteur = 0.3 + 0.7*(lambda-400)/(420-400);
    }
    else if(lambda > 700){
        facteur = 0.3 + 0.7*(780-lambda)/(780-700);
    }

    r = Math.round(255 * r * facteur);
    g = Math.round(255 * g * facteur);
    b = Math.round(255 * b * facteur);

    return `rgb(${r},${g},${b})`;
}

function tracerSpectreRGB(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    for(let x=50; x<width-30; x++){

        let lambda = xmin + (x/width)*(xmax-xmin);

        let couleur = longueurOndeToRGB(lambda);

        ctx.fillStyle = couleur;

        // bande colorée en bas
        ctx.fillRect(x, height-20, 1, 20);
    }
}

function couleurSpectre(lambda){

    if(lambda < 380) return "black"; // UV invisible
    if(lambda < 440) return "violet";
    if(lambda < 490) return "blue";
    if(lambda < 560) return "green";
    if(lambda < 590) return "yellow";
    if(lambda < 620) return "orange";
    if(lambda <= 800) return "red";
    return "black"; // IR invisible
}

// =====================
// AFFICHAGE SPECTRE COLORÉ
// =====================

function tracerSpectreCouleur(canvasId){

    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext("2d");

    let width = canvas.width;
    let height = canvas.height;

    for(let x=50; x<width-30; x++){

        let lambda = lambdaMin + (lambdaMax-lambdaMin)*x/(width-60);

        ctx.fillStyle = couleurSpectre(lambda);
        ctx.fillRect(x, height-20, 1, 20); // bande colorée en bas
    }
}
let xmin=lambdaMin;
let xmax=lambdaMax;
let ymax1=100;
let ymax2=100;

// =====================
// EXERCICE (TP)
// =====================
let theme="6";
let nomExo="exo5";
let exo={

titre:"Analyse d’un spectre lumineux",

enonce:`On souhaite analyser le spectre d’une source lumineuse utilisée dans un atelier industriel.<br><br>

Le graphique représente l’intensité lumineuse en fonction de la longueur d’onde.<br>
Une bande colorée représente le spectre visible.`,

courbe1:{
    f: spectre,
    axeX: "Longueur d’onde (nm)",
    axeY: "Intensité",
    nom: "Spectre lumineux",
    xmin: lambdaMin,
    xmax: lambdaMax,
    ymax: 120
},

questions:[

// =====================
{
type:"texte",
texte:"Observer le graphique : le spectre est-il continu ou de raies ?",
reponse:[typeSpectre],
feedback:`Pics → raies / Courbe lisse → continu`
},

// =====================
{
texte:"Relever la longueur d’onde correspondant au maximum",
reponse:lmax,
unite:"nm",
feedback:`Lire le maximum sur la courbe \\(\\lambda_{max}=${lmax}nm\\)`
},

// =====================
{
type:"texte",
texte:"Cette longueur d’onde est-elle dans le visible ?",
reponse:((lmax>400)*(lmax<800)?["oui"]:["non"]),
feedback:`Visible : 400 à 800 nm`
},

// =====================
{
type:"texte",
texte:"Quelle couleur correspond à environ 650 nm ?",
reponse:["rouge"],
feedback:`rouge ≈ 650 nm`
},

// =====================
{
type:"texte",
texte:"Les UV sont-ils visibles sur la bande colorée ?",
reponse:["non"],
feedback:`UV < 400 nm → invisibles`
},

// =====================
{
type:"texte",
texte:"Où se situent les infrarouges sur le graphique ?",
reponse:["droite"],
feedback:`IR > 800 nm → à droite`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
genererExercice(exo);
initialisationGraph("graph",2);
tracerEcran("graph");

// courbe
tracerCourbe("graph", exo.courbe1.f, exo.courbe1.nom, "black",1);

// spectre coloré
tracerSpectreRGB("graph");
//tracerSpectreCouleur("graph");
};