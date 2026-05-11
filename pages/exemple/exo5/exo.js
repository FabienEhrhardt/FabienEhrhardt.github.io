// =====================
// PARAMÈTRES
// =====================

//Puissance apparente
St=[50,100,160,250,315,400,500,630,800,1000,1250,1600,2000,2500];
//Pertes à vide
P0t=[90,145,210,300,360,430,510,600,650,770,950,1200,1450,1750];
//Pertes en charge
Pkt=[750,1250,1700,2350,2800,3250,3900,4600,6000,7600,9500,12000,15000,1850]
let n=Math.floor(Math.random()*St.length);
let S=St[n];
let P0=P0t[n];
let Pk=Pkt[n];
let Ucc;
if(S<800){Ucc=4;}else{Ucc=6;}

let cosphi=Math.floor(Math.random()*25+70)/100;

//Calculs
let Pu = S*cosphi;
let Pa = arrondi(Pu + P0/1000 + Pk/1000);
let eta = arrondi(Pu/Pa*100);
let I2n=S/Math.sqrt(3)/400*1000;

let cosphi2=Math.floor(Math.random()*5+90)/100;
let I2=Pu/Math.sqrt(3)/400/cosphi2*1000;
let Ppertes=P0+Pk*I2*I2/I2n/I2n;

//Pour le graphique
let PosPu,PosPf,PosPj,PosPa;


// =====================
// CANVAS
// =====================
function tracerBilanPuissanceStylise(canvasId, afficherValeurs=0){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let y = 150;
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;
	let couleur="black";
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Pa",60,y);
	PosPa={x:60,y:y};
	PosPu=tracerFleche(canvasId,100,y,300,100,0,"Pu",couleur);
	ctx.fillRect(100,y,100, 90);
	ctx.fillRect(100,y,200, 70);
	PosPf=tracerFleche(canvasId,175,y,150,50,60,"Pf",couleur);
	PosPj=tracerFleche(canvasId,275,y,150,50,60,"Pj",couleur);
	
	

}
function ajouterTexte(canvasId,texte,x,y){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let couleur="black";
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(texte, x, y+15);

}



function tracerFleche(canvasId,x0,y0,longueur,largeur,angle,nom,couleur) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  // Origine du repère
  let rad = angle * Math.PI / 180;
  let scale;
  
  let x1 = x0+largeur/2* Math.sin(rad);
  let x2 = x0-largeur/2* Math.sin(rad);
  let y1 = y0-largeur/2* Math.cos(rad);
  let y2 = y0+largeur/2* Math.cos(rad);
  let x3 = x1 + longueur * Math.cos(rad);
  let y3 = y1 + longueur * Math.sin(rad);
  let x4 = x2 + longueur * Math.cos(rad);
  let y4 = y2 + longueur * Math.sin(rad);
  
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;

  // ===== Pointe de flèche =====
  let taille = largeur*1.2;       // longueur de la flèche
  let ouverture = Math.PI / 4;  // angle d’ouverture (~30°)
  
  //position flèche
  let x5 = x0 + (longueur+taille/2/Math.cos(ouverture)) * Math.cos(rad);
  let y5 = y0 + (longueur+taille/2/Math.cos(ouverture)) * Math.sin(rad);
  //
  let x6=x5 - taille * Math.cos(rad - ouverture);
  let y6=y5 - taille * Math.sin(rad - ouverture);
  
  let x7=x5 - taille * Math.cos(rad + ouverture);
  let y7=y5 - taille * Math.sin(rad + ouverture);
  let x8=x5 + (20) * Math.cos(rad);
  let y8=y5 + (20) * Math.sin(rad);
  
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x3,y3);
  ctx.lineTo(x7,y7);
  ctx.lineTo(x5,y5);
  ctx.lineTo(x6,y6);
  ctx.lineTo(x4,y4);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x1,y1);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(nom, x8, y8);
  return {x:x8,y:y8};
}



// =====================
// EXERCICE
// =====================

let theme="33";
let nomExo="exo5";

let exo={

titre:"Transformateur triphasé – Bilan de puissance",

enonce:`Un transformateur triphasé 20kV / 400V alimente une installation industrielle.<br>
La puissance apparente du transformateur est de \\(S_N=${S} kVA\\).<br>
Les pertes à vide sont de \\(P_0=${P0} W\\) et les pertes en charges sont de \\(P_k=${Pk} W\\).<br>
La tension de court circuit est de \\(U_{cc}(\\%)=${Ucc}\\%\\).<br>
Le facteur de puissance de la charge est de \\(cos \\varphi = ${cosphi}\\).
 
Le schéma de puissance est donné ci-dessous.`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la puissance fournie au secondaire",
reponse:Pu,
unite:"kW",
feedback:`\\(Pu=S_N cos \\varphi=${arrondi(Pu)} kW\\)`,
action:function(){
    ajouterTexte("graph",`${Pu} kW`, PosPu.x, PosPu.y+15);
}
},

// =====================
{
texte:"Déterminer les pertes fer au régime nominal",
reponse:P0,
unite:"W",
feedback:`Les pertes fer sont égales aux pertes à vide : \\(P_F=P_0=${arrondi(P0)} W\\)`,
action:function(){
     ajouterTexte("graph",`${P0} W`, PosPf.x, PosPf.y+15);;
}
},

// =====================
{
texte:"Déterminer les pertes joules au régime nominal",
reponse:Pk,
unite:"W",
feedback:`Les pertes joules sont égales aux pertes en charge : \\(P_j=P_k=${arrondi(Pk)} W\\). <br>
C'est également la puissance mesurée lors d'un essai en court-circuit.`,
action:function(){
     ajouterTexte("graph",`${Pk} W`, PosPj.x, PosPj.y+15);
}
},

// =====================
{
texte:"Calculer les pertes totales au régime nominal",
reponse:(P0+Pk),
unite:"W",
feedback:`On fait la somme des pertes ! \\(P_{pertes} = P_0 + Pk=${(arrondi(P0+Pk))} W\\)`
},

// =====================
{
texte:"Calculer la puissance absorbée au régime nominal",
reponse:Pa,
unite:"kW",
feedback:`Attention les pertes sont donnés en W! \\(P_a=P_u+P_{pertes}=${Pa} kW\\)`,
action:function(){
     ajouterTexte("graph",`${Pa} kW`, PosPa.x, PosPa.y+15);
}
},
// =====================
{
texte:"Calculer le rendement du transformateur",
reponse:eta,
unite:"%",
feedback:`\\(\\eta=\\frac{P_u}{P_a}=${eta} \\%\\)`
},

// =====================
{
type:"texte",
texte:"Les pertes Joule dépendent-elles de la charge ?",
reponse:["oui","proportionnelles à I²","proportionnelle à I²"],
feedback:`Oui car les pertes Joule sont proportionnelles à I²`
},

// =====================
{
type:"texte",
texte:"Les pertes fer dépendent-elles de la charge ?",
reponse:["non","tension constante"],
feedback:`Non, les pertes fer sont constantes si la tension au primaire est constante.`
},

// =====================
{
type:"texte",
texte:"Que devient l’énergie perdue ?",
reponse:["chaleur","dissipation thermique"],
feedback:`Elle se transforme en chaleur, il y a de la dissipation thermique.`
},

// =====================
{
texte:`On suppose pour la suite avoir une puissance au secondaire de \\(P_u=${Pu}kW\\) avec un facteur de puissance de \\(cos \\varphi=${cosphi2}\\). <br>
Calculer le courant fournit par le transformateur.`,
reponse:I2,
unite:"A",
feedback:`\\(I_2=\\frac{P_u}{\\sqrt{3}U \\cos \\varphi}=${arrondi(I2)} A\\)`
},

// =====================
{
texte:`Déterminer alors les pertes.`,
reponse:Ppertes,
unite:"W",
feedback:`On doit calculer \\(I_{2n}=\\frac{S_n}{\\sqrt{3}U}=${arrondi(I2n)} A\\).<br>
Puis on calcule les pertes \\(P_p=P_0+P_k \\frac{I^2_2}{I_{2n}^2}=${arrondi(Ppertes)}W\\).`
},


// =====================
{
texte:`En déduire la nouvelle valeur de la puissance absorbée.`,
reponse:(Pu+Ppertes/1000),
unite:"kW",
feedback:`Attention les pertes sont donnés en W! \\(P_a=P_u+P_p=${arrondi(Pu+Ppertes/1000)}kW\\)`
},


]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){

    genererExercice(exo);

    tracerBilanPuissanceStylise("graph", 0);
};