let theme="33";
let nomExo="exo8";

let chapitre="Montages avancés";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "1",
    choix: [
        "Redresseur monophasé",
        "Redresseur triphasé",
        "Hacheur série",
        "Onduleur monophasé"
    ]
},
{
    texte: "2",
    choix: [
        "Redresseur triphasé",
        "Redresseur commandé triphasé",
        "Redresseur monophasé",
        "Onduleur triphasé"
    ]
},
{
    texte: "3",
    choix: [
        "Redresseur commandé monophasé",
        "Redresseur triphasé",
        "Hacheur série",
        "Onduleur triphasé"
    ]
},
{
    texte: "4",
    choix: [
        "Redresseur commandé triphasé",
        "Filtre LC",
        "Variateur de vitesse",
        "Onduleur monophasé"
    ]
},
{
    texte: "5",
    choix: [
        "Filtre LC",
        "Compensateur statique",
        "Compensateur synchrone",
        "Batterie de condensateurs"
    ]
},
{
    texte: "6",
    choix: [
        "Hacheur série",
        "Hacheur parallèle",
        "Variateur de vitesse",
        "Redresseur"
    ]
},
{
    texte: "7",
    choix: [
        "Hacheur 2 quadrants réversible en courant",
        "Hacheur 2 quadrants réversible en tension",
        "Hacheur 4 quadrants",
        "Hacheur série"
    ]
},
{
    texte: "8",
    choix: [
        "Hacheur 2 quadrants réversible en tension",
        "Hacheur 2 quadrants réversible en courant",
        "Hacheur 4 quadrants",
        "Hacheur série"
    ]
},
{
    texte: "9",
    choix: [
        "Hacheur 4 quadrants",
        "Onduleur triphasé",
        "Hacheur 2 quadrants réversible en tension",
        "Hacheur 2 quadrants réversible en courant"
    ]
},
{
    texte: "10",
    choix: [
        "Onduleur monophasé",
        "Onduleur triphasé",
        "Hacheur 2 quadrants réversible en tension",
        "Hacheur 2 quadrants réversible en courant"
    ]
},
{
    texte: "11",
    choix: [
        "Onduleur triphasé",
        "Redresseur triphasé",
        "Gradateur triphasé",
        "Hacheur triphasé"
    ]
},
{
    texte: "12",
    choix: [
        "Gradateur monphasé",
        "Thyristor",
        "Gradateur triphasé",
        "Hacheur"
    ]
},
{
    texte: "13",
    choix: [
        "Gradateur triphasé",
        "Thyristor",
        "Redresseur commandé triphasé",
        "Onduleur triphasé"
    ]
},
{
    texte: "14",
    choix: [
        "Compensateur statique",
        "Compensateur synchrone",
        "Batterie de condensateurs",
        "Condensateur"
    ]
},
{
    texte: "15",
    choix: [
        "Batterie de compensation",
        "Compensateur statique",
        "Compensateur synchrone",
        "Condensateur"
    ]
},
{
    texte: "16",
    choix: [
        "Modèle de Kapp du transformateur",
        "Modèle du moteur synchrone",
        "Modèle du moteur asynchrone",
        "Modèle du moteur à courant continu"
    ]
},
{
    texte: "17",
    choix: [
        "Modèle du secondaire du transformateur",
        "Modèle de Kapp du transformateur",
        "Modèle du moteur synchrone",
        "Modèle du moteur asynchrone"
    ]
},
{
    texte: "18",
    choix: [
        "Modèle de Thévenin",
        "Modèle de Norton",
        "Source de tension parfaite",
        "Source de courant parfaite"
    ]
},
{
    texte: "19",
    choix: [
        "Modèle de Norton",
        "Modèle de Thévenin",
        "Source de tension parfaite",
        "Source de courant parfaite"
    ]
},
{
    texte: "20",
    choix: [
        "Diode",
        "Thyristor",
        "Transistor",
        "Diode Zener"
    ]
},
{
    texte: "21",
    choix: [
        "Thyristor",
        "Diode",
        "Diode Zener",
        "Transistor"
    ]
},
{
    texte: "22",
    choix: [
        "Transistor NPN",
        "Transistor PNP",
        "Transistor IGBT",
        "Transistor MOS"
    ]
},
{
    texte: "23",
    choix: [
        "Transistor PNP",
        "Transistor IGBT",
        "Transistor MOS",
        "Transistor NPN"
    ]
},
{
    texte: "24",
    choix: [
        "Transistor IGBT",
        "Transistor MOS",
        "Transistor NPN",
        "Transistor PNP"
    ]
},
{
    texte: "25",
    choix: [
        "Transistor MOS",
        "Transistor NPN",
        "Transistor PNP",
        "Transistor IGBT"
    ]
},
{
    texte: "26",
    choix: [
        "Diode Zener",
        "Thyristor",
        "Diode",
        "Transistor"
    ]
},
{
    texte: "27",
    choix: [
        "Variateur de vitesse triphasé",
        "Variateur de vitesse monophasé",
        "Gradateur triphasé",
        "Onduleur triphasé"
    ]
},
{
    texte: "28",
    choix: [
        "Variateur de vitesse monophasé",
        "Variateur de vitesse triphasé",
        "Gradateur triphasé",
        "Onduleur triphasé"
    ]
},
{
    texte: "29",
    choix: [
        "Redresseur",
        "Hacheur",
        "Onduleur",
        "Gradateur"
    ]
},
{
    texte: "30",
    choix: [
        "Hacheur",
        "Onduleur",
        "Gradateur",
        "Redresseur"
    ]
},
{
    texte: "31",
    choix: [
        "Onduleur",
        "Gradateur",
        "Redresseur",
        "Hacheur"
    ]
},
{
    texte: "32",
    choix: [
        "Gradateur",
        "Redresseur",
        "Hacheur",
        "Onduleur"
    ]
},
{
    texte: "33",
    choix: [
        "Variateur de vitesse",
        "Redresseur",
        "Hacheur",
        "Onduleur"
    ]
},
];