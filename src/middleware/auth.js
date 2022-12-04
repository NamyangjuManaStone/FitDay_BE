import { verify } from '../utils/jwt.util';

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = verify(token);

    if (result.success) {
      req.user = result;
      next();
    } else {
      res.status(401).send({ ok: false, message: result.message });
    }
  }
};

export default auth;
