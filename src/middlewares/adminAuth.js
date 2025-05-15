import jwt from "jsonwebtoken";

function adminRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Login como administrador requerido",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log("Erro na verificação de token: " + error);
    return res.status(401).json({ error: "Token inspirado, ou inválido" });
  }
}

export default adminRequired;
