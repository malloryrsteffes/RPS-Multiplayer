$(document).ready(function () {

    // My web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyBN3qRSwmTv8ZOXc_IWDG90i5Nhl-BFzW8",
    authDomain: "rpsmultiplayer-5a8a8.firebaseapp.com",
    databaseURL: "https://rpsmultiplayer-5a8a8.firebaseio.com",
    projectId: "rpsmultiplayer-5a8a8",
    storageBucket: "",
    messagingSenderId: "984519419568",
    appId: "1:984519419568:web:921db4a7d1109a75be3d75"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to refer to the Firebase Database
    var database = firebase.database();

    // Create global variables. First we need a way to check if we have enough players.
    var playerCount = 0;
    var checkP1 = false;
    var checkP2 = false;

    var playerName;
    var playerNumber;
    var p1Wins;
    var p1Losses;
    var p1Choice;

    var p2Wins;
    var p2Losses;
    var p2Choice;


    // Submits and stores our player's info in the database
    $('#playerSend').on('click', function(){
        // Prevent the page from refreshing
        event.preventDefault();
        
            playerCount++;
            playerNumber = playerCount;
            playerName = $("#playerName").val().trim();

            // Creates a database reference location called player, and gives it a child equal to the playerCount
            var newPlayer = database.ref('player').child(playerCount);

            // Sets our database values
            newPlayer.set({
                name: playerName,
                number: playerNumber,
                wins: 0,
                losses: 0,
              });
        

        // Hide the input section
		$('#playerInput').hide();

    })
    
    //Firebase listener 
    database.ref().on("value", function(snap){
        //exists() is a simple way for firebase to check if something is there. it's a boolean value.
        checkP1 = snap.child('player/1').exists();
        console.log(checkP1);
        checkP2 = snap.child('player/2').exists();
        console.log(checkP2);

        //display Player 1's info. Grabs the info from the database reference and subsequent children
        if (checkP1){
            $("#player1Name").text(snap.child("player/1").val().name);
        }

        //display Player 2's info. Grabs the info from the database reference and subsequent children
        if(checkP2){
			$('#player2Name').text(snap.child('player/2').val().name);
        }
    })
})