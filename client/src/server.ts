import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';

import bootstrap from './main.server';

const serverDistFolder = path.dirname(fileURLToPath(import.meta.url));
const browserDistFolder = path.resolve(serverDistFolder, '../browser');
const indexHtml = path.join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

/**
 * Serve static files from /browser
 */
app.get(
	'**',
	express.static(browserDistFolder, {
		maxAge: '1y',
		index: 'index.html',
	}),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
	const { protocol, originalUrl, baseUrl, headers } = req;

	commonEngine
		.render({
			bootstrap,
			documentFilePath: indexHtml,
			url: `${protocol}://${String(headers.host)}${originalUrl}`,
			publicPath: browserDistFolder,
			providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
		})
		.then((html) => res.send(html))
		.catch((error: unknown) => {
			next(error);
		});
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 80.
 */
if (isMainModule(import.meta.url)) {
	const port = process.env['PORT'] ?? 80;
	app.listen(port, () => {
		console.log(
			`Node Express server listening on http://localhost:${String(port)}`,
		);
	});
}
