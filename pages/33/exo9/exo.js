// =====================
// PARAMÈTRES
// =====================

// Réseau monophasé
let U = 230;       // Tension efficace (V)
let f = 50;        // Fréquence (Hz)

// Charge inductive
let puissances = [1200, 1500, 1800, 2000, 2500, 3000];
let facteurs = [0.65, 0.70, 0.75, 0.80];

let P = puissances[Math.floor(Math.random() * puissances.length)];
let cosphi0 = facteurs[Math.floor(Math.random() * facteurs.length)];

// Objectif de compensation
let cosphi1 = 0.93;

// =====================
// CALCULS
// =====================

// Pulsation
let omega = 2 * Math.PI * f;

// Facteurs de puissance et angles
let phi0 = Math.acos(cosphi0);
let phi1 = Math.acos(cosphi1);

// Puissance apparente initiale
let S0 = P / cosphi0;

// Puissance réactive initiale
let Q0 = P * Math.tan(phi0);

// Puissance réactive après compensation
let Q1 = P * Math.tan(phi1);

// Puissance réactive du condensateur
let Qc = Q0 - Q1;

// Réactance capacitive
let Xc = U * U / Qc;

// Capacité en farads puis en microfarads
let C = Qc / (omega * U * U);
let Cmicro = C * 1e6;

// Courant initial
let I0 = S0 / U;

// Courant après compensation
let S1 = P / cosphi1;
let I1 = S1 / U;

// =====================
// EXERCICE
// =====================

// =====================
// SCHEMA
// =====================
function schema(){
	let p={x:60,y:60};
	
	SourceV("graph","",p.x,p.y,90,"black",true,false);
	TexteCTX("graph",p.x,p.y-20,"Réseau","black");
	p=Fil("graph",p.x,p.y,0,"black",i=true,"1");
	p=Fil("graph",p.x,p.y,0,"black",i=false);
	Condensateur("graph","C",p.x,p.y,90,"black",true,true);
	p=Fil("graph",p.x,p.y,0,"black",i=true,"0");
	TexteCTX("graph",p.x,p.y-20,"Récepteur","black");
	p=BlocGenerique("graph","Charge","P0,Q0",p.x,p.y,90,"black",v=false,i=false);
	p=Fil("graph",p.x,p.y,180,"black");
	p=Fil("graph",p.x,p.y,180,"black");
	p=Fil("graph",p.x,p.y,180,"black");
	
		
}



let theme = "33";
let nomExo = "exo9";

let exo = {
    titre: "Compensation de l'énergie réactive en monophasé",

    enonce: `
    <p>Un récepteur monophasé inductif est alimenté par un réseau
    de tension efficace \\(U=${U}\\,V\\) et de fréquence \\(f=${f}\\,Hz\\).</p>

    <p>Il absorbe une puissance active \\(P_0=${P}\\,W\\) avec un facteur
    de puissance initial \\(\\cos\\varphi_0=${cosphi0}\\).</p>

    <p>On souhaite améliorer son facteur de puissance pour atteindre
    <b>\\(\\cos\\varphi_1=${cosphi1}\\)</b>, en branchant un condensateur
    en parallèle sur le récepteur.</p>

    <p><b>Données :</b></p>
    <ul>
        <li>Tension efficace : \\(U=${U}\\,V\\)</li>
        <li>Fréquence : \\(f=${f}\\,Hz\\)</li>
        <li>Puissance active : \\(P_0=${P}\\,W\\)</li>
        <li>Facteur de puissance initial : \\(\\cos\\varphi_0=${cosphi0}\\)</li>
        <li>Facteur de puissance visé : \\(\\cos\\varphi_1=${cosphi1}\\)</li>
    </ul>

    <p>On néglige les pertes du condensateur. Les puissances sont exprimées
    en watts, vars et voltampères.</p>
    `,
	courbe1:{},
    questions: [

        // QUESTION 1
        {
            texte: `Calculer l'angle de déphasage initial \\(\\varphi_0\\), en degrés.`,
            reponse: arrondi(phi0 * 180 / Math.PI, 1),
            unite: "°",
            feedback: `
            Le facteur de puissance est lié à l'angle par :
            \\[
            \\cos\\varphi_0=\\cos\\phi_0
            \\]
            On utilise la fonction arccos :
            \\[
            \\varphi_0=\\arccos(${cosphi0})
            \\]
            Attention à utiliser les degrés pour exprimer le résultat.
            `
        },

        // QUESTION 2
        {
            texte: `Calculer la puissance apparente initiale \\(S_0\\).`,
            reponse: arrondi(S0, 1),
            unite: "VA",
            feedback: `
            En monophasé :
            \\[
            P=S_0\\cos\\varphi_0
            \\]
            On isole la puissance apparente :
            \\[
            S_0=\\frac{P}{\\cos\\varphi_0}
            \\]
            Application numérique :
            \\[
            S_0=\\frac{${P}}{${cosphi0}}
            \\]
            `
        },

        // QUESTION 3
        {
            texte: `Calculer le courant efficace initial \\(I_0\\) absorbé par le récepteur.`,
            reponse: arrondi(I0, 2),
            unite: "A",
            feedback: `
            En monophasé :
            \\[
            S_0=U I_0
            \\]
            Donc :
            \\[
            I_0=\\frac{S_0}{U}
            \\]
            Application numérique :
            \\[
            I_0=\\frac{${arrondi(S0, 1)}}{${U}}
            \\]
            `
        },

        // QUESTION 4
        {
            texte: `Calculer la puissance réactive initiale \\(Q_0\\) du récepteur.`,
            reponse: arrondi(Q0, 1),
            unite: "var",
            feedback: `
            La puissance réactive d'une charge inductive vaut :
            \\[
            Q_0=P\\tan\\varphi_0
            \\]
            On peut également utiliser :
            \\[
            Q_0=P\\tan(\\arccos(\\cos\\varphi_0))
            \\]
            Application numérique :
            \\[
            Q_0=${P}\\times\\tan(\\arccos(${cosphi0}))
            \\]
            `
        },

        // QUESTION 5
        {
            texte: `Calculer le nouvel angle de déphasage \\(\\varphi_1\\) correspondant à l'objectif de compensation.`,
            reponse: arrondi(phi1 * 180 / Math.PI, 1),
            unite: "°",
            feedback: `
            Le facteur de puissance visé est :
            \\[
            \\cos\\varphi_1=${cosphi1}
            \\]
            Donc :
            \\[
            \\varphi_1=\\arccos(${cosphi1})
            \\]
            `
        },

        // QUESTION 6
        {
            texte: `Calculer la puissance réactive résiduelle \\(Q_1\\) souhaitée après compensation.`,
            reponse: arrondi(Q1, 1),
            unite: "var",
            feedback: `
            La puissance active reste inchangée. La puissance réactive
            correspondant au facteur de puissance visé vaut :
            \\[
            Q_1=P\\tan\\varphi_1
            \\]
            Application numérique :
            \\[
            Q_1=${P}\\times\\tan(\\arccos(${cosphi1}))
            \\]
            `
        },

        // QUESTION 7
        {
            texte: `Déterminer la puissance réactive \\(Q_C\\) que doit fournir le condensateur.`,
            reponse: arrondi(Qc, 1),
            unite: "var",
            feedback: `
            Le condensateur doit compenser une partie de la puissance
            réactive initiale :
            \\[
            Q_C=Q_0-Q_1
            \\]
            Application numérique :
            \\[
            Q_C=${arrondi(Q0, 1)}-${arrondi(Q1, 1)}
            \\]
            Le condensateur fournit une puissance réactive capacitive.
            On exprime ici sa valeur en grandeur positive.
            `
        },

        // QUESTION 8
        {
            texte: `Calculer la réactance capacitive \\(X_C\\) nécessaire.`,
            reponse: arrondi(Xc, 1),
            unite: "Ω",
            feedback: `
            Pour un condensateur idéal :
            \\[
            Q_C=\\frac{U^2}{X_C}
            \\]
            On isole la réactance :
            \\[
            X_C=\\frac{U^2}{Q_C}
            \\]
            Application numérique :
            \\[
            X_C=\\frac{${U}^2}{${arrondi(Qc, 1)}}
            \\]
            `
        },

        // QUESTION 9
        {
            texte: `Déterminer la capacité \\(C\\) du condensateur en microfarads pour atteindre le facteur de puissance visé.`,
            reponse: arrondi(Cmicro, 1),
            unite: "µF",
            feedback: `
            La réactance capacitive est liée à la capacité par :
            \\[
            X_C=\\frac{1}{2\\pi f C}
            \\]
            On isole la capacité :
            \\[
            C=\\frac{1}{2\\pi f X_C}
            \\]
            On peut aussi directement utiliser :
            \\[
            C=\\frac{Q_C}{2\\pi f U^2}
            \\]
            Application numérique :
            \\[
            C=\\frac{${arrondi(Qc, 1)}}{2\\pi\\times${f}\\times${U}^2}
            \\]
            Le résultat est d'abord obtenu en farads. Pour le convertir
            en microfarads, multiplier par \\(10^6\\) :
            \\[
            1\\,\\mu F=10^{-6}\\,F
            \\]
            `
        }

    ]
};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload = function() {
    genererExercice(exo);
	schema();
};