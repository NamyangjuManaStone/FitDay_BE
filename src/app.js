import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import { MONGO_URI } from './config';
import routes from './routes';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'tiny'));
app.use('/', routes);

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connecting MongoDB...');
      console.log(`Example app listening at http://localhost:${PORT}/`);
    })
    .catch((error) => {
      console.error(error);
    });
});
