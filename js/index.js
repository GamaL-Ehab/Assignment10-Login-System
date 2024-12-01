// Login Form
var loginForm = document.querySelector(".login-form");
var signupSpan = document.querySelector(".sign-up");
var loginBtn = document.querySelector("#login-btn");
var loginEmail = document.querySelector("#loginEmail");
var loginPass = document.querySelector("#loginPass");

// Signup Form
var signupForm = document.querySelector(".signup-form");
var signinSpan = document.querySelector(".sign-in");
var signupBtn = document.querySelector("#signup-btn");
var signupName = document.querySelector("#username");
var signupEmail = document.querySelector("#email");
var signupPass = document.querySelector("#pass");
var signupInputs = document.querySelectorAll(".signup-form input");
var emailErrorMsg = document.querySelector(".email-error");

// HOME
var homePage = document.querySelector(".home");
var signoutBtn = document.querySelector("#signout-btn");
var userNameSpan = document.querySelector("#userNameSpan");

if (localStorage.getItem("signedUsers") != null) {
  usersList = JSON.parse(localStorage.getItem("signedUsers"));
} else {
  var usersList = [];
}

signupSpan.addEventListener("click", function () {
  loginForm.classList.replace("d-block", "d-none");
  signupForm.classList.replace("d-none", "d-block");
});
signinSpan.addEventListener("click", function () {
  loginForm.classList.replace("d-none", "d-block");
  signupForm.classList.replace("d-block", "d-none");
  if(signupBtn.previousElementSibling.classList.contains("d-block")){
    signupBtn.previousElementSibling.classList.replace("d-block", "d-none")
  }
});

function signupUser() {
  var user = {
    username: signupName.value,
    email: signupEmail.value.toLowerCase(),
    password: signupPass.value,
  };

  usersList.push(user);
  updateLocalStorage();
  console.log(usersList);
}

function updateLocalStorage() {
  localStorage.setItem("signedUsers", JSON.stringify(usersList));
}

function clearForm() {
  loginEmail.value = null;
  loginPass.value = null;
  signupEmail.value = null;
  signupName.value = null;
  signupPass.value = null;
}

for (var i = 0; i < signupInputs.length; i++) {
  signupInputs[i].addEventListener("blur", function () {
    validateSignUp(this);
  });
}

function validateSignUp(input) {
  var signupRegex = {
    username: /^[a-z]{1,25}\s?\w{2,25}$/gi,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi,
    pass: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  };

  if (input.id == "email") {
    if (usersList.length > 0) {
      for (var i = 0; i < usersList.length; i++) {
        if (input.value == usersList[i].email) {
          input.nextElementSibling.innerHTML =
            '<i class="fa-solid fa-circle-exclamation"></i> This Email already exists';
          input.nextElementSibling.classList.replace("d-none", "d-block");
          return false;
        }
      }
    }
    if (signupRegex[input.id].test(input.value)) {
      input.nextElementSibling.classList.replace("d-block", "d-none");
      return true;
    } else {
      input.nextElementSibling.innerHTML =
        '<i class="fa-solid fa-circle-exclamation"></i> Invalid Email (ex: name@gmail.com)';
      input.nextElementSibling.classList.replace("d-none", "d-block");
    }
  } else {
    if (signupRegex[input.id].test(input.value)) {
      if (input.nextElementSibling.classList.contains("d-block")) {
        input.nextElementSibling.classList.replace("d-block", "d-none");
      }
      return true;
    } else {
      input.nextElementSibling.classList.replace("d-none", "d-block");
      return false;
    }
  }
}

signupBtn.addEventListener("click", function () {
  if (
    validateSignUp(signupName) &&
    validateSignUp(signupEmail) &&
    validateSignUp(signupPass)
  ) {
    signupUser();
    clearForm();
    signupBtn.previousElementSibling.classList.replace("d-none", "d-block");
  }
});

function loginUser() {
  if (loginEmail.value == "" || loginPass.value == "") {
    loginEmail.nextElementSibling.classList.replace("d-none", "d-block");
    loginPass.nextElementSibling.classList.replace("d-none", "d-block");
  }

  for (var i = 0; i < usersList.length; i++) {
    if (loginEmail.value.toLowerCase() == usersList[i].email) {
        loginEmail.nextElementSibling.classList.replace("d-block", "d-none");
        var index = i;
        break;
    }
  }
  if(index >= 0){
    if (loginPass.value == usersList[index].password) {
      homePage.classList.replace("d-none", "d-block");
      loginForm.classList.replace("d-block", "d-none");
      userNameSpan.innerHTML = usersList[index].username;
      loginPass.nextElementSibling.classList.replace("d-block", "d-none");
      clearForm();
    } else {
      loginPass.nextElementSibling.classList.replace("d-none", "d-block");
    }
  }
}

loginBtn.addEventListener("click", function () {
  loginUser();
});

signoutBtn.addEventListener("click", function () {
  homePage.classList.replace("d-block", "d-none");
  loginForm.classList.replace("d-none", "d-block");
});