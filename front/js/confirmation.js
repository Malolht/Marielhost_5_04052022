// Récupération orderId
var params = new URL(document.location).searchParams;
var orderId = params.get("orderId");
console.log("orderId :" + orderId );
localStorage.clear();

// Affichage du numéro de commande
document.getElementById("orderId").textContent = orderId;