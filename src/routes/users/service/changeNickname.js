import { User } from '../../../models';

const changeNickname = async (req, res) => {
  try {
    const { data } = req.user;

    // 닉네임 값 체크
    const { nickname } = req.body;
    if (!nickname) {
      return res.status(400).json({ success: false, message: 'the value is empty.' });
    }

    // 닉네임 중복체크
    const exNickname = await User.findOne({ nickname });
    if (exNickname) {
      return res.status(400).json({ success: false, message: 'this nickname is already in use.' });
    }

    const filter = { email: data.email };
    const update = { nickname };
    const option = { new: true };
    const newUser = await User.findOneAndUpdate(filter, update, option);

    const userData = {
      email: newUser.email,
      nickname: newUser.nickname,
    };

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default changeNickname;
