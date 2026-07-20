const mobileMenu = document.querySelector(".mobile_page_list");
const mobileMenuBtn = document.querySelector("#mobile_taggole");
const Overlay = document.querySelector(".overlay");
function showMobileMenu() {
  mobileMenu.classList.toggle("active");
  Overlay.classList.toggle("active");
}

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove("active");
    Overlay.classList.remove("active");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 650) {
    mobileMenu.classList.remove("active");
    Overlay.classList.remove("active");
  }
});
const signupForm = document.querySelector("#signup_form");
const signupInput = document.querySelectorAll(".signup_form_input");
const errorMSGs = document.querySelectorAll(".errorMSG");
const terms = document.querySelector("#signup_terms");
const users = JSON.parse(localStorage.getItem("users")) || [];

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    let isValid = true;

    signupInput.forEach((input, index) => {
      if (input.value.trim() === "") {
        errorMSGs[index].textContent = "This field is required";
        isValid = false;
      }
      if (!terms.checked) {
        errorMSGs[4].textContent = "Please read and accept our terms";
      } else {
        errorMSGs[index].textContent = "";
      }
      input.addEventListener("input", () => {
        errorMSGs[index].textContent = "";
      });
      terms.addEventListener("change", () => {
        errorMSGs[4].textContent = "";
      });
    });

    if (signupInput[2].value.trim() !== signupInput[3].value.trim()) {
      errorMSGs[3].textContent = "Password do not match";
      isValid = false;
    }
    if (!isValid) {
      e.preventDefault();
    } else {
      e.preventDefault();

      const userdata = {
        name: signupInput[0].value,
        email: signupInput[1].value,
        password: signupInput[2].value,
      };
      users.push(userdata);
      localStorage.setItem("users", JSON.stringify(users));
      alert("signup succesfull!!");
      errorMSGs.forEach((errormsg, index) => {
        errorMSGs[index].textContent = "";
      });
      window.location.href = "login.html";
    }
  });
}

// Login Form
const loginForm = document.querySelector("#login_form");
const loginGmail = document.querySelector("#login_email");
const loginpassword = document.querySelector("#login_pass");
const loginErrorMSGs = document.querySelectorAll(".login_errorMSG");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    if (loginGmail.value.trim() === "") {
      loginErrorMSGs[0].textContent = "Email is Required";
      isValid = false;
    }
    if (loginpassword.value === "") {
      loginErrorMSGs[1].textContent = "Password is Required";
      isValid = false;
    }
    if (!isValid) return;
    const user = users.find(
      (user) => user.email === loginGmail.value.trim().toLowerCase(),
    );

    if (!user) {
      loginErrorMSGs[0].textContent = "Email not found";
      return;
    }
    if (user.password !== loginpassword.value.trim()) {
      loginErrorMSGs[1].textContent = "Incorrect Password";
      return;
    }
    document.querySelector("#logSucmsg").style.display = "block";
    if (user) {
      setTimeout(() => {
        document.querySelector("#logSucmsg").style.display = "none";
        window.location.href = "index.html";
      }, 2000);
    }
  });
}
loginGmail.addEventListener("input", () => {
  loginErrorMSGs[0].textContent = "";
});
loginpassword.addEventListener("input", () => {
  loginErrorMSGs[1].textContent = "";
});
