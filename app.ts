import express from 'express';
import bodyParser from 'body-parser';

import todoRoutes from './routes/todos';// for default import we doesn't need '{}' brackets

const app = express();

app.use(bodyParser.json());

app.use(todoRoutes);

app.listen(3000);