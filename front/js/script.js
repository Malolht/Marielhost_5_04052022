
//Création de la fonction qui récupère les produits de l'API par le fetch
async function getProducts() {
    return fetch("http://localhost:3000/api/products", myInit)
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

//Création de la fonction qui boucle dans le tableau récupéré
async function itemsKanap() {
    const dataResults = await getProducts();
    for (let i of dataResults) {

        //Insertion de l'élément a
        let linkElement = document.createElement("a");
        document.querySelector(".items").appendChild(linkElement);
        linkElement.href = `./product.html?id=${i._id}`;

        //Insertion de l'élément article
        let articleElement = document.createElement("article");
        linkElement.appendChild(articleElement);

        //Insertion de l'image img
        let imgElement = document.createElement("img");
        articleElement.appendChild(imgElement);
        imgElement.src = i.imageUrl;
        imgElement.alt = i.altTxt;

        //Insertion du titre h3
        let nameElement = document.createElement("h3");
        articleElement.appendChild(nameElement);
        nameElement.classList.add("productName");
        nameElement.innerHTML = i.name;

        //Insertion de la description p
        let descriptionElement = document.createElement("p");
        articleElement.appendChild(descriptionElement);
        descriptionElement.classList.add("productDescription");
        descriptionElement.innerHTML = i.description;
    }
}

//Appel de la fonction
itemsKanap();
  

