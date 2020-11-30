/*
  Autorización para cada petición del administrador.
*/

const jwt = require('jsonwebtoken');

const verifyTokenAdmin = (req, res, next) => {
  let token = req.headers['access-token-admin'];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Pruebas en Rest API 
      return res.status(401).json({
        ok: false,
        err: {
          msg: "Token no valido"
        }
      })

      // Redireccionar en el sistema
      // return res.redirect('/admin/login'):
    }

    req.administrator = decoded.administrator;
    next();
  })
}

module.exports = {
  verifyTokenAdmin
};