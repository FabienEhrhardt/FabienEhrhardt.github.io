// =====================
// PARAMÈTRES
// =====================

// Besoin énergétique annuel du site
let Econs=Math.floor(Math.random()*6+8)*10000; // kWh/an

// Productible spécifique du site
let productible=[1050,1100,1150,1200,1250,1300][Math.floor(Math.random()*6)]; // kWh/kWc/an

// Puissance d'un panneau
let Ppanneau=[400,420,450,500][Math.floor(Math.random()*4)]; // Wc

// Surface d'un panneau
let surfacePanneau=[1.9,2.0,2.1,2.2][Math.floor(Math.random()*4)]; // m²

// Taux de couverture énergétique recherché
let tauxCouverture=[0.30,0.40,0.50,0.60][Math.floor(Math.random()*4)];

// Coefficient de pertes globales
let pertes=[0.10,0.12,0.15,0.18][Math.floor(Math.random()*4)];

// Productible réellement retenu après pertes
let productibleNet=productible*(1-pertes);

// Puissance photovoltaïque nécessaire
let PpvNec=Econs*tauxCouverture/productibleNet; // kWc

// Nombre de panneaux
let nbPanneaux=Math.ceil(PpvNec/(Ppanneau/1000));

// Puissance réellement installée
let PpvInst=nbPanneaux*Ppanneau/1000;

// Surface totale
let surfaceTotale=nbPanneaux*surfacePanneau;

// Production annuelle réelle
let Eprod=PpvInst*productibleNet;

// Taux de couverture réel
let couvertureReelle=Eprod/Econs;

// Surplus / déficit
let Eecart=Eprod-Econs*tauxCouverture;


// =====================
// CALCULS
// =====================

let Pn=arrondi(PpvNec,2);
let Pi=arrondi(PpvInst,2);
let surf=arrondi(surfaceTotale,1);
let Prod=arrondi(Eprod,0);
let cov=arrondi(couvertureReelle*100,1);
let ecart=arrondi(Eecart,0);


// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo9";

let exo={

titre:"Dimensionnement d'une centrale photovoltaïque – étude du productible",

enonce:`Une entreprise souhaite installer une centrale photovoltaïque sur la toiture de son bâtiment afin de couvrir une partie de sa consommation électrique annuelle.

La consommation électrique annuelle du bâtiment est de \\(${Econs.toLocaleString("fr-FR")}\\) kWh/an.

Le site présente un productible photovoltaïque théorique de \\(${productible}\\) kWh/kWc/an.

On souhaite couvrir environ \\(${tauxCouverture*100}\\) % de la consommation annuelle grâce à l'installation photovoltaïque.

On considère que les différentes pertes de l'installation représentent \\(${pertes*100}\\) % de la production théorique.

Un panneau photovoltaïque possède :
<ul>

<li>une puissance crête de \\(${Ppanneau}\\) Wc ;</li>
<li>une surface de \\(${surfacePanneau}\\) m².</li>
</ul>

Le productible est donné en \\(\\text{kWh/kWc/an}\\). Il indique l'énergie électrique produite en une année par une installation de puissance crête égale à 1 kWc.`,

questions:[

//====================
{
texte:"Indiquer la puissance crête nécessaire de l'installation photovoltaïque pour atteindre l'objectif de couverture avant prise en compte des pertes.",
reponse:arrondi(Econs*tauxCouverture/productible,2),
unite:"kWc",
feedback:`L'énergie photovoltaïque recherchée est :<br>
\\[
E_{PV}=E_{consommée}\\times taux_{couverture}
\\]

Puis on utilise le productible :<br>
\\[
P_{PV}=\\frac{E_{PV}}{Productible}
\\]

Donc :<br>
\\[
P_{PV}=\\frac{${Econs}\\times${tauxCouverture}}{${productible}}
\\]

\\[
\\boxed{P_{PV}=${arrondi(Econs*tauxCouverture/productible,2)}\\ \\text{kWc}}
\\]`
},

//====================
{
texte:"Calculer le productible réellement disponible après prise en compte des pertes de l'installation.",
reponse:arrondi(productibleNet,1),
unite:"kWh/kWc/an",
feedback:`Les pertes représentent \\(${pertes*100}\\) %.

Le productible réellement disponible est donc :<br>
\\[
Productible_{net}=Productible\\times(1-taux_{pertes})
\\]

\\[
Productible_{net}=${productible}\\times(1-${pertes})
\\]

\\[
\\boxed{Productible_{net}=${arrondi(productibleNet,1)}\\ \\text{kWh/kWc/an}}
\\]`
},

//====================
{
texte:"Déterminer la puissance crête photovoltaïque nécessaire en tenant compte des pertes.",
reponse:Pn,
unite:"kWc",
feedback:`L'énergie à produire reste :<br>
\\[
E_{PV}=E_{consommée}\\times taux_{couverture}
\\]

Avec le productible net :<br>
\\[
P_{PV}=\\frac{E_{PV}}{Productible_{net}}
\\]

\\[
P_{PV}=\\frac{${Econs}\\times${tauxCouverture}}{${arrondi(productibleNet,1)}}
\\]

\\[
\\boxed{P_{PV}=${Pn}\\ \\text{kWc}}
\\]`
},

//====================
{
texte:"Calculer le nombre de panneaux photovoltaïques nécessaires pour atteindre ou dépasser cette puissance.",
reponse:nbPanneaux,
unite:"panneaux",
feedback:`La puissance d'un panneau en kWc est :<br>
\\[
P_{panneau}=\\frac{${Ppanneau}}{1000}
\\]

Le nombre théorique de panneaux est :<br>
\\[
N=\\frac{P_{PV}}{P_{panneau}}
\\]

Il faut obligatoirement arrondir à l'entier supérieur car on ne peut pas installer une fraction de panneau.

\\[
\\boxed{N=${nbPanneaux}\\ \\text{panneaux}}
\\]`
},

//====================
{
texte:"Calculer la puissance crête réellement installée avec ce nombre de panneaux.",
reponse:Pi,
unite:"kWc",
feedback:`La puissance installée est la somme des puissances crête des panneaux :<br>
\\[
P_{installée}=N\\times P_{panneau}
\\]

Attention à convertir les Wc en kWc :<br>
\\[
P_{panneau}=\\frac{${Ppanneau}}{1000}\\ \\text{kWc}
\\]

Donc :<br>
\\[
P_{installée}=${nbPanneaux}\\times\\frac{${Ppanneau}}{1000}
\\]

\\[
\\boxed{P_{installée}=${Pi}\\ \\text{kWc}}
\\]`
},

//====================
{
texte:"Calculer la surface totale nécessaire pour installer les panneaux photovoltaïques.",
reponse:surf,
unite:"m²",
feedback:`La surface totale est :<br>
\\[
S=N\\times S_{panneau}
\\]

\\[
S=${nbPanneaux}\\times${surfacePanneau}
\\]

\\[
\\boxed{S=${surf}\\ \\text{m}^2}
\\]`
},

//====================
{
texte:"Calculer le productible annuel de la centrale photovoltaïque réellement installée.",
reponse:Prod,
unite:"kWh/an",
feedback:`L'énergie produite est donnée par :<br>
\\[
E=P_{installée}\\times Productible_{net}
\\]

\\[
E=${Pi}\\times${arrondi(productibleNet,1)}
\\]

\\[
\\boxed{E=${Prod}\\ \\text{kWh/an}}
\\]`
},

//====================
{
texte:"Calculer le taux réel de couverture de la consommation annuelle par la centrale photovoltaïque.",
reponse:cov,
unite:"%",
feedback:`Le taux de couverture est :<br>
\\[
Taux_{couverture}=\\frac{E_{PV}}{E_{consommée}}
\\]

\\[
Taux_{couverture}=\\frac{${Prod}}{${Econs}}\\times100
\\]

\\[
\\boxed{Taux_{couverture}=${cov}\\ \\%}
\\]`
},

//====================
{
texte:"Calculer l'écart entre l'énergie photovoltaïque produite et l'énergie initialement recherchée.",
reponse:ecart,
unite:"kWh/an",
feedback:`L'énergie recherchée était :<br>
\\[
E_{objectif}=${Econs}\\times${tauxCouverture}
\\]

L'installation réelle produit \\(${Prod}\\) kWh/an.

L'écart est donc :<br>
\\[
E_{écart}=E_{produite}-E_{objectif}
\\]

\\[
E_{écart}=${Prod}-(${Econs}\\times${tauxCouverture})
\\]

\\[
\\boxed{E_{écart}=${ecart}\\ \\text{kWh/an}}
\\]

Un écart positif signifie que le dimensionnement dépasse légèrement l'objectif, ce qui est normal puisque le nombre de panneaux doit être entier.`
},

//====================
{
texte:"Expliquer pourquoi le productible exprimé en kWh/kWc/an est particulièrement utile pour dimensionner une installation photovoltaïque.",
reponse:["la puissance crête installée","énergie électrique"],
type:"texte",
feedback:`Le productible permet de relier directement la puissance crête d'une installation à l'énergie qu'elle peut produire sur une année.

\\[
\\boxed{E_{annuelle}=P_{crête}\\times Productible}
\\]

Il permet donc de passer d'un besoin énergétique annuel à une puissance photovoltaïque à installer.

Le productible dépend notamment de l'ensoleillement du site, de l'orientation, de l'inclinaison et des différentes pertes de l'installation.`
}

]

};


// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

genererExercice(exo);

};