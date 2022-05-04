//Appel de la fonction "itemsKanap" au lancement de la page
itemsKanap();

//Récupération des articles de l'API
/**
 * définition de la fonction asynchrone "getArticles()"
 * déclaration de la variable "articlesCatch" qui correspondra au résultat venant de l'API via la requête GET
 * retourne une Promise au format JSON
 */
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

//Répartition des données de l'API dans le DOM
async function itemsKanap() {
    let result = await getArticles()
    .then(function(dataResults) {
        const articles = dataResults;
        console.table(articles);
        for (let article in articles) {

            //Insertion de l'élément a
            let linkElement = document.createElement("a");
            document.querySelector(".items").appendChild(linkElement);
            linkElement.href = `product.html?id=${dataResults[article]._id}`;

            //Insertion de l'élément article
            let articleElement = document.createElement("article");
            linkElement.appendChild(articleElement);

            //Insertion de l'image img
            let imgElement = document.createElement("img");
            articleElement.appendChild(imgElement);
            imgElement.src = dataResults[article].imageUrl;
            imgElement.alt = dataResults[article].altTxt;

            //Insertion du titre h3
            let nameElement = document.createElement("h3");
            articleElement.appendChild(nameElement);
            nameElement.classList.add("productName");
            nameElement.innerHTML = dataResults[article].name;

            //Insertion de la description p
            let descriptionElement = document.createElement("p");
            articleElement.appendChild(descriptionElement);
            descriptionElement.classList.add("productDescription");
            descriptionElement.innerHTML = dataResults[article].description;

        }
    })
    //Erreur retournée si besoin
    .catch (function(error){
        return console.log("une erreur est survenue avec le serveur");
    });
}