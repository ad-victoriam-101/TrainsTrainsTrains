var config = {
    apiKey: "AIzaSyBu5bwXKKYb6OpecafeGkE9udKDW2y26c4",
    authDomain: "fntrainsman.firebaseapp.com",
    databaseURL: "https://fntrainsman.firebaseio.com",
    projectId: "fntrainsman",
    storageBucket: "fntrainsman.appspot.com",
    messagingSenderId: "765289580670"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

//   Initial Value. 
  var trainName = "";
  var trainDestination = "";
  var trainArival = 0;
  var trainTimeTill = 0;
  $("#add-train").on('click',function(event){
      event.preventDefault();
      trainName = $("#trainName").val().trim();
      trainDestination = $("#trainDestination").val().trim();
      trainArival = $("#trainArival").val().trim();
      trainTimeTill = $("#trainFrequency").val().trim();

      database.ref().push({
          trainName: trainName,
          trainDestination: trainDestination,
          trainArival: trainArival,
          trainTimeTill: trainTimeTill,
          dataAdded: firebase.database.ServerValue.TIMESTAMP
      });
      $("#trainName").val("");
      $("#trainDestination").val("");
      $("#trainArival").val("");
      $("#trainFrequency").val("");
  });
  database.ref().on("child_added",function(childSnapshot){
      console.log(childSnapshot.val());
  });