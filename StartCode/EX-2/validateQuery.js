const validateQuery = (req, res, next) => {
  const { minCredits, maxCredits } = req.query;

  // Validate minCredits and maxCredits are valid integers
  if (minCredits && isNaN(parseInt(minCredits))) {
    return res
      .status(400)
      .json({ error: "minCredits must be a valid integer" });
  }
  if (maxCredits && isNaN(parseInt(maxCredits))) {
    return res
      .status(400)
      .json({ error: "maxCredits must be a valid integer" });
  }

  // Validate credit range
  if (minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
    return res
      .status(400)
      .json({ error: "minCredits cannot be greater than maxCredits" });
  }

  next();
};

export default validateQuery;
