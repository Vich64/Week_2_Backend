const auth = (req, res, next) => {
  const { token } = req.query;

  // Simulate token validation (in real-world, use a secure token system)
  if (!token || token !== "xyz123") {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or missing token" });
  }

  next();
};

export default auth;
