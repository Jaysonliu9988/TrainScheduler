var firebaseConfig = {
    apiKey: "AIzaSyDzrDttgIf5xFi2o5BNkGqlmszTySd0n0A",
    authDomain: "train-scheduler-5c71a.firebaseapp.com",
    databaseURL: "https://train-scheduler-5c71a.firebaseio.com",
    projectId: "train-scheduler-5c71a",
    storageBucket: "train-scheduler-5c71a.appspot.com",
    messagingSenderId: "609405278009",
    appId: "1:609405278009:web:6455d61b2b038a192b7ae8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#start-input").val().trim();

  console.log(`Train time: ${trainTime}`);
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding schedule data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainTime,
    frequency: trainFrequency,
  };

  // Uploads schedule data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding schedule to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // schedule Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // Prettify the schedule start
  var trainTimePretty = moment(trainTime, "HH:mm");
  var currentTime = moment();

  var differenceInTime = moment().diff(moment(trainTimePretty), 'minutes');
  var tRemainder = differenceInTime % trainFrequency;
  var tMinutesToTrain = trainFrequency - tRemainder;
  var nextTrain = currentTime.add(tMinutesToTrain, "minutes");
  nextTrain = nextTrain.format("h:mm a");

  console.log('--------------');
  console.log(differenceInTime);
  console.log(tRemainder);
  console.log(tMinutesToTrain);
  console.log(nextTrain);
  console.log('--------------');

    console.log(`pretty time: ${trainTimePretty}`);
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var nextArrival = moment().diff(moment(trainTime, "X"),  "months");
  console.log(nextArrival);

  // Calculate the total billed frequency
//   var empBilled = nextArrival * trainFrequency;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesToTrain),
 
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// newRow.ajax.reload(null, false); // reload not working 

console.log(moment)

// THE MATH!
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        trainTime: trainTime,
        trainfrequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;