import jwt from 'jsonwebtoken';
import { JWT_SECRET as secret } from '../config';

export const sign = (user) => {
  const payload = { user };
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '24h',
  });
};

export const verify = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secret);
    return { success: true, data: decoded.user };
  } catch (err) {
    return { success: false, message: err.message };
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
