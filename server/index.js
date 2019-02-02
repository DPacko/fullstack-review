const express = require("express");
var bodyParser = require("body-parser");
var { save } = require("../database/index.js");
var { getReposByUsername } = require("../helpers/github.js");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/repos", function(req, res) {
  console.log("should be username path ", req.body);
  // This route should take the github username provided
  var username = req.body.username;
  // and get the repo information from the github API, then
  getReposByUsername(username, function(err, response, body) {
    if (err) {
      console.log("TROUBLE connecting to Github API!!", err);
    } else {
      console.log("successfully connected to Github API!!", response);
      console.log("body = ", body);
      // save the repo information in the database
      save(body).then(res => {
        console.log("results from saving into db: ", res);
      });
    }
  });
});

app.get("/repos", function(req, res) {
  // This route should send back the top 25 repos
  var cursor = Repo.repoSchema // need to import uptop or do this in server folder
    .find()
    .sort({ stargazers_count: -1 })
    .limit(25)
    .toArray();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
