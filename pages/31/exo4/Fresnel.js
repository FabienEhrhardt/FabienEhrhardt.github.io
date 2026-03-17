function initialisationFresnel() {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // Effacement
  ctx.clearRect(0, 0, W, H);

  // Origine du repère
  const ox = W/2;
  const oy = H/2;

  // Échelles
  const scaleI = 50/echellei; // pixels par unité 1
  const scaleV = 50/echellev; //pixels par unité 2

  /*************** Echelle ***************/
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  // Echelle V
  ctx.beginPath();
  ctx.moveTo(W-20,H-20);
  ctx.lineTo(W-70,H-20);
  ctx.stroke();

  // Echelle I
  ctx.beginPath();
  ctx.moveTo(W-100,H-20);
  ctx.lineTo(W-150,H-20);
  ctx.stroke();
  
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  ctx.fillText(`${echellei} A`, W-140, H - 30);
  ctx.fillText(`${echellev} V`, W-60, H - 30);
}





function tracerVecteur(x0,y0,longueur,angle,nom,couleur,type) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  // Origine du repère
  const ox = 20;
  const oy = H/2;
  let rad = angle * Math.PI / 180;
  let scale;
  
  // Échelles
  if(type=='v'){scale=50/echellev;} //pixels par unité 2
  else{scale=50/echellei;} // pixels par unité 1
  
  //Position finale
  let x1=ox+x0*scale;
  let y1=oy-y0*scale;
  
  let x2 = x1 + longueur * scale*Math.cos(rad);
  let y2 = y1- longueur * scale*Math.sin(rad);
  
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
  
  // Nom vecteur orienté
  ctx.save();
  let theta = Math.atan2(y2 - y1, x2 - x1);
  if (theta > Math.PI/2 || theta < -Math.PI/2) {
    theta += Math.PI;
  }// Permet de retourner le texte si besoin

// Position au milieu du vecteur
let xm = (x1 + x2) / 2;
let ym = (y1 + y2) / 2;

// Décalage perpendiculaire pour écrire "au-dessus"
let decalage = 7;
xm += decalage * Math.sin(theta);
ym += -decalage * Math.cos(theta);

  ctx.translate(xm, ym);
  ctx.rotate(theta);

  ctx.fillStyle = couleur;
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(nom, 0, 0);
 
  ctx.restore();
  let dx=longueur*Math.cos(rad);
  let dy=longueur*Math.sin(rad);
  return {x:x0+dx,y:y0+dy};
}