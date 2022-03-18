//Array de Objetos - Creación de Registro de Usuarios (push on web log to interact with it - login.html)

/* Se procedió a crear una clase de usuarios registrados en la web, con el proposito de a través de una
function de agregado de usuarios, ir incorporando nuevos users al array userList, el cual se activa al 
presionar el logo de la página en la web de login. Con el buttom submit se vuelve al home o index.*/

class Users {
    constructor (personalName, address, location, mail, number,) {
        this.name = personalName.toUpperCase ();
        this.address = address.toUpperCase ();
        this.city = location.toUpperCase ();
        this.mail = mail.toUpperCase ();
        this.cellphoneNumber = parseFloat (number);
    }
    
    
}

const userList = [];
userList.push (new Users ("marcelo rosso", "publica 1 norte 6920 - universitario", "cordoba", "rossomarcelogabriel@gmail.com", 3517911990));

function addUser () {
    let nom = prompt ("Introduce the name and surname:");
    let ad = prompt ("Introduce the address:");
    let loc = prompt ("Introduce the city:");
    let em = prompt ("Introduce the email:");
    let cell = prompt ("Introduce the phone number:");
    userList.push(new Users(nom, ad, loc, em, cell));
    alert ("Name and Surname: " + nom);
    alert ("Address: " + ad);
    alert ("City: " + loc);
    alert ("E-mail: " + em);
    alert ("Cellphone Number: " + cell);
    console.table (userList); 
}


//EVENTOS PARA INGRESO DE USUARIOS Y CONTRASEÑAS EN LOGIN PAGE

/* Se procedió a agregar simples eventos dentro de la página de login al sistema como usuario
registrado. 

- Se utilizó una clase creada para pequeñas modificaciones al hacer foco y salir del foco en los inputs
- Un control de escritura simple
- Un aviso de acuerdo a futuros desarrollos con relación a los registros del login
*/

// Variables



const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const passWord = document.querySelector("#password");
const submitBut = document.querySelector(".btnSub")

let datosDeInput = "";

class UsersLog {
    constructor(user, email, password) {
        this.userName = user;
        this.userMail = email;
        this.userPassword = password;
    }
}

const usersLogin = [];

// Eventos

const focusOnIt = ()=> {
    const fields = document.querySelectorAll("input");
        for (let onIt of fields) {
            onIt.addEventListener("focus", ()=> onIt.className = "event");
            onIt.addEventListener("blur", ()=> onIt.className = "");
        }
}

focusOnIt();


userName.addEventListener("keyup", (event) => {
    datosDeInput = event.target.value;
    console.clear();
    console.log (datosDeInput);
})

submitBut.addEventListener("click", (event) => {
    alert ("!Coming soon user registration page!");
} )