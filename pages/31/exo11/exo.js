// ============================================================
// EXERCICE — Utilisation d'un oscilloscope.
// ============================================================

// ============================================================
// PARAMÈTRES ALÉATOIRES
// ============================================================
ch1Type='sine', ch2Type='sine';
T=Math.floor(Math.random()*9+1)*Math.pow(10,-Math.floor(Math.random()*5));
ch1Freq=1/T;
ch2Freq=ch1Freq;
ch1Amp=Math.floor(1+Math.random()*9)*Math.pow(10,1-Math.floor(Math.random()*3));
if(ch1Amp>35){ch1Amp=ch1Amp/10;}
ch2Amp=Math.floor(Math.random()*10)*Math.pow(10,-Math.floor(Math.random()*3))
ch1Phase=0; 
ch2PhaseDeg=-90+Math.floor(Math.random()*180);
ch2Phase=ch2PhaseDeg/180*3.14159;
ch1Offset=0, ch2Offset=0;
typeMath="+";
mathVisible=false;

// ============================================================
// CALCULS
// ============================================================
Vmax=ch1Amp*10;
Imax=ch2Amp*10;
Veff=Vmax/Math.sqrt(2);
Ieff=Imax/Math.sqrt(2);
retard=ch2Phase/360*T;

let typeCharge;
if(ch2Phase==0){typeCharge=3;}
else if(ch2Phase<0){typeCharge=2;}
else if(ch2Phase>0){typeCharge=1;}


// Masse totale du pont + charge (t → kg)
let masseTab = [2000, 3000, 4000, 5000, 6000];
let m = masseTab[Math.floor(Math.random() * masseTab.length)];

// Vitesse nominale de translation (m/s)
let vTab = [0.5, 1.0, 1.5, 2.0];
let v = vTab[Math.floor(Math.random() * vTab.length)];

// Durée de la phase d'accélération (s) — entier
let taccTab = [4, 5, 6, 8, 10];
let tacc = taccTab[Math.floor(Math.random() * taccTab.length)];

// Coefficient de frottement roulement (roues acier sur rail)
let CrrTab = [0.005, 0.008, 0.010];
let Crr = CrrTab[Math.floor(Math.random() * CrrTab.length)];

// Distance totale à parcourir (m)
let dTotTab = [20, 25, 30, 40, 50];
let dTot = dTotTab[Math.floor(Math.random() * dTotTab.length)];

// Rendement moteur + transmission
let etaTab = [0.80, 0.85, 0.90];
let eta = etaTab[Math.floor(Math.random() * etaTab.length)];

// g = 9.81
let g = 9.81;

// ============================================================
// CALCULS
// ============================================================

// --- Phase 1 : Accélération ---
let a = arrondi(v / tacc, 3);                         // accélération (m/s²)
let Facc = arrondi(m * a, 0);                         // force d'accélération (N)
let Ffrott = arrondi(Crr * m * g, 1);                 // force de frottement (N)
let Ftraction_acc = arrondi(Facc + Ffrott, 0);        // force de traction totale en accél. (N)
let dacc = arrondi(0.5 * a * tacc * tacc, 2);         // distance phase acc. (m)

// --- Phase 2 : Vitesse constante ---
// Force de traction = frottement seul
let Ftraction_cst = Ffrott;                           // (N)

// --- Phase 3 : Freinage (symétrique à l'accélération) ---
// Même durée, même décélération
let tfrein = tacc;
let dfrein = dacc;                                    // distance phase freinage (m)

// Distance phase constante
let dcst = arrondi(dTot - dacc - dfrein, 2);

// Énergie cinétique au régime établi
let Ec = arrondi(0.5 * m * v * v, 0);                // J

// Travail de la force de frottement sur toute la distance
let W_frott = arrondi(Ffrott * dTot, 0);              // J

// Travail de la force de traction en accélération
let W_traction_acc = arrondi(Ftraction_acc * dacc, 0); // J

// Puissance mécanique développée en phase d'accélération (à Vmax)
let P_mec_acc = arrondi(Ftraction_acc * v, 0);        // W

// Puissance mécanique en vitesse constante
let P_mec_cst = arrondi(Ffrott * v, 0);               // W

// Puissance électrique absorbée (vitesse constante)
let P_elec = arrondi(P_mec_cst / eta, 0);             // W

// Énergie électrique totale consommée sur le déplacement
// Phase acc : travail = Facc*dacc + Ffrott*dacc  / eta
// Phase cst : Ffrott*dcst / eta
// Phase freinage : freinage mécanique, on néglige la récupération (simplification)
let W_elec = arrondi((Ftraction_acc * dacc + Ffrott * dcst) / eta, 0); // J


// ============================================================
// EXERCICE
// ============================================================

let theme  = "31";
let nomExo = "exo11";

let exo = {

titre: "Utilisation oscilloscope et signaux sinusoïdaux",

enonce:
`Le courant et la tension sont mesurés sur l'oscilloscope donc l'écran est donné ci-dessous.<br>
La tension est mesurée à l'aide d'une sonde de tension qui divise la tension par 10 sur CH1. <br>
Le courant est mesuré à l'aide d'une sonde de courant de gain 100mV / A sur CH2.`
+
oscillo,

questions: [

// ============================================================
// Q1 — Calibre temporel
// ============================================================
{
texte: `Déterminer le meilleur calibre pour l'axe temporel.`,
reponse: meilleurT(T),
unite: "s/div",
feedback:
    `On cherche à avoir le moins de périodes possibles. Le meilleur calibre est ${fmtS(meilleurT(T))}=${meilleurT(T)} s/div`
},

// ============================================================
// Q2 — Période
// ============================================================
{
texte: `Déterminer la période de la tension.`,
reponse: T,
unite: "s",
feedback:
    `On règle bien le calibre temporel de l'oscilloscope. \\(T = ${arrondi(T)} \\)s.`
},

// ============================================================
// Q3 — Calibre de la tension
// ============================================================
{
texte: `Déterminer le meilleur calibre pour la tension.`,
reponse: meilleurV(Vmax/10),
unite: "V/div",
feedback:
    `La tension est sur CH1. <br>
	On cherche à avoir le moins de périodes possibles. Le meilleur calibre est ${meilleurV(Vmax/10)} V/div`
},

// ============================================================
// Q4 — valeur max de la tension
// ============================================================
{
texte: `Déterminer l'amplitude de la tension.`,
reponse: Vmax,
unite: "V",
feedback:
    `La tension est sur CH1. <br>
	Il ne faut pas oublier le facteur 10 de la sonde de tension. \\(V_{max}=10 V_{oscilloscope}=${arrondi(Vmax)} V\\)`
},

// ============================================================
// Q5 — Déterminer la valeur efficace de la tension
// ============================================================
{
texte: `Déterminer la valeur efficace de la tension.`,
reponse: Veff,
unite: "V",
feedback:
    `La tension est sur CH1. <br>
	Le signal est sinusoïdal donc \\(V_{eff}=\\frac{V_{max}}{\\sqrt{2}}=${arrondi(Veff)} V\\)`
},

// ============================================================
// Q6 — Déterminer la valeur efficace de la tension
// ============================================================
{
texte: `Déterminer la valeur efficace du courant.`,
reponse: Ieff,
unite: "A",
feedback:
    `Le courant est sur CH2. Ne pas oublier le coefficient de la sonde 100 mV/A <br>
	Le signal est sinusoïdal donc \\(I_{eff}=\\frac{I_{max}}{\\sqrt{2}}=${arrondi(Ieff)} A\\)`
},

// ============================================================
// Q7 — Déphasage
// ============================================================
{
texte: `Déterminer le déphasage entre le courant et la tension`,
reponse: -ch2Phase,
unite: "°",
feedback:
    `On mesure le retard entre les deux courbes \\(\\Delta t= ${arrondi(retard)} \\) s
	\\(\\varphi=360 \\frac{\\Delta t}{T}=360 \\frac{${arrondi(retard)}}{${T}}=${arrondi(ch2Phase)}\\)°`
},

// ============================================================
// Q8 — Type de charge
// ============================================================
{
texte: `Induquer le type de charge (inductif (1), capacitif (2)  ou résistif (3)`,
reponse: typeCharge,
unite: "",
feedback:
    `Si le déphasage \\(\\varphi\\) est négatif, charge capacitive (2).<br>
	Si le déphasage \\(\\varphi\\) est nul, charge résistive (3).<br>
	Si le déphasage \\(\\varphi\\) est positif, charge inductive (1).<br>`
},

] // fin questions
}; // fin exo

// ============================================================
// LANCEMENT
// ============================================================

let nbquestion = exo.questions.length;

window.onload = function () {
    genererExercice(exo);
    updateOscillo();
	draw();
};