import React from "react";

const Repos = props => (
  <div className="repo-entry">
    <h3>{props.repo.username}</h3>
    <p>
      Repo:{" "}
      <a href={props.repo.url} target="_blank">
        {props.repo.url}
      </a>{" "}
      <br />
      Star Count: {props.repo.stargazers_count} <br />
      Last Updated: {props.repo.updated_at} <br />
      Description: {props.repo.description}
    </p>
  </div>
);

export default Repos;
