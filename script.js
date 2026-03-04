function genererTableauTheme(themeChoisi) {
    const tableBody = document.querySelector("#tableTheme tbody");
    tableBody.innerHTML = ""; // vide le tableau avant de remplir

    // Trouver le thème
    const themeObj = listeExercices.find(t => t.theme === themeChoisi);
    if (!themeObj || themeObj.exercices.length === 0) return;

    // Parcours des exercices du thème
    themeObj.exercices.forEach(exo => {
        const tr = document.createElement("tr");

        // Colonne lien
        const tdLien = document.createElement("td");
        const a = document.createElement("a");
        a.href = `pages/${themeChoisi}/${exo.nom}/index.html`;
        a.textContent = exo.titre;
        tdLien.appendChild(a);

        // Colonne barre de progression
        const tdBarre = document.createElement("td");
        const divBarre = document.createElement("div");
        divBarre.className = "barre";
        const divRemplissage = document.createElement("div");
        divRemplissage.className = "remplissage";
        divRemplissage.id = exo.nom; // juste exo1
	divRemplissage.dataset.theme = themeChoisi; // stocke le thème
        divBarre.appendChild(divRemplissage);
        tdBarre.appendChild(divBarre);

        tr.appendChild(tdLien);
        tr.appendChild(tdBarre);

        tableBody.appendChild(tr);
    });
}

function updateBar(id, valeur) {

  let bar = document.getElementById(id);

  bar.style.width = valeur + "%";
  bar.textContent = valeur + "%";

  // Couleur automatique selon score
  if (valeur < 50) {
    bar.style.background = "#e74c3c";
  } else if (valeur < 75) {
    bar.style.background = "#f39c12";
  } else {
    bar.style.background = "#27ae60";
  }
}

function progressionTheme(theme) {

    let scores = JSON.parse(localStorage.getItem("scoresApp")) || {};

    // Trouver le thème dans la liste
    const themeObj = listeExercices.find(t => t.theme === theme);
    if (!themeObj) return 0;

    let total = 0;
    let count = themeObj.exercices.length;

    if (scores[theme]) {
        themeObj.exercices.forEach(exo => {
            total += scores[theme][exo.nom] ?? 0;
        });
    }

    return count > 0 ? Math.round(total / count) : 0;
}

function progressionGlobale() {

    let scores = JSON.parse(localStorage.getItem("scoresApp")) || {};

    let total = 0;
    let count = 0;

    listeExercices.forEach(themeObj => {

        themeObj.exercices.forEach(exo => {

            count++;

            if (scores[themeObj.theme]) {
                total += scores[themeObj.theme][exo.nom] ?? 0;
            }

        });

    });

    return count > 0 ? Math.round(total / count) : 0;
}

function majBarres() {
	updateBar("B0", progressionTheme("0"));
	updateBar("B1", progressionTheme("1"));
	updateBar("B2", progressionTheme("2"));
	updateBar("B31", progressionTheme("31"));
	updateBar("B32", progressionTheme("32"));
	updateBar("B33", progressionTheme("33"));
	updateBar("B41", progressionTheme("41"));
	updateBar("B42", progressionTheme("42"));
	updateBar("B5", progressionTheme("5"));
	updateBar("B6", progressionTheme("6"));
	updateBar("B7", progressionTheme("7"));
	updateBar("B8", progressionTheme("8"));
	updateBar("barGlobal", progressionGlobale());
	
	
		
}

function majBarresExo(theme) {

  let scores = JSON.parse(localStorage.getItem("scoresApp")) || {};
  // Récupère toutes les barres présentes dans le HTML
  let barres = document.querySelectorAll(".remplissage");
  barres.forEach(function(bar) {

    let id = bar.id;
    // Si le score existe → on le prend
    // Sinon → 0
    let valeur = scores[theme]?.[id] ?? 0;
    updateBar(id, valeur);
  });
}


