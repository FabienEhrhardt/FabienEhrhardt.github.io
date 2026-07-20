// =====================
// PARAMÈTRES
// =====================

let situations=[
{
objet:"une éolienne",
source:"Vent",
renouvelable:"Oui",
forme1:"Cinétique",
forme2:"Électrique"
},
{
objet:"un panneau photovoltaïque",
source:"Soleil",
renouvelable:"Oui",
forme1:"Rayonnante",
forme2:"Électrique"
},
{
objet:"une centrale nucléaire",
source:"Uranium",
renouvelable:"Non",
forme1:"Nucléaire",
forme2:"Électrique"
},
{
objet:"une chaudière gaz",
source:"Gaz naturel",
renouvelable:"Non",
forme1:"Chimique",
forme2:"Thermique"
},
{
objet:"un moteur électrique",
source:"Électricité",
renouvelable:"Variable",
forme1:"Électrique",
forme2:"Mécanique"
},
{
objet:"une batterie",
source:"Batterie",
renouvelable:"Variable",
forme1:"Chimique",
forme2:"Électrique"
},
{
objet:"un barrage hydraulique",
source:"Eau",
renouvelable:"Oui",
forme1:"hydraulique",
forme2:"Électrique"
},
{
objet:"une voiture thermique",
source:"Essence",
renouvelable:"Non",
forme1:"Chimique",
forme2:"Mécanique"
},
{
objet:"une pompe à chaleur",
source:"Air extérieur",
renouvelable:"Oui",
forme1:"Thermique",
forme2:"Thermique"
},
{
objet:"une pompe",
source:"Électricité",
renouvelable:"Variable",
forme1:"Électrique",
forme2:"hydraulique"
}
];

let n=Math.floor(Math.random()*situations.length);

let s=situations[n];

// =====================
// CANVAS
// =====================

function schemaExo(canvasId){

    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.font="20px Arial";
    ctx.textAlign="center";

    ctx.strokeRect(150,120,270,80);
    ctx.fillText(s.objet,285,165);

    ctx.beginPath();
    ctx.moveTo(20,160);
    ctx.lineTo(150,160);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(420,160);
    ctx.lineTo(550,160);
    ctx.stroke();

    ctx.fillText("Entrée",70,145);
    ctx.fillText("Sortie",500,145);
}

// =====================
// EXERCICE
// =====================

let theme="1";
let nomExo="exo7";

let exo={

titre:"Différencier source d'énergie et forme d'énergie",

enonce:`
On étudie le fonctionnement d'<b>${s.objet}</b>.

Compléter les informations concernant les différentes formes d'énergie mises en jeu.
`,

courbe1:{},

questions:[

//=====================
{
type:"texte",
texte:"Quelle est la source d'énergie utilisée ?",
reponse:[s.source],
unite:"",
feedback:`La source d'énergie est : <b>${s.source}</b>.`
},

//=====================
{
type:"texte",
texte:"Cette source est-elle renouvelable ? (Oui ou Non)",
reponse:[s.renouvelable],
unite:"",
feedback:`Réponse : <b>${s.renouvelable}</b>.`
},

//=====================
{
type:"texte",
texte:"Quelle est la forme d'énergie en entrée ?",
reponse:[s.forme1],
unite:"",
feedback:`La forme d'énergie d'entrée est : <b>${s.forme1}</b>.`
},

//=====================
{
type:"texte",
texte:"Quelle est la forme d'énergie en sortie ?",
reponse:[s.forme2],
unite:"",
feedback:`La forme d'énergie en sortie est : <b>${s.forme2}</b>.`
},

//=====================
{
type:"texte",
texte:"Le système réalise-t-il une conversion d'énergie ? (Oui ou Non)",
reponse:["Oui"],
unite:"",
feedback:`Tout convertisseur transforme une forme d'énergie en une autre.`
},

//=====================
{
type:"texte",
texte:"Les pertes sont principalement sous quelle forme ?",
reponse:["Thermique"],
unite:"",
feedback:`Les pertes sont généralement dissipées sous forme d'énergie thermique.`
},

//=====================
{
type:"texte",
texte:`Compléter la chaîne énergétique : ${s.forme1} → ? → ${s.forme2}`,
reponse:[s.objet],
unite:"",
feedback:`La chaîne énergétique est : ${s.forme1} → ${s.objet} → ${s.forme2}.`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

    genererExercice(exo);

    schemaExo("graph");

};