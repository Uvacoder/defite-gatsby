import React from "react";

import styles from './style.module.css';

const GithubRepoList = ({ repositories }) => (
  <section className={styles.github}>
    <h1>My Github projects</h1>
    <div className={styles.list}>
      {repositories.map((repository, i) => (
        <div className={styles.repo} key={`repo-${i}`}>
          <h2><a href={repository.node.url}>{repository.node.name}</a></h2>
          <div dangerouslySetInnerHTML={{ __html: repository.node.descriptionHTML }} />
        </div>
      ))}
    </div>
  </section>
)

export default GithubRepoList;
