const gallerySection = document.querySelector('.gallery');
const btnAll = document.querySelector('.btnAll');
const btnObj = document.querySelector('.btnObj');
const btnApp = document.querySelector('.btnApp');
const btnHotels = document.querySelector('.btnHotels');

const btnFocus = (btn) => {
    document.querySelector('.activeBtn')?.classList.remove('activeBtn');
    btn.classList.add('activeBtn');
}

function createFigure(link) {
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

let url = fetch('http://localhost:5678/api/works').then(response => response.json());

const getAll = () => {
    gallerySection.innerHTML = "";
    btnFocus(btnAll)
    url.then((data) => {
        for (project of data) {
            createFigure(project)
            console.log(project)
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}
getAll()

/***** OBJETS Filtrés *****/
const getObjects = () => {
    gallerySection.innerHTML = "";
    btnFocus(btnObj)
    url.then((data) => {
        for (project2 of data) {
            project2.categoryId === 1 ? createFigure(project2) : 'Fichier introuvable';  
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}

/***** APPARTEMENTS Filtrés *****/
const getApp = () => {
    gallerySection.innerHTML = "";
    btnFocus(btnApp)
    url.then((data) => {
        for (project3 of data) {
            project3.categoryId === 2 ? createFigure(project3) : 'Fichier introuvable';  
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}

/***** HÔTELS Filtrés *****/
const getHotels = () => {
    gallerySection.innerHTML = "";
    btnFocus(btnHotels)

    url.then((data) => {
        for (project4 of data) {
            project4.categoryId === 3 ? createFigure(project4) : 'Fichier introuvable'; 
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}

