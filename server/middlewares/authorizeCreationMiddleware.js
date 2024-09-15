import Patient from '../models/patientDetailsModel.js';

export const authorizeCreationMiddleware = async (req, res, next) => {
    const { patientId } = req.body; 
    try {
        const authHeader = req.cookies['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        jwt.verify(authHeader, process.env.JWT_TOKEN, async (err, decode) => {
            req.user=decode 
            if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
            }

            const patient = await Patient.findById(patientId);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found.' });
            }
            if (req.user.role === 'doctor') {
                return next();
            }
            if (req.user.role === 'user' && patient.userId.toString() === req.user.id) {
                return next();
            }
            return res.status(403).json({ message: 'You are not authorized to add a record for this patient.' });
        });
  
    } catch (error) {
      res.status(500).json({ message: 'Error authorizing record creation.', error });
    }
  };
  