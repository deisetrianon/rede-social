var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  userInfo();
  allUsersInfo();
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
    var allUsersId = snapshot.key;

    $('#list-of-users').append(`
      <div class="explore-user-box">
        <i class="fas fa-user-circle fa-4x text-secondary"></i>
        <div class="info-user">
          ${allUsersNames} 
          <br>
          <button type="button" id="btn-${allUsersNames}" class="btn"><i class="fas fa-user-plus"></i> Seguir</button>
        </div>
      </div>
    `);

    if (allUsersId === USER_ID) {
      $(`#btn-${allUsersNames}`).replaceWith('<div><small>(SEU PERFIL)</small></div>');
    }

    $(`#btn-${allUsersNames}`).click(function() {
      $(this).fadeOut('slow');
      $(this).replaceWith('<button type="button" class="btn"><i class="fas fa-user-minus"></i> Seguindo</button>');
      var friendsRef = firebase.database().ref('friendship');
      friendsRef.on("child_added", function(snapshot) { 
        var currentUserId = snapshot.key;
        currentUserId = USER_ID;
        
        database.ref('friendship/' + currentUserId).push({
          friend: allUsersId,
        });
      });
    });

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
    window.location = "index.html";
  }).catch(function(error) {
    alert(error.message);
  });
})