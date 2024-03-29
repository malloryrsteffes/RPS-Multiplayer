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
    var isGameOn = false;

    // I may need to make variables for player1Name and player2Name
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
        playerName = $("#playerName").val().trim();

        if (playerCount < 2){
            if (checkP1){
                playerNumber = 2;
            }
            else {
                playerNumber = 1;
            }
        }
        // Creates a database reference location called player, and gives it a child equal to the playerCount. This must be what isn't working.
        var playerDatabase = database.ref("/players/" + playerNumber);

         

        // Sets our database values
        playerDatabase.set({
            name: playerName,
            number: playerCount,
            wins: 0,
            losses: 0,
            });
        

        // Hide the input section
		$('#playerInput').hide();

    })
    
    //Firebase listener 
    database.ref("/players/").on("value", function(snap){
        //exists() is a simple way for firebase to check if something is there. it's a boolean value.
        checkP1 = snap.child(1).exists();
        console.log(checkP1);
        checkP2 = snap.child(2).exists();
        console.log(checkP2);

        //display Player 1's info. Grabs the info from the database reference and subsequent children
        if (checkP1){
            $("#player1Name").text(snap.child(1).val().name);
        }
        else {
			$('#player1Name').text("Waiting for Player 1");
        }
        //display Player 2's info. Grabs the info from the database reference and subsequent children
        if(checkP2){
			$('#player2Name').text(snap.child(2).val().name);
        }
        else{
			$('#player2Name').text("Waiting for Player 2");
        }

        //If there are two players, we need to turn the game on, start our turns, and show them their choices
        if (!isGameOn && checkP1 && checkP2){

            //create a database reference to the amount of turns and start it at 1
            database.ref("turns").set(1);
            isGameOn = true;
        }
    })
})