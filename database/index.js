var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fetcher");
// var uniqueValidator = require("mongoose-unique-validator");
mongoose.Promise = global.Promise;

var repoSchema = mongoose.Schema({
  repo_name: { type: String, unique: true, required: true },
  username: String,
  url: { type: String, unique: true, required: true },
  description: String,
  stargazers_count: Number,
  updated_at: Date
});

// repoSchema.plugin(uniqueValidator);
var Repo = mongoose.model("Repo", repoSchema);
// .model() fn makes a copy of repoSchema
// and instance of model ^ is called a document

let find = function() {
  return Repo.find({})
    .sort({ stargazers_count: -1 })
    .limit(25);
};

let save = data => {
  // console.log(data.owner.login);
  // This function should save a repo or repos to the MongoDB
  // data from github API passes through here, screened, and sent to mongoDB
  // might have to put Repo.find()
  // var isUserInDB = Repo.findOne({ username: `${data.owner.login}` }); // returns a cursor to the repos
  // if (!isUserInDB) {
  let repo = new Repo({
    repo_name: `${data.name}`,
    username: `${data.owner.login}`,
    url: `${data.owner.html_url}`,
    description: `${data.description}`,
    stargazers_count: `${data.stargazers_count}`,
    updated_at: `${data.updated_at}`
  });

  repo.save(err => {
    if (err) {
      console.log("ERROR SAVING NEW REPO", err);
    } else {
      console.log("SAVED TO DB!!");
    }
  });

  // Repo.insertOne({
  //   repo_name: `${data.name}`,
  //   username: `${data.owner.login}`,
  //   url: `${data.owner.html_url}`,
  //   description: `${data.description}`,
  //   stargazers_count: `${data.stargazers_count}`,
  //   updated_at: `${data.updated_at}`
  // });
  // console.log("made it woohoo!");
  // }); // insertOne returns an object with a boolean and the repos ObjectId
  // }
};
module.exports = Repo;
module.exports = { save, find };
// module.exports.save = save;
