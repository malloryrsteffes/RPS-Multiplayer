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

    var p1Wins;
    var p1Losses;
    var p1Name;
    var p1Choice;

    var p2Wins;
    var p2Losses;
    var p2Name;
    var p2Choice;


    // Submits and stores our player's info in the database
    $('#playerSend').on('click', function(){
        // Prevent the page from refreshing
        event.preventDefault();
        if (playerCount === 0){
            playerCount++;
            p1Name = $("#playerName").val().trim();
            var newPlayer = database.ref('player').child(playerCount);

            newPlayer.set({
                name: p1Name,
                wins: 0,
                losses: 0,
              });
        }

        // Hide the input section
		$('#playerInput').hide();

	})
})