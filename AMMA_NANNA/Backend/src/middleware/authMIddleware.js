import jwt from  'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req , res , next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            if(!token){
                return res.status(401).json({
                    success: false,
                    error: "Not authorized , no token"
                })
            }

            const decoded = jwt.verify(token , process.env.WHO_R_U)
            req.user = await User.findById(decoded.userId).select('-password')

            return next()
        }
        catch(error){
            res.status(401).json({
                success: false,
                error: "Not authorized , token failed"
            })
        }
    }


}

export default protect