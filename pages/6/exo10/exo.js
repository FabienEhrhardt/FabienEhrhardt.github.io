// =====================
// PARAMÈTRES
// =====================

// Irradiation solaire annuelle reçue par la surface des panneaux
let irradiation=[1050,1100,1150,1200,1250,1300][Math.floor(Math.random()*6)]; 
// kWh/m²/an

// Surface photovoltaïque
let surface=Math.floor(Math.random()*6+10)*100; 
// m²

// Rendement des panneaux
let etaPanneau=[0.20,0.21,0.22,0.23][Math.floor(Math.random()*4)];

// Rendement de la partie DC
let etaDC=[0.95,0.96,0.97,0.98][Math.floor(Math.random()*4)];

// Rendement de l'onduleur
let etaOnduleur=[0.96,0.97,0.98,0.985][Math.floor(Math.random()*4)];

// Rendement de la partie AC
let etaAC=[0.97,0.98,0.99][Math.floor(Math.random()*3)];

// =====================
// PUISSANCE CRÊTE
// =====================

// Puissance crête calculée à partir de la surface et du rendement
// P = surface × 1000 × rendement
let Pcrête=surface*1*etaPanneau;
// en kWc car 1000 W/m² × surface × rendement

// =====================
// BILAN D'ÉNERGIE
// =====================

// Energie solaire reçue
let Esol=irradiation*surface;

// Energie électrique en sortie des panneaux
let Epanneaux=Esol*etaPanneau;

// Energie après partie DC
let EDC=Epanneaux*etaDC;

// Energie après onduleur
let Eonduleur=EDC*etaOnduleur;

// Energie injectée réseau
let Einject=Eonduleur*etaAC;

// Rendement global
let etaGlobal=Einject/Esol;

// Heures équivalentes pleine puissance
let heuresEquivalent=Einject/Pcrête;

// Facteur de charge
let facteurCharge=heuresEquivalent/8760;


// =====================
// CALCULS ARRONDIS
// =====================

let Es=arrondi(Esol,0);
let Ep=arrondi(Epanneaux,0);
let Edc=arrondi(EDC,0);
let Eond=arrondi(Eonduleur,0);
let Einj=arrondi(Einject,0);

let Ppv=arrondi(Pcrête,2);

let etaG=arrondi(etaGlobal*100,1);
let hEq=arrondi(heuresEquivalent,0);
let FC=arrondi(facteurCharge*100,1);


// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo10";

let exo={

titre:"Étude du productible d'une installation photovoltaïque",

enonce:`Une installation photovoltaïque est installée sur la toiture d'un bâtiment.

La surface totale de panneaux photovoltaïques est de \\(${surface}\\) m².

Le site reçoit une énergie solaire annuelle de \\(${irradiation}\\) kWh/m²/an sur le plan des panneaux.

Les panneaux photovoltaïques ont un rendement de \\(${etaPanneau*100}\\) %.

L'électricité produite traverse ensuite différents équipements avant d'être injectée sur le réseau :
<ul>
<li> rendement de la partie DC : \\(${etaDC*100}\\) % ; </li>
<li> rendement de l'onduleur : \\(${etaOnduleur*100}\\) % ; </li>
<li> rendement de la partie AC : \\(${etaAC*100}\\) %.</li>
</ul>
On considère que la puissance solaire reçue par les panneaux est obtenue à partir de :

\\[
E_{solaire}=Irradiation\\times Surface
\\]

La puissance crête de l'installation peut être estimée avec un rayonnement de référence de \\(1000\\) W/m² :

\\[
P_{crête}=Surface\\times1000\\times\\eta_{panneau}
\\]

L'installation fonctionne sur une année de 8760 h.`,

questions:[

//====================
{
texte:"Calculer l'énergie solaire reçue annuellement par l'ensemble des panneaux photovoltaïques.",
reponse:Es,
unite:"kWh/an",
feedback:`L'énergie solaire reçue dépend de l'irradiation annuelle et de la surface :<br>
\\[
E_{solaire}=Irradiation\\times Surface
\\]

\\[
E_{solaire}=${irradiation}\\times${surface}
\\]

\\[
\\boxed{E_{solaire}=${Es}\\ \\text{kWh/an}}
\\]`
},

//====================
{
texte:"Calculer l'énergie électrique produite directement par les panneaux photovoltaïques.",
reponse:Ep,
unite:"kWh/an",
feedback:`Le rendement des panneaux est :<br>
\\[
\\eta_{panneau}=\\frac{E_{électrique}}{E_{solaire}}
\\]

Donc :<br>
\\[
E_{panneaux}=E_{solaire}\\times\\eta_{panneau}
\\]

\\[
E_{panneaux}=${Es}\\times${etaPanneau}
\\]

\\[
\\boxed{E_{panneaux}=${Ep}\\ \\text{kWh/an}}
\\]`
},

//====================
{
texte:"Calculer l'énergie électrique disponible en sortie de la partie DC.",
reponse:Edc,
unite:"kWh/an",
feedback:`Le rendement de la partie DC permet de prendre en compte les pertes dans les câbles et les équipements en courant continu :<br>
\\[
E_{DC}=E_{panneaux}\\times\\eta_{DC}
\\]

\\[
E_{DC}=${Ep}\\times${etaDC}
\\]

\\[
\\boxed{E_{DC}=${Edc}\\ \\text{kWh/an}}
\\]`
},

//====================
{
texte:"Calculer l'énergie électrique disponible en sortie de l'onduleur.",
reponse:Eond,
unite:"kWh/an",
feedback:`L'onduleur transforme le courant continu en courant alternatif.

On utilise son rendement :<br>
\\[
E_{AC}=E_{DC}\\times\\eta_{onduleur}
\\]

\\[
E_{AC}=${Edc}\\times${etaOnduleur}
\\]

\\[
\\boxed{E_{AC}=${Eond}\\ \\text{kWh/an}}
\\]`
},

//====================
{
texte:"Calculer l'énergie électrique finalement injectée sur le réseau.",
reponse:Einj,
unite:"kWh/an",
feedback:`Une partie de l'énergie est encore perdue dans la partie AC.

On utilise :<br>
\\[
E_{injectée}=E_{onduleur}\\times\\eta_{AC}
\\]

\\[
E_{injectée}=${Eond}\\times${etaAC}
\\]

\\[
\\boxed{E_{injectée}=${Einj}\\ \\text{kWh/an}}
\\]`
},

//====================
{
texte:"Calculer le rendement global de l'installation photovoltaïque entre l'énergie solaire reçue et l'énergie injectée sur le réseau.",
reponse:etaG,
unite:"%",
feedback:`Le rendement global compare l'énergie finalement injectée sur le réseau à l'énergie solaire reçue :<br>
\\[
\\eta_{global}=\\frac{E_{injectée}}{E_{solaire}}
\\]

\\[
\\eta_{global}=\\frac{${Einj}}{${Es}}
\\]

\\[
\\boxed{\\eta_{global}=${etaG}\\ \\%}
\\]

On peut également retrouver ce résultat en multipliant les différents rendements :<br>
\\[
\\eta_{global}
=
\\eta_{panneau}
\\times\\eta_{DC}
\\times\\eta_{onduleur}
\\times\\eta_{AC}
\\]`
},

//====================
{
texte:"Calculer la puissance crête de l'installation photovoltaïque en utilisant un rayonnement de référence de 1000 W/m².",
reponse:Ppv,
unite:"kWc",
feedback:`La puissance crête correspond à la puissance électrique maximale théorique des panneaux sous un rayonnement de référence de 1000 W/m².

On utilise :<br>
\\[
P_{crête}=Surface\\times1000\\times\\eta_{panneau}
\\]

Pour obtenir des kW, on divise par 1000 :<br>
\\[
P_{crête}=\\frac{${surface}\\times1000\\times${etaPanneau}}{1000}
\\]

\\[
\\boxed{P_{crête}=${Ppv}\\ \\text{kWc}}
\\]`
},

//====================
{
texte:"Calculer le nombre d'heures équivalentes à pleine puissance de l'installation.",
reponse:hEq,
unite:"h/an",
feedback:`Les heures équivalentes correspondent au nombre d'heures pendant lesquelles l'installation devrait fonctionner à sa puissance crête pour produire la même énergie annuelle.

On utilise :<br>
\\[
t_{équivalent}=\\frac{E_{injectée}}{P_{crête}}
\\]

\\[
t_{équivalent}=\\frac{${Einj}}{${Ppv}}
\\]

\\[
\\boxed{t_{équivalent}=${hEq}\\ \\text{h/an}}
\\]`
},

//====================
{
texte:"Calculer le facteur de charge annuel de l'installation photovoltaïque.",
reponse:FC,
unite:"%",
feedback:`Le facteur de charge compare l'énergie réellement produite avec l'énergie théorique productible si l'installation était tout le temps à pleine puissance :<br>
\\[
FC=\\frac{E_{injectée}}{P_{crête} \\times \\Delta t}
\\]

\\[
FC=\\frac{${Einj}}{${Ppv} \\times 8760}
\\]

Puis on convertit en pourcentage :<br>
\\[
\\boxed{FC=${FC}\\ \\%}
\\]

Le facteur de charge est faible pour une installation photovoltaïque car les panneaux ne produisent pas leur puissance crête pendant la majeure partie de l'année, notamment la nuit.`
},

//====================
{
texte:"Calculer directement le rendement global de l'installation en multipliant les rendements des différents éléments de la chaîne.",
reponse:etaG,
unite:"%",
feedback:`Lorsque plusieurs conversions ou transmissions se succèdent, les rendements se multiplient :<br>
\\[
\\eta_{global}
=
\\eta_{panneau}
\\times
\\eta_{DC}
\\times
\\eta_{onduleur}
\\times
\\eta_{AC}
\\]

\\[
\\eta_{global}
=
${etaPanneau}
\\times
${etaDC}
\\times
${etaOnduleur}
\\times
${etaAC}
\\]

\\[
\\boxed{\\eta_{global}=${etaG}\\ \\%}
\\]

On retrouve ainsi le même résultat que dans la question 6.`
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