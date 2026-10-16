// =====================
// PARAMÈTRES
// =====================
let U = 230;

function rad(degre) {
    return degre * Math.PI / 180;
}

// Tensions simples
let phiU1 = 0;
let phiU2 = -120;
let phiU3 = 120;


let Z1=10*(Math.floor(Math.random() * 10) + 1); //valeur de Z1 en Ohm

let f=50; // 
let omega= 2 * Math.PI*f; // pulsation rad/s

let alea1=(Math.floor(Math.random() * 3) + 1);
let Nom1,valeur1,V1,phi1; //valeur1 valeur du composant
switch(alea1)
   {
   case 1 :
    valeur1=Z1; 
	Nom1=`des résistances de résistance R=${valeur1} \\(\\Omega\\)`;
	phi1=0;
	break;
 
   case 2 :
	valeur1=arrondi(Z1/omega*1000); 
	Nom1=`des bobines d'inductance L=${valeur1} \\(mH\\)`;
	phi1=90;
	break;
	
   default :
    valeur1=arrondi(1/Z1/omega*1e6); 
	Nom1=`des condensateurs de capacité C=${valeur1} \\(\\mu F\\)`;
	phi1=-90;
	break;
   }


// =====================
// CALCULS
// =====================

// Courant de la phase 1
let I1 = U / Z1;
let phiI1 = phiU1- phi1;

// Courant de la phase 2
let I2 = U / Z1;
let phiI2 = phiU2 - phi1;

// Courant de la phase 3
let I3 = U / Z1;
let phiI3 = phiU3 - phi1;




let I1x = I1 * Math.cos(rad(phiI1));
let I1y = I1 * Math.sin(rad(phiI1));

let I2x = I2 * Math.cos(rad(phiI2));
let I2y = I2 * Math.sin(rad(phiI2));

let I3x = I3 * Math.cos(rad(phiI3));
let I3y = I3 * Math.sin(rad(phiI3));

// Somme des trois courants
let sommeX = I1x + I2x + I3x;
let sommeY = I1y + I2y + I3y;

// Courant de neutre : opposé à la somme
let INx = sommeX;
let INy = sommeY;

let IN = Math.sqrt(INx * INx + INy * INy);
let phiIN = Math.atan2(INy, INx) * 180 / Math.PI;

// Somme des trois courants
let sommeX2 = I1x + I2x;
let sommeY2 = I1y + I2y;

// Courant de neutre : opposé à la somme
let INx2 = sommeX2;
let INy2 = sommeY2;

let IN2 = Math.sqrt(INx2 * INx2 + INy2 * INy2);
let phiIN2 = Math.atan2(INy2, INx2) * 180 / Math.PI;



// =====================
// Fresnel
// =====================

let echellei = superarrondi(Math.max(I1,I2,I3,IN)/4); //Echelle pour l'axe i
let echellev = superarrondi(U/4); //Echelle pour l'axe v
let p; //position des vecteurs




// =====================
// EXERCICE
// =====================

let theme = "31";
let nomExo = "exo21";

let exo = {
    titre: "Courant de neutre charge équilibrée : diagramme de Fresnel",
    enonce: `
    <p>Une installation triphasée 230/400 V alimente trois charges identique monophasées identiques, raccordées chacune entre une phase et le neutre.</p>

    Les charges sont ${Nom1}.

    <p><b>Convention :</b> les angles positifs sont mesurés dans le sens
    trigonométrique, et les angles négatifs dans le sens horaire.</p>
	
    <canvas id="fresnel" width="600" height="450"
        style="display:block; width:100%; max-width:600px; height:auto;
        border:1px solid #cccccc; margin:15px auto;">
    </canvas>
    `,

    questions: [

        // COURANT I1
        {
            texte: `Calculer le courant dans chacune des phases \\(I\\).`,
            reponse: I1,
            unite: "A",
            feedback: `
            <table class="feedback-table">
<tr>
  <th>Type de composant</th>
  <th>Impédance</th>
</tr>
<tr>
  <td>Résistance</td>
  <td>\\(Z=R\\)</td>
</tr>
<tr>
  <td>Bobine</td>
  <td>\\(Z=L \\omega \\)</td>
</tr>
<tr>
  <td>Condensateur</td>
  <td>\\(Z=\\frac{1}{C \\omega}\\)</td>
</tr>
</table>
<br>
\\[I_1=\\frac{V_1}{Z}=${arrondi(I1)} A\\]
.
            `
        },

        {
            texte: `Déterminer l'angle entre \\(I_1\\) et \\(V_1\\), en degrés.`,
            reponse: phi1,
            unite: "°",
            feedback: `
           <table class="feedback-table">
<tr>
  <th>Type de composant</th>
  <th>Déphasage \\(\\varphi\\)</th>
</tr>
<tr>
  <td>Résistance</td>
  <td>\\(\\varphi=0\\)°</td>
</tr>
<tr>
  <td>Bobine</td>
  <td>\\(\\varphi=90\\)°</td>
</tr>
<tr>
  <td>Condensateur</td>
  <td>\\(\\varphi=-90\\)°</td>
</tr>
</table>
<br>
Si on nous donne \\(cos \\varphi\\), il suffit d'utiliser la fonction \\(acos\\) !
<br>
\\[\\varphi_1=${arrondi(phi1)} \° \\]`,
action: function() {
    tracerVecteurFresnel("fresnel",0,0,I1,phiI1,'i1','red');}
        },

        {
            texte: `Déterminer l'angle entre le courant \\(I_2\\) et \\(V_2\\) en degrés.`,
            reponse: phi1,
            unite: "°",
            feedback: `

            \\[
            \\varphi_{2}=${arrondi(phi1)} \°
            \\]
            `,
			action: function() {
			tracerVecteurFresnel("fresnel",0,0,I2,phiI2,'i2','blue');}

        },
		
		        {
            texte: `Déterminer l'angle entre le courant \\(I_2\\) et \\(V_1\\) en degrés.`,
            reponse: phiI2,
            unite: "°",
            feedback: `

            \\[
            \\varphi_{I_2/V_1}=-120-${arrondi(phi1)}=${arrondi(phiI2)} \°
            \\]
            `

        },

        {
            texte: `Déterminer l'angle entre le courant \\(I_3\\) et \\(V_1\\) en degrés.`,
            reponse: phiI3,
            unite: "°",
            feedback: `

            \\[
            \\varphi_{I_3/V_1}=120-${arrondi(phi1)}=${arrondi(phiI3)} \°
            \\]`,
			action: function() {
			tracerVecteurFresnel("fresnel",0,0,I3,phiI3,'i3','green');}
        },

        // COURANT DE NEUTRE
        {
            texte: `Déterminer le courant de neutre à l'aide d'un tracé.`,
            reponse: IN,
            unite: "A",
            feedback: `
            On fait la somme de tous les vecteurs de courant. <br>
			\\[
            I_N=0 A
            \\]
			car la charge est équilibrée!
            `
			,
			action: function() {
			p=tracerVecteurFresnel("fresnel",0,0,I1,phiI1,'i1','red');
			p=tracerVecteurFresnel("fresnel",p.x,p.y,I2,phiI2,'i2','blue');
			tracerVecteurFresnel("fresnel",p.x,p.y,I3,phiI3,'i3','green');
			tracerVecteurFresnel("fresnel",0,0,IN,phiIN,'iN','black');}
        
        },

        {
            texte: `On suppose que la charge sur la phase 3 est défectueuse. Elle sera considérée comme un circuit ouvert. Déterminer alors le courant dans le neutre \\(I_{N2}\\)`,
            reponse: IN2,
            unite: "A",
            feedback: `
            On trace le courant \\(\\overrightarrow{I_{N2}}=\\overrightarrow{I_1}+\\overrightarrow{I_2}\\)
            `,
			action: function() {
			initialisationFresnel("fresnel");
			tracerVecteurFresnel("fresnel",0,0,U,0,'v1','black','v');
			tracerVecteurFresnel("fresnel",0,0,U,-120,'v2','black','v');
			tracerVecteurFresnel("fresnel",0,0,U,-240,'v3','black','v');
			p=tracerVecteurFresnel("fresnel",0,0,I1,phiI1,'i1','red');
			tracerVecteurFresnel("fresnel",p.x,p.y,I2,phiI2,'i2','blue');
			tracerVecteurFresnel("fresnel",p.x,p.y,I2,phiI2,'i2','blue');
			tracerVecteurFresnel("fresnel",0,0,IN2,phiIN2,'iN2','black');}
        
        },
        
		 {
            texte: `Déterminer l'angle entre le courant de neutre \\(I_{N2}\\) et \\(V_1\\), en degrés.`,
            reponse: arrondi(phiIN2),
            unite: "°",
            feedback: `
            On mesure tout simplement l'angle sur la figure
            \\[
            \\varphi_{I_{N2}}=${arrondi(phiIN2)}\°
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
    initialisationFresnel("fresnel");

	tracerVecteurFresnel("fresnel",0,0,U,0,'v1','black','v');
	tracerVecteurFresnel("fresnel",0,0,U,-120,'v2','black','v');
	tracerVecteurFresnel("fresnel",0,0,U,-240,'v3','black','v');
	
	
	
	
};