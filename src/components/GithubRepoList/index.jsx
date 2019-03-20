import React from 'react';
import translate from './github.lang';
import styles from './style.module.css';

/* eslint-disable react/no-danger */
const GithubRepoList = ({ repositories, lang }) => (
	<section className={styles.github}>
		<h1>{translate[lang].title}</h1>
		<div className={styles.list}>
			{repositories.map((repository, index) => {
				const key = `repo-item-${index}`;

				return (
					<div className={styles.repo} key={key}>
						<h2>
							<a href={repository.node.url}>{repository.node.name}</a>
						</h2>
						<div dangerouslySetInnerHTML={{ __html: repository.node.descriptionHTML }} />
					</div>
				);
			})}
		</div>
	</section>
);

export default GithubRepoList;
