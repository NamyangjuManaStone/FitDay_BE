import express from 'express';

import { auth } from '../../middleware';
import { checkMe, login, signup } from './service';

const router = express.Router();

router.get('/checkMe', auth, checkMe);
router.post('/signup', signup);
router.post('/login', login);

export default router;
