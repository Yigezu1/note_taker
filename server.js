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
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/pages/notes.html"));
});

// Displays all characters
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newJson = req.body;
  fs.readFile("/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === newJson.id) {
        res.send(
          "Error: There is a record with the same id. Please change and try again."
        );
        return;
      }
    }
    data.push(newJson);
    fs.writeFile("/db/db.json", data, function (err) {
      if (err) throw err;
      res.json(data);
    });
  });
});

app.delete("api/notes/:id", function (req, resp) {
  fs.readFile("/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    const id = req.params.id;
    const db = data;
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === id) {
        db = db.splice(i, 1);
      }
    }
    fs.writeFile("/db/db.json", db, function (err) {
      if (err) throw err;
      res.json(db);
    });
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
