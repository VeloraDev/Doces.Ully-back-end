import jwt from "jsonwebtoken";

function clientRequired(req, res, next){
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Login como cliente requerido",
      });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.clientId = decoded.id;
      next();
    } catch (error) {
      console.log("Erro na verificação de token: " + error);
      return res.status(401).json({ error: "Token inspirado, ou inválido" });
    }
}

export default clientRequired;