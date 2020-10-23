// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mini project (DATA)
// =============================================================
const reservations = [];
const waitlist = [];
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/pages/notes.html"));
});

// Displays all characters
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Displays a single character, or returns false
app.get("/api/tables", function(req, res) {
    res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitlist);
});
// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;
  
  if(reservations.length < 5){
   reservations.push(newReservation);   
  } else{
    waitlist.push(newReservation);    
  }
  const added = reservations.includes(newReservation);
  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newReservation.id = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  // characters.push(newReservation);

  res.send(added);
});

app.delete("api/notes/:id", function(req, resp){
fs.readFile("/db/db.json", "utf8", function(err, data){
  if(err) throw err;
  const db = data;
  for(let i = 0; i < db.length; i++){

  }
  res.json(db);
});

});





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
