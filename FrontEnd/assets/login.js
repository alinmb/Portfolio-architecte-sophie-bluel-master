const submitBtn = document.getElementById('submitBtn');
const invalide = document.querySelector('.invalide');

async function login() {

  const account = {
    email: (document.getElementById("email2").value),
    password: (document.getElementById("password2").value)
  }

  if (!account.email || !account.password) {
    invalide.innerText = "Erreur, mot de passe ou e-mail invalide !";
    return;
  } else {

    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(account)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
          
        } else {
          invalide.innerText = "Erreur requête."
        }
        /*console.log(response)*/
      })
      .then(response => {
        if (response) {
          window.sessionStorage.setItem('infoUseur', JSON.stringify(response));
          window.sessionStorage.setItem('token', response.token);
          window.location.replace('./index.html');
          console.log(response)
        }
        
      })
  }

}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
})