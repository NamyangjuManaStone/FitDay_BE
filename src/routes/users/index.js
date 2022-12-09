import express from 'express';

import { auth } from '../../middleware';
import { checkMe, login, signup, changeNickname } from './service';

const router = express.Router();

router.get('/checkMe', auth, checkMe);
router.post('/signup', signup);
router.post('/login', login);
router.patch('/changeNickname', auth, changeNickname);

export default router;
