// =====================
// PARAMÈTRES
// =====================

//Ancien moteur
let PancienTab=[11,15,18.5,22,30,37,45];
let n=Math.floor(Math.random()*PancienTab.length);

let Pancien=PancienTab[n];

//Rendements
let eta1=Math.floor(Math.random()*5+82)/100;
let eta2=Math.max(Math.floor(Math.random()*5+87)/100,eta1+0.05);

//Temps fonctionnement
let h=Math.floor(Math.random()*3000+2000);

//Prix électricité
let prixkWh=Math.floor(Math.random()*8+12)/100;

//Coût nouveau matériel
let investissement=Math.floor(Math.random()*12000+4000);

//Calculs
let Pelec1=arrondi(Pancien/eta1,1);
let Pelec2=arrondi(Pancien/eta2,1);

let E1=arrondi(Pelec1*h);
let E2=arrondi(Pelec2*h);

let Cout1=arrondi(E1*prixkWh);
let Cout2=arrondi(E2*prixkWh);

let economie=arrondi(Cout1-Cout2);

let TRI=arrondi(investissement/economie,1);

// =====================
// CANVAS
// =====================
function Attente(canvasId, nb){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");


    let largeur=canvas.width;
    let hauteur=canvas.height;

    ctx.fillStyle="red";
    ctx.font="30px Arial";
	ctx.textAlign="center";
    ctx.fillText(`Graphique disponible après la question ${nb}`,largeur/2,hauteur/2);


}


function tracerComparaisonCouts(canvasId){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let margeX=80;
    let margeY=40;

    let largeur=canvas.width-2*margeX;
    let hauteur=canvas.height-2*margeY;

    //Axes
    ctx.strokeStyle="black";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(margeX,margeY);
    ctx.lineTo(margeX,canvas.height-margeY);
    ctx.lineTo(canvas.width-margeX,canvas.height-margeY);
    ctx.stroke();

    //Titre
    ctx.font="18px Arial";
    ctx.textAlign="center";
    ctx.fillStyle="black";
    ctx.fillText("Évolution du coût cumulé",canvas.width/2,25);

    let nbAnnees=15;

    //Coût maximum
    let max=Math.max(
        Cout1*nbAnnees,
        investissement+Cout2*nbAnnees
    );

    max=Math.ceil(max/10000)*10000;

    // =====================
    // GRILLE
    // =====================

    ctx.font="12px Arial";

    for(let i=0;i<=nbAnnees;i+=1){

        let x=margeX+i*largeur/nbAnnees;

        ctx.strokeStyle="#DDD";

        ctx.beginPath();
        ctx.moveTo(x,margeY);
        ctx.lineTo(x,canvas.height-margeY);
        ctx.stroke();

        ctx.strokeStyle="black";

        ctx.fillText(i,x,canvas.height-margeY+20);

    }
	let pas=max/5;

    for(let i=0;i<=max;i+=pas){

        let y=canvas.height-margeY-i/max*hauteur;

        ctx.strokeStyle="#DDD";

        ctx.beginPath();
        ctx.moveTo(margeX,y);
        ctx.lineTo(canvas.width-margeX,y);
        ctx.stroke();

        ctx.strokeStyle="black";

        ctx.fillText(i,margeX-35,y+5);

    }

    // =====================
    // COURBE SOLUTION INITIALE
    // =====================

    ctx.strokeStyle="red";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let annee=0;annee<=nbAnnees;annee++){

        let cout=annee*Cout1;

        let x=margeX+annee*largeur/nbAnnees;
        let y=canvas.height-margeY-cout/max*hauteur;

        if(annee===0){
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
        }

    }

    ctx.stroke();

    // =====================
    // COURBE SOLUTION EFFICACE
    // =====================

    ctx.strokeStyle="green";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let annee=0;annee<=nbAnnees;annee++){

        let cout=investissement+annee*Cout2;

        let x=margeX+annee*largeur/nbAnnees;
        let y=canvas.height-margeY-cout/max*hauteur;

        if(annee===0){
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
        }

    }

    ctx.stroke();

    // =====================
    // LEGENDE
    // =====================

    ctx.fillStyle="red";
    ctx.fillRect(canvas.width-230,50,20,10);

    ctx.fillStyle="black";
    ctx.fillText("Solution initiale",canvas.width-140,60);

    ctx.fillStyle="green";
    ctx.fillRect(canvas.width-230,80,20,10);

    ctx.fillStyle="black";
    ctx.fillText("Solution efficace",canvas.width-140,90);

    // =====================
    // TRI
    // =====================

    let xTRI=margeX+TRI*largeur/nbAnnees;

    ctx.strokeStyle="blue";
    ctx.setLineDash([6,6]);

    ctx.beginPath();
    ctx.moveTo(xTRI,margeY);
    ctx.lineTo(xTRI,canvas.height-margeY);
    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle="blue";
    ctx.fillText(`TRI ≈ ${TRI} ans`,xTRI+40,120);

    // =====================
    // AXES
    // =====================

    ctx.fillStyle="black";

    ctx.fillText("Années",canvas.width-40,canvas.height-10);

    ctx.save();
    ctx.translate(20,canvas.height/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Coût cumulé (€)",0,0);
    ctx.restore();

}

// =====================
// EXERCICE
// =====================

let theme="8";
let nomExo="exo4";

let exo={

titre:"Efficacité énergétique – Étude économique du remplacement d’un moteur",

enonce:`Une entreprise souhaite remplacer un ancien moteur électrique par un modèle plus performant afin de réduire sa consommation énergétique.<br><br>

L'ancien moteur délivre une puissance mécanique de \\(${Pancien}~kW\\).<br>

Son rendement est de \\(\\eta_1=${eta1*100}\\%\\).<br>

Le nouveau moteur possède un rendement de \\(\\eta_2=${eta2*100}\\%\\).<br>

Le moteur fonctionne \\(${h}~h/an\\).<br>

Le prix de l’électricité est de \\(${prixkWh}\\) €/kWh.<br>

Le remplacement du moteur coûte \\(${investissement}\\) €.<br><br>

Le graphique ci-dessous représente l’évolution du coût cumulé des deux solutions.`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la puissance électrique absorbée par l’ancien moteur.",
reponse:Pelec1,
unite:"kW",
feedback:`\\(P_{elec}=\\frac{P_u}{\\eta}=
\\frac{${Pancien}}{${eta1}}=${Pelec1}~kW\\)`
},

// =====================
{
texte:"Calculer la puissance électrique absorbée par le nouveau moteur.",
reponse:Pelec2,
unite:"kW",
feedback:`\\(P_{elec}=\\frac{P_u}{\\eta}=
\\frac{${Pancien}}{${eta2}}=${Pelec2}~kW\\)`
},

// =====================
{
texte:"Calculer la consommation annuelle de l’ancien moteur.",
reponse:E1,
unite:"kWh",
feedback:`\\(E=P \\times t=
${Pelec1} \\times ${h}=${E1}~kWh\\)`
},

// =====================
{
texte:"Calculer la consommation annuelle du nouveau moteur.",
reponse:E2,
unite:"kWh",
feedback:`\\(E=P \\times t=
${Pelec2} \\times ${h}=${E2}~kWh\\)`
},

// =====================
{
texte:"Calculer le coût annuel d’électricité de l’ancien moteur.",
reponse:Cout1,
unite:"€",
feedback:`\\(C=E \\times prix=
${E1} \\times ${prixkWh}=${Cout1}\\) €`
},

// =====================
{
texte:"Calculer le coût annuel d’électricité du nouveau moteur.",
reponse:Cout2,
unite:"€",
feedback:`\\(C=E \\times prix=
${E2} \\times ${prixkWh}=${Cout2}\\) €`
},

// =====================
{
texte:"Déterminer l’économie annuelle réalisée.",
reponse:economie,
unite:"€",
feedback:`\\(Economie=C_1-C_2=
${Cout1}-${Cout2}=${economie}\\) €`
},

// =====================
{
texte:"Calculer le temps de retour sur investissement.",
reponse:TRI,
unite:"ans",
feedback:`\\(TRI=\\frac{Investissement}{Economie~annuelle}=
\\frac{${investissement}}{${economie}}=${TRI}~ans\\)`,
action:function(){
    tracerComparaisonCouts("graph");
}
},

// =====================
{
type:"texte",
texte:"Pourquoi un moteur à meilleur rendement permet-il de réduire les coûts ?",
reponse:["moins de pertes","moins de pertes joules","meilleur rendement"],
feedback:`Un meilleur rendement signifie moins de pertes énergétiques et donc une consommation électrique plus faible.`
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

    Attente("graph", 8);

};