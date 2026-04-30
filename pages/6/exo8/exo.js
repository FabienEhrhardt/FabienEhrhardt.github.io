// =====================
// PARAMÈTRES
// =====================

let alpha = (Math.floor(Math.random()*3)+2)*10; // 20 à 40°
let distance = (Math.floor(Math.random()*3)+3); // 3 à 5 m

let Imax = (Math.floor(Math.random()*5)+5)*100; // 500 à 900 cd/klm

let rayon = Math.round(distance * Math.tan(alpha*Math.PI/180));

let S=Math.PI*rayon*rayon;

let Phi = (Math.floor(Math.random()*5)+10)*1000; // 10000 à 14000 lm
let temperature = [2000,3000,4000,5000][Math.floor(Math.random()*4)];

let Emax=Imax*Phi/1000/distance/distance;
let Emin=Imax/2*Phi/1000/distance/distance*Math.pow(Math.cos(alpha*3.14159/180),3);
let Emoy=Phi/S;
let Emoy_pond=(Emax+2*Emin)/3;
let U0=Emin/Emax;

// =====================
// FONCTION kruithof
// =====================
function Kruithof(){
	if(T=2000){
		if(Emoy_pond<10){ return "trop froid";}
		else if(Emoy_pond>150){return "trop chaud";}
		else return "confortable";
	};
	if(T=3000){
		if(Emoy_pond<100){ return "trop froid";}
		else if(Emoy_pond>500){return "trop chaud";}
		else return "confortable";
	};
	if(T=4000){
		if(Emoy_pond<300){ return "trop froid";}
		else if(Emoy_pond>1000){return "trop chaud";}
		else return "confortable";
	};
	if(T=5000){
		if(Emoy_pond<500){ return "trop froid";}
		else if(Emoy_pond>2000){return "trop chaud";}
		else return "confortable";
	}
}


// =====================
// FONCTION POLAIRE
// =====================

function intensite(theta){

    let theta0 = alpha;
    let sigma = theta0 / Math.sqrt(Math.log(2));

    return Imax * Math.exp(-Math.pow(theta/sigma,2));
}

// =====================
// TRACE GLOBAL
// =====================

function tracerPolaireEtScene(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let W = canvas.width;
    let H = canvas.height;

    let zonePolaire = {x:0, y:0, w:W/2, h:H};
    let zoneScene   = {x:W/2, y:0, w:W/2, h:H};

    // =====================
    // POLAIRE
    // =====================
    let cx = zonePolaire.x + zonePolaire.w/2;
    let cy = zonePolaire.h/2;

    let Rmax = Math.min(zonePolaire.w, zonePolaire.h)/2 - 20;
    let scale = Rmax / Imax;

    ctx.strokeStyle = "#ccc";
    for(let r=0; r<=Imax; r+=Imax/4){
        ctx.beginPath();
        ctx.arc(cx,cy,r*scale,0,2*Math.PI);
        ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(cx,cy-Rmax);
    ctx.lineTo(cx,cy+Rmax);
    ctx.moveTo(cx-Rmax,cy);
    ctx.lineTo(cx+Rmax,cy);
    ctx.stroke();

    let angles = [0,30,60,90];

    ctx.fillStyle = "black";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    angles.forEach(angle=>{
        [angle,-angle].forEach(a=>{

            let rad = a*Math.PI/180;

            let x = cx + Rmax*Math.sin(rad);
            let y = cy + Rmax*Math.cos(rad);

            ctx.beginPath();
            ctx.moveTo(cx,cy);
            ctx.lineTo(x,y);
            ctx.stroke();

            let xt = cx + (Rmax+10)*Math.sin(rad);
            let yt = cy + (Rmax+10)*Math.cos(rad);

            ctx.fillText(Math.abs(a)+"°", xt, yt);
        });
    });
	ctx.fillText("Cd/kLm",30,canvas.height-10);
	ctx.fillText(Imax,cx + (Rmax) * Math.sin(0.16),cy + (Rmax) * Math.cos(0.16));

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();

    let first=true;

    for(let theta=-90; theta<=90; theta+=1){

        let I = intensite(theta);
        let r = I * scale;

        let rad = theta*Math.PI/180;

        let x = cx + r*Math.sin(rad);
        let y = cy + r*Math.cos(rad);

        if(first){ctx.moveTo(x,y); first=false;}
        else{ctx.lineTo(x,y);}
    }

    ctx.stroke();

    ctx.fillText("Diagramme polaire", cx, 15);

    // =====================
    // SCÈNE (SYNOPTIQUE)
    // =====================

    let zone = zoneScene;

    let cx2 = zone.x + zone.w/2;
    let top = 40;
    let sol = zone.h - 40;

    let scaleSol = 40;

    let h = distance * scaleSol;
    let R = rayon * scaleSol;
	
// =====================
// ELLIPSE AVEC GRADIENT CORRECT
// =====================

let facteurY = 0.4;
let Ry = R * facteurY;

// sauvegarde contexte
ctx.save();

// on applique une transformation verticale
ctx.translate(cx2, sol);
ctx.scale(1, facteurY);

// gradient CIRCULAIRE (avant déformation)
let gradient = ctx.createRadialGradient(0, 0, 5, 0, 0, R);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");

ctx.fillStyle = gradient;

// cercle (qui deviendra ellipse après scale)
ctx.beginPath();
ctx.arc(0, 0, R, 0, 2*Math.PI);
ctx.fill();

// contour
ctx.strokeStyle = "#444";
ctx.stroke();

// restauration contexte
ctx.restore();

    // sol
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(zone.x+20, sol);
    ctx.lineTo(zone.x+zone.w-20, sol);
    ctx.stroke();

    ctx.fillText("Sol", cx2, sol+15);

    // lampe
    let lampeX = cx2;
    let lampeY = sol - h;

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(lampeX, lampeY, 6, 0, 2*Math.PI);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillText("Projecteur", lampeX, lampeY - 10);

    // faisceau
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(lampeX, lampeY);
    ctx.lineTo(cx2 - R, sol);
    ctx.moveTo(lampeX, lampeY);
    ctx.lineTo(cx2 + R, sol);
    ctx.stroke();

    // angle α
    ctx.strokeStyle = "red";
    let angleRad = alpha*Math.PI/180;

    ctx.beginPath();
    ctx.arc(lampeX, lampeY, 30, Math.PI/2 - angleRad, Math.PI/2);
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.fillText("α", lampeX + 20, lampeY + 25);

    // rayon
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(cx2, sol);
    ctx.lineTo(cx2 + R, sol);
    ctx.stroke();

    ctx.fillStyle = "green";
    ctx.fillText("R", cx2 + R/2, sol - 10);

    // hauteur
    ctx.strokeStyle = "purple";
    ctx.beginPath();
    ctx.moveTo(lampeX, lampeY);
    ctx.lineTo(cx2, sol);
    ctx.stroke();

    ctx.fillStyle = "purple";
    ctx.fillText("h", lampeX + 10, (lampeY+sol)/2);

    ctx.fillStyle = "black";
    ctx.fillText("Éclairage d’une scène", cx2, 15);
	
}



// =====================
// EXERCICE
// =====================

let theme="6";
let nomExo="exo8";

let exo={

titre:"Éclairage d’une scène avec un projecteur",

enonce:`Un projecteur est placé à ${distance} m au-dessus du sol.<br>
Son angle d’ouverture est de ${2*alpha}°.<br>
Flux lumineux : ${Phi} lm<br>
Température de couleur : ${temperature} K`,

courbe1:{},

questions:[


{
texte:"Donner la valeur du demi-angle d’ouverture",
reponse:alpha,
unite:"°",
feedback:`\\(\\alpha=\\frac{angle\\:ouverture}{2}=${alpha}\\) °`
},
{
texte:"Calculer le rayon de la zone éclairée au sol",
reponse:rayon,
unite:"m",
feedback:`\\(R = h \\times tan(\\alpha)=${rayon}\\) m`
},

{
type:"texte",
texte:"Si la hauteur double, que devient le rayon ?",
reponse:["double"],
feedback:`\\(R = h \\times tan(\\alpha)\\) donc double aussi!`
},

{
texte:"Calculer la surface éclairée",
reponse:S,
unite:"m²",
feedback:`\\(S=\\pi \\times R^2 =${arrondi(S)}m^2\\)`
},

{
texte:"Calculer l'éclairement moyen.",
reponse:Emoy,
unite:"lux",
feedback:`\\(E_{moy}=\\frac{\\Phi}{S}=${arrondi(Emoy)}\\)lux`
},

{
texte:`Le calcul précédent est très approximatif. Pour la suite, pour tenir compte des pertes, on prendra \\(E_{moy}=${arrondi(Emoy_pond)}\\) lux.<br> A partir du graphique polaire, calculer l'éclairement maximal.`,
reponse:Emax,
unite:"lux",
feedback:`\\(E_{max}=\\frac{I(0) \\times \\Phi (klm)}{h^2}=${arrondi(Emax)}\\)lux`
},

{
texte:`On prendra \\(E_{min}=${arrondi(Emin)}\\) lux. Calculer alors l'uniformité \\(U_0\\).`,
reponse:U0,
unite:"",
feedback:`\\(U_0=\\frac{E_{min}}{E_{max}}=${arrondi(U0)}\\)`
},

{
type:"texte",
texte:"Proposer une solution pour éclairer une zone plus large",
reponse:["augmenter angle", "lentille"],
feedback:`Il faudrait augmenter l'angle en changeant le luminaire ou à l'aide d'une lentille`
},

{
type:"texte",
texte:"A l'aide du diagramme de Kruithof et en se basant sur l'éclairement moyen, est ce que l'éclairement est bon?",
reponse:[Kruithof()],
feedback:`Il faut chercher sur internet ou dans le cours le diagramme de Kruithof et l'analyser.<br>
<table class="feedback-table">
  <tr>
    <th>Température de couleur</th>
    <th>Éclairement confortable (lux)</th>
    <th>Usage typique</th>
  </tr>
  <tr>
    <td>2000 K</td>
    <td>10 – 150 lux</td>
    <td>Ambiance décorative / très chaud</td>
  </tr>
  <tr>
    <td>3000 K</td>
    <td>100 – 500 lux</td>
    <td>Habitat / hôtels / confort</td>
  </tr>
  <tr>
    <td>4000 K</td>
    <td>300 – 1000 lux</td>
    <td>Bureaux / ateliers légers</td>
  </tr>
  <tr>
    <td>5000 K</td>
    <td>500 – 2000 lux</td>
    <td>Industrie / zones techniques</td>
  </tr>
</table>
Ici l'éclairement est ${Kruithof()}
`
},

]

};

// =====================
// LANCEMENT
// =====================

window.addEventListener("load", function(){

    genererExercice(exo);

    setTimeout(()=>{
        tracerPolaireEtScene("graph");
    },100);

});