//URL search param

var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  var idKanap = search_params.get('id');
  console.log("id de l'aticle :" + idKanap);
}

//On fetch pour récupérer les données de l'API en fonction de l'id produit
fetch("http://localhost:3000/api/products/" + idKanap)
    .then(function(res) {
        if (res.ok) {
            //conversion format json
            return res.json();
        }
    })
    .then (async function(value) {
        console.log(value);
        //récupération valeurs dans variable article
        var article = await value;
        //appel de la fonction displayProductById avec paramètre article
        displayProductById(article) ;
    })
    .catch(function(err) {
        console.log("erreur dans le script");
        alert("oups, une erreur est survenue");
    });

//Affichage du produit dans la page produit en modifiant le DOM    
function displayProductById(article) {

    //Alimentation des éléments du DOM par innerHTML
    document.querySelector("title").innerHTML = article.name;
    document.getElementById("title").innerHTML = article.name;
    document.getElementById("price").innerHTML = article.price;
    document.getElementById("description").innerHTML = article.description; 

    //Ajout élément img dans le DOM
    let imgElement = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgElement);
    imgElement.src = article.imageUrl;
    imgElement.alt = article.altTxt;

   //Ajout élément option couleur dans le DOM
   for (let i of article.colors) {
   let optionElement = document.createElement("option");
   document.getElementById("colors").appendChild(optionElement);
   optionElement.value = i;
   optionElement.innerHTML = i;
   }
   //appel de la fonction addProductCart avec un paramètre article
   addProductCart(article);       
}

//Gestion du panier
function addProductCart (article) {
    //Récupération du bouton ajout au panier
    const buttonCart = document.getElementById("addToCart");
    //Ecouter l'évenement au clic sur le bouton
    buttonCart.addEventListener("click", function() {

        //Récupération de la couleur et de la quantité de l'article choisi
        let colorPicked = document.getElementById("colors").value;
        let quantityPicked = document.getElementById("quantity").value;

        //Conditionnement de l'évènement si couleur et quantité valide
        if (quantityPicked != 0 && quantityPicked <= 100 && quantityPicked > 0 && colorPicked != 0) {
        
            //Récupération des données produit à ajouter au panier, sous forme d'objet
            let kanapChoice = {
                color : colorPicked,
                quantity : Number(quantityPicked),
                id : idKanap,
                name : article.name,
                price : article.price,
                image : article.imageUrl,
                description : article.description,
                texteAlt : article.altTxt,
            };

            //Initialisation du localStorage
            let dataLocalStorage = JSON.parse(localStorage.getItem("kanapChoice"));

            
            //Ajout des articles au panier
            //Lorsque le localStorage est vide (premier ajout)
            if (dataLocalStorage === null) {
                dataLocalStorage = [];
                dataLocalStorage.push(kanapChoice);
                localStorage.setItem("kanapChoice", JSON.stringify(dataLocalStorage));
                alert ("Votre premier article vous attend dans le panier !");
                console.table(dataLocalStorage);
            } 
            //Lorque que le localStorage n'est pas vide
            else {
                //Vérification des doublons présents dans le panier (id et couleur)
                let checkItem = dataLocalStorage.find(element => element.id === idKanap && element.color === colorPicked);

                //Si l'article est déjà présent à l'identique dans le panier
                if (checkItem) {
                    let NewQuantity = 
                    parseInt(kanapChoice.quantity) + parseInt(checkItem.quantity);
                    checkItem.quantity = NewQuantity;
                    localStorage.setItem("kanapChoice", JSON.stringify(dataLocalStorage));
                    console.table(dataLocalStorage);
                }else{
                    //si l'article n'est pas encore présent à l'identique dans le panier
                    dataLocalStorage.push(kanapChoice);
                    localStorage.setItem("kanapChoice", JSON.stringify(dataLocalStorage));
                    alert ("Nouvel article ajouté au panier !");
                    console.table(dataLocalStorage);

                }

            }

        }else{
            alert("Veuillez sélectionner une couleur et une quantité valide");
        }

    });
}
