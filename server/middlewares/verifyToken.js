/**
 * Middelware para la
 * autorización para cada petición
 * del administrador y usuario.
 */

const jwt = require("jsonwebtoken");

const verifyTokenAdmin = (req, res, next) => {
  let token = req.headers["access-token-admin"];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Pruebas en Rest API
      return res.status(401).json({
        ok: false,
        err: {
          msg: "Token no valido",
        },
      });
    }

    req.administrator = decoded.administrator;
    next();
  });
};

const verifyTokenCliente = (req, res, next) => {
  let token = req.headers["access-token-cliente"];
 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Pruebas en Rest API
      return res.status(401).json({
        ok: false,
        err: {
          msg: "Token no valido",
        },
      });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = {
  verifyTokenAdmin,
  verifyTokenCliente,
};
