var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  userInfo();
});

function userInfo() {
  database.ref("users/" + USER_ID).once('value')
  .then(function(snapshot) {
    var userName = snapshot.val().name;
    var userEmail = snapshot.val().email;
    $('.username').html('<i class="fas fa-user"></i> ' + userName + ' <small>(' + userEmail + ')</small>');
  });
}

$('.newsfeed').click(function(){
  window.location = "posts.html?id=" + USER_ID;
})

$('.explore').click(function(){
  window.location = "explore.html?id=" + USER_ID;
})

$('.log-out').click(function() {
  firebase.auth().signOut().then(function() {
    /* Sign-out successful */
    window.location = "index.html";
  }).catch(function(error) {
    alert(error.message);
  });
})