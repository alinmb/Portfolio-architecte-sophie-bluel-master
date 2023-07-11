//// Récupération des élements HTML dans le JS. ////

/* Récupération de la section gallerie ou les images se display.*/
const gallerySection = document.querySelector('.gallery');
/* Récupération des boutons pour modifier leur backgroundColor via fonction btnFocus. */
const btnAll = document.querySelector('.btnAll');
const btnObj = document.querySelector('.btnObj');
const btnApp = document.querySelector('.btnApp');
const btnHotels = document.querySelector('.btnHotels');
/* Stockage du fetch et de sa réponse en objet javascript dans une variable, facilite la réutilisation */
/*const url = fetch('http://localhost:5678/api/works').then(response => response.json());*/

//// Fonction qui ajoute et supprime la class "activeBtn"  ////
const btnFocus = (btn) => {
    document.querySelector('.activeBtn')?.classList.remove('activeBtn'); /* Le "?" sert à indiquer que si .activeBtn n'existe pas, aucune erreur ne s'affiche. */
    btn.classList.add('activeBtn');
}

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
async function getAll () {
    gallerySection.innerHTML = ""; /* On supprime tout les élements présent dans la gallerie. */
    btnFocus(btnAll) /* On focus le bouton de la section ou nous nous trouvons. */
    /* Récuperation des données depuis l'API, nous bouclons dans les données et récuperons chaque projets présent 1 à 1. */
    const response = await fetch('http://localhost:5678/api/works');
    const projects = await response.json();
    
    try {
        for (i = 0; i < projects.length; i++) {
            let eachProject = `
                <figure>
                    <img src="${projects[i].imageUrl}" alt="${projects[i].title}" class="gallery-img">
                    <figcaption>${projects[i].title}</figcaption>
                </figure>
            `;
            gallerySection.insertAdjacentHTML('beforeend', eachProject);
        }
    }
    catch (error) {
        console.log(error)
    }
    
        
}

//// FILTRES : Récupération des Objets (id:1), des Appartements (id:2), des Hôtels & restaurants (id:3) ////

// Objets :
async function getObjects () {
    gallerySection.innerHTML = "";
    btnFocus(btnObj)
    const response = await fetch('http://localhost:5678/api/works');
    const projectsObjects = await response.json();

    try {
        for (i = 0; i < projectsObjects.length; i++) {
            if (projectsObjects[i].categoryId === 1) {
                createFigure(projectsObjects[i])
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

// Appartements :
async function getApp () {
    gallerySection.innerHTML = "";
    btnFocus(btnApp)
    const response = await fetch('http://localhost:5678/api/works');
    const projectsAppart = await response.json();

    try {
        for (i = 0; i < projectsAppart.length; i++) {
            if (projectsAppart[i].categoryId === 2) {
                createFigure(projectsAppart[i])
            } 
        }
    }
    catch (error) {
        console.log(error)
    }
}

// Hôtels & restaurants :
async function getHotels () {
    gallerySection.innerHTML = "";
    btnFocus(btnHotels)
    const response = await fetch('http://localhost:5678/api/works');
    const projectsHotelsRest = await response.json();

    try {
        for (i = 0; i < projectsHotelsRest.length; i++) {
            if (projectsHotelsRest[i].categoryId === 3) {
                createFigure(projectsHotelsRest[i])
            } 
        }
    }
    catch (error) {
        console.log(error)
    }
}

// Appel fonctions :
getAll()