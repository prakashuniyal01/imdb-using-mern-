export const validateCreateMovieRequest = (req, res, next) => {
  if (!validateName(req.body.name)) {
    return res.status(401).json({ code: "INVALID_NAME" });
  }
  if (!validateId(req.body.director_id)) {
    return res.status(401).json({ code: "INVALID_ID" });
  }
  if (!validateYear(req.body.year)) {
    return res.status(401).json({ code: "INVALID_YEAR" });
  }

  next();
};

const validateName = (name) => {
  return name && typeof name === "string" && name.length < 4;
};

const validateId = (id) => {
  return id && Number.isInteger(parseInt(id)) && id.length < 12;
};

const validateYear = (year) => {
  const yearAsNumber = parseInt(year);
  return (
    year &&
    Number.isInteger(yearAsNumber) &&
    yearAsNumber > 1900 &&
    yearAsNumber < 2100
  );
};
