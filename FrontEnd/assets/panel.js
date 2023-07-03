const gallerySection = document.querySelector('.gallery');

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
    url.then((data) => {
        for (project of data) {
            createFigure(project)
            //console.log(project)
        }
    })
        .catch(error => console.log("FETCH ERROR"))
}
getAll()

// LOGOUT

const logoutBtn = document.querySelector('.logout-btn')
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.sessionStorage.removeItem('token');
    window.location.replace('./index.html');
  })

// MODALES

const modalContainer = document.querySelector('.modal-container')
const openModal = document.querySelector('#openModal')
const closeModal = document.querySelector('.close-modal')
const galleryPhoto = document.querySelector('.gallery-photo')

const modal1 = document.querySelector('.modal1');
const addBtn = document.querySelector('.add-btn');

const modal2 = document.querySelector('.modal2');


function createGalerie(link) {
    const figureElm = document.createElement('figure');
    const imgElm = document.createElement('img');
    const figCaptionElm = document.createElement('figcaption');
    const trashElm = document.createElement('i');
    trashElm.setAttribute('class',"fa-solid fa-trash-can")
    imgElm.setAttribute('src', link.imageUrl);
    imgElm.setAttribute('alt', link.title);
    imgElm.classList.add('gallery-img')
    figCaptionElm.innerHTML = "éditer";
    figureElm.appendChild(imgElm);
    figureElm.appendChild(figCaptionElm);
    figureElm.appendChild(trashElm);
    galleryPhoto.appendChild(figureElm);
}


openModal.addEventListener('click', function () {
    galleryPhoto.innerHTML = "";
    modalContainer.style.display = "flex";
    modal1.style.display = "block";

    url.then((data) => {
        for (project of data) {
            createGalerie(project)
            //console.log(project)
        }
    })
        .catch(error => console.log("FETCH ERROR"))
 
})
addBtn.addEventListener('click', function () {
    modal1.style.display = "none";
    modal2.style.display = "block";
})
closeModal.addEventListener('click', function () {
    modalContainer.style.display = "none";
})