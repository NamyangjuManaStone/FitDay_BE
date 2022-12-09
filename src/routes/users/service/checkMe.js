import { User } from '../../../models';

const checkMe = async (req, res) => {
  try {
    const { data } = req.user;
    const user = await User.findOne({ email: data.email });
    const userData = {
      email: user.email,
      nickname: user.nickname,
    };

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error);
  }
};

export default checkMe;
