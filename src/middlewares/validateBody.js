export default function validateBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Corpo da requisição ausente, ou inválido" });
  }

  next();
}
