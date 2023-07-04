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
            /*console.log(project)*/
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
const closeModal2 = document.querySelector('.close-modal2')
const galleryPhoto = document.querySelector('.gallery-photo')

const modal1 = document.querySelector('.modal1');
const addBtn = document.querySelector('.add-btn');

const modal2 = document.querySelector('.modal2');
const lastModal = document.querySelector('.last-modal')

// Creation des galerie des modales
function createGalerie(link) {
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
closeModal.addEventListener('click', function () {
    modalContainer.style.display = "none";
})
closeModal2.addEventListener('click', function () {
    modalContainer.style.display = "none";
})

window.onclick = function (event) {
    if (event.target == modalContainer) {
        modalContainer.style.display = "none";
    }
}

openModal.addEventListener('click', function () {
    galleryPhoto.innerHTML = "";
    modalContainer.style.display = "flex";
    modal1.style.display = "block";
    modal2.style.display = "none";
    // Affichage de la gallerie dans la modale
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

lastModal.addEventListener('click', function () {
    modal1.style.display = "block";
    modal2.style.display = "none";
})

// Crée les catégories 

const categorie = document.querySelector('#categorie');

function createOptions(cat) {
    const option = document.createElement('option');
    option.setAttribute('value', cat.id);
    option.innerHTML = cat.name;
    categorie.appendChild(option);
}

function getOptions() {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then((data) => {
            for (cate of data) {
                createOptions(cate)
                /*console.log(cate)*/
            }
        })
        .catch(error => console.log("FETCH OPTIONS ERROR"))
}

getOptions();

const btnValid = document.querySelector('.btn-valid');



// async function addWorks () {

/*const works = {
    image: (document.getElementById("file").files[0]),
    title: (document.getElementById("title").value),
    category: (document.getElementById("categorie").value)
  }

  const chargeUtile = JSON.stringify(works)*/
//   const image = document.getElementById("file").files[0];
//   const title = document.getElementById("title").value;
//   const category = document.getElementById("categorie").value;

//   const formData = new FormData();

//   formData.append('image', image)
//   formData.append('title', title)
//   formData.append('category', category)

//       fetch('http://localhost:5678/api/works', {
//         method : 'POST',
//         headers: {
//             'accept': 'application/json',
//             'Content-Type': 'multipart/form-data',
//             'authorization': `Bearer ${userToken}`
//         },
//         body: formData
//       })
//       .then(res => {
//         if (res.ok) {
//             return res.json()
//         } else {
//             console.log('FETCH ERROR')
//         }
//       })
//       .then(data => console.log(data))
//       .catch(err => console.log(err))
// }


let userToken = window.sessionStorage.getItem("token");

function filledInput() {
    if (document.getElementById("title").value !== "" && document.getElementById("file").files[0] !== "") {
       btnValid.style.background = "#1D6154";
    }  else {
        btnValid.style.background = "#A7A7A7";
    }
 }

function addWorks() {

    const image = document.getElementById("file").files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("categorie").value;

    const formData = new FormData();

    formData.append('image', image)
    formData.append('title', title)
    formData.append('category', parseInt(category))

    // console.log(image)
    // console.log(formData)

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${userToken}`
        },
        body: formData
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    const workAdded = document.createElement('figure');
    const imgAdded = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    imgAdded.setAttribute('alt', title);
    figcaption.setAttribute('id', category);
    figcaption.innerHTML = title;

    gallerySection.appendChild(workAdded);
    gallerySection.appendChild(imgAdded);

    
}

btnValid.addEventListener('click', function (event) {
    event.preventDefault();
    addWorks();
})


// function createWorks () {
//     const workAdded = document.createElement('figure');
//     const imgAdded = document.createElement('img');
//     imgAdded.setAttribute('alt', title);
//     const figcaption = document.createElement('figcaption');
//     figcaption.setAttribute('id', category);
//     figcaption.innerHTML = title;

//     gallerySection.appendChild(workAdded);
// }