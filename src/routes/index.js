import express from 'express';

import usersRouter from './users';

const routes = express.Router();

routes.use('/users', usersRouter);

export default routes;
