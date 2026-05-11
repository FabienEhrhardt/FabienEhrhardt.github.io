// =====================
// PARAMÈTRES
// =====================

//Puissance apparente
St=[50,100,160,250,315,400,500,630,800,1000,1250,1600,2000,2500];
//Pertes à vide
P0t=[90,145,210,300,360,430,510,600,650,770,950,1200,1450,1750];
//Pertes en charge
Pkt=[750,1250,1700,2350,2800,3250,3900,4600,6000,7600,9500,12000,15000,1850]
let n=Math.floor(Math.random()*St.length);
let S=St[n];
let P0=P0t[n];
let Pk=Pkt[n];
let Ucc;
if(S<800){Ucc=4;}else{Ucc=6;}

let cosphi=Math.floor(Math.random()*25+70)/100;

//Calculs
let Pu = S*cosphi;
let Pa = arrondi(Pu + P0/1000 + Pk/1000);
let eta = arrondi(Pu/Pa*100);
let I2n=S/Math.sqrt(3)/400*1000;

let cosphi2=Math.floor(Math.random()*5+90)/100;
let I2=Pu/Math.sqrt(3)/400/cosphi2*1000;
let Ppertes=P0+Pk*I2*I2/I2n/I2n;

// =====================
// CANVAS
// =====================
function tracerBilanPuissanceStylise(canvasId){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let y = 150;
	Redresseur(canvasId,"R",10,100,0,"black",true,true);
	Redresseur(canvasId,"R",100,100,60,"black",true,true);
	Redresseur(canvasId,"R",10,300,90,"black",true,true);
	Redresseur(canvasId,"R",100,300,-90,"black",true,true);

    
}

function tracerVecteur(canvasId,x1,y1,longueur,angle,nom,couleur) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  let rad = angle * Math.PI / 180;
    
  //Position finale
  
  let x2 = x1 + longueur * Math.cos(rad);
  let y2 = y1- longueur * Math.sin(rad);
  
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  
  // Vecteur
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
  
  // ===== Pointe de flèche =====
  let taille = 10;       // longueur de la flèche
  let ouverture = Math.PI / 6;  // angle d’ouverture (~30°)

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - taille * Math.cos(rad - ouverture),
    y2 + taille * Math.sin(rad - ouverture)
  );
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - taille * Math.cos(rad + ouverture),
    y2 + taille * Math.sin(rad + ouverture)
  );
  ctx.stroke();
  
// Position au milieu du vecteur
  let xm = (x1 + x2) / 2;
  let ym = (y1 + y2) / 2;

// Décalage perpendiculaire pour écrire "au-dessus"
  let decalage = 7;
  xm += decalage * Math.sin(rad);
  ym += decalage * Math.cos(rad);

  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.textAlign = "left";
  ctx.fillText(nom, xm, ym);
}

function tracerI(canvasId,x1,y1,angle,nom,couleur,generateur=false) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  let rad = angle * Math.PI / 180;
  let angGene=0;
  if(generateur){angGene=Math.PI;}
    
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  
  // ===== Pointe de flèche =====
  let taille = 10;       // longueur de la flèche
  let ouverture = Math.PI / 6;  // angle d’ouverture (~30°)

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(
    x1 - taille * Math.cos(angGene+rad - ouverture),
    y1 + taille * Math.sin(angGene+rad - ouverture)
  );
  ctx.moveTo(x1, y1);
  ctx.lineTo(
    x1 - taille * Math.cos(angGene+rad + ouverture),
    y1 + taille * Math.sin(angGene+rad + ouverture)
  );
  ctx.stroke();


// Décalage perpendiculaire pour écrire "au-dessus"
  let decalage = 15;
  let xm =x1+ decalage * Math.sin(rad);
  let ym =y1+ decalage * Math.cos(rad);

  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(nom, xm, ym);
}

function Resistance(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x1=posX+cable * Math.cos(rad);
	let y1=posY+cable * Math.sin(rad);
	let x2 = x1+largeur/2* Math.sin(rad);
	let x5 = x1-largeur/2* Math.sin(rad);
	let y2 = y1-largeur/2* Math.cos(rad);
	let y5 = y1+largeur/2* Math.cos(rad);
	let x3 = x2 + 2*cable * Math.cos(rad);
	let y3 = y2 + 2*cable * Math.sin(rad);
	let x4 = x5 + 2*cable * Math.cos(rad);
	let y4 = y5 + 2*cable * Math.sin(rad);
	let x6 = x1 + 2*cable * Math.cos(rad);
	let y6 = y1 + 2*cable * Math.sin(rad);
	let x7 = x6 + cable * Math.cos(rad);
	let y7 = y6 + cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x3,y3);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x1,y1);
	ctx.moveTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.stroke();
	
	//Tracé vecteur tension
	let xv = x3+ecart/2* Math.sin(rad);
	let yv = y3-ecart/2* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red");}
	
	let xt = (posX+x7)/2-ecart* Math.sin(rad);
	let yt = (posY+y7)/2+ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function Bobine(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x1=posX+cable * Math.cos(rad);
	let y1=posY+cable * Math.sin(rad);
	let x2=posX+1.25*cable * Math.cos(rad);
	let y2=posY+1.25*cable * Math.sin(rad);
	let x3=posX+1.75*cable * Math.cos(rad);
	let y3=posY+1.75*cable * Math.sin(rad);
	let x4=posX+2.25*cable * Math.cos(rad);
	let y4=posY+2.25*cable * Math.sin(rad);
	let x5=posX+2.75*cable * Math.cos(rad);
	let y5=posY+2.75*cable * Math.sin(rad);
	let x6=posX+3*cable * Math.cos(rad);
	let y6=posY+3*cable * Math.sin(rad);
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.arc(x2,y2,cable/4,rad+Math.PI,rad+2*Math.PI);
	ctx.arc(x3,y3,cable/4,rad+Math.PI,rad+2*Math.PI);
	ctx.arc(x4,y4,cable/4,rad+Math.PI,rad+2*Math.PI);
	ctx.arc(x5,y5,cable/4,rad+Math.PI,rad+2*Math.PI);
	ctx.moveTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.stroke();
	
	//Tracé vecteur tension
	let xv = x6+ecart/2* Math.sin(rad);
	let yv = y6-ecart/2* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red")};
	
	let xt = (posX+x7)/2-ecart* Math.sin(rad);
	let yt = (posY+y7)/2+ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function Condensateur(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x1=posX+1.75*cable * Math.cos(rad);
	let y1=posY+1.75*cable * Math.sin(rad);
	let x2=x1+largeur* Math.sin(rad);
	let y2=y1-largeur* Math.cos(rad);
	let x3=x1-largeur* Math.sin(rad);
	let y3=y1+largeur* Math.cos(rad);
	let x4=posX+2.25*cable * Math.cos(rad);
	let y4=posY+2.25*cable * Math.sin(rad);
	let x5=x4+largeur* Math.sin(rad);
	let y5=y4-largeur* Math.cos(rad);
	let x6=x4-largeur* Math.sin(rad);
	let y6=y4+largeur* Math.cos(rad);
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x3,y3);
	ctx.moveTo(x7,y7);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x6,y6);
	ctx.stroke();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red")};
	
	let xt = (posX+x7)/2-1.5*ecart* Math.sin(rad);
	let yt = (posY+y7)/2+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function SourceV(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x1=posX+1.25*cable * Math.cos(rad);
	let y1=posY+1.25*cable * Math.sin(rad);
	let x2=posX+2*cable * Math.cos(rad);
	let y2=posY+2*cable * Math.sin(rad);
	let x3=posX+1.5*cable * Math.cos(rad);
	let y3=posY+1.5*cable * Math.sin(rad);
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(x2+0.75*cable, y2);
	ctx.arc(x2,y2,0.75*cable,0,2*Math.PI);
	ctx.moveTo(posX, posY);
	ctx.lineTo(x7,y7);
	ctx.stroke();
	
	// ===== Pointe de flèche =====
	let taille = 10;       // longueur de la flèche
	let ouverture = Math.PI / 6;  // angle d’ouverture (~30°)

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(
		x1 + taille * Math.cos(rad - ouverture),
		y1 + taille * Math.sin(rad - ouverture)
	);
	ctx.moveTo(x1, y1);
	ctx.lineTo(
		x1 + taille * Math.cos(rad + ouverture),
		y1 + taille * Math.sin(rad + ouverture)
	);
	ctx.stroke();
	
	
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+x1)/2,(posY+y1)/2,360-angle,'i',"red",true)};
	
	let xt = (posX+x7)/2-1.5*ecart* Math.sin(rad);
	let yt = (posY+y7)/2+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function SourceI(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x1=posX+1.25*cable * Math.cos(rad);
	let y1=posY+1.25*cable * Math.sin(rad);
	let x2=posX+2*cable * Math.cos(rad);
	let y2=posY+2*cable * Math.sin(rad);
	let x3=posX+2.75*cable * Math.cos(rad);
	let y3=posY+2.75*cable * Math.sin(rad);
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(x2+0.75*cable, y2);
	ctx.arc(x2,y2,0.75*cable,0,2*Math.PI);
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.moveTo(x3, y3);
	ctx.lineTo(x7,y7);
	ctx.moveTo(x2+0.75*cable* Math.sin(rad), y2-0.75*cable* Math.cos(rad));
	ctx.lineTo(x2-0.75*cable* Math.sin(rad), y2+0.75*cable* Math.cos(rad));
	ctx.stroke();
	
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+x1)/2,(posY+y1)/2,360-angle,'i',"red",true)};
	
	let xt = (posX+x7)/2-1.5*ecart* Math.sin(rad);
	let yt = (posY+y7)/2+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function Diode(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x1=posX+1.5*cable * Math.cos(rad);
	let y1=posY+1.5*cable * Math.sin(rad);
	let x2 = x1+largeur* Math.sin(rad);
	let x5 = x1-largeur* Math.sin(rad);
	let y2 = y1-largeur* Math.cos(rad);
	let y5 = y1+largeur* Math.cos(rad);
	let x3 = x2 + cable * Math.cos(rad);
	let y3 = y2 + cable * Math.sin(rad);
	let x4 = x5 + cable * Math.cos(rad);
	let y4 = y5 + cable * Math.sin(rad);
	let x6 = posX + 2.5*cable * Math.cos(rad);
	let y6 = posY + 2.5*cable * Math.sin(rad);
	let x7 = posX + 4*cable * Math.cos(rad);
	let y7 = posY + 4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x2,y2);
	ctx.moveTo(x3,y3);
	ctx.lineTo(x4,y4);
	ctx.moveTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.stroke();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red");}
	
	let xt = (posX+x7)/2-ecart* Math.sin(rad);
	let yt = (posY+y7)/2+ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function Thyristor(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x1=posX+1.5*cable * Math.cos(rad);
	let y1=posY+1.5*cable * Math.sin(rad);
	let x2 = x1+largeur* Math.sin(rad);
	let x5 = x1-largeur* Math.sin(rad);
	let y2 = y1-largeur* Math.cos(rad);
	let y5 = y1+largeur* Math.cos(rad);
	let x3 = x2 + cable * Math.cos(rad);
	let y3 = y2 + cable * Math.sin(rad);
	let x4 = x5 + cable * Math.cos(rad);
	let y4 = y5 + cable * Math.sin(rad);
	let x6 = posX + 2.5*cable * Math.cos(rad);
	let y6 = posY + 2.5*cable * Math.sin(rad);
	let x7 = posX + 4*cable * Math.cos(rad);
	let y7 = posY + 4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x2,y2);
	ctx.moveTo(x3,y3);
	ctx.lineTo(x4,y4);
	ctx.moveTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.stroke();
	
	// ===== Gachette =====
	let taille = 7;       // longueur de la flèche
	let ouverture = Math.PI / 6;  // angle d’ouverture (~30°)
	let xg=x3 + taille * Math.cos(rad - ouverture);
	let yg=y3 + taille * Math.sin(rad - ouverture);

	ctx.beginPath();
	ctx.moveTo(x3, y3);
	ctx.lineTo(xg,yg);
	ctx.stroke();
	
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red");}
	
	let xt = (posX+x7)/2-ecart* Math.sin(rad);
	let yt = (posY+y7)/2+ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	ctx.fillText('g', x3+ 2*taille * Math.cos(rad), y3+2*taille * Math.sin(rad));
	return {x:x7,y:y7}
}

function IGBT(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let ouverture = Math.PI / 6;
	let x1=posX+cable * Math.cos(rad);
	let y1=posY+cable * Math.sin(rad);
	let x2 = x1+cable* Math.cos(rad+ouverture);
	let y2 = y1+cable* Math.sin(rad+ouverture);
	let x4=x2-cable * Math.cos(rad);
	let y4=y2-cable * Math.sin(rad);
	let x6 = posX + 3*cable * Math.cos(rad);
	let y6 = posY + 3*cable * Math.sin(rad);
	let x3 = x6+cable* Math.cos(Math.PI+rad-ouverture);
	let y3 = y6+cable* Math.sin(Math.PI+rad-ouverture);
	let x5=x3+cable * Math.cos(rad);
	let y5=y3+cable * Math.sin(rad);
	
	
	
	let x10 = x4-largeur/2* Math.sin(rad);
	let x11 = x5-largeur/2* Math.sin(rad);
	let y10 = y4+largeur/2* Math.cos(rad);
	let y11 = y5+largeur/2* Math.cos(rad);
	
	let x8=(x10+x11)/2;
	let y8=(y10+y11)/2;
	
	let x9 = x8+cable/2* Math.cos(Math.PI/2+rad);
	let y9 = y8+cable/2* Math.sin(Math.PI/2+rad);
	let x7 = posX + 4*cable * Math.cos(rad);
	let y7 = posY + 4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x3,y3);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x7,y7);
	
	ctx.moveTo(x10,y10);
	ctx.lineTo(x8,y8);
	ctx.lineTo(x9,y9);
	ctx.lineTo(x8,y8);
	ctx.lineTo(x11,y11);
	
	
	ctx.stroke();

	// ===== Pointe de flèche =====
  let taille = 10;       // longueur de la flèche
  let ouvertureF = Math.PI / 10;  // angle d’ouverture (~30°)

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - taille * Math.cos(-rad-ouverture - ouvertureF),
    y2 + taille * Math.sin(-rad-ouverture - ouvertureF));
  ctx.lineTo(
    x2 - taille * Math.cos(-rad-ouverture + ouvertureF),
    y2 + taille * Math.sin(-rad-ouverture + ouvertureF)
  );
  ctx.lineTo(x2,y2);
  ctx.closePath();
  ctx.fill();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red");}
	
	let xt = x1-1.5*ecart* Math.sin(rad);
	let yt = y1+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	return {x:x7,y:y7}
}

function NPN(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let ouverture = Math.PI / 6;
	let x1=posX+cable * Math.cos(rad);
	let y1=posY+cable * Math.sin(rad);
	let x2 = x1+cable* Math.cos(rad+ouverture);
	let y2 = y1+cable* Math.sin(rad+ouverture);
	let x4=x2-cable * Math.cos(rad);
	let y4=y2-cable * Math.sin(rad);
	let x6 = posX + 3*cable * Math.cos(rad);
	let y6 = posY + 3*cable * Math.sin(rad);
	let x3 = x6+cable* Math.cos(Math.PI+rad-ouverture);
	let y3 = y6+cable* Math.sin(Math.PI+rad-ouverture);
	let x5=x3+cable * Math.cos(rad);
	let y5=y3+cable * Math.sin(rad);
	let x8=(x5+x4)/2;
	let y8=(y5+y4)/2;
	let x9 = x8+cable/2* Math.cos(Math.PI/2+rad);
	let y9 = y8+cable/2* Math.sin(Math.PI/2+rad);
	let x7 = posX + 4*cable * Math.cos(rad);
	let y7 = posY + 4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x8,y8);
	ctx.lineTo(x9,y9);
	ctx.lineTo(x8,y8);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x3,y3);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.stroke();

	// ===== Pointe de flèche =====
  let taille = 10;       // longueur de la flèche
  let ouvertureF = Math.PI / 10;  // angle d’ouverture (~30°)

  ctx.beginPath();
  ctx.moveTo(x3, y3);
  ctx.lineTo(
    x3 + taille * Math.cos(-rad+ouverture - ouvertureF),
    y3 - taille * Math.sin(-rad+ouverture - ouvertureF));
  ctx.lineTo(
    x3 + taille * Math.cos(-rad+ouverture + ouvertureF),
    y3 - taille * Math.sin(-rad+ouverture + ouvertureF));
  ctx.lineTo(x3,y3);
  ctx.closePath();
  ctx.fill();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red");}
	
	let xt = x1-1.5*ecart* Math.sin(rad);
	let yt = y1+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	return {x:x7,y:y7}
}

function PNP(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let ouverture = Math.PI / 6;
	let x1=posX+cable * Math.cos(rad);
	let y1=posY+cable * Math.sin(rad);
	let x2 = x1+cable* Math.cos(rad+ouverture);
	let y2 = y1+cable* Math.sin(rad+ouverture);
	let x4=x2-cable * Math.cos(rad);
	let y4=y2-cable * Math.sin(rad);
	let x6 = posX + 3*cable * Math.cos(rad);
	let y6 = posY + 3*cable * Math.sin(rad);
	let x3 = x6+cable* Math.cos(Math.PI+rad-ouverture);
	let y3 = y6+cable* Math.sin(Math.PI+rad-ouverture);
	let x5=x3+cable * Math.cos(rad);
	let y5=y3+cable * Math.sin(rad);
	let x8=(x5+x4)/2;
	let y8=(y5+y4)/2;
	let x9 = x8+cable/2* Math.cos(Math.PI/2+rad);
	let y9 = y8+cable/2* Math.sin(Math.PI/2+rad);
	let x7 = posX + 4*cable * Math.cos(rad);
	let y7 = posY + 4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x8,y8);
	ctx.lineTo(x9,y9);
	ctx.lineTo(x8,y8);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x3,y3);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.stroke();

	// ===== Pointe de flèche =====
  let taille = 10;       // longueur de la flèche
  let ouvertureF = Math.PI / 10;  // angle d’ouverture (~30°)

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - taille * Math.cos(-rad-ouverture - ouvertureF),
    y2 + taille * Math.sin(-rad-ouverture - ouvertureF));
  ctx.lineTo(
    x2 - taille * Math.cos(-rad-ouverture + ouvertureF),
    y2 + taille * Math.sin(-rad-ouverture + ouvertureF)
  );
  ctx.lineTo(x2,y2);
  ctx.closePath();
  ctx.fill();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(posX+2*x1)/3,(posY+2*y1)/3,360-angle,'i',"red");}
	
	let xt = x1-1.5*ecart* Math.sin(rad);
	let yt = y1+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	return {x:x7,y:y7}
}

function Fil(canvasId,posX,posY,angle,couleur,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX,posY);
	ctx.lineTo(x7,y7);
	ctx.stroke();
	
	if(i){tracerI(canvasId,(posX+x7)/2,(posY+y7)/2,360-angle,'i',"red")};
	
	return {x:x7,y:y7}
}

function Transformateur(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let ouv=Math.PI/2.5;
	let x1=posX+1.25*cable * Math.cos(rad);
	let y1=posY+1.25*cable * Math.sin(rad);	
	let x6=posX+4.75*cable * Math.cos(rad);
	let y6=posY+4.75*cable * Math.sin(rad);
	let x7=posX+6*cable * Math.cos(rad);
	let y7=posY+6*cable * Math.sin(rad);
	let x8=x1+1.3*cable * Math.cos(rad-ouv);
	let y8=y1+1.3*cable * Math.sin(rad-ouv);
	let x9=x6+1.3*cable * Math.cos(Math.PI+(rad+ouv));
	let y9=y6+1.3*cable * Math.sin(Math.PI+(rad+ouv));
	
	
	let x10 = posX+4*cable* Math.sin(rad);
	let y10 = posY-4*cable* Math.cos(rad);
	let x11 = x10+1.25*cable * Math.cos(rad);
	let y11 = y10+1.25*cable * Math.sin(rad);
	let x16 = x10+4.75*cable * Math.cos(rad);
	let y16 = y10+4.75*cable * Math.sin(rad);
	let x17 = x10+6*cable * Math.cos(rad);
	let y17 = y10+6*cable * Math.sin(rad);
	let x18=x11+1.3*cable * Math.cos(rad+ouv);
	let y18=y11+1.3*cable * Math.sin(rad+ouv);
	let x19=x16+1.3*cable * Math.cos(Math.PI+(rad-ouv));
	let y19=y16+1.3*cable * Math.sin(Math.PI+(rad-ouv));
	
	
	
	let xc=(x10+x6)/2;
	let yc=(y10+y6)/2;
	let xc2=(x11+x7)/2;
	let yc2=(y11+y7)/2;
		

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX,posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x8,y8);
	ctx.moveTo(x10,y10);
	ctx.lineTo(x11,y11);
	ctx.lineTo(x18,y18);
	ctx.moveTo(x9,y9);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.moveTo(x19,y19);
	ctx.lineTo(x16,y16);
	ctx.lineTo(x17,y17);
	ctx.moveTo(xc+cable, yc);
	ctx.arc(xc,yc,cable,0,2*Math.PI);
	ctx.moveTo(xc2+cable, yc2);
	ctx.arc(xc2,yc2,cable,0,2*Math.PI);
	
	ctx.stroke();

	let xt = (x10+x17)/2;
	let yt = (y10+y17)/2;
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	let xv = (x6+x7)/2+ecart* Math.sin(rad);
	let yv = (y6+y7)/2-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,90-angle,'m V1',couleur);}
	if(i){tracerI(canvasId,(x10+2*x11)/3,(y10+2*y11)/3,360-angle,'i',"red");}
	
	return {x:x7,y:y7}
}

function SourceV2(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x0=posX+0.5*cable * Math.cos(rad);
	let y0=posY+0.5*cable * Math.sin(rad);
	let x1=posX+1.75*cable * Math.cos(rad);
	let y1=posY+1.75*cable * Math.sin(rad);
	let x2=x1+2*largeur* Math.sin(rad);
	let y2=y1-2*largeur* Math.cos(rad);
	let x3=x1-2*largeur* Math.sin(rad);
	let y3=y1+2*largeur* Math.cos(rad);
	let x4=posX+2.25*cable * Math.cos(rad);
	let y4=posY+2.25*cable * Math.sin(rad);
	let x5=x4+largeur* Math.sin(rad);
	let y5=y4-largeur* Math.cos(rad);
	let x6=x4-largeur* Math.sin(rad);
	let y6=y4+largeur* Math.cos(rad);
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x3,y3);
	ctx.moveTo(x7,y7);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x5,y5);
	ctx.lineTo(x6,y6);
	ctx.stroke();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+1.5*ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-1.5*ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(x0),(y0),360-angle,'i',"red",true)};
	
	let xt = (posX+x7)/2-1.5*ecart* Math.sin(rad);
	let yt = (posY+y7)/2+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function Batterie(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x0=posX+0.5*cable * Math.cos(rad);
	let y0=posY+0.5*cable * Math.sin(rad);
	let x1=posX+1.25*cable * Math.cos(rad);
	let y1=posY+1.25*cable * Math.sin(rad);
	let x2=x1+2*largeur* Math.sin(rad);
	let y2=y1-2*largeur* Math.cos(rad);
	let x3=x1-2*largeur* Math.sin(rad);
	let y3=y1+2*largeur* Math.cos(rad);
	let x4=posX+1.75*cable * Math.cos(rad);
	let y4=posY+1.75*cable * Math.sin(rad);
	let x5=x4+largeur* Math.sin(rad);
	let y5=y4-largeur* Math.cos(rad);
	let x6=x4-largeur* Math.sin(rad);
	let y6=y4+largeur* Math.cos(rad);
	let x11=posX+2.25*cable * Math.cos(rad);
	let y11=posY+2.25*cable * Math.sin(rad);
	let x12=x11+2*largeur* Math.sin(rad);
	let y12=y11-2*largeur* Math.cos(rad);
	let x13=x11-2*largeur* Math.sin(rad);
	let y13=y11+2*largeur* Math.cos(rad);
	let x14=posX+2.75*cable * Math.cos(rad);
	let y14=posY+2.75*cable * Math.sin(rad);
	let x15=x14+largeur* Math.sin(rad);
	let y15=y14-largeur* Math.cos(rad);
	let x16=x14-largeur* Math.sin(rad);
	let y16=y14+largeur* Math.cos(rad);
	
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x3,y3);
	ctx.moveTo(x7,y7);
	ctx.lineTo(x14,y14);
	ctx.lineTo(x15,y15);
	ctx.lineTo(x16,y16);
	
	ctx.moveTo(x5,y5);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x11,y11);
	ctx.lineTo(x12,y12);
	ctx.lineTo(x13,y13);
	ctx.stroke();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+1.5*ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-1.5*ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(x0),(y0),360-angle,'i',"red",true)};
	
	let xt = (posX+x7)/2-1.5*ecart* Math.sin(rad);
	let yt = (posY+y7)/2+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function PV(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let x0=posX+0.5*cable * Math.cos(rad);
	let y0=posY+0.5*cable * Math.sin(rad);
	let x1=posX+1.25*cable * Math.cos(rad);
	let y1=posY+1.25*cable * Math.sin(rad);
	let x2=x1+1.5*largeur* Math.sin(rad);
	let y2=y1-1.5*largeur* Math.cos(rad);
	let x3=x1-1.5*largeur* Math.sin(rad);
	let y3=y1+1.5*largeur* Math.cos(rad);
	let x4=posX+2*cable * Math.cos(rad);
	let y4=posY+2*cable * Math.sin(rad);
	let x14=posX+2.75*cable * Math.cos(rad);
	let y14=posY+2.75*cable * Math.sin(rad);
	let x15=x14+1.5*largeur* Math.sin(rad);
	let y15=y14-1.5*largeur* Math.cos(rad);
	let x16=x14-1.5*largeur* Math.sin(rad);
	let y16=y14+1.5*largeur* Math.cos(rad);
	
	let x7=posX+4*cable * Math.cos(rad);
	let y7=posY+4*cable * Math.sin(rad);

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x3,y3);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x15,y15);
	ctx.lineTo(x14,y14);
	ctx.lineTo(x16,y16);
	ctx.lineTo(x3,y3);
	ctx.moveTo(x14,y14);
	ctx.lineTo(x7,y7);
	ctx.stroke();
	
	//Tracé vecteur tension
	let xv = posX+3*cable * Math.cos(rad)+1.5*ecart* Math.sin(rad);
	let yv = posY+3*cable * Math.sin(rad)-1.5*ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,180-angle,'v',couleur);}
	if(i){tracerI(canvasId,(x0),(y0),360-angle,'i',"red",true)};
	
	let xt = (posX+x7)/2-1.5*ecart* Math.sin(rad);
	let yt = (posY+y7)/2+1.5*ecart* Math.cos(rad);
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	
	return {x:x7,y:y7}
}

function Redresseur(canvasId,nom,posX,posY,angle,couleur,v=false,i=false){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
	let rad = angle * Math.PI / 180;
	let cable=20;
	let largeur=10;
	let ecart=20;
	let ouv=Math.PI/2;
	let x1=posX+1.25*cable * Math.cos(rad);
	let y1=posY+1.25*cable * Math.sin(rad);	
	let x6=posX+4.75*cable * Math.cos(rad);
	let y6=posY+4.75*cable * Math.sin(rad);
	let x7=posX+6*cable * Math.cos(rad);
	let y7=posY+6*cable * Math.sin(rad);
	let x8=x1+1.3*cable * Math.cos(rad-ouv);
	let y8=y1+1.3*cable * Math.sin(rad-ouv);
	let x2=x8+0.5*cable * Math.cos(rad);
	let y2=y8+0.5*cable * Math.sin(rad);	
	let x9=x6+1.3*cable * Math.cos(Math.PI+(rad+ouv));
	let y9=y6+1.3*cable * Math.sin(Math.PI+(rad+ouv));
	
	
	let x10 = posX+4*cable* Math.sin(rad);
	let y10 = posY-4*cable* Math.cos(rad);
	let x11 = x10+1.25*cable * Math.cos(rad);
	let y11 = y10+1.25*cable * Math.sin(rad);
	let x16 = x10+4.75*cable * Math.cos(rad);
	let y16 = y10+4.75*cable * Math.sin(rad);
	let x17 = x10+6*cable * Math.cos(rad);
	let y17 = y10+6*cable * Math.sin(rad);
	let x18=x11+1.3*cable * Math.cos(rad+ouv);
	let y18=y11+1.3*cable * Math.sin(rad+ouv);
	let x19=x16+1.3*cable * Math.cos(Math.PI+(rad-ouv));
	let y19=y16+1.3*cable * Math.sin(Math.PI+(rad-ouv));
	
	
	
	let xc=(x10+x6)/2;
	let yc=(y10+y6)/2;
	let xc2=(x11+x7)/2;
	let yc2=(y11+y7)/2;
		

    ctx.strokeStyle = couleur;
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX,posY);
	ctx.lineTo(x1,y1);
	ctx.lineTo(x8,y8);
	ctx.moveTo(x10,y10);
	ctx.lineTo(x11,y11);
	ctx.lineTo(x18,y18);
	ctx.moveTo(x9,y9);
	ctx.lineTo(x6,y6);
	ctx.lineTo(x7,y7);
	ctx.moveTo(x19,y19);
	ctx.lineTo(x16,y16);
	ctx.lineTo(x17,y17);
	ctx.moveTo(xc+cable, yc);
	ctx.arc(xc,yc,cable,0,2*Math.PI);
	ctx.moveTo(xc2+cable, yc2);
	ctx.arc(xc2,yc2,cable,0,2*Math.PI);
	
	ctx.stroke();

	let xt = (x10+x17)/2;
	let yt = (y10+y17)/2;
	ctx.fillStyle = couleur;
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.fillText(nom, xt, yt);
	let xv = (x6+x7)/2+ecart* Math.sin(rad);
	let yv = (y6+y7)/2-ecart* Math.cos(rad);
	if(v){tracerVecteur(canvasId,xv,yv,40,90-angle,'m V1',couleur);}
	if(i){tracerI(canvasId,(x10+2*x11)/3,(y10+2*y11)/3,360-angle,'i',"red");}
	
	return {x:x7,y:y7}
}



function tracerFleche(canvasId,x0,y0,longueur,largeur,angle,nom,couleur) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  // Origine du repère
  let rad = angle * Math.PI / 180;
  let scale;
  
  let x1 = x0+largeur/2* Math.sin(rad);
  let x2 = x0-largeur/2* Math.sin(rad);
  let y1 = y0-largeur/2* Math.cos(rad);
  let y2 = y0+largeur/2* Math.cos(rad);
  let x3 = x1 + longueur * Math.cos(rad);
  let y3 = y1 + longueur * Math.sin(rad);
  let x4 = x2 + longueur * Math.cos(rad);
  let y4 = y2 + longueur * Math.sin(rad);
  
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;

  // ===== Pointe de flèche =====
  let taille = largeur*1.2;       // longueur de la flèche
  let ouverture = Math.PI / 4;  // angle d’ouverture (~30°)
  
  //position flèche
  let x5 = x0 + (longueur+taille/2/Math.cos(ouverture)) * Math.cos(rad);
  let y5 = y0 + (longueur+taille/2/Math.cos(ouverture)) * Math.sin(rad);
  //
  let x6=x5 - taille * Math.cos(rad - ouverture);
  let y6=y5 - taille * Math.sin(rad - ouverture);
  
  let x7=x5 - taille * Math.cos(rad + ouverture);
  let y7=y5 - taille * Math.sin(rad + ouverture);
  let x8=x5 + (20) * Math.cos(rad);
  let y8=y5 + (20) * Math.sin(rad);
  
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x3,y3);
  ctx.lineTo(x7,y7);
  ctx.lineTo(x5,y5);
  ctx.lineTo(x6,y6);
  ctx.lineTo(x4,y4);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x1,y1);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(nom, x8, y8);
  return {x:x8,y:y8};
}

// =====================
// EXERCICE
// =====================

let theme="33";
let nomExo="exo5";

let exo={

titre:"Transformateur triphasé – Bilan de puissance",

enonce:`Un transformateur triphasé 20kV / 400V alimente une installation industrielle.<br>
La puissance apparente du transformateur est de \\(S_N=${S} kVA\\).<br>
Les pertes à vide sont de \\(P_0=${P0} W\\) et les pertes en charges sont de \\(P_k=${Pk} W\\).<br>
La tension de court circuit est de \\(U_{cc}(\\%)=${Ucc}\\%\\).<br>
Le facteur de puissance de la charge est de \\(cos \\varphi = ${cosphi}\\).
 
Le schéma de puissance est donné ci-dessous.`,

courbe1:{},

questions:[

// =====================
{
texte:"Calculer la puissance fournie au secondaire",
reponse:Pu,
unite:"kW",
feedback:`\\(Pu=S_N cos \\varphi=${arrondi(Pu)} kW\\)`
},

// =====================
{
texte:"Déterminer les pertes fer au régime nominal",
reponse:P0,
unite:"W",
feedback:`Les pertes fer sont égales aux pertes à vide : \\(P_F=P_0=${arrondi(P0)} W\\)`
},

// =====================
{
texte:"Déterminer les pertes joules au régime nominal",
reponse:Pk,
unite:"W",
feedback:`Les pertes joules sont égales aux pertes en charge : \\(P_j=P_k=${arrondi(Pk)} W\\). <br>
C'est également la puissance mesurée lors d'un essai en court-circuit.`
},

// =====================
{
texte:"Calculer les pertes totales au régime nominal",
reponse:(P0+Pk),
unite:"W",
feedback:`On fait la somme des pertes ! \\(P_{pertes} = P_0 + Pk=${(arrondi(P0+Pk))} W\\)`
},

// =====================
{
texte:"Calculer la puissance absorbée au régime nominal",
reponse:Pa,
unite:"kW",
feedback:`Attention les pertes sont donnés en W! \\(P_a=P_u+P_{pertes}=${Pa} kW\\)`
},
// =====================
{
texte:"Calculer le rendement du transformateur",
reponse:eta,
unite:"%",
feedback:`\\(\\eta=\\frac{P_u}{P_a}=${eta} \\%\\)`
},

// =====================
{
type:"texte",
texte:"Les pertes Joule dépendent-elles de la charge ?",
reponse:["oui","proportionnelles à I²","proportionnelle à I²"],
feedback:`Oui car les pertes Joule sont proportionnelles à I²`
},

// =====================
{
type:"texte",
texte:"Les pertes fer dépendent-elles de la charge ?",
reponse:["non","tension constante"],
feedback:`Non, les pertes fer sont constantes si la tension au primaire est constante.`
},

// =====================
{
type:"texte",
texte:"Que devient l’énergie perdue ?",
reponse:["chaleur","dissipation thermique"],
feedback:`Elle se transforme en chaleur, il y a de la dissipation thermique.`
},

// =====================
{
texte:`On suppose pour la suite avoir une puissance au secondaire de \\(P_u=${Pu}kW\\) avec un facteur de puissance de \\(cos \\varphi=${cosphi2}\\). <br>
Calculer le courant fournit par le transformateur.`,
reponse:I2,
unite:"A",
feedback:`\\(I_2=\\frac{P_u}{\\sqrt{3}U \\cos \\varphi}=${arrondi(I2)} A\\)`
},

// =====================
{
texte:`Déterminer alors les pertes.`,
reponse:Ppertes,
unite:"W",
feedback:`On doit calculer \\(I_{2n}=\\frac{S_n}{\\sqrt{3}U}=${arrondi(I2n)} A\\).<br>
Puis on calcule les pertes \\(P_p=P_0+P_k \\frac{I^2_2}{I_{2n}^2}=${arrondi(Ppertes)}W\\).`
},


// =====================
{
texte:`En déduire la nouvelle valeur de la puissance absorbée.`,
reponse:(Pu+Ppertes/1000),
unite:"kW",
feedback:`Attention les pertes sont donnés en W! \\(P_a=P_u+P_p=${arrondi(Pu+Ppertes/1000)}kW\\)`
},


]

};

// =====================
// LANCEMENT
// =====================

let nbquestion = exo.questions.length;

window.onload=function(){

    genererExercice(exo);

    tracerBilanPuissanceStylise("graph", 0);
};