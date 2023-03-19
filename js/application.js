


//pour  récuperer tout le bloc de quiz(y compris le nbr de qst,l enoncé , les propositions, et les indicateurs de réponse) ça ne servira par la suite si on veut caché tt le bloc ou l afficher à un instant donné
const quizBox= document.querySelector(".quiz_box");

// avec cette variable on pourrait  par la suite  incrementer le nbr de qst de (class=question_number) tout en passant d une qst à une autre dans le  quiz 
const question_nbr = document.querySelector(".question_number");

// pour  récuperer le bloc ou on écrit l enoncé de la qst pour y inserer à chaque fois l enoncé de la qst courrante
const question = document.querySelector(".question_txt");


// pour  récuperer le bloc  des choix proposé à l' apprenti et inserer à chaque fois les propositions de la qst courrante
const options_of_qst = document.querySelector(".options");


// pour  récuperer le bloc des indicateurs(une partie ou j insere des bulles : si la reponse est fausse on insere une croix rouge sinon le signe de correct)
const indicateurs= document.querySelector(".indicateurs_Reponses");


//pour  récuperer le bloc  résultat(un tableau e resultat de quiz joué)
const Resultat_Quiz= document.querySelector(".resultat");


// pour le timer, on recupere le nbr qui est écrit dans id=compteur (de la page Quiz.html) puis on le décremente 
var compteurElt = document.getElementById("compteur");


let qst_counter=0; //on initialise le cpt à 0 on commence par la premiere qst puis on avance vers d autres
let qst_courrante; //recupere la qst courrante
let qst_dispo=[]; //tableau des qst disponibles
let Options_dispo=[]; //tab pour  mettre dedans les options de chaque qst à chaque fois
let reponses_correctes=0 //le compteur des reponses correctes
var compteur ;//pour le timer
var audio ; //pour les fichiers mp3
var tim;//pour l audio de timer


//Recuperer tout les qst qu'on a dans le tableau de fichier (questions.js)
function ALL_Qst_dispo()
{
 document.getElementById("demarrer").style.display="none"; //dès qu'on clique sur le bouton commencer, il va disparaitre 
	const total_qst=questions.length;//recuperer la taille de tab questions donc le nbr de qst qu'on a
	for(let i=0; i<total_qst; i++)
	{
       qst_dispo.push(questions[i]);
    }	
}


    // TIMER	
  function diminuerCompteur()
  { 
    compteur = Number(compteurElt.textContent);   // Conversion en nombre du texte du compteur
	//tant que le compteur est superieur ou ègle à 1 => on le décremente  et on lui associe un son pour dire que le temps ne s est pas encore ecoulé
	//sinon(si le temps s est écoulé)=>on affiche un msg en rouge qui dit: "Oooops, le temps s'est écoulé" 
	if (compteur >= 1)
	{
		// document.getElementById("titre").style.visibility="visible";
		document.getElementById("titre").style.visibility="visible";
        compteurElt.textContent = compteur - 1;
		  tim = new Audio('sons/timer.mp3');//pour le son de timer
          tim.play();
    } 
	else  
	{  
        document.getElementById("titre").textContent = "Oooops, le temps s'est écoulé...";
		console.log("ooops");
		document.getElementById("titre").style.color="red";
		document.getElementById("titre").style.fontSize="20px";
		document.getElementById("titre").style.marginLeft="39%";	
		document.getElementById("titre").style.fontWeight="bolder";	  			
		Fin_Quiz();//appeller la fct FinQuiz pour cacher le bloc de quiz et afficher le résultat final
	    
		
    }
}



// nouvelle qst en cliquant sur le button suivant
function New_qst()
{
	var tab;
	document.getElementById("titre").style.visibility="visible";
	 question_nbr.innerHTML ="Question "+(qst_counter+1) +" de " +questions.length; // indiquer le numèro de la question
     question.innerHTML=questions[qst_counter].q; //afficher la question courrante
	 const taille_Options =questions[qst_counter].options.length; //récuperer l taille des options (reponses  possible (vraies et fausses) de la question)
	 qst_courrante=questions[qst_counter];	//récuperer à chaque fois la question courrante pour facilité l tache
	
	//creation dynamique des options sur la page
	options_of_qst.innerHTML='' ; //à chaque fois on vide le bloc
	
	//on parcourt tte les propositions de la qst courrante
	//pour chaque proposition, on crée un div ,on écris dedans son enoncé,puis on lui associ un id et un nom de classe qui nous sera utile par la suite dans la partie CSS
  	//puis on ajoute chaque div crée au bloc qui contient toute les propositions
	 for(i=0; i<taille_Options ; i++)
	{
		 const choix =document.createElement("div");
		 choix.innerHTML=qst_courrante.options[i];
		 choix.id=i;
		 choix.className="choix";
		 options_of_qst.appendChild(choix);	
         choix.setAttribute("onclick","Recup_Prop_choisie(this)");//récuperer la proposition que l'apprenti a choisi 
    }  
	qst_counter++;//l'incrementation => Aller à la qst suivante
}




  //récuperer la prop choisi de la qst courrante et voir si c'est juste ou fausse
   function Recup_Prop_choisie(elt)
   {
	  const id=parseInt(elt.id);
	  //console.log(typeof id);
	
	  //comparer la réponse de *id choisi avec la reponse de la qst 
	  if(id===qst_courrante.answer)
	  {		
		elt.classList.add("correcte");//s'ils sont egaux donc le choix sélectionné est la bonne réponse on l affichera donc en vert
	    //pour chaque bonne ou fausse reponse on lui associe un indicateur (en bas) 
		inserer_indicateur("correcte");
 		document.getElementById("titre").style.display="none"; //cacher le timer
		
  	    audio = new Audio('sons/correct.mp3'); //associer à chaque bonne réponse un son qui indique qu'elle est correcte
        audio.play();
		reponses_correctes++;
	}
 	else  //si la réponse de l'apprenti est fausse on l'affichera en rouge,on lui associ un son puis on lui indiquera la bonne réponse 
	{
		elt.classList.add("faux");	
		inserer_indicateur("faux");
        audio = new Audio('sons/fail.mp3');
        audio.play();
		
		//indiquer la bonne réponse et l'afficher en vert grace à *qst_courrante.answer
		const taille_opt=options_of_qst.children.length;
	    for(let i=0; i<taille_opt; i++)
	    {		
			 if(parseInt(options_of_qst.children[i].id)===qst_courrante.answer)
			 {
				options_of_qst.children[i].classList.add("correcte");		
             }				 			 
	    }
	}
	 unclickable();//Cette fct permet de mettre les autres options(choix)unclickables une fois l utilisateur a selectionné son choix
                  //du coup il ne pourra plus changer son choix 
}


//l apprenti ne pourra plus changer son choix une fois qu il a selectionné une proposition
function unclickable()
{
	const taille_opt=options_of_qst.children.length;
	for(let i=0; i<taille_opt; i++)
	{
		options_of_qst.children[i].classList.add("deja_repondu");
	}
}


//associer a chaque reponse un indicateur(ou marque) pour dire si la reponse est correcte ou pas
function inserer_indicateur(mark)
{
	indicateurs.children[qst_counter-1].classList.add(mark);
	
}
function Reponses_indic()
{
	indicateurs.innerHTML='';
	const total_Qst=questions.length;
	for(let i=0; i<total_Qst; i++)
	{
		const indicateur= document.createElement("div");
		indicateurs.appendChild(indicateur);	
	}
}



//La fct qui nous permet de commencer le quiz en cliquant sur le bouton *Commencer
//dès qu'il clique sur ce bouton,ce dernier disparait et le quiz apparait
function commencer_quiz()
{
	quizBox.style.visibility = "visible";	
	document.getElementById("titre").style.visibility="visible";   
    var intervalId = setInterval(diminuerCompteur, 1000);
	ALL_Qst_dispo();
	New_qst();
	Reponses_indic();
}







//cette fct sert à passer à la qst suivante mais a chaque fois il verifie si on a atteint la derniere qst ou pas
function next()
{
	if(qst_counter===questions.length) //si y'a plus de qst on masque le bloc de quiz et affiche le résultat
	{
		document.getElementById("titre").style.display="none";
		Fin_Quiz();
		// quizBox.style.display = "none"; // Une fois terminer de répondre aux qst de quiz on masque le quiz  et on affiche les résultats et lme scorae
		// Resultat_Quiz.style.visibility = "visible";
	}
	 //si y'a encore de qst on passe à la suivante grace à  la fct New_qst()
	if(qst_counter<questions.length)
	{
		New_qst();	
	}
	// si toute les reponses sont correctes on met en marche le son d'applaudissement pour féliciter l'apprenti
	if(questions.length===reponses_correctes) 
	{
		//Bravo	
		document.getElementById("titre").style.display="none";
		audio = new Audio('sons/applaud.mp3');
        audio.play();	
	
	}
}




function Fin_Quiz()
{
	
	// Une fois terminer de répondre à toute les qst de quiz on masque le quiz  et on affiche les résultats et le score
    quizBox.style.display = "none"; 
    Resultat_Quiz.style.visibility = "visible";

	// console.log(questions.length);
	// console.log(reponses_correctes);
	// console.log(questions.length-reponses_correctes);
    // console.log(reponses_correctes+" / "+ questions.length);
	
   Resultat_Quiz.querySelector(".total_qst").innerHTML=questions.length;//le nbr total des qst qu'on lui a poser	
   Resultat_Quiz.querySelector(".Nbr_correct").innerHTML=reponses_correctes;//le nbr total de ses réponses correctes
   Resultat_Quiz.querySelector(".Nbr_wrong").innerHTML=questions.length-reponses_correctes;	//le nbr total de ses réponses fausses
   Resultat_Quiz.querySelector(".score").innerHTML=reponses_correctes+" / "+ questions.length;	 //son score final
  	
}





//Dans le cas ou l'apprenti a répondu correctement à toute les qst, il pourra acceder à la page certificat.html et telecharger son attestation de réussite
//Sinon il ne pourra pas telecharger l'attestation sauf s'il refait le quiz et répond correctement
function certificat()
{
	if(questions.length===reponses_correctes)
	{
	  window.location='certificat.html';
    }
	else //Afficher un msg pour lui proposer de refaire le quiz 
	{
		alert("Vous n'avez pas répondu à toute les questions donc vous ne pouvez pas avoir votre certificat...veuillez réessayer le quiz pour l'obtenir  ");
	}
}


//Quand l'apprenti termine le quiz, il pourra le refaire en cliquant sur le bouton Reessayer  =>on actualise la page
function Reessayer()
{
    qst_counter=0;
	reponses_correctes=0;
	window.location='Quiz.html';
}



//Quand l'apprenti termine le quiz,il pourra retourner à la page d'accueil s'il le souhaite
function home()
{
	window.location='index.html';
}





