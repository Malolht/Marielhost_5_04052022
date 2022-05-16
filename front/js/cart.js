
//Récupèration des données du localStorage dans une variable
let getDataStorage = JSON.parse(localStorage.getItem("kanapChoice"));
console.table(getDataStorage);

//Récupération de l'emplacement dans le DOM
const cartItems = document.getElementById("cart__items");
 
/*Affichage du contenu du panier dans la page Panier
Si le localStorage est vide*/
if (getDataStorage === null)  {
    cartItems.innerHTML = `<i>Votre panier est vide</i>`;

//Si le localStorage contient des articles, on boucle dans l'array et on modifie le DOM
} else {
    for (let i=0; i<getDataStorage.length; i++){
        let insertHTML = `
            <article class="cart__item" data-id="${getDataStorage[i].id}" data-color="${getDataStorage[i].color}">
                <div class="cart__item__img">
                <img src="${getDataStorage[i].image}" alt="${getDataStorage[i].texteAlt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${getDataStorage[i].name}</h2>
                    <p>${getDataStorage[i].color}</p>
                    <p>${getDataStorage[i].price}</p>
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
        totalQuantity += getDataStorage[i].quantity;
        totalPrice += getDataStorage[i].price * getDataStorage[i].quantity;
        console.log(totalPrice);
    }

    //Ajout de la quantité total et du prix total dans la page Panier
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
}

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
deleteArticle();

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
modifyQuantity();


