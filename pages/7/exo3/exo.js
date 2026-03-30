// =====================
// PARAMÈTRES
// =====================

// Plaque signalétique simplifiée (données typiques d’un moteur triphasé)
let P_mot = [0.75,1.1,1.5,2.2,3,4,5,5.5,7.5]; // P en kW
let P_nom=P_mot[Math.floor(Math.random()*P_mot.length)];
let etoile= (Math.floor(Math.random()*2)+0);
let U_nom;
if(etoile==1) {U_nom=[230, 400];}else{U_nom=[400, 690];}
let g_nom= (Math.floor(Math.random()*10)+1)/100;
let eta = (Math.floor(Math.random()*10)+70)/100; // 0.7 à 0.8
let cosphi = (Math.floor(Math.random()*15)+70)/100; // 0.7 à 0.85
let P_elec = P_nom / eta; // puissance électrique consommée approximative
let I_nom = arrondi((P_elec*1000)/(Math.sqrt(3)*U_nom[1]*cosphi));
 
let p=(Math.floor(Math.random()*3)+1);
let ns=3000/p;
let n_nom = arrondi(ns*(1-g_nom));
let f = 50; // Hz

// Calculs intermédiaires
let S = P_nom / cosphi; // puissance apparente en kVA
let Cn=P_nom/n_nom*60/2/3.14159;

// =====================
// EXERCICE
// =====================

let theme="7";
let nomExo="exo3";

let exo={

titre:"Étude de plaque d’un moteur triphasé asynchrone",

enonce:`On souhaite branché un moteur asynchrone triphasé dont la plaque signalétique est donnée ci dessous sur un réseau 3x400 V :

<ul>
<li>Puissance nominale : <b>${P_nom} kW</b></li>
<li>Tension nominale : <b>${U_nom[0]}/${U_nom[1]} V</b></li>
<li>Courant nominal : <b>${arrondi(I_nom*Math.sqrt(3))}/${I_nom} A</b></li>
<li>Vitesse nominale : <b>${n_nom} tr/min</b></li>
<li>Cos φ : <b>${cosphi}</b></li>
<li>Fréquence : <b>${f} Hz</b></li>
</ul>`,

questions:[

// =====================
{
type:"texte",
texte:"Comment coupler ce moteur?",
reponse:(etoile==1)?["étoile"]:["triangle"],
unite:"",
feedback:`Sur un réseau 3x400V, on couple un moteur 230/400V en étoile et un moteur 400/690V en triangle. On retient : \\(\\Delta / Y \\)`},

// =====================
{
texte:"Calculer la puissance apparente S consommée par le moteur",
reponse:arrondi(S),
unite:"kVA",
feedback:`\\(S=\\frac{P}{\\cos\\phi}=${arrondi(S)} kVA\\)`},

// =====================
{
texte:`Calculer la puissance électrique consommée \\(P_{elec}\\)`,
reponse:arrondi(P_elec,2),
unite:"kW",
feedback:`\\(P_{elec}=\\sqrt{3} UI cos \\varphi=${arrondi(P_elec,2)}\\;kW\\)`},

// =====================
{
texte:`Calculer le rendement du moteur`,
reponse:100*eta,
unite:"%",
feedback:`\\(\\eta=\\frac{P}{P_{elec}}=${100*eta}\\;\\%\\)`},

// =====================
{
texte:`Déterminer la vitesse de synchronisme`,
reponse:ns,
unite:"tr/min",
feedback:`On retient : les vitesses de synchronisme sont pour un réseau 50Hz : 3000, 1500, 1000 tr/min. On les retrouvre en faisant \\(n_s=\\frac{60f}{p}=${ns} tr/min\\) où p est le nombre de paires de pôles.`},

// =====================
{
texte:`Déterminer le nombre de paires de pôles`,
reponse:p,
unite:"",
feedback:`\\(p=\\frac{60f}{n_s}=${p}\\).`},

// =====================
{
texte:`Calculer le glissement g du moteur.`,
reponse:arrondi(g_nom),
unite:"",
feedback:`\\(g=\\frac{n_s-n}{n_s}=${g_nom}\\)`},

// =====================
{
texte:"Quel est le couple nominal du moteur?",
reponse:Cn,
unite:"Nm",
feedback:`On calcule \\(\\Omega=\\frac{2 \\pi n}{60}=${arrondi(2*3.14159/60*n_nom)} rad/s\\)<br>
Puis on calcule le couple du moteur \\(C=\\frac{P}{\\Omega}=${arrondi(Cn)} Nm\\)`},

// =====================
{
type:"texte",
texte:"Citer deux informations importantes de la plaque signalétique à vérifier avant le câblage",
reponse:["tension","courant","puissance","vitesse"],
feedback:"Vérifier la tension, le courant, la puissance et la vitesse avant de brancher le moteur."},

{
type:"texte",
texte:"Pourquoi le rendement n’est jamais égal à 100 % ?",
reponse:["pertes","échauffement","frottement","résistance"],
feedback:"Le rendement < 100% car il y a des pertes mécaniques et électriques (échauffement, frottement, pertes Joule)."}
]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};