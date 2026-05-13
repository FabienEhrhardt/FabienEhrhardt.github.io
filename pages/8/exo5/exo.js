// =====================
// PARAMÈTRES
// =====================

//Matériel photovoltaïque
let nbPanneaux=Math.floor(Math.random()*40+20);
let prixPanneau=Math.floor(Math.random()*120+180);

let nbOnduleurs=Math.floor(Math.random()*2+1);
let prixOnduleur=Math.floor(Math.random()*1500+2500);

let longueurCable=Math.floor(Math.random()*150+50);
let prixCable=Math.floor(Math.random()*3+4);

let prixFixation=Math.floor(Math.random()*1500+1000);

//Main d'oeuvre exécutants (bac pro)
let hExec=Math.floor(Math.random()*40+20);
let tauxExec=Math.floor(Math.random()*10+30);

//Main d'oeuvre qualifiée (BTS)
let hBTS=Math.floor(Math.random()*15+5);
let tauxBTS=Math.floor(Math.random()*15+45);

//TVA
let TVA=20;

// =====================
// CALCULS
// =====================

let coutPanneaux=nbPanneaux*prixPanneau;

let coutOnduleurs=nbOnduleurs*prixOnduleur;

let coutCable=longueurCable*prixCable;

let coutMateriel=
    coutPanneaux+
    coutOnduleurs+
    coutCable+
    prixFixation;

let coutMOExec=hExec*tauxExec;

let coutMOBTS=hBTS*tauxBTS;

let coutMO=coutMOExec+coutMOBTS;

let totalHT=coutMateriel+coutMO;

let montantTVA=arrondi(totalHT*TVA/100);

let totalTTC=arrondi(totalHT+montantTVA);

//Pour graphique
let PosMat,PosExec,PosBTS,PosTVA,PosTTC;

// =====================
// CANVAS
// =====================
function Init(canvasId){
	const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.font="18px Arial";
    ctx.textAlign="center";
    ctx.fillStyle="black";

    ctx.fillText("Répartition du coût du devis",canvas.width/2,30);
}

function Materiel(canvasId){
	const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");
	
	//Barres
    let baseY=300;

    //Echelle
    let max=Math.max(
        coutMateriel,
        coutMOExec,
        coutMOBTS,
        montantTVA,
        totalTTC
    );

    let coef=180/max;
	
	// =====================
    // MATERIEL
    // =====================

    ctx.fillStyle="#4A90E2";

    let h1=coutMateriel*coef;

    ctx.fillRect(20,baseY-h1,80,h1);

    ctx.fillStyle="black";
    ctx.fillText("Matériel",60,330);

    PosMat={x:60,y:baseY-h1-10};
	
	ctx.fillStyle="black";
    ctx.textAlign="center";

    ctx.fillText(coutMateriel+ "€",PosMat.x,PosMat.y);
}

function Pose(canvasId){
	const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");
	
	//Barres
    let baseY=300;

    //Echelle
    let max=Math.max(
        coutMateriel,
        coutMOExec,
        coutMOBTS,
        montantTVA,
        totalTTC
    );

    let coef=180/max;
	
    

    // =====================
    // EXECUTANTS
    // =====================

    ctx.fillStyle="#50B050";

    let h2=coutMOExec*coef;

    ctx.fillRect(140,baseY-h2,80,h2);
	ctx.fillStyle="black";
    ctx.fillText("Pose",180,330);

    PosExec={x:180,y:baseY-h2-10};
    ctx.fillText(coutMOExec+ "€",PosExec.x,PosExec.y);
}

function Service(canvasId){
	const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");
	
	//Barres
    let baseY=300;

    //Echelle
    let max=Math.max(
        coutMateriel,
        coutMOExec,
        coutMOBTS,
        montantTVA,
        totalTTC
    );

    let coef=180/max;
	
    

    // =====================
    // BTS
    // =====================

    ctx.fillStyle="#F0A030";

    let h3=coutMOBTS*coef;

    ctx.fillRect(260,baseY-h3,80,h3);
	ctx.fillStyle="black";

    ctx.fillText("Mise en",300,330);
    ctx.fillText("service",300,350);

    PosBTS={x:300,y:baseY-h3-10};

    ctx.fillText(coutMOBTS+ "€",PosBTS.x,PosBTS.y);
}

function TVAg(canvasId){
	const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");
	
	//Barres
    let baseY=300;

    //Echelle
    let max=Math.max(
        coutMateriel,
        coutMOExec,
        coutMOBTS,
        montantTVA,
        totalTTC
    );

    let coef=180/max;
	
    

   // =====================
    // TVA
    // =====================

    ctx.fillStyle="#D05050";

    let h4=montantTVA*coef;

    ctx.fillRect(380,baseY-h4,80,h4);
	ctx.fillStyle="black";

    ctx.fillText("TVA",420,330);

    PosTVA={x:420,y:baseY-h4-10};

    ctx.fillText(montantTVA+ "€",PosTVA.x,PosTVA.y);
}


function Total(canvasId){
	const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");
	
	//Barres
    let baseY=300;

    //Echelle
    let max=Math.max(
        coutMateriel,
        coutMOExec,
        coutMOBTS,
        montantTVA,
        totalTTC
    );

    let coef=180/max;
	
    

    // =====================
    // TTC
    // =====================

    ctx.fillStyle="#808080";

    let h5=totalTTC*coef;

    ctx.fillRect(500,baseY-h5,80,h5);
	ctx.fillStyle="black";

    ctx.fillText("Total TTC",540,330);

    PosTTC={x:540,y:baseY-h5-10};
    ctx.fillText(totalTTC+ "€",PosTTC.x,PosTTC.y);
}

// =====================
// EXERCICE
// =====================

let theme="8";
let nomExo="exo5";

let exo={

titre:"Installation photovoltaïque – Réalisation d’un devis",

enonce:`Une entreprise doit réaliser le devis d’une installation photovoltaïque.<br><br>

L’installation comprend :
<ul>
<li>${nbPanneaux} panneaux photovoltaïques à ${prixPanneau} € l’unité ;</li>
<li>${nbOnduleurs} onduleur(s) à ${prixOnduleur} € l’unité ;</li>
<li>${longueurCable} m de câble à ${prixCable} €/m ;</li>
<li>Un système de fixation coûtant ${prixFixation} €.</li>
</ul>

La pose et le câblage sont réalisés par des exécutants (niveau bac professionnel).<br>
La mise en service et le paramétrage sont réalisés par un technicien qualifié (niveau BTS).<br>

Main d’œuvre exécutants : ${hExec} h à ${tauxExec} €/h.<br>
Main d’œuvre qualifiée : ${hBTS} h à ${tauxBTS} €/h.<br>
Le taux de TVA est de ${TVA} %.`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer le coût des panneaux photovoltaïques.",
reponse:coutPanneaux,
unite:"€",
feedback:`\\(C=n \\times prix=
${nbPanneaux} \\times ${prixPanneau}=
${coutPanneaux}\\) €.`
},

// =====================
{
texte:"Calculer le coût des onduleurs.",
reponse:coutOnduleurs,
unite:"€",
feedback:`\\(C=n \\times prix=
${nbOnduleurs} \\times ${prixOnduleur}=
${coutOnduleurs}\\) €`
},

// =====================
{
texte:"Calculer le coût du câblage.",
reponse:coutCable,
unite:"€",
feedback:`\\(C=L \\times prix=
${longueurCable} \\times ${prixCable}=
${coutCable}\\) €`
},

// =====================
{
texte:"Calculer le coût total du matériel.",
reponse:coutMateriel,
unite:"€",
feedback:`\\(C_{mat}=panneaux+onduleurs+câbles+fixations\\)<br>
\\(C_{mat}=${coutMateriel}\\) €`,
action:function(){
    Materiel("graph");
}
},

// =====================
{
texte:"Calculer le coût de la main d’œuvre des exécutants.",
reponse:coutMOExec,
unite:"€",
feedback:`\\(C=t \\times taux=
${hExec} \\times ${tauxExec}=
${coutMOExec}\\) €`,
action:function(){
    Pose("graph");
}
},

// =====================
{
texte:"Calculer le coût de la main d’œuvre qualifiée.",
reponse:coutMOBTS,
unite:"€",
feedback:`\\(C=t \\times taux=
${hBTS} \\times ${tauxBTS}=
${coutMOBTS}\\) €`,
action:function(){
    Service("graph");
}
},

// =====================
{
texte:"Calculer le coût total de la main d’œuvre.",
reponse:coutMO,
unite:"€",
feedback:`\\(C_{MO}=C_{exec}+C_{BTS}\\)<br>
\\(C_{MO}=${coutMO}\\) €`
},

// =====================
{
texte:"Calculer le montant total HT du devis.",
reponse:totalHT,
unite:"€",
feedback:`\\(HT=matériel+main~d’œuvre\\)<br>
\\(HT=${totalHT}\\) €`
},

// =====================
{
texte:"Calculer le montant de la TVA.",
reponse:montantTVA,
unite:"€",
feedback:`\\(TVA=HT \\times 20 \\% \\)<br>
\\(TVA=${montantTVA}\\) €`,
action:function(){
    TVAg("graph");
}
},

// =====================
{
texte:"Calculer le montant TTC du devis.",
reponse:totalTTC,
unite:"€",
feedback:`\\(TTC=HT+TVA\\)<br>
\\(TTC=${totalTTC}\\) €`,
action:function(){
    Total("graph");
}
},

// =====================
{
type:"texte",
texte:"Pourquoi la mise en service est-elle réalisée par un technicien qualifié ?",
reponse:[
"sécurité",
"paramétrage",
"compétences techniques",
"mise en service"
],
feedback:`La mise en service nécessite des compétences techniques avancées et des réglages de sécurité.`
},

// =====================
{
type:"texte",
texte:"Pourquoi distingue-t-on la main d’œuvre exécutante et qualifiée dans un devis ?",
reponse:[
"qualification",
"coût horaire",
"compétences différentes"
],
feedback:`Les tâches nécessitent des niveaux de qualification différents, ce qui impacte le coût horaire.`
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

    Init("graph");
	
    Materiel("graph");
    Pose("graph");
    Service("graph");
    TVAg("graph");
    Total("graph");

};