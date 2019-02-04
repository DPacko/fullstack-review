const express = require("express");
var bodyParser = require("body-parser");
var Repo = require("../database/index.js");
var { save, find } = require("../database/index.js");
var Repo = require("../database/index.js");
var { getReposByUsername } = require("../helpers/github.js");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/repos", function(req, res) {
  console.log("should be username path ", req.body.term);
  // This route should take the github username provided
  var username = req.body.term;
  // and get the repo information from the github API, then
  getReposByUsername(username, function(err, body) {
    if (err) {
      console.log("TROUBLE connecting to Github API!!", err);
      res.status(400).send("unable to connect githubapi!!");
    } else {
      console.log("successfully connected to Github API!!");
      save(body[0]);
      res.status(200).send({ success: true });
    }
  });
});

app.get("/repos", function(req, res) {
  console.log("inside the db");
  // This route should send back the top 25 repos
  find().then(result => {
    console.log(result);
    console.log("found 25 repos");
    return res.status(200).send(result);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
