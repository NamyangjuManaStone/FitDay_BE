const checkMe = async (req, res) => {
  try {
    const { data } = req.user;
    const userData = {
      email: data.email,
      nickname: data.nickname,
    };

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error);
  }
};

export default checkMe;
