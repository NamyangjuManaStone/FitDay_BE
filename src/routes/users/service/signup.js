import bcrypt from 'bcrypt';
import { User } from '../../../models';

const signup = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    if (!email || !nickname || !password) {
      return res.status(400).json({ success: false, message: 'the value is empty.' });
    }

    const exEmail = await User.findOne({ email });
    const exNickname = await User.findOne({ nickname });
    if (exEmail || exNickname) {
      return res
        .status(400)
        .json({ success: false, message: 'this email or nickname is already in use.' });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ success: false, message: 'password must be at least 4 digits.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUserData = { email, nickname, password: hashedPassword };
    const newUser = await User.create(newUserData);
    await newUser.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error);
  }
};

export default signup;
