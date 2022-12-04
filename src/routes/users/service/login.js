import bcrypt from 'bcrypt';

import { User } from '../../../models';
import { jwtUtil } from '../../../utils';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'the value is empty.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'email or password mismatch.' });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(400).json({ success: false, message: 'email or password mismatch.' });
    }

    const accessToken = jwtUtil.sign(user);
    // const refreshToken = jwtUtil.refresh();
    // redisClient.set(user.id, refreshToken);
    const userData = {
      email: user.email,
      nickname: user.nickname,
    };

    return res.status(200).json({ success: true, user: userData, accessToken });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error);
  }
};

export default login;
