var firebaseConfig = {
    apiKey: "AIzaSyBGr9YbMfsCO99fw6KyxqZ0fNlnVYJFyxs",
    authDomain: "rendezvous-79bc1.firebaseapp.com",
    projectId: "rendezvous-79bc1",
    storageBucket: "rendezvous-79bc1.appspot.com",
    messagingSenderId: "809411697810",
    appId: "1:809411697810:web:97faa59ac2202f51ce5a4b"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("welcome_name").innerHTML = "Welcome " + user_name;

function newroom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "meeting_room.html"
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room name-" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "meeting_room.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}