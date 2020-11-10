/**
 * Middleware de autorización para cada petición del administrador
 */
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: {
          msg: "Token no valido"
        }
      })
    }
    req.user = decoded.user;
    next();
  })
}

module.exports = verifyToken;