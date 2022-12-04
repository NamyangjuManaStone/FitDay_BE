import jwt from 'jsonwebtoken';
import { JWT_KEY as secret } from '../config';

const sign = (email) => {
  const payload = { email };
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

const verify = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secret);
    return { type: true, email: decoded.email };
  } catch (err) {
    return { type: false, message: err.message };
  }
};

// const refresh = () => {
//   return jwt.sign({}, secret, {
//     algorithm: 'HS256',
//     expiresIn: '14d',
//   });
// };

// const refreshVerify = async (token, email) => {
//   //* redis 모듈은 기본적으로 promise를 반환하지 않으므로, promisify를 이용하여 promise를 반환만든다
//   const getAsync = promisify(redisClient.get).bind(redisClient);

//   try {
//     const data = await getAsync(email);
//     if (token === data) {
//       try {
//         jwt.verify(token, secret);
//         return true;
//       } catch (err) {
//         return false;
//       }
//     } else {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };

export default {
  sign,
  verify,
};
