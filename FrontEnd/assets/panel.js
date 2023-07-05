//// Récupération des élements HTML dans le JS. ////

/* Récuperation de la section ou tout les projets s'affichent lors du lancement de la page. */
const gallerySection = document.querySelector('.gallery');

/* Récuperation de tous les élements pour l'affichage, l'édition ou le retrait des modales. */
const modalContainer = document.querySelector('.modal-container'); /* Le containeur qui s'ouvre lorsque l'on clique sur "modifier". */
const openModal = document.querySelector('#openModal');
const closeModal = document.querySelector('.close-modal');
const closeModal2 = document.querySelector('.close-modal2');
const galleryPhoto = document.querySelector('.gallery-photo'); /* Gallerie qui stock les photos dans la modale. */
const modal1 = document.querySelector('.modal1');
const addBtn = document.querySelector('.add-btn');
const modal2 = document.querySelector('.modal2');
const lastModal = document.querySelector('.last-modal'); /* Flèche de retour. */
const logoutBtn = document.querySelector('.logout-btn');
const categorie = document.querySelector('#categorie'); /* SELECT élement. */
const btnValid = document.querySelector('.btn-valid'); /* Envoi POST. */

/* Stockage du token dans une variable pour utilisation simplifiée. */
let userToken = window.sessionStorage.getItem("token");

/* Stockage de la requête au serveur et de sa reponse en objet javascript dans une variable URL. */
let url = fetch('http://localhost:5678/api/works').then(response => response.json());

//// Fonction qui crée les figures, img, figcaption avec les valeurs récupéré (GET) depuis l'API.  ////
const createFigure = (link) => {
    const figureElm = document.createElement('figure');
    const imgElm = document.createElement('img');
    const figCaptionElm = document.createElement('figcaption');
    imgElm.setAttribute('src', link.imageUrl);
    imgElm.setAttribute('alt', link.title);
    figCaptionElm.innerHTML = link.title;
    figureElm.appendChild(imgElm);
    figureElm.appendChild(figCaptionElm);
    gallerySection.appendChild(figureElm);
}

//// Fonction qui récupère tous les projets présent dans l'API + appel à la fonction createFigure. ////
const getAll = () => {
    gallerySection.innerHTML = ""; /* On supprime tout les élements présent dans la gallerie. */
    /* Récuperation des données depuis l'API, nous bouclons dans les données et récuperons chaque projets présent 1 à 1. */
    url.then((data) => {
        for (project of data) {
            createFigure(project); /* Création des figures, img, figcaption grâce à la fonction. */
        }
    })
        .catch(error => console.log(error))
}

//// Fonction qui crée les figures présentes dans la seconde modale.. ////
const createGallery = (link) => {
    const figureElm = document.createElement('figure');
    const imgElm = document.createElement('img');
    const figCaptionElm = document.createElement('figcaption');
    const trashElm = document.createElement('i');
    trashElm.setAttribute('class', "fa-solid fa-trash-can")
    imgElm.setAttribute('src', link.imageUrl);
    imgElm.setAttribute('alt', link.title);
    imgElm.classList.add('gallery-img')
    figCaptionElm.innerHTML = "éditer";
    figureElm.appendChild(imgElm);
    figureElm.appendChild(figCaptionElm);
    figureElm.appendChild(trashElm);
    galleryPhoto.appendChild(figureElm);
}

//// Fonction qui crée des balises <option> dans le <select> déjà présent dans le HTML. ////
const createOptions = (cat) => {
    const option = document.createElement('option');
    option.setAttribute('value', cat.id);
    option.innerHTML = cat.name;
    categorie.appendChild(option);
}

//// Fonction qui récupère toutes les catégories présentes dans l'API. ////
const getCategory = () => {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then((data) => {
            for (catego of data) {
                createOptions(catego);
            }
        })
        .catch(error => console.log(error))
}

//// Fonction qui modifie le background du bouton validé lorsque les inputs de l'image et du titre sont bien remplis. ////
const filledInput = () => {
    if (document.getElementById("title").value !== "" && document.getElementById("file").files[0] !== "") {
        btnValid.style.background = "#1D6154";
    } else {
        btnValid.style.background = "#A7A7A7";
    }
}

//// Fonction qui modifie le background du bouton validé lorsque les inputs de l'image et du titre sont bien remplis. ////
const addWorks = () => {

    /* Nous stockons ici les valeurs entrées dans nos input type file et text ainsi que l'option. */
    const image = document.getElementById("file").files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("categorie").value;

    const formData = new FormData(); /* FormData (FormData object) simplifie la requête, nous n'avons pas a spécifié d'headers, encoding, etc. */
    /* Nous stockons ici les valeurs dans ce nouvel objet formData */
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', parseInt(category));

    fetch('http://localhost:5678/api/works', {
        method: 'POST', /* Type de requête. */
        headers: {
            'authorization': `Bearer ${userToken}` /* Token necessaire pour avoir l'autorisation de poster. */
        },
        body: formData
    })
        .then(res => res.json()) /* On recupère le resultat de la promesse converti en objet javascript. */
        .then(data => console.log(data))
        .catch(error => console.log(error))

    /* Création de la nouvelle figure */
    const workAdded = document.createElement('figure');
    const imgAdded = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    imgAdded.setAttribute('alt', title);
    figcaption.setAttribute('id', category);
    figcaption.innerHTML = title;

    gallerySection.appendChild(workAdded);
    gallerySection.appendChild(imgAdded);
}

//// Fonction qui nous permet de se deconnecter. ////
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.sessionStorage.removeItem('token');
    window.location.replace('./index.html');
})

// AddEventListener :

/* Ajout du nouveau projet. */
btnValid.addEventListener('click', function (event) {
    event.preventDefault();
    addWorks();
})

/* Ouverture du container des modales */
openModal.addEventListener('click', function () {
    galleryPhoto.innerHTML = "";
    modalContainer.style.display = "flex";
    modal1.style.display = "block";
    modal2.style.display = "none";

    /* Création d'une nouvelle modale dans la gallerie. */
    url.then((data) => {
        for (project of data) {
            createGallery(project);
        }
    })
        .catch(error => console.log(error));
})

/* Ouverture de la modale pour ajouter un projet. */
addBtn.addEventListener('click', function () {
    modal1.style.display = "none";
    modal2.style.display = "block";
})
/* Retour à la première modale. */
lastModal.addEventListener('click', function () {
    modal1.style.display = "block";
    modal2.style.display = "none";
})
/* Fermeture des modales via icon croix. */
closeModal.addEventListener('click', function () {
    modalContainer.style.display = "none";
})
closeModal2.addEventListener('click', function () {
    modalContainer.style.display = "none";
})
/* Fermeture des modales en cliquant hors de celles-ci. */
window.onclick = function (event) {
    if (event.target == modalContainer) {
        modalContainer.style.display = "none";
    }
}

// Appel fonctions :
getAll();
getCategory();




