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
	  { theme: "31", exo: "exo25" },                  // Calcul de puissance plaque
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
    titre: "Utilisation de Fresnel",
    etapes: [
      { theme: "31", exo: "exo2" },                  // Fresnel RL
      { theme: "31", exo: "exo3" },                  // Fresnel RLC
      { theme: "31", exo: "exo4" },                  // Fresnel 3
    ]
  },
  {
    titre: "Energie thermique",
    etapes: [
      { theme: "1", exo: "exo2" },                  // Formules
      { theme: "1", exo: "exo4" },                  // bilan
      { theme: "1", exo: "exo3" },                  // Pertes
    ]
  },

 {
    titre: "Mécanique en translation",
    etapes: [
      { theme: "41", exo: "exo0" },                  // Formules
      { theme: "41", exo: "exo1" },                  // Profil de vitesse
    ]
  },
    {
    titre: "Régime triphasé",
    etapes: [
      { theme: "31", exo: "exo21" },                  // équilibré
      { theme: "31", exo: "exo20" },                  // déséquilibré
    ]
  },
  {
    titre: "Energie thermique, bilans d'énergie",
    etapes: [
      { theme: "1", exo: "exo10" },                  // Formules
      { theme: "1", exo: "exo5" },                  // bilan
    ]
  },
  {
    titre: "Mécanique en rotation",
    etapes: [
      { theme: "41", exo: "exo2" },                  // Formules
      { theme: "41", exo: "exo5" },                  //treuil
      { theme: "41", exo: "exo6" },                  // Pont roulant
    ]
  },
    {
    titre: "Mécanique des fluides, débutant",
    etapes: [
      { theme: "42", exo: "exo0" },
      { theme: "42", exo: "exo6" },
      { theme: "42", exo: "exo1" },
      { theme: "42", exo: "exo2" },                 
    ]
  },
  {
    titre: "Régime triphasé, courant dans le neutre",
    etapes: [
      { theme: "31", exo: "exo21" },                  // équilibré
      { theme: "31", exo: "exo20" },                  // déséquilibré
    ]
  },
  {
    titre: "Energie thermique, Dimensionnement d'une armoire",
    etapes: [
      { theme: "1", exo: "exo6" },                  // Formules
    ]
  },
 {
    titre: "Introduction aux batteries",
    etapes: [
      { theme: "5", exo: "exo0" },
      { theme: "5", exo: "exo2" },
      { theme: "5", exo: "exo3" },              
    ]
  },  
  {
    titre: "Eclairage, introduction",
    etapes: [
      { theme: "6", exo: "exo0" },
      { theme: "6", exo: "exo3" },
      { theme: "6", exo: "exo4" },
      { theme: "6", exo: "exo5" },           
    ]
  },  
  {
    titre: "Mécanique 3",
    etapes: [
      { theme: "41", exo: "exo4" },
      { theme: "41", exo: "exo3" }, 
    ]
  },
 {
    titre: "Photovoltaïque 1",
    etapes: [
      { theme: "6", exo: "exo2" }, 
      { theme: "6", exo: "exo1" },
      { theme: "6", exo: "exo9" },
                
    ]
  },

  {
    titre: "Transformateur monophasé",
    etapes: [
      { theme: "33", exo: "exo0" },
      { theme: "33", exo: "exo7", type: "tp" },                  // Formules
                      
    ]
  },  
  {
    titre: "Mécanique des fluides, Bernoulli",
    etapes: [
      { theme: "42", exo: "exo4" },
      { theme: "42", exo: "exo5" },
      { theme: "42", exo: "exo3" },
      { theme: "42", exo: "exo2" },                 
    ]
  },
  {
    titre: "Rien de va plus, présence d'harmoniques !",
    etapes: [
      { theme: "32", exo: "exo0" },                  // Formules
      { theme: "32", exo: "exo3", type: "tp" },
      { theme: "32", exo: "exo1" },
      { theme: "32", exo: "exo2" },
      { theme: "32", exo: "exo4" },                            //treuil
    ]
  },
  {
    titre: "Pause TP, le contrôleur d'installation",
    etapes: [
      { theme: "31", exo: "exo14", type: "tp" },                  // Formules

    ]
  },  
  {
    titre: "Batteries, cycles de fonctionnement",
    etapes: [
      { theme: "5", exo: "exo4" },
      { theme: "5", exo: "exo5" },
      { theme: "5", exo: "exo6" },              
    ]
  },
  
  {
    titre: "Compensation d'énergie réactive",
    etapes: [
      { theme: "33", exo: "exo9" },                
    ]
  },


  {
    titre: "Batteries, modélisation",
    etapes: [
      { theme: "0", exo: "exo2" },
      { theme: "5", exo: "exo1" },          
    ]
  },

  {
    titre: "Batteries, dimensionnement",
    etapes: [
      { theme: "5", exo: "exo7" },
      { theme: "5", exo: "exo8" },
      { theme: "5", exo: "exo11" },           
    ]
  },
  {
    titre: "L'énergie chimique par combustion",
    etapes: [
      { theme: "5", exo: "exo9" },
      { theme: "5", exo: "exo10" },         
    ]
  },

  {
    titre: "Eclairage, débutant",
    etapes: [
      { theme: "0", exo: "exo4" }, 
      { theme: "6", exo: "exo6" },
      { theme: "6", exo: "exo7" },
      { theme: "6", exo: "exo8" },
                
    ]
  },
  
  {
    titre: "Photovoltaïque 2",
    etapes: [
      { theme: "6", exo: "exo10" }, 
      { theme: "6", exo: "exo11" },
      { theme: "6", exo: "exo12" },
                
    ]
  },
  {
    titre: "Machine asynchrone",
    etapes: [
      { theme: "7", exo: "exo4" },
      { theme: "7", exo: "exo3" },  
      { theme: "7", exo: "exo1" },                 
    ]
  },
  
  {
    titre: "Machine à courant continu",
    etapes: [
      { theme: "7", exo: "exo0" }, 
      { theme: "7", exo: "exo6" },
      { theme: "7", exo: "exo7" },
              
    ]
  },
  {
    titre: "Transformateur triphasé",
    etapes: [
      { theme: "33", exo: "exo4" },
      { theme: "33", exo: "exo5"},                  // Formules
      { theme: "33", exo: "exo9"},                   
    ]
  },
  {
    titre: "Convertisseurs statiques",
    etapes: [
      { theme: "33", exo: "exo8" },
      { theme: "33", exo: "exo1"},
	  { theme: "33", exo: "exo10"},
	  { theme: "33", exo: "exo11"},// Formules                 
    ]
  },
    {
    titre: "Mécanique des fluides, Ventillation et qualité de l'air",
    etapes: [
      { theme: "42", exo: "exo7", type: "tp"   },
      { theme: "42", exo: "exo8" },              
    ]
  },
  {
    titre: "Capteur",
    etapes: [
      { theme: "8", exo: "exo0" },
      { theme: "8", exo: "exo2" },                 
    ]
  },
  
  {
    titre: "Machine à courant continu 2",
    etapes: [
      { theme: "7", exo: "exo8" },
      { theme: "7", exo: "exo6" },  	  
    ]
  },
    {
    titre: "Bilan économique",
    etapes: [
      { theme: "8", exo: "exo3" },
      { theme: "8", exo: "exo4" },
      { theme: "8", exo: "exo5" },                  
    ]
  },
  {
    titre: "Machine asynchrone 2",
    etapes: [
      { theme: "7", exo: "exo2" },             
    ]
  },

    {
    titre: "Machine synchrone",
    etapes: [
      { theme: "7", exo: "exo5" },             
    ]
  },

  
{
    titre: "Régimes transitoires",
    etapes: [
      { theme: "2", exo: "exo1" },                  // Formules
      { theme: "2", exo: "exo2" },                  //treuil
    ]
  },
  {
    titre: "Asservissement",
    etapes: [
      { theme: "8", exo: "exo6" },
      { theme: "8", exo: "exo1" },
      { theme: "8", exo: "exo7", type: "tp" },                  
    ]
  },
  





];
