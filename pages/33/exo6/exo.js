
// =====================
// PARAMÈTRES
// =====================

//Puissance apparente
let St=[50,100,160,250,315,400,500,630,800,1000,1250,1600,2000,2500];
//Pertes à vide
let P0t=[90,145,210,300,360,430,510,600,650,770,950,1200,1450,1750];
//Pertes en charge
let Pkt=[750,1250,1700,2350,2800,3250,3900,4600,6000,7600,9500,12000,15000,1850];
//InD
let InDt=[10,16,25,40,63,80,100,160,250,400,630,800,1000,1250,1600,2000,2500,3200,4000,5000];	
let IcDt=[15,20,25,30,35,50]; //Pdc en kA



let n=Math.floor(Math.random()*St.length);
let S=St[n];
let P0=P0t[n];
let Pk=Pkt[n];
let Ucc;
if(S<800){Ucc=4;}else{Ucc=6;}
// Tensions
let U = [5500,6600,10000, 15000, 20000, 30000];
let U1=U[Math.floor(Math.random()*U.length)]; // primaire (20 kV)
let U2 = 400;   // secondaire (400 V)
let U20 = arrondi(U2*1.025);

let cosphi=Math.floor(Math.random()*25+70)/100;

//Calculs
let I2n=S/Math.sqrt(3)/400*1000;
let m=U20/U1
let UccV=U1*Ucc/100;
let Zs=m*UccV/Math.sqrt(3)/I2n*1000;
let Rs=Pk/3/I2n/I2n*1000;
let Xs=Math.sqrt(Zs*Zs-Rs*Rs);
let Ik3=m*U1/Math.sqrt(3)/Zs;

function choix(I,tableau){
	let n=tableau.length;
	let j=0;
	while((I>tableau[j])&&(j<n)){
	j++;
	}
	return tableau[j];
}

let InD=choix(I2n,InDt);
let IcD=choix(Ik3,IcDt);


function creationTab(titre,tableau){
		let TabCalib='<table class="feedback-table"><tr><th>'+titre+'</th>';
		for(let i = 0; i < tableau.length; i++){
			TabCalib+='<td>'+tableau[i]+'</td>';
		}
		return TabCalib+'</tr>';
}

// =====================
// CANVAS
// =====================
function schemaExo(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let x = 150;
	let y = 150;
	let cable=20;
	let xv = x+cable;
	let yv = y+3*cable;
	
	let p;
	
	p=SourceV(canvasId,"m V1",x,y,90,"black",false,true);
	tracerVecteur(canvasId,xv,yv,40,90,"mV1","black")
	p=Fil(canvasId,p.x,p.y,0,"black",false);
	p=Fil(canvasId,p.x,p.y,0,"black",false);
	p=Resistance(canvasId,"Rs",150,150,0,"black",false,false);
	p=Bobine(canvasId,"Ls",p.x,p.y,0,"black",false,false);
    
}

function tracerCC(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");


    let cable=20;
	let x = 150+8*cable;
	let y = 150;
	
	p=Fil(canvasId,x,y,90,"black",false);
	tracerI(canvasId,x,y+2*cable,270,'I2cc',"red")
	   
}


// =====================
// EXERCICE
// =====================

let theme="33";
let nomExo="exo6";

let exo={

titre:"Transformateur triphasé – Choix du disjoncteur du secondaire",

enonce:`Soit un transformateur triphasé ${U1}V / ${U2}V. La tension à vide est de \\(U_{20}=\\)${U20} V.<br>
La puissance apparente du transformateur est de \\(S_N=${S} kVA\\).<br>
Les pertes à vide sont de \\(P_0=${P0} W\\) et les pertes en charges sont de \\(P_k=${Pk} W\\).<br>
La tension de court circuit est de \\(U_{cc}(\\%)=${Ucc}\\%\\).<br>
Le facteur de puissance de la charge est de \\(cos \\varphi = ${cosphi}\\).
 
Le schéma équivalent du secondaire est donné ci-dessous. <br><br>
Informations sur les calibres et pouvoirs de coupure normalisés des disjoncteurs
${(creationTab('Calibre (A)',InDt))}
${(creationTab('PdC (kA)',IcDt))} 
`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer le courant nominal au secondaire",
reponse:I2n,
unite:"A",
feedback:`\\(I_{2n}=\\frac{S}{\\sqrt{3}U_2}=${arrondi(I2n)} A\\)`
},

// =====================
{
texte:"Déterminer le rapport de transformation",
reponse:m,
unite:"",
feedback:`Le rapport de transformation est de \\(m=\\frac{U_{20}}{U1}=${arrondi(m)}\\)`
},

// =====================
{
texte:"Que vaut le courant au secondaire lors d'un essai en court-circuit?",
reponse:I2n,
unite:"A",
feedback:`Le courant lors de l'essai est limité à \\(I_{2n}\\).`,
action:function(){
    tracerCC("graph");
}
},

// =====================
{
texte:"Que vaut la tension entre phase au primaire lors de l'essai en court-circuit",
reponse:UccV,
unite:"V",
feedback:`\\(U_{cc}=U_{cc}(\\%) \\times U_1=${(arrondi(UccV))} V\\)`
},

// =====================
{
texte:"Calculer l'impédance du secondaire \\(Z_s\\)",
reponse:Zs,
unite:"\\( m \\Omega\\)",
feedback:`A l'aide du schéma, on trouve que \\(Z_s=\\frac{m V_{1cc}}{I_{2cc}}=${arrondi(Zs)} m \\Omega\\)`
},
// =====================
{
texte:"Calculer la résistance du secondaire \\(R_s\\)",
reponse:Rs,
unite:"\\(m \\Omega\\)",
feedback:`On utilise la puissance mesurée \\(R_s=\\frac{P_{cc}}{3I_{2cc}^2}=${arrondi(Rs)} m \\Omega\\)`
},

// =====================
{
texte:"En déduire la réactance au secondaire \\(X_s=L_s \\omega\\)",
reponse:Xs,
unite:"\\(m \\Omega\\)",
feedback:`On part de \\(Z_s=\\sqrt{R_s^2+X_s^2}\\) et en retournant la formule, on trouve \\(X_s=\\sqrt{Z_s^2-R_s^2}=${arrondi(Xs)} m \\Omega\\)`
},

// =====================
{
texte:"Déterminer le courant de court-circuit lors d'un court-circuit à tension nominale",
reponse:Ik3,
unite:"kA",
feedback:`Le courant lors d'un court-circuit franc est de : \\(I_{k3}=\\frac{mV1}{Z_s}=\\frac{m \\frac{U_1}{\\sqrt{3}}}{Z_s}=${arrondi(Ik3)} kA\\)`
},

// =====================
{
texte:"Déterminer le calibre du disjoncteur au secondaire",
reponse:InD,
unite:"A",
feedback:`On prend le calibre immédiatement au dessus du courant \\(I_{2n}\\) : ${InD} A`
},

// =====================
{
texte:"Déterminer le pouvoir de coupure du disjoncteur",
reponse:IcD,
unite:"kA",
feedback:`On prend le pouvoir de coupure immédiatement au dessus du courant de court circuit \\(I_{k3}\\) : ${IcD} A`
},

]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){

    genererExercice(exo);

    schemaExo("graph");
};