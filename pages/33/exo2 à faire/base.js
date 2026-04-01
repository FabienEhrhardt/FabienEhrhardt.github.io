//Permet de faire un arrondi.
function arrondi(num){
	if(num===0) return 0;
	let signe = Math.sign(num);
	num = Math.abs(num); // permet de ne pas être embêter par le signe

	let facteur = Math.pow(10, 2 - Math.floor(Math.log10(num)));
	return signe * Math.round(num * facteur) / facteur;
}

function superarrondi(num){
		return Math.ceil((num)*Math.pow(10,-Math.floor(Math.log10((num)))))/Math.pow(10,-Math.floor(Math.log10((num))));
}

function P10(num){
		let num10;
		if((num*1e9<1000)&&(num*1e9>1)) {
			num10=num*1e9;
			return num10+" n";}
		if((num*1e6<1000)&&(num*1e6>1)) {
			num10=num10*1e6;
		return num*1e6+" µ";}
		if((num*1e3<1000)&&(num*1e3>1)) {
			num10=num*1e3;
			return num10+" m";}
		if((num<1000)&&(num>1)) return num+" ";
		if((num*1e-3<1000)&&(num*1e-3>1)) {
			num10=num*1e-3;
			return num10*1e-3+" k";}
		if((num*1e-6<1000)&&(num*1e-6>1)) {
			num10=num*1e-6;
			return num10+" M";}
		if((num*1e-9<1000)&&(num*1e-9>1)) {
			num10=num*1e-9;
			return num10+" G";}
		if((num*1e-12<1000)&&(num*1e-12>1)) {
			num10=num*1e12;
			return num10+" T";}
}

function envoyerScore() {

  let scorePourcent = 0;

  if (nbquestion > 0) {
    scorePourcent = arrondi((score / nbquestion) * 100);
  }

  try {
        // Fonction universelle pour trouver l'API SCORM
        function findAPI(win) {
            while (win) {
                if (win.API_1484_11) return { api: win.API_1484_11, version: '2004' };
                if (win.API) return { api: win.API, version: '1.2' };
                if (win.parent === win) break;
                win = win.parent;
            }
            return null;
        }

        let apiInfo = findAPI(window);

        if (apiInfo) {
            let api = apiInfo.api;

            if (apiInfo.version === '2004') {
                api.Initialize("");
                api.SetValue("cmi.score.raw", scorePourcent);
                api.SetValue("cmi.score.min", "0");
                api.SetValue("cmi.score.max", "100");
                api.SetValue("cmi.completion_status", "completed");
                api.Commit("");
                api.Terminate("");
            } else { // SCORM 1.2
                api.LMSInitialize("");
                api.LMSSetValue("cmi.core.score.raw", scorePourcent);
                api.LMSSetValue("cmi.core.score.min", "0");
                api.LMSSetValue("cmi.core.score.max", "100");
                api.LMSSetValue("cmi.core.lesson_status", "completed");
                api.LMSCommit("");
                api.LMSFinish("");
            }

            alert("Score envoyé à Moodle : " + scorePourcent + "%");

        } else {
            // Pas de SCORM détecté → mode local
            sauvegarderScore(theme,nomExo, scorePourcent);
            alert("Score (mode local) : " + scorePourcent + "%");
        }

  } catch (e) {

    console.log("Erreur SCORM :", e);
	sauvegarderScore(theme,nomExo, scorePourcent);
    alert("Score (hors Moodle) : " + scorePourcent + "%");

  }
}

function sauvegarderScore(theme, nomExo, scorePourcent) {
    let scores = JSON.parse(localStorage.getItem("scoresApp")) || {};
    if (!scores[theme]) scores[theme] = {};
    
    if (!scores[theme][nomExo] || scorePourcent > scores[theme][nomExo]) {
        scores[theme][nomExo] = scorePourcent;
    }
    localStorage.setItem("scoresApp", JSON.stringify(scores));
}





//Pour générer les exercices
let score = 0;
let questionsDone = [];



function genererExercice(exo){

    document.getElementById("titre").innerHTML = exo.titre;
    document.getElementById("enonce").innerHTML = exo.enonce;

    let zone = document.getElementById("questions");
    zone.innerHTML="";

    exo.questions.forEach((q,i)=>{

        let inputHTML = "";

        // =====================
        // 🔢 CALCUL (par défaut)
        // =====================
        if(!q.type || q.type === "calcul"){
            inputHTML = `<input type="number" step="any" id="q${i}">`;
        }

        // =====================
        // ✍️ TEXTE
        // =====================
        else if(q.type === "texte"){
            inputHTML = `<small>${q.type === "texte" ? "✍️ Réponse ouverte" : ""}</small> <input type="text" id="q${i}">`;
        }

        // =====================
        // 🧩 AFFICHAGE QUESTION
        // =====================
        zone.innerHTML += `
        <div class="question">
            <p><b>Question ${i+1} :</b> ${q.texte}</p>
            ${inputHTML}
            <span>${q.unite || ""}</span>
            <button onclick="valider(${i})">Valider</button>
            <div id="fb${i}" class="feedback"></div>
        </div>
        `;

        questionsDone[i]=false;
    });

    MathJax.typeset();

    // =====================
    // 📊 GESTION COURBE
    // =====================
    let canvas = document.getElementById("graph");

    if(exo.courbe1){
        canvas.style.display = "block";
    } else {
        canvas.style.display = "none";
    }
}


function valider(i){

    if(questionsDone[i]) return;

    let input = document.getElementById("q"+i);
    let fb = document.getElementById("fb"+i);

    let q = exo.questions[i];

    let bonneReponse = false;

    // =====================
    // 🔢 CAS CALCUL
    // =====================
    if(!q.type || q.type === "calcul"){

        let r = parseFloat(input.value);

        if(!isNaN(r)){
            let tol = q.tolerance || 0.05; // tolérance 5% par défaut
			if(q.reponse === 0){
					if(Math.abs(r) < 0.01) bonneReponse = true;
				}
			else{
            if(Math.abs(r - q.reponse) <= tol * Math.abs(q.reponse)){
                bonneReponse = true;
            }
			}
        }
    }

    // =====================
    // ✍️ CAS TEXTE
    // =====================
    else if(q.type === "texte"){

        let repUser = input.value.toLowerCase();

        bonneReponse = q.reponse.some(mot =>
            repUser.includes(mot.toLowerCase())
        );
    }

    // =====================
    // 🎯 AFFICHAGE
    // =====================
    if(bonneReponse){
        score++;
        fb.innerHTML = "✅ Bonne réponse<br>" + q.feedback;
    } else {
        fb.innerHTML = "❌ Mauvaise réponse<br>" + q.feedback;
    }

    questionsDone[i] = true;

    // =====================
    // 🎨 ACTION (courbe, etc.)
    // =====================
    if(q.action) q.action();

    MathJax.typeset();
}




