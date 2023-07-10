//// Récupération des élements HTML dans le JS. ////

/* Récupération de la section gallerie ou les images se display.*/
const gallerySection = document.querySelector('.gallery');
/* Récupération des boutons pour modifier leur backgroundColor via fonction btnFocus. */
const btnAll = document.querySelector('.btnAll');
const btnObj = document.querySelector('.btnObj');
const btnApp = document.querySelector('.btnApp');
const btnHotels = document.querySelector('.btnHotels');
/* Stockage du fetch et de sa réponse en objet javascript dans une variable, facilite la réutilisation */
const url = fetch('http://localhost:5678/api/works').then(response => response.json());

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
const getAll = () => {
    gallerySection.innerHTML = ""; /* On supprime tout les élements présent dans la gallerie. */
    btnFocus(btnAll) /* On focus le bouton de la section ou nous nous trouvons. */
    /* Récuperation des données depuis l'API, nous bouclons dans les données et récuperons chaque projets présent 1 à 1. */
    url.then((data) => {
        for (project of data) {
            let eachProject = `
                <figure>
                    <img src="${project.imageUrl}" alt="${project.title}" class="gallery-img">
                    <figcaption>${project.title}</figcaption>
                </figure>
            `;
            gallerySection.insertAdjacentHTML('beforeend', eachProject);
        }
    })
        .catch(error => console.log(error))
}

//// FILTRES : Récupération des Objets (id:1), des Appartements (id:2), des Hôtels & restaurants (id:3) ////

// Objets :
const getObjects = () => {
    gallerySection.innerHTML = "";
    btnFocus(btnObj)
    url.then((data) => {
        for (project2 of data) {
            project2.categoryId === 1 ? createFigure(project2) : 'Fichier introuvable';
        }
    })
        .catch(error => console.log(error))
}

// Appartements :
const getApp = () => {
    gallerySection.innerHTML = "";
    btnFocus(btnApp)
    url.then((data) => {
        for (project3 of data) {
            project3.categoryId === 2 ? createFigure(project3) : 'Fichier introuvable';
        }
    })
        .catch(error => console.log(error))
}

// Hôtels & restaurants :
const getHotels = () => {
    gallerySection.innerHTML = "";
    btnFocus(btnHotels)

    url.then((data) => {
        for (project4 of data) {
            project4.categoryId === 3 ? createFigure(project4) : 'Fichier introuvable';
        }
    })
        .catch(error => console.log(error))
}

// Appel fonctions :
getAll()