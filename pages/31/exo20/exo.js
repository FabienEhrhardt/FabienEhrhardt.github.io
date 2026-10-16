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
let Z2=10*(Math.floor(Math.random() * 10) + 1); //valeur de Z2 en Ohm
let Z3=10*(Math.floor(Math.random() * 10) + 1); //valeur de Z3 en Ohm
let f=50; // 
let omega= 2 * Math.PI*f; // pulsation rad/s
let I=0.5*(Math.floor(Math.random() * 10) + 1); //valeur de I en mA

let alea1=(Math.floor(Math.random() * 4) + 1);
let Nom1,valeur1,V1,phi1; //valeur1 valeur du composant
switch(alea1)
   {
   case 1 :
    valeur1=Z1; 
	Nom1=`une résistance de résistance ${valeur1} \\(\\Omega\\)`;
	phi1=0;
	break;
 
   case 2 :
	valeur1=arrondi(Z1/omega*1000); 
	Nom1=`une bobine d'inductance ${valeur1} \\(mH\\)`;
	phi1=90;
	break;
   
   case 3 :
   valeur1=Z1;
   phi1=10*(Math.floor(Math.random() * 8) + 1);
   Nom1=`une impédance de ${valeur1} \\(\\Omega\\) avec un facteur de puissance de \\(cos \\varphi=${arrondi(Math.cos(rad(phi1)))}\\) inductif`;
	break;
 
   default :
    valeur1=arrondi(1/Z1/omega*1e6); 
	Nom1=`un condensateur de capacité ${valeur1} \\(\\mu F\\)`;
	phi1=-90;
	break;
   }

let alea2=(Math.floor(Math.random() * 4) + 1);
let Nom2,valeur2,V2,phi2; //valeur1 valeur du composant
switch(alea2)
   {
   case 1 :
    valeur2=Z2; 
	Nom2=`une résistance de résistance ${valeur2} \\(\\Omega\\)`;
	phi2=0;
	break;
 
   case 2 :
	valeur2=arrondi(Z2/omega*1000); 
	Nom2=`une bobine d'inductance ${valeur2} \\(mH\\)`;
	phi2=90;	
	break;
	
	case 3 :
   valeur2=Z2;
   phi2=10*(Math.floor(Math.random() * 8) + 1);
   Nom2=`une impédance de ${valeur2} \\(\\Omega\\) avec un facteur de puissance de \\(cos \\varphi=${arrondi(Math.cos(rad(phi2)))}\\) inductif`;
	break;
   
   default :
    valeur2=arrondi(1/Z2/omega*1e6); 
	Nom2=`un condensateur de capacité ${valeur2} \\(\\mu F\\)`	;
	phi2=-90;
	break;
   }

let alea3=(Math.floor(Math.random() * 4) + 1);
let Nom3,valeur3,phi3; //valeur1 valeur du composant
switch(alea3)
   {
   case 1 :
    valeur3=Z3; 
	Nom3=`une résistance de résistance ${valeur2} \\(\\Omega\\)`;
	phi3=0;
	break;
 
   case 2 :
	valeur3=arrondi(Z3/omega*1000); 
	Nom3=`une bobine d'inductance ${valeur3} \\(mH\\)`;
	phi3=90;	
	break;
	
	case 3 :
   valeur3=Z3;
   phi3=10*(Math.floor(Math.random() * 8) + 1);
   Nom3=`une impédance de ${valeur3} \\(\\Omega\\) avec un facteur de puissance de \\(cos \\varphi=${arrondi(Math.cos(rad(phi3)))}\\) inductif`;
	break;
   
   default :
    valeur3=arrondi(1/Z3/omega*1e6); 
	Nom3=`un condensateur de capacité ${valeur3} \\(\\mu F\\)`	;
	phi3=-90;
	break;
   }

// =====================
// CALCULS
// =====================

// Courant de la phase 1
let I1 = U / Z1;
let phiI1 = phiU1- phi1;

// Courant de la phase 2
let I2 = U / Z2;
let phiI2 = phiU2 - phi2;

// Courant de la phase 3
let I3 = U / Z3;
let phiI3 = phiU3 - phi3;




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
let nomExo = "exo20";

let exo = {
    titre: "Courant de neutre charge déséquilibrée : diagramme de Fresnel",
    enonce: `
    <p>Une installation triphasée 230/400 V alimente trois charges
    monophasées différentes, raccordées chacune entre une phase et le neutre.</p>

    <p><b>Caractéristiques des charges :</b></p>
    <ul>
        <li>Phase 1 : ${Nom1}</li>
        <li>Phase 2 : ${Nom2}</li>
        <li>Phase 3 : ${Nom3}</li>
    </ul>

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
            texte: `Calculer le courant \\(I_1\\) dans la phase 1.`,
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
\\[I_1=\\frac{V_1}{Z_1}=${arrondi(I1)} A\\]
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

        // COURANT I2
        {
            texte: `Calculer la valeur efficace du courant \\(I_2\\) dans la phase 2.`,
            reponse: I2,
            unite: "A",
            feedback: `
            Pour une charge caractérisée par son impédance :
            \\[
            I_2=\\frac{V_2}{Z_2}=${arrondi(I2)} A
            \\]            `
        },

        {
            texte: `Déterminer l'angle entre le courant \\(I_2\\) et \\(V_2\\), en degrés.`,
            reponse: phi2,
            unite: "°",
            feedback: `

            \\[
            \\varphi_{I_2}=${arrondi(phi2)} \°
            \\]
            `,
			action: function() {
			tracerVecteurFresnel("fresnel",0,0,I2,phiI2,'i2','blue');}

        },

        // COURANT I3
        {
            texte: `Calculer la valeur efficace du courant \\(I_3\\).`,
            reponse: I3,
            unite: "A",
            feedback: `
			Pour une charge caractérisée par son impédance :
            \\[
            I_3=\\frac{V_3}{Z_3}=${arrondi(I3)} A
            \\]    `
        },

        {
            texte: `Déterminer l'angle entre le courant \\(I_3\\)  et \\(V_3\\), en degrés.`,
            reponse: phi3,
            unite: "°",
            feedback: `

            \\[
            \\varphi_{I_3}=${arrondi(phi3)} \°
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
            I_N=${arrondi(IN)} A
            \\]
            `
			,
			action: function() {
			p=tracerVecteurFresnel("fresnel",0,0,I1,phiI1,'i1','red');
			p=tracerVecteurFresnel("fresnel",p.x,p.y,I2,phiI2,'i2','blue');
			tracerVecteurFresnel("fresnel",p.x,p.y,I3,phiI3,'i3','green');
			tracerVecteurFresnel("fresnel",0,0,IN,phiIN,'iN','black');}
        
        },

        {
            texte: `Déterminer l'angle entre le courant de neutre \\(I_N\\) et \\(V_1\\), en degrés.`,
            reponse: arrondi(phiIN),
            unite: "°",
            feedback: `
            On mesure tout simplement l'angle sur la figure
            \\[
            \\varphi_{I_N}=${arrondi(phiIN)}\°
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