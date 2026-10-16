// =====================
// PARAMÈTRES
// =====================

let PmaxPV=[80,90,100,110][Math.floor(Math.random()*4)]; // kW

// Puissance consommée par le bâtiment, de 0 h à 24 h
let consoBase=[
22,20,18,18,20,25,35,55,70,75,70,65,
62,60,65,75,90,100,95,80,60,45,32,25,22
];

// Variation aléatoire de la consommation
let facteurConso=[0.9,1,1.1][Math.floor(Math.random()*3)];

let conso=consoBase.map(P=>Math.round(P*facteurConso));

// Profil journalier simplifié de production photovoltaïque
let profilPV=[
0,0,0,0,0,0.03,0.12,0.30,0.52,0.72,0.88,0.97,
1,0.95,0.82,0.62,0.38,0.16,0.04,0,0,0,0,0,0
];

let production=profilPV.map(P=>arrondi(P*PmaxPV,1));


// =====================
// CALCULS
// =====================

// Puissance maximale produite
let PmaxReelle=Math.max(...production);

// Puissances à des instants particuliers
let Ppv8=production[8];
let Pconso8=conso[8];

let Ppv12=production[12];
let Pconso12=conso[12];

// Puissance autoconsommée et injectée à midi
let Pauto12=Math.min(Ppv12,Pconso12);
let Pinject12=Math.max(Ppv12-Pconso12,0);

// Puissance soutirée au réseau à 8 h
let Psoutirage8=Math.max(Pconso8-Ppv8,0);


// Calcul des énergies journalières par la méthode des trapèzes
// Les puissances sont données heure par heure.
// L'énergie est calculée sur chaque intervalle de 1 h.

function energieJournee(tab){
    let E=0;
    for(let i=0;i<24;i++){
        E+=(tab[i]+tab[i+1])/2;
    }
    return E;
}

let Eproduction=energieJournee(production);
let Econso=energieJournee(conso);

// Puissance autoconsommée à chaque heure
let puissanceAuto=production.map((P,i)=>Math.min(P,conso[i]));

let Eauto=energieJournee(puissanceAuto);

// Taux d'autoconsommation
let tauxAuto=Eauto/Eproduction*100;


// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo13";

let exo={
titre:"Autoconsommation d'un bâtiment industriel",

enonce:`Une entreprise souhaite réduire sa facture d'électricité en installant des panneaux photovoltaïques sur le toit de son bâtiment.

Le système de supervision fournit les courbes de puissance consommée par le bâtiment et de puissance produite par l'installation photovoltaïque sur une journée.

Les puissances sont exprimées en kW et le temps en heures.

<canvas id="graphiquePV" style="width:100%;max-width:900px;height:380px;display:block;margin:20px auto;border:1px solid #777;border-radius:8px;"></canvas>

<strong>Principe de fonctionnement :</strong>
<ul>
<li> Lorsque la production photovoltaïque est supérieure à la consommation, le surplus peut être injecté sur le réseau.</li>
<li> Lorsque la production photovoltaïque est inférieure à la consommation, le complément est soutiré au réseau.</li>
<li> L'énergie autoconsommée correspond à la partie de la production photovoltaïque directement utilisée par le bâtiment.</li>
</ul>
On négligera les pertes dans les câbles et les équipements pour cette étude.`,

questions:[

{
texte:`Lire sur le graphique la puissance photovoltaïque maximale atteinte au cours de la journée.`,
reponse:PmaxReelle,
unite:"kW",
feedback:`La puissance maximale correspond au point le plus haut de la courbe de production photovoltaïque.

\\(P_{PV,max}=\\boxed{${arrondi(PmaxReelle,1)}\\,kW}\\)`,
action: function() {
    tracerHorizontale(PmaxReelle);
}
},

{
texte:`À 12 h, déterminer la puissance produite par les panneaux photovoltaïques.`,
reponse:Ppv12,
unite:"kW",
feedback:`À 12 h, on lit la valeur de la courbe photovoltaïque :

\\(P_{PV}(12h)=\\boxed{${arrondi(Ppv12,1)}\\,kW}\\)`
},

{
texte:`À 12 h, déterminer la puissance consommée par le bâtiment.`,
reponse:Pconso12,
unite:"kW",
feedback:`À 12 h, on lit la valeur de la courbe de consommation :

\\(P_{conso}(12h)=\\boxed{${arrondi(Pconso12,1)}\\,kW}\\)`,
action: function() {
    tracerHorizontale(Pconso12);
}
},

{
texte:`À 12 h, calculer la puissance photovoltaïque directement utilisée par le bâtiment.`,
reponse:Pauto12,
unite:"kW",
feedback:`La puissance autoconsommée est la plus petite des deux puissances :

\\[P_{auto}=\\min(P_{PV};P_{conso})\\]

\\[P_{auto}=\\min(${arrondi(Ppv12,1)};${arrondi(Pconso12,1)})\\]

\\[P_{auto}=\\boxed{${arrondi(Pauto12,1)}\\,kW}\\]`
},

{
texte:`À 12 h, calculer la puissance injectée sur le réseau électrique.`,
reponse:Pinject12,
unite:"kW",
feedback:`La puissance injectée correspond au surplus photovoltaïque :

\\[P_{inj}=\\max(P_{PV}-P_{conso};0)\\]

\\[P_{inj}=\\max(${arrondi(Ppv12,1)}-${arrondi(Pconso12,1)};0)\\]

\\[P_{inj}=\\boxed{${arrondi(Pinject12,1)}\\,kW}\\]

Si la production est inférieure à la consommation, il n'y a pas d'injection.`
},

{
texte:`À 8 h, calculer la puissance électrique que le bâtiment doit encore soutirer au réseau.`,
reponse:Psoutirage8,
unite:"kW",
feedback:`La puissance soutirée est la différence entre la consommation et la production lorsque la consommation est supérieure :

\\[P_{sout}=\\max(P_{conso}-P_{PV};0)\\]

\\[P_{sout}=\\max(${arrondi(Pconso8,1)}-${arrondi(Ppv8,1)};0)\\]

\\[P_{sout}=\\boxed{${arrondi(Psoutirage8,1)}\\,kW}\\]`
},

{
texte:`À partir de la courbe de production, déterminer l'énergie électrique produite par les panneaux photovoltaïques sur la journée. On utilisera la méthode des trapèzes, avec un pas de temps de 1 h.`,
reponse:Eproduction,
unite:"kWh",
feedback:`L'énergie correspond à l'aire sous la courbe de puissance produite (visible en vert).

Pour chaque intervalle de 1 h :

\\(E_i=\\dfrac{P_i+P_{i+1}}{2}\\times\\Delta t\\) <br>

avec \\(\\Delta t=1\\,h\\).

On additionne les énergies de tous les intervalles :

\\[E_{PV}=\\sum_{i=0}^{23}\\dfrac{P_i+P_{i+1}}{2}\\times1\\]

\\[E_{PV}\\approx\\boxed{${arrondi(Eproduction,1)}\\,kWh}\\]`,
action: function() {
    tracerGraphiquePV();
	colorerAirePV(7); // Aire verte : production
}
},

{
texte:`Déterminer l'énergie électrique consommée par le bâtiment sur cette même journée, en utilisant la méthode des trapèzes.`,
reponse:Econso,
unite:"kWh",
feedback:`On calcule l'aire sous la courbe de consommation (visible en rouge) :

\\[E_{conso}=\\sum_{i=0}^{23}\\dfrac{P_i+P_{i+1}}{2}\\times1\\]

\\[E_{conso}\\approx\\boxed{${arrondi(Econso,1)}\\,kWh}\\]`,
action: function() {
    
	colorerAirePV(8); // Aire rouge : consommation
}
},

{
texte:`Calculer l'énergie photovoltaïque autoconsommée par le bâtiment sur la journée. On utilisera la méthode des trapèzes appliquée à la puissance autoconsommée.`,
reponse:Eauto,
unite:"kWh",
feedback:`À chaque instant, la puissance autoconsommée est :

\\(P_{auto}=\\min(P_{PV};P_{conso})\\)<br>

On calcule ensuite l'aire sous cette courbe (visible en bleue) :

\\[E_{auto}=\\sum_{i=0}^{23}\\dfrac{P_{auto,i}+P_{auto,i+1}}{2}\\times1\\]

\\[E_{auto}\\approx\\boxed{${arrondi(Eauto,1)}\\,kWh}\\]`,
action: function() {
    
	colorerAirePV(9); // Aire bleue : autoconsommation
}
},

{
texte:`Calculer le taux d'autoconsommation de l'installation photovoltaïque sur la journée.`,
reponse:tauxAuto,
unite:"%",
feedback:`Le taux d'autoconsommation indique quelle part de l'énergie photovoltaïque produite est utilisée directement par le bâtiment.

\\[T_{auto}=\\dfrac{E_{auto}}{E_{PV}}\\times100\\]

\\[T_{auto}=\\dfrac{${arrondi(Eauto,1)}}{${arrondi(Eproduction,1)}}\\times100\\]

\\[T_{auto}=\\boxed{${arrondi(tauxAuto,1)}\\,\\%}\\]`
}

]
};


// =====================
// GRAPHIQUE CANVAS
// =====================




function tracerGraphiquePV(){

    let canvas=document.getElementById("graphiquePV");
    if(!canvas) return;

    let ctx=canvas.getContext("2d");

    // Adaptation à la résolution de l'écran
    let largeur=canvas.clientWidth;
    let hauteur=canvas.clientHeight;
    let ratio=window.devicePixelRatio||1;

    canvas.width=largeur*ratio;
    canvas.height=hauteur*ratio;

    ctx.scale(ratio,ratio);

    let margeG=58;
    let margeD=18;
    let margeH=25;
    let margeB=48;

    let largeurGraph=largeur-margeG-margeD;
    let hauteurGraph=hauteur-margeH-margeB;

    let maxY=Math.ceil(Math.max(...conso,...production)/20)*20;
    if(maxY<20) maxY=20;

    function x(t){
        return margeG+t/24*largeurGraph;
    }

    function y(P){
        return margeH+hauteurGraph-(P/maxY)*hauteurGraph;
    }

    // Fond
    ctx.clearRect(0,0,largeur,hauteur);
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,largeur,hauteur);

    // Grille horizontale
    ctx.font="12px Verdana";
    ctx.textAlign="right";
    ctx.textBaseline="middle";

    for(let P=0;P<=maxY;P+=20){
        ctx.strokeStyle="#d6dce5";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(margeG,y(P));
        ctx.lineTo(largeur-margeD,y(P));
        ctx.stroke();

        ctx.fillStyle="#263449";
        ctx.fillText(P,margeG-8,y(P));
    }

    // Axe vertical
    ctx.strokeStyle="#263449";
    ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(margeG,margeH);
    ctx.lineTo(margeG,margeH+hauteurGraph);
    ctx.lineTo(largeur-margeD,margeH+hauteurGraph);
    ctx.stroke();

    // Graduations horaires
    ctx.textAlign="center";
    ctx.textBaseline="top";

    for(let h=0;h<=24;h+=2){
        ctx.strokeStyle="#263449";
        ctx.beginPath();
        ctx.moveTo(x(h),margeH+hauteurGraph);
        ctx.lineTo(x(h),margeH+hauteurGraph+5);
        ctx.stroke();

        ctx.fillStyle="#263449";
        ctx.fillText(h+" h",x(h),margeH+hauteurGraph+9);
    }

    // Courbes
    function dessinerCourbe(tab,couleur){
        ctx.beginPath();
        ctx.strokeStyle=couleur;
        ctx.lineWidth=2.5;
        ctx.lineJoin="round";

        tab.forEach((P,i)=>{
            if(i===0) ctx.moveTo(x(i),y(P));
            else ctx.lineTo(x(i),y(P));
        });

        ctx.stroke();

        // Points horaires
        tab.forEach((P,i)=>{
            ctx.beginPath();
            ctx.arc(x(i),y(P),2.5,0,Math.PI*2);
            ctx.fillStyle=couleur;
            ctx.fill();
        });
    }

    dessinerCourbe(conso,"#b42318");
    dessinerCourbe(production,"#087443");

    // Légende
    let legendeY=14;

    ctx.font="bold 12px Verdana";
    ctx.textAlign="left";
    ctx.textBaseline="middle";

    ctx.fillStyle="#b42318";
    ctx.fillRect(margeG,legendeY-4,18,4);
    ctx.fillStyle="#263449";
    ctx.fillText("Consommation",margeG+24,legendeY);

    let xLegende=margeG+155;
    ctx.fillStyle="#087443";
    ctx.fillRect(xLegende,legendeY-4,18,4);
    ctx.fillStyle="#263449";
    ctx.fillText("Production PV",xLegende+24,legendeY);

    // Unités
    ctx.save();
    ctx.translate(15,margeH+hauteurGraph/2);
    ctx.rotate(-Math.PI/2);
    ctx.textAlign="center";
    ctx.font="12px Verdana";
    ctx.fillStyle="#263449";
    ctx.fillText("Puissance (kW)",0,0);
    ctx.restore();

    ctx.textAlign="center";
    ctx.font="12px Verdana";
    ctx.fillText("Heure",margeG+largeurGraph/2,hauteur-5);
}

function tracerHorizontale(valeurP){

    let canvas=document.getElementById("graphiquePV");
    if(!canvas) return;

    let ctx=canvas.getContext("2d");

    // Adaptation à la résolution de l'écran
    let largeur=canvas.clientWidth;
    let hauteur=canvas.clientHeight;
    let ratio=window.devicePixelRatio||1;

    let margeG=58;
    let margeD=18;
    let margeH=25;
    let margeB=48;

    let largeurGraph=largeur-margeG-margeD;
    let hauteurGraph=hauteur-margeH-margeB;

    let maxY=Math.ceil(Math.max(...conso,...production)/20)*20;
    if(maxY<20) maxY=20;

    function x(t){
        return margeG+t/24*largeurGraph;
    }

    function y(P){
        return margeH+hauteurGraph-(P/maxY)*hauteurGraph;
    }
        ctx.strokeStyle="#000000";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(margeG,y(valeurP));
        ctx.lineTo(largeur-margeD,y(valeurP));
        ctx.stroke();

        ctx.fillStyle="#263449";
        ctx.fillText(valeurP,margeG-8,y(valeurP));
}


function colorerAirePV(numeroQuestion) {

    let canvas = document.getElementById("graphiquePV");
    if (!canvas) return;

    let ctx = canvas.getContext("2d");

    let largeur = canvas.clientWidth;
    let hauteur = canvas.clientHeight;

    // Même repère que tracerGraphiquePV()
    let margeG = 58;
    let margeD = 18;
    let margeH = 25;
    let margeB = 48;

    let largeurGraph = largeur - margeG - margeD;
    let hauteurGraph = hauteur - margeH - margeB;

    let maxY = Math.ceil(Math.max(...conso, ...production) / 20) * 20;
    if (maxY < 20) maxY = 20;

    function x(t) {
        return margeG + t / 24 * largeurGraph;
    }

    function y(P) {
        return margeH + hauteurGraph - (P / maxY) * hauteurGraph;
    }

    // Choix de la courbe et de la couleur
    let donnees;
    let couleur;

    if (numeroQuestion === 7) {
        donnees = production;
        couleur = "rgba(0, 160, 70, 0.25)";
    }
    else if (numeroQuestion === 8) {
        donnees = conso;
        couleur = "rgba(220, 40, 40, 0.20)";
    }
    else if (numeroQuestion === 9) {
        donnees = production.map((P, i) => Math.min(P, conso[i]));
        couleur = "rgba(30, 100, 230, 0.30)";
    }
    else {
        return;
    }

    // Tracé de l'aire sous la courbe
    ctx.beginPath();
    ctx.moveTo(x(0), y(0));

    donnees.forEach((P, i) => {
        ctx.lineTo(x(i), y(P));
    });

    ctx.lineTo(x(24), y(0));
    ctx.closePath();

    ctx.fillStyle = couleur;
    ctx.fill();
}
// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){
    genererExercice(exo);
    tracerGraphiquePV();
};