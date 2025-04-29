import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token) return res.status(401).json({success:false, message: 'Unauthorized'})
        
        let decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedData?.userId;
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false, message: 'Some error occured'})
    }
}

export default authUser;