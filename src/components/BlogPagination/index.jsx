import React from 'react';
import { Link } from 'gatsby';
import { rhythm } from '../../utils/typography';
import styles from './style.module.css';

/* eslint-disable react/no-danger */
const BlogPagination = ({ currentPage, numPages, langPrefix }) => {
	const blogPrefix = `${langPrefix}/blog/`;
	const isFirst = currentPage === 1;
	const isLast = currentPage === numPages;
	const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
	const nextPage = (currentPage + 1).toString();

	return (
		<ul className={styles.pagination}>
			{!isFirst && (
				<li>
					<Link to={blogPrefix + prevPage} rel="prev">←</Link>
				</li>
			)}
			{Array.from({ length: numPages }, (_, i) => (
				<li key={`pagination-number${i + 1}`}>
					<Link
						to={`${langPrefix}/blog/${i === 0 ? '' : i + 1}`}
						style={{
							padding: rhythm(1 / 4),
							textDecoration: 'none',
							color: i + 1 === currentPage ? '#ffffff' : '',
							background: i + 1 === currentPage ? '#375c85' : '',
						}}
					>
						{i + 1}
					</Link>
				</li>
			))}
			{!isLast && (
				<li>
					<Link to={blogPrefix + nextPage} rel="next">→</Link>
				</li>
			)}
		</ul>
	);
};

export default BlogPagination;
