// =====================
// PARAMÈTRES
// =====================

//Data center
let PertesTab=[80,120,160,220,300];
let n=Math.floor(Math.random()*PertesTab.length);

let Ppertes=PertesTab[n]; //kW

//Circuit d'eau
let meau=Math.floor(Math.random()*400+200); //kg
let Ceau=4180; //J/kg/K

let Te1=Math.floor(Math.random()*5+18);
let Te2=Te1+Math.floor(Math.random()*8+6);

//Durée fonctionnement
let duree=Math.floor(Math.random()*20+10); //minutes

//Système de secours glace
let mGlace=Math.floor(Math.random()*80+40); //kg

let Lf=334000; //J/kg

// =====================
// CALCULS
// =====================

//Energie thermique eau
let DeltaTeau=Te2-Te1;

let Qeau=arrondi(meau*Ceau*DeltaTeau/1000); //kJ

//Puissance thermique
let Pth=arrondi(Qeau*1000/(duree*60)/1000,1); //kW

//Énergie absorbée par glace
let Qglace=arrondi(mGlace*Lf/1000); //kJ

//Énergie dissipée par le data center
let Qdc=arrondi(Ppertes*duree*60); //kJ

//Masse de glace nécessaire
let mNec=arrondi(Qdc*1000/Lf,1);

//Autonomie glace
let tempsGlace=arrondi(Qglace/Ppertes/60,1);

// =====================
// POSITIONS CANVAS
// =====================

let PosDC;
let PosEau;
let PosGlace;

// =====================
// CANVAS
// =====================

function tracerSchemaEnergie(canvasId){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.font="18px Arial";
    ctx.textAlign="center";
    ctx.fillStyle="black";

    ctx.fillText("Refroidissement thermique d’un data center",canvas.width/2,30);

    // =====================
    // DATA CENTER
    // =====================

    ctx.fillStyle="#404040";

    ctx.fillRect(70,120,140,90);

    ctx.fillStyle="white";

    ctx.fillText("Data",140,155);
    ctx.fillText("Center",140,180);

    PosDC={x:140,y:240};

    // =====================
    // FLUX THERMIQUE
    // =====================

    ctx.strokeStyle="red";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(210,165);
    ctx.lineTo(330,165);
    ctx.stroke();

    //Flèche
	ctx.fillStyle="red";
    ctx.beginPath();
    ctx.moveTo(340,165);
    ctx.lineTo(320,155);
    ctx.lineTo(320,175);
    ctx.fill();

    ctx.fillStyle="red";
    ctx.fillText("Flux thermique",275,140);

    // =====================
    // CIRCUIT D'EAU
    // =====================

    ctx.fillStyle="#4090FF";

    ctx.fillRect(360,110,160,110);

    ctx.fillStyle="white";

    ctx.fillText("Circuit",440,155);
    ctx.fillText("d’eau",440,180);

    PosEau={x:440,y:250};

    // =====================
    // GLACE
    // =====================

    ctx.strokeStyle="blue";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(440,220);
    ctx.lineTo(440,300);
    ctx.stroke();
	
	//Flèche
	ctx.fillStyle="blue";
    ctx.beginPath();
    ctx.moveTo(440,220);
    ctx.lineTo(450,240);
    ctx.lineTo(430,240);
    ctx.fill();

    ctx.fillStyle="#80D0FF";

    ctx.fillRect(370,300,140,70);

    ctx.fillStyle="black";

    ctx.fillText("Réservoir",440,330);
    ctx.fillText("de glace",440,355);

    PosGlace={x:440,y:395};

}

function ajouterTexte(canvasId,texte,x,y){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.fillStyle="black";
    ctx.font="14px Arial";
    ctx.textAlign="center";

    ctx.fillText(texte,x,y);

}

// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo5";

let exo={

titre:"Data center – Refroidissement thermique",

enonce:`Un data center dissipe une puissance thermique de \\(${Ppertes}~kW\\).<br><br>

Le refroidissement est assuré par un circuit d’eau.<br>

Pendant un cycle de fonctionnement de \\(${duree}~minutes\\), une masse d’eau de \\(${meau}~kg\\) passe de \\(${Te1}~°C\\) à \\(${Te2}~°C\\).<br><br>

On donne :
<ul>
<li>capacité thermique de l’eau : \\(c=${Ceau}~J.kg^{-1}.K^{-1}\\)</li>
<li>chaleur latente de fusion de la glace : \\(L_f=${Lf}~J.kg^{-1}\\)</li>
</ul>

Un système de secours utilise un réservoir contenant \\(${mGlace}~kg\\) de glace fondante.`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer l’élévation de température de l’eau.",
reponse:DeltaTeau,
unite:"°C",
feedback:`\\(\\Delta T=T_f-T_i\\)<br>
\\(\\Delta T=${Te2}-${Te1}=${DeltaTeau}~°C\\)`
},

// =====================
{
texte:"Calculer l’énergie thermique absorbée par l’eau.",
reponse:Qeau,
unite:"kJ",
feedback:`\\(Q=m c \\Delta T\\)<br>
\\(Q=${meau}\\times${Ceau}\\times${DeltaTeau}\\)<br>
\\(Q=${Qeau}~kJ\\)`,
},

// =====================
{
texte:"Calculer la puissance thermique moyenne transférée à l’eau.",
reponse:Pth,
unite:"kW",
feedback:`\\(P=\\frac{Q}{t}\\)<br>
\\(P=\\frac{${Qeau}\\times1000}{${duree}\\times60}\\)<br>
\\(P=${Pth}~kW\\)`
},

// =====================
{
texte:"Calculer l’énergie thermique dissipée par le data center pendant ce fonctionnement.",
reponse:Qdc,
unite:"kJ",
feedback:`\\(Q=P\\times t\\)<br>
\\(Q=${Ppertes}\\times${duree}\\times60\\)<br>
\\(Q=${Qdc}~kJ\\)`,
},

// =====================
{
texte:"Calculer l’énergie absorbée lors de la fusion de la glace.",
reponse:Qglace,
unite:"kJ",
feedback:`\\(Q=mL_f\\)<br>
\\(Q=${mGlace}\\times${Lf}\\)<br>
\\(Q=${Qglace}~kJ\\)`,
},

// =====================
{
texte:"Déterminer la masse de glace nécessaire pour absorber toute l’énergie dissipée par le data center.",
reponse:mNec,
unite:"kg",
feedback:`\\(m=\\frac{Q}{L_f}\\)<br>
\\(m=\\frac{${Qdc}\\times1000}{${Lf}}\\)<br>
\\(m=${mNec}~kg\\)`
},

// =====================
{
texte:"Déterminer l’autonomie thermique du réservoir de glace.",
reponse:tempsGlace,
unite:"min",
feedback:`\\(t=\\frac{Q}{P}\\)<br>
\\(t=\\frac{${Qglace}}{${Ppertes}}\\)<br>
\\(t=${tempsGlace}~min\\)`
},

// =====================
{
type:"texte",
texte:"Pourquoi utilise-t-on parfois un stockage thermique à glace dans les data centers ?",
reponse:[
"absorber les pics thermiques",
"stockage thermique",
"refroidissement de secours",
"inertie thermique"
],
feedback:`La glace permet d’absorber rapidement de grandes quantités d’énergie thermique lors des pics de puissance ou des défauts de refroidissement.`
},

// =====================
{
type:"texte",
texte:"Pourquoi les changements d’état permettent-ils de stocker beaucoup d’énergie ?",
reponse:[
"chaleur latente",
"énergie de fusion",
"forte énergie"
],
feedback:`Les changements d’état mettent en jeu une chaleur latente très importante, permettant de stocker beaucoup d’énergie sans élévation de température.`
},

]

// =====================

};

// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

    genererExercice(exo);

    tracerSchemaEnergie("graph");

};