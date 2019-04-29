const path = require('path');

module.exports = ({ config }) => {
	config.module.rules.push({
		// Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
		exclude: [/node_modules\/(?!(gatsby)\/)/],
		use: [
			{
				loader: require.resolve("babel-loader"),
				options: {
					presets: [
						require.resolve("@babel/preset-react"),
						require.resolve("@babel/preset-env"),
					],
					plugins: [
						require.resolve("@babel/plugin-proposal-class-properties"),
					]
				}
			}
		]
	});

	// Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
	config.resolve.mainFields = ["browser", "module", "main"]

	// Find Storybook's default CSS processing rule
	const cssLoaderIndex = config.module.rules.findIndex(
		rule => rule.test.source === `\\.css$`
	);

	// Exclude CSS Modules from Storybook's standard CSS processing
	config.module.rules[cssLoaderIndex].exclude = /\.module\.css$/;

	// Add specific loader rule for CSS Modules
	config.module.rules.push({
		test: /\.module\.css$/,
		use: [
			{ loader: `style-loader` },
			{
				loader: "css-loader",
				options: {
					modules: true,
					importLoaders: 1,
					localIdentName: "[path]-[local]-[hash:base64:5]"
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: (loader) => [
						require('postcss-nested')
					]
				}
			}
		],
		include: path.resolve(__dirname, "../src")
	});

	return config;
}
