// ============================================================
// parcours.js — Mode aventure : définition du parcours
// ============================================================
// Chaque étape = { theme, exo } avec les mêmes identifiants que dans
// exercices.js (donc le dossier pages/<theme>/<exo>/index.html).
// Option : type:"tp" -> l'élève peut aussi cocher « Réalisé » (utile pour
// les TP sans score fiable). Un TP est validé si score >= seuil OU case cochée.
//
// Spirale : un même thème peut revenir à plusieurs niveaux (ex. le thème 1
// « Énergie » aux niveaux 2 et 5, avec plus de complexité).
// ============================================================

// Score minimal (en %) pour valider une étape
const SEUIL_VALIDATION = 60;

// Chemin depuis aventure.html vers le dossier « pages »
// (si aventure.html est déjà dans pages/, mettre "" ; si c'est à la racine, "pages/")
const CHEMIN_PAGES = "pages/";

const parcours = [
  {
    titre: "Les outils de base",
    etapes: [
      { theme: "0",  exo: "exo1" },   // Conversion - Puissance de 10
      { theme: "0",  exo: "exo0" },   // Formules : Unités 1
      { theme: "0",  exo: "exo3" },   // Pythagore - Trigonométrie
    ]
  },
  {
    titre: "Énergie et circuit continu",
    etapes: [
      { theme: "1",  exo: "exo7" },   // Différncier une source d'énergie
	  { theme: "1",  exo: "exo0" },   // Formules : Énergie / Puissance
      { theme: "1",  exo: "exo1" },   // Chaîne d'énergie - Rendements
      { theme: "1",  exo: "exo11" },  // Conversions d'énergie
    ]
  },
  {
    titre: "Montage en circuit continu",
    etapes: [
      { theme: "31", exo: "exo9" },   // Formules : Régime continu
	  { theme: "31", exo: "exo22" }, //Association résistance
	  { theme: "31", exo: "exo23" }, //Association résistance
	  { theme: "31", exo: "exo24" }, //Association résistance 3
    ]
  },
  {
    titre: "Signaux sinusoïdaux : signaux temporel",
    etapes: [
      { theme: "31", exo: "exo0" },                  // Formules : monophasé sinusoïdal
      { theme: "31", exo: "exo1" },                  // Courbes i(t) et v(t)
      { theme: "31", exo: "exo16" },                  // formule
      { theme: "31", exo: "exo10", type: "tp" },     // TP oscilloscope
      { theme: "31", exo: "exo11" },                 // Oscilloscope et signaux
      
    ]
  },
  {
    titre: "Signaux sinusoïdaux : Impédances",
    etapes: [
      { theme: "31", exo: "exo17" },                 // Impédance, courant, tension : R, L, C
      { theme: "31", exo: "exo15" },                  // Schéma
      { theme: "31", exo: "exo18" },                  // RLC
      { theme: "31", exo: "exo7" },     // RLC 2
    ]
  },
  
  {
    titre: "Puissance monophasée",
    etapes: [
      { theme: "31", exo: "exo5" },                  // Calcul de puissance en monophasé
      { theme: "31", exo: "exo13", type: "tp" },     // TP pince F407
      { theme: "31", exo: "exo6" },                  // Bilan de puissance en monophasé
    ]
  },
  {
    titre: "Retour sur l'énergie, avec plus de complexité",
    etapes: [
      { theme: "1",  exo: "exo8" },   // Éolienne - Rendements et facteur de charge
      { theme: "1",  exo: "exo9" },  // Bilan d'énergie d'une centrale de cogénération
    ]
  },
   {
    titre: "Puissance monophasée",
    etapes: [
      { theme: "31", exo: "exo2" },                  // Fresnel RL
      { theme: "31", exo: "exo3" },                  // Fresnel RLC
      { theme: "31", exo: "exo4" },                  // Fresnel 3
    ]
  },
];
