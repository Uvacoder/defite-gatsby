exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;

	const typeDefs = `
		type MarkdownRemark implements Node {
			frontmatter: Frontmatter
		}
		type Frontmatter {
			coverImg: File @fileByRelativePath
		}
	`;

	createTypes(typeDefs);
};