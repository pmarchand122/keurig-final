function route() {
  let pageID = window.location.hash;
  let ID = pageID.replace("#/", "");
  if (ID == "" || ID == "main") {
    MODEL.getPageContent("main");
    loadCoffeeMakers();
    coffeeMakers = [];
  } else if (ID == "checkout") {
    MODEL.getPageContent("checkout", appendToCart);
  } else {
    MODEL.getPageContent(ID);
  }
}

function initListeners() {
  $(window).on("hashchange", route);
  route();
}

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $("#login").html(
        `<i id="logoutButton" onclick='logout()' class='fas fa-sign-out-alt'></i>`
      );
      console.log("There is a user");
    } else {
      $("#login").html(`<img src='./images/login.svg' />`);
      console.log("This is no user");
    }
  });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.alert("You have signed out");
    })
    .catch((error) => {
      console.log(error);
      window.alert(error);
    });
}

function login() {
  console.log("login");
  let password = $("#loginPassword").val();
  let email = $("#loginEmail").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      window.alert("Signed In");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(errorMessage);
    });
}

//cart array with ID's
let cartArray = [];

//array with objects that match cartArray ID's
let coffeeArray = [];

function addtoCart(id) {
  console.log(id);
  window.alert("You have added to your cart");
  cartArray.push(id);
}

function appendToCart() {
  console.log(cartArray);
  for (var i = 0; i < coffeeMakers.length; i++) {
    for (var x = 0; x < cartArray.length; x++) {
      if (coffeeMakers[i].id === cartArray[x]) {
        coffeeArray.push(coffeeMakers[i]);
      }
    }
  }

  console.log(coffeeArray);
  for (var i = 0; i < coffeeArray.length; i++) {
    $("#cartItems").append(`
    <div class="coffeeMaker" id="cartItem${coffeeArray[i].id}">
    <div class="imgHolder">
      <img src="../../images/coffeeMaker${coffeeArray[i].id}.webp" />
    </div>
    <div class="colorPicker">
      <div class="largeCircle">
        <div class="whiteCircle">
          <div class="smallCircle"></div>
        </div>
      </div>
    </div>
    <div class="coffeeInfo">
      <h1>${coffeeArray[i].name}</h1>
      <p>$${coffeeArray[i].price}</p>
      <div class="ratings">
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
        </div>  
        <p>${coffeeArray[i].rating.decimal} | (${coffeeArray[i].rating.number})</p>
      </div>
      <div class="freeShipping">
        <img src="../../images/shipping.svg"/>
        <p>Free shipping</p>
      </div>
      <div class="removeFromCart" onclick="removeFromCart(${coffeeArray[i].id})">
        <h2>REMOVE FROM CART</h2>
      </div>
    </div>
  </div>
    `);
  }

  coffeeArray = [];
}

function removeFromCart(ID) {
  console.log("REMOVE");
  for (var i = 0; i < coffeeArray.length; i++) {
    if (coffeeArray[i].id == ID) {
      coffeeArray.splice(i);
    }
    console.log(coffeeArray);
  }
}

//array that holds json data;
let coffeeMakers = [];
function loadCoffeeMakers() {
  $.getJSON("data/coffeeMakers.json", function (data) {
    $.each(data, function (index, coffeeMaker) {
      coffeeMakers.push(coffeeMaker);
      $(
        "#homeCoffeeMakers"
      ).append(`<div class="coffeeMaker" id="coffeeMaker${coffeeMaker.id}">
      <div class="imgHolder">
        <img src="../../images/coffeeMaker${coffeeMaker.id}.webp" />
      </div>
      <div class="colorPicker">
        <div class="largeCircle">
          <div class="whiteCircle">
            <div class="smallCircle"></div>
          </div>
        </div>
      </div>
      <div class="coffeeInfo">
        <h1>${coffeeMaker.name}</h1>
        <p>$${coffeeMaker.price}</p>
        <div class="ratings">
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>  
          <p>${coffeeMaker.rating.decimal} | (${coffeeMaker.rating.number})</p>
        </div>
        <div class="freeShipping">
          <img src="../../images/shipping.svg"/>
          <p>Free shipping</p>
        </div>
        <div class="buyNow" onclick="addtoCart(${coffeeMaker.id})">
          <h2>BUY NOW</h2>
        </div>
      </div>
    </div>`);
    });
  });

  console.log(coffeeMakers);
}

function signup() {
  console.log("signup");
  let password = $("#signupPassword").val();
  let email = $("#signupEmail").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
      window.alert("User has signed up!");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

$(document).ready(function () {
  initListeners();

  try {
    let app = firebase.app();
    initFirebase();
  } catch {
    console.log(e);
    console.log(errorMessage);
  }
});
