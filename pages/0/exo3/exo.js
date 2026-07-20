// =====================
// PARAMÈTRES
// =====================

let a1=Math.floor(Math.random()*100+1);
let b1=Math.floor(Math.random()*100);
let c1=arrondi(Math.sqrt(a1*a1+b1*b1));

let a2=Math.floor(Math.random()*100+1);
let b2=Math.floor(Math.random()*100);
let c2=arrondi(Math.sqrt(a2*a2+b2*b2));
let phi2=Math.acos(a2/c2)*180/Math.PI;

let a3=Math.floor(Math.random()*100+1);
let phi3=arrondi(Math.floor(Math.random()*88+1));
let c3=a3/Math.cos(phi3*Math.PI/180);

let b4=Math.floor(Math.random()*100+1);
let phi4=arrondi(Math.floor(Math.random()*88+1));
let c4=b4/Math.sin(phi4*Math.PI/180);

let a5=Math.floor(Math.random()*100+1);
let phi5=arrondi(Math.floor(Math.random()*88+1));
let b5=a5*Math.tan(phi5*Math.PI/180);


// =====================
// CANVAS
// =====================

function tracerTriangle(ecran) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;
  const oy=H-40;
  const ox=40;

  // Effacement
  ctx.clearRect(0, 0, W, H);

  /*************** GRILLE ***************/
  ctx.lineWidth = 4;
  let angle=-Math.atan((H-40)/(W-40));

  // Verticales
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox+W-80, oy);
	ctx.lineTo(ox+W-80, 40);
	ctx.lineTo(ox, oy);
    
	ctx.moveTo(ox+100*Math.cos(angle), oy+100*Math.sin(angle));
	ctx.arc(ox,oy,100,angle,0);
	ctx.stroke();
	

  /*************** TITRES DES AXES ***************/
  ctx.fillStyle = "black";
  ctx.font = "40px Arial";

  // Axe x
  ctx.fillText("a", W/2, oy - 5);
  ctx.fillText("b", ox+W-70 , H/2);
  ctx.fillText("c", W/2-15 , H/2-15);
  ctx.fillText("φ", ox+130*Math.cos(angle/2) , oy+130*Math.sin(angle/2));
    
}

// =====================
// EXERCICE
// =====================

let theme="0";
let nomExo="exo2";

let exo={

titre:"Pythagore - Trigonométrie",

enonce:`Rappels de collège sur Pythagore et la trigonométrie, nous en aurons besoin en BTS Electrotechnique`,

courbe1:{},

questions:[

// =====================
{
texte:`On donne a=${a1} et b=${b1}. Déterminer c.`,
reponse:c1,
feedback:`Pythagore donne \\(c=\\sqrt{a^2+b^2}=${arrondi(c1)}\\)`,
},

// =====================
{
texte:`On donne a=${a2} et c=${c2}. Déterminer b.`,
reponse:b2,
feedback:`Pythagore donne \\(c=\\sqrt{a^2+b^2}\\) <br>
donc \\(b=\\sqrt{c^2-a^2}=${arrondi(b2)}\\)`,
},

// =====================
{
texte:`On donne a=${a2} et c=${c2}. Déterminer \\(\\varphi\\).`,
reponse:phi2,
feedback:`La trigonométrie donne : \\(\\cos \\varphi=\\frac{a}{c}\\) <br>
donc \\(\\varphi=acos (\\frac{a}{c})=${arrondi(phi2)}\\)° <br> attention à mettre la calculatrice en degré!`,
},

// =====================
{
texte:`On donne a=${a3} et \\(\\varphi=${phi3}\\)°. Déterminer c.`,
reponse:c3,
feedback:`La trigonométrie donne : \\(\\cos \\varphi=\\frac{a}{c}\\) <br>
donc \\(c=\\frac{a}{\\cos \\varphi}=${arrondi(c3)}\\) <br> attention à mettre la calculatrice en degré!`,
},
// =====================
{
texte:`On donne b=${b4} et \\(\\varphi=${phi4}\\)°. Déterminer c.`,
reponse:c4,
feedback:`La trigonométrie donne : \\(\\sin \\varphi=\\frac{b}{c}\\) <br>
donc \\(c=\\frac{b}{\\sin \\varphi}=${arrondi(c4)}\\) <br> attention à mettre la calculatrice en degré!`,
},
// =====================
{
texte:`On donne a=${a5} et \\(\\varphi=${phi5}\\)°. Déterminer c.`,
reponse:b5,
feedback:`La trigonométrie donne : \\(\\tan \\varphi=\\frac{b}{a}\\) <br>
donc \\(b=a\\times{\\tan \\varphi}=${arrondi(b5)}\\) <br> attention à mettre la calculatrice en degré!`,
},
// =====================

]

};

// =====================
// LANCEMENT
// =====================

window.onload=function(){

    genererExercice(exo);
	tracerTriangle("graph");
};