// Renderizar Products List - Renderizar + Desarrollo del CART

/*Se procedio a crear una función compleja utilizando DOM para poder mostrar en el screen del store todos los productos
disponibles de forma automática (partiendo del index se usa el nuevo icono de tienda), los cuales se van actualizando
en la page a través de un array JSON con Local Storage (variables.js). Estos dos archivos js están linkeados en el html
store (tienda creada) de manera async para que carguen las variables (array JSON) antes de la carga de las funciones
(listar productos en stock / carga en el Cart + eliminación del Cart + realización de compra y no repetición de productos
en el Cart).

Se crearon: 

- Un html para la tienda (store) con utilización de JS para la lista de productos automática y para el Cart.
- Se creo un archivo js (variables.js) que contiene el array JSON master de donde se toman todos los productos del store.
- Se creo un archivo js (store.js) que contiene la renderización y función de listar productos en el Store (html) y
las funciones + renderización del cart de manera integral y completa.
- Se realizaron las clases por medio de SCSS y Bootstrap para eficientizar la page (aún no se hizo el responsive).

Conclusión:

- Se hizo la tienda completa desde cero con:

- store.html
- _store.scss cargado en styles.scss
- variables.js
- store.js

!El carrito se encuentra en total funcionamiento, si no se cargan los productos al mismo, hacer reload de la page hasta
que puedan cargarse estando posicionados en el comienzo de la page.!*/


// Condicional para el loading en DOM

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}else {
    ready()
}

//RENDERIZAR PRODUCTS LIST (TIENDA - STORE.HTML)

console.log(product)
function showProductList () {
    let mangas = document.getElementById("shopList")
    
    for (let i = 0; i < product.length; i++) {
        let productAvaible = `
        <div class="shop-item d-flex flex-column">
            <div class="zoom d-flex justify-content-center">
                <img class="shop-item-image img" src="assets/${product[i].img}">
            </div>
            <div class="shop-items-details d-flex flex-column">
                <span class="shop-item-title">${product[i].name}</span>
                <span class="shop-item-price">$${product[i].valueList}</span>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>`
        mangas.innerHTML += productAvaible
        
    }
}

showProductList()

//RENDERIZAR + DESARROLLO DE PRODUCTS CART

//Función ejecutora del Cart

function ready() {
    let removeCartItemButtons = document.getElementsByClassName("btn-danger");
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem); 
    }

    let quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    let addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
}

//Evento clck del boton Purchase

function purchaseClicked(event) {
    alert("Thank you for your purchase");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    
    updateCartTotal();
}

//Función para agregar productos con evento Click en botón "Add to Cart" + modificación html por DOM mostrando productos
//en el carrito

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title =shopItem.getElementsByClassName("shop-item-title")[0].innerText
    let price =shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let imageSrc =shopItem.getElementsByClassName("shop-item-image")[0].src
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    cartRow.innerText = title
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("This item is already added to the chart");
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item row row-cols-5 d-flex" style="border: 1px solid black;">
            <img class="cart-item-image img" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
            <span class="cart-price cart-column price">${price}</span>
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}

//Función para remover del cart por medio del botón "remove"

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

//Función para modificar la cantidad de productos cargados al Cart

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

//Función de actualización de valores del Cart de acuerdo a precio y cantidad

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("cart-price")[0];
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}

