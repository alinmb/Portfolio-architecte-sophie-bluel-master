const gallerySection = document.querySelector('.gallery');
const btnAll = document.querySelector('.btnAll');
const btnObj = document.querySelector('.btnObj');
const btnApp = document.querySelector('.btnApp');
const btnHotels = document.querySelector('.btnHotels');

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
    url.then((data) => {
        for (project of data) {
            createProject();
            console.log(project)
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}
getAll()

function createProject() {
    createFigure(project)
}
// Btn AddEventListener
btnAll.addEventListener('click', function () {
    gallerySection.innerHTML = "";
    getAll()
})

/***** OBJETS Filtrés*****/
const getObjects = () => {
    url.then((data) => {
        for (project2 of data) {
            createObjets();
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}

function createObjets() {
    if (project2.categoryId === 1) {
        createFigure(project2)
    }
}
// Btn AddEventListener
btnObj.addEventListener('click', function () {
    gallerySection.innerHTML = "";
    getObjects()
})

/***** APPARTEMENTS Filtrés*****/
const getApp = () => {
    url.then((data) => {
        for (project3 of data) {
            createApp();
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}

function createApp() {
    if (project3.categoryId === 2) {
        createFigure(project3)
    }
}
// Btn AddEventListener
btnApp.addEventListener('click', function () {
    gallerySection.innerHTML = "";
    getApp()
})

/***** HÔTELS Filtrés*****/
const getHotels = () => {
    url.then((data) => {
        for (project4 of data) {
            createHotels();
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}

function createHotels() {
    if (project4.categoryId === 3) {
        createFigure(project4)
    }
}
// Btn AddEventListener
btnHotels.addEventListener('click', function () {
    gallerySection.innerHTML = "";
    getHotels()
})