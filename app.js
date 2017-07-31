// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBB9ovsBjzMUB6xItFtJoiCt7iNlzYwk4s",
    authDomain: "train-scheduler-14cb9.firebaseapp.com",
    databaseURL: "https://train-scheduler-14cb9.firebaseio.com",
    projectId: "train-scheduler-14cb9",
    storageBucket: "train-scheduler-14cb9.appspot.com",
    messagingSenderId: "355721291832"
  };

firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();

// Initial values
var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival = "";
var minutesAway = 0;
var firstTrain = 0;

//Event listener for submit button for adding trains
$(".submit").on("click", function(){

event.preventDefault();

//Gets user input
trainName = $("#trainInput").val().trim();
destination = $("#destinationInput").val().trim();
frequency = $("#frequencyInput").val();
firstTrain = $("#firstTrain").val().trim();

//console.log(trainName);
//console.log(destination);
//console.log(frequency);
//console.log(nextArrival);
//console.log(minutesAway);

// Appends a new record (children) to database
database.ref().push( {
  trainName: trainName,
  destination: destination,
  frequency: frequency,
  nextarrival: nextArrival,
  minutesaway: minutesAway,
 });

});

//when a new child record is added,
database.ref().on("child_added", function(childSnapshot) {
// Log everything from the snapshot
console.log(childSnapshot.val().trainName);
console.log(childSnapshot.val().destination);
console.log(childSnapshot.val().frequency);
console.log(childSnapshot.val().nextarrival);
console.log(childSnapshot.val().minutesaway);

});

// Create a Firebase event for adding to the database 
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// Store data in a variable
var tName = childSnapshot.val().trainName;
var tDst = childSnapshot.val().destination;
var tFrq = childSnapshot.val().frequency;
var tRt = childSnapshot.val().nextarrival;
var tmin = childSnapshot.val().minutesaway;

// Log train information
console.log(tName);
console.log(tDst);
console.log(tFrq);
console.log(tRt);

var firstTime = "3:00";

// First Time converted back 1 year to make sure it comes before current time
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrq;
console.log(tRemainder);

// Minutes until train
var tMinutesTillTrain = tFrq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//Append information to table in html
$("tbody").append("<tr> <td>" + tName + "</td> <td>" + tDst + "</td> <td>" +
tFrq + " mins" + "</td> <td>" + moment(nextTrain).format("hh:mm a") + "</td> <td>" + tMinutesTillTrain + "</td> </tr>");
});
