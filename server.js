// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// serve the js script
app.get("/assets/js/index.js", function(req, res){
  res.sendFile(path.join(__dirname, "/assets/js/index.js"));
});

// serve the js styles
app.get("/assets/css/styles.css", function(req, res){
  res.sendFile(path.join(__dirname, "/assets/css/styles.css"));
});
// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newJson = req.body;
  console.log(newJson);  
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (err, data) {
    if (err) throw err;
    // if(!data) data = [];  
    console.log(data);
    
    const jsonData = JSON.parse(data);
    newJson.id = jsonData.length + 1;    
    jsonData.push(newJson);
    // data.push(newJson);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(jsonData), function (err) {
      if (err) throw err;
      res.json(jsonData);
    });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (err, data) {
    if (err) throw err;
    const id = parseInt(req.params.id);
    let db = JSON.parse(data);
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === id) {
        db.splice(i, 1);
        for(let i = 0; i < db.length; i++){
          db[i].id = i + 1;
        }
        return fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db), function (err) {
          if (err) throw err;
          res.end();
        });
        
      }
    }
    res.end();
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
