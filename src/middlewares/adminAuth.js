import jwt from "jsonwebtoken";

function adminRequired(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      errors: ["Login como administrador requerido"],
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role !== "admin"){
      return res.status(401).json({
        errors: ["Login como administrador requerido"],
      });
    }
    
    next();
  } catch (error) {
    console.log("Erro na verificação de token: " + error);
    return res.status(401).json({ errors: ["Token expirado, ou inválido"] });
  }
}

export default adminRequired;
