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
//   preformed on click of the submit button. 
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
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      $("#trainName").val("");
      $("#trainDestination").val("");
      $("#trainArival").val("");
      $("#trainFrequency").val("");
  });
//   start of populating the table with data from Firebase.
  database.ref().on("child_added",function(childSnapshot){
    //   console.log(childSnapshot.val());
      $("#trainTable").append("<tr>"+ "<td>" + childSnapshot.val().trainName +"</td>"+"<td>"+ childSnapshot.val().trainDestination +"</td>" + "<td>" + childSnapshot.val().trainArival +"</td>"+"<td>"+ childSnapshot.val().trainTimeTill+"</td>"+"</tr>")
    var trainTime = moment(childSnapshot.val().dateAdded)
    console.log(trainTime.diff(moment(),"minutes"))
    var tfrequency = childSnapshot.val().trainTimeTill
    var firstTime = childSnapshot.val().trainArival
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1,"years");
    console.log(firstTimeConverted)
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted),"minutes")
    var timeRemain = diffTime % tfrequency;
    var tMinutesTillTrain = tfrequency - timeRemain;
    var nextTrain = moment().add(tMinutesTillTrain,"minutes");
  },function(errorObject){
      console.log("Errors Handled: " + errorObject.code);
  });
//   moment BS

