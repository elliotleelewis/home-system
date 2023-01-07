const path = require('path');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, 'src'),
};

module.exports = (cfg) => {
	cfg.plugins.push(
		new PurgeCSSPlugin({
			paths: () => glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
		}),
	);

	return cfg;
};
