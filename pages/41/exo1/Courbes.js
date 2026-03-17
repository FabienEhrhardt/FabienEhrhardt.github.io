function tracerEcran(ecran) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;
  const pas = xmax/1000;

  // Effacement
  ctx.clearRect(0, 0, W, H);

  // Origine du repère
  const ox = 50;
  const oy = H / 2;

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


function tracerCourbe(ecran, fonction, NomCourbe, ymax, couleur, numero ) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;
  const pas = xmax/1000;


  // Origine du repère
  const ox = 50;
  const oy = H / 2;

  // Échelles
  const scaleX = (W - 80) / xmax; // pixels par seconde
  const scaleY1 = (H-40)/2/ymax; // pixels par unité

  /*************** COURBE 1 ***************/
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  ctx.beginPath();

  let first = true;

  for (let t = 0; t <= xmax; t += pas) {
    let x = ox + t * scaleX;
    let y = oy - fonction(t) * scaleY1;
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
