import React from "react";
import Repos from "./Repos.jsx";

const RepoList = props => (
  <div className="repo-list">
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => (
      <Repos repo={repo} />
    ))}
  </div>
);

export default RepoList;
