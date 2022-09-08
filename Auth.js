const jwt = require('jsonwebtoken');
function userAuth(req, res, next) {
    const token1 = req.headers['x-access-token'] || req.headers['authorization'];
    const token = token1.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = userAuth;