const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fetcher");

let repoSchema = mongoose.Schema({
  repo_name: String,
  username: String,
  url: String,
  description: String,
  stargazers_count: Number,
  updated_At: Date
});

let Repo = mongoose.model("Repo", repoSchema);

let save = data => {
  // This function should save a repo or repos to the MongoDB
  // data from github API passes through here, screened, and sent to mongoDB
  // might have to put db.repoSchema instead of Repo.repoSchema
  var isUserInDB = Repo.repoSchema.find({ username: `${data.username}` }); // returns a cursor to the repos
  if (!isUserInDB) {
    Repo.repoSchema.insertOne({
      repo_name: `${data.repo_name}`,
      username: `${data.username}`,
      url: `${(data, url)}`,
      description: `${data.description}`,
      stargazers_count: `${data.stargazers_count}`,
      updated_At: `${data.updated_At}`
    }); // insertOne returns an object with a boolean and the repos ObjectId
  }
};

module.exports.save = save;
