
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
        this.password = password.toUpperCase();
    }
}

const usersLogin = [];

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
