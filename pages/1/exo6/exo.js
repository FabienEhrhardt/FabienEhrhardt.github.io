// =====================
// PARAMÈTRES
// =====================

//Alimentation 24V
let Ualim=24;
let PalimNom=Math.floor(Math.random()*10+5)*10;
let PpertesAlimNom=Math.floor(PalimNom/5);

//Transformateur
let Ptransfo=Math.floor(Math.random()*6+6)*10;
let etaTransfo=Math.floor(Math.random()*7+90);

//Variateur
let Pvariateur=Math.floor(Math.random()*10+12)*10;

//Automate
let Iauto=Math.floor(Math.random()*5+5)/10;

//Coffret
let Hauttab=[700,800,900,1000];
let n=Math.floor(Math.random()*Hauttab.length);



let Haut=Hauttab[n]; //mm
n=Math.floor(Math.random()*Hauttab.length);
let L=Hauttab[n];
let P=400;

let K=4; //W/m²/K

//Températures
let Tete=30;
let Thiver=16;

let Tmax=Math.floor(Math.random()*2+8)*5;

//Air
let rho=1.15;
let Cm=1000;



// =====================
// CALCULS
// =====================

//Alimentation
let Inalim=PalimNom/Ualim;
let Ialim=arrondi(Inalim*Math.floor(Math.random()*4+5)/10);
let PpertesAlim=arrondi(PpertesAlimNom*(Ialim*Ialim/Inalim/Inalim));

//Transformateur
let PpertesTransfo=arrondi(Ptransfo*(1/(etaTransfo/100)-1),1);

//Automate
let Pauto=arrondi(Ualim*Iauto,1);

//Puissance totale
let Ptot=arrondi(
    PpertesAlim+
    PpertesTransfo+
    Pvariateur+
    Pauto
,1);

//Puissance imposée suite exercice
let Phi=Ptot;

//Surface coffret
let Hm=Haut/1000;
let Lm=L/1000;
let Pm=P/1000;

let S=arrondi(
    2*(Hm*Lm+Hm*Pm+Lm*Pm)
,2);

//Surface corrigée
let Sc=arrondi(S*0.8);

//Résistance thermique
let Rth=arrondi(1/(K*Sc),3);

//Température été
let DeltaTete=arrondi(Phi*Rth,1);

let TinterEte=arrondi(Tete+DeltaTete,1);

//Température hiver
let TinterHiver=arrondi(Thiver+DeltaTete,1);

//Ventilation
let Pextraire=arrondi((TinterEte-Tmax)/(Rth),1);

//Débit massique
let qm=arrondi(Pextraire/(Cm*(Tmax-Tete)),4);

//Débit volumique
let qv=arrondi(qm/rho*3600,1);

// =====================
// POSITIONS CANVAS
// =====================

let PosConv;
let PosVentil;
let PosPhi;
let PosTi, PosTe;
let PosAlim, PosTransfo;

// =====================
// CANVAS
// =====================

function tracerArmoire(canvasId, ventil=false){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);


    ctx.strokeStyle="#3A7BFF";
    ctx.lineWidth=2;

    //Armoire
    ctx.strokeRect(40,80,260,300);

    //Bloc interne
    ctx.strokeRect(60,275,220,95);
	

	ctx.strokeStyle="#4A7DDB";
    ctx.fillStyle="#4A7DDB";
    //Flèche ventilation
    tracerFleche(ctx,170,275,0,-55);

    //Flèches chaleur
    tracerFleche(ctx,300,180,70,0);
    if(ventil){tracerFleche(ctx,300,240,70,0);}

    //Titres
    ctx.fillStyle="black";
    ctx.font="15px Arial";
    ctx.textAlign="center";

    ctx.fillText("Armoire électrique",170,45);
	ctx.fillText("Φ",170,180);
	ctx.fillText("Ti",280,100);
	ctx.fillText("Te",320,100);
	ctx.fillText("30°C",320,120);
	ctx.fillText("Convection",420,180);
	if(ventil){ctx.fillText("Ventillation",420,240);}

    //Positions textes
    PosAlim={x:80,y:295};
    PosTransfo={x:80,y:315};
	PosAuto={x:80,y:335};
	PosVar={x:80,y:355};
    PosConv={x:420,y:200};
    PosVentil={x:420,y:260};
    PosPhi={x:130,y:200};
	PosTi={x:260,y:120};
	PosTe={x:320,y:120};

}

function tracerFleche(ctx,x,y,dx,dy){


    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+dx,y+dy);
    ctx.stroke();

    let angle=Math.atan2(dy,dx);

    ctx.beginPath();
    ctx.moveTo(x+dx+5*Math.cos(angle),y+dy+5*Math.sin(angle));

    ctx.lineTo(
        x+dx-15*Math.cos(angle-Math.PI/6),
        y+dy-15*Math.sin(angle-Math.PI/6)
    );

    ctx.lineTo(
        x+dx-15*Math.cos(angle+Math.PI/6),
        y+dy-15*Math.sin(angle+Math.PI/6)
    );

    ctx.closePath();
    ctx.fill();

}

function ajouterTexte(canvasId,texte,x,y,couleur){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.fillStyle=couleur;
    ctx.font="14px Arial";
    ctx.textAlign="left";

    ctx.fillText(texte,x,y);

}

// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo6";

let exo={

titre:"Armoire électrique – Étude thermique complète",

enonce:`Soit une armoire électrique comportant :
<ul>
<li>une alimentation 24V-${PalimNom}W dissipant ${PpertesAlimNom} W au nominal fournissant un courant réel de ${Ialim} A  ;</li>
<li>un transformateur de puissance nominale ${Ptransfo} W de rendement ${etaTransfo}% ;</li>
<li>un variateur dissipant ${Pvariateur} W ;</li>
<li>un automate consommant ${Iauto} A sous 24V.</li>
</ul>

Le coffret polyester possède les dimensions :
\\(${Haut} \\times ${L} \\times ${P}~mm\\).<br>

Le coefficient thermique vaut :
\\(K=${K}~W.m^{-2}.K^{-1}\\).<br>

La température ambiante varie :
<ul>
<li>${Thiver}°C en hiver ;</li>
<li>${Tete}°C en été.</li>
</ul>

Le cahier des charges impose :
\\(T_{max}=${Tmax}°C\\).`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la puissance thermique dissipée par l’alimentation.",
reponse:PpertesAlim,
unite:"W",
feedback:`\\(I_{nalim}=\\frac{P_{alim}}{V_{alim}}\\)<br>
\\(P_p=P_{pertes~nominales} \\frac{I_{alim}^2}{I_{n~alim}^2}\\)<br>
\\(P_p=${PpertesAlim}~W\\)`,
action:function(){
    ajouterTexte("graph",`Alimentation : ${PpertesAlim} W`,PosAlim.x,PosAlim.y, "black");
}
},

// =====================
{
texte:"Calculer la puissance thermique dissipée par le transformateur.",
reponse:PpertesTransfo,
unite:"W",
feedback:`\\(P_p=P_u(\\frac{1}{\\eta}-1)\\)<br>
\\(P_p=${PpertesTransfo}~W\\)`,
action:function(){
    ajouterTexte("graph",`Transformateur : ${PpertesTransfo} W`,PosTransfo.x,PosTransfo.y, "black");
}
},

// =====================
{
texte:"Calculer la puissance dissipée par l’automate.",
reponse:Pauto,
unite:"W",
feedback:`\\(P=UI\\)<br>
\\(P=24\\times${Iauto}=${Pauto}~W\\)`,
action:function(){
    ajouterTexte("graph",`Automate : ${Pauto} W`,PosAuto.x,PosAuto.y, "black");
	ajouterTexte("graph",`Variateur : ${Pvariateur} W`,PosVar.x,PosVar.y, "black");
}
},

// =====================
{
texte:"Déterminer la puissance thermique totale dissipée.",
reponse:Ptot,
unite:"W",
feedback:`\\(\\Phi=P_{alim}+P_{transfo}+P_{var}+P_{auto}\\)<br>
\\(\\Phi=${Ptot}~W\\)`,
action:function(){
    ajouterTexte("graph",`Total : ${Ptot} W`,PosPhi.x,PosPhi.y);
    ajouterTexte("graph",`${Ptot} W`,PosConv.x,PosConv.y, "black");
}
},

// =====================
{
type:"texte",
texte:`Justifier que la température maximale de ${Tmax} °C est cohérente.`,
reponse:[
"oui",
"compatible",
"respecte les composants"
],
feedback:`Les composants fonctionnent jusqu’à environ 50 à 60°C. Une limite à 45°C permet une marge de sécurité.`
},

// =====================
{
texte:"Calculer la surface totale du coffret.",
reponse:S,
unite:"m²",
feedback:`\\(S=2(LH+LP+HP)\\)<br>
\\(S=${S}~m²\\)`
},

// =====================
{
texte:`Pour la suite on prendra une surface corrigée de ${Sc} m².<br> Déterminer la résistance thermique de l’armoire.`,
reponse:Rth,
unite:"K/W",
feedback:`\\(R_{th}=\\frac{1}{KS}\\)<br>
\\(R_{th}=\\frac{1}{${K}\\times${Sc}}=${Rth}~K/W\\)`
},

// =====================
{
texte:"Calculer la température intérieure de l’armoire en été.",
reponse:TinterEte,
unite:"°C",
feedback:`\\(\\Delta T=\\Phi R_{th}\\)<br>
\\(\\Delta T=${Phi}\\times${Rth}=${DeltaTete}°C\\)<br>
\\(T=${Tete}+${DeltaTete}=${TinterEte}°C\\)`,

action:function(){
    ajouterTexte("graph",`${TinterEte}°C`,PosTi.x,PosTi.y, "black");
}
},
// =====================
{
texte:"Calculer la température intérieure de l’armoire en hiver.",
reponse:TinterHiver,
unite:"°C",
feedback:`\\(T=${Thiver}+${DeltaTete}=${TinterHiver}°C\\)`
},

// =====================
{
type:"texte",
texte:"Conclure sur la nécessité d’une ventilation.",
reponse:[
"oui",
"ventilation nécessaire",
"dépassement"
],
feedback:`La température dépasse le cahier des charges en été, une ventilation est nécessaire.`
,
action:function(){
    tracerArmoire("graph",true);
	ajouterTexte("graph",`${Tmax}°C`,PosTi.x,PosTi.y, "black");
	ajouterTexte("graph",`Alimentation : ${PpertesAlim} W`,PosAlim.x,PosAlim.y, "black");
    ajouterTexte("graph",`Transformateur : ${PpertesTransfo} W`,PosTransfo.x,PosTransfo.y, "black");
    ajouterTexte("graph",`Automate : ${Pauto} W`,PosAuto.x,PosAuto.y, "black");
	ajouterTexte("graph",`Variateur : ${Pvariateur} W`,PosVar.x,PosVar.y, "black");
	ajouterTexte("graph",`Total : ${Ptot} W`,PosPhi.x,PosPhi.y);
}
},

// =====================
{
texte:"Déterminer la puissance thermique à extraire.",
reponse:Pextraire,
unite:"W",
feedback:`Flux de convection naturelle : \\(\\Phi_c=\\frac{\\Delta T}{R_{th}}=\\frac{${Tmax}-${Tete}}{${Rth}}=${arrondi((Tmax-Tete)/Rth)} W\\) <br>
Puissance à extraire par le ventilateur : \\(P=\\Phi-\\Phi_c\\)<br>
\\(P=${Pextraire}~W\\)`,
action:function(){
	ajouterTexte("graph",`${arrondi((Tmax-Tete)/Rth)} W`,PosConv.x,PosConv.y, "black");
	ajouterTexte("graph",`${Pextraire} W`,PosVentil.x,PosVentil.y);
}
},

// =====================
{
texte:"Calculer la masse d'air à extraire chaque seconde.",
reponse:qm,
unite:"kg",
feedback:`\\(\\Phi=m C_m \\frac{\\Delta T}{\\Delta t}\\)<br>
\\(m=\\frac{\\Phi} {C_m \\frac{\\Delta T}{\\Delta t}}\\)<br>
\\(m=${qm}~kg\\)`
},

// =====================
{
texte:"Calculer le débit volumique du ventilateur.",
reponse:qv,
unite:`\\(m^3/h\\)`,
feedback:`\\(V=\\frac{qm}{\\rho}\\)<br>
\\(Q_v=\\frac{\\Delta V}{\\Delta t}=${arrondi(qv/3600)}~m^3/s\\)<br>
\\(Q_v=${qv}~m^3/h\\)`
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

    tracerArmoire("graph");

};