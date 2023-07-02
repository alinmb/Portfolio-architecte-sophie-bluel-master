const submitBtn = document.getElementById('submitBtn');
const invalide = document.querySelector('.invalide');

async function login() {
  
  const account = {
    email: (document.getElementById("email2").value),
    password: (document.getElementById("password2").value)
  }

  const chargeUtile = JSON.stringify(account)

    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'accept': 'application/json'
      },
      body: chargeUtile
    })
      .then(response => {
        if (response.ok /*status 200*/) {
          return response.json();
          
        } else {
          invalide.innerText = "Erreur, mot de passe ou e-mail invalide !" /*status 401 unauthorized 404 user not found*/
        }
        /*console.log(response)*/
      })
      .then(response => {
        if (response) {
          /*window.sessionStorage.setItem('infoUseur', JSON.stringify(response.userId));*/ // Uniquement le token ?
          window.sessionStorage.setItem('token', response.token);
          window.location.replace('./index.html');
          console.log(response)
        }
        
      })


}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
})