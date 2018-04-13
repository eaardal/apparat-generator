import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Logger from '../infrastructure/logger';
import apparatGenerator from '../generator/router';

const app = express();
const PORT = process.env.PORT || 8123;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', apparatGenerator);

app.listen(PORT, () => {
  Logger.info('Apparat Generator', { port: PORT });
});
