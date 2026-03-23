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

function tracerGrilleLog(){
	const canvas = document.getElementById("graph");
	const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;

    for(let i=-2; i<=2; i++){
        for(let j=1; j<10; j++){
            let x = j*Math.pow(10,i);
            if(x>=xmin && x<=xmax){
                let xp = scaleLogX(x);
                ctx.beginPath();
                ctx.moveTo(xp, 20);
                ctx.lineTo(xp, H-20);
                ctx.stroke();
            }
        }
    }
}

function perteCharge(Q, D){
    let S = Math.PI*D*D/4;
    let v = Q/S;
    let lambda = 0.02;
    return lambda * (v*v); // simplifié pédagogique
}

function tracerDN(D, couleur){
	const canvas = document.getElementById("graph");
	const ctx = canvas.getContext("2d");
    ctx.strokeStyle = couleur;
    ctx.beginPath();

    let first = true;

    for(let Q=0.001; Q<=0.1; Q*=1.05){

        let h = perteCharge(Q, D);

        let x = scaleLogX(Q);
        let y = scaleLogY(h);

        if(first){
            ctx.moveTo(x,y);
            first=false;
        } else {
            ctx.lineTo(x,y);
        }
    }

    ctx.stroke();
}

function initAbaque(canvasId){

    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext("2d");

    W = canvas.width;
    H = canvas.height;

    ox = 80;
    oy = H - 40;

    // bornes log
    xmin = 0.01;   // pertes de charge
    xmax = 100;

    ymin = 0.001;  // débit
    ymax = 0.1;
}

function log10(x){
    return Math.log(x)/Math.log(10);
}

function Xlog(x){
    return ox + (log10(x)-log10(xmin))/(log10(xmax)-log10(xmin))*(W-120);
}

function Ylog(y){
    return oy - (log10(y)-log10(ymin))/(log10(ymax)-log10(ymin))*(H-80);
}

function tracerGrilleLog(canvasId){

    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    // verticales (x)
    for(let i=-2;i<=2;i++){
        for(let j=1;j<10;j++){
            let x = j*Math.pow(10,i);
            if(x>=xmin && x<=xmax){
                let xp = Xlog(x);
                ctx.beginPath();
                ctx.moveTo(xp,20);
                ctx.lineTo(xp,H-40);
                ctx.stroke();
            }
        }
    }

    // horizontales (y)
    for(let i=-3;i<=-1;i++){
        for(let j=1;j<10;j++){
            let y = j*Math.pow(10,i);
            if(y>=ymin && y<=ymax){
                let yp = Ylog(y);
                ctx.beginPath();
                ctx.moveTo(ox,yp);
                ctx.lineTo(W-20,yp);
                ctx.stroke();
            }
        }
    }
}

function tracerAxesAbaque(canvasId){

    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // axes
    ctx.beginPath();
    ctx.moveTo(ox,20);
    ctx.lineTo(ox,H-40);
    ctx.lineTo(W-20,H-40);
    ctx.stroke();

    ctx.fillStyle="black";
    ctx.font="12px Arial";

    // graduation X (pertes)
    for(let i=-2;i<=2;i++){
        let val = Math.pow(10,i);
        if(val>=xmin && val<=xmax){
            let xp = Xlog(val);
            ctx.fillText(val.toFixed(2), xp-10, H-20);
        }
    }

    // graduation Y (débit)
    for(let i=-3;i<=-1;i++){
        let val = Math.pow(10,i);
        if(val>=ymin && val<=ymax){
            let yp = Ylog(val);
            ctx.fillText(val.toFixed(3), 10, yp+4);
        }
    }

    // titres
    ctx.fillText("Pertes de charge (mCE/m)", W/2-80, H-5);
    ctx.save();
    ctx.translate(20,H/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Débit Q (m³/s)",30,0);
    ctx.restore();
}

function tracerDroiteDiametre(D, couleur){

    let ctx = document.getElementById("graph").getContext("2d");

    ctx.strokeStyle = couleur;
    ctx.beginPath();

    let first=true;
	let xLabel, yLabel;
    let i = 0;

    for(let Q=ymin; Q<=ymax; Q*=1.05){

        let S = Math.PI*D*D/4;
        let v = Q/S;

        let lambda = 0.02;
        let hf = lambda*(v*v); // simplifié

        let x = Xlog(hf);
        let y = Ylog(Q);

        if(x>=80){
			if(first){ctx.moveTo(x,y); first=false;}
			else ctx.lineTo(x,y);
			if(i===20){
				xLabel = x;
				yLabel = y;
			}
			i++;
		}
    }

    ctx.stroke();

    // label
    ctx.fillStyle=couleur;
    ctx.fillText((D*1000).toFixed(0)+" mm", xLabel, yLabel);
}

function tracerDroiteVitesse(v, couleur){

    let ctx = document.getElementById("graph").getContext("2d");

    ctx.strokeStyle = couleur;
    ctx.beginPath();

    let first=true;
    let xLabel, yLabel;
    let i = 0;

    for(let Q=ymin; Q<=ymax; Q*=1.05){

        let S = Q / v;
        let D = Math.sqrt(4*S/Math.PI);

        let lambda = 0.02;
        let hf = lambda * (v*v)/(2*9.81) * (1/D);

        let x = Xlog(hf);
        let y = Ylog(Q);
		if(x>=80){
			if(first){
				ctx.moveTo(x,y);
				first=false;
			} else {
				ctx.lineTo(x,y);
			}

			// garder un point au milieu
			if(i===20){
				xLabel = x;
				yLabel = y;
			}
			i++;
		}
    }

    ctx.stroke();

    // label
    ctx.fillStyle = couleur;
    ctx.fillText(v+" m/s", xLabel, yLabel);
}

function tracerIntersection(D, v){

    let pt = intersectionDV(D, v);

    let x = Xlog(pt.hf);
    let y = Ylog(pt.Q);

    let ctx = document.getElementById("graph").getContext("2d");

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2*Math.PI);
    ctx.fill();

    ctx.fillText("P", x+5, y-5);

    return pt;
}

function intersectionDV(D, v){ //Attention D en mm!

    let S = Math.PI * D/1000 * D/1000 / 4;
    let Q = v * S;

    let lambda = 0.02;
    let hf = lambda * (v*v)/(2*9.81) * (1000/D);

    return {Q:Q, hf:hf};
}