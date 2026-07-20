function tracerEcran(ecran) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;
  const oy=H/2;
  const ox=W/2;

  // Effacement
  ctx.clearRect(0, 0, W, H);

  // Échelles
  const scaleX = 40; // pixels par abscisse
  const scaleY1 = 40; // pixels par ordonnée
  const scaleY2 = 40; //pixels par unité 2

  /*************** GRILLE ***************/
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  // Verticales
  for (let x = 20; x <= W-20; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x, H - 40);
    ctx.stroke();
  }

  // Horizontales
  for (let y = 40; y <= H-40; y += 40) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(W - 20, y);
    ctx.stroke();
  }

  /*************** AXES ***************/
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  // Axe x
  ctx.beginPath();
  ctx.moveTo(20, oy);
  ctx.lineTo(W - 20, oy);
  ctx.stroke();

  // Axe y
  ctx.beginPath();
  ctx.moveTo(ox, 40);
  ctx.lineTo(ox, H - 40);
  ctx.stroke();


  /*************** TITRES DES AXES ***************/
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";

  // Axe x
  ctx.fillText(1, ox + 40, oy - 5);
  ctx.fillText(1, ox-10, oy-40);
    
}


function tracerCourbe(ecran, fonction,  couleur ) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");
  const pas = 7/100;
  const scaleX = 40; // pixels par abscisse
  const scaleY = 40; // pixels par ordonnée
  
  /*************** COURBE 1 ***************/
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  ctx.beginPath();

  let first = true;

  for (let t = -7; t <= 7; t += pas) {
    let x = ox + t * scaleX;
    let y = oy - fonction(t) * scaleY;
	if((y>=20)&&(y<=H-20)){

    if (first) {
      ctx.moveTo(x, y);
      first = false;
    } else {
      ctx.lineTo(x, y);
    }
	}
  
  }

  ctx.stroke();
    
}

let W,H,ox,oy,scaleX,scaleY1,scaleY2;
let NomCourbe1, NomCourbe2, TitreAxeX, TitreAxeY;

function initialisationGraph(canvasId){
	let canvas = document.getElementById(canvasId);
	let ctx = canvas.getContext("2d");

	W = canvas.width;
	H = canvas.height;
	ox = W/2;
	oy=H/2;
	scaleX = 40;
	scaleY1 = 40; // pixels par unité 1
	scaleY2 = 40;
}




function tracerPoint(canvasId, x, y,nom,numero, couleur){

   let canvas = document.getElementById(canvasId);
   let ctx = canvas.getContext("2d");
   let scaleY;
   if(numero==1) {scaleY=scaleY1;}
   else {scaleY=scaleY2;}
  
   // AXES
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  
  let xp = ox + x * scaleX;
  let yp = oy - y * scaleY;
  if(y<=20){y=20;}
  if(y>=H-20){y=H-20;}
  if(xp<=ox){xp=ox;}
  if(xp>=W-20){xp=W-20;}

  // croix x
  ctx.beginPath();
  ctx.moveTo(xp-5, yp+5);
  ctx.lineTo(xp+5, yp-5);
  ctx.stroke();
  // croix x
  ctx.beginPath();
  ctx.moveTo(xp+5, yp+5);
  ctx.lineTo(xp-5, yp-5);
  ctx.stroke();
  
  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.fillText(nom, xp, yp-10);
}

function tracerVerticale(canvasId, x, numero, couleur){

   let canvas = document.getElementById(canvasId);
   let ctx = canvas.getContext("2d");
     
   // AXES
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  
  let xp = ox + x * scaleX;
  

  // ligne x
  ctx.beginPath();
  ctx.moveTo(xp, 20);
  ctx.lineTo(xp, H-20);
  ctx.stroke();
  
  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.fillText(`${x}`, xp, oy+15);
}


function tracerHorizontale(canvasId, y, numero, couleur){

   let canvas = document.getElementById(canvasId);
   let ctx = canvas.getContext("2d");
   let scaleY;
   if(numero==1) {scaleY=scaleY1;}
   else {scaleY=scaleY2;}
  
   // AXES
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  
  let yp = oy - y * scaleY;
  if(yp<=20){y=20;}
  if(yp>=H-20){yp=H-20;}
 

  // ligne y
  ctx.beginPath();
  ctx.moveTo(50, yp);
  ctx.lineTo(W-20, yp);
  ctx.stroke();
  
  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.fillText(`${y}`, ox-20, yp);
}





