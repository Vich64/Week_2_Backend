const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;
  const query = JSON.stringify(req.query);

  console.log(`[${timestamp}] ${method} ${path} Query: ${query}`);
  next();
};

export default logger;
