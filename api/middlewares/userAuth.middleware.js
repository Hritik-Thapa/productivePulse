import jwt from "jsonwebtoken";

export const authenticateUserFromToken = (req, res, next) => {
  const error = new Error();
  error.code = "C4444";
  error.message = "Unauthorized Access";

  console.log("authenticator");

  const token = req.cookies.authToken;

  if (!token) {
    return next(error);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, userId) => {
    if (err) return next(error);
    req.userId = userId;
    next();
  });
};
