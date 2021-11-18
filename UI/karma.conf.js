// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const isDocker = require('is-docker');

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-junit-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		junitReporter: {
			outputDir: './reports',
			outputFile: 'karma.xml',
			useBrowserName: false,
		},
		coverageReporter: {
			dir: './reports/coverage',
			subdir: '.',
			includeAllSources: true,
			reporters: [
				{ type: 'cobertura' },
				{ type: 'lcovonly' },
				{ type: 'html' },
				{ type: 'text' },
			],
		},
		reporters: ['progress', 'kjhtml', 'junit', 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['CustomChrome'],
		singleRun: false,
		restartOnFileChange: true,
		customLaunchers: {
			CustomChrome: {
				base: 'ChromeHeadless',
				flags: isDocker() ? ['--no-sandbox'] : [],
			},
		},
	});
};
