// dom selection

const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey='DcoPgqxyqC9whXmNXVY30R4Gyi61y7S_4kqv0HAaKPY&elcYau8inz1AiZa1MEXlOswtSTVsBJ7yQLDxvU85a1Y';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// display Photos

// helper function to set attributes in dom
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


function displayPhotos(){
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
    console.log('scrolled');
})

// on load

getPhotos();
