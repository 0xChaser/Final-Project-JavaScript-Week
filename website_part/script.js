const BASE_URL = "https://api.thecatapi.com/v1";

const randomCatsContainer = document.querySelector('#random-cats-container');
const favoritesCatsContainer = document.querySelector('#favorites-cats-container');


const getRandomCats = async() => {
    const response = await fetch(`${BASE_URL}/images/search?limit=10`)
    const data = await response.json();
    displayCats(data, randomCatsContainer, false)
}

const displayCats = (cats, container, isFavorite) =>{
    container.innerHTML = '';
    cats.forEach(cat=>{
        const catDiv = document.createElement("div");
        catDiv.classList.add("cat-item");

        const img = document.createElement("img")
        img.classList.add("cat-image");
        img.src= cat.url;

        const favButton = document.createElement("button");
        favButton.classList.add("fav-button");
        favButton.innerText = isFavorite ? "Unlike" : "Like";
        favButton.addEventListener("click", ()=>{
            if(isFavorite){
                removeFavorites(cat.id);
            }else{
                addFavorites(cat)
            }
        });
        catDiv.appendChild(img);
        catDiv.appendChild(favButton);
        container.appendChild(catDiv);
    })
}

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const addFavorites = (cat) =>{
    if(!favorites.some(fav => fav.id === cat.id)){
        favorites.push(cat);
        localStorage.setItem("favorites", JSON.stringify(favorites))
        displayFavorites();
        Toastify({
            text: "Chat ajouté aux favoris",
            backgroundColor: "#232876", 
            color: "white",
            gravity: "top",             
            position: "center",            
            duration: 5000             
        }).showToast();
    }
}

const removeFavorites = (catId) => {
    favorites = favorites.filter(cat => cat.id !== catId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    Toastify({
        text: "Chat retiré des favoris",
        backgroundColor: "#232876", 
        color: "white",
        gravity: "top",             
        position: "center",            
        duration: 5000            
    }).showToast();
};

const displayFavorites = () => {
    favoritesCatsContainer.innerHTML = '';
    if (favorites.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty');
        emptyMessage.innerText = "Aucun chat en favoris";
        favoritesCatsContainer.appendChild(emptyMessage);
    } else {
        displayCats(favorites, favoritesCatsContainer, true);
    }
};


getRandomCats();
displayFavorites();