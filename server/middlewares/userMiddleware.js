import jwt from 'jsonwebtoken';

export const userMiddleware = (req, res, next) => {
  const authHeader = req.cookies['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(authHeader, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user= user;
    next();
  });
};
