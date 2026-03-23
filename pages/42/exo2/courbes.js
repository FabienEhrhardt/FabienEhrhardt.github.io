function tracerEcran(ecran) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;
  const pas = xmax/1000;

  // Effacement
  ctx.clearRect(0, 0, W, H);

  // Échelles
  const scaleX = (W - 80) / xmax; // pixels par seconde
  const scaleY1 = (H-40)/2/ymax1; // pixels par unité 1
  const scaleY2 = (H-40)/2/ymax2; //pixels par unité 2

  /*************** GRILLE ***************/
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  // Verticales
  for (let x = ox; x < W; x += scaleX*xmax / 4) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, H - 20);
    ctx.stroke();
  }

  // Horizontales
  for (let y = 20; y < H; y += scaleY1*ymax1/5) {
    ctx.beginPath();
    ctx.moveTo(ox, y);
    ctx.lineTo(W - 20, y);
    ctx.stroke();
  }

  /*************** AXES ***************/
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  // Axe x
  ctx.beginPath();
  ctx.moveTo(ox, oy);
  ctx.lineTo(W - 20, oy);
  ctx.stroke();

  // Axe y
  ctx.beginPath();
  ctx.moveTo(ox, 20);
  ctx.lineTo(ox, H - 20);
  ctx.stroke();


  /*************** TITRES DES AXES ***************/
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";

  // Axe x
  ctx.fillText(TitreAxeX, W / 2 - 40, H - 5);
  ctx.fillStyle = "black";
  ctx.fillText(`${xmax}`, W-40, oy-5);
  
  ctx.save();
  ctx.translate(15, H / 2 + 40);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(TitreAxeY, 0, 0);
  ctx.restore();
    
}


function tracerCourbe(ecran, fonction, NomCourbe, couleur, numero ) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");
  const pas = xmax/1000;
  let scaleY,ymax;
   if(numero==1) {
	   scaleY=scaleY1;
	   ymax=ymax1;}
   else {scaleY=scaleY2;
		ymax=ymax2;}


  /*************** COURBE 1 ***************/
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  ctx.beginPath();

  let first = true;

  for (let t = 0; t <= xmax; t += pas) {
    let x = ox + t * scaleX;
    let y = oy - fonction(t) * scaleY;
	if(y<=20){y=20;}
	if(y>=H-20){y=H-20;}

    if (first) {
      ctx.moveTo(x, y);
      first = false;
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  
  
  /*************** TITRES DES AXES ***************/
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  let pos;
  if(numero==1) {pos=ox;}
  else {pos=W-150;}

  // courbe 1
  ctx.fillStyle = couleur;
  ctx.fillText(NomCourbe, pos, H - 5);
  ctx.fillText(`${ymax}`, pos, 15);
    
}

let W,H,ox,oy,scaleX,scaleY1,scaleY2;
let NomCourbe1, NomCourbe2, TitreAxeX, TitreAxeY;

function initialisationGraph(canvasId,type){
	let canvas = document.getElementById(canvasId);
	let ctx = canvas.getContext("2d");

	W = canvas.width;
	H = canvas.height;
	ox = 50;
	scaleX = (W - 80) / xmax;
	if(type==1){
		oy = H / 2;
		scaleY1 = (H-40)/2/ymax1; // pixels par unité 1
		scaleY2 = (H-40)/2/ymax2;}
	else{
		oy = H-20;
		scaleY1 = (H-40)/ymax1; // pixels par unité 1
		scaleY2 = (H-40)/ymax2; //pixels par unité 2
	}

	NomCourbe1=exo.courbe1.Nom;
	if(exo.courbe2) NomCourbe2=exo.courbe1.Nom;
	TitreAxeX=exo.courbe1.axeX;
	TitreAxeY=exo.courbe1.axeY;
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

function fmax(f, xmax){
    let max = 0;
    for(let x=0; x<=xmax; x+=xmax/100){
        let y = f(x);
        if(y > max) max = y;
    }
    return max;
}





