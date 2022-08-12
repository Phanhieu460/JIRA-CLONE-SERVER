
const jwt = require('jsonwebtoken')
module.exports= async function(req, res, next) {
    const auth = req.header('Authorization')
    const token = auth && auth.split(' ')[1]
    if (token) {
        try {
            const checkToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.userId = checkToken.userId
            next()
        } catch (error) {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    } else {
        res.status(403).json({
            message: "No Token"
        })
    }
        
    
}