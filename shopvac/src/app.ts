import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('port', '8080');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(
	'/',
	(req: express.Request, res: express.Response): void => {
		res.send({ test: 'hello world!' });
	},
);

export default app;
