import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const {token} = req.headers;
    if (!token) {
      return res.json({success: false, message: 'Authentication failed' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({success: false, message: 'Authentication failed' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed' });
  }

}

export default adminAuth;