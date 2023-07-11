//// Récupération des élements HTML dans le JS. ////
const submitBtn = document.getElementById('submitBtn');
const invalide = document.querySelector('.invalide');

//// Fonction asynchrone qui permet de se connecter à son espace administrateur (panel admin). ////
const login = () => {
  /* Nous stockons ici les valeurs entrées dans nos input type email & password. */
  const account = {
    email: (document.getElementById("email2").value),
    password: (document.getElementById("password2").value)
  }

  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
     if (!emailRegExp.test(account.email)) {
        throw new Error(invalide.innerHTML ="Format e-mail invalide. (exemple@exemple.com)")
     } 
  /* Credentials = les données que le serveur utilisera pour réalisé l'opération demandée par la requête. */
  /* Nous convertissons account en chaine JSON */
  const credentials = JSON.stringify(account)

  /* Ici nous faisons la reqûete avec la method POST, car nous voulons soumettre des données et non en récupérer */
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'accept': 'application/json'
    },
    body: credentials
  })
    .then(response => {

      if (response.ok) {
        return response.json(); /* On return la promesse si la reponse === status 200. */

      } else {
        invalide.innerText = "Erreur dans l’identifiant ou le mot de passe." /* status 401 unauthorized / 404 user not found. */
      }

    })
    .then(data => {
      if (data) { /* Nous stockons le token via sessionStorage, la session durera le temps de la navigation. */
        window.sessionStorage.setItem('token', data.token);
        window.location.replace('./panel.html'); /* En ayant l'autorisation du serveur, nous serons transféré sur la page panel.html. */
      }

    })
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
})