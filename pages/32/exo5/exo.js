// =====================
// PARAMÈTRES
// =====================

// Puissances actives (kW)
let Pt=[20,30,40,50,63,80,100,125,160,200];

// cos phi initial
let cosit=[0.65,0.7,0.72,0.75,0.78,0.8];

// cos phi cible
let cosft=[0.92,0.93,0.94,0.95];

// tensions
let U=400;

// choix aléatoire
let n=Math.floor(Math.random()*Pt.length);
let P=Pt[n];

let cosi=cosit[Math.floor(Math.random()*cosit.length)];
let cosf=cosft[Math.floor(Math.random()*cosft.length)];

// =====================
// CALCULS
// =====================

// angles
let phii=Math.acos(cosi);
let phif=Math.acos(cosf);

// puissances réactives
let Qi=P*Math.tan(phii);
let Qf=P*Math.tan(phif);

// compensation
let Qc=Qi-Qf;

// puissance apparente initiale et finale
let Si=P/cosi;
let Sf=P/cosf;

// courant ligne (tri simplifié)
let I1=P/(Math.sqrt(3)*400*cosi);

// =====================
// CHOIX BATTERIE (kVAr)
// =====================
let Qct=[5,7.5,10,12.5,15,20,25,30,40,50,75,100];

function choixQc(Q,tableau){
	let j=0;
	while((Q>tableau[j])&&(j<tableau.length)){
		j++;
	}
	return tableau[j];
}

let QcD=choixQc(Qc,Qct);

// =====================
// FONCTIONS UTILITAIRES
// =====================
function arrondi(x){return Math.round(x*100)/100;}

function creationTab(titre,tableau){
	let TabCalib='<table class="feedback-table"><tr><th>'+titre+'</th>';
	for(let i=0;i<tableau.length;i++){
		TabCalib+='<td>'+tableau[i]+'</td>';
	}
	return TabCalib+'</tr>';
}

// =====================
// CANVAS (schéma simple réseau + batterie)
// =====================
let x=150;
let y=150;

function schemaExo(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let p;

    p=SourceV(canvasId,"Réseau          ",x,y,90,"black",false,true);
    p=Fil(canvasId,p.x,p.y,0,"black",false);
    p=Fil(canvasId,p.x,p.y,0,"black",false);

    p=Resistance(canvasId,"Charge",p.x,p.y,-90,"black",false,false);
	p=Fil(canvasId,p.x,p.y,0,"black",false);
    p=Bobine(canvasId,"L",p.x,p.y,90,"black",false,false);
	p=Fil(canvasId,p.x,p.y,180,"black",false);
	p=Fil(canvasId,x,y,0,"black",false);
    p=Fil(canvasId,p.x,p.y,0,"black",false);

}

// =====================
// EXERCICE
// =====================

let theme="33";
let nomExo="compensation";

let exo={

titre:"Compensation d’énergie réactive – Installation industrielle",

enonce:`
Une installation triphasée 400 V consomme une puissance active de \\(P=${P} kW\\).<br>
Le facteur de puissance initial est \\(cos\\varphi_1=${cosi}\\).<br>
On souhaite relever ce facteur de puissance à \\(cos\\varphi_2=${cosf}\\).<br><br>

On dispose d’une batterie de condensateurs standard.

${creationTab('Puissance batterie de compensation(kVAr)',Qct)}


Le schéma de l’installation est donné ci-dessous.
`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la puissance réactive initiale Q1",
reponse:Qi,
unite:"kVAr",
feedback:`\\(Q_1=P\\tan\\varphi_1=${arrondi(Qi)} kVAr\\)`
},

// =====================
{
texte:"Calculer la puissance réactive après compensation Q2",
reponse:Qf,
unite:"kVAr",
feedback:`\\(Q_2=P\\tan\\varphi_2=${arrondi(Qf)} kVAr\\)`
},

// =====================
{
texte:"Calculer la puissance de compensation nécessaire Qc",
reponse:Qc,
unite:"kVAr",
feedback:`\\(Q_c=Q_1-Q_2=${arrondi(Qc)} kVAr\\)`,
action:function(){
	let p;
    Condensateur("graph","Qc",x+70,y,90,"blue",false,false);
} 
},

// =====================
{
texte:"Calculer le courant avant compensation",
reponse:I1,
unite:"A",
feedback:`\\(I=\\frac{P}{\\sqrt{3}Ucos\\varphi}=${arrondi(I1)} A\\)`
},

// =====================
{
texte:"Déterminer la puissance apparente avant compensation",
reponse:Si,
unite:"kVA",
feedback:`\\(S=\\frac{P}{cos\\varphi}=${arrondi(Si)} kVA\\)`
},

// =====================
{
texte:"Choisir la batterie de condensateurs adaptée",
reponse:QcD,
unite:"kVAr",
feedback:`On choisit la valeur normalisée immédiatement supérieure : ${QcD} kVAr`
},

// =====================
{
type:"texte",
texte:"Quel est l’effet principal de la compensation ?",
reponse:["amélioration du facteur de puissance","réduction du courant","réduction de la puissance réactive consommée","réduction de la puissance apparente"],
unite:"",
feedback:`La compensation réduit la puissance réactive et améliore le cosφ → baisse du courant et des pertes Joule`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
    schemaExo("graph");
};