var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  userInfo();
  allUsersInfo();
  newsfeedRedirect();
  exploreRedirect();
  logOut();
});

function userInfo() {
  database.ref("users/" + USER_ID).once('value')
  .then(function(snapshot) {
    var userName = snapshot.val().name;
    var userEmail = snapshot.val().email;
    $('.username').html('<i class="fas fa-user"></i> ' + userName + ' <small>(' + userEmail + ')</small>');
  });
}

function allUsersInfo() {
  var usersRef = firebase.database().ref('users');
  usersRef.on("child_added", function(snapshot) {
    var allUsersNames = snapshot.val().name;
    $('#list-of-users').append(`
      <div class="explore-user-box">
        <i class="fas fa-user-circle fa-4x text-secondary"></i>
        <div>
          ${allUsersNames} 
          <br>
          <button type="button" class="btn follow-user"><i class="fas fa-user-plus"></i> Seguir</button>
        </div>
      </div>
    `);
    /* console.log(snapshot.key);
    console.log(snapshot.val().name);
    console.log(snapshot.val().email); */
  });
}

function newsfeedRedirect() {
  $('.newsfeed').click(function(){
    window.location = "posts.html?id=" + USER_ID;
  })
}

function exploreRedirect() {
  $('.explore').click(function(){
    window.location = "explore.html?id=" + USER_ID;
  })
}

function logOut() {
  $('.log-out').click(function() {
    firebase.auth().signOut().then(function() {
      /* Sign-out successful */
      window.location = "index.html";
    }).catch(function(error) {
      alert(error.message);
    });
  })
}