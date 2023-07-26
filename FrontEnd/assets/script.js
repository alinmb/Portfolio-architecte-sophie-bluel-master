//// Récupération des élements HTML dans le JS. ////

/* Récupération de la section gallerie où les images se display.*/
const gallerySection = document.querySelector('.gallery');
/* Récupération des boutons pour modifier leur backgroundColor via fonction btnFocus. */
const btnAll = document.querySelector('.btnAll');
const btnObj = document.querySelector('.btnObj');
const btnApp = document.querySelector('.btnApp');
const btnHotels = document.querySelector('.btnHotels');
const filters = document.querySelectorAll('.filter');

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
     /* On focus le bouton de la section ou nous nous trouvons. */
    /* Récuperation des données depuis l'API, nous bouclons dans les données et récuperons chaque projets présent 1 à 1. */    
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const projects = await response.json();

        for (i = 0; i < projects.length; i++) {
            createFigure(projects[i]);
        }
    }
    catch (error) {
        console.log(error);
    }    
}

//// FILTRES : ////
for (let filterIndex = 0; filterIndex < filters.length ; filterIndex++) {

    filters[filterIndex].addEventListener('click', async function (event) {
        /* Je recupère le dataId de l'élément target. */
        let dataId = event.currentTarget.getAttribute('data-id');
        /* Je recupère la class special, la supprime et l'ajoute au bouton sur lequel je suis. */
        document.querySelector('.special')?.classList.remove('special');
        filters[filterIndex].classList.add('special');
        /* Je remet à zéro la galerie. */
        gallerySection.innerHTML = "";
        /* Je fais ma requête afin de récupérer les travaux et les filtrer. */
        try {
            const response = await fetch('http://localhost:5678/api/works');
            const works = await response.json();
            for (let workIndex = 0; workIndex < works.length; workIndex++) {
                if (works[workIndex].categoryId == dataId || dataId == 0) {
                    createFigure(works[workIndex]);
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    })
}

getAll();