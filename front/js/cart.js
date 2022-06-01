
//Récupération des données du localStorage dans une variable
let getDataStorage = JSON.parse(localStorage.getItem("kanapChoice"));
console.table(getDataStorage);

//Requête de l'API via un paramètre id du LocalStorage (afin de récupérer le prix des articles)
async function getArticle(idLocalStorage) {
    return fetch("http://localhost:3000/api/products/" + idLocalStorage)
    .then(function(res) {
        if (res.ok) {
            //conversion format json
            return res.json();
        }
    })
    .then (function(value) {
        return value;
    })
    .catch(function(err) {
        console.log("erreur dans le script");
        alert("Une erreur est survenue avec le serveur");
    });
}

async function paramCart () {

    //Récupération de l'emplacement dans le DOM
    const cartItems = document.getElementById("cart__items");
    
    /*Affichage du contenu du panier dans la page Panier
    Si le localStorage est vide*/
    if (getDataStorage === null)  {
        cartItems.innerHTML = `<i>Votre panier est vide</i>`;

    //Si le localStorage contient des articles, on boucle dans l'array et on modifie le DOM
    } else {
        for (let i=0; i<getDataStorage.length; i++){
            //Récupération des données de l'API dans une variable
            let articleItem = await getArticle (getDataStorage[i].id);
            //Récupération du prix via l'API
            let articlePrice = (articleItem.price);
            let insertHTML = `
                <article class="cart__item" data-id="${getDataStorage[i].id}" data-color="${getDataStorage[i].color}">
                    <div class="cart__item__img">
                    <img src="${getDataStorage[i].image}" alt="${getDataStorage[i].texteAlt}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${getDataStorage[i].name}</h2>
                        <p>${getDataStorage[i].color}</p>
                        <p>${articlePrice}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${getDataStorage[i].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article> `;

            cartItems.insertAdjacentHTML("beforeend", insertHTML);
        }

        //Calcul de la quantité totale et du prix total
        let totalQuantity = 0;
        let totalPrice = 0;
        for (let i = 0; i < getDataStorage.length; i++) {

            //Récupération des données de l'API dans une variable
            let articles = await getArticle (getDataStorage[i].id);

            //Incrémentation de la quantité et du prix pour le total
            totalQuantity += getDataStorage[i].quantity;
            totalPrice += articles.price * getDataStorage[i].quantity;

        }
        
            //Ajout de la quantité total et du prix total dans le DOM Panier
            document.getElementById("totalQuantity").innerHTML = totalQuantity;
            document.getElementById("totalPrice").innerHTML = totalPrice;

            deleteArticle();
            modifyQuantity();
    }
}

//appel de la fonction asynch cart
paramCart ();

//Suppression d'un article du panier
function deleteArticle() {
    //Récupération du bouton supprimer
    const buttonsDelete = document.querySelectorAll(".deleteItem");

    //Ecouter l'évenement au clic sur le bouton supprimer, pour chaque bouton
    buttonsDelete.forEach(btn => {
        btn.addEventListener("click", function (event) {

            //Récupération des données liées à l'évènement (id, couleur)
            const idTarget = event.target.closest("article").dataset.id;
            const colorTarget = event.target.closest("article").dataset.color;

            //On filtre le tableau de données
            getDataStorage = getDataStorage.filter(
                (element) => !(element.id == idTarget && element.color == colorTarget)
              );
            
            //Confirmation de la suppression
			deleteConfirm = window.confirm("Etes vous sûr de vouloir supprimer cet article ?"
			);
			if (deleteConfirm == true) {
                //Réorganisation du localStorage avec la ligne supprimée
				localStorage.setItem("kanapChoice",JSON.stringify(getDataStorage)
				);
                location.reload();
                console.table(getDataStorage);
                return;
			}
            if (getDataStorage.length == 0) {
                localStorage.clear("kanapChoice");
                return;
            }
        })  
    });
}

//Modification de la quantité d'un article du panier
function modifyQuantity() {
    //Récupération du champ quantité
    const fieldsQuantity = document.querySelectorAll(".itemQuantity");

    //Ecouter l'évenement au changement de quantité dans le champ quantité
    fieldsQuantity.forEach(input => {
        input.addEventListener("change", function (event) {

            //Récupération des données liées à l'évènement (id, couleur, quantité)
            const idTarget = event.target.closest("article").dataset.id;
            const colorTarget = event.target.closest("article").dataset.color;
            const valueTarget = event.target.value;

            //Conditionnement de la modification
            if (valueTarget!= 0 && valueTarget <= 100 && valueTarget > 0) {
                
                //On boucle dans le localStorage
                for (let i=0; i < getDataStorage.length; i++) {

                    //si on se postionne sur la ligne du tableau correspondant à l'évènement
                    if (getDataStorage[i].id === idTarget && getDataStorage[i].color === colorTarget) {

                        ////Réorganisation du localStorage avec la nouvelle quantité
                        getDataStorage[i].quantity = Number(valueTarget);
                        localStorage.setItem("kanapChoice",JSON.stringify(getDataStorage));
                        location.reload();
                        console.table(getDataStorage);
                        return;
                        }
                    }

            }else{
                alert("Veuillez sélectionner une quantité comprise entre 1 et 100");
                location.reload();
            }
        });
    });   
}

/*Gestion du formulaire
Récupération des champs de formulaire*/
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

//Regex
let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù' ]{2,}$/;
let addressRegex = /^[0-9a-zA-Z\-çñàéèêëïîôüù' ]{3,}$/;
let cityRegex = /^[a-zA-Z\-'çñàéèêëïîôüù ]{2,}$/;
let emailRegex = /^[a-z0-9.&+_-]+@[a-z0-9._-]{2,}\.[a-z]{2,3}$/;


//On écoute l'évenement input du formulaire, validation du prénom
firstName.addEventListener("input", function (event) {
    event.preventDefault();
    //Test de validation
    if(nameRegex.test(firstName.value) == true) {
        document.getElementById("firstNameErrorMsg").innerHTML ="ok";
        return true;
    } else {
        document.getElementById("firstNameErrorMsg").innerHTML ="Veuillez renseigner un prénom valide";
        return false;  
    }
});

//Validation du nom
lastName.addEventListener("input", function (event) {
    event.preventDefault();
    //Test de validation
    if(nameRegex.test(lastName.value) == true) {
        document.getElementById("lastNameErrorMsg").innerHTML ="ok";
        return true;
    } else {
        document.getElementById("lastNameErrorMsg").innerHTML ="Veuillez renseigner un nom valide";
        return false;  
    }
});

//Validation de l'adresse
address.addEventListener("input", function (event) {
    event.preventDefault();
    if(addressRegex.test(address.value) == true) {
        document.getElementById("addressErrorMsg").innerHTML ="ok";
        return true;
    } else {
        document.getElementById("addressErrorMsg").innerHTML ="Veuillez renseigner une adresse valide";
        return false;  
    }
});

//Validation de la ville
city.addEventListener("input", function (event) {
    event.preventDefault();
    if(cityRegex.test(city.value) == true) {
        document.getElementById("cityErrorMsg").innerHTML ="ok";
        return true;
    } else {
        document.getElementById("cityErrorMsg").innerHTML ="Veuillez renseigner une ville valide";
        return false;  
    }
});

//Validation de l'email
email.addEventListener("input", function (event) {
        event.preventDefault();
        if(emailRegex.test(email.value) == true) {
            document.getElementById("emailErrorMsg").innerHTML ="ok";
            return true;
        } else {
            document.getElementById("emailErrorMsg").innerHTML ="Veuillez renseigner une adresse valide";
            return false;  
        }
});


//On écoute l'évènement au clic sur le bouton commander
let btnOrder = document.getElementById("order");

btnOrder.addEventListener("click", function (event) {
    event.preventDefault();
    //si les informations sont validées par les regEx
    if ( 
        nameRegex.test(firstName.value) == true &&
        nameRegex.test(lastName.value) == true &&
        addressRegex.test(address.value) == true &&
        nameRegex.test(city.value) == true &&
        emailRegex.test(email.value) == true ) {

            //Création de l'array products pour la requête
            let products = [];
            for (let i = 0; i<getDataStorage.length;i++) {
                products.push(getDataStorage[i].id);
            };

            //Création de l'objet de contact pour la requête
            let contact = {
                firstName : firstName.value,
                lastName : lastName.value,
                address : address.value,
                city : city.value,
                email : email.value,
            };

            const resumeOrder = { contact, products };
            
            //Requête POST sur l'API 
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-type": "application/json",
                },
                body: JSON.stringify(resumeOrder),
            })
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(value) {
                window.location.href = "./confirmation.html?orderId=" + value.orderId;
                console.log(value);
            })
            .catch((err) => {
                alert ("Une erreur est survenue avec la requête");
            });

        // si le formulaire n'est pas complet ou regEx non valide
        } else {
            alert("Merci de renseigner correctement vos coordonnées afin de valider la commande");
        }
});









