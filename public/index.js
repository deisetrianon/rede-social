var database = firebase.database();

$(document).ready(function() {
  fadePage();
  $(".sign-up-button").click(signUpClick);
  $(".sign-in-button").click(signInClick);
});

function fadePage() {
  $('#fade-initial-page').delay('2000').fadeOut('slow');
  $('#main-page').delay('2000').fadeIn('slow');
}

function signUpClick(event) {
  event.preventDefault();
  
  var name = $('.sign-up-name').val();
  var email = $(".sign-up-email").val();
  var password = $(".sign-up-password").val();

  createUser(name, email, password);
}

function createUser(name, email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response) {
      var userId = response.user.uid;
      userInfo(userId, name, email, password);
      redirectToTasks(userId);
    })
    .catch(function(error) {
      handleError(error);
    });
}

function signInClick(event) {
  event.preventDefault();

  var email = $(".sign-in-email").val();
  var password = $(".sign-in-password").val();

  signInUser(email, password);
}

function signInUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response) {
      var userId = response.user.uid;
      redirectToTasks(userId);
    })
    .catch(function(error) {
      handleError(error)
    });
}

function handleError(error) {
  var errorMessage = error.message;
  alert(errorMessage);
}

function redirectToTasks(userId) {
  window.location = "posts.html?id=" + userId;
}

function userInfo(userId, name, email, password) {
  database.ref('users/' + userId).set({
    name: name,
    email: email,
    password: password,
  });
}