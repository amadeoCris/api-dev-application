const jsonwebtoken = require('jsonwebtoken');
module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied. Need token to continue.');
    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN);
        req.userExist = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}