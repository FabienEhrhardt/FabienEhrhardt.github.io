// =====================
// PARAMÈTRES
// =====================

//Puissance installation photovoltaïque
PcTab=[36,50,75,100,120,150,200];
coutWcTab=[1.6,1.4,1.3,1.2,1.15,1.1,1.05];

let n=Math.floor(Math.random()*PcTab.length);

let Pc=PcTab[n]; //kWc
let coutWc=coutWcTab[n]; //€/Wc

//Production annuelle
let prodSpecifique=Math.floor(Math.random()*300+900); //kWh/kWc/an
let production=Pc*prodSpecifique;

//Prix de vente électricité
let prixVente=Math.floor(Math.random()*8+10)/100; //€/kWh

//Coût investissement
let investissement=arrondi(Pc*1000*coutWc);

//Coût exploitation annuel
let exploitation=Math.floor(investissement*0.015);

//Chiffre d'affaire
let chiffreAffaire=arrondi(production*prixVente);

//Bénéfice annuel
let benefice=arrondi(chiffreAffaire-exploitation);

//Temps retour sur investissement
let TRI=arrondi(investissement/benefice,1);

//Bénéfice sur 20 ans
let benef20=arrondi(benefice*20-investissement);

//Pour graphique
let PosInvest,PosExploit,PosCA,PosBenef;

// =====================
// CANVAS
// =====================

function tracerRentabilite(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Dimensions
    let margeX=60;
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
    ctx.fillText("Évolution du bénéfice cumulé",canvas.width/2,25);

    //Graduations
    ctx.font="12px Arial";

    let nbAnnees=20;

    //Valeur max affichée
    let benefMax=benefice*20-investissement;

    //On ajoute une marge
    benefMax=Math.ceil(benefMax/10000)*10000;

    let benefMin=-investissement;

    // =====================
    // AXE X
    // =====================

    for(let i=0;i<=nbAnnees;i+=2){

        let x=margeX+i*largeur/nbAnnees;

        ctx.beginPath();
        ctx.moveTo(x,canvas.height-margeY);
        ctx.lineTo(x,canvas.height-margeY+5);
        ctx.stroke();

        ctx.fillText(i,x,canvas.height-margeY+20);

    }

    ctx.fillText("Années",canvas.width-40,canvas.height-10);

    // =====================
    // AXE Y
    // =====================

    for(let i=benefMin;i<=benefMax;i+=50000){

        let y=canvas.height-margeY-(i-benefMin)/(benefMax-benefMin)*hauteur;

        ctx.beginPath();
        ctx.moveTo(margeX-5,y);
        ctx.lineTo(margeX,y);
        ctx.stroke();

        ctx.fillText(i,margeX-35,y+5);

        //Ligne horizontale
        ctx.strokeStyle="#DDD";
        ctx.beginPath();
        ctx.moveTo(margeX,y);
        ctx.lineTo(canvas.width-margeX,y);
        ctx.stroke();

        ctx.strokeStyle="black";
    }

    ctx.save();
    ctx.translate(20,canvas.height/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Bénéfice cumulé (€)",0,0);
    ctx.restore();

    // =====================
    // COURBE
    // =====================

    ctx.strokeStyle="green";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let annee=0;annee<=nbAnnees;annee++){

        let benefCumule=-investissement + benefice*annee;

        let x=margeX+annee*largeur/nbAnnees;

        let y=canvas.height-margeY-(benefCumule-benefMin)/(benefMax-benefMin)*hauteur;

        if(annee===0){
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
        }

    }

    ctx.stroke();

    // =====================
    // POINTS
    // =====================

    ctx.fillStyle="green";

    for(let annee=0;annee<=nbAnnees;annee++){

        let benefCumule=-investissement + benefice*annee;

        let x=margeX+annee*largeur/nbAnnees;

        let y=canvas.height-margeY-(benefCumule-benefMin)/(benefMax-benefMin)*hauteur;

        ctx.beginPath();
        ctx.arc(x,y,4,0,2*Math.PI);
        ctx.fill();

    }

    // =====================
    // LIGNE TRI
    // =====================

    let xTRI=margeX+TRI*largeur/nbAnnees;

    ctx.strokeStyle="red";
    ctx.setLineDash([8,5]);

    ctx.beginPath();
    ctx.moveTo(xTRI,margeY);
    ctx.lineTo(xTRI,canvas.height-margeY);
    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle="red";
    ctx.font="14px Arial";

    ctx.fillText(`TRI ≈ ${TRI} ans`,xTRI+40,margeY+20);

    // =====================
    // LIGNE ZERO
    // =====================

    let y0=canvas.height-margeY-(0-benefMin)/(benefMax-benefMin)*hauteur;

    ctx.strokeStyle="black";
    ctx.lineWidth=1.5;

    ctx.beginPath();
    ctx.moveTo(margeX,y0);
    ctx.lineTo(canvas.width-margeX,y0);
    ctx.stroke();

}

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

// =====================
// EXERCICE
// =====================

let theme="8";
let nomExo="exo3";

let exo={

titre:"Installation photovoltaïque – Étude économique",

enonce:`Une entreprise souhaite investir dans une installation photovoltaïque.<br>

La centrale possède une puissance installée de \\(P_c=${Pc}\\) kWc.<br>

Le coût d'installation est estimé à \\(${coutWc}\\) €/Wc.<br>

La production annuelle moyenne est de \\(${prodSpecifique}\\) kWh/kWc/an.<br>

L'énergie produite est revendue au prix de \\(${prixVente}\\) €/kWh.<br>

Le coût annuel d'exploitation représente environ 1,5% du coût initial.<br>

Le schéma économique est donné ci-dessous.`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la production annuelle d'énergie de l'installation.",
reponse:production,
unite:"kWh",
feedback:`\\(E=P_c \\times Production~spécifique=${Pc} \\times ${prodSpecifique}=${production}~kWh\\)`
},

// =====================
{
texte:"Calculer le coût total de l'investissement.",
reponse:investissement,
unite:"€",
feedback:`\\(C_{invest}=P_c \\times 1000 \\times coût/Wc=${Pc}\\times1000\\times${coutWc}=${investissement}\\) €`,
},

// =====================
{
texte:"Déterminer le coût annuel d'exploitation.",
reponse:exploitation,
unite:"€",
feedback:`\\(C_{exploit}=0,015 \\times C_{invest}=0,015 \\times ${investissement}=${exploitation}\\) €`,
},

// =====================
{
texte:"Calculer le chiffre d'affaire annuel généré par la vente d'électricité.",
reponse:chiffreAffaire,
unite:"€",
feedback:`\\(CA=E \\times prix=${production} \\times ${prixVente}=${chiffreAffaire}\\) €`,

},

// =====================
{
texte:"Calculer le bénéfice annuel.",
reponse:benefice,
unite:"€",
feedback:`\\(Bénéfice=CA-C_{exploit}=${chiffreAffaire}-${exploitation}=${benefice}\\) €`,
},

// =====================
{
texte:"Déterminer le temps de retour sur investissement.",
reponse:TRI,
unite:"ans",
feedback:`\\(TRI=\\frac{C_{invest}}{Bénéfice}=
\\frac{${investissement}}{${benefice}}=${TRI}~ans\\)`,
action:function(){
    tracerRentabilite("graph");
}
},

// =====================
{
texte:"Calculer le bénéfice cumulé après 20 ans de fonctionnement.",
reponse:benef20,
unite:"€",
feedback:`\\(B_{20}=20 \\times bénéfice - investissement\\)<br>
\\(B_{20}=20 \\times ${benefice}-${investissement}=${benef20}\\) €`
},

// =====================
{
type:"texte",
texte:"L'installation photovoltaïque permet-elle de réduire la consommation d'énergies fossiles ?",
reponse:["oui","yes"],
feedback:`Oui, elle produit une énergie renouvelable qui limite l'utilisation des énergies fossiles.`
},

// =====================
{
type:"texte",
texte:"Quel est l'intérêt principal d'un bon retour sur investissement ?",
reponse:["rentabilité","investissement rentable","profit"],
feedback:`Plus le retour sur investissement est court, plus l'installation devient rapidement rentable.`
},

]

// =====================

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){

    genererExercice(exo);
	Attente("graph", 6);

    

};