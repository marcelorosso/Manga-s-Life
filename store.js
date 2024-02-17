// Renderizar Products List - Renderizar + Desarrollo del CART

/*Se crearon: 

- Un html para la tienda (store) con utilización de JS para la lista de productos automática y para el Cart.
- Se creo un archivo json que contiene el array JSON master de donde se toman todos los productos del store.
- Se creo un archivo js (store.js) que contiene la renderización y función de listar productos en el Store (html) y
las funciones + renderización del cart de manera integral y completa.

Conclusión:

- Se hizo la tienda completa desde cero con:

- store.html
- _store.scss cargado en styles.scss
- mangas.json
-pop-up.js (contiene derivaciones al login y descuentos por Sweet Alert)
- store.js*/


//RENDERIZAR + DESARROLLO DE PRODUCTS CART

//Función ejecutora del Cart

function ready() {

    let removeCartItemButtons = document.getElementsByClassName("btn-danger");
    // console.log(removeCartItemButtons)
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


//RENDERIZAR PRODUCTS LIST (TIENDA - STORE.HTML) - REALIZADO POR SISTEMA DE PROMESAS / FETCH

// Variables sueltas

const mangasJson ="mangas.json"
let contentToshow = "";
let mangas = document.getElementById("shopList")

// Función que muestra los productos en inventario. La misma se introduce a la función fetch (const getMangas) con promesa y mostrar los productos en HTML

const showProductList = (productDetails) => {
    const {name, img, valueList} = productDetails
        let productAvaibles = ""
        productAvaibles += `
        <div class="shop-item d-flex flex-column sizeP">
            <div class="zoom d-flex justify-content-center">
                <img class="shop-item-image img" src="assets/${img}">
            </div>
            <div class="shop-items-details d-flex flex-column">
                <p class="shop-item-title">${name}</p>
                <span class="shop-item-price">$${valueList}</span>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>`
        return productAvaibles
}

// Función que toma el JSON por medio de FETCH, muestra toda la información en HTML tomando la función SHOWPRODUCTLIST (enseña todos los productos) y, finalmente, hace funcionar la carga al carrito de los productos que se seleccionen tomando la función READY.

// Detalle del FETCH con sus PROMISES:

/* - Fetch que toma los productos de un array en formato JSON (archivo mangas.json)
   - Primera promesa: toma el array y lo introduce al circuito
   - Segunda promesa: toma el array y lo mete a una constante para unificar, luego muestra los productos por tabla y los guarda en local storages para finalmente mostrarlos en el html por medio de la función showProductList
   - Finalmente (finally): la función le dice al sistema que la carga de productos esta lista para que por medio de la función ready se le agreguen los eventos a los productos y permita de esta forma el funcionamiento del carrito */

//! Gracias a lo aprendido en última clase con el sistema de promesas a través de fetch (similar a asyinc - await) he podido hacer funcionar a la perfección la carga de productos al carrito, haciendo esperar la función ready hasta la carga completa del documento

let showProducts = []

const getMangas = (mangasJson) => {
    fetch(mangasJson)
    .then((response)=> response.json())
    .then(json => {
        showProducts = json
        console.log(showProducts) // mostrar la lista de productos en la consola
        localStorage.setItem("mangas", JSON.stringify(showProducts)) // guardar listado de productos en Local Storage
        showProducts.forEach(product => {
            contentToshow += showProductList(product)
            mangas.innerHTML = contentToshow
        });
    })
    .then(()=> ready())
    .then(()=> effects ())
}

getMangas(mangasJson) // EJECUCIÓN EN HTML

//Evento click del boton Purchase (with Sweet Alert)

function purchaseClicked(event) {
    Swal.fire({
        imageUrl: "assets/logos/Logo_Majin_Vegetta.jpg",
        imageWidth: 400,
        imageHeight: 350,
        imageAlt: 'Custom image',
        titleText: "Thank for your purchase",
        timer: 3000,
        color: "green",
        heightAuto: true,
        timerProgressBar: true
    })
    let cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

//Adding products to the cart using button "Add to Cart" + showing cart products (DOM) + removing products pressing button "remove"

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
            count = count - 1;
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
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);  
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
}

//Cart remove function

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

//Don't allow the quantity input lower than 1 (product charged to the cart)

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// Cart items value update function according to the price and quantity

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

//! FILTERING AND SEARCHING 

const display = (products, element, filters) => {
    element.innerHTML = products.map((productDetails) => {
        const {name, img, valueList} = productDetails
        return `
        <div class="shop-item d-flex flex-column">
            <div class="zoom d-flex justify-content-center">
                <img class="shop-item-image img" src="assets/${img}">
            </div>
            <div class="shop-items-details d-flex flex-column">
                <p class="shop-item-title">${name}</p>
                <span class="shop-item-price">$${valueList}</span>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>`
    })
    .join("");

    if (filters) return;
}

// Searching by Product Name

const searchByName = document.getElementById("searchItem").addEventListener("keyup", (e) => {
    const value = e.target.value
    console.log(value)
    const filterMangas = showProducts.filter( mangas => mangas.name.toLowerCase().includes(value));
    display(filterMangas, mangas, true);

    if (filterMangas.length < 1) {
        mangas.innerHTML = `
        <div>
            <i class="fas fa-exclamation-triangle"></i>
            <span>Sorry! Doesn't exist products with these name.</span>
        </div>`
    }
    ready()
})

const searchHeader = document.getElementById("searchHeader").addEventListener("keyup", (e) => {
    const value = e.target.value
    console.log(value)
    const filterMangas = showProducts.filter( mangas => mangas.name.toLowerCase().includes(value));
    display(filterMangas, mangas, true);

    if (filterMangas.length < 1) {
        mangas.innerHTML = `
        <div>
            <i class="fas fa-exclamation-triangle"></i>
            <span>Sorry! Doesn't exist products with these name.</span>
        </div>`
    }
    ready()
})

// sort by Name and Price

const sortByNameA = document.getElementById("nameButtonA").addEventListener("click", (e) => {
    const sortByNameMangas = showProducts.sort( (a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        if(aName < bName) {
            return -1
        }
        if (aName > bName) {
            return 1
        }
        return 0
    });
    display(sortByNameMangas, mangas, true);
    ready()
})

 const sortByNameZ = document.getElementById("nameButtonZ").addEventListener("click", (e) => {
    const sortByNameMangas = showProducts.sort( (a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        if(aName > bName) {
            return -1
        }
        if (aName < bName) {
            return 1
        }
        return 0
    });
    display(sortByNameMangas, mangas, true);
    ready()
})

const sortByPriceL= document.getElementById("priceButtonL").addEventListener("click", (e) => {
    const sortByPriceMangas = showProducts.sort( (a, b) => {
        if(a.valueList < b.valueList) {
            return -1
        }
        if (a.valueList > b.valueList) {
            return 1
        }
        return 0
    });
    display(sortByPriceMangas, mangas, true);
    ready()
})

const sortByPriceU= document.getElementById("priceButtonU").addEventListener("click", (e) => {
    const sortByPriceMangas = showProducts.sort( (a, b) => {
        if(a.valueList > b.valueList) {
            return -1
        }
        if (a.valueList < b.valueList) {
            return 1
        }
        return 0
    });
    display(sortByPriceMangas, mangas, true);
    ready()
})

// Filter by Collection 

document.getElementById("manga1").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "My Hero");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
})

document.getElementById("manga2").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "Tokyo Revenger");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
})

document.getElementById("manga3").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "Hunter");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
})

document.getElementById("manga4").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "Attack");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
})

document.getElementById("manga5").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "Kimetsu");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
})

document.getElementById("manga6").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "Tokyo Ghoul");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
})

document.getElementById("manga7").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "The Promised");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
})

document.getElementById("manga8").addEventListener("click", ()=> {
    const categoriesF = showProducts.filter(manga => manga.commonName === "Jujutsu");
    console.log(categoriesF);
    display(categoriesF, mangas, true);
    ready();
}) 

//! Header scroll effects

window.addEventListener("scroll", ()=> {
    let header = document.querySelector(".storeHeader");
    header.classList.toggle("down", window.scrollY > 0);
});

//! "Add to Cart" button effects

function effects () {
    let appearButton = document.getElementsByClassName("shop-item-button");
    for (i = 0; i < appearButton.length; i++) {
        let button = appearButton[i];
        button.addEventListener("mouseover", ()=> {
            button.classList.toggle("appear");
            button.innerText = "BUY IT"
        })
    }
}






