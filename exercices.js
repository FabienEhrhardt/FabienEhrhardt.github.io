// fichier : exercices.js
const listeExercices = [
    {
        theme: "0",
        exercices: [
			{ nom: "exo1", titre: "Conversion - Puissance de 10" },
        ]
    },
	{
        theme: "1",
        exercices: [
			{ nom: "exo0", titre: "Formules : Energie / Puissance" },
			{ nom: "exo1", titre: "Chaine d'énergie - Rendements" },
			{ nom: "exo2", titre: "Formules : Energie et transferts thermiques " },
			
        ]
    },
	{
        theme: "2",
        exercices: [
			{ nom: "exo1", titre: "Etude de la réponse indicielle d'un système du premier ordre" },
        ]
    },
	{
        theme: "31",
        exercices: [
            { nom: "exo9", titre: "Formules : Régime continu" },
			{ nom: "exo0", titre: "Formules : Régime monophasé sinusoïdal" },
			{ nom: "exo1", titre: "Courbes sinusoïdales i(t) et v(t)" },
			{ nom: "exo7", titre: "Etude des composants élémentaires R, L et C en régime sinusoïdal" },
			{ nom: "exo2", titre: "Tracé du diagramme de Fresnel pour circuit RL série" },
			{ nom: "exo3", titre: "Tracé du diagramme de Fresnel pour circuit RLC série" },
			{ nom: "exo4", titre: "Tracé du diagramme de Fresnel pour circuit avec 2 composants en série" },
			{ nom: "exo5", titre: "Calcul de puissance en monophasé" },
			{ nom: "exo6", titre: "Bilan de puissance en monophasé" },
			{ nom: "exo7", titre: "Etude des composants élémentaires R, L et C en régime sinusoïdal" },
			{ nom: "exo8", titre: "Formules : Régime triphasé sinusoïdal" },
        ]
    },
	{
        theme: "32",
        exercices: [
			{ nom: "exo0", titre: "Formules : Régime monophasé avec harmoniques de courant" },
			{ nom: "exo1", titre: "Etude du spectre d'un signal avec harmoniques" },
        ]
    },
	{
        theme: "33",
        exercices: [
			{ nom: "exo0", titre: "Formules : Transformateur monophasé" },
			{ nom: "exo1", titre: "Hacheur série en conduction continue - étude des courbes" },
			{ nom: "exo3", titre: "Formules : Transformateur triphasé" },
        ]
    },
	{
        theme: "41",
        exercices: [
			{ nom: "exo0", titre: "Formules : Mécanique en translation" },
			{ nom: "exo1", titre: "Profil de vitesse d'un véhicule" },
			{ nom: "exo2", titre: "Formules : Mécanique en rotation" },
        ]
    },
	{
        theme: "42",
        exercices: [
			{ nom: "exo0", titre: "Formules : Mécanique des fluides" },
			{ nom: "exo1", titre: "Alimentation d'une turbine hydraulique" },
			{ nom: "exo2", titre: "Pompe centrifuge - Courbe HMT = f(Q)" },
			{ nom: "exo4", titre: "Simplifications sur Bernoulli" },
			{ nom: "exo5", titre: "Simplifications sur Bernoulli : Forme généralisée" },
			{ nom: "exo3", titre: "Écoulement dans une conduite - Abaque de pertes de charge et Bernoulli" },
			
        ]
    },
    {
        theme: "5",
        exercices: [
			{ nom: "exo0", titre: "Formules : Batteries" },
			{ nom: "exo2", titre: "Autonomie d’un système alimenté par batterie" },
			{ nom: "exo3", titre: "Autonomie réelle d’une batterie avec profondeur de décharge" },
			{ nom: "exo4", titre: "Autonomie et performances d’un véhicule électrique" },	
			{ nom: "exo5", titre: "Cycle de conduite et récupération d’énergie" },
			{ nom: "exo6", titre: "Combien de batteries faut-il en série pour obtenir la tension souhaitée ?" },				
			{ nom: "exo1", titre: "Modèle de Thévenin d'une batterie" },
			{ nom: "exo7", titre: "Dimensionnement d’une installation solaire autonome" },
			{ nom: "exo8", titre: "Dimensionnement d’une batterie de secours" },
			{ nom: "exo9", titre: "Production d’énergie électrique par combustion" },
			{ nom: "exo10", titre: "Étude pratique de la combustion d’un carburant" },
		]
    },
	{
        theme: "6",
        exercices: [
           { nom: "exo0", titre: "Formules : Eclairage" },
		   { nom: "exo3", titre: "Éclairage d’un atelier industriel" },
		   { nom: "exo4", titre: "Température de couleur d’une source" },
		   { nom: "exo5", titre: "Analyse d’un spectre lumineux" },
		   { nom: "exo6", titre: "Cartographie d’éclairement d’un atelier" },
		   { nom: "exo7", titre: "Diagramme polaire d’un luminaire" },
		   { nom: "exo8", titre: "Éclairage d’une scène avec un projecteur" },
		   { nom: "exo2", titre: "Formules : Panneau photovoltaïque" },
		   { nom: "exo1", titre: "Courbe I=f(V) d'un panneau photovoltaïque" },
		   
		   
        ]
    },
	{
        theme: "7",
        exercices: [
            { nom: "exo0", titre: "Formules : Machine à courant continu" },
			{ nom: "exo4", titre: "Formules : Machine asynchrone" },
			{ nom: "exo5", titre: "Formules : Machine synchrone" },
			{ nom: "exo3", titre: "Étude de plaque d’un moteur triphasé asynchrone" },
			{ nom: "exo1", titre: "Courbe C=f(n) d'un moteur asynchrone" },
            { nom: "exo2", titre: "Association d'un variateur et d'un moteur asynchrone" }
        ]
    },
	{
        theme: "8",
        exercices: [
            { nom: "exo0", titre: "Formules : Maitrise des procédés" },
			{ nom: "exo2", titre: "Capteur 4-20 mA - Étalonnage" },
			{ nom: "exo1", titre: "Performances d'un asservissement" }
			
        ]
    }
];