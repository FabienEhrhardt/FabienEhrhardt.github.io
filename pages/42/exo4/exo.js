// =====================
// PARAMÈTRES
// =====================

// Données fluide
let rho = 1000; // kg/m3
let g = 9.81;

// Conduite
let listeD = [20, 50, 100, 200]; // mm
let D=listeD[(Math.floor(Math.random()*4))];
let L = (Math.floor(Math.random()*5)+5)*10; // 50 à 90 m

// Section
let S = Math.PI*D/1000*D/1000/4;

// Vitesse
let listev=[1, 2, 3, 5, 8, 10, 20];
let v = listev[Math.floor(Math.random()*7)];



// Débit
let Q = v*S;
if((Q<0.001)||(Q>0.1)){
	D=50;
	S = Math.PI*D/1000*D/1000/4;
	Q = v*S;
}

//Pertes 
w=intersectionDV(D, v).hf; // Pertes linéiques
hL=w*L; // Pertes linéaires
htot=1.5*hL //Pertes totales

// Différence de hauteur
let z1 = 0;
let z2 = (Math.floor(Math.random()*5)+5); // 5 à 10 m
 
let hpompe=htot+z2;


// Coefficient pertes linéiques (simule abaque)
function lambda(v){
    return 0.02 + 0.01*(v/2); // simplification pédagogique
}

// =====================
// EXERCICE
// =====================

let theme="42";
let nomExo="exo3";

let exo={

titre:"Écoulement dans une conduite - Abaque de pertes de charge et Bernoulli",

enonce:`De l’eau circule dans une conduite de diamètre ${D} mm et de longueur ${L} m avec une vitesse de ${v} m/s.
On considère une différence de hauteur entre l’entrée et la sortie de ${z2} m.
Les pressions en entrée et en sortie sont supposées égales. Les points en entrée (E) et en sortie (S) de la canalisation sont situés dans la conduite.

On rappelle l'équation de Bernoulli : <br>
\\(\\frac{1}{2g}(v_s^2-v_e^2)+z_s-z_e+\\frac{P_s-P_e}{\rho g}=H_{pompe}-h_{pertes}\\) <br>
Constantes : \\(g=9.81 m/s^2 ; \\rho=1000 kg/m^3\\)`,

// Abaque simulé
courbe1:{
    f: lambda,
    Nom: "Coefficient λ en fonction de v",
    axeX: "Vitesse v (m/s)",
    axeY: "λ"
},

questions:[

// =====================
{
texte:"Calculer la section de la conduite",
reponse:S,
unite:"m²",
feedback:`\\(S=\\frac{\\pi D^2}{4}=${arrondi(S)} m^2\\)`,

},

// =====================
{
texte:"Calculer le débit de l’eau",
reponse:Q,
unite:"\\(m^3/s\\)",
feedback:`\\(Q={v}{S}=${arrondi(Q)}m^3/s\\)`
},

// =====================
{
texte:"À partir de l’abaque, déterminer les pertes linéiques en mCE/m",
reponse:w,
unite:"mCE/m",
feedback:`Lecture graphique → \\( \\varpi≈ ${arrondi(w)} mCE/m\\)`,

action:function(){
    let pt = tracerIntersection(D, v);
}
},

// =====================
{
texte:"Calculer les pertes de charge linéaires le long de la conduite",
reponse:hL,
unite:"mCE",
feedback:`\\(h_L={\\varpi}{L}=${arrondi(hL)} mCE\\)`
},



// =====================
{
texte:`Les pertes de charge totales sont considérées égale à \\(h_{tot}=${arrondi(htot)}mCE\\). Calculer alors la hauteur manométrique nécessaire de la pompe \\(H_{pompe}\\)`,
reponse:hpompe,
unite:"mCE",
feedback:`On reprend Bernoulli :\\(\\frac{1}{2g}(v_s^2-v_e^2)+z_s-z_e+\\frac{P_s-P_e}{\rho g}=H_{pompe}-h_{pertes}\\) <br>
hypothèses :<br>
Les pressions sont égales : \\(\\frac{P_s-P_e}{\rho g}=0\\) <br>
Les points E et S sont dans la conduite : la section est constante donc \\(v_s=v_e\\)<br>
La différence de hauteur est \\(H=z_s-z_e\\)<br>
Donc <br>
\\(H_{pompe}=H+h_{tot}=${arrondi(hpompe)} mCE\\)`
},

// =====================
{
texte:"Convertir les pertes de charges totale en Pa.",
reponse:htot*9810,
unite:"Pa",
feedback:`On utilise la formule de la statique des fluides  \\(\\Delta P=\\rho g h=${arrondi(9810*htot)} Pa\\)`
},


]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){
    initAbaque("graph");

    tracerGrilleLog("graph");
    tracerAxesAbaque("graph");

    // diamètres
    tracerDroiteDiametre(0.02,"blue");
    tracerDroiteDiametre(0.05,"blue");
    tracerDroiteDiametre(0.1,"blue");
	tracerDroiteDiametre(0.2,"blue");

    // vitesses
    tracerDroiteVitesse(1,"green");
    tracerDroiteVitesse(2,"green");
    tracerDroiteVitesse(3,"green");
	tracerDroiteVitesse(5,"green");
	tracerDroiteVitesse(8,"green");
	tracerDroiteVitesse(10,"green");
	tracerDroiteVitesse(20,"green");

    genererExercice(exo);
};