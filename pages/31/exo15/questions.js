let theme="31";
let nomExo="exo15";

let chapitre="Symboles";


// ======================
// QUESTIONS (LATEX)
// ======================
const questions = [
{
    texte: "1",
    choix: [
        "Source de tension continue",
        "Source de tension alternative",
        "Source de courant continue",
        "Source de courant alternative"
    ]
},
{
    texte: "2",
    choix: [
        "Résistance",
        "Bobine",
        "Condensateur",
        "Relais"
    ]
},
{
    texte: "3",
    choix: [
        "Bobine",
        "Relais",
        "Résistance",
        "Condensateur"
    ]
},
{
    texte: "4",
    choix: [
        "Condensateur",
        "Bobine",
        "Batterie",
        "Source de tension continue"
    ]
},
{
    texte: "5",
    choix: [
        "Source de tension alternative",
        "Source de tension continue",
        "Source de courant continue",
        "Source de courant alternative"
    ]
},
{
    texte: "6",
    choix: [
        "Voltmètre",
        "Ohmmètre",
        "Ampèremètre",
        "Multimètre"
    ]
},
{
    texte: "7",
    choix: [
        "Ampèremètre",
        "Voltmètre",
        "Ohmmètre",
        "Multimètre"
    ]
},
{
    texte: "8",
    choix: [
        "Batterie",
        "Source de tension continue",
        "Source de tension alternative",
        "Source de courant continue"
    ]
},
{
    texte: "9",
    choix: [
        "Source de tension continue",
        "Source de tension alternative",
        "Source de courant continue",
        "Batterie"
    ]
},
{
    texte: "10",
    choix: [
        "Bobine de contacteur",
        "Contacteur",
        "Contacts de contacteur",
        "Résistance"
    ]
},
{
    texte: "11",
    choix: [
        "Contact NF",
        "Contact NO",
        "Contact de puissance",
        "Interrupteur"
    ]
},
{
    texte: "12",
    choix: [
        "Contact NO",
        "Contact NF",
        "Contact de puissance",
        "Bobine"
    ]
},
{
    texte: "13",
    choix: [
        "Contact de puissance",
        "Contact NF",
        "Contact NO",
        "Bobine"
    ]
},
{
    texte: "14",
    choix: [
        "Disjoncteur magnétothermique",
        "Disjoncteur différentiel",
        "Porte Fusible",
        "Interrupteur sectionneur"
    ]
},
{
    texte: "15",
    choix: [
        "Disjoncteur différentiel",
        "Disjoncteur magnétothermique",
        "Disjoncteur Moteur",
        "Porte Fusible"
    ]
},
{
    texte: "16",
    choix: [
        "Disjoncteur Moteur",
        "Disjoncteur différentiel",
        "Porte Fusible",
        "Interrupteur sectionneur"
    ]
},
{
    texte: "17",
    choix: [
        "Bouton poussoir NO",
        "Bouton poussoir NF",
        "Bouton rotatif NO",
        "Bouton rotatif NF"
    ]
},
{
    texte: "18",
    choix: [
        "Bouton poussoir NF",
        "Bouton poussoir NO",
        "Bouton rotatif NO",
        "Bouton rotatif NF"
    ]
},
{
    texte: "19",
    choix: [
        "Voyant",
        "Source de tension",
        "Source de courant continue",
        "Batterie"
    ]
},
{
    texte: "20",
    choix: [
        "Verrouillage mécanique",
        "Diode",
        "Ampèremètre",
        "Panneau solaire"
    ]
},
{
    texte: "21",
    choix: [
        "Sectionneur",
        "Interrupteur",
        "Interrupteur sectionneur",
        "Disjoncteur"
    ]
},
{
    texte: "22",
    choix: [
        "Relais thermique",
        "Contact NF",
        "Relais",
        "Contacteur"
    ]
},
{
    texte: "23",
    choix: [
        "Sectionneur porte fusible",
        "Fusible",
        "Sectionneur",
        "Résistance"
    ]
},
{
    texte: "24",
    choix: [
        "Interrupteur sectionneur",
        "Interrupteur",
        "Sectionneur",
        "Disjoncteur"
    ]
},
{
    texte: "25",
    choix: [
        "Fusible",
        "Résistance",
        "Thermistance",
        "Capteur de température"
    ]
},
{
    texte: "26",
    choix: [
        "Interrupteur",
        "Sectionneur",
        "Interrupteur sectionneur",
        "Contact de puissance"
    ]
},
{
    texte: "27",
    choix: [
        "Transformateur triphasé",
        "Transformateur monophasé",
        "Bobine",
        "Source de tension"
    ]
},
{
    texte: "28",
    choix: [
        "Transformateur monophasé",
        "Transformateur triphasé",
        "Bobine",
        "Source de tension"
    ]
},
{
    texte: "29",
    choix: [
        "Panneau photovoltaïque",
        "Résistance",
        "Diode",
        "Thyristor"
    ]
},
{
    texte: "30",
    choix: [
        "Bouton arrêt d'urgence",
        "Bouton poussoir NF",
        "Bouton rotatif NF",
        "Pédale en contact NF"
    ]
},
{
    texte: "31",
    choix: [
        "Bouton rotatif NO",
        "Bouton poussoir NO",
        "Bouton poussoir NF",
        "Bouton rotatif NF"
    ]
},
{
    texte: "32",
    choix: [
        "Moteur triphasé",
        "Moteur monophasé",
        "Moteur pas à pas",
        "Moteur diphasé"
    ]
},
];