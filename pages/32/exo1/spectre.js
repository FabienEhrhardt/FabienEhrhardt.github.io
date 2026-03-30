// ---------------- PARAMETRES ----------------
/*
// valeurs des harmoniques en %
let harmonics = [
100, 50, 35, 2, 25, 3, 18, 2, 10, 2,
9, 1, 6, 1, 5, 2, 8, 2, 4, 2,
6, 2, 4, 1, 2
];

// paramètres affichés
let I1 = 804;     // mA
let THD = 23.4;   // %
let Iad = 188;    // mA

// --------------------------------------------
*/


function SpectreHarmoniques(ecran){
const canvas = document.getElementById(ecran);
const ctx = canvas.getContext("2d");
ctx.clearRect(0,0,600,400);

// fond graphique
ctx.fillStyle = "white";
ctx.fillRect(40,120,520,220);

// axes
ctx.strokeStyle="black";
ctx.lineWidth=2;
ctx.beginPath();
ctx.moveTo(40,120);
ctx.lineTo(40,340);
ctx.lineTo(560,340);
ctx.lineTo(560,120);
ctx.lineTo(40,120);
ctx.stroke();

// graduations
ctx.font="12px Arial";
ctx.fillStyle="black";

ctx.fillText("0",20,340);
ctx.fillText("50",15,240);
ctx.fillText("100",10,130);
ctx.beginPath();
ctx.moveTo(35,240);
ctx.lineTo(45,240);
ctx.moveTo(35,140);
ctx.lineTo(45,140);
ctx.moveTo(65,100);
ctx.lineTo(70,105);
ctx.lineTo(65,110);
ctx.stroke();

ctx.lineWidth=1;
ctx.beginPath();
ctx.moveTo(67,100);
ctx.lineTo(67,140);
ctx.stroke();

// barres harmoniques
let barWidth = 14;
let spacing = 6;
let baseX = 40;
ctx.fillStyle="black";
ctx.fillText('DC', baseX,355);
let value = harmonics[0];
let height = value*2; // échelle
ctx.fillStyle="green";
ctx.fillRect(
    baseX,
    340-height,
    barWidth,
    height
);


for(let i=1;i<26;i++){

    value = harmonics[i];
    height = value*2; // échelle

    ctx.fillStyle="green";

    ctx.fillRect(
        baseX + i*(barWidth+spacing),
        340-height,
        barWidth,
        height
    );

    // numéro harmonique
    ctx.fillStyle="black";
    ctx.fillText(i, baseX + i*(barWidth+spacing)+2 ,355);
}

// affichage texte haut écran

ctx.font="20px Arial";

ctx.fillText("A-h01",20,40);

ctx.font="18px Arial";

ctx.fillText(P10(arrondi(I1)) + "A",300,40);
ctx.fillText("+000°",450,40);

ctx.fillText("THD " + P10(arrondi(THD)) + "%",450,70);
ctx.fillText("Ad " + P10(arrondi(Iad)) + "A",450,95);

}

function top3(H){
	let max1=0,max2=0,max3=0;
	let i1=0,i2=0,i3=0;

	for(let i=2;i<H.length;i++){// on ne veut pas du fondamental
		if(H[i]>max1){
			max3=max2;
			i3=i2;
			max2=max1;
			i2=i1;
			max1=H[i];
			i1=i; 
			}
	else if(H[i]>max2){
		max3=max2;
		i3=i2;
		max2=H[i];
		i2=i;
		}
	else if(H[i]>max3){
		max3=H[i];
		i3=i;
		}
	}
	return [i1,i2,i3];
}

function IeffCalc(H){
	let s=0;
	for(let v of H) s+=v*v;
	return I1/100*Math.sqrt(s);

}

function IadCalc(H){
	let s=0;
	for(let i=2;i<H.length;i++){s+=H[i]*H[i];}
	return I1/100*Math.sqrt(s);
}

function THDCalc(H){
return IadCalc(H)/I1*100;
}