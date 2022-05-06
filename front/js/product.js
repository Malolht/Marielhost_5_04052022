
/**
 *Récupération de l'URL et de la variable (id)
 *l'id fait le lien entre un produit de la page d’accueil et la page Produit 
 */

let str = window.location.href ;
let url = new URL(str);
let search_params = new URLSearchParams(url.search); 
if(search_params.has("id")) {
  var idKanap = search_params.get("id");
  //affichage de l'id concerné dans la console
  console.log("id du produit :" + idKanap)
}

//Appel de la fonction
getProductById();

//Récupération des informations du produit selon son id
function getProductById() {
    fetch("http://localhost:3000/api/products/" + idKanap)
    .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    })
    .then(async function(value) {
        //réupération des données dans la variable article     
        var article = await value;
        console.log(article);
        //appel de la fonction displayKanap en lui passant le paramètre (article)
        displayKanap(article);
      })
    .catch(function(err) {
        console.log("une erreur est survenue avec le serveur");
    });
}

//Ajout des données du produit dans le DOM
function displayKanap(article){

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

    //Appel de la fonction addProduct en lui passant le paramètre (article)
    addProduct(article)
}

//Ajout d'un produit au panier
function addProduct(article) {

  //Récupération du bouton, de la quantité et de la couleur GETELEMENTBYID ???
  const cartButton = document.querySelector("#addToCart");
  const colorOption = document. querySelector("#colors");
  const quantityInput = document.querySelector("#quantity");


  //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  cartButton.addEventListener('click', function onClick(event) {

    event.preventDefault();

    //Récupération de la couleur de l'article
    let colorChoice = colorOption.value;

    //Récupération de la quantité de l'article
    let quantityChoice = quantityInput.value;

    //Conditionnement de l'évènement
    if (colorChoice !=0 && quantityChoice >= 1 && quantityChoice <= 100 && quantityChoice !=0){

      //Si condition respectée, création des données objet dataProduct
      let dataProduct = {
        id : idKanap,
        color : colorChoice,
        quantity: quantityChoice,
        name : article.name,
        price : article.price,
        image : article.image,
        description : article.description,
        texteAlt : article.altTxt,   
      };
      

      //Création du LocalStorage avec les données dataProduct et conversion des données en chaine de caractères
      let myStorage = JSON.parse(localStorage.getItem("dataProduct"));

      //Importation dans le local storage
      //Si le localStorage contient au moins un produit
      if (myStorage) {

        //Vérification des doublons présents dans le panier (id et couleur)
        let checkItem = myStorage.find(element => element.id === idKanap && element.color === colorChoice);
        //Si doublon, on incrémente la quantité dans le localStorage
        if (checkItem) {
          let NewQuantity = 
          parseInt(dataProduct.quantity) + parseInt(checkItem.quantity);
          checkItem.quantity = NewQuantity;
          localStorage.setItem("dataProduct", JSON.stringify(myStorage));
          console.table(myStorage);
        }

        //Si le produit commandé n'est pas dans le panier
        else {
          myStorage.push(dataProduct);
          localStorage.setItem("dataProduct", JSON.stringify(myStorage));
          alert ("Nouveau produit ajouté au panier !");
          console.table(myStorage);
        } 
      }

      //Si le localStorage est vide
      else {
        myStorage = [];
        myStorage.push(dataProduct);
        localStorage.setItem("dataProduct", JSON.stringify(myStorage));
        alert ("Votre premier article vous attend dans le panier !");
      }

    }
    else alert ("Oups ! Veuillez séléctionner une couleur et une quantité comprise entre 1-100");
     
  });

}


