const style = document.createElement("style");

style.textContent = `
:root {
  --blue: #1f3c88; --blue-light: #f0f4ff; --green: #28a745; --green-dark: #1e7e34;
  --orange: #e07b00; --red: #c0392b; --gray: #888; --gray-light: #f5f5f5;
  --border: #dde3f0; --radius: 10px;
}
* { box-sizing: border-box; font-family: "Segoe UI", Roboto, Arial, sans-serif; margin: 0; padding: 0; }
body { background: linear-gradient(135deg, #f4f6f9, #e9eef5); min-height: 100vh; padding: 20px; }
.container { max-width: 1100px; margin: auto; background: white; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden; }
.blocs-signaux{display:flex;gap:20px;align-items:flex-start;}
.blocs-signaux .bloc{  flex:1;}
.page-header { background: var(--blue); color: white; padding: 22px 30px; }
.page-header h1 { font-size: 1.4rem; font-weight: 600; }
.page-header p { font-size: 0.88rem; opacity: 0.82; margin-top: 3px; }
.tabs { display: flex; border-bottom: 2px solid var(--border); background: var(--gray-light); flex-wrap: wrap; }
.tab-btn { padding: 12px 18px; border: none; background: none; cursor: pointer; font-size: 0.88rem; color: var(--gray); border-bottom: 3px solid transparent; margin-bottom: -2px; transition: 0.2s; white-space: nowrap; }
.tab-btn.active { color: var(--blue); border-bottom-color: var(--blue); background: white; font-weight: 600; }
.tab-btn:hover:not(.active) { color: var(--blue); background: #eef2ff; }
.tab-content { padding: 24px 30px; }
.tab-content.active { display: block; }
.section-title { font-size: 1rem; font-weight: 600; color: var(--blue); border-left: 4px solid var(--blue); padding-left: 10px; margin-bottom: 14px; }
.card { background: var(--blue-light); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 20px; margin-bottom: 18px; }
.card-white { background: white; border: 1px solid var(--border); border-radius: var(--radius); padding: 2px 3px; margin-bottom: 2px; }
.btn { border: none; padding: 9px 18px; border-radius: 7px; cursor: pointer; font-size: 0.88rem; font-weight: 600; transition: 0.2s; }
.btn-green { background: var(--green); color: white; } .btn-green:hover { background: var(--green-dark); }
.btn-blue { background: var(--blue); color: white; } .btn-blue:hover { background: #162d6a; }
.btn-orange { background: var(--orange); color: white; } .btn-orange:hover { background: #c06a00; }
.btn-red { background: var(--red); color: white; } .btn-red:hover { background: #922b21; }
.btn-gray { background: #ccc; color: #444; } .btn-gray:hover { background: #bbb; }
.btn-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 14px; }
canvas { display: block; border-radius: 4px; }
.score-bar { background: var(--blue-light); border-radius: 8px; padding: 12px 18px; display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.question-block { background: white; border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; margin-bottom: 12px; }
.question-block p { font-size: 0.92rem; margin-bottom: 10px; line-height: 1.6; }
.q-options { display: flex; flex-direction: column; gap: 6px; }
.q-opt { padding: 8px 14px; border: 1px solid var(--border); border-radius: 7px; cursor: pointer; font-size: 0.88rem; background: white; text-align: left; transition: 0.15s; }
.q-opt:hover { background: var(--blue-light); border-color: var(--blue); }
.q-opt.correct { background: #e8f8e8; border-color: var(--green); color: var(--green-dark); font-weight: 600; }
.q-opt.wrong { background: #fde8e8; border-color: var(--red); color: var(--red); }
.q-feedback { margin-top: 8px; font-size: 0.84rem; padding: 8px 12px; border-radius: 6px; display: none; }
.q-feedback.show { display: block; }
.q-feedback.ok { background: #e8f8e8; color: var(--green-dark); }
.q-feedback.ko { background: #fde8e8; color: var(--red); }
.oscillo-wrapper { display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap; }
.oscillo-screen { position: relative; }
.oscillo-controls { flex: 1; min-width: 220px; }
.control-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 0.82rem; }
.control-row label { min-width: 100px; color: #444; }
.control-row input[type=range] { flex: 1; accent-color: var(--blue); }
.control-val { min-width: 70px; font-size: 0.82rem; font-weight: 600; color: var(--blue); text-align: right; }
.measures-box { background: #0a0a0a; color: #0f0; font-family: monospace; font-size: 0.8rem; border-radius: 6px; padding: 10px 12px; margin-top: 10px; line-height: 1.8; }
.measures-box span { color: #0af; }
.ch1-color { color: #ff0; }
.ch2-color { color: #0cf; }
.enonce-tp { background: #f0f4ff; border-left: 5px solid var(--blue); border-radius: 8px; padding: 14px 18px; margin-bottom: 16px; font-size: 0.9rem; line-height: 1.7; }
.manip-step { background: white; border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; }
.manip-step h4 { color: var(--blue); font-size: 0.95rem; margin-bottom: 8px; }
.signal-selector { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.sig-btn { padding: 7px 14px; border: 2px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 0.83rem; background: white; transition: 0.2s; }
.sig-btn.active { border-color: var(--blue); background: var(--blue-light); color: var(--blue); font-weight: 600; }
.indicators-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
.ind-card { background: white; border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; text-align: center; min-width: 90px; }
.ind-card .ind-val { font-size: 1.15rem; font-weight: 700; color: var(--blue); }
.ind-card .ind-label { font-size: 0.73rem; color: var(--gray); }
#send { background: #28a745; color: white; border: none; padding: 7px 20px; border-radius: 6px; cursor: pointer; transition: 0.2s; }
</style>`;

document.head.appendChild(style);

let oscillo=`
<div class="container">
<!-- ════ OSCILLOSCOPE ════ -->
<div id="tab-oscillo" class="tab-content">
  <div class="oscillo-wrapper">
    <div class="oscillo-screen">
      <canvas id="scope" width="600" height="400" style="background:black;border:3px solid #222;border-radius:4px;"></canvas>
      <div class="measures-box">
        <div><span>CH1</span> (jaune) — V/div : <span id="m-v1"></span> </div>
        <div><span>CH2</span> (cyan)  — V/div : <span id="m-v2"></span> </div>
        <div><span>Curseur Δt</span> : <span id="m-dt">—</span> | <span>Curseur ΔV</span> : <span id="m-dv">—</span></div>
      </div>
	<!-- -->
 
	  
    </div>

    <div class="oscillo-controls">
      <div class=c>
        <p style="font-weight:600;font-size:0.85rem;color:var(--blue);margin-bottom:10px;">⏱️ Base de temps</p>
        <div class="control-row">
          <label>Time/div</label>
          <input type="range" id="sl-time" min="0" max="14" value="5" step="1" oninput="updateOscillo()">
          <span class="control-val" id="v-time">2 ms</span>
        </div>
      </div>

      <div class="card-white">
        <p style="font-weight:600;font-size:0.85rem;color:#ff0;margin-bottom:10px;">CH1 (jaune)</p>
        <div class="control-row">
          <label>V/div</label>
          <input type="range" id="sl-v1" min="0" max="12" value="5" step="1" oninput="updateOscillo()">
          <span class="control-val" id="v-v1">1 V</span>
        </div>
        <div class="control-row">
          <label>Position Y</label>
          <input type="range" id="sl-y1" min="-100" max="100" value="0" step="5" oninput="updateOscillo()">
          <span class="control-val" id="v-y1">0 px</span>
        </div>
        <div class="control-row">
          <label>Couplage</label>
          <select id="sel-coup1" onchange="updateOscillo()" style="border:1px solid #ccc;border-radius:4px;padding:3px 6px;font-size:0.82rem;">
            <option value="dc">DC</option>
            <option value="ac">AC</option>
          </select>
        </div>
      </div>

      <div class="card-white">
        <p style="font-weight:600;font-size:0.85rem;color:#0cf;margin-bottom:1px;">CH2 (cyan)</p>
        <div class="control-row">
          <label>V/div</label>
          <input type="range" id="sl-v2" min="0" max="12" value="5" step="1" oninput="updateOscillo()">
          <span class="control-val" id="v-v2">1 V</span>
        </div>
        <div class="control-row">
          <label>Position Y</label>
          <input type="range" id="sl-y2" min="-100" max="100" value="0" step="5" oninput="updateOscillo()">
          <span class="control-val" id="v-y2">0 px</span>
        </div>
        <div class="control-row">
          <label>CH2 visible</label>
          <input type="checkbox" id="ch2-vis" checked onchange="updateOscillo()" style="width:18px;height:18px;">
        </div>
      </div>

      <div class="card-white">
        <p style="font-weight:600;font-size:0.85rem;color:var(--blue);margin-bottom:1px;">🎯 Trigger</p>
        <div class="control-row">
          <label>Niveau (V)</label>
          <input type="range" id="sl-trig" min="-100" max="100" value="0" step="5" oninput="updateOscillo()">
          <span class="control-val" id="v-trig">0.0 V</span>
        </div>
        <div class="control-row">
          <label>Pente</label>
          <select id="sel-slope" onchange="updateOscillo()" style="border:1px solid #ccc;border-radius:4px;padding:3px 6px;font-size:0.82rem;">
            <option value="1">↑ Montante</option>
            <option value="-1">↓ Descendante</option>
          </select>
        </div>
      </div>

      <div class="card-white">
        <p style="font-weight:600;font-size:0.85rem;color:var(--blue);margin-bottom:10px;">📐 Curseurs</p>
        <div class="control-row">
          <label>Curseur t1</label>
          <input type="range" id="sl-ta" min="0" max="1000" value="200" step="1" oninput="updateOscillo()">
        </div>
        <div class="control-row">
          <label>Curseur t2</label>
          <input type="range" id="sl-tb" min="0" max="1000" value="700" step="1" oninput="updateOscillo()">
        </div>
        <div class="control-row">
          <label>Curseur V1</label>
          <input type="range" id="sl-va" min="-200" max="200" value="100" step="1" oninput="updateOscillo()">
        </div>
        <div class="control-row">
          <label>Curseur V2</label>
          <input type="range" id="sl-vb" min="-200" max="200" value="-100" step="1" oninput="updateOscillo()">
        </div>
        <div class="control-row">
          <label>Afficher curseurs</label>
          <input type="checkbox" id="show-cursors" checked onchange="updateOscillo()" style="width:18px;height:18px;">
        </div>
      </div>
	  
	  <div class="card-white">
        <p style="font-weight:600;font-size:0.85rem;color:var(--blue);margin-bottom:10px;">🔢 Math (même échelle que CH2)</p>
        <div class="control-row">
          <label>Afficher Math</label>
          <input type="checkbox" id="show-Math"  onchange="updateOscillo()" style="width:18px;height:18px;">
        </div>
		<div class="control-row">
          <label>Fonction</label>
          <select id="sel-Math" onchange="updateOscillo()" style="border:1px solid #ccc;border-radius:4px;padding:3px 6px;font-size:0.82rem;">
            <option value="+">CH1+CH2</option>
            <option value="-">CH1-CH2</option>
			<option value="*">CH1*CH2</option>
          </select>
        </div>
      </div>

    </div>
  </div>


</div>
</div>`;




const ScaleT = [0.00001,0.00002,0.00005,0.0001,0.0002,0.0005,0.001,0.002,0.005,0.01,0.02,0.05,0.1,0.2,0.5];
const ScaleV = [0.001,0.002,0.005,0.01,0.02,0.05,0.1,0.2,0.5,1,2,5,10,20,50];
let canvas;
let ctx;
const Wosc=600, Hosc=400, divX=10, divY=8;



let iTimeScale=5, iScale1=9, iScale2=9;
let trigLevel=0, trigSlope=1;
let posY1=0, posY2=0;
let coupling1='dc', coupling2='dc';
let ch2Visible=true;
let testVisible=false;
let showCursors=true;
let cursorTA=0.2, cursorTB=0.7, cursorVA=100, cursorVB=-100;
let runStop=true;

let ch1Type='sine', ch2Type='sine';
let ch1Freq=50, ch2Freq=50;
let ch1Amp=5, ch2Amp=5;
let ch1Phase=0, ch2Phase=0;
let ch1Offset=0, ch2Offset=0;
let typeMath="+";
let mathVisible=false;

function meilleurT(T){
	let i=ScaleT.length-1;
	while((T<10*ScaleT[i-1])&&(i>0)){
		i=i-1;
	}
	return ScaleT[i];
}


function meilleurV(Vamp){
	let i=ScaleT.length-1;
	while((Vamp<4*ScaleV[i-1])&&(i>0)){
		i=i-1;
	}
	return ScaleV[i];
}

function updatePhi(val){

ch2Phase = Math.PI/180*parseFloat(val);
ch1Phase=0;
document.getElementById("PhiVal").innerText =
parseFloat(val)+" °";

}

function updateAmpCH2(val){

ch2Amp = parseFloat(val);
document.getElementById("AmpCH2Val").innerText =
parseFloat(val)+" V";

}

function updateFCH1(val){

ch1Freq = parseFloat(val);
ch2Freq = parseFloat(val);
document.getElementById("FCH1Val").innerText =
parseFloat(val)+" Hz";
}

function updateAmpCH1(val){

ch1Amp = parseFloat(val);
document.getElementById("AmpCH1Val").innerText =
parseFloat(val)+" V";

}

function updateOFFCH2(val){

ch2Offset = parseFloat(val);
document.getElementById("OFFCH2Val").innerText =
parseFloat(val)+" V";

}

function updateOFFCH1(val){

ch1Offset = parseFloat(val);
document.getElementById("OFFCH1Val").innerText =
parseFloat(val)+" V";

}

function f1(t){
  let val;
  if(ch1Type==='sine') val=ch1Amp*Math.sin(2*Math.PI*ch1Freq*t+ch1Phase)+ch1Offset;
  else if(ch1Type==='square') val=(Math.sin(2*Math.PI*ch1Freq*t+ch1Phase)>=0?1:-1)*ch1Amp+ch1Offset;
  else if(ch1Type==='triangle'){
    let p=ch1Freq*t+ch1Phase/(2*Math.PI);
    val=ch1Amp*(2*Math.abs(2*(p-Math.floor(p+0.5)))-1)+ch1Offset;
  }
  else if(ch1Type==='dc') val=ch1Offset;
  else if(ch1Type==='composite') val=ch1Amp*Math.sin(2*Math.PI*ch1Freq*t)+ch1Amp*0.33*Math.sin(2*Math.PI*3*ch1Freq*t)+ch1Offset;
  return val;
}

function f2(t){
  let val;
  if(ch2Type==='sine') val=ch2Amp*Math.sin(2*Math.PI*ch2Freq*t+ch2Phase)+ch2Offset;
  else if(ch2Type==='square') val=(Math.sin(2*Math.PI*ch2Freq*t+ch2Phase)>=0?1:-1)*ch2Amp+ch2Offset;
  else if(ch2Type==='triangle'){
    let p=ch2Freq*t+ch2Phase/(2*Math.PI);
    val=ch2Amp*(2*Math.abs(2*(p-Math.floor(p+0.5)))-1)+ch2Offset;
  }
  else val=ch2Amp*Math.sin(2*Math.PI*ch2Freq*t+ch2Phase)+ch2Offset;
  return val;
}

function fmath(t){
  let val,val1,val2;
  
  if(ch1Type==='sine') val1=ch1Amp*Math.sin(2*Math.PI*ch1Freq*t+ch1Phase)+ch1Offset;
  else if(ch1Type==='square') val1=(Math.sin(2*Math.PI*ch1Freq*t+ch1Phase)>=0?1:-1)*ch1Amp+ch1Offset;
  else if(ch1Type==='triangle'){
    let p=ch1Freq*t+ch1Phase/(2*Math.PI);
    val1=ch1Amp*(2*Math.abs(2*(p-Math.floor(p+0.5)))-1)+ch1Offset;
  }
  else if(ch1Type==='dc') val1=ch1Offset;
  else if(ch1Type==='composite') val1=ch1Amp*Math.sin(2*Math.PI*ch1Freq*t)+ch1Amp*0.33*Math.sin(2*Math.PI*3*ch1Freq*t)+ch1Offset;
  
  if(ch2Type==='sine') val2=ch2Amp*Math.sin(2*Math.PI*ch2Freq*t+ch2Phase)+ch2Offset;
  else if(ch2Type==='square') val2=(Math.sin(2*Math.PI*ch2Freq*t+ch2Phase)>=0?1:-1)*ch2Amp+ch2Offset;
  else if(ch2Type==='triangle'){
    let p=ch2Freq*t+ch2Phase/(2*Math.PI);
    val2=ch2Amp*(2*Math.abs(2*(p-Math.floor(p+0.5)))-1)+ch2Offset;
  }
  else val2=ch2Amp*Math.sin(2*Math.PI*ch2Freq*t+ch2Phase)+ch2Offset;
  
  if(typeMath=='+'){val=val1+val2;}
  else if(typeMath=='-'){val=val1-val2;}
  else {val=val1*val2;}
  
  return val;
}

function findTrigger(){
  let dt=ScaleT[iTimeScale]/200, t=0;
  for(let i=0;i<50000;i++){
    let v1=f1(t), v2=f1(t+dt);
    if(trigSlope>0){if(v1<trigLevel&&v2>=trigLevel) return t;}
    else{if(v1>trigLevel&&v2<=trigLevel) return t;}
    t+=dt;
  }
  return 0;
}

function computeVrms(fn, t0, T){
  if(T<=0) return 0;
  let n=500, s=0;
  for(let i=0;i<n;i++){s+=Math.pow(fn(t0+i/n*T),2);}
  return Math.sqrt(s/n);
}

function drawGrid(){
  let dx=Wosc/divX, dy=Hosc/divY;
  ctx.strokeStyle='#1a3a1a'; ctx.lineWidth=2;
  for(let i=0;i<=divX;i++){ctx.beginPath();ctx.moveTo(i*dx,0);ctx.lineTo(i*dx,Hosc);ctx.stroke();}
  for(let i=0;i<=divY;i++){ctx.beginPath();ctx.moveTo(0,i*dy);ctx.lineTo(Wosc,i*dy);ctx.stroke();}
  ctx.strokeStyle='#2a5a2a'; ctx.lineWidth=4;
  ctx.beginPath();ctx.moveTo(0,Hosc/2);ctx.lineTo(Wosc,Hosc/2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,Hosc);ctx.stroke();
}

function drawSignal(fn, scale, posY, color, coup){
  let t0=findTrigger();
  let timePerPx=ScaleT[iTimeScale]*divX/Wosc;
  ctx.strokeStyle=color; ctx.lineWidth=2;
  ctx.beginPath();
  for(let x=0;x<Wosc;x++){
    let t=t0+x*timePerPx;
    let v=fn(t);
    if(coup==='ac') v-=fn(t0+ScaleT[iTimeScale]*divX/2);
    let y=Hosc/2 - posY - v/scale*(Hosc/divY);
    y=Math.max(1,Math.min(Hosc-1,y));
    x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.stroke();
}

function drawTriggerLine(){
  let trigY=Hosc/2-trigLevel/ScaleV[iScale1]*(Hosc/divY);
  ctx.strokeStyle='white'; ctx.lineWidth=1.5; ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.moveTo(0,trigY);ctx.lineTo(Wosc-20,trigY);ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle='white';ctx.font='12px monospace';ctx.fillText('T',Wosc-18,trigY-3);
}

function drawCursors(){
  if(!showCursors) return;
  let t0=findTrigger();
  let totalTime=ScaleT[iTimeScale]*divX;
  let xA=cursorTA/1000*Wosc, xB=cursorTB/1000*Wosc;
  let yA=Hosc/2-posY1+cursorVA/100*(Hosc/2)*0.8;
  let yB=Hosc/2-posY1+cursorVB/100*(Hosc/2)*0.8;

  ctx.strokeStyle='#f80'; ctx.lineWidth=1; ctx.setLineDash([6,3]);
  ctx.beginPath();ctx.moveTo(xA,0);ctx.lineTo(xA,Hosc);ctx.stroke();
  ctx.beginPath();ctx.moveTo(xB,0);ctx.lineTo(xB,Hosc);ctx.stroke();
  ctx.strokeStyle='#f0f'; ctx.setLineDash([6,3]);
  ctx.beginPath();ctx.moveTo(0,yA);ctx.lineTo(Wosc,yA);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,yB);ctx.lineTo(Wosc,yB);ctx.stroke();
  ctx.setLineDash([]);
}

function drawPositionMarkers(){
  ctx.font='12px monospace';
  let y1=Hosc/2-posY1; let y2=Hosc/2-posY2;
  y1=Math.max(6,Math.min(Hosc-6,y1)); y2=Math.max(6,Math.min(Hosc-6,y2));
  ctx.fillStyle='#ff0'; ctx.fillText('1▶',2,y1+4);
  if(ch2Visible){ctx.fillStyle='#0cf'; ctx.fillText('2▶',2,y2+4);}
}

function drawMeasures(){
  let t0=findTrigger();
  let totalTime=ScaleT[iTimeScale]*divX;
  let dt=(cursorTB-cursorTA)/1000*totalTime;
  let scale1=ScaleV[iScale1], scale2=ScaleV[iScale2];
  let dvA=(Hosc/2-posY1-(Hosc/2-posY1+cursorVA/100*(Hosc/2)*0.8))/((Hosc/divY))*scale1;
  let dvB=(Hosc/2-posY1-(Hosc/2-posY1+cursorVB/100*(Hosc/2)*0.8))/((Hosc/divY))*scale1;
  let dv=Math.abs(dvA-dvB);

  let N=500; let s1=0,s2=0,mn1=1e9,mx1=-1e9,mn2=1e9,mx2=-1e9;
  for(let i=0;i<N;i++){
    let t=t0+i/N*totalTime;
    let v1=f1(t); let v2=f2(t);
    s1+=v1*v1; s2+=v2*v2;
    mn1=Math.min(mn1,v1);mx1=Math.max(mx1,v1);
    mn2=Math.min(mn2,v2);mx2=Math.max(mx2,v2);
  }
  let vrms1=Math.sqrt(s1/N), vrms2=Math.sqrt(s2/N);
  let vpp1=mx1-mn1, vpp2=mx2-mn2;

  let T_est=1/ch1Freq;
  let f_est=ch1Freq;
  let phase_deg=(ch2Phase-ch1Phase)*180/Math.PI;
  phase_deg=((phase_deg%360)+360)%360;
  if(phase_deg>180) phase_deg-=360;

  function fmtT(t){ if(t<0.001) return (t*1e6).toFixed(1)+'µs'; if(t<1) return (t*1000).toFixed(2)+'ms'; return t.toFixed(3)+'s'; }
  function fmtF(f){ if(f>=1000) return (f/1000).toFixed(2)+'kHz'; return f.toFixed(1)+'Hz'; }

  document.getElementById('m-v1').textContent=scale1+'V/div';
  document.getElementById('m-v2').textContent=scale2+'V/div';
  document.getElementById('m-dt').textContent=fmtT(Math.abs(dt));
  document.getElementById('m-dv').textContent=dv.toFixed(2)+'V';
}

function draw(){
  
  canvas = document.getElementById("scope");
  ctx = canvas.getContext("2d");
  
  ctx.clearRect(0,0,Wosc,Hosc);
  
  drawGrid();
  drawSignal(f1,ScaleV[iScale1],posY1,'#ff0',coupling1);
  
  if(ch2Visible) drawSignal(f2,ScaleV[iScale2],posY2,'#0cf',coupling2);
  if(mathVisible) drawSignal(fmath,ScaleV[iScale2],0,'#f00','dc');
  drawTriggerLine();
  drawCursors();
  drawPositionMarkers();
  drawMeasures();
  requestAnimationFrame(draw);
}

function fmtS(t){if(t<0.001)return (t*1e6).toFixed(0)+'µs/div';if(t<1)return (t*1000).toFixed(1)+'ms/div';return t.toFixed(2)+'s/div';}


function updateOscillo(){
  iTimeScale=parseInt(document.getElementById('sl-time').value);
  iScale1=parseInt(document.getElementById('sl-v1').value);
  iScale2=parseInt(document.getElementById('sl-v2').value);
  posY1=parseInt(document.getElementById('sl-y1').value);
  posY2=parseInt(document.getElementById('sl-y2').value);
  coupling1=document.getElementById('sel-coup1').value;
  trigLevel=parseInt(document.getElementById('sl-trig').value)/100*ScaleV[iScale1]*divY/2;
  trigSlope=parseInt(document.getElementById('sel-slope').value);
  ch2Visible=document.getElementById('ch2-vis').checked;
  showCursors=document.getElementById('show-cursors').checked;
  cursorTA=parseInt(document.getElementById('sl-ta').value);
  cursorTB=parseInt(document.getElementById('sl-tb').value);
  cursorVA=parseInt(document.getElementById('sl-va').value);
  cursorVB=parseInt(document.getElementById('sl-vb').value);
  typeMath=document.getElementById('sel-Math').value;
  mathVisible=document.getElementById('show-Math').checked;
   
  document.getElementById('v-time').textContent=fmtS(ScaleT[iTimeScale]);
  document.getElementById('v-v1').textContent=ScaleV[iScale1]+'V/div';
  document.getElementById('v-v2').textContent=ScaleV[iScale2]+'V/div';
  document.getElementById('v-y1').textContent=posY1+'px';
  document.getElementById('v-y2').textContent=posY2+'px';
  document.getElementById('v-trig').textContent=(trigLevel).toFixed(2)+'V';
  
}


/*
window.onload=function(){
  updateOscillo();
  draw();
};
*/