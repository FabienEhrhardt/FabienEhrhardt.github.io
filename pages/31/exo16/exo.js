// =====================
// PARAMÈTRES
// =====================

// Génération
let w=Math.floor(Math.random()*10000);
let Imax=Math.floor(Math.random()*20+1);
let phi=Math.floor(Math.random()*314.159-314.159/2)/100; //phi en rad



// =====================
// CALCULS
// =====================
let f=w/2/3.14159;
let T=1/f;
let Ieff=Imax/Math.sqrt(2);
let phideg=phi*180/3.14159;

// =====================
// EXERCICE
// =====================

let theme="31";
let nomExo="exo16";

let exo={

titre:"Expression temporelle de signaux sinusoïdaux",

enonce:(phi<0?`Soit une tension sinusoïdale s'exprimant sous la forme : \\(v(t)=100 sin(${w}t)\\) et un courant \\(i(t)=${Imax} sin(${w}t+${-phi})\\).`:`Soit une tension sinusoïdale s'exprimant sous la forme : \\(v(t)=100 sin(${w}t)\\) et un courant \\(i(t)=${Imax} sin(${w}t-${phi})\\).`),

//courbe1:{},

questions:[

//====================
{
texte:"Déterminer la pulsation de ces signaux.",
reponse:w,
unite:"rad/s",
feedback:`
on rappelle l'expression \\(v(t)=V_{max} sin(\\omega t)\\), par identification on retrouve \\(\\omega=${w}\\) rad/s`
},

//====================
{
texte:"Calculer la fréquence des signaux.",
reponse:arrondi(f),
unite:"Hz",
feedback:` \\(\\omega = 2 \\pi f\\) donc \\(f=\\frac{\\omega}{2 \\pi}=${arrondi(f)} Hz\\).
`
},

//====================
{
texte:"Calculer la période des signaux.",
reponse:arrondi(T*1000),
unite:"ms",
feedback:`
La période est de \\(T=\\frac{1}{f}=${arrondi(T*1000)}ms\\)
Ne pas oublier de bien mettre en ms !
`
},

//====================
{
texte:"Déterminer la valeur maximale du courant.",
reponse:Imax,
unite:"A",
feedback:`
Il suffit de lire ce qui est devant le sinus!`
},

//====================
{
texte:"Calculer la valeur efficace du courant.",
reponse:arrondi(Ieff),
unite:"A",
feedback:`On utilise la formule valable en régime sinusoïdal : \\(I_{eff}=\\frac{V_{max}}{\\sqrt{2}}=${arrondi(Ieff)}\\) A.
`
},

//====================
{
texte:"Déterminer le déphasage en degré.",
reponse:arrondi(phideg),
unite:"°",
feedback:`On a \\(i(t)=I_{max} sin(\\omega t-\\varphi)\\), avec \\(\\varphi\\) en radian. Il faut alors convertir \\(\\varphi_{deg}=\\frac{180}{\\pi} \\varphi_{rad}=\\frac{180}{\\pi} \\times ${phi}=${arrondi(phideg)}\\)°.
`
},

//====================
{
type:"texte",
texte:"Le courant est il en avance ou en retard?",
reponse:(phi<0?["avance"]:["retard"]),
unite:"",
feedback:`
Si \\(\\varphi\\) est négatif le signal est en avance, sinon il est en retard. Si il est nul, les signaux sont en phase.
`
},



]

};

// =====================
// LANCEMENT
// =====================

let nbquestion=exo.questions.length;

window.onload=function(){

genererExercice(exo);


};