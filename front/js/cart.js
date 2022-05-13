
//Récupèration des données du localStorage dans une variable
let getDataStorage = JSON.parse(localStorage.getItem("kanapChoice"));
console.table(getDataStorage);

//Récupération de l'emplacement dans le DOM
const cartItems = document.getElementById("cart__items");
 
//Affichage du contenu du panier dans la page Panier
//Si le localStorage est vide
if (getDataStorage === null) {
    cartItems.innerHTML = `<i>Votre panier est vide</i>`;
}
//Si le localStorage contient des articles, on boucle dans l'array et on modifie le DOM
else {
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



