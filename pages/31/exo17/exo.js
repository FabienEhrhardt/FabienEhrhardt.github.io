
 // =====================
 // PARAMÈTRES
 // =====================

 // Génération
 let R=Math.floor(Math.random()*91+10);       // R en ohms : 10 à 100 Ω
 let U_R=Math.floor(Math.random()*207+24);    // U en V : 24 à 230 V
 let I_R=Math.floor(Math.random()*10+1)/10;   // I en A : 0,1 à 1 A

 let fL=Math.floor(Math.random()*451+50);     // f en Hz : 50 à 500 Hz
 let L=Math.floor(Math.random()*451+50)/1000; // L en H : 50 à 500 mH
 let U_L=Math.floor(Math.random()*207+24);    // U en V
 let I_L=Math.floor(Math.random()*20+1)/10;   // I en A

 let fC=Math.floor(Math.random()*451+50);    // f en Hz : 50 à 500 Hz
 let C=Math.floor(Math.random()*100+1)/1000000; // C en F : 1 à 100 µF
 let U_C=Math.floor(Math.random()*207+24);   // U en V
 let I_C=Math.floor(Math.random()*20+1)/10;  // I en A


 // =====================
 // CALCULS
 // =====================

 let Z_R=R;
 let courantR=U_R/R;
 let tensionR=R*I_R;

 let Z_L=2*Math.PI*fL*L;
 let courantL=U_L/Z_L;
 let tensionL=Z_L*I_L;

 let Z_C=1/(2*Math.PI*fC*C);
 let courantC=U_C/Z_C;
 let tensionC=Z_C*I_C;


 // =====================
 // EXERCICE
 // =====================

 let theme="31";
 let nomExo="exo17";

 let exo={

 titre:"Impédance, courant et tension : R, L et C",

 enonce:`On considère successivement une résistance, une bobine idéale et un condensateur idéal, alimentés en régime sinusoïdal. On rappelle les relations suivantes :

 \\[
 Z_R=R \\qquad
 Z_L=2\\pi fL \\qquad
 Z_C=\\frac{1}{2\\pi fC}
 \\]

 Pour chaque question, donner le résultat avec l'unité demandée. Les tensions et les courants sont des valeurs efficaces.`,

 // ====================
 // QUESTIONS
 // ====================

 questions:[

 // ====================
 // RÉSISTANCE
 // ====================

 {
 texte:`Une résistance possède une valeur de \\(R=${R}\\,\\Omega\\). Déterminer son impédance.`,
 reponse:Z_R,
 unite:"Ω",
 feedback:`
 Pour une résistance idéale, l'impédance est égale à la résistance :

 \\[
 Z_R=R=${R}\\,\\Omega
 \\]

 L'impédance d'une résistance ne dépend pas de la fréquence.
 `
 },

 {
 texte:`Une résistance de \\(R=${R}\\,\\Omega\\) est alimentée sous une tension efficace de \\(U=${U_R}\\,V\\). Calculer le courant efficace qui la traverse.`,
 reponse:arrondi(courantR),
 unite:"A",
 feedback:`
 On utilise la relation :

 \\[
 I=\\frac{U}{Z_R}=\\frac{U}{R}
 \\]

 Application numérique :

 \\[
 I=\\frac{${U_R}}{${R}}=${arrondi(courantR)}\\,A
 \\]
 `
 },

 {
 texte:`Une résistance de \\(R=${R}\\,\\Omega\\) est traversée par un courant efficace de \\(I=${I_R}\\,A\\). Calculer la tension efficace à ses bornes.`,
 reponse:arrondi(tensionR),
 unite:"V",
 feedback:`
 On utilise la loi d'Ohm :

 \\[
 U=RI
 \\]

 Application numérique :

 \\[
 U=${R}\\times${I_R}=${arrondi(tensionR)}\\,V
 \\]
 `
 },

 // ====================
 // BOBINE
 // ====================

 {
 texte:`Une bobine idéale possède une inductance de \\(L=${L*1000}\\,mH\\) et est alimentée à la fréquence \\(f=${fL}\\,Hz\\). Calculer son impédance.`,
 reponse:arrondi(Z_L),
 unite:"Ω",
 feedback:`
 On convertit d'abord l'inductance en henrys :

 \\[
 L=${L*1000}\\,mH=${L}\\,H
 \\]

 Pour une bobine idéale :

 \\[
 Z_L=2\\pi fL
 \\]

 Application numérique :

 \\[
 Z_L=2\\pi\\times${fL}\\times${L}
 =${arrondi(Z_L)}\\,\\Omega
 \\]
 `
 },

 {
 texte:`Une bobine idéale d'inductance \\(L=${L*1000}\\,mH\\) est alimentée sous une tension efficace de \\(U=${U_L}\\,V\\), à la fréquence \\(f=${fL}\\,Hz\\). Calculer le courant efficace.`,
 reponse:arrondi(courantL),
 unite:"A",
 feedback:`
 Étape 1 : calculer l'impédance de la bobine.

 \\[
 Z_L=2\\pi fL
 =2\\pi\\times${fL}\\times${L}
 =${arrondi(Z_L)}\\,\\Omega
 \\]

 Étape 2 : calculer le courant.

 \\[
 I=\\frac{U}{Z_L}
 =\\frac{${U_L}}{${arrondi(Z_L)}}
 =${arrondi(courantL)}\\,A
 \\]
 `
 },

 {
 texte:`Une bobine idéale d'inductance \\(L=${L*1000}\\,mH\\) est traversée par un courant efficace de \\(I=${I_L}\\,A\\), à la fréquence \\(f=${fL}\\,Hz\\). Calculer la tension efficace à ses bornes.`,
 reponse:arrondi(tensionL),
 unite:"V",
 feedback:`
 Étape 1 : calculer l'impédance de la bobine.

 \\[
 Z_L=2\\pi fL
 =2\\pi\\times${fL}\\times${L}
 =${arrondi(Z_L)}\\,\\Omega
 \\]

 Étape 2 : calculer la tension.

 \\[
 U=Z_L I
 \\]

 \\[
 U=${arrondi(Z_L)}\\times${I_L}
 =${arrondi(tensionL)}\\,V
 \\]
 `
 },

 // ====================
 // CONDENSATEUR
 // ====================

 {
 texte:`Un condensateur idéal possède une capacité de \\(C=${C*1000000}\\,\\mu F\\) et est alimenté à la fréquence \\(f=${fC}\\,Hz\\). Calculer son impédance.`,
 reponse:arrondi(Z_C),
 unite:"Ω",
 feedback:`
 On convertit d'abord la capacité en farads :

 \\[
 C=${C*1000000}\\,\\mu F=${C}\\,F
 \\]

 Pour un condensateur idéal :

 \\[
 Z_C=\\frac{1}{2\\pi fC}
 \\]

 Application numérique :

 \\[
 Z_C=\\frac{1}{2\\pi\\times${fC}\\times${C}}
 =${arrondi(Z_C)}\\,\\Omega
 \\]
 `
 },

 {
 texte:`Un condensateur idéal de capacité \\(C=${C*1000000}\\,\\mu F\\) est alimenté sous une tension efficace de \\(U=${U_C}\\,V\\), à la fréquence \\(f=${fC}\\,Hz\\). Calculer le courant efficace.`,
 reponse:arrondi(courantC),
 unite:"A",
 feedback:`
 Étape 1 : calculer l'impédance du condensateur.

 \\[
 Z_C=\\frac{1}{2\\pi fC}
 =\\frac{1}{2\\pi\\times${fC}\\times${C}}
 =${arrondi(Z_C)}\\,\\Omega
 \\]

 Étape 2 : calculer le courant.

 \\[
 I=\\frac{U}{Z_C}
 =\\frac{${U_C}}{${arrondi(Z_C)}}
 =${arrondi(courantC)}\\,A
 \\]
 `
 },

 {
 texte:`Un condensateur idéal de capacité \\(C=${C*1000000}\\,\\mu F\\) est traversé par un courant efficace de \\(I=${I_C}\\,A\\), à la fréquence \\(f=${fC}\\,Hz\\). Calculer la tension efficace à ses bornes.`,
 reponse:arrondi(tensionC),
 unite:"V",
 feedback:`
 Étape 1 : calculer l'impédance du condensateur.

 \\[
 Z_C=\\frac{1}{2\\pi fC}
 =\\frac{1}{2\\pi\\times${fC}\\times${C}}
 =${arrondi(Z_C)}\\,\\Omega
 \\]

 Étape 2 : calculer la tension.

 \\[
 U=Z_C I
 \\]

 \\[
 U=${arrondi(Z_C)}\\times${I_C}
 =${arrondi(tensionC)}\\,V
 \\]
 `
 }

 ]

 };


 // =====================
 // LANCEMENT
 // =====================

 let nbquestion=exo.questions.length;

 window.onload=function(){

 genererExercice(exo);

 };