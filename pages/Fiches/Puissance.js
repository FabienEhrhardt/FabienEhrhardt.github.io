/*
// =============================
// PARAMETRES MODIFIABLES
// =============================

let freq = 49.98
let date = "30/03/23"
let time = "09:13"

let P  = -680        // W
let Q  = -12500       // var
let D  = 1496       // var
let S  = 1648       // VA

let PF   = 0.412
let cosphi = 0.982
let tanphi = -0.190

// =============================
*/


// =============================
// format puissance
// =============================

function formatPower(val){

if(Math.abs(val)>=1000)
return (val/1000).toFixed(3)+"k"

return val.toFixed(0)

}

// =============================
// symbole reactif
// =============================

function drawSymbol(ecran){
const canvas = document.getElementById(ecran)
const ctx = canvas.getContext("2d")
ctx.strokeStyle="black";
ctx.lineWidth=2;

let x=115;
let y=160;

if(Q>0){
// bobine
ctx.beginPath();
ctx.moveTo(x-10,y);
for(let i=0;i<4;i++){
ctx.arc(x+i*7,y,5,Math.PI,0);
}
ctx.lineTo(x+3*7+10,y);
ctx.stroke();

}
else{

// condensateur

ctx.beginPath();
ctx.moveTo(x-10,y-10);
ctx.lineTo(x,y-10);
ctx.lineTo(x,y-20);
ctx.lineTo(x,y);
ctx.moveTo(x+10,y-20);
ctx.lineTo(x+10,y);
ctx.moveTo(x+10,y-10);
ctx.lineTo(x+20,y-10);
ctx.stroke();

}

}

// =============================
// dessin principal
// =============================

function draw(ecran){
const canvas = document.getElementById(ecran)
const ctx = canvas.getContext("2d")
ctx.clearRect(0,0,600,400);

ctx.fillStyle="black";

// titre

ctx.font="30px Arial";
ctx.fillText("W",20,40);

// barre haute

ctx.font="16px Arial";

ctx.fillText(freq.toFixed(2)+"Hz",240,30);
ctx.fillText(date+"  "+time,350,30);

// =============================
// colonne gauche
// =============================

ctx.font="18px Arial";

ctx.fillText("P (W)",40,110);
ctx.fillText("Q₁ (var)",40,160);
ctx.fillText("D (var)",40,210);
ctx.fillText("S (VA)",40,260);

ctx.font="24px Arial";

let signP = (P>=0?"+":"-");
ctx.fillText(signP+formatPower(Math.abs(P)),150,110);

let signQ = (Q>=0?"+":"-");
ctx.fillText(signQ+formatPower(Math.abs(Q)),150,160);

ctx.fillText(formatPower(D),150,210);
ctx.fillText(formatPower(S),150,260);

// =============================
// colonne droite
// =============================

ctx.font="18px Arial";

ctx.fillText("PF",350,110);
ctx.fillText("cosφ",350,160);
ctx.fillText("tanφ",350,210);

ctx.font="24px Arial";

let sign = (PF>=0?"+":"-");
ctx.fillText(sign+Math.abs(PF).toFixed(3),430,110);
sign = (cosphi>=0?"+":"-");
ctx.fillText(sign+Math.abs(cosphi).toFixed(3),430,160);
sign = (tanphi>=0?"+":"-");
ctx.fillText(sign+Math.abs(tanphi).toFixed(3),430,210);

// =============================
// symbole reactif
// =============================

drawSymbol(ecran);

}