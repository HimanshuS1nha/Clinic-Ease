import jwt from 'jsonwebtoken';

export const doctorMiddleware = (req, res, next) => {
  const authHeader = req.cookies['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(authHeader, process.env.JWT_TOKEN, (err, doctor) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    if (user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    req.user = doctor;
    next();
  });
};
