import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.grabRepos = this.grabRepos.bind(this);
    this.updateRepos = this.updateRepos.bind(this);
  }

  componentDidMount() {
    this.grabRepos();
    // function(data) {
    // this.updateRepos(data);
    // console.log("inside", data);
    // return data;
    // });
    // console.log(data);
  }

  updateRepos(data) {
    console.log("UPDATINGGGG");
    console.log(this.state);
    this.setState({
      repos: data
    });
  }

  grabRepos(callback) {
    $.ajax({
      url: "http://localhost:1128/repos",
      method: "GET",
      // contentType: "application/json",
      success: this.updateRepos,
      // console.log("grabbed most recent repos from db!");
      error: function() {
        console.log("GET request FAILED", status);
      }
    });
  }

  search(term) {
    console.log(`${term} was searched`);

    $.ajax({
      url: "http://localhost:1128/repos",
      method: "POST",
      data: { term: term },
      // contentType: "application/json",
      success: data => {
        console.log("successsssss");
        console.log(data);
        this.grabRepos();
      },
      error: function(err) {
        console.log(err);
        console.log("POST request FAILED", status);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
