// =====================
// PARAMÈTRES
// =====================

// Besoin énergétique journalier
let Ejour = (Math.floor(Math.random()*5)+8)*1000; // 8 à 12 kWh → en Wh

// Batterie
let Ubat = 24; // V
let Celem = (Math.floor(Math.random()*3)+100); // 100 à 120 Ah
let Uelem = 12; // V
let DoD = 0.6;
let eta_bat = (Math.floor(Math.random()*12)+80)/100;

// Autonomie souhaitée (jours)
let Nj = (Math.floor(Math.random()*2)+2); // 2 à 3 jours

// Panneaux
let Ppanneau = (Math.floor(Math.random()*3)+300); // 300 à 500 W
let Hs = (Math.floor(Math.random()*3)+3); // 3 à 5 h équivalent plein soleil
let eta_pv = (Math.floor(Math.random()*12)+80)/100;

// =====================
// CALCULS
// =====================

// Énergie à stocker
let Estock = Ejour * Nj;

// Énergie utile batterie
let Ebat_utile = Estock / eta_bat;

// Capacité nécessaire
let Cnecessaire = Ebat_utile / Ubat;

// Nombre en série
let Ns = Ubat / Uelem;

// Nombre en parallèle
let Np = Math.ceil(Cnecessaire / (Celem * DoD));

// Nombre total batteries
let Nbat = Ns * Np;

// Production d’un panneau (Wh/jour)
let Epanneau = Ppanneau * Hs * eta_pv;

// Nombre de panneaux
let Npanneaux = Math.ceil(Ejour / Epanneau);

// =====================
// EXERCICE
// =====================

let theme="5";
let nomExo="exo7";

let exo={

titre:"Dimensionnement d’une installation solaire autonome",

enonce:`Un site isolé consomme \\(E_{jour}=\\)${Ejour/1000} kWh par jour.
On souhaite une autonomie de \\(Nb_{jour}=\\)${Nj} jours sans soleil.

Le système fonctionne sous \\(U=\\)${Ubat} V.
On utilise des batteries de \\(U_{bat}=\\)${Uelem} V et \\(Q_{bat}=\\)${Celem} Ah.
La profondeur de décharge est limitée à \\(DoD=\\)${DoD*100}% et le rendement batterie est \\(\\eta_{bat}=\\)${eta_bat*100}%.

Les panneaux solaires ont une puissance de ${Ppanneau} W et produisent en moyenne \\(\\Delta t =\\)${Hs} h par jour.
Le rendement global photovoltaïque est de \\(\\eta_{PV}=\\)${eta_pv*100}%.`,

questions:[

// =====================
{
texte:"Calculer l’énergie à stocker",
reponse:Estock,
unite:"Wh",
feedback:`\\(E=E_{jour} \\times Nb_{jour}=${arrondi(Estock)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer l’énergie utile à fournir par la batterie",
reponse:Ebat_utile,
unite:"Wh",
feedback:`\\(E_{bat}=\\frac{E}{\\eta_{bat}}=${arrondi(Ebat_utile)}\\;Wh\\)`
},

// =====================
{
texte:"Calculer la capacité nécessaire",
reponse:Cnecessaire,
unite:"Ah",
feedback:`\\(Q=\\frac{E}{U}=${arrondi(Cnecessaire)}\\;Ah\\)`
},

// =====================
{
texte:"Combien de batteries faut-il en série ?",
reponse:Ns,
unite:"",
feedback:`\\(N_s=\\frac{U}{U_{bat}}=${Ns}\\)`
},

// =====================
{
texte:"Combien de branches en parallèle faut-il ?",
reponse:Np,
unite:"",
feedback:`\\(N_p=\\frac{Q}{Q_{bat}\\times DoD}=${Np}\\)`
},

// =====================
{
texte:"Calculer le nombre total de batteries",
reponse:Nbat,
unite:"",
feedback:`\\(N=N_p \\times N_s=${Nbat}\\)`
},

// =====================
{
texte:"Calculer l’énergie produite par un panneau en une journée",
reponse:Epanneau,
unite:"Wh",
feedback:`\\(E=P \\times \\Delta t \\times \\eta_{PV}=${arrondi(Epanneau)}\\;Wh\\)`
},

// =====================
{
texte:"Combien de panneaux faut-il ?",
reponse:Npanneaux,
unite:"",
feedback:`\\(N=\\frac{E_j}{E_{PV}}=${Npanneaux}\\)`
},

// =====================
{
texte:"Pourquoi ajoute-t-on plusieurs jours d’autonomie ? (1=sécurité, 2=augmenter tension, 3=réduire courant)",
reponse:1,
unite:"",
feedback:`Pour assurer le fonctionnement sans soleil`
}

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    genererExercice(exo);
};