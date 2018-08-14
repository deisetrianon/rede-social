var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  getTasksFromDB();
  $(".add-tasks").click(addTasksClick);
});

function addTasksClick(event) {
  event.preventDefault();

  var newTask = $(".tasks-input").val();
  var visibility = $("#visibility").val();
  var taskFromDB = addTaskToDB(newTask, visibility);

  createListItem(newTask, taskFromDB.key);
  $(".tasks-input").val("");
}

function addTaskToDB(text, visibility) {
  return database.ref("posts/" + USER_ID).push({
    text: text,
    visibility: visibility,
  });
}
function getTasksFromDB() {
  database.ref("posts/" + USER_ID).once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        createListItem(childData.text, childKey)
      });
    });
}
function createListItem(text, key) {
  $(".tasks-list").prepend(`
    <div>
      <span>${text}</span>
      <button class="edit-post">Editar</button>
      <button class="delete-post">Deletar</button>
    </div>`);

  $('.delete-post').click(function() {
    database.ref("posts/" + USER_ID + "/" + key).remove();
    $(this).parent().remove();
  });
}

$('.log-out').click(function() {
  firebase.auth().signOut().then(function() {
    /* Sign-out successful */
    window.location = "index.html";
  }).catch(function(error) {
    alert(error.message);
  });
})