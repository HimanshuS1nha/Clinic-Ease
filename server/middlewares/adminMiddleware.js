import jwt from 'jsonwebtoken';

export const adminMiddleware = (req, res, next) => {
  const authHeader = req.cookies['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(authHeader, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = user;
    next();
  });
};
