//Array de Objetos - Creación de Registro de Usuarios (push on web log to interact with it - login.html)

/* Se procedió a crear una clase de usuarios registrados en la web, con el proposito de a través de una
function de agregado de usuarios, ir incorporando nuevos users al array userList, el cual se activa al 
presionar el logo de la página en la web de login. Con el buttom submit se vuelve al home o index.*/

class Users {
    constructor (personalName, address, location, mail, number,) {
        this.id = Date.now();
        this.name = personalName.toUpperCase();
        this.address = address.toUpperCase();
        this.city = location.toUpperCase();
        this.mail = mail.toUpperCase();
        this.cellphoneNumber = parseFloat (number);
    }
}

const userList = [];
userList.push (new Users ("marcelo rosso", "publica 1 norte 6920 - universitario", "cordoba", "rossomarcelogabriel@gmail.com", 3517911990));
userList.push (new Users ("celeste massara", "publica 1 norte 6920 - universitario", "cordoba", "celemassara@gmail.com", 3513140020));

function addUser () {
    let nom = prompt ("Introduce the name and surname:");
    let ad = prompt ("Introduce the address:");
    let loc = prompt ("Introduce the city:");
    let em = prompt ("Introduce the email:");
    let cell = prompt ("Introduce the phone number:");
    userList.push(new Users(nom, ad, loc, em, cell));
    swal.fire ({
        text: "Name and Surname: "  + nom + " " + "Address: " + ad + " " + "City: " + loc + " " + "E-mail: " + em + " " + "Cellphone Number: " + cell,
        color: "green",
        timer: 3500,
        showConfirmButton: false
    })
    // alert ("Name and Surname: " + nom);
    // alert ("Address: " + ad);
    // alert ("City: " + loc);
    // alert ("E-mail: " + em);
    // alert ("Cellphone Number: " + cell);
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
const submitBut = document.querySelector(".btnSub");
const logoClick = document.querySelector(".logoClick");

let recoverUsers= "";

class UsersLog {
    constructor(user, email, password) {
        this.id = Date.now();
        this.name = user.toUpperCase();
        this.email = email.toUpperCase();
        this.password = password;
    }
}

const usersLogin = [];
usersLogin.push(new UsersLog("marcelito", "rossomarcelogabriel@gmail.com", "rosso771"));
usersLogin.push(new UsersLog("celemassara", "cele_massara@hotmail.com", "cele843"));

// FUNCIÓN ESPECIAL PARA RECOPILAR DATOS DE USUARIOS REGISTRADOS Y MOSTRARLOS POR TABLA (JSON AND LOCALSTORAGE)

/*Se desarrollo una función compleja para captar datos por inputs, enviarlos a local storages transformados en JSON,
obtenerlos del local storage y mostrarlos en el screen del html por medio de loop for

Desarrollos sobre el LOGIN y otros:

- localStorage
- JSON
- DOM
- Events
- Operadores ? and spread
- Sweet Alert */

const addUsers = (ev)=> {
    ev.preventDefault(); //to stop the form submitting
    let userLog = {
        id: Date.now(),
        name: document.getElementById("userName").value.toUpperCase(),
        email: document.getElementById("userEmail").value.toUpperCase(),
        password: document.getElementById("password").value.toUpperCase()
    }
    usersLogin.push(userLog);
    document.forms[0].reset(); //to clear the form for the next entries

    //for display purposes only
    console.warn("added", {usersLogin});

    //saving to localStorage and getting back it here
    
    localStorage.setItem("UsersList", JSON.stringify(usersLogin));

    dispData()
}

function dispData() {
    if (localStorage.getItem("UsersList")) {
        document.getElementById("outPut").innerHTML = "";
        recoverUsers = JSON.parse(localStorage.getItem("UsersList")) || [];
        const output = document.getElementById("outPut");
        for (let i = 0; i < usersLogin.length; i++) {
            let usersList = `
                        <tr>
                            <td>${usersLogin[i].name}</td>
                             <td>${usersLogin[i].email}</td>
                             <td>${usersLogin[i].password}</td>
                        </tr>`
            output.innerHTML += usersList     
        }
    }
}

dispData()

document.addEventListener("DOMContentLoaded", ()=> {
    submitBut.addEventListener("click", addUsers);
})

//Using spread and ? in order to see if the emails are the same for the same person.

const joinUsersDate = [...usersLogin, ...userList];


const verifiedMail = (joinUsersDate[0].email === joinUsersDate[2].mail)
verifiedMail? console.log("The mail is the same") : console.log("The mail is different")

const verifiedMail2 = (joinUsersDate[1].email === joinUsersDate[3].mail)
verifiedMail2? console.log("The mail is the same") : console.log("The mail is different")

// Login Events + Sweet Alert

userName.addEventListener("keyup", (event) => {
    datosDeInput = event.target.value;
    console.clear();
    console.log (datosDeInput);
})
userEmail.addEventListener("keyup", (event) => {
    datosDeInput = event.target.value;
    console.clear();
    console.log (datosDeInput);
})
passWord.addEventListener("keyup", (event) => {
    datosDeInput = event.target.value;
    console.clear();
    console.log (datosDeInput);
})

submitBut.addEventListener("click", (event) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "!Coming soon user registration page!",
        showConfirmButton: false,
        timer: 1500
        })
} )

logoClick.addEventListener("click", (event)=> {
    addUser();
})