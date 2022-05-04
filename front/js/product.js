
//Récupération de l'URL et de la variable (id) permettant de faire le lien entre un produit de la page d’accueil et la page Produit 
let str = window.location.href ;
let url = new URL(str);
let search_params = new URLSearchParams(url.search); 
if(search_params.has("id")) {
  var idKanap = search_params.get("id");
  //affichage de l'id concerné dans la console
  console.log("id du produit :" + idKanap)
}

//Récupéreration des informations du produit selon son id
async function getProducts() {
    return fetch("http://localhost:3000/api/products/" + idKanap)
    .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    })
    .then(function(value) {
        console.log(value);
        return value;
      })
    .catch(function(err) {
        console.log("une erreur est survenue avec le serveur");
    });
}

async function displayKanap() {

    //récupération des données objet dans la constante article
    const article = await getProducts();

    //ajout des éléments dans le DOM
    let imgObject = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgObject);
    imgObject.src = article.imageUrl;
    imgObject.alt = article.altTxt;

    let nameObject = document.getElementById("title");
    nameObject.innerHTML = article.name;

    let priceObject = document.getElementById("price");
    priceObject.innerHTML = article.price;

    let descriptionObject = document.getElementById("description");
    descriptionObject.innerHTML = article.description;

    let titleObject = document.querySelector("title");
    titleObject.innerHTML = article.name;

    //Ajout du choix de couleur avec une boucle dans la constante article, ciblé sur le tableau "colors"
    for (let i of article.colors) {
        let colorObject = document.createElement("option");
        document.querySelector("#colors").appendChild(colorObject);
        colorObject.value = i;
        colorObject.innerHTML = i;
    }
}

//Appel de la fonction displayKanap
displayKanap();