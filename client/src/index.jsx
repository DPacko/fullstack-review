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
  }

  search(term) {
    console.log(`${term} was searched`);

    var request = $.ajax({
      url: "http://127.0.0.1:1128/repos",
      method: "POST",
      data: JSON.stringify(term),
      dataType: "application/json"
    });
    request.done(function(msg) {
      console.log("POST request to server complete!", msg);
    });
    request.fail(function(jqXHR, textStatus) {
      console.log("POST request FAILED: " + testStatus);
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
