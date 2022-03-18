// Descripción

/*Al apretar en el html de la página la manito con el signo pesos al lado del cart (onclick="newBuy ()")
se activa la función, la cual por intermedio de dos funciones dentro de un motor de activación te permite
conocer de acuerdo al nombre de la clase invocada en el prompt, su valor de lista mas código de producto
(se creo un objeto por intermedio de una clase constructora "Products"), realizando posteriores operaciones
númericas de acuerdo al valor de clase invocado y los diversos prompt que componen las funciones del motor.

Operaciones:

valor de lista de acuerdo a la constante invocada de la clase "Products".
Porcentaje de recargo.
Valor del producto con recargo de acuerdo a la cantidad de cuotas ingresadas.
Valor del producto con descuento por pago en efectivo.

*/



//DECLARACIÓN DE VARIABLES

const iva = 1.21;
const byCash = 0.85;

const recargo3 = 1.2;
const recargo6 = 1.4;
const recargo12 = 1.6;

let recargo = 0;

footerTittle.innerText = "Footer Here using DOM";

// VENTA DE PRODUCTO (CONDICIONALES + OBJETOS)

class Products {
    constructor (id, type, description, value, stock) {
        this.productId = parseFloat(id);
        this.productType = type.toUpperCase ();
        this.productName = description.toUpperCase ();
        this.listValue = parseFloat (value);
        this.cashValue = parseFloat (value * byCash);
        this.stock = parseFloat (stock);
        //this.productAvailable = true;
    }

    sumIVA () {
        return this.ListValue * 1.21;
    }
    /*soldOut () {
        this.productAvaible = false;
    }*/
} 

const product1 = new Products(1, "comic", "batman", 800, 30);
const product2 = new Products(2, "manga", "kimetsu no yaiba", 500, 3);
const product3 = new Products(3, "toy", "broly", 8000, 0);
const product4 = new Products(4, "book", "harry potter and the philosopher's stone", 1500, 2);

// EJECUCIÓN

function newBuy () {
    getProduct();
    getPayWay();
}

// FUNCIONES

function getProduct () {
    let which = prompt ("Enter the product type: comic, manga, book or toy");
    if (which == "comic") {
        value = product1.listValue;
        id = product1.productId;
        alert ("List Value: " + "$" + value + " and Product Code: " + id + ".");
    }else if (which == "manga") {
        value = product2.listValue;
        id = product2.productId;
        alert ("List Value: " + "$" + value + " and Product Code: " + id + ".");
    } else if (which == "toy") {
        value = product3.listValue;
        id = product3.productId;
        alert ("List Value: " + "$" + value + " and Product Code: " + id + ".");
    } else if (which == "book") {
        value = product4.listValue;
        id = product4.productId;
        alert ("List Value: " + "$" + value + " and Product Code: " + id + ".");
    } else {
        alert ("You must enter a correct product name. Try again.");
        getProduct(); 
    }
}

function getPayWay() {
    let cash = confirm ("Do you want to puy by cash?");
    if (cash == false) {
        let cantidadCuotas = parseFloat (prompt ("Enter the amount of fees: 3, 6 or 12")); 
        if (cantidadCuotas == 3) {
            recargo = recargo3;
            alert ("It will have a surcharge of "+ ((recargo - 1) * 100).toFixed (0) +"%" + ".");
            alert ("Total cost: " + "$" + recargo * value + ".");
        } else if (cantidadCuotas == 6) {
            recargo = recargo6;
            alert ("It will have a surcharge of "+ ((recargo - 1) * 100).toFixed (0) +"%" + ".");
            alert ("Total cost: " + "$" + recargo * value + ".");
        } else if (cantidadCuotas == 12) {
            recargo = recargo12;
            alert ("It will have a surcharge of "+ ((recargo - 1) * 100).toFixed (0) +"%" + ".");
            alert ("Total cost: " + "$" + recargo * value + ".");
        } else {
            alert ("You didn't enter the correct number. Try again.");
            getPayWay();
        } 
    }else {
        alert ("You will get a 15% discount in the product you chose.");
        alert ("Total product cost: " + "$" + value*byCash + ".");
    }
}


// ARRAY DE OBJETOS - PRODUCTS MANAGMENT

/*Se procedió a mejorar la clase del ejercicio pasado y se incorporó un array que contiene los productos
que se van agregando a la misma por medio de una función de agregado, se pueden borrar por medio de
una función de eliminación por ID, y una función para visualizar el stock en baja y en 0, utilizando
arrow function y ciclos for off. Por último, se creo una function for of que lista todos los productos
de los arrays con salidas mendiante table y alert.*/

const product = [];
product.push (product1, product2, product3, product4);

// ADD NEW PRODUCT (push on web cart to interact with it - index.html)

function addProduct () {
    let cod = prompt ("Introduce the code:");
    let type = prompt ("Introduce the type: comic, manga, book or toy");
    let descr = prompt ("Introduce the product Name");
    let list$ = prompt ("Introduce the List Value:");
    let quantity = prompt ("Introduce the quantity of product received:");
    product.push(new Products(cod, type, descr, list$, quantity));
    alert ("The product " + descr + " was entered into the system.");
        loadProduct ();
    console.table (product);
   
}

// ADD PRODUCTS LIST TO HTML SCREEN

/* Se procedió a incorporar en el proceso de visualización de productos en stock, funciones que permitan
ir cargando los productos y de manera paralela, visualizandolos en el screen del home (index), por medio
de diferentes Id y creaciones html. Esto al momento es mostrado dentro del index, pero será incorporado
dentro de la tienda que muestra los divesos productos (books) a ser comercializados.

Funcionalidad:

Cuando se carga la pantalla, por debajo del slider la pantalla se encuentra vacía, ya que el array de obj
se encuentra dentro de la función, para que solamente se visualicen los mismos una vez aplicada la funcion
con el cart icon. Una vez presionado el cart icon, te pide info por promt, en orden de agregar un nuevo
producto al array de array "const product", y mostrarlo en el screen juntamente con los productos ya 
cargados. Va a ir mostrando cada producto incorporado hasta el momento de recargar la página, situación en
la que la misma queda en blanco (la idea es que se muestren siempre, pero para demostrar la funcionalidad
en el desafio, me pareció mas interesante que solo se muestre al cargar nuevo producto con el onclick).*/

function loadAll () {
    addProduct ();
    loadProduct ()
}
 
function loadProduct () {
    document.getElementById("mangasWorld").innerHTML = "";
    const cargarProductos = () => { // arrow function utilizada para el ciclo
        //productos (array variables.js)
        for (mangas of product) { //fruta variable que toma los elementos del array productos
            const liProduct = document.createElement("li"); //crear tag - elemento html desde JS
                liProduct.className = "mangasNew"; //crear clase
                liProduct.innerHTML = `<h3> Product Category: ${mangas.productType}<h3>
                                        <p> Product Name: ${mangas.productName}<p>
                                        <p> Product Value: ${mangas.listValue}<p>
                                        <p> Product Cash Value: ${mangas.cashValue}<p>`
                // liProduct.innerText = mangas; // tomar valores
                mangasWorld.append(liProduct); // es el id tomando la constante
        }                            
    }
    cargarProductos();
}

// DELETE PRODUCT BY ID NUMBER

function deleteProduct () {
    const productToDelete = parseFloat(prompt ("Introduce the product id in order to delete it:"));
    const listToDelete = [productToDelete]
      for (let i = 0; i < product.length; i++) {
        let obj = product[i];
    
        if (listToDelete.indexOf(obj.productId) !== -1) {
            product.splice(i, 1);
            i--;
            alert ("The removed product is: " + obj.productName);
            console.table(product);
        }
    }
}

// LIST PRODUCTS

function listOfProduct () {
    for (const productList of product) {
        alert ("Product ID = " + productList.productId);
        alert ("Product Category and Name: " + productList.productType + " - " + productList.productName);
        alert ("Value by cash = " + "$"+ productList.cashValue + " (15% off List Price). " + "Its List Price = " + "$"+ productList.listValue);
        alert ("Product actually stock = " + productList.stock);
    } 
    console.table (product);
}


// STOCK MANAGMENT (Less than 5 products and without stock)

function lowAndWithOutProduct () {
    if (lowStock = product.filter(product => product.stock <= 5 & product.stock > 0)) {
        console.log ("");
        console.log ("LOW STOCK PRODUCTS");
        console.log ("");
        for (const low of lowStock) {
            console.table ("Name: ", low.productName);
            console.table ("Stock: ", low.stock);
        }
    }else {
            alert ("You need to buy more from this list of products");
        }
    if (outOfStock = product.filter(product => product.stock == 0)) {
        console.log ("");
        console.log ("LACK OF STOCK");
        console.log ("");
        for (const withOut of outOfStock) {
            console.table ("ID= ", withOut.productId);
            console.table ("Name: ", withOut.productName);
        }
    } else {
        alert ("You don't have stock problems.");
    }
}




    








