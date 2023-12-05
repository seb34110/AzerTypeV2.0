/*********************************************************************************
 *
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu.
 *
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function afficherResultat(score, nbMotsProposes) {
  // Récupération de la zone dans laquelle on va écrire le score
  let spanScore = document.querySelector(".zoneScore span");
  // Ecriture du texte
  let affichageScore = `${score} / ${nbMotsProposes}`;
  // On place le texte à l'intérieur du span.
  spanScore.innerText = affichageScore;
}

function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerText = proposition;
}

/**
 * Cette fonction construit et affiche l'email.
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score.
 */
function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
  location.href = mailto;
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom
 * @throws {Error}
 */
function validerNom(nom) {
  if (nom.length < 2) {
    throw new Error("Le nom est trop court. ");
  }
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format.
 * @param {string} email
 * @throws {Error}
 */
function validerEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    throw new Error("L'email n'est pas valide.");
  }
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre.
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs.
 * @param {string} message
 */
function afficherMessageErreur(message) {
  let spanErreurMessage = document.getElementById("erreurMessage");

  if (!spanErreurMessage) {
    let popup = document.querySelector(".popup");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreurMessage";

    popup.append(spanErreurMessage);
  }

  spanErreurMessage.innerText = message;
}

/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail
 */
function gererFormulaire(scoreEmail) {
  try {
    let baliseNom = document.getElementById("nom");
    let nom = baliseNom.value;
    validerNom(nom);

    let baliseEmail = document.getElementById("email");
    let email = baliseEmail.value;
    validerEmail(email);
    afficherMessageErreur("");
    afficherEmail(nom, email, scoreEmail);
  } catch (erreur) {
    afficherMessageErreur(erreur.message);
  }
}

/*
 * Cette fonction lance le jeu.
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
  // Initialisations
  let score = 0;
  let i = 0;
  let listeProposition = listeMots;
  let sessionTerminee = false; // Variable pour indiquer si la série est terminée

  let btnValiderMot = document.getElementById("btnValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");

  afficherProposition(listeMots[i]);

  // Fonction pour démarrer le compte à rebours
  function startCountdown() {
    let seconds = 60; // ajustez le nombre de secondes selon vos besoins
    let countdownDisplay = document.getElementById("countdownDisplay");

    function update() {
      if (seconds > 0 && !sessionTerminee) {
        seconds--;
        countdownDisplay.textContent = seconds + "s";
        setTimeout(update, 1000);
      } else {
        countdownDisplay.textContent = "Bravo vous avez réussi !";
        sessionTerminee = true;
        // Ajoutez ici le code à exécuter lorsque le compte à rebours est terminee
      }
    }

    update(); // Démarrer le compte à rebours
    // Arrêter le compte à rebours si une proposition est affichée ou si la session est terminée
    countdownDisplay.addEventListener("click", "Enter", function () {
      seconds = 0;
      countdownDisplay.textContent = "Fin du jeu ";
    });
  }

  //  Pour valider les mots ou les phrases avec la touche "Enter"
  inputEcriture.addEventListener("keydown", (event) => {
    // Vérifiez si la touche enfoncée est "Enter"
    if (event.key === "Enter") {
      // Effectuez la logique de validation de réponse ici
      if (inputEcriture.value === listeProposition[i]) {
        score++;
      }
      i++;
      afficherResultat(score, i);
      inputEcriture.value = "";

      if (listeProposition[i] === undefined) {
        afficherProposition("Le jeu est fini");
        btnValiderMot.disabled = true;
        sessionTerminee = true; // Mettre à jour la variable
      } else {
        afficherProposition(listeProposition[i]);
      }
    }
  });

  // Pour valider les mots ou les phrases avec la souris
  btnValiderMot.addEventListener("click", () => {
    //console.log(inputEcriture.value);
    if (inputEcriture.value === listeProposition[i]) {
      score++;
    }
    i++;
    afficherResultat(score, i);
    inputEcriture.value = "";

    if (listeProposition[i] === undefined) {
      afficherProposition("Le jeu est fini");
      btnValiderMot.disabled = true;
      sessionTerminee = true; // Mettre à jour la variable
    } else {
      afficherProposition(listeProposition[i]);
    }
  });

  // Gestion de l'événement change sur les boutons radios.
  let listeBtnRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      // Si c'est le premier élément qui a été modifié, alors nous voulons
      // jouer avec la listeMots.
      if (event.target.value === "1") {
        listeProposition = listeMots;
      } else {
        // Sinon nous voulons jouer avec la liste des phrases
        listeProposition = listePhrases;
      }
      sessionTerminee = false;
      // Obtenez une proposition aléatoire.
      afficherProposition(getRandomElement(listeProposition));
      startCountdown();
    });
  }

  // Gestion de l'événement submit sur le formulaire de partage.
  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let scoreEmail = `${score} / ${i}`;
    gererFormulaire(scoreEmail);
  });

  afficherResultat(score, i);
}
