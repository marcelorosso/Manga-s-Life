//!HOME POP-UP (LOGIN AND DISCOUNT) - Pressing User and Discount icon

const loginBut = document.getElementById("loginBtn");
const discountBut = document.getElementById("discountBtn");

// Discount

discountBut.addEventListener("click", (event) => {
    Swal.fire ({
        title: "50% off in your next purchase",
        html: `<span class="paragraph">if you are registered</span>`,
        background: "white",
        input: "text",
        inputPlaceholder: "Enter your email address",
        confirmButtonText: "GET YOUR 50% OFF",
        showCancelButton: true,
        cancelButtonText: "No, thanks",
        cancelButtonColor: "green",
        showCloseButton: true,
        footer: `<span>Thanks for follow us. <a class= "mi_footer" href="index.html">Suscribe here</a></span>`,
        customClass: {
            title: "title",
            input: "input",
            confirmButton: "boton_confirmacion",
        }
    })
} )  

// Sign Up and Sign In

loginBut.addEventListener("click", (event) => {
    Swal.fire ({
        title: "Sign In Here",
        color: "green",
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            title: "family"
        },
        html: `<div class="modal-body">
        <div class="buttons_modal">
          <button class="btn_facebook">Login with Facebook</button>
          <button class="btn_google" href="https://mail.google.com/">Login with Google</button>
          <button class="btn_email" id="btn_email"><a href="login.html">Login with your Manga-s-Life Account<a></button>
        </div>
        <div class="link_form_registro">
          <p>Don't have your account yet?<a href="">Sign Up here</a></p>
        </div>
        </div>`
    }) 
}) 

//! Home effects (changing the image nad background-color) and adding menu in responsive size

// Img

function imgSlider(anything) {
    document.querySelector(".imagesChange").src = anything;
}

// Color

function changeColor(color) {
    const sec = document.querySelector(".sec");
    sec.style.background = color;
}

// Responsive menu

function menuToggle() {
    const toggleMenu = document.querySelector(".toggleMenu");
    const homeUl = document.querySelector(".homeUl");
    toggleMenu.classList.toggle("active");
    homeUl.classList.toggle("active");
}



