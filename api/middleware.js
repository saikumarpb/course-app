import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from './loadConfig.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  const url = req.url;

  const role = url.split('/')[1] === 'admin' ? 'admin' : 'user';

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  try {
    const decoded = verify(token, JWT_SECRET);

    if (decoded.role !== role) {
      res.status(401).send();
    } else {
      req.username = decoded.username;
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
