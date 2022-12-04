import { jwtUtil } from '../utils/jwt.util';

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1]; // header에서 access token을 가져옵니다.
    const result = jwtUtil.verify(token); // token을 검증합니다.

    if (result.ok) {
      req.email = result.email;
      next();
    } else {
      res.status(401).send({ ok: false, message: result.message });
    }
  }
};

export default auth;
