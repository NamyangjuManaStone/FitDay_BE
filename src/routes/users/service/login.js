const login = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error);
  }
};

export default login;
