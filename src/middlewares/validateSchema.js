export function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      convert: true,
    });
    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }

    req.body = value;
    next();
  };
}
