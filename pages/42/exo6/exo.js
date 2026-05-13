// =====================
// PARAMÈTRES
// =====================

//Débits capteurs
let Q1=Math.floor(Math.random()*40+20); //L/min
let Q2=Math.floor(Math.random()*8+4);   //m3/h
let Q3=Math.floor(Math.random()*30+10); //L/s

//Conduites
let D1=Math.floor(Math.random()*40+40)/1000; //m


// =====================
// CALCULS
// =====================

//Conversions débit 1
let Q1m3s=arrondi(Q1/1000/60,5);

let Q1m3h=arrondi(Q1/1000*60,2);

//Conversions débit 2
let Q2m3s=arrondi(Q2/3600,5);

let Q2Ls=arrondi(Q2*1000/3600,2);

//Conversions débit 3
let Q3m3s=arrondi(Q3/1000,4);

let Q3m3h=arrondi(Q3*3.6,1);

//Débit total
let Qtotal=arrondi(Q1m3s+Q2m3s+Q3m3s,4);

let Qtotalm3h=arrondi(Qtotal*3600,1);

//Sections
let S1=arrondi(Math.PI*D1*D1/4,5);


//Vitesses
let v1=arrondi(Qtotal/S1,2);

// =====================
// POSITIONS CANVAS
// =====================

let PosQ1;
let PosQ2;
let PosQ3;
let PosQtot;
let Posv1;
let Posv2;

// =====================
// CANVAS
// =====================

function tracerInstallation(canvasId){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="#4090FF";
    ctx.lineWidth=10;

    //Canalisation principale
    ctx.beginPath();
    ctx.moveTo(75,220);
    ctx.lineTo(500,220);
    ctx.stroke();

    //Entrées verticales
    ctx.beginPath();
    ctx.moveTo(80,80);
    ctx.lineTo(80,220);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200,80);
    ctx.lineTo(200,220);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(320,80);
    ctx.lineTo(320,220);
    ctx.stroke();

    //Capteurs
    tracerCapteur(ctx,40,60,"Q1");
    tracerCapteur(ctx,160,60,"Q2");
    tracerCapteur(ctx,280,60,"Q3");

    //Flèches
    tracerFleche(ctx,80,120,0,60);
    tracerFleche(ctx,200,120,0,60);
    tracerFleche(ctx,320,120,0,60);

    tracerFleche(ctx,340,220,60,0);

    //Textes
    ctx.fillStyle="black";
    ctx.font="16px Arial";
    ctx.textAlign="center";

    ctx.fillText("Collecteur principal",390,270);

    PosQ1={x:80,y:20};
    PosQ2={x:200,y:20};
    PosQ3={x:320,y:20};

    PosQtot={x:510,y:200};

    Posv1={x:510,y:240};
}

function tracerCapteur(ctx,x,y,nom){

    ctx.fillStyle="#E0E0E0";
    ctx.strokeStyle="black";
    ctx.lineWidth=2;

    ctx.fillRect(x,y,80,40);

    ctx.strokeRect(x,y,80,40);

    ctx.fillStyle="black";
    ctx.font="16px Arial";
    ctx.textAlign="center";

    ctx.fillText(nom,x+40,y+25);

}

function tracerFleche(ctx,x,y,dx,dy){

    ctx.strokeStyle="#2050A0";
    ctx.fillStyle="#2050A0";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+dx,y+dy);
    ctx.stroke();

    let angle=Math.atan2(dy,dx);

    ctx.beginPath();
    ctx.moveTo(x+dx,y+dy);

    ctx.lineTo(
        x+dx-12*Math.cos(angle-Math.PI/6),
        y+dy-12*Math.sin(angle-Math.PI/6)
    );

    ctx.lineTo(
        x+dx-12*Math.cos(angle+Math.PI/6),
        y+dy-12*Math.sin(angle+Math.PI/6)
    );

    ctx.closePath();
    ctx.fill();

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

let theme="42";
let nomExo="exo6";

let exo={

titre:"Installation hydraulique – Bilan des débits",

enonce:`Une installation hydraulique industrielle comporte plusieurs capteurs de débit configurés avec des unités différentes.<br><br>

Les débits mesurés sont :
<ul>
<li>Capteur 1 : \\(${Q1}~L/min\\)</li>
<li>Capteur 2 : \\(${Q2}~m^3/h\\)</li>
<li>Capteur 3 : \\(${Q3}~L/s\\)</li>
</ul>

La conduite principale possède le diamètre suivant : \\(${arrondi(D1*1000)}~mm\\)

Le schéma de l’installation est donné ci-dessous.`,

courbe1:{},

questions:[

// =====================
{
texte:"Convertir le débit Q1 en m³/s.",
reponse:Q1m3s,
unite:"m3/s",
feedback:`\\(Q=${Q1}~L/min\\)<br>
\\(Q=${Q1m3s}~m^3/s\\)`,
action:function(){
    ajouterTexte("graph",`${Q1m3s} m³/s`,PosQ1.x,PosQ1.y);
}
},

// =====================
{
texte:"Convertir le débit Q1 en m³/h.",
reponse:Q1m3h,
unite:"m3/h",
feedback:`\\(Q=${Q1m3h}~m^3/h\\)`
},

// =====================
{
texte:"Convertir le débit Q2 en L/s.",
reponse:Q2Ls,
unite:"L/s",
feedback:`\\(Q=${Q2}~m^3/h\\)<br>
\\(Q=${Q2Ls}~L/s\\)`,

},

// =====================
{
texte:"Convertir le débit Q2 en m³/s.",
reponse:Q2m3s,
unite:"m3/s",
feedback:`\\(Q=${Q2m3s}~m^3/s\\)`,
action:function(){
    ajouterTexte("graph",`${Q2m3s} m³/s`,PosQ2.x,PosQ2.y);
}
},

// =====================
{
texte:"Convertir le débit Q3 en m³/s.",
reponse:Q3m3s,
unite:"m3/s",
feedback:`\\(Q=${Q3}~L/s\\)<br>
\\(Q=${Q3m3s}~m^3/s\\)`,
action:function(){
    ajouterTexte("graph",`${Q3m3s} m³/s`,PosQ3.x,PosQ3.y);
}
},

// =====================
{
texte:"Convertir le débit Q3 en m³/h.",
reponse:Q3m3h,
unite:"m3/h",
feedback:`\\(Q=${Q3m3h}~m^3/h\\)`
},

// =====================
{
texte:"Déterminer le débit total dans la conduite principale.",
reponse:Qtotal,
unite:"m3/s",
feedback:`\\(Q_{tot}=Q_1+Q_2+Q_3\\)<br>
\\(Q_{tot}=${Qtotal}~m^3/s\\)`,
action:function(){
    ajouterTexte("graph",`Qtot = ${Qtotal} m³/s`,PosQtot.x,PosQtot.y);
}
},

// =====================
{
texte:"Convertir le débit total en m³/h.",
reponse:Qtotalm3h,
unite:"m3/h",
feedback:`\\(Q=${Qtotalm3h}~m^3/h\\)`
},

// =====================
{
texte:"Calculer la section de la conduite principale.",
reponse:S1,
unite:"m2",
feedback:`\\(S=\\frac{\\pi D^2}{4}\\)<br>
\\(S=${S1}~m^2\\)`
},

// =====================
{
texte:"Calculer la vitesse du fluide dans la conduite principale.",
reponse:v1,
unite:"m/s",
feedback:`\\(v=\\frac{Q}{S}\\)<br>
\\(v=\\frac{${Qtotal}}{${S1}}=${v1}~m/s\\)`,
action:function(){
    ajouterTexte("graph",`v = ${v1} m/s`,Posv1.x,Posv1.y);
}
},

// =====================
{
type:"texte",
texte:"Pourquoi faut-il homogénéiser les unités avant de faire un bilan de débit ?",
reponse:[
"addition",
"mêmes unités",
"cohérence"
],
feedback:`Tous les débits doivent être exprimés dans la même unité avant d’être additionnés.`
},

// =====================
{
type:"texte",
texte:"Que se passe-t-il si le diamètre d’une conduite diminue pour un même débit ?",
reponse:[
"vitesse augmente",
"augmentation vitesse"
],
feedback:`Pour un même débit, une diminution de section entraîne une augmentation de la vitesse du fluide.`
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

    tracerInstallation("graph");

};