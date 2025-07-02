const jwt = require("jsonwebtoken");
const Config = require("./../config/config.js");

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.header('authorization');

  if (!authHeader) {
    return res.status(401).json({ message: "Token de acceso no proporcionado" });
  }


  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, Config.secreteWord);
    req.user = decoded;  
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = {
  verifyTokenMiddleware
};