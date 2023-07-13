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
const myForm = document.querySelector('#form');
/* Aperçu image uploadé. */
const galleryBloc = document.querySelector(".gallery-ajouter") /* Bloc contenant input type file + btn upload. */
const displayImg = document.querySelector('.display-img'); /* Display image upload. */
const imgInput = document.getElementById("file"); /* Recupère l'input type file pour utiliser sa valeur. */
const newImg = document.createElement('img'); /* Crée l'image qui contiendra l'aperçu image */
const titleModal = document.getElementById("title");
const catModal = document.getElementById("categorie");

/* Stockage du token dans une variable pour utilisation simplifiée. */
let userToken = window.sessionStorage.getItem("token");

/* Stockage de la requête au serveur et de sa reponse en objet javascript dans une variable URL. */
let url = fetch('http://localhost:5678/api/works').then(response => response.json());

//// Fonction qui nous permet de se deconnecter en supprimant le token. ////
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.sessionStorage.removeItem('token');
    window.location.replace('./index.html');
})

//// Fonction qui remet à zero l'aperçu des images uploadé ainsi que le titre et la catégorie. ////
const prevDisplay = () => {
    displayImg.innerHTML = "";
    titleModal.value = "";
    catModal.value = "";
    newImg.setAttribute('src', '');
    galleryBloc.style.display = "flex";
    displayImg.style.display = "none";
}

//// !!! PAGE D'ACCUEIL !!! Fonction qui crée les figures, img, figcaption avec les valeurs récupéré (GET) depuis l'API. !!! PAGE D'ACCUEIL !!! ////
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
//// Fonction qui crée les figures des nouveaux projets. ////
const createModalFigure = (figure) => {
    const figureElm = document.createElement('figure');
    const imgElm = document.createElement('img');
    const figCaptionElm = document.createElement('figcaption');
    const trashElm = document.createElement('i');
    trashElm.classList.add('delete');
    const moveElm = document.createElement('i');
    trashElm.setAttribute('class', "fa-solid fa-trash-can");
    trashElm.setAttribute('data-workid', figure.id);
    moveElm.setAttribute('class', "fa-solid fa-up-down-left-right");
    imgElm.setAttribute('src', figure.imageUrl);
    imgElm.setAttribute('alt', figure.title);
    imgElm.classList.add('gallery-img');
    figCaptionElm.innerHTML = "éditer";
    figureElm.appendChild(imgElm);
    figureElm.appendChild(figCaptionElm);
    figureElm.appendChild(trashElm);
    figureElm.appendChild(moveElm);
    galleryPhoto.appendChild(figureElm);
}

//// !!! PAGE D'ACCUEIL !!! Fonction qui récupère tous les projets présent dans l'API + appel à la fonction createFigure. !!! PAGE D'ACCUEIL !!! ////
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

//// Fonction qui crée des balises <option> dans le <select> déjà présent dans le HTML. ////
const createOptions = (cat) => {
    const option = document.createElement('option');
    option.setAttribute('value', cat.id);
    option.innerHTML = cat.name;
    categorie.appendChild(option);
}

//// Fonction qui récupère toutes les catégories présentes dans l'API. ////
const getCategory = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    const category = await response.json();
    try {
        for (let i = 0; i < category.length; i++) {
            createOptions(category[i]);
        }
    }
    catch (error) {
        console.log(error);
    }
}

//// Fonction qui modifie le background du bouton validé lorsque les inputs de l'image et du titre sont bien remplis. ////
const filledInput = () => {
    if (document.getElementById("file").value !== "" &&
        document.getElementById("title").value !== "" &&
        document.getElementById("categorie").value !== "") {
        btnValid.style.background = "#1D6154";
        btnValid.style.cursor = "pointer";
    }
}

//// Fonction qui supprime un projet en cliquant sur l'icon poubelle. ////
const deleteWorks = (id) => {

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE', /* Type de requête. */
        headers: {
            'authorization': `Bearer ${userToken}`, /* Token necessaire pour avoir l'autorisation de delete. */
            'Content-Type': 'application/json'
        }
    })

        .then(response => {
            if (response.ok) {
                console.log(response.status);
            } else {
                console.log('fetch delete error');
            }
        })
        .catch(error => console.log(error))
}

// AddEventListener :

/* Permet de mettre un aperçu de l'image que l'on a upoloadé dans une balise img crée plus haut. */
imgInput.addEventListener('change', function (event) {
    const image = URL.createObjectURL(event.target.files[0]); /* Création d'un URL pour l'image uploadé. */
    newImg.src = image; /* La source de l'image devient l'url crée. */
    displayImg.append(newImg); /* Ajout de la nouvelle image dans le bloc displayImg. */
    displayImg.style.display = "flex";
    galleryBloc.style.display = "none";
})

/* Ouverture du container des modales et suppression de projets */
openModal.addEventListener('click', async function () {
    galleryPhoto.innerHTML = '';
    gallerySection.innerHTML = "";
    modalContainer.style.display = "flex";
    modal1.style.display = "block";
    modal2.style.display = "none";

    /* Création d'une nouvelle gallerie dans la modale & utilisation de la fonction deleteWorks. */
    const response = await fetch('http://localhost:5678/api/works');
    const projects = await response.json();

    try {
        for (let i = 0; i < projects.length; i++) {
            /* Figures modales. */
            const figureElm = document.createElement('figure');
            const imgElm = document.createElement('img');
            const figCaptionElm = document.createElement('figcaption');
            const trashElm = document.createElement('i');
            trashElm.classList.add('delete');
            const moveElm = document.createElement('i');
            trashElm.setAttribute('class', "fa-solid fa-trash-can")
            trashElm.setAttribute('data-workid', projects[i].id)
            moveElm.setAttribute('class', "fa-solid fa-up-down-left-right")
            imgElm.setAttribute('src', projects[i].imageUrl);
            imgElm.setAttribute('alt', projects[i].title);
            imgElm.classList.add('gallery-img')
            figCaptionElm.innerHTML = "éditer";
            figureElm.appendChild(imgElm);
            figureElm.appendChild(figCaptionElm);
            figureElm.appendChild(trashElm);
            figureElm.appendChild(moveElm);
            galleryPhoto.appendChild(figureElm);

            /* Figures galerie actualisés sans reload. */
            const figureElm2 = document.createElement('figure');
            const imgElm2 = document.createElement('img');
            const figCaptionElm2 = document.createElement('figcaption');
            imgElm2.setAttribute('src', projects[i].imageUrl);
            imgElm2.setAttribute('alt', projects[i].title);
            figCaptionElm2.innerHTML = projects[i].title;
            figureElm2.appendChild(imgElm2);
            figureElm2.appendChild(figCaptionElm2);
            gallerySection.appendChild(figureElm2);

            /* Suppression d'un projet avec récuperation de l'id. */
            trashElm.addEventListener("click", (event) => {
                event.preventDefault();
                const workId = event.currentTarget.getAttribute('data-workid');
                let text = "Êtes vous sur de vouloir supprimer ce projet ?";
                if (confirm(text) == true) {
                    deleteWorks(workId);
                    figureElm.remove();
                    figureElm2.remove();
                    alert('Projet supprimé avec succès !');
                } else {
                    alert('Suppression annulée !');
                }
            })
        }
    }
    catch (error) {
        console.log(error);
    }
})

//// Fonction qui permet d'ajouter un nouveau projet. ////
myForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    /* Nous stockons ici les valeurs entrées dans nos input type file et text ainsi que l'option. */
    const image = document.getElementById("file").files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("categorie").value;

    /* [Crée un nouvel objet clé + valeur] ; FormData (FormData object) simplifie la requête, nous n'avons pas a spécifié d'headers, encoding, etc. */
    const formData = new FormData();

    /* Nous stockons ici les valeurs dans ce nouvel objet formData. */
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', parseInt(category));

    fetch('http://localhost:5678/api/works', {
        method: 'POST', /* Type de requête. */
        headers: {
            'authorization': `Bearer ${userToken}` /* Token necessaire pour avoir l'autorisation de poster. */
        },
        body: formData /* Corps de la requête avec image, title, categorie. */
    })
        .then(res => {
            if (res.ok) {
                /* Si la reponse du serveur est ok. */
                /* Création de la nouvelle figure page d'accueil avec les valeurs de l'utilisateur.*/
                const workAdded = document.createElement('figure');
                const imgAdded = document.createElement('img');
                const figcaption = document.createElement('figcaption');
                imgAdded.setAttribute('alt', title);
                imgAdded.setAttribute('src', newImg.src);
                figcaption.setAttribute('id', category);
                figcaption.innerHTML = title;
                workAdded.appendChild(imgAdded);
                workAdded.appendChild(figcaption);
                gallerySection.appendChild(workAdded);
                alert('Projet ajouté avec succès !');
            }
            return res.json();
        })
        .then(data => {
            /* Création de la nouvelle figure modale 1. */
            createModalFigure(data)

        })
        .catch(error => console.log(error))
        /* Retour sur la première modale après envoi du nouveau projet. */
        modalContainer.style.display = "flex";
        modal1.style.display = "block";
        modal2.style.display = "none";
})

/* Ouverture de la modale pour ajouter un projet. */
addBtn.addEventListener('click', function () {
    modal1.style.display = "none";
    modal2.style.display = "block";
    prevDisplay();
})
/* Retour à la première modale. */
lastModal.addEventListener('click', function () {
    modal1.style.display = "block";
    modal2.style.display = "none";
    prevDisplay();
})
/* Fermeture des modales via icon croix. */
closeModal.addEventListener('click', function () {
    modalContainer.style.display = "none";
    prevDisplay();
})
closeModal2.addEventListener('click', function () {
    modalContainer.style.display = "none";
    prevDisplay();
})
/* Fermeture des modales en cliquant hors de celles-ci. */
window.onclick = function (event) {
    if (event.target == modalContainer) {
        modalContainer.style.display = "none";
        prevDisplay();
    }
}

// Appel fonctions :
getAll();
getCategory();


