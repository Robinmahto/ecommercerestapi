import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';

class jwtService {

  static sign(payload, expire = "60s", secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expire });
  }

  static verify(token , secret = JWT_SECRET) {
    return jwt.verify(token, secret);
  }

}

export default jwtService;