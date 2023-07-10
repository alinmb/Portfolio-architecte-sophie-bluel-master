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

//// Fonction qui remet à zero l'aperçu des images uploadé. ////
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

//// !!! PAGE D'ACCUEIL !!! Fonction qui récupère tous les projets présent dans l'API + appel à la fonction createFigure. !!! PAGE D'ACCUEIL !!! ////
const getAll = () => {
    gallerySection.innerHTML = ""; /* On supprime tout les élements présent dans la gallerie. */
    /* Récuperation des données depuis l'API, nous bouclons dans les données et récuperons chaque projets présent 1 à 1. */
    url.then((data) => {
        for (project of data) {
            createFigure(project); /* Création des figures, img, figcaption grâce à la fonction. */
            console.log(project.id)
        }
    })
        .catch(error => console.log(error))
}

//// !!! MODALE 2 !!! Fonction qui crée les figures présentes dans la seconde modale.. !!! MODALE 2 !!! ////
// const createGallery = (link) => {
//     const figureElm = document.createElement('figure');
//     const imgElm = document.createElement('img');
//     const figCaptionElm = document.createElement('figcaption');
//     const trashElm = document.createElement('i');
//     trashElm.classList.add('delete');
//     const moveElm = document.createElement('i');
//     trashElm.setAttribute('class', "fa-solid fa-trash-can")
//     moveElm.setAttribute('class', "fa-solid fa-up-down-left-right")
//     imgElm.setAttribute('src', link.imageUrl);
//     imgElm.setAttribute('alt', link.title);
//     imgElm.classList.add('gallery-img')
//     figCaptionElm.innerHTML = "éditer";
//     figureElm.appendChild(imgElm);
//     figureElm.appendChild(figCaptionElm);
//     figureElm.appendChild(trashElm);
//     figureElm.appendChild(moveElm);
//     galleryPhoto.appendChild(figureElm);

// }


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
    if (document.getElementById("title").value !== "" && document.getElementById("categorie").value !== "") {
        btnValid.style.background = "#1D6154";
        btnValid.style.cursor = "pointer";
    }
}

//// Fonction qui permet d'ajouter un nouveau projet. ////
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
        .then(res => {
            if (res.ok) 
            res.json()
            alert('Nouveau projet ajouté avec succès !');
        }) /* On recupère le resultat de la promesse converti en objet javascript. */
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

//// Fonction qui supprime un projet en cliquant sur l'icon poubelle. ////
const deleteWorks = (id) => {

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE', /* Type de requête. */
        headers: {
            'authorization': `Bearer ${userToken}`, /* Token necessaire pour avoir l'autorisation de poster. */
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log(response.status);
                alert('Projet supprimé avec succès !');
            } else {
                console.log('fetch delete error')
            }
        })
        .catch(error => console.log(error))
}

//// Fonction qui nous permet de se deconnecter. ////
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.sessionStorage.removeItem('token');
    window.location.replace('./index.html');
})

// AddEventListener :

/* Ajout du nouveau projet. */
myForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addWorks();
    setTimeout(() => {
        window.location.reload(true);
    }, 2000);
    /*window.location.reload()*/
})

/* Ouverture du container des modales */
openModal.addEventListener('click', function () {
    galleryPhoto.innerHTML = "";
    modalContainer.style.display = "flex";
    modal1.style.display = "block";
    modal2.style.display = "none";

/* Création d'une nouvelle gallerie dans la modale & utilisation de la fonction supprimer. */
    url.then((data) => {
        for (project of data) {
            const figureElm = document.createElement('figure');
            const imgElm = document.createElement('img');
            const figCaptionElm = document.createElement('figcaption');
            const trashElm = document.createElement('i');
            trashElm.classList.add('delete');
            const moveElm = document.createElement('i');
            trashElm.setAttribute('class', "fa-solid fa-trash-can")
            trashElm.setAttribute('idWork', project.id)
            moveElm.setAttribute('class', "fa-solid fa-up-down-left-right")
            imgElm.setAttribute('src', project.imageUrl);
            imgElm.setAttribute('alt', project.title);
            imgElm.classList.add('gallery-img')
            figCaptionElm.innerHTML = "éditer";
            figureElm.appendChild(imgElm);
            figureElm.appendChild(figCaptionElm);
            figureElm.appendChild(trashElm);
            figureElm.appendChild(moveElm);
            galleryPhoto.appendChild(figureElm);

            trashElm.addEventListener("click", (event) => {
                event.preventDefault();
                const idWork = event.currentTarget.getAttribute('idWork');
                deleteWorks(idWork);
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);
            })
        }
    })
        .catch(error => console.log(error));
})

/* Ouverture de la modale pour ajouter un projet. */
addBtn.addEventListener('click', function () {
    prevDisplay();
    modal1.style.display = "none";
    modal2.style.display = "block";
    
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

/* Permet de mettre un aperçu de l'image que l'on a upoloadé dans une balise img crée plus haut. */
imgInput.addEventListener('change', function (event) {
    const image = URL.createObjectURL(event.target.files[0]);
    newImg.src = image;
    displayImg.append(newImg)
    displayImg.style.display = "flex";
    galleryBloc.style.display = "none";
})

// Appel fonctions :
getAll();
getCategory();



// let result = 
// `
//     <figure>
//         <img src="${project.imageUrl}" alt="${project.title}" class="gallery-img">
//         <figcaption>éditer</figcaption>
//         <i class="fa-solid fa-trash-can delete" idWork="${project.id}"></i>
//         <i class="fa-solid fa-up-down-left-right"></i>
//     </figure>
// `;