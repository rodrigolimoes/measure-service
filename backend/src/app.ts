import express, { Express } from 'express';
import { appMiddleware } from '@src/middleware/app';
import { errorHandler } from '@src/middleware/errorHandler';
import { router } from '@src/routes';
import { connectDatabase } from '@src/database';
import 'reflect-metadata';

const app: Express = express();
const port = 3000;

appMiddleware(app);

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

connectDatabase();
