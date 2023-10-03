// dom selection

const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
let ready = false;
let imgsLoaded = 0;
let totalImg = 0;
let photosArray = [];
let intialLoad = true

//Unsplash API
let count = 5;
const apiKey='DcoPgqxyqC9whXmNXVY30R4Gyi61y7S_4kqv0HAaKPY&elcYau8inz1AiZa1MEXlOswtSTVsBJ7yQLDxvU85a1Y';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imgLoaded(){
    imgsLoaded++;
    console.log(imgsLoaded);
    if(imgsLoaded === totalImg){
        ready = true;
        loader.hidden = true;
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// display Photos

// helper function to set attributes in dom
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


function displayPhotos(){
    imgsLoaded = 0;
    totalImg = photosArray.length;
    console.log('total imgs', totalImg);
    // run for each
    photosArray.forEach((photo)=>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })

        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listner,check when each photo is finished loading
        img.addEventListener('load', imgLoaded)
        // put <img> inside <a>, then put both inside the imageContainer element
        item.appendChild(img);
        imgContainer.appendChild(item)
    });
}

// get photos

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (error) {
        //caatch error
    };
}

// scrolling function 
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})

// on load

getPhotos();
