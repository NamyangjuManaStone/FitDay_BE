import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { MONGO_URI } from './config';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => res.send('test~!'));

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
