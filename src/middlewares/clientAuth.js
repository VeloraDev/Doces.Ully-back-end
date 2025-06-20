import jwt from "jsonwebtoken";

function clientRequired(req, res, next){
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      errors: ["Login como cliente requerido"],
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role !== "client") {
      return res.status(401).json({
        errors: ["Login como cliente requerido"],
      });
    } 

    req.clientId = decoded.id;
    next();
  } catch (error) {
    console.log("Erro na verificação de token: " + error);
    return res.status(401).json({ errors: ["Token expirado, ou inválido"] });
  }
}

export default clientRequired;